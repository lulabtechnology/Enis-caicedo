import { createClient, type SupabaseClient, type SupabaseClientOptions } from "@supabase/supabase-js";
import WebSocket from "ws";
import { isAllowedIdxProperty } from "./allowed-zones";
import { normalizeStoredIdxPropertyPrice } from "./prices";
import type { IdxProperty } from "./types";

export const DEFAULT_SUPABASE_BUCKET = "idx-photos";

export type SupabaseListingRow = {
  id: string;
  unique_id: string;
  feed_type: string;
  title: string;
  building: string | null;
  price_from: string | null;
  location: string | null;
  property_type: string | null;
  operation: string | null;
  image: string | null;
  listing_photo_count: number | null;
  payload: IdxProperty;
  raw?: Record<string, unknown> | null;
  imported_at?: string;
  updated_at?: string;
};

export type SupabaseIdxConfig = {
  url: string;
  anonKey?: string;
  serviceRoleKey?: string;
  bucket: string;
};

function cleanEnvValue(value: string | undefined): string {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim();
}

export function getSupabaseIdxConfig(): SupabaseIdxConfig | null {
  const url = cleanEnvValue(process.env.NEXT_PUBLIC_SUPABASE_URL) || cleanEnvValue(process.env.SUPABASE_URL);
  const anonKey = cleanEnvValue(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) || cleanEnvValue(process.env.SUPABASE_ANON_KEY);
  const serviceRoleKey = cleanEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const bucket = cleanEnvValue(process.env.SUPABASE_STORAGE_BUCKET) || DEFAULT_SUPABASE_BUCKET;

  if (!url) return null;

  return {
    url,
    anonKey: anonKey || undefined,
    serviceRoleKey: serviceRoleKey || undefined,
    bucket
  };
}

export function requireSupabaseAdminConfig(): Required<SupabaseIdxConfig> {
  const config = getSupabaseIdxConfig();

  if (!config?.url) {
    throw new Error("Falta NEXT_PUBLIC_SUPABASE_URL o SUPABASE_URL.");
  }

  if (!config.serviceRoleKey) {
    throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY. Esta clave solo debe ir en servidor/Vercel, nunca en el navegador.");
  }

  return {
    url: config.url,
    anonKey: config.anonKey || config.serviceRoleKey,
    serviceRoleKey: config.serviceRoleKey,
    bucket: config.bucket
  };
}

const wsTransport = WebSocket as unknown as NonNullable<SupabaseClientOptions<"public">["realtime"]>["transport"];

const supabaseServerOptions: SupabaseClientOptions<"public"> = {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  },
  // Supabase JS initializes the Realtime client even when this project only uses DB/Storage.
  // GitHub Actions and Vercel run on Node 20, which does not provide a native WebSocket.
  // Providing ws prevents runtime failures during IDX imports and server-side reads.
  realtime: {
    transport: wsTransport
  }
};

export function createSupabaseReadClient(): SupabaseClient | null {
  const config = getSupabaseIdxConfig();
  const key = config?.anonKey || config?.serviceRoleKey;

  if (!config?.url || !key) return null;

  return createClient(config.url, key, supabaseServerOptions);
}

export function createSupabaseAdminClient(): SupabaseClient {
  const config = requireSupabaseAdminConfig();

  return createClient(config.url, config.serviceRoleKey, supabaseServerOptions);
}


function buildSupabasePublicPhotoUrl(configUrl: string, bucket: string, uniqueId: string, fileName: string): string {
  const cleanBase = configUrl.replace(/\/+$/, "");
  const safeBucket = encodeURIComponent(bucket);
  const objectPath = [uniqueId, fileName].map((part) => encodeURIComponent(part)).join("/");
  return `${cleanBase}/storage/v1/object/public/${safeBucket}/${objectPath}`;
}

function photoInfoFromValue(value: string): { uniqueId: string; fileName: string } | null {
  const trimmed = String(value || "").trim();
  if (!trimmed) return null;

  const localMatch = trimmed.match(/(?:^|\/)idx\/photos\/([^/?#]+\.L\d{2}\.jpg)$/i);
  if (localMatch?.[1]) {
    const fileName = localMatch[1];
    const uniqueId = fileName.replace(/\.L\d{2}\.jpg$/i, "");
    return { uniqueId, fileName };
  }

  try {
    const url = new URL(trimmed);
    const isRealityServerPhoto = url.hostname.includes("images.realtyserver.com") && url.pathname.includes("photo_server.php");
    const name = url.searchParams.get("name");
    if (isRealityServerPhoto && name && /\.L\d{2}$/i.test(name)) {
      const uniqueId = name.replace(/\.L\d{2}$/i, "");
      return { uniqueId, fileName: `${name}.jpg` };
    }
  } catch {
    // No es una URL absoluta. Si no coincide con el patrón local, se deja igual.
  }

  return null;
}

function resolveSupabasePhotoValue(value: string, config: SupabaseIdxConfig): string {
  const trimmed = String(value || "").trim();
  if (!trimmed) return trimmed;

  if (trimmed.includes("/storage/v1/object/public/")) return trimmed;
  if (!config.url || !config.bucket) return trimmed;

  const photoInfo = photoInfoFromValue(trimmed);
  if (!photoInfo) return trimmed;

  return buildSupabasePublicPhotoUrl(config.url, config.bucket, photoInfo.uniqueId, photoInfo.fileName);
}

function withResolvedSupabasePhotoUrls(property: IdxProperty, config: SupabaseIdxConfig): IdxProperty {
  const images = Array.isArray(property.images)
    ? property.images.map((src) => resolveSupabasePhotoValue(src, config)).filter(Boolean)
    : [];

  const image = resolveSupabasePhotoValue(property.image, config) || images[0] || property.image;

  return normalizeStoredIdxPropertyPrice({
    ...property,
    mlsCode: property.mlsCode || property.uniqueId,
    priceFrom: property.priceFrom || "Consultar precio",
    image,
    images: images.length ? Array.from(new Set(images)) : property.images
  });
}

export function idxPropertyToSupabaseRow(property: IdxProperty): SupabaseListingRow {
  return {
    id: property.id,
    unique_id: property.uniqueId,
    feed_type: property.feedType,
    title: property.title,
    building: property.building || null,
    price_from: property.priceFrom || null,
    location: property.location || null,
    property_type: property.propertyType || null,
    operation: property.operation || null,
    image: property.image || null,
    listing_photo_count: property.listingPhotoCount || 0,
    payload: property,
    raw: property.raw ? (property.raw as Record<string, unknown>) : null,
    imported_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}

export async function getSupabaseIdxListings(): Promise<IdxProperty[]> {
  const config = getSupabaseIdxConfig();
  const client = createSupabaseReadClient();
  if (!client || !config) return [];

  const { data, error } = await client
    .from("idx_listings")
    .select("payload")
    .order("updated_at", { ascending: false });

  if (error) {
    console.warn("No se pudieron leer propiedades IDX desde Supabase:", error.message);
    return [];
  }

  return (data ?? [])
    .map((row: { payload?: IdxProperty | null }) => row.payload)
    .filter((property): property is IdxProperty => Boolean(property))
    .map((property) => withResolvedSupabasePhotoUrls(property, config))
    .filter(isAllowedIdxProperty);
}

export async function getSupabaseIdxListingById(id: string): Promise<IdxProperty | null> {
  const config = getSupabaseIdxConfig();
  const client = createSupabaseReadClient();
  if (!client || !config) return null;

  const { data, error } = await client
    .from("idx_listings")
    .select("payload")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.warn(`No se pudo leer propiedad ${id} desde Supabase:`, error.message);
    return null;
  }

  const property = (data?.payload as IdxProperty | undefined) ?? null;
  if (!property) return null;

  const resolvedProperty = withResolvedSupabasePhotoUrls(property, config);
  return isAllowedIdxProperty(resolvedProperty) ? resolvedProperty : null;
}
