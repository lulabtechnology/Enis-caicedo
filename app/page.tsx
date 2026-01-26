import Hero from "@/components/site/Hero";
import Container from "@/components/ui/Container";
import { copy } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ShieldCheck, Scale, Home } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Trust / Credenciales */}
      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="kicker">{copy.trust.headline}</p>
              <h2 className="h2 mt-3">
                Decisiones claras con{" "}
                <span className="text-brand-gradient">respaldo sólido</span>
              </h2>
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
                  <div key={it.title} className="surface-tint p-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      {it.title === "Experiencia" ? <ShieldCheck size={16} className="text-brand-aqua" /> : null}
                      {it.title === "Enfoque" ? <Scale size={16} className="text-brand-teal" /> : null}
                      {it.title === "Confianza" ? <Home size={16} className="text-brand-gold" /> : null}
                      {it.title}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{it.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 surface-tint p-6">
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

      {/* Proceso */}
      <section className="py-14 sm:py-16">
        <Container>
          <div className="surface-tint p-8 sm:p-10">
            <p className="kicker">{copy.howItWorks.kicker}</p>
            <h2 className="h2 mt-3">Un proceso simple y profesional</h2>
            <p className="p mt-4">
              Transparencia desde el primer contacto: información, agenda y plan de acción.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
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
          </div>
        </Container>
      </section>

      {/* CTA final */}
      <section className="py-14 sm:py-16">
        <Container>
          <div className="surface-deep p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold tracking-[0.22em] text-white/70">Contacto</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Agende su asesoría con{" "}
                  <span className="text-brand-gradient">claridad</span>
                </h2>
                <p className="mt-4 text-base leading-7 text-white/80">
                  Si necesita resolver asuntos legales o evitar riesgos al comprar propiedades, este es el punto de inicio.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="grid gap-3">
                  <Button href="/contacto" variant="primary" className="w-full">
                    Ir a Contacto
                  </Button>
                  <Button
                    href="/propiedades"
                    variant="secondary"
                    className="w-full bg-white/10 text-white border-white/20 hover:border-white/30"
                  >
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
