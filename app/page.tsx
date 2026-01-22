import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import { copy, site } from "@/content/site";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { waLink } from "@/lib/links";

export default function SobreEnisPage() {
  const waHref = waLink(
    site.whatsapp,
    "Hola Enis, me gustaría conocer más sobre tu perfil y coordinar una asesoría. ¿Podemos agendar?"
  );

  return (
    <>
      <PageHero
        kicker="Perfil"
        title={copy.about.headline}
        subtitle={copy.about.lead}
        image="/images/about-banner.jpg"
      />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            {/* Columna texto */}
            <div className="lg:col-span-7">
              <div className="surface-tint p-8 sm:p-10">
                <p className="kicker">Sobre Enis Caicedo</p>
                <h2 className="h2 mt-3">Criterio legal + visión inmobiliaria</h2>
                <p className="p mt-4">
                  Texto placeholder: aquí se explica su enfoque de trabajo, cómo acompaña al cliente y
                  qué la diferencia. Tú lo puedes reemplazar con la biografía real cuando la tengas.
                </p>

                <div className="mt-8">
                  <p className="font-display text-xl font-semibold text-brand-teal">
                    Credenciales
                  </p>
                  <ul className="mt-4 grid gap-2 text-sm text-slate-600">
                    {copy.trust.credentials.map((c) => (
                      <li key={c} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-aqua" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {copy.trust.values.map((v) => (
                    <div key={v.title} className="card p-6">
                      <p className="font-display text-lg font-semibold text-brand-teal">
                        {v.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{v.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={waHref} variant="primary">
                    Agendar por WhatsApp
                  </Button>
                  <Button href="/contacto" variant="secondary">
                    Ver contacto
                  </Button>
                </div>
              </div>
            </div>

            {/* Columna imagen */}
            <div className="lg:col-span-5">
              <div className="card overflow-hidden">
                <div className="relative aspect-[4/5] w-full">
                  <div className="absolute inset-0 hidden md:block">
                    <Image
                      src="/images/about-photo.jpg"
                      alt="Enis Caicedo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 md:hidden">
                    <Image
                      src="/images/about-photo-mobile.jpg"
                      alt="Enis Caicedo móvil"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(7,22,28,0.45))]" />
                </div>

                <div className="p-6">
                  <p className="font-display text-lg font-semibold text-brand-teal">
                    Atención personalizada
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Placeholder: breve texto sobre disponibilidad, proceso y tipo de casos.
                  </p>
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Fotos: <span className="font-semibold">/public/images/about-photo.jpg</span> y{" "}
                <span className="font-semibold">/public/images/about-photo-mobile.jpg</span>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
