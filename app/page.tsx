import Image from "next/image";
import Hero from "@/components/site/Hero";
import Container from "@/components/ui/Container";
import { copy, site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { waLink } from "@/lib/links";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Globe2,
  Scale,
  ShieldCheck,
  Sparkles
} from "lucide-react";

export default function HomePage() {
  const waHref = waLink(
    site.whatsapp,
    "Hola, me gustaría solicitar una asesoría personalizada con Enis Caicedo. ¿Podemos coordinar una cita?"
  );

  return (
    <>
      <Hero />

      <section id="inicio-contenido" className="editorial-section overflow-hidden py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7" data-reveal>
              <p className="kicker">DOS DISCIPLINAS. UNA SOLA ESTRATEGIA.</p>
              <h2 className="display-heading mt-5 max-w-4xl">
                Proteja lo que tiene. <span>Construya lo que sigue.</span>
              </h2>
            </div>
            <div className="lg:col-span-5" data-reveal>
              <p className="editorial-lead">
                El valor de una buena decisión no está solo en cerrar una operación: está en comprender el riesgo,
                ordenar la estrategia y avanzar con respaldo jurídico e inmobiliario.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2" data-stagger>
            <article className="service-feature group">
              <div className="service-feature-media">
                <Image
                  src="/images/legal-banner.webp"
                  alt="Servicios legales"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="service-feature-overlay" />
              </div>
              <div className="service-feature-content">
                <div className="service-feature-icon"><Scale size={21} /></div>
                <p className="service-feature-index">01 / DERECHO</p>
                <h3>Servicios legales con visión estratégica.</h3>
                <p>{copy.legal.lead}</p>
                <Button href="/servicios-legales" variant="secondary" className="mt-7">
                  Explorar servicios <ArrowRight size={15} />
                </Button>
              </div>
            </article>

            <article className="service-feature group">
              <div className="service-feature-media">
                <Image
                  src="/images/realestate-banner.webp"
                  alt="Bienes raíces e inversiones"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="service-feature-overlay" />
              </div>
              <div className="service-feature-content">
                <div className="service-feature-icon"><Building2 size={21} /></div>
                <p className="service-feature-index">02 / REAL ESTATE</p>
                <h3>Inversión inmobiliaria con criterio legal.</h3>
                <p>{copy.realestate.lead}</p>
                <Button href="/bienes-raices" variant="secondary" className="mt-7">
                  Ver enfoque inmobiliario <ArrowRight size={15} />
                </Button>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className="brand-depth-section py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5" data-reveal>
              <div className="portrait-editorial">
                <div className="portrait-editorial-image">
                  <Image
                    src="/images/enis-profile.webp"
                    alt="Enis Caicedo"
                    fill
                    sizes="(min-width: 1024px) 38vw, 90vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="portrait-editorial-badge" data-float>
                  <Sparkles size={18} />
                  <span>Enfoque legal e inmobiliario integrado</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pl-10" data-reveal>
              <p className="kicker kicker-light">RESPALDO PROFESIONAL</p>
              <h2 className="display-heading display-heading-light mt-5">
                Claridad antes de firmar. <span>Confianza después de decidir.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                Cada caso se aborda con una lectura integral: contexto legal, impacto patrimonial y viabilidad de la
                operación. Ese cruce de perspectivas permite anticipar riesgos y tomar decisiones con mayor control.
              </p>

              <div className="credential-bento mt-10" data-stagger>
                <div className="credential-card credential-card-highlight">
                  <strong>9</strong>
                  <span>Años de experiencia en derecho</span>
                </div>
                <div className="credential-card">
                  <BadgeCheck size={20} />
                  <span>Vicepresidenta de ANDAP</span>
                </div>
                <div className="credential-card">
                  <ShieldCheck size={20} />
                  <span>Miembro de ACOBIR y su comité legal</span>
                </div>
                <div className="credential-card">
                  <Globe2 size={20} />
                  <span>Asistencia internacional y representación confiable</span>
                </div>
              </div>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/sobre-enis" variant="secondary" className="border-white/15 bg-white/10 text-white hover:bg-white/15">
                  Conocer perfil
                </Button>
                <Button href={waHref} variant="primary">
                  Solicitar asesoría <ArrowRight size={15} />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="editorial-section py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4" data-reveal>
              <div className="sticky top-32">
                <p className="kicker">{copy.howItWorks.kicker}</p>
                <h2 className="display-heading mt-5">Un proceso pensado para avanzar sin improvisar.</h2>
                <p className="editorial-lead mt-6">
                  Información, diagnóstico y plan de acción. Tres pasos para convertir una consulta en una ruta clara.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 lg:pl-10">
              <div className="process-list" data-stagger>
                {copy.howItWorks.steps.map((step, index) => (
                  <article key={step.title} className="process-row">
                    <div className="process-number">{String(index + 1).padStart(2, "0")}</div>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.desc}</p>
                    </div>
                    <CheckCircle2 size={20} className="process-check" />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-32">
        <Container>
          <div className="final-cta" data-reveal>
            <div className="final-cta-media">
              <Image
                src="/images/footer-desktop.webp"
                alt="Ciudad de Panamá"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="final-cta-overlay" />
            <div className="relative z-10 grid gap-10 p-8 sm:p-12 lg:grid-cols-12 lg:items-end lg:p-16">
              <div className="lg:col-span-8">
                <p className="kicker kicker-light">SIGUIENTE PASO</p>
                <h2 className="display-heading display-heading-light mt-5 max-w-4xl">
                  Una conversación puede darle <span>más claridad a su próxima decisión.</span>
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/75">
                  Cuéntenos su caso, inversión o necesidad. Coordinamos una asesoría y definimos el mejor punto de partida.
                </p>
              </div>
              <div className="lg:col-span-4">
                <div className="grid gap-3">
                  <Button href={waHref} variant="primary" className="w-full">
                    Escribir por WhatsApp <ArrowRight size={15} />
                  </Button>
                  <Button href="/contacto" variant="secondary" className="w-full border-white/15 bg-white/10 text-white hover:bg-white/15">
                    Ir a contacto
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
