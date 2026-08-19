import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { requireBlogAdmin } from "@/lib/blog/auth";
import { BLOG_COVERS_BUCKET } from "@/lib/blog/config";
import { createBlogAdminClient } from "@/lib/blog/supabase-server";

export const dynamic = "force-dynamic";

const MIME_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif"
};

export async function POST(request: Request) {
  const auth = await requireBlogAdmin(request);
  if (!auth.ok) return NextResponse.json({ error: auth.message }, { status: auth.status });

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Debe seleccionar una imagen." }, { status: 400 });
    }

    const extension = MIME_EXTENSIONS[file.type];
    if (!extension) {
      return NextResponse.json({ error: "Formato no permitido. Use JPG, PNG, WEBP o AVIF." }, { status: 400 });
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "La portada no puede superar 5 MB." }, { status: 400 });
    }

    const month = new Date().toISOString().slice(0, 7).replace("-", "/");
    const path = `covers/${month}/${randomUUID()}.${extension}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    const client = createBlogAdminClient();

    const { error } = await client.storage.from(BLOG_COVERS_BUCKET).upload(path, bytes, {
      contentType: file.type,
      cacheControl: "31536000",
      upsert: false
    });

    if (error) throw new Error(error.message);

    const { data } = client.storage.from(BLOG_COVERS_BUCKET).getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl, path });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo subir la portada.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
