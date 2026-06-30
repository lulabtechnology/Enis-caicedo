"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { waLink } from "@/lib/links";

export type Property = {
  id: string;
  building: string;
  title: string;
  priceFrom: string;
  priceValue?: number;
  location: string;
  tags: string[];
  image: string;
  images: string[];
  highlights: string[];
  description?: string;
  source?: string;
  feedType?: "res" | "com";
  uniqueId?: string;
  mlsCode?: string;
  listingAgentName?: string;
  listingAgentCode?: string;
  listingAgentPhone?: string;
  listingAgentEmail?: string;
  listingPhotoCount?: number;
  operation?: string;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  lotArea?: string;
};

function clean(value?: string | number | null): string {
  return String(value ?? "").trim();
}

function listingAgentLabel(property: Property): string {
  const name = clean(property.listingAgentName);
  const code = clean(property.listingAgentCode);

  if (name && code) return `${name} · ID ${code}`;
  if (name) return name;
  if (code) return `ID ${code}`;
  return "";
}

export default function PropertyCard({ p }: { p: Property }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const gallery = useMemo(() => {
    const cover = p.image || "/images/properties-banner.jpg";
    const base = Array.isArray(p.images) && p.images.length ? p.images : [cover];
    const normalized = [cover, ...base.filter((x) => x && x !== cover)];
    return normalized.slice(0, 12);
  }, [p.image, p.images]);

  const detailHref = `/propiedades/${p.id}`;
  const priceLabel = clean(p.priceFrom) || "Consultar precio";
  const mlsCode = clean(p.mlsCode) || clean(p.uniqueId);
  const agentLabel = listingAgentLabel(p);

  const wa = waLink(
    site.whatsapp,
    [
      `Hola, me interesa la propiedad: ${p.title}`,
      `Precio: ${priceLabel}`,
      `Edificio/Zona: ${p.building}`,
      mlsCode ? `Código MLS/ACOBIR: ${mlsCode}` : "",
      agentLabel ? `Agente de lista: ${agentLabel}` : "",
      `Ubicación: ${p.location}`,
      "¿Podemos coordinar una visita o recibir más información?"
    ].filter(Boolean).join("\n")
  );

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    setActive(0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div className="card overflow-hidden border-slate-200">
        <button
          type="button"
          className="relative h-52 w-full text-left"
          onClick={() => setOpen(true)}
          aria-label={`Ver fotos de ${p.title}`}
        >
          <Image src={gallery[0]} alt={p.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/65 via-brand-ink/10 to-transparent" />

          <div className="absolute top-4 left-4 flex max-w-[85%] flex-col items-start gap-2">
            <span className="inline-flex rounded-full border border-brand-aqua/30 bg-white/95 px-3 py-1 text-xs font-bold text-slate-950 shadow-soft">
              Precio: {priceLabel}
            </span>
            {mlsCode ? (
              <span className="inline-flex rounded-full border border-white/60 bg-brand-ink/75 px-3 py-1 text-[11px] font-semibold tracking-wide text-white backdrop-blur">
                Código MLS/ACOBIR: {mlsCode}
              </span>
            ) : null}
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-xs font-semibold tracking-widest text-white/80">
              {p.building}
            </p>
            <p className="mt-1 text-sm font-semibold text-white">{p.title}</p>
          </div>
        </button>

        <div className="p-6">
          <p className="text-sm text-slate-600">{p.location}</p>

          <div className="mt-3 grid gap-2 rounded-2xl border border-slate-200 bg-brand-ice/70 p-4 text-sm">
            <div className="flex items-start justify-between gap-3">
              <span className="font-semibold text-slate-700">Precio</span>
              <span className="text-right font-bold text-brand-teal">{priceLabel}</span>
            </div>

            {mlsCode ? (
              <div className="flex items-start justify-between gap-3">
                <span className="font-semibold text-slate-700">Código MLS/ACOBIR</span>
                <span className="text-right font-semibold text-slate-900">{mlsCode}</span>
              </div>
            ) : null}

            {agentLabel ? (
              <div className="flex items-start justify-between gap-3">
                <span className="font-semibold text-slate-700">Agente de lista</span>
                <span className="text-right font-semibold text-slate-900">{agentLabel}</span>
              </div>
            ) : null}
          </div>

          {p.highlights?.length ? (
            <ul className="mt-4 grid gap-2 text-sm text-slate-700">
              {p.highlights.slice(0, 3).map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-aqua" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            {p.source ? (
              <span className="rounded-full border border-brand-aqua/40 bg-brand-aqua/10 px-3 py-1 text-xs font-semibold text-brand-teal">
                {p.source}
              </span>
            ) : null}
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-slate-200 bg-brand-ice px-3 py-1 text-xs font-medium text-slate-700"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Button onClick={() => setOpen(true)} variant="secondary" className="w-full">
              Ver fotos
            </Button>
            <Button href={wa} variant="primary" className="w-full">
              WhatsApp
            </Button>
          </div>

          <Link
            href={detailHref}
            className="mt-4 inline-flex text-sm font-semibold text-brand-teal no-underline hover:text-brand-deep"
          >
            Ver ficha completa
          </Link>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={close}
            aria-label="Cerrar"
          />

          <div className="relative w-full max-w-4xl overflow-hidden rounded-[var(--radius)] bg-white shadow-soft">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5">
              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-widest text-slate-500">{p.building}</p>
                <h3 className="mt-1 font-display text-xl font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{p.location}</p>
                {mlsCode ? (
                  <p className="mt-1 text-xs font-semibold tracking-wide text-brand-teal">
                    Código MLS/ACOBIR: {mlsCode}
                  </p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={close}
                className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:border-slate-300"
              >
                Cerrar
              </button>
            </div>

            <div className="grid gap-4 p-5 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200">
                  <Image
                    src={gallery[active]}
                    alt={`${p.title} foto ${active + 1}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="mt-3 grid grid-cols-4 gap-3">
                  {gallery.map((src, idx) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActive(idx)}
                      className={[
                        "relative aspect-[4/3] overflow-hidden rounded-xl border",
                        idx === active ? "border-brand-aqua" : "border-slate-200 hover:border-slate-300"
                      ].join(" ")}
                      aria-label={`Ver miniatura ${idx + 1}`}
                    >
                      <Image src={src} alt={`Miniatura ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-sm font-semibold text-slate-500">Precio</p>
                  <p className="mt-1 text-lg font-bold text-brand-teal">{priceLabel}</p>
                  {mlsCode ? (
                    <p className="mt-3 text-xs font-semibold tracking-wide text-brand-teal">
                      Código MLS/ACOBIR: {mlsCode}
                    </p>
                  ) : null}
                  {agentLabel ? (
                    <p className="mt-2 text-xs font-semibold tracking-wide text-slate-600">
                      Agente de lista: {agentLabel}
                    </p>
                  ) : null}
                  <p className="mt-3 text-sm text-slate-600">{p.location}</p>

                  {p.highlights?.length ? (
                    <ul className="mt-4 grid gap-2 text-sm text-slate-700">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-aqua" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="mt-5">
                    <Button href={wa} variant="primary" className="w-full">
                      Solicitar por WhatsApp
                    </Button>
                  </div>

                  <p className="mt-4 text-xs text-slate-500">
                    Galería: {gallery.length} imagen{gallery.length === 1 ? "" : "es"}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
