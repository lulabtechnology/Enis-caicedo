import { NextResponse } from "next/server";
import { requireBlogAdmin } from "@/lib/blog/auth";
import { BLOG_FIELDS, ensureUniqueBlogSlug, normalizeBlogPostInput } from "@/lib/blog/admin-posts";
import { createBlogAdminClient } from "@/lib/blog/supabase-server";
import type { BlogPostInput } from "@/lib/blog/types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await requireBlogAdmin(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  try {
    const client = createBlogAdminClient();
    const { data, error } = await client
      .from("blog_posts")
      .select(BLOG_FIELDS)
      .order("updated_at", { ascending: false });

    if (error) throw new Error(error.message);
    return NextResponse.json({ posts: data || [] });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudieron cargar los articulos.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireBlogAdmin(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  try {
    const body = (await request.json()) as BlogPostInput;
    const input = normalizeBlogPostInput(body);
    const client = createBlogAdminClient();
    const slug = await ensureUniqueBlogSlug(client, input.slug);
    const now = new Date().toISOString();

    const { data, error } = await client
      .from("blog_posts")
      .insert({
        ...input,
        slug,
        author_id: auth.user.id,
        published_at: input.status === "published" ? now : null,
        updated_at: now
      })
      .select(BLOG_FIELDS)
      .single();

    if (error) throw new Error(error.message);
    return NextResponse.json({ post: data }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo crear el articulo.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
