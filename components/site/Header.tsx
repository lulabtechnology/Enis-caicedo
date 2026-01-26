"use client";

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

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="h-px w-full gradient-line" />
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div className="relative grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-white shadow-soft overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(18,182,182,0.35),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(214,177,94,0.22),transparent_55%)]" />
              <span className="relative text-sm font-extrabold tracking-tight text-brand-ink">
                EC
              </span>
            </div>

            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-900">{site.brand}</div>
              <div className="text-xs font-semibold text-[#12B6B6]">
                Abogada &amp; Real Estate
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
                    active
                      ? "text-brand-teal"
                      : "text-slate-600 hover:text-slate-900"
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
