export const BLOG_COVERS_BUCKET = "blog-covers";

function clean(value: string | undefined): string {
  return String(value || "")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim();
}

export type BlogSupabaseConfig = {
  url: string;
  publicKey: string;
  secretKey?: string;
};

/**
 * Blog Supabase is intentionally isolated from the IDX Supabase project.
 * Do not fall back to the generic SUPABASE_* variables used by IDX.
 */
export function getBlogSupabaseConfig(): BlogSupabaseConfig | null {
  const url = clean(process.env.NEXT_PUBLIC_BLOG_SUPABASE_URL) || clean(process.env.BLOG_SUPABASE_URL);
  const publicKey =
    clean(process.env.NEXT_PUBLIC_BLOG_SUPABASE_PUBLISHABLE_KEY) ||
    clean(process.env.NEXT_PUBLIC_BLOG_SUPABASE_ANON_KEY) ||
    clean(process.env.BLOG_SUPABASE_ANON_KEY);
  const secretKey =
    clean(process.env.BLOG_SUPABASE_SECRET_KEY) || clean(process.env.BLOG_SUPABASE_SERVICE_ROLE_KEY);

  if (!url || !publicKey) return null;

  return {
    url,
    publicKey,
    secretKey: secretKey || undefined
  };
}

export function requireBlogSupabaseConfig(): Required<BlogSupabaseConfig> {
  const config = getBlogSupabaseConfig();
  if (!config) {
    throw new Error(
      "Faltan NEXT_PUBLIC_BLOG_SUPABASE_URL y una clave publica del Supabase del blog (NEXT_PUBLIC_BLOG_SUPABASE_PUBLISHABLE_KEY o NEXT_PUBLIC_BLOG_SUPABASE_ANON_KEY)."
    );
  }
  if (!config.secretKey) {
    throw new Error("Falta BLOG_SUPABASE_SECRET_KEY o BLOG_SUPABASE_SERVICE_ROLE_KEY en el servidor.");
  }
  return {
    url: config.url,
    publicKey: config.publicKey,
    secretKey: config.secretKey
  };
}

export function publicSiteUrl(): string {
  const configured = clean(process.env.NEXT_PUBLIC_SITE_URL);
  return (configured || "https://eniscaicedo.com").replace(/\/+$/, "");
}
