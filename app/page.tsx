"use client";

import { useMemo, useState } from "react";
import { site, copy } from "@/content/site";
import { waLink } from "@/lib/links";
import { Button } from "@/components/ui/Button";

type Form = {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  mensaje: string;
};

export default function ContactForm({ subject }: { subject?: string }) {
  const [f, setF] = useState<Form>({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    mensaje: ""
  });

  const [err, setErr] = useState<string | null>(null);

  const waHref = useMemo(() => {
    const s = subject ? `Asunto: ${subject}\n` : "";
    const msg =
      `${s}` +
      `Nombre: ${f.nombre} ${f.apellido}\n` +
      `Email: ${f.email}\n` +
      `Teléfono: ${f.telefono}\n` +
      `Mensaje: ${f.mensaje}\n\n` +
      `Hola, me gustaría agendar una asesoría personalizada.`;

    return waLink(site.whatsapp, msg);
  }, [f, subject]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.nombre || !f.apellido || !f.email || !f.telefono || !f.mensaje) {
      setErr("Por favor complete todos los campos requeridos.");
      return;
    }
    setErr(null);
    window.open(waHref, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} className="surface-tint p-6 sm:p-7">
      <p className="text-sm font-semibold text-slate-900">
        {copy.contact.lead}
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Nombre" value={f.nombre} onChange={(v) => setF((p) => ({ ...p, nombre: v }))} required />
        <Field label="Apellido" value={f.apellido} onChange={(v) => setF((p) => ({ ...p, apellido: v }))} required />
        <Field label="Email" type="email" value={f.email} onChange={(v) => setF((p) => ({ ...p, email: v }))} required />
        <Field label="Teléfono" value={f.telefono} onChange={(v) => setF((p) => ({ ...p, telefono: v }))} required />
      </div>

      <div className="mt-4">
        <label className="text-sm font-semibold text-slate-900">
          Mensaje <span className="text-brand-gold">*</span>
        </label>
        <textarea
          className="mt-2 h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-aqua/35"
          value={f.mensaje}
          onChange={(e) => setF((p) => ({ ...p, mensaje: e.target.value }))}
          placeholder="Describa brevemente su caso o necesidad."
        />
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">{copy.contact.consent}</p>

      {err ? <p className="mt-3 text-sm font-semibold text-red-600">{err}</p> : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" variant="primary" className="w-full sm:w-auto">
          {copy.contact.submit}
        </Button>

        <a
          href={waHref}
          className="text-sm font-semibold text-brand-teal hover:text-brand-ink no-underline"
          target="_blank"
          rel="noreferrer"
        >
          O abrir WhatsApp directamente
        </a>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-900">
        {label} {required ? <span className="text-brand-gold">*</span> : null}
      </label>
      <input
        type={type}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand-aqua/35"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
      />
    </div>
  );
}
