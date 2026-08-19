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

export function getBlogSupabaseConfig(): BlogSupabaseConfig | null {
  const url = clean(process.env.NEXT_PUBLIC_SUPABASE_URL) || clean(process.env.SUPABASE_URL);
  const publicKey =
    clean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) ||
    clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
    clean(process.env.SUPABASE_ANON_KEY);
  const secretKey = clean(process.env.SUPABASE_SECRET_KEY) || clean(process.env.SUPABASE_SERVICE_ROLE_KEY);

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
      "Faltan NEXT_PUBLIC_SUPABASE_URL y una clave publica de Supabase (NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY o NEXT_PUBLIC_SUPABASE_ANON_KEY)."
    );
  }
  if (!config.secretKey) {
    throw new Error("Falta SUPABASE_SECRET_KEY o SUPABASE_SERVICE_ROLE_KEY en el servidor.");
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
