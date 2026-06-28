import { Client, FileInfo } from "basic-ftp";
import { parse } from "csv-parse/sync";
import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { DEFAULT_IDX_HOST, IDX_DATA_PATH, IDX_PHOTO_PUBLIC_DIR, parseFeeds } from "../lib/idx/config";
import { buildIdxPhotoUrl, photoFileName } from "../lib/idx/photos";
import { normalizeIdxRecords } from "../lib/idx/normalize";
import type { IdxDataFile, IdxFeedType, IdxProperty, IdxRawRecord } from "../lib/idx/types";

type CliOptions = {
  downloadPhotos: boolean;
  includeRaw: boolean;
  dryRun: boolean;
  feeds?: string;
};

function parseArgs(argv: string[]): CliOptions {
  const options: CliOptions = {
    downloadPhotos: process.env.IDX_DOWNLOAD_PHOTOS !== "false",
    includeRaw: process.env.IDX_INCLUDE_RAW === "true",
    dryRun: false,
    feeds: process.env.IDX_FEEDS
  };

  argv.forEach((arg) => {
    if (arg === "--no-photos") options.downloadPhotos = false;
    if (arg === "--include-raw") options.includeRaw = true;
    if (arg === "--dry-run") options.dryRun = true;
    if (arg.startsWith("--feeds=")) options.feeds = arg.replace("--feeds=", "");
  });

  return options;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta configurar ${name}. Revise .env.local o los secrets del entorno.`);
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

async function downloadPhoto(uniqueId: string, index: number, outputDir: string): Promise<boolean> {
  const target = path.join(outputDir, photoFileName(uniqueId, index));
  if (await exists(target)) return true;

  const url = buildIdxPhotoUrl(uniqueId, index);
  const response = await fetch(url);

  if (!response.ok) {
    console.warn(`No se pudo descargar foto ${uniqueId}.L${String(index).padStart(2, "0")}: ${response.status}`);
    return false;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("image")) {
    console.warn(`Respuesta inesperada para foto ${uniqueId}.L${String(index).padStart(2, "0")}: ${contentType}`);
    return false;
  }

  const arrayBuffer = await response.arrayBuffer();
  await writeFile(target, Buffer.from(arrayBuffer));
  return true;
}

async function downloadListingPhotos(properties: IdxProperty[], rootDir: string, maxPhotos: number): Promise<void> {
  const outputDir = path.join(rootDir, IDX_PHOTO_PUBLIC_DIR);
  await mkdir(outputDir, { recursive: true });

  let downloaded = 0;
  let skipped = 0;

  for (const property of properties) {
    const total = Math.min(property.listingPhotoCount, maxPhotos);

    for (let index = 1; index <= total; index += 1) {
      try {
        const ok = await downloadPhoto(property.uniqueId, index, outputDir);
        if (ok) downloaded += 1;
      } catch (error) {
        skipped += 1;
        console.warn(`Error descargando foto ${property.uniqueId}.L${String(index).padStart(2, "0")}:`, error);
      }
    }
  }

  console.log(`Fotos IDX listas: ${downloaded}. Fallidas/omitidas: ${skipped}.`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const rootDir = process.cwd();
  const tmpDir = path.join(rootDir, ".idx-tmp");
  const headersDir = path.join(rootDir, "data/idx/headers");
  const feeds = parseFeeds(options.feeds);
  const maxPhotos = Number(process.env.IDX_MAX_PHOTOS_PER_LISTING ?? "12");

  const client = new Client();
  client.ftp.verbose = process.env.IDX_FTP_VERBOSE === "true";

  await rm(tmpDir, { recursive: true, force: true });
  await mkdir(tmpDir, { recursive: true });
  await mkdir(headersDir, { recursive: true });

  try {
    await client.access({
      host: process.env.IDX_FTP_HOST || DEFAULT_IDX_HOST,
      user: requireEnv("IDX_FTP_USER"),
      password: requireEnv("IDX_FTP_PASSWORD"),
      secure: process.env.IDX_FTP_SECURE === "true"
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
      console.log(`CSV descargado: ${latestCsv.name}`);

      const headerFile = headerFileForPrefix(files, feed);
      if (headerFile) {
        await client.downloadTo(path.join(headersDir, headerFile.name), headerFile.name);
        console.log(`Headers descargados: ${headerFile.name}`);
      }

      const records = await parseCsvFile(csvPath);
      const properties = normalizeIdxRecords(records, feed, {
        maxPhotos,
        includeRaw: options.includeRaw
      });

      console.log(`${feed}: ${properties.length} propiedades normalizadas.`);
      allProperties.push(...properties);
    }

    if (!allProperties.length) {
      throw new Error("No se importó ninguna propiedad IDX. Revise credenciales, prefijos y archivos CSV disponibles.");
    }

    if (options.downloadPhotos) {
      await downloadListingPhotos(allProperties, rootDir, maxPhotos);
    } else {
      console.log("Descarga de fotos omitida por configuración (--no-photos o IDX_DOWNLOAD_PHOTOS=false).");
    }

    const data: IdxDataFile = {
      generatedAt: new Date().toISOString(),
      source: "ACOBIR IDX",
      feeds,
      counts: {
        total: allProperties.length,
        residential: allProperties.filter((property) => property.feedType === "res").length,
        commercial: allProperties.filter((property) => property.feedType === "com").length
      },
      listings: allProperties
    };

    const outputPath = path.join(rootDir, IDX_DATA_PATH);
    await mkdir(path.dirname(outputPath), { recursive: true });

    if (options.dryRun) {
      console.log(JSON.stringify(data.counts, null, 2));
      console.log("Dry run activo: no se escribió data/idx/listings.json.");
    } else {
      await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
      console.log(`IDX listo en ${IDX_DATA_PATH}`);
    }
  } finally {
    client.close();
    await rm(tmpDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
