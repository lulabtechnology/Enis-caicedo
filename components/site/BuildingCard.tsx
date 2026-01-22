"use client";

import Image from "next/image";
import { useState } from "react";
import type { Building } from "@/content/site";

export default function BuildingCard({ b }: { b: Building }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card overflow-hidden">
      {/* Cover */}
      <div className="relative h-56 w-full">
        <Image src={b.cover} alt={b.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(7,22,28,0.55))]" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="font-display text-xl font-semibold text-white">{b.name}</p>
          <p className="mt-1 text-sm text-white/85">{b.subtitle}</p>
        </div>
      </div>

      {/* Text */}
      <div className="p-6">
        <p className="text-sm leading-6 text-slate-600">{b.desc}</p>

        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-5 w-full rounded-full border border-slate-200 bg-brand-ice px-5 py-2.5 text-sm font-semibold text-slate-900 hover:bg-white"
        >
          {open ? "Ocultar fotos" : "Ver 2 fotos"}
        </button>

        {/* 2 imágenes extra */}
        {open ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="relative h-36 overflow-hidden rounded-2xl border border-slate-200">
              <Image src={b.extra1} alt={`${b.name} foto 2`} fill className="object-cover" />
            </div>
            <div className="relative h-36 overflow-hidden rounded-2xl border border-slate-200">
              <Image src={b.extra2} alt={`${b.name} foto 3`} fill className="object-cover" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
