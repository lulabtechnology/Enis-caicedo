"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, LockKeyhole, LogIn, RefreshCw } from "lucide-react";
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
    <main className="grid min-h-screen place-items-center bg-slate-950 px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/[0.05] p-6 shadow-2xl sm:p-8">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-aqua to-brand-deep shadow-glow">
          <BookOpen size={24} />
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-brand-aqua">Enis Caicedo</p>
        <h1 className="mt-2 text-3xl font-black">Administrar blog</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">Ingrese con el usuario autorizado en Supabase.</p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="block">
            <span className="text-xs font-bold text-slate-300">Correo</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="username"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-brand-aqua"
            />
          </label>

          <label className="block">
            <span className="text-xs font-bold text-slate-300">Contraseña</span>
            <div className="relative mt-2">
              <LockKeyhole size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-2xl border border-white/10 bg-slate-900 py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-aqua"
              />
            </div>
          </label>

          {error && <p className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-xs leading-5 text-rose-200">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-aqua via-brand-teal to-brand-deep px-5 py-3.5 text-sm font-black shadow-glow transition hover:opacity-95 disabled:opacity-50"
          >
            {loading ? <RefreshCw size={16} className="animate-spin" /> : <LogIn size={16} />}
            {loading ? "Verificando..." : "Entrar al panel"}
          </button>
        </form>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <a href="/admin/blog/recuperar" className="font-semibold text-slate-400 no-underline hover:text-white">Olvidé mi contraseña</a>
          <a href="/blog" className="font-semibold text-brand-aqua no-underline hover:text-brand-mist">Ver blog público</a>
        </div>
      </div>
    </main>
  );
}
