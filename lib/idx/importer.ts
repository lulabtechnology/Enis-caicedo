import { Client, FileInfo } from "basic-ftp";
import { parse } from "csv-parse/sync";
import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { DEFAULT_IDX_HOST, IDX_DATA_PATH, IDX_PHOTO_PUBLIC_DIR, parseFeeds } from "./config";
import { buildIdxPhotoUrl, photoFileName } from "./photos";
import { normalizeIdxRecords } from "./normalize";
import type { IdxDataFile, IdxFeedType, IdxProperty, IdxRawRecord } from "./types";
import { createSupabaseAdminClient, idxPropertyToSupabaseRow, requireSupabaseAdminConfig } from "./supabase";

export type IdxStorageDriver = "local" | "supabase" | "none";
export type IdxDataDriver = "local" | "supabase" | "both";

export type RunIdxImportOptions = {
  downloadPhotos?: boolean;
  includeRaw?: boolean;
  dryRun?: boolean;
  feeds?: string;
  rootDir?: string;
  storageDriver?: IdxStorageDriver;
  dataDriver?: IdxDataDriver;
  log?: (...args: unknown[]) => void;
};

export type RunIdxImportResult = {
  generatedAt: string;
  feeds: IdxFeedType[];
  total: number;
  residential: number;
  commercial: number;
  writtenLocal: boolean;
  writtenSupabase: boolean;
  storageDriver: IdxStorageDriver;
  dataDriver: IdxDataDriver;
};

function cleanEnvValue(value: string | undefined): string {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim();
}

function envValue(name: string, fallback = ""): string {
  return cleanEnvValue(process.env[name]) || fallback;
}

function envFlag(name: string, defaultValue: boolean): boolean {
  const value = envValue(name);
  if (!value) return defaultValue;
  return value.toLowerCase() === "true";
}

function parseDataDriver(value?: string): IdxDataDriver {
  const normalized = String(value || "local").trim().toLowerCase();
  if (["local", "supabase", "both"].includes(normalized)) return normalized as IdxDataDriver;
  return "local";
}

function parseStorageDriver(value?: string): IdxStorageDriver {
  const normalized = String(value || "local").trim().toLowerCase();
  if (["local", "supabase", "none"].includes(normalized)) return normalized as IdxStorageDriver;
  return "local";
}

function requireEnv(name: string): string {
  const value = envValue(name);
  if (!value) {
    throw new Error(`Falta configurar ${name}. Revise .env.local, Vercel o GitHub Secrets.`);
  }
  return value;
}

function latestCsvForPrefix(files: FileInfo[], prefix: IdxFeedType): FileInfo | undefined {
  const matcher = new RegExp(`^${prefix}\\d{8}\\.csv$`, "i");
  return files
    .filter((file) => file.isFile && matcher.test(file.name))
    .sort((a, b) => b.name.localeCompare(a.name))[0];
}

function headerFileForPrefix(files: FileInfo[], prefix: IdxFeedType): FileInfo | undefined {
  return files.find((file) => file.isFile && file.name.toLowerCase() === `${prefix}_headers.csv`);
}

async function parseCsvFile(filePath: string): Promise<IdxRawRecord[]> {
  const content = await readFile(filePath, "utf8");
  return parse(content, {
    bom: true,
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_quotes: true,
    relax_column_count: true
  }) as IdxRawRecord[];
}

async function exists(filePath: string): Promise<boolean> {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function fetchPhotoBuffer(uniqueId: string, index: number): Promise<Buffer | null> {
  const url = buildIdxPhotoUrl(uniqueId, index);
  const response = await fetch(url);

  if (!response.ok) {
    console.warn(`No se pudo descargar foto ${uniqueId}.L${String(index).padStart(2, "0")}: ${response.status}`);
    return null;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("image")) {
    console.warn(`Respuesta inesperada para foto ${uniqueId}.L${String(index).padStart(2, "0")}: ${contentType}`);
    return null;
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function writeLocalPhoto(uniqueId: string, index: number, outputDir: string): Promise<string | null> {
  const target = path.join(outputDir, photoFileName(uniqueId, index));
  if (await exists(target)) return target;

  const buffer = await fetchPhotoBuffer(uniqueId, index);
  if (!buffer) return null;

  await writeFile(target, buffer);
  return target;
}

async function uploadSupabasePhoto(uniqueId: string, index: number, bucket: string): Promise<string | null> {
  const config = requireSupabaseAdminConfig();
  const client = createSupabaseAdminClient();
  const buffer = await fetchPhotoBuffer(uniqueId, index);
  if (!buffer) return null;

  const fileName = photoFileName(uniqueId, index);
  const objectPath = `${uniqueId}/${fileName}`;

  const { error } = await client.storage.from(bucket).upload(objectPath, buffer, {
    contentType: "image/jpeg",
    upsert: true,
    cacheControl: "31536000"
  });

  if (error) {
    console.warn(`No se pudo subir foto ${objectPath} a Supabase:`, error.message);
    return null;
  }

  const { data } = client.storage.from(bucket).getPublicUrl(objectPath);
  return data.publicUrl || `${config.url}/storage/v1/object/public/${bucket}/${objectPath}`;
}

async function hydrateListingPhotos(
  properties: IdxProperty[],
  rootDir: string,
  maxPhotos: number,
  storageDriver: IdxStorageDriver,
  log: (...args: unknown[]) => void
): Promise<void> {
  if (storageDriver === "none") return;

  const outputDir = path.join(rootDir, IDX_PHOTO_PUBLIC_DIR);
  const bucket = envValue("SUPABASE_STORAGE_BUCKET", "idx-photos");

  if (storageDriver === "local") {
    await mkdir(outputDir, { recursive: true });
  }

  let ready = 0;
  let failed = 0;

  for (const property of properties) {
    const total = Math.min(property.listingPhotoCount, maxPhotos);
    const images: string[] = [];

    for (let index = 1; index <= total; index += 1) {
      try {
        if (storageDriver === "local") {
          const localPath = await writeLocalPhoto(property.uniqueId, index, outputDir);
          if (localPath) images.push(`/idx/photos/${photoFileName(property.uniqueId, index)}`);
        }

        if (storageDriver === "supabase") {
          const publicUrl = await uploadSupabasePhoto(property.uniqueId, index, bucket);
          if (publicUrl) images.push(publicUrl);
        }

        ready += 1;
      } catch (error) {
        failed += 1;
        console.warn(`Error procesando foto ${property.uniqueId}.L${String(index).padStart(2, "0")}:`, error);
      }
    }

    if (images.length) {
      property.images = images;
      property.image = images[0];
    }
  }

  log(`Fotos IDX listas con storage ${storageDriver}: ${ready}. Fallidas/omitidas: ${failed}.`);
}

async function writeLocalIdxData(data: IdxDataFile, rootDir: string, dryRun: boolean, log: (...args: unknown[]) => void): Promise<boolean> {
  const outputPath = path.join(rootDir, IDX_DATA_PATH);
  await mkdir(path.dirname(outputPath), { recursive: true });

  if (dryRun) {
    log(JSON.stringify(data.counts, null, 2));
    log("Dry run activo: no se escribió data/idx/listings.json.");
    return false;
  }

  await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  log(`IDX listo en ${IDX_DATA_PATH}`);
  return true;
}

async function writeSupabaseIdxData(properties: IdxProperty[], dryRun: boolean, log: (...args: unknown[]) => void): Promise<boolean> {
  const client = createSupabaseAdminClient();
  const rows = properties.map(idxPropertyToSupabaseRow);

  if (dryRun) {
    log(`Dry run activo: no se escribieron ${rows.length} propiedades en Supabase.`);
    return false;
  }

  const batchSize = Number(envValue("IDX_SUPABASE_BATCH_SIZE", "250"));
  for (let start = 0; start < rows.length; start += batchSize) {
    const chunk = rows.slice(start, start + batchSize);
    const { error } = await client.from("idx_listings").upsert(chunk, { onConflict: "id" });

    if (error) {
      throw new Error(`Supabase upsert falló: ${error.message}`);
    }
  }

  log(`Supabase listo: ${rows.length} propiedades insertadas/actualizadas en idx_listings.`);
  return true;
}

export async function runIdxImport(options: RunIdxImportOptions = {}): Promise<RunIdxImportResult> {
  const rootDir = options.rootDir || process.cwd();
  const tmpDir = path.join(rootDir, ".idx-tmp");
  const headersDir = path.join(rootDir, "data/idx/headers");
  const feeds = parseFeeds(options.feeds ?? process.env.IDX_FEEDS);
  const maxPhotos = Number(envValue("IDX_MAX_PHOTOS_PER_LISTING", "12"));
  const log = options.log || console.log;
  const downloadPhotos = options.downloadPhotos ?? envFlag("IDX_DOWNLOAD_PHOTOS", true);
  const includeRaw = options.includeRaw ?? envFlag("IDX_INCLUDE_RAW", false);
  const dryRun = options.dryRun ?? false;
  const dataDriver = options.dataDriver ?? parseDataDriver(envValue("IDX_DATA_DRIVER"));
  const storageDriver = downloadPhotos ? options.storageDriver ?? parseStorageDriver(envValue("IDX_STORAGE_DRIVER")) : "none";

  const client = new Client();
  client.ftp.verbose = envFlag("IDX_FTP_VERBOSE", false);

  await rm(tmpDir, { recursive: true, force: true });
  await mkdir(tmpDir, { recursive: true });
  await mkdir(headersDir, { recursive: true });

  try {
    await client.access({
      host: envValue("IDX_FTP_HOST", DEFAULT_IDX_HOST),
      user: requireEnv("IDX_FTP_USER"),
      password: requireEnv("IDX_FTP_PASSWORD"),
      secure: envFlag("IDX_FTP_SECURE", false)
    });

    const files = await client.list();
    const allProperties: IdxProperty[] = [];

    for (const feed of feeds) {
      const latestCsv = latestCsvForPrefix(files, feed);
      if (!latestCsv) {
        console.warn(`No encontré CSV para feed ${feed}.`);
        continue;
      }

      const csvPath = path.join(tmpDir, latestCsv.name);
      await client.downloadTo(csvPath, latestCsv.name);
      log(`CSV descargado: ${latestCsv.name}`);

      const headerFile = headerFileForPrefix(files, feed);
      if (headerFile) {
        await client.downloadTo(path.join(headersDir, headerFile.name), headerFile.name);
        log(`Headers descargados: ${headerFile.name}`);
      }

      const records = await parseCsvFile(csvPath);
      const properties = normalizeIdxRecords(records, feed, {
        maxPhotos,
        includeRaw
      });

      log(`${feed}: ${properties.length} propiedades normalizadas.`);
      allProperties.push(...properties);
    }

    if (!allProperties.length) {
      throw new Error("No se importó ninguna propiedad IDX. Revise credenciales, prefijos y archivos CSV disponibles.");
    }

    if (downloadPhotos) {
      await hydrateListingPhotos(allProperties, rootDir, maxPhotos, storageDriver, log);
    } else {
      log("Descarga de fotos omitida por configuración (--no-photos o IDX_DOWNLOAD_PHOTOS=false).");
    }

    const generatedAt = new Date().toISOString();
    const data: IdxDataFile = {
      generatedAt,
      source: "ACOBIR IDX",
      feeds,
      counts: {
        total: allProperties.length,
        residential: allProperties.filter((property) => property.feedType === "res").length,
        commercial: allProperties.filter((property) => property.feedType === "com").length
      },
      listings: allProperties
    };

    const writtenLocal = dataDriver === "local" || dataDriver === "both" ? await writeLocalIdxData(data, rootDir, dryRun, log) : false;
    const writtenSupabase = dataDriver === "supabase" || dataDriver === "both" ? await writeSupabaseIdxData(allProperties, dryRun, log) : false;

    if (dataDriver === "local") log("Modo data local: no se escribió en Supabase.");
    if (dataDriver === "supabase") log("Modo data Supabase: no se actualizó data/idx/listings.json.");

    return {
      generatedAt,
      feeds,
      total: data.counts.total,
      residential: data.counts.residential,
      commercial: data.counts.commercial,
      writtenLocal,
      writtenSupabase,
      storageDriver,
      dataDriver
    };
  } finally {
    client.close();
    await rm(tmpDir, { recursive: true, force: true });
  }
}
