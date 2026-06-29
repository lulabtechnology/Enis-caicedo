import { createClient, type SupabaseClient } from "@supabase/supabase-js";
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

export function getSupabaseIdxConfig(): SupabaseIdxConfig | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || DEFAULT_SUPABASE_BUCKET;

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

export function createSupabaseReadClient(): SupabaseClient | null {
  const config = getSupabaseIdxConfig();
  const key = config?.anonKey || config?.serviceRoleKey;

  if (!config?.url || !key) return null;

  return createClient(config.url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

export function createSupabaseAdminClient(): SupabaseClient {
  const config = requireSupabaseAdminConfig();

  return createClient(config.url, config.serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
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
  const client = createSupabaseReadClient();
  if (!client) return [];

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
    .filter((property): property is IdxProperty => Boolean(property));
}

export async function getSupabaseIdxListingById(id: string): Promise<IdxProperty | null> {
  const client = createSupabaseReadClient();
  if (!client) return null;

  const { data, error } = await client
    .from("idx_listings")
    .select("payload")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.warn(`No se pudo leer propiedad ${id} desde Supabase:`, error.message);
    return null;
  }

  return (data?.payload as IdxProperty | undefined) ?? null;
}
