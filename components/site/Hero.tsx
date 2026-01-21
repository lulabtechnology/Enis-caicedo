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

      {/* Overlay: más fuerte + tinte teal de marca para que el texto SIEMPRE se lea */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,22,28,0.92),rgba(6,55,59,0.70),rgba(7,22,28,0.25))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(18,182,182,0.22),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_40%,rgba(214,177,94,0.16),transparent_60%)]" />

      <Container>
        <div className="relative grid min-h-[78vh] items-center py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* LEFT: Texto */}
            <div className="lg:col-span-7">
              {/* Glass card detrás del contenido para legibilidad total */}
              <div className="rounded-[22px] border border-white/12 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
                <p className="text-xs font-semibold tracking-[0.22em] text-white/75">
                  {site.tagline}
                </p>

                {/* Lo que pidió el cliente: nombre + rol al inicio */}
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {copy.hero.name}
                </h1>

                <p className="mt-3 text-lg font-semibold text-white/85 sm:text-xl">
                  {copy.hero.role}
                </p>

                <div className="mt-6 h-px w-full bg-white/10" />

                <p className="mt-6 text-base leading-7 text-white/85 sm:text-lg">
                  {copy.hero.headline}
                </p>

                <p className="mt-4 text-sm leading-6 text-white/75">
                  {copy.hero.sub}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/85">
                    <ShieldCheck size={14} /> Seguridad y confianza
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/85">
                    <Scale size={14} /> Asesoría legal
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/85">
                    <Home size={14} /> Bienes raíces
                  </span>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button
                    href={waHref}
                    variant="primary"
                    className="bg-white text-brand-ink border-white hover:opacity-95"
                  >
                    {copy.hero.primaryCta} <ArrowRight size={16} />
                  </Button>

                  <Button
                    href="/servicios-legales"
                    variant="secondary"
                    className="bg-white/10 text-white border-white/20 hover:border-white/35"
                  >
                    {copy.hero.secondaryCta}
                  </Button>
                </div>

                <div className="mt-8 grid gap-2 sm:grid-cols-2">
                  {copy.hero.bullets.map((b) => (
                    <div
                      key={b}
                      className="flex items-start gap-3 rounded-3xl border border-white/12 bg-white/5 p-4"
                    >
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

            {/* RIGHT: Foto (espacio para subir foto de ella) */}
            <div className="lg:col-span-5">
              <div className="mx-auto w-full max-w-sm">
                <div className="card overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="relative aspect-[4/5] w-full">
                    {/* Desktop photo */}
                    <div className="absolute inset-0 hidden md:block">
                      <Image
                        src="/images/enis-profile.jpg"
                        alt="Foto profesional de Enis Caicedo"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    {/* Mobile photo */}
                    <div className="absolute inset-0 md:hidden">
                      <Image
                        src="/images/enis-profile-mobile.jpg"
                        alt="Foto profesional de Enis Caicedo (móvil)"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    {/* Soft overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(7,22,28,0.55))]" />
                  </div>

                  <div className="p-5">
                    <p className="text-sm font-semibold text-white">
                      Asesoría personalizada
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/75">
                      Respuesta rápida por WhatsApp. Agenda y plan de acción según su necesidad.
                    </p>
                  </div>
                </div>

                {/* Nota visual sutil (no obligatoria) */}
                <p className="mt-3 text-xs text-white/65">
                  Sube la foto en <span className="font-semibold text-white/80">/public/images/enis-profile.jpg</span> y{" "}
                  <span className="font-semibold text-white/80">/public/images/enis-profile-mobile.jpg</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
