"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Eye, LockKeyhole, LogIn, RefreshCw, ShieldCheck } from "lucide-react";
import { getBlogBrowserClient } from "@/lib/blog/supabase-browser";

export default function BlogAdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function check() {
      try {
        const supabase = getBlogBrowserClient();
        const { data } = await supabase.auth.getSession();
        if (data.session) router.replace("/admin/blog");
      } catch {
        // El formulario mostrara el error de configuracion al intentar iniciar sesion.
      }
    }
    void check();
  }, [router]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = getBlogBrowserClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (signInError || !data.session) throw signInError || new Error("No se pudo iniciar sesion.");

      const response = await fetch("/api/blog/admin/posts", {
        headers: { Authorization: `Bearer ${data.session.access_token}` },
        cache: "no-store"
      });
      const payload = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        await supabase.auth.signOut();
        throw new Error(payload.error || "Este usuario no tiene acceso al panel.");
      }

      router.replace("/admin/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Credenciales incorrectas.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#f4f8f8] px-4 py-10">
      <div className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-brand-mist/45 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-8 h-80 w-80 rounded-full bg-brand-aqua/10 blur-3xl" />

      <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-soft">
        <div className="border-b border-brand-mist/70 bg-gradient-to-br from-brand-ice via-white to-white px-6 py-7 sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-deep text-white shadow-soft">
              <BookOpen size={24} />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-brand-teal ring-1 ring-brand-mist">
              <ShieldCheck size={12} /> Acceso privado
            </div>
          </div>
          <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-brand-teal">Enis Caicedo</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-brand-ink">Administrar blog</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">Ingrese con el usuario autorizado para gestionar publicaciones y portadas.</p>
        </div>

        <div className="px-6 py-7 sm:px-8">
          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="text-xs font-black text-slate-700">Correo</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="username"
                placeholder="correo@ejemplo.com"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-teal focus:bg-white focus:ring-4 focus:ring-brand-aqua/10"
              />
            </label>

            <label className="block">
              <span className="text-xs font-black text-slate-700">Contraseña</span>
              <div className="relative mt-2">
                <LockKeyhole size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-brand-teal focus:bg-white focus:ring-4 focus:ring-brand-aqua/10"
                />
              </div>
            </label>

            {error && <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold leading-5 text-rose-700">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-deep px-5 py-3.5 text-sm font-black text-white shadow-soft transition hover:bg-brand-ink disabled:opacity-50"
            >
              {loading ? <RefreshCw size={16} className="animate-spin" /> : <LogIn size={16} />}
              {loading ? "Verificando..." : "Entrar al panel"}
            </button>
          </form>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <a href="/admin/blog/recuperar" className="font-bold text-slate-500 no-underline hover:text-brand-teal">Olvidé mi contraseña</a>
            <a href="/blog" className="inline-flex items-center gap-1.5 font-black text-brand-teal no-underline hover:text-brand-deep"><Eye size={13} /> Ver blog público</a>
          </div>
        </div>
      </div>
    </main>
  );
}
