import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getBlogSupabaseConfig, requireBlogSupabaseConfig } from "./config";

const serverOptions = {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
};

export function createBlogPublicClient(): SupabaseClient | null {
  const config = getBlogSupabaseConfig();
  if (!config) return null;
  return createClient(config.url, config.publicKey, serverOptions);
}

export function createBlogAdminClient(): SupabaseClient {
  const config = requireBlogSupabaseConfig();
  return createClient(config.url, config.secretKey, serverOptions);
}

export function createBlogAuthVerifierClient(): SupabaseClient {
  const config = requireBlogSupabaseConfig();
  return createClient(config.url, config.publicKey, serverOptions);
}
