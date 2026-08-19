import { createBlogPublicClient } from "./supabase-server";
import type { BlogPost } from "./types";

const BLOG_FIELDS =
  "id,title,slug,excerpt,content,cover_url,cover_path,status,published_at,created_at,updated_at,author_id";

export async function getPublishedBlogPosts(limit = 24): Promise<BlogPost[]> {
  const client = createBlogPublicClient();
  if (!client) return [];

  const { data, error } = await client
    .from("blog_posts")
    .select(BLOG_FIELDS)
    .eq("status", "published")
    .not("published_at", "is", null)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.warn("No se pudieron leer los articulos del blog:", error.message);
    return [];
  }

  return (data || []) as BlogPost[];
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const client = createBlogPublicClient();
  if (!client) return null;

  const { data, error } = await client
    .from("blog_posts")
    .select(BLOG_FIELDS)
    .eq("slug", slug)
    .eq("status", "published")
    .not("published_at", "is", null)
    .maybeSingle();

  if (error) {
    console.warn(`No se pudo leer el articulo ${slug}:`, error.message);
    return null;
  }

  return (data as BlogPost | null) || null;
}
