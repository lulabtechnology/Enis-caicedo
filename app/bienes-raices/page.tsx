import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/site/ContactForm";
import { copy } from "@/content/site";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function RealEstatePage() {
  const hooks = (copy.realestate as { hooks?: Record<string, string> }).hooks ?? {};

  return (
    <>
      <PageHero
        kicker="Bienes raíces"
        title={copy.realestate.headline}
        subtitle={copy.realestate.lead}
        image="/images/phase1/realestate-residence.webp"
      />

      <section className="editorial-section py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7" data-reveal>
              <p className="kicker">INVERSIÓN CON CRITERIO</p>
              <h2 className="display-heading mt-5">Una propiedad es una decisión financiera y legal.</h2>
            </div>
            <div className="lg:col-span-5" data-reveal>
              <p className="editorial-lead">El acompañamiento comienza antes de firmar: revisión, contexto, negociación y una ruta que busca proteger su patrimonio.</p>
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3" data-stagger>
            {copy.realestate.bullets.map((item, index) => (
              <article key={item} className="card p-7">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold tracking-[0.18em] text-brand-teal">0{index + 1}</span>
                  <CheckCircle2 size={19} className="text-brand-aqua" />
                </div>
                <h3 className="mt-8 font-display text-3xl font-semibold leading-[1.02] text-brand-ink">{item}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{hooks[item] ?? "Enfoque práctico para reducir riesgos y proteger su patrimonio."}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-8 rounded-[32px] bg-brand-deep p-7 text-white shadow-glow sm:p-10 lg:grid-cols-12 lg:items-center" data-reveal>
            <div className="lg:col-span-8">
              <p className="kicker kicker-light">PROPIEDADES</p>
              <h3 className="mt-4 font-display text-4xl font-semibold leading-none sm:text-5xl">Explore inventario y oportunidades disponibles.</h3>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <a href="/propiedades" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-bold text-white no-underline transition hover:bg-white/15">Ver propiedades <ArrowRight size={16} /></a>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <div className="grid gap-8 rounded-[32px] border border-brand-deep/10 bg-white/80 p-6 shadow-soft sm:p-10 lg:grid-cols-12 lg:items-start" data-reveal>
            <div className="lg:col-span-4">
              <p className="kicker">CONTACTO</p>
              <h2 className="h2 mt-4">Evalúe su inversión antes de comprometer capital.</h2>
              <p className="p mt-4">Comparta su objetivo y coordinamos una asesoría para revisar el punto de partida.</p>
            </div>
            <div className="lg:col-span-8">
              <ContactForm subject="Bienes raíces e inversiones" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
