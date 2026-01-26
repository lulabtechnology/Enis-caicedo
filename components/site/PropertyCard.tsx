"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { waLink } from "@/lib/links";

export type Property = {
  id: string;
  building: string;
  title: string;
  priceFrom: string;
  location: string;
  tags: string[];
  image: string;     // portada
  images: string[];  // 4 imágenes (portada + 3)
  highlights: string[];
};

export default function PropertyCard({ p }: { p: Property }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const gallery = useMemo(() => {
    const base = Array.isArray(p.images) && p.images.length ? p.images : [p.image];
    const normalized = [p.image, ...base.filter((x) => x !== p.image)];
    return normalized.slice(0, 4);
  }, [p.image, p.images]);

  const wa = waLink(
    site.whatsapp,
    `Hola, me interesa la propiedad: ${p.title}\nEdificio: ${p.building}\n${p.priceFrom}\nUbicación: ${p.location}\n¿Podemos coordinar una visita o recibir más información?`
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
          <Image src={p.image} alt={p.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/65 via-brand-ink/10 to-transparent" />

          <div className="absolute top-4 left-4 inline-flex rounded-full border border-brand-aqua/30 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
            {p.priceFrom}
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
                  <p className="text-sm font-semibold text-slate-900">{p.priceFrom}</p>
                  <p className="mt-2 text-sm text-slate-600">{p.location}</p>

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
                    Galería: 4 imágenes (portada + 3).
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
