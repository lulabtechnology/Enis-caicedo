"use client";

import { useMemo, useState } from "react";
import { site, copy } from "@/content/site";
import { waLink } from "@/lib/links";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";

type Form = {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  mensaje: string;
};

export default function ContactForm({ subject }: { subject?: string }) {
  const [f, setF] = useState<Form>({ nombre: "", apellido: "", email: "", telefono: "", mensaje: "" });
  const [err, setErr] = useState<string | null>(null);

  const waHref = useMemo(() => {
    const s = subject ? `Asunto: ${subject}\n` : "";
    const msg =
      `${s}` +
      `Nombre: ${f.nombre} ${f.apellido}\n` +
      `Email: ${f.email}\n` +
      `Teléfono: ${f.telefono}\n` +
      `Mensaje: ${f.mensaje}\n\n` +
      "Hola, me gustaría agendar una asesoría personalizada.";
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
    <form onSubmit={onSubmit} className="contact-form-premium">
      <div className="flex flex-col gap-2 border-b border-brand-deep/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="kicker">SOLICITUD DE ASESORÍA</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">{copy.contact.lead}</p>
        </div>
        <span className="text-[10px] font-extrabold uppercase tracking-[.16em] text-slate-400">Respuesta por WhatsApp</span>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Nombre" value={f.nombre} onChange={(v) => setF((p) => ({ ...p, nombre: v }))} required />
        <Field label="Apellido" value={f.apellido} onChange={(v) => setF((p) => ({ ...p, apellido: v }))} required />
        <Field label="Email" type="email" value={f.email} onChange={(v) => setF((p) => ({ ...p, email: v }))} required />
        <Field label="Teléfono" value={f.telefono} onChange={(v) => setF((p) => ({ ...p, telefono: v }))} required />
      </div>

      <div className="mt-5">
        <label className="form-label">Mensaje <span>*</span></label>
        <textarea
          className="form-control min-h-36 resize-y"
          value={f.mensaje}
          onChange={(e) => setF((p) => ({ ...p, mensaje: e.target.value }))}
          placeholder="Describa brevemente su caso, inversión o necesidad."
        />
      </div>

      <p className="mt-4 text-xs leading-6 text-slate-500">{copy.contact.consent}</p>
      {err ? <p className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{err}</p> : null}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" variant="primary" className="w-full sm:w-auto">
          {copy.contact.submit} <ArrowUpRight size={15} />
        </Button>
        <a href={waHref} className="text-sm font-bold text-brand-teal no-underline hover:text-brand-ink" target="_blank" rel="noreferrer">
          Abrir WhatsApp directamente
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
      <label className="form-label">{label} {required ? <span>*</span> : null}</label>
      <input type={type} className="form-control" value={value} onChange={(e) => onChange(e.target.value)} placeholder={label} />
    </div>
  );
}
