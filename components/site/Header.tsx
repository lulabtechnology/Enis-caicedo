"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Menu, X, Sparkles } from "lucide-react";
import { site } from "@/content/site";
import { waLink } from "@/lib/links";

const nav = [
  { href: "/servicios-legales", label: "Servicios legales" },
  { href: "/bienes-raices", label: "Bienes raíces" },
  { href: "/propiedades", label: "Propiedades" },
  { href: "/sobre-enis", label: "Sobre Enis" },
  { href: "/contacto", label: "Contacto" }
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const waHref = useMemo(() => {
    return waLink(
      site.whatsapp,
      "Hola, me gustaría solicitar una asesoría personalizada con Enis Caicedo. ¿Podemos coordinar una cita?"
    );
  }, []);

  const logoSrc = site.logo || "/images/logo.png";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="h-px w-full gradient-line" />
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 no-underline">
            {/* LOGO (más grande + sin fondos/gradientes) */}
            <div className="relative grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-2xl bg-white shadow-soft overflow-hidden">
             <Image
  src={logoSrc}
  alt={`${site.brand} logo`}
  fill
  sizes="(min-width: 640px) 56px, 48px"
  className="object-contain scale-[1.18]"
  priority
/>

            </div>

            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-900">{site.brand}</div>
              <div className="text-xs text-slate-500">
                <span className="text-brand-gradient font-semibold">Abogada</span> &{" "}
                <span className="text-brand-gradient font-semibold">Real Estate</span>
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={[
                    "text-sm font-semibold no-underline transition",
                    active ? "text-brand-teal" : "text-slate-600 hover:text-slate-900"
                  ].join(" ")}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <div className="hidden xl:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-soft">
              <Sparkles size={14} className="text-brand-aqua" />
              {site.phone}
            </div>
            <Button href={waHref} variant="primary">
              WhatsApp
            </Button>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <Container>
            <div className="flex flex-col gap-2 py-4">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 no-underline hover:bg-brand-ice"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </Link>
              ))}
              <div className="pt-2">
                <Button href={waHref} variant="primary" className="w-full">
                  WhatsApp
                </Button>
              </div>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
