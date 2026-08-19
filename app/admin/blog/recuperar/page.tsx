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
    <main className="grid min-h-screen place-items-center bg-slate-950 px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/[0.05] p-6 sm:p-8">
        <a href="/admin/blog/login" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 no-underline hover:text-white">
          <ArrowLeft size={14} /> Volver al login
        </a>
        <div className="mt-6 grid h-12 w-12 place-items-center rounded-2xl bg-brand-aqua/10 text-brand-aqua">
          <Mail size={21} />
        </div>
        <h1 className="mt-5 text-3xl font-black">Recuperar contraseña</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">Supabase enviará el enlace de recuperación al correo del administrador.</p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            placeholder="correo@ejemplo.com"
            className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-brand-aqua"
          />
          {error && <p className="text-xs leading-5 text-rose-300">{error}</p>}
          {message && <p className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-xs leading-5 text-emerald-200">{message}</p>}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-aqua to-brand-deep px-5 py-3.5 text-sm font-black disabled:opacity-50"
          >
            {loading && <RefreshCw size={15} className="animate-spin" />}
            Enviar enlace de recuperación
          </button>
        </form>
      </div>
    </main>
  );
}
