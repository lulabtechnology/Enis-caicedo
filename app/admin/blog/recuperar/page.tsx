"use client";

import { FormEvent, useState } from "react";
import { ArrowLeft, Mail, RefreshCw } from "lucide-react";
import { getBlogBrowserClient } from "@/lib/blog/supabase-browser";

export default function RecoverBlogPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const supabase = getBlogBrowserClient();
      const redirectTo = `${window.location.origin}/admin/blog/restablecer`;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo });
      if (resetError) throw resetError;
      setMessage("Si el correo pertenece a un usuario válido, recibirá un enlace para restablecer la contraseña.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo solicitar el cambio de contraseña.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#f4f8f8] px-4 py-10">
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-brand-mist/45 blur-3xl" />
      <div className="relative w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <a href="/admin/blog/login" className="inline-flex items-center gap-2 text-xs font-black text-slate-500 no-underline hover:text-brand-teal">
          <ArrowLeft size={14} /> Volver al login
        </a>
        <div className="mt-6 grid h-12 w-12 place-items-center rounded-2xl bg-brand-ice text-brand-teal">
          <Mail size={21} />
        </div>
        <h1 className="mt-5 font-display text-3xl font-semibold text-brand-ink">Recuperar contraseña</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">Supabase enviará el enlace de recuperación al correo del administrador.</p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            placeholder="correo@ejemplo.com"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-brand-teal focus:bg-white focus:ring-4 focus:ring-brand-aqua/10"
          />
          {error && <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold leading-5 text-rose-700">{error}</p>}
          {message && <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold leading-5 text-emerald-700">{message}</p>}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-deep px-5 py-3.5 text-sm font-black text-white shadow-soft transition hover:bg-brand-ink disabled:opacity-50"
          >
            {loading && <RefreshCw size={15} className="animate-spin" />}
            Enviar enlace de recuperación
          </button>
        </form>
      </div>
    </main>
  );
}
