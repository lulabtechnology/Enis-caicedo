import Image from "next/image";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site, copy } from "@/content/site";
import { waLink } from "@/lib/links";
import { ArrowDown, ArrowRight, BadgeCheck, Building2, ShieldCheck } from "lucide-react";
import WhatsAppIcon from "@/components/site/WhatsAppIcon";

export default function Hero() {
  const waHref = waLink(
    site.whatsapp,
    "Hola, me gustaría solicitar una asesoría personalizada con Enis Caicedo. ¿Podemos coordinar una cita?"
  );

  return (
    <section className="home-hero relative isolate overflow-hidden">
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/images/phase1/hero-panama-desktop.webp"
          alt="Vista premium de Ciudad de Panamá al atardecer"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          data-parallax
        />
      </div>
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/phase1/hero-panama-mobile.webp"
          alt="Vista vertical de Ciudad de Panamá al atardecer"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="hero-cinematic-overlay absolute inset-0" />
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <div className="hero-glow hero-glow-a" aria-hidden="true" />
      <div className="hero-glow hero-glow-b" aria-hidden="true" />

      <Container>
        <div className="relative flex min-h-[calc(100svh-76px)] items-center py-14 sm:py-16 lg:min-h-[760px] lg:py-24">
          <div className="w-full lg:grid lg:grid-cols-12">
            <div className="relative z-10 max-w-[790px] lg:col-span-7 xl:col-span-7">
              <div className="hero-eyebrow" data-hero-line>
                <span className="hero-eyebrow-dot" />
                {site.tagline}
              </div>

              <h1 className="hero-title mt-7" data-hero-line>
                Estrategia legal.
                <span>Visión inmobiliaria.</span>
              </h1>

              <p className="hero-statement mt-7 max-w-2xl" data-hero-line>
                {copy.hero.headline}
              </p>

              <p className="hero-copy mt-5 max-w-xl" data-hero-line>
                {copy.hero.sub}
              </p>

              <div className="mt-8 flex flex-wrap gap-3" data-hero-line>
                <Button href={waHref} variant="primary" className="hero-primary-cta">
                  <WhatsAppIcon size={18} /> {copy.hero.primaryCta} <ArrowRight size={16} />
                </Button>
                <Button href="/propiedades" variant="secondary" className="hero-secondary-cta">
                  Explorar propiedades
                </Button>
              </div>

              <div className="hero-proof-grid mt-11" data-stagger>
                <div className="hero-proof-item">
                  <ShieldCheck size={18} />
                  <div><strong>9 años</strong><span>de experiencia en derecho</span></div>
                </div>
                <div className="hero-proof-item">
                  <BadgeCheck size={18} />
                  <div><strong>ACOBIR &amp; ANDAP</strong><span>respaldo profesional</span></div>
                </div>
                <div className="hero-proof-item">
                  <Building2 size={18} />
                  <div><strong>Legal + Real Estate</strong><span>una visión integral</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="hero-bottom-bar">
        <Container>
          <div className="hero-bottom-inner">
            <div className="hero-marquee" aria-label="Servicios principales">
              <div className="hero-marquee-track">
                <span>Derecho</span><i /><span>Bienes raíces</span><i /><span>Inversionistas</span><i /><span>Panamá</span><i />
                <span>Derecho</span><i /><span>Bienes raíces</span><i /><span>Inversionistas</span><i /><span>Panamá</span><i />
              </div>
            </div>
            <a href="#inicio-contenido" className="hero-scroll-cue no-underline">Descubrir <ArrowDown size={14} /></a>
          </div>
        </Container>
      </div>
    </section>
  );
}
