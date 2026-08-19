import { NextResponse } from "next/server";
import { requireBlogAdmin } from "@/lib/blog/auth";
import { BLOG_FIELDS, ensureUniqueBlogSlug, normalizeBlogPostInput } from "@/lib/blog/admin-posts";
import { BLOG_COVERS_BUCKET } from "@/lib/blog/config";
import { createBlogAdminClient } from "@/lib/blog/supabase-server";
import type { BlogPostInput } from "@/lib/blog/types";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const auth = await requireBlogAdmin(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  try {
    const body = (await request.json()) as BlogPostInput;
    const input = normalizeBlogPostInput(body);
    const client = createBlogAdminClient();

    const { data: current, error: currentError } = await client
      .from("blog_posts")
      .select("id,slug,cover_path,published_at,status")
      .eq("id", params.id)
      .maybeSingle();

    if (currentError) throw new Error(currentError.message);
    if (!current) return NextResponse.json({ error: "Articulo no encontrado." }, { status: 404 });

    const slug = await ensureUniqueBlogSlug(client, input.slug, params.id);
    const now = new Date().toISOString();
    const publishedAt = input.status === "published" ? current.published_at || now : null;

    const { data, error } = await client
      .from("blog_posts")
      .update({
        ...input,
        slug,
        published_at: publishedAt,
        updated_at: now
      })
      .eq("id", params.id)
      .select(BLOG_FIELDS)
      .single();

    if (error) throw new Error(error.message);

    if (current.cover_path && current.cover_path !== input.cover_path) {
      const { error: removeError } = await client.storage.from(BLOG_COVERS_BUCKET).remove([current.cover_path]);
      if (removeError) console.warn("No se pudo borrar la portada anterior:", removeError.message);
    }

    return NextResponse.json({ post: data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo actualizar el articulo.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const auth = await requireBlogAdmin(request);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  try {
    const client = createBlogAdminClient();
    const { data: current, error: currentError } = await client
      .from("blog_posts")
      .select("id,cover_path")
      .eq("id", params.id)
      .maybeSingle();

    if (currentError) throw new Error(currentError.message);
    if (!current) return NextResponse.json({ error: "Articulo no encontrado." }, { status: 404 });

    const { error } = await client.from("blog_posts").delete().eq("id", params.id);
    if (error) throw new Error(error.message);

    if (current.cover_path) {
      const { error: removeError } = await client.storage.from(BLOG_COVERS_BUCKET).remove([current.cover_path]);
      if (removeError) console.warn("No se pudo borrar la portada del articulo:", removeError.message);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo borrar el articulo.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
