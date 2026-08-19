import { revalidatePath } from "next/cache";
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

    revalidatePath("/blog");
    revalidatePath(`/blog/${current.slug}`);
    revalidatePath(`/blog/${slug}`);

    return NextResponse.json({ post: data }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo actualizar el articulo.";
    return NextResponse.json({ error: message }, { status: 400, headers: { "Cache-Control": "no-store" } });
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
      .select("id,slug,cover_path")
      .eq("id", params.id)
      .maybeSingle();

    if (currentError) throw new Error(currentError.message);
    if (!current) return NextResponse.json({ error: "Articulo no encontrado." }, { status: 404 });

    const { data: deletedRows, error: deleteError } = await client
      .from("blog_posts")
      .delete()
      .eq("id", params.id)
      .select("id");

    if (deleteError) throw new Error(deleteError.message);
    if (!deletedRows?.some((row) => row.id === params.id)) {
      throw new Error("Supabase no confirmo el borrado del articulo. Verifique la Secret Key del blog y los permisos de la tabla.");
    }

    const { data: stillExists, error: verifyError } = await client
      .from("blog_posts")
      .select("id")
      .eq("id", params.id)
      .maybeSingle();

    if (verifyError) throw new Error(verifyError.message);
    if (stillExists) {
      throw new Error("El articulo sigue existiendo en la base de datos despues del intento de borrado.");
    }

    if (current.cover_path) {
      const { error: removeError } = await client.storage.from(BLOG_COVERS_BUCKET).remove([current.cover_path]);
      if (removeError) console.warn("No se pudo borrar la portada del articulo:", removeError.message);
    }

    revalidatePath("/blog");
    revalidatePath(`/blog/${current.slug}`);

    return NextResponse.json(
      { ok: true, deletedId: params.id },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo borrar el articulo.";
    return NextResponse.json({ error: message }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }
}
