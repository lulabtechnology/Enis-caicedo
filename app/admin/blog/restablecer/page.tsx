"use client";

import { FormEvent, useEffect, useState } from "react";
import { KeyRound, RefreshCw } from "lucide-react";
import { getBlogBrowserClient } from "@/lib/blog/supabase-browser";

export default function ResetBlogPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = getBlogBrowserClient();
    let mounted = true;

    async function check() {
      const { data } = await supabase.auth.getSession();
      if (mounted) setReady(Boolean(data.session));
    }

    void check();
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (event === "PASSWORD_RECOVERY" || session) setReady(true);
    });

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 10) {
      setError("La contraseña debe tener al menos 10 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      const supabase = getBlogBrowserClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      setPassword("");
      setConfirm("");
      setMessage("Contraseña actualizada. Ya puede volver al panel.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo restablecer la contraseña.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#f4f8f8] px-4 py-10">
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-brand-mist/45 blur-3xl" />
      <div className="relative w-full max-w-md rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-ice text-brand-teal"><KeyRound size={21} /></div>
        <h1 className="mt-5 font-display text-3xl font-semibold text-brand-ink">Nueva contraseña</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">Defina una contraseña nueva para el administrador del blog.</p>

        {!ready && !message ? (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold leading-5 text-amber-800">
            Abra esta página desde el enlace recibido por correo. Si el enlace ya fue usado o venció, solicite otro desde “Olvidé mi contraseña”.
          </div>
        ) : null}

        {ready && !message ? (
          <form onSubmit={submit} className="mt-7 space-y-4">
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={10}
              autoComplete="new-password"
              placeholder="Nueva contraseña"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-brand-teal focus:bg-white focus:ring-4 focus:ring-brand-aqua/10"
            />
            <input
              type="password"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              required
              minLength={10}
              autoComplete="new-password"
              placeholder="Confirmar nueva contraseña"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-brand-teal focus:bg-white focus:ring-4 focus:ring-brand-aqua/10"
            />
            {error && <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold leading-5 text-rose-700">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-deep px-5 py-3.5 text-sm font-black text-white shadow-soft transition hover:bg-brand-ink disabled:opacity-50"
            >
              {loading && <RefreshCw size={15} className="animate-spin" />} Guardar nueva contraseña
            </button>
          </form>
        ) : null}

        {message && (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm font-semibold text-emerald-700">
            {message}
            <a href="/admin/blog/login" className="mt-4 block font-black text-brand-deep no-underline">Ir al login →</a>
          </div>
        )}
      </div>
    </main>
  );
}
