"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

export function getBlogBrowserClient(): SupabaseClient {
  if (browserClient) return browserClient;

  const url = String(process.env.NEXT_PUBLIC_BLOG_SUPABASE_URL || "").trim();
  const key = String(
    process.env.NEXT_PUBLIC_BLOG_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_BLOG_SUPABASE_ANON_KEY ||
      ""
  ).trim();

  if (!url || !key) {
    throw new Error("Falta la configuracion publica del Supabase exclusivo del blog en Vercel.");
  }

  browserClient = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });

  return browserClient;
}
