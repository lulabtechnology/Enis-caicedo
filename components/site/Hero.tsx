import Image from "next/image";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site, copy } from "@/content/site";
import { waLink } from "@/lib/links";
import { ArrowRight, ShieldCheck, Scale, Home } from "lucide-react";

export default function Hero() {
  const waHref = waLink(
    site.whatsapp,
    "Hola, me gustaría solicitar una asesoría personalizada con Enis Caicedo. ¿Podemos coordinar una cita?"
  );

  return (
    <section className="relative overflow-hidden">
      {/* Background (DESKTOP) */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/images/hero-desktop.jpg"
          alt="Hero Enis Caicedo"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Background (MOBILE) */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/hero-mobile.jpg"
          alt="Hero Enis Caicedo móvil"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,18,32,0.92),rgba(11,18,32,0.62),rgba(11,18,32,0.28))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(19,184,184,0.22),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(214,177,94,0.18),transparent_55%)]" />

      <Container>
        <div className="relative grid min-h-[78vh] items-center py-14 sm:py-20">
          <div className="max-w-2xl">
            <p className="kicker text-white/70">{site.tagline}</p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {copy.hero.h1}
            </h1>

            <p className="mt-5 text-base leading-7 text-white/80 sm:text-lg">
              {copy.hero.sub}
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              <span className="badge">
                <ShieldCheck size={14} /> Seguridad y confianza
              </span>
              <span className="badge">
                <Scale size={14} /> Asesoría legal
              </span>
              <span className="badge">
                <Home size={14} /> Compras con estrategia
              </span>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button href={waHref} variant="primary" className="bg-white text-brand-ink border-white">
                {copy.hero.primaryCta} <ArrowRight size={16} />
              </Button>
              <Button href="/servicios-legales" variant="secondary" className="bg-white/10 text-white border-white/20 hover:border-white/35">
                {copy.hero.secondaryCta}
              </Button>
            </div>

            <div className="mt-8 grid gap-2 sm:grid-cols-2">
              {copy.hero.bullets.map((b) => (
                <div key={b} className="flex items-start gap-3 rounded-3xl border border-white/15 bg-white/5 p-4 backdrop-blur">
                  <span className="mt-1 h-2 w-2 rounded-full bg-brand-gold" />
                  <p className="text-sm leading-6 text-white/80">{b}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm text-white/70">
              {site.locationLine}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
