import Hero from "@/components/site/Hero";
import Section from "@/components/site/Section";
import Container from "@/components/ui/Container";
import { copy } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Scale, Home, ShieldCheck, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="kicker">{copy.trust.headline}</p>
              <h2 className="h2 mt-3">Decisiones claras, respaldo sólido</h2>
              <p className="p mt-4">
                Unifique su estrategia legal e inmobiliaria con una asesoría que prioriza su seguridad y confianza.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button href="/servicios-legales" variant="primary">
                  Servicios legales <ArrowRight size={16} />
                </Button>
                <Button href="/bienes-raices" variant="secondary">
                  Bienes raíces
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {copy.trust.items.map((it) => (
                  <div key={it.title} className="card p-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      {it.title === "Experiencia" ? <ShieldCheck size={16} /> : null}
                      {it.title === "Enfoque" ? <Scale size={16} /> : null}
                      {it.title === "Confianza" ? <Home size={16} /> : null}
                      {it.title}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{it.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 card p-6">
                <p className="text-sm font-semibold text-slate-900">Credenciales</p>
                <ul className="mt-3 grid gap-2 text-sm text-slate-600">
                  {copy.trust.credentials.map((c) => (
                    <li key={c} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-aqua" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section
        kicker={copy.howItWorks.kicker}
        title="Un proceso simple y profesional"
        desc="Transparencia desde el primer contacto: información, agenda y plan de acción."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {copy.howItWorks.steps.map((s, idx) => (
            <div key={s.title} className="card p-6">
              <div className="text-xs font-semibold tracking-widest text-slate-500">
                PASO {idx + 1}
              </div>
              <div className="mt-2 text-base font-semibold text-slate-900">{s.title}</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="py-14 sm:py-16">
        <Container>
          <div className="card p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="kicker">Contacto</p>
                <h2 className="h2 mt-3">Agende su asesoría personalizada</h2>
                <p className="p mt-4">
                  Si necesita resolver asuntos legales o evitar problemas al comprar propiedades, este es el punto de inicio.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="grid gap-3">
                  <Button href="/contacto" variant="primary" className="w-full">
                    Ir a Contacto
                  </Button>
                  <Button href="/propiedades" variant="secondary" className="w-full">
                    Ver Propiedades
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
