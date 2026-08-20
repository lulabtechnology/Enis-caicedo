import Image from "next/image";
import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import { copy } from "@/content/site";
import { BadgeCheck, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Perfil profesional"
        title="Sobre Enis Caicedo"
        subtitle="Abogada y corredora de bienes raíces, con enfoque en seguridad, confianza y ejecución estratégica."
        image="/images/phase1/investment-office.webp"
      />

      <section className="editorial-section py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5" data-reveal>
              <div className="relative mx-auto max-w-md">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[38px] border border-brand-deep/10 bg-white shadow-soft">
                  <Image src="/images/enis-profile1.webp" alt="Enis Caicedo" fill sizes="(min-width: 1024px) 38vw, 90vw" className="object-cover object-top" priority />
                </div>
                <div className="absolute -bottom-5 -right-3 max-w-[220px] rounded-[22px] border border-white/80 bg-white/90 p-4 shadow-soft backdrop-blur" data-float>
                  <div className="flex items-start gap-3">
                    <BadgeCheck size={20} className="mt-0.5 shrink-0 text-brand-teal" />
                    <p className="text-xs font-bold leading-5 text-brand-ink">Asesoría legal e inmobiliaria con una visión patrimonial integral.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 lg:pl-10" data-reveal>
              <p className="kicker">ENFOQUE</p>
              <h2 className="display-heading mt-5">Decisiones importantes merecen una mirada completa.</h2>
              <p className="editorial-lead mt-6">La práctica combina criterio jurídico, experiencia inmobiliaria y acompañamiento cercano para transformar información compleja en decisiones más claras y seguras.</p>

              <div className="mt-9 grid gap-3 sm:grid-cols-2" data-stagger>
                {["Seguridad y confianza", "Defensa con estrategia", "Acompañamiento en inversiones", "Ejecución paso a paso"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-brand-deep/10 bg-white/80 p-4 shadow-sm">
                    <CheckCircle2 size={18} className="shrink-0 text-brand-aqua" />
                    <span className="text-sm font-bold text-brand-ink">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="brand-depth-section py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="relative grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4" data-reveal>
              <p className="kicker kicker-light">CREDENCIALES</p>
              <h2 className="display-heading display-heading-light mt-5">Respaldo que se construye con trayectoria.</h2>
            </div>
            <div className="lg:col-span-8 lg:pl-8" data-stagger>
              <div className="grid gap-3 sm:grid-cols-2">
                {copy.trust.credentials.map((credential, index) => (
                  <article key={credential} className="credential-card min-h-[150px]">
                    <span className="text-brand-aqua">0{index + 1}</span>
                    <p className="text-sm font-semibold leading-6 text-white/[.78]">{credential}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
