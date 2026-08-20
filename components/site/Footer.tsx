import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { site, copy } from "@/content/site";
import { ArrowUpRight, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer relative overflow-hidden">
      <div className="absolute inset-0 hidden md:block"><Image src="/images/phase1/footer-panama-night.webp" alt="Ciudad de Panamá al anochecer" fill sizes="100vw" className="object-cover object-center" /></div>
      <div className="absolute inset-0 md:hidden"><Image src="/images/phase1/hero-panama-mobile.webp" alt="Ciudad de Panamá al atardecer" fill sizes="100vw" className="object-cover object-center" /></div>
      <div className="site-footer-overlay absolute inset-0" />
      <div className="hero-grid absolute inset-0 opacity-20" aria-hidden="true" />
      <Container>
        <div className="relative py-16 sm:py-20 lg:py-24">
          <div className="footer-top grid gap-12 pb-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7" data-reveal>
              <p className="kicker kicker-light">ENIS CAICEDO</p>
              <h2 className="footer-heading mt-5">Derecho, inversión y patrimonio <span>con una mirada integral.</span></h2>
              <p className="footer-summary mt-6 max-w-2xl text-sm leading-7 sm:text-base">{copy.footer.close}</p>
            </div>
            <div className="lg:col-span-5" data-reveal><Link href="/contacto" className="footer-contact-link no-underline"><span>Coordinar una asesoría</span><ArrowUpRight size={22} /></Link></div>
          </div>

          <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Link href="/" className="footer-brand-panel inline-flex no-underline" aria-label="Enis Caicedo - Inicio">
                <Image src={site.logo} alt="Enis Caicedo, Abogada y Corredora de Bienes Raíces" width={799} height={518} className="footer-brand-image" />
              </Link>
            </div>
            <div className="lg:col-span-3">
              <p className="footer-label">Navegación</p>
              <nav className="footer-nav mt-4 grid gap-3 text-sm">
                <Link className="footer-link" href="/servicios-legales">Servicios legales</Link>
                <Link className="footer-link" href="/bienes-raices">Bienes raíces</Link>
                <Link className="footer-link" href="/propiedades">Propiedades</Link>
                <Link className="footer-link" href="/blog">Blog</Link>
              </nav>
            </div>
            <div className="lg:col-span-5">
              <p className="footer-label">Contacto</p>
              <div className="footer-contact-list mt-4 grid gap-4 text-sm">
                <div className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 shrink-0 text-brand-aqua" /><span>{site.locationLine}</span></div>
                <a className="footer-link flex items-center gap-3" href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}><Phone size={16} className="text-brand-aqua" />{site.phone}</a>
                <a className="footer-link flex items-center gap-3" href={`mailto:${site.email}`}><Mail size={16} className="text-brand-aqua" />{site.email}</a>
              </div>
            </div>
          </div>

          <div className="footer-meta flex flex-col gap-5 pt-7 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {site.brand}. Todos los derechos reservados.</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link className="footer-link" href="/privacidad">Privacidad</Link>
              <Link className="footer-link" href="/terminos">Términos</Link>
              <Link className="footer-social" href={site.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={15} /></Link>
              <Link className="footer-social" href={site.socials.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={15} /></Link>
              <Link className="footer-social" href={site.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">f</Link>
              <span className="footer-credit">Desarrollado por <a href="https://lulabtech.com" target="_blank" rel="noopener noreferrer">LuLabTech</a><span aria-hidden="true"> · </span><a href="https://lulabtech.com" target="_blank" rel="noopener noreferrer">lulabtech.com</a></span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
