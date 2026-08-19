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
    <main className="grid min-h-screen place-items-center bg-slate-950 px-4 py-10 text-white">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/[0.05] p-6 sm:p-8">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-aqua/10 text-brand-aqua"><KeyRound size={21} /></div>
        <h1 className="mt-5 text-3xl font-black">Nueva contraseña</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">Defina una contraseña nueva para el administrador del blog.</p>

        {!ready && !message ? (
          <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-xs leading-5 text-amber-100">
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
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-brand-aqua"
            />
            <input
              type="password"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              required
              minLength={10}
              autoComplete="new-password"
              placeholder="Confirmar nueva contraseña"
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none placeholder:text-slate-600 focus:border-brand-aqua"
            />
            {error && <p className="text-xs leading-5 text-rose-300">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-aqua to-brand-deep px-5 py-3.5 text-sm font-black disabled:opacity-50"
            >
              {loading && <RefreshCw size={15} className="animate-spin" />} Guardar nueva contraseña
            </button>
          </form>
        ) : null}

        {message && (
          <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-4 text-sm text-emerald-100">
            {message}
            <a href="/admin/blog/login" className="mt-4 block font-black text-white no-underline">Ir al login →</a>
          </div>
        )}
      </div>
    </main>
  );
}
