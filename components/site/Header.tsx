"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/content/site";
import { waLink } from "@/lib/links";

const nav = [
  { href: "/servicios-legales", label: "Servicios legales" },
  { href: "/bienes-raices", label: "Bienes raíces" },
  { href: "/propiedades", label: "Propiedades" },
  { href: "/sobre-enis", label: "Sobre Enis" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" }
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const waHref = useMemo(() => waLink(site.whatsapp, "Hola, me gustaría solicitar una asesoría personalizada con Enis Caicedo. ¿Podemos coordinar una cita?"), []);

  return (
    <header className="site-header" data-site-header>
      <div className="site-header-shell">
        <Container>
          <div className="flex min-h-[78px] items-center justify-between gap-4 lg:min-h-[88px]">
            <Link href="/" className="group flex min-w-0 items-center gap-3 no-underline" onClick={() => setOpen(false)} aria-label="Enis Caicedo - Inicio">
              <div className="brand-mark relative h-14 w-[76px] shrink-0 overflow-hidden rounded-2xl sm:h-16 sm:w-[88px]">
                <Image src="/images/brand/logo-symbol.png" alt="Símbolo de Enis Caicedo" fill sizes="88px" className="object-contain p-1.5 transition duration-500 group-hover:scale-[1.04]" priority />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="brand-name truncate">{site.brand}</div>
                <div className="brand-role">Abogada &amp; Real Estate</div>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
              {nav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return <Link key={item.href} href={item.href} className={["nav-link", active ? "is-active" : ""].join(" ")}>{item.label}</Link>;
              })}
            </nav>

            <div className="hidden items-center gap-2 xl:flex">
              <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="header-phone no-underline"><span className="header-phone-dot" />{site.phone}</a>
              <Button href={waHref} variant="primary" className="px-5">WhatsApp <ArrowUpRight size={15} /></Button>
            </div>

            <button type="button" className="mobile-menu-button lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open}>
              {open ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </Container>
      </div>

      <div className={["mobile-nav lg:hidden", open ? "is-open" : ""].join(" ")} aria-hidden={!open}>
        <Container>
          <div className="grid gap-2 py-5">
            {nav.map((item, index) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="mobile-nav-link no-underline" style={{ transitionDelay: open ? `${index * 28}ms` : "0ms" }}>
                <span>{String(index + 1).padStart(2, "0")}</span>{item.label}
              </Link>
            ))}
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Button href={waHref} variant="primary" className="w-full" onClick={() => setOpen(false)}>Escribir por WhatsApp</Button>
              <Button href="/contacto" variant="secondary" className="w-full" onClick={() => setOpen(false)}>Agendar asesoría</Button>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
