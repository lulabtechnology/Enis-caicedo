import type { User } from "@supabase/supabase-js";
import { createBlogAdminClient, createBlogAuthVerifierClient } from "./supabase-server";

export type BlogAdminAuthResult =
  | { ok: true; user: User }
  | { ok: false; status: number; message: string };

function bearerToken(request: Request): string {
  const value = request.headers.get("authorization") || "";
  const match = value.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || "";
}

export async function requireBlogAdmin(request: Request): Promise<BlogAdminAuthResult> {
  const token = bearerToken(request);
  if (!token) {
    return { ok: false, status: 401, message: "Sesion requerida." };
  }

  try {
    const verifier = createBlogAuthVerifierClient();
    const { data, error } = await verifier.auth.getUser(token);
    const user = data.user;

    if (error || !user) {
      return { ok: false, status: 401, message: "Sesion invalida o vencida." };
    }

    const admin = createBlogAdminClient();
    const { data: allowed, error: adminError } = await admin
      .from("blog_admins")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (adminError) {
      console.error("No se pudo validar blog_admins:", adminError.message);
      return { ok: false, status: 500, message: "No se pudo validar el acceso administrativo." };
    }

    if (!allowed) {
      return { ok: false, status: 403, message: "Este usuario no esta autorizado para administrar el blog." };
    }

    return { ok: true, user };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error de configuracion de Supabase.";
    console.error("Blog admin auth error:", message);
    return { ok: false, status: 500, message };
  }
}
