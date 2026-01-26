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
      {/* Background */}
      <div className="absolute inset-0 hidden md:block">
        <Image src="/images/hero-desktop.jpg" alt="Hero Enis Caicedo" fill priority className="object-cover" />
      </div>
      <div className="absolute inset-0 md:hidden">
        <Image src="/images/hero-mobile.jpg" alt="Hero Enis Caicedo móvil" fill priority className="object-cover" />
      </div>

      {/* Overlay: SOLO VERDES (sin dorado) */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,22,28,0.92),rgba(6,55,59,0.72),rgba(7,22,28,0.18))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(18,182,182,0.30),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_40%,rgba(18,182,182,0.18),transparent_60%)]" />

      <Container>
        <div className="relative grid min-h-[78vh] items-center py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* LEFT */}
            <div className="lg:col-span-7">
              <div className="surface-deep p-6 sm:p-8">
                <p className="text-xs font-semibold tracking-[0.22em] text-white/70">
                  {site.tagline}
                </p>

                <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-[#12B6B6] sm:text-5xl lg:text-6xl">
                  {copy.hero.name}
                </h1>

                {/* Subtítulo (4ta imagen) */}
                <p className="mt-3 text-lg font-semibold text-[#12B6B6] opacity-90 sm:text-xl">
                  {copy.hero.role}
                </p>

                <div className="mt-6 h-px w-full bg-white/10" />

                <p className="mt-6 text-base leading-7 text-white/80 sm:text-lg">
                  {copy.hero.headline}
                </p>

                <p className="mt-4 text-sm leading-6 text-white/75">
                  {copy.hero.sub}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  <span className="badge-dark"><ShieldCheck size={14} /> Seguridad</span>
                  <span className="badge-dark"><Scale size={14} /> Legal</span>
                  <span className="badge-dark"><Home size={14} /> Inmobiliario</span>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button href={waHref} variant="primary">
                    {copy.hero.primaryCta} <ArrowRight size={16} />
                  </Button>
                  <Button
                    href="/servicios-legales"
                    variant="secondary"
                    className="bg-white/10 text-white border-white/20 hover:border-white/30"
                  >
                    {copy.hero.secondaryCta}
                  </Button>
                </div>

                <div className="mt-8 grid gap-2 sm:grid-cols-2">
                  {copy.hero.bullets.map((b) => (
                    <div
                      key={b}
                      className="flex items-start gap-3 rounded-3xl border border-white/10 bg-white/10 p-4"
                    >
                      <span className="mt-1 h-2 w-2 rounded-full bg-[#12B6B6]" />
                      <p className="text-sm leading-6 text-white/80">{b}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-sm text-white/70">{site.locationLine}</p>
              </div>
            </div>

            {/* RIGHT: foto */}
            <div className="lg:col-span-5">
              <div className="mx-auto w-full max-w-sm">
                <div className="surface-deep overflow-hidden">
                  <div className="relative aspect-[4/5] w-full">
                    <div className="absolute inset-0 hidden md:block">
                      <Image
                        src="/images/enis-profile.jpg"
                        alt="Foto profesional de Enis Caicedo"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="absolute inset-0 md:hidden">
                      <Image
                        src="/images/enis-profile-mobile.jpg"
                        alt="Foto profesional de Enis Caicedo (móvil)"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(7,22,28,0.62))]" />
                  </div>

                  {/* 5ta imagen: un solo color + texto requerido */}
                  <div className="p-5">
                    <p className="text-sm font-semibold text-[#12B6B6]">
                      Abogada &amp; Real Estate
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/75">
                      Respuesta rápida por WhatsApp. Agenda y plan según su necesidad.
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-xs text-white/65">
                  Foto: <span className="font-semibold text-white/80">/public/images/enis-profile.jpg</span> y{" "}
                  <span className="font-semibold text-white/80">/public/images/enis-profile-mobile.jpg</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
