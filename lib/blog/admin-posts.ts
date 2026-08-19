import type { SupabaseClient } from "@supabase/supabase-js";
import { slugifyBlogTitle } from "./slug";
import type { BlogPost, BlogPostInput, BlogPostStatus } from "./types";

export const BLOG_FIELDS =
  "id,title,slug,excerpt,content,cover_url,cover_path,status,published_at,created_at,updated_at,author_id";

export type NormalizedBlogPostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_url: string | null;
  cover_path: string | null;
  status: BlogPostStatus;
};

export function normalizeBlogPostInput(input: BlogPostInput): NormalizedBlogPostInput {
  const title = String(input.title || "").trim().slice(0, 180);
  const content = String(input.content || "").trim();
  const excerpt = String(input.excerpt || "").trim().slice(0, 360);
  const requestedSlug = slugifyBlogTitle(String(input.slug || title));
  const status: BlogPostStatus = input.status === "published" ? "published" : "draft";
  const coverUrl = String(input.cover_url || "").trim() || null;
  const coverPath = String(input.cover_path || "").trim() || null;

  if (title.length < 4) throw new Error("El titulo debe tener al menos 4 caracteres.");
  if (content.length < 20) throw new Error("El contenido debe tener al menos 20 caracteres.");
  if (!requestedSlug) throw new Error("No se pudo generar un slug valido.");

  return {
    title,
    slug: requestedSlug,
    excerpt: excerpt || content.replace(/[#>*_\-\[\]()]/g, " ").replace(/\s+/g, " ").slice(0, 220).trim(),
    content,
    cover_url: coverUrl,
    cover_path: coverPath,
    status
  };
}

export async function ensureUniqueBlogSlug(
  client: SupabaseClient,
  desiredSlug: string,
  excludeId?: string
): Promise<string> {
  const base = desiredSlug || "articulo";
  let candidate = base;

  for (let attempt = 1; attempt <= 50; attempt += 1) {
    let query = client.from("blog_posts").select("id").eq("slug", candidate).limit(1);
    if (excludeId) query = query.neq("id", excludeId);
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    if (!data?.length) return candidate;
    candidate = `${base}-${attempt + 1}`;
  }

  return `${base}-${Date.now()}`;
}

export function blogPostFromRow(row: unknown): BlogPost {
  return row as BlogPost;
}
