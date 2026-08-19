"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  CheckCircle2,
  Eye,
  FilePenLine,
  ImagePlus,
  KeyRound,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  X
} from "lucide-react";
import { getBlogBrowserClient } from "@/lib/blog/supabase-browser";
import { slugifyBlogTitle } from "@/lib/blog/slug";
import type { BlogPost, BlogPostStatus } from "@/lib/blog/types";

const EMPTY_FORM = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_url: "",
  cover_path: "",
  status: "draft" as BlogPostStatus
};

type FormState = typeof EMPTY_FORM;

type ApiPayload = {
  posts?: BlogPost[];
  post?: BlogPost;
  url?: string;
  path?: string;
  error?: string;
};

function formatDate(value: string | null): string {
  if (!value) return "Sin publicar";
  try {
    return new Intl.DateTimeFormat("es-PA", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(new Date(value));
  } catch {
    return "Sin fecha";
  }
}

export default function AdminBlogDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  const counts = useMemo(() => {
    return {
      total: posts.length,
      published: posts.filter((post) => post.status === "published").length,
      drafts: posts.filter((post) => post.status === "draft").length
    };
  }, [posts]);

  const authorizedFetch = useCallback(async (url: string, init?: RequestInit) => {
    const supabase = getBlogBrowserClient();
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    if (!token) {
      router.replace("/admin/blog/login");
      throw new Error("Sesion requerida.");
    }

    const headers = new Headers(init?.headers);
    headers.set("Authorization", `Bearer ${token}`);

    const response = await fetch(url, { ...init, headers, cache: "no-store" });
    const payload = (await response.json().catch(() => ({}))) as ApiPayload;

    if (response.status === 401) {
      await supabase.auth.signOut();
      router.replace("/admin/blog/login");
      throw new Error("La sesion vencio. Inicia sesion nuevamente.");
    }

    if (!response.ok) {
      throw new Error(payload.error || "No se pudo completar la operacion.");
    }

    return payload;
  }, [router]);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const payload = await authorizedFetch("/api/blog/admin/posts");
      setPosts(payload.posts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo cargar el blog.");
    } finally {
      setLoading(false);
    }
  }, [authorizedFetch]);

  useEffect(() => {
    let active = true;

    async function boot() {
      try {
        const supabase = getBlogBrowserClient();
        const { data } = await supabase.auth.getSession();
        if (!active) return;
        if (!data.session) {
          router.replace("/admin/blog/login");
          return;
        }
        await loadPosts();
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : "No se pudo iniciar el panel.");
      }
    }

    void boot();
    return () => {
      active = false;
    };
  }, [loadPosts, router]);

  function startNew() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function editPost(post: BlogPost) {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      cover_url: post.cover_url || "",
      cover_path: post.cover_path || "",
      status: post.status
    });
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function uploadCover(file: File) {
    setUploading(true);
    setError("");
    setMessage("");
    try {
      const data = new FormData();
      data.set("file", file);
      const payload = await authorizedFetch("/api/blog/admin/upload", { method: "POST", body: data });
      setForm((current) => ({
        ...current,
        cover_url: payload.url || "",
        cover_path: payload.path || ""
      }));
      setMessage("Portada subida. Guarda el articulo para aplicar el cambio.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo subir la portada.");
    } finally {
      setUploading(false);
    }
  }

  async function savePost(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const endpoint = editingId ? `/api/blog/admin/posts/${editingId}` : "/api/blog/admin/posts";
      const payload = await authorizedFetch(endpoint, {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const saved = payload.post;
      if (saved) {
        setPosts((current) => {
          const exists = current.some((post) => post.id === saved.id);
          const next = exists ? current.map((post) => (post.id === saved.id ? saved : post)) : [saved, ...current];
          return next.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        });
        editPost(saved);
      }
      setMessage(editingId ? "Articulo actualizado correctamente." : "Articulo creado correctamente.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar el articulo.");
    } finally {
      setSaving(false);
    }
  }

  async function deletePost(post: BlogPost) {
    const confirmed = window.confirm(`¿Borrar definitivamente “${post.title}”? Esta accion no se puede deshacer.`);
    if (!confirmed) return;

    setError("");
    setMessage("");
    try {
      await authorizedFetch(`/api/blog/admin/posts/${post.id}`, { method: "DELETE" });
      setPosts((current) => current.filter((item) => item.id !== post.id));
      if (editingId === post.id) startNew();
      setMessage("Articulo borrado correctamente.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo borrar el articulo.");
    }
  }

  async function logout() {
    const supabase = getBlogBrowserClient();
    await supabase.auth.signOut();
    router.replace("/admin/blog/login");
  }

  async function changePassword(event: FormEvent) {
    event.preventDefault();
    setPasswordMessage("");
    setPasswordError("");

    if (newPassword.length < 10) {
      setPasswordError("La nueva contraseña debe tener al menos 10 caracteres.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Las contraseñas nuevas no coinciden.");
      return;
    }

    setChangingPassword(true);
    try {
      const supabase = getBlogBrowserClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
        current_password: currentPassword
      });
      if (updateError) throw updateError;

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMessage("Contraseña actualizada correctamente.");
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "No se pudo cambiar la contraseña.");
    } finally {
      setChangingPassword(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="border-b border-white/10 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-aqua to-brand-deep shadow-glow">
              <BookOpen size={20} />
            </div>
            <div>
              <p className="text-sm font-bold">Enis Caicedo</p>
              <p className="text-xs text-slate-400">Panel de administración del blog</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="/blog"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-slate-200 no-underline transition hover:bg-white/10"
            >
              <Eye size={14} /> Ver blog
            </a>
            <button
              type="button"
              onClick={() => void logout()}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/10"
            >
              <LogOut size={14} /> Salir
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Total</p>
            <p className="mt-2 text-3xl font-black">{counts.total}</p>
          </div>
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.05] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300/70">Publicados</p>
            <p className="mt-2 text-3xl font-black">{counts.published}</p>
          </div>
          <div className="rounded-3xl border border-amber-400/20 bg-amber-400/[0.05] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300/70">Borradores</p>
            <p className="mt-2 text-3xl font-black">{counts.drafts}</p>
          </div>
        </div>

        {(message || error) && (
          <div className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${error ? "border-rose-400/30 bg-rose-400/10 text-rose-100" : "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"}`}>
            {error || message}
          </div>
        )}

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)]">
          <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-aqua">Editor</p>
                <h1 className="mt-2 text-2xl font-black">{editingId ? "Editar artículo" : "Nuevo artículo"}</h1>
              </div>
              {editingId && (
                <button
                  type="button"
                  onClick={startNew}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-bold transition hover:bg-white/10"
                >
                  <Plus size={14} /> Nuevo
                </button>
              )}
            </div>

            <form onSubmit={savePost} className="mt-7 space-y-5">
              <label className="block">
                <span className="text-xs font-bold text-slate-300">Título</span>
                <input
                  value={form.title}
                  onChange={(event) => {
                    const title = event.target.value;
                    setForm((current) => ({
                      ...current,
                      title,
                      slug: editingId || current.slug ? current.slug : slugifyBlogTitle(title)
                    }));
                  }}
                  onBlur={() => {
                    if (!form.slug) setForm((current) => ({ ...current, slug: slugifyBlogTitle(current.title) }));
                  }}
                  required
                  maxLength={180}
                  placeholder="Ej. 5 aspectos legales antes de comprar una propiedad"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none transition placeholder:text-slate-600 focus:border-brand-aqua"
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-[1fr_180px]">
                <label className="block">
                  <span className="text-xs font-bold text-slate-300">Slug / URL</span>
                  <div className="mt-2 flex rounded-2xl border border-white/10 bg-slate-900 focus-within:border-brand-aqua">
                    <span className="hidden border-r border-white/10 px-3 py-3 text-xs text-slate-600 sm:inline">/blog/</span>
                    <input
                      value={form.slug}
                      onChange={(event) => setForm((current) => ({ ...current, slug: slugifyBlogTitle(event.target.value) }))}
                      placeholder="titulo-del-articulo"
                      className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-xs font-bold text-slate-300">Estado</span>
                  <select
                    value={form.status}
                    onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as BlogPostStatus }))}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-brand-aqua"
                  >
                    <option value="draft">Borrador</option>
                    <option value="published">Publicado</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="text-xs font-bold text-slate-300">Resumen</span>
                <textarea
                  value={form.excerpt}
                  onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value.slice(0, 360) }))}
                  rows={3}
                  maxLength={360}
                  placeholder="Descripción breve que aparecerá en la tarjeta y en Google."
                  className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-slate-600 focus:border-brand-aqua"
                />
                <span className="mt-1 block text-right text-[11px] text-slate-600">{form.excerpt.length}/360</span>
              </label>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-slate-300">Foto de portada</span>
                  {form.cover_url && (
                    <button
                      type="button"
                      onClick={() => setForm((current) => ({ ...current, cover_url: "", cover_path: "" }))}
                      className="inline-flex items-center gap-1 text-xs font-bold text-rose-300 hover:text-rose-200"
                    >
                      <X size={13} /> Quitar portada
                    </button>
                  )}
                </div>

                {form.cover_url ? (
                  <div className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
                    <img src={form.cover_url} alt="Vista previa de portada" className="aspect-[16/7] w-full object-cover" />
                  </div>
                ) : null}

                <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] px-4 py-4 text-sm font-bold text-slate-300 transition hover:border-brand-aqua/60 hover:bg-brand-aqua/[0.04]">
                  {uploading ? <RefreshCw size={17} className="animate-spin" /> : <ImagePlus size={17} />}
                  {uploading ? "Subiendo..." : form.cover_url ? "Reemplazar portada" : "Subir portada"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    className="sr-only"
                    disabled={uploading}
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) void uploadCover(file);
                      event.target.value = "";
                    }}
                  />
                </label>
                <p className="mt-2 text-[11px] text-slate-600">JPG, PNG, WEBP o AVIF. Máximo 5 MB.</p>
              </div>

              <label className="block">
                <span className="text-xs font-bold text-slate-300">Contenido</span>
                <textarea
                  value={form.content}
                  onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
                  rows={18}
                  required
                  placeholder={"Escriba aquí el artículo...\n\n## Subtítulo\nTexto del artículo.\n\n- Punto importante\n- Otro punto\n\n**Texto en negrita**"}
                  className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-slate-900 px-4 py-4 font-mono text-sm leading-7 outline-none transition placeholder:text-slate-600 focus:border-brand-aqua"
                />
                <p className="mt-2 text-[11px] leading-5 text-slate-500">
                  Formato simple: <strong>## Subtítulo</strong>, <strong>### Subtítulo pequeño</strong>, <strong>- lista</strong>, <strong>**negrita**</strong>, <strong>&gt; cita</strong> y enlaces como <strong>[texto](https://...)</strong>.
                </p>
              </label>

              <button
                type="submit"
                disabled={saving || uploading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-aqua via-brand-teal to-brand-deep px-5 py-3.5 text-sm font-black text-white shadow-glow transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? <RefreshCw size={17} className="animate-spin" /> : <Save size={17} />}
                {saving ? "Guardando..." : editingId ? "Guardar cambios" : "Crear artículo"}
              </button>
            </form>
          </section>

          <div className="space-y-8">
            <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-aqua">Contenido</p>
                  <h2 className="mt-2 text-xl font-black">Artículos</h2>
                </div>
                <button
                  type="button"
                  onClick={() => void loadPosts()}
                  disabled={loading}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:bg-white/10 disabled:opacity-50"
                  aria-label="Actualizar artículos"
                >
                  <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {loading ? (
                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-8 text-center text-sm text-slate-500">Cargando artículos...</div>
                ) : posts.length ? (
                  posts.map((post) => (
                    <article key={post.id} className={`rounded-2xl border p-4 transition ${editingId === post.id ? "border-brand-aqua/60 bg-brand-aqua/[0.06]" : "border-white/10 bg-slate-900/55"}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${post.status === "published" ? "bg-emerald-400/10 text-emerald-300" : "bg-amber-400/10 text-amber-300"}`}>
                              {post.status === "published" ? "Publicado" : "Borrador"}
                            </span>
                            <span className="text-[11px] text-slate-600">{formatDate(post.published_at)}</span>
                          </div>
                          <h3 className="mt-2 text-sm font-bold leading-5 text-white">{post.title}</h3>
                          <p className="mt-1 truncate text-[11px] text-slate-600">/blog/{post.slug}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => editPost(post)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-bold text-slate-300 transition hover:bg-white/10"
                        >
                          <FilePenLine size={13} /> Editar
                        </button>
                        {post.status === "published" && (
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-bold text-slate-300 no-underline transition hover:bg-white/10"
                          >
                            <Eye size={13} /> Ver
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => void deletePost(post)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/20 px-3 py-1.5 text-[11px] font-bold text-rose-300 transition hover:bg-rose-400/10"
                        >
                          <Trash2 size={13} /> Borrar
                        </button>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-8 text-center">
                    <CheckCircle2 size={22} className="mx-auto text-brand-aqua" />
                    <p className="mt-3 text-sm font-bold">Aún no hay artículos.</p>
                    <p className="mt-1 text-xs text-slate-500">Cree el primero desde el editor.</p>
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-aqua/10 text-brand-aqua">
                  <KeyRound size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-aqua">Seguridad</p>
                  <h2 className="mt-1 text-lg font-black">Cambiar contraseña</h2>
                </div>
              </div>

              <form onSubmit={changePassword} className="mt-5 space-y-3">
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Contraseña actual"
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-brand-aqua"
                />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  required
                  minLength={10}
                  autoComplete="new-password"
                  placeholder="Nueva contraseña"
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-brand-aqua"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  minLength={10}
                  autoComplete="new-password"
                  placeholder="Confirmar nueva contraseña"
                  className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-brand-aqua"
                />

                {passwordError && <p className="text-xs leading-5 text-rose-300">{passwordError}</p>}
                {passwordMessage && <p className="text-xs leading-5 text-emerald-300">{passwordMessage}</p>}

                <button
                  type="submit"
                  disabled={changingPassword}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-xs font-black transition hover:bg-white/10 disabled:opacity-50"
                >
                  {changingPassword ? <RefreshCw size={14} className="animate-spin" /> : <KeyRound size={14} />}
                  {changingPassword ? "Actualizando..." : "Actualizar contraseña"}
                </button>
              </form>

              <a href="/admin/blog/recuperar" className="mt-4 block text-center text-xs font-semibold text-slate-500 no-underline hover:text-slate-300">
                No recuerdo mi contraseña
              </a>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
