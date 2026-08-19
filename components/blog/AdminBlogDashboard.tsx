"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  Eye,
  FilePenLine,
  FileText,
  ImagePlus,
  KeyRound,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  Search,
  ShieldCheck,
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
  deletedId?: string;
  error?: string;
};

const inputClass =
  "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-teal focus:ring-4 focus:ring-brand-aqua/10";

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
  const [userEmail, setUserEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingDelete, setPendingDelete] = useState<BlogPost | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  const counts = useMemo(() => ({
    total: posts.length,
    published: posts.filter((post) => post.status === "published").length,
    drafts: posts.filter((post) => post.status === "draft").length
  }), [posts]);

  const visiblePosts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return posts;
    return posts.filter((post) =>
      `${post.title} ${post.slug} ${post.excerpt}`.toLowerCase().includes(query)
    );
  }, [posts, searchTerm]);

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
        setUserEmail(data.session.user.email || "Administrador");
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
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar el articulo.");
    } finally {
      setSaving(false);
    }
  }

  async function deletePost(post: BlogPost) {
    setDeletingId(post.id);
    setError("");
    setMessage("");

    try {
      const payload = await authorizedFetch(`/api/blog/admin/posts/${post.id}`, { method: "DELETE" });
      if (payload.deletedId !== post.id) {
        throw new Error("El servidor no confirmo el identificador del articulo eliminado.");
      }

      if (editingId === post.id) {
        setEditingId(null);
        setForm(EMPTY_FORM);
      }

      await loadPosts();
      setPendingDelete(null);
      setMessage("Articulo eliminado de la base de datos y retirado del blog publico.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo borrar el articulo.");
    } finally {
      setDeletingId(null);
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
    <div className="min-h-screen bg-[#f4f8f8] text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-deep text-white shadow-soft">
              <BookOpen size={20} />
            </div>
            <div>
              <p className="text-sm font-black tracking-tight text-brand-ink">Enis Caicedo</p>
              <p className="text-xs text-slate-500">Administración de contenido</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="hidden rounded-full bg-brand-ice px-3 py-2 text-[11px] font-bold text-brand-deep sm:block">
              {userEmail || "Administrador"}
            </div>
            <a
              href="/blog"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 no-underline transition hover:border-brand-mist hover:text-brand-deep"
            >
              <Eye size={14} /> Ver blog
            </a>
            <button
              type="button"
              onClick={() => void logout()}
              className="inline-flex items-center gap-2 rounded-full bg-brand-deep px-4 py-2 text-xs font-black text-white transition hover:bg-brand-ink"
            >
              <LogOut size={14} /> Salir
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1480px] px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
        <section className="overflow-hidden rounded-[30px] border border-brand-mist/70 bg-gradient-to-br from-white via-brand-ice/70 to-white p-6 shadow-soft sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-brand-teal shadow-sm ring-1 ring-brand-mist/80">
                <ShieldCheck size={13} /> Panel privado
              </div>
              <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl">
                Blog de Enis Caicedo
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                Cree, publique, edite y elimine artículos desde un solo lugar. Los cambios publicados se reflejan en el blog público.
              </p>
            </div>
            <button
              type="button"
              onClick={startNew}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-aqua px-5 py-3 text-sm font-black text-white shadow-glow transition hover:bg-brand-teal"
            >
              <Plus size={17} /> Nuevo artículo
            </button>
          </div>
        </section>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Total</p>
                <p className="mt-2 text-3xl font-black text-brand-ink">{counts.total}</p>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 text-slate-600"><FileText size={19} /></div>
            </div>
          </div>
          <div className="rounded-[24px] border border-emerald-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">Publicados</p>
                <p className="mt-2 text-3xl font-black text-brand-ink">{counts.published}</p>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-600"><CheckCircle2 size={19} /></div>
            </div>
          </div>
          <div className="rounded-[24px] border border-amber-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-600">Borradores</p>
                <p className="mt-2 text-3xl font-black text-brand-ink">{counts.drafts}</p>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-50 text-amber-600"><Clock3 size={19} /></div>
            </div>
          </div>
        </div>

        {(message || error) && (
          <div className={`mt-6 rounded-2xl border px-4 py-3 text-sm font-semibold ${error ? "border-rose-200 bg-rose-50 text-rose-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
            {error || message}
          </div>
        )}

        <div className="mt-7 grid gap-7 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-teal">Editor</p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-brand-ink">
                  {editingId ? "Editar artículo" : "Crear artículo"}
                </h2>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {editingId ? "Modifique el contenido y guarde los cambios." : "Complete los campos y elija si desea guardar como borrador o publicar."}
                </p>
              </div>
              {editingId && (
                <button
                  type="button"
                  onClick={startNew}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-black text-slate-600 transition hover:border-brand-mist hover:text-brand-deep"
                >
                  <Plus size={14} /> Nuevo
                </button>
              )}
            </div>

            <form onSubmit={savePost} className="mt-6 space-y-5">
              <label className="block">
                <span className="text-xs font-black text-slate-700">Título</span>
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
                  className={inputClass}
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-[1fr_190px]">
                <label className="block">
                  <span className="text-xs font-black text-slate-700">Slug / URL</span>
                  <div className="mt-2 flex overflow-hidden rounded-2xl border border-slate-200 bg-white transition focus-within:border-brand-teal focus-within:ring-4 focus-within:ring-brand-aqua/10">
                    <span className="hidden border-r border-slate-200 bg-slate-50 px-3 py-3 text-xs font-semibold text-slate-400 sm:inline">/blog/</span>
                    <input
                      value={form.slug}
                      onChange={(event) => setForm((current) => ({ ...current, slug: slugifyBlogTitle(event.target.value) }))}
                      placeholder="titulo-del-articulo"
                      className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-slate-700 outline-none"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-xs font-black text-slate-700">Estado</span>
                  <select
                    value={form.status}
                    onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as BlogPostStatus }))}
                    className={inputClass}
                  >
                    <option value="draft">Borrador</option>
                    <option value="published">Publicado</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="text-xs font-black text-slate-700">Resumen</span>
                <textarea
                  value={form.excerpt}
                  onChange={(event) => setForm((current) => ({ ...current, excerpt: event.target.value.slice(0, 360) }))}
                  rows={3}
                  maxLength={360}
                  placeholder="Descripción breve que aparecerá en la tarjeta y en Google."
                  className={`${inputClass} resize-y leading-6`}
                />
                <span className="mt-1 block text-right text-[11px] font-semibold text-slate-400">{form.excerpt.length}/360</span>
              </label>

              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-black text-slate-700">Foto de portada</span>
                  {form.cover_url && (
                    <button
                      type="button"
                      onClick={() => setForm((current) => ({ ...current, cover_url: "", cover_path: "" }))}
                      className="inline-flex items-center gap-1 text-xs font-black text-rose-600 hover:text-rose-700"
                    >
                      <X size={13} /> Quitar portada
                    </button>
                  )}
                </div>

                {form.cover_url ? (
                  <div className="mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                    <img src={form.cover_url} alt="Vista previa de portada" className="aspect-[16/7] w-full object-cover" />
                  </div>
                ) : null}

                <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-brand-mist bg-brand-ice/50 px-4 py-4 text-sm font-black text-brand-deep transition hover:border-brand-aqua hover:bg-brand-ice">
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
                <p className="mt-2 text-[11px] font-medium text-slate-400">JPG, PNG, WEBP o AVIF. Máximo 5 MB.</p>
              </div>

              <label className="block">
                <span className="text-xs font-black text-slate-700">Contenido</span>
                <textarea
                  value={form.content}
                  onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
                  rows={18}
                  required
                  placeholder={"Escriba aquí el artículo...\n\n## Subtítulo\nTexto del artículo.\n\n- Punto importante\n- Otro punto\n\n**Texto en negrita**"}
                  className={`${inputClass} resize-y font-mono leading-7`}
                />
                <p className="mt-2 text-[11px] leading-5 text-slate-500">
                  Formato: <strong>## Subtítulo</strong>, <strong>### Subtítulo pequeño</strong>, <strong>- lista</strong>, <strong>**negrita**</strong>, <strong>&gt; cita</strong> y <strong>[texto](https://...)</strong>.
                </p>
              </label>

              <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-slate-500">
                  {form.status === "published" ? "Al guardar, el artículo será visible públicamente." : "El borrador solo será visible dentro del panel."}
                </p>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-deep px-6 py-3.5 text-sm font-black text-white shadow-soft transition hover:bg-brand-ink disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? <RefreshCw size={17} className="animate-spin" /> : <Save size={17} />}
                  {saving ? "Guardando..." : editingId ? "Guardar cambios" : "Crear artículo"}
                </button>
              </div>
            </form>
          </section>

          <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-teal">Contenido</p>
                  <h2 className="mt-1 font-display text-xl font-semibold text-brand-ink">Artículos</h2>
                </div>
                <button
                  type="button"
                  onClick={() => void loadPosts()}
                  disabled={loading}
                  className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-brand-mist hover:text-brand-teal disabled:opacity-50"
                  aria-label="Actualizar artículos"
                >
                  <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
                </button>
              </div>

              <div className="relative mt-4">
                <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Buscar artículo..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-xs outline-none transition focus:border-brand-teal focus:bg-white"
                />
              </div>

              <div className="mt-4 max-h-[650px] space-y-3 overflow-y-auto pr-1">
                {loading ? (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">Cargando artículos...</div>
                ) : visiblePosts.length ? (
                  visiblePosts.map((post) => (
                    <article key={post.id} className={`rounded-2xl border p-3.5 transition ${editingId === post.id ? "border-brand-aqua bg-brand-ice/70" : "border-slate-200 bg-white hover:border-brand-mist"}`}>
                      <div className="flex gap-3">
                        {post.cover_url ? (
                          <img src={post.cover_url} alt="" className="h-16 w-20 shrink-0 rounded-xl object-cover" />
                        ) : (
                          <div className="grid h-16 w-20 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-400"><FileText size={18} /></div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wide ${post.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                              {post.status === "published" ? "Publicado" : "Borrador"}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400">{formatDate(post.published_at)}</span>
                          </div>
                          <h3 className="mt-1.5 line-clamp-2 text-sm font-black leading-5 text-brand-ink">{post.title}</h3>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
                        <button
                          type="button"
                          onClick={() => editPost(post)}
                          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-black text-slate-600 transition hover:border-brand-mist hover:text-brand-deep"
                        >
                          <FilePenLine size={13} /> Editar
                        </button>
                        {post.status === "published" && (
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-black text-slate-600 no-underline transition hover:border-brand-mist hover:text-brand-deep"
                          >
                            <Eye size={13} /> Ver
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => setPendingDelete(post)}
                          disabled={deletingId === post.id}
                          className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-[11px] font-black text-rose-700 transition hover:bg-rose-100 disabled:opacity-50"
                        >
                          {deletingId === post.id ? <RefreshCw size={13} className="animate-spin" /> : <Trash2 size={13} />}
                          Borrar
                        </button>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center">
                    <CheckCircle2 size={22} className="mx-auto text-brand-teal" />
                    <p className="mt-3 text-sm font-black text-brand-ink">{searchTerm ? "Sin resultados" : "Aún no hay artículos"}</p>
                    <p className="mt-1 text-xs text-slate-500">{searchTerm ? "Pruebe con otra búsqueda." : "Cree el primero desde el editor."}</p>
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-ice text-brand-teal">
                  <KeyRound size={18} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-teal">Seguridad</p>
                  <h2 className="mt-1 font-display text-lg font-semibold text-brand-ink">Cambiar contraseña</h2>
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
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-brand-teal focus:bg-white"
                />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  required
                  minLength={10}
                  autoComplete="new-password"
                  placeholder="Nueva contraseña"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-brand-teal focus:bg-white"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  minLength={10}
                  autoComplete="new-password"
                  placeholder="Confirmar nueva contraseña"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-brand-teal focus:bg-white"
                />

                {passwordError && <p className="text-xs leading-5 text-rose-600">{passwordError}</p>}
                {passwordMessage && <p className="text-xs leading-5 text-emerald-600">{passwordMessage}</p>}

                <button
                  type="submit"
                  disabled={changingPassword}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-brand-mist bg-brand-ice px-4 py-3 text-xs font-black text-brand-deep transition hover:bg-brand-mist/60 disabled:opacity-50"
                >
                  {changingPassword ? <RefreshCw size={14} className="animate-spin" /> : <KeyRound size={14} />}
                  {changingPassword ? "Actualizando..." : "Actualizar contraseña"}
                </button>
              </form>

              <a href="/admin/blog/recuperar" className="mt-4 block text-center text-xs font-bold text-slate-400 no-underline hover:text-brand-teal">
                No recuerdo mi contraseña
              </a>
            </section>
          </aside>
        </div>
      </main>

      {pendingDelete && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-brand-ink/55 px-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl sm:p-7">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-50 text-rose-600">
              <Trash2 size={20} />
            </div>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-rose-600">Eliminar definitivamente</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-brand-ink">¿Borrar este artículo?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              “{pendingDelete.title}” será eliminado de Supabase y dejará de mostrarse en el blog público. Esta acción no se puede deshacer.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                disabled={Boolean(deletingId)}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => void deletePost(pendingDelete)}
                disabled={Boolean(deletingId)}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-600 px-5 py-3 text-sm font-black text-white transition hover:bg-rose-700 disabled:opacity-50"
              >
                {deletingId ? <RefreshCw size={16} className="animate-spin" /> : <Trash2 size={16} />}
                {deletingId ? "Eliminando..." : "Sí, borrar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
