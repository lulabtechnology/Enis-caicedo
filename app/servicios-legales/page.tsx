import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/site/ContactForm";
import { copy } from "@/content/site";
import { ArrowDownRight, ShieldCheck } from "lucide-react";

export default function LegalPage() {
  const hooks = (copy.legal as { hooks?: Record<string, string> }).hooks ?? {};

  return (
    <>
      <PageHero
        kicker="Servicios legales"
        title={copy.legal.headline}
        subtitle={copy.legal.lead}
        image="/images/legal-banner.webp"
      />

      <section className="editorial-section py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7" data-reveal>
              <p className="kicker">ÁREAS DE PRÁCTICA</p>
              <h2 className="display-heading mt-5">Asesoría que combina análisis, estrategia y ejecución.</h2>
            </div>
            <div className="lg:col-span-5" data-reveal>
              <p className="editorial-lead">Seleccione el área que mejor describe su necesidad. Cada asunto se evalúa de manera individual para definir alcance, ruta y próximos pasos.</p>
            </div>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2" data-stagger>
            {copy.legal.areas.map((area, index) => (
              <article key={area} className="card group p-6 sm:p-7">
                <div className="flex items-start justify-between gap-5">
                  <span className="text-xs font-extrabold tracking-[0.18em] text-brand-teal">{String(index + 1).padStart(2, "0")}</span>
                  <ArrowDownRight size={18} className="text-brand-aqua transition duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
                </div>
                <h3 className="mt-10 font-display text-3xl font-semibold leading-none text-brand-ink sm:text-4xl">{area}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{hooks[area] ?? "Representación legal y asesoría con enfoque estratégico."}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 flex gap-4 rounded-[var(--radius)] border border-brand-gold/25 bg-[linear-gradient(135deg,rgba(214,177,94,.10),rgba(18,182,182,.06))] p-5 text-sm leading-7 text-slate-700" data-reveal>
            <ShieldCheck size={20} className="mt-1 shrink-0 text-brand-teal" />
            <p><strong className="text-brand-ink">Nota profesional:</strong> {copy.legal.note}</p>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <div className="grid gap-8 rounded-[32px] border border-brand-deep/10 bg-white/80 p-6 shadow-soft sm:p-10 lg:grid-cols-12 lg:items-start" data-reveal>
            <div className="lg:col-span-4">
              <p className="kicker">CONSULTA</p>
              <h2 className="h2 mt-4">Cuéntenos su caso.</h2>
              <p className="p mt-4">Envíe un resumen de su necesidad. El formulario abre WhatsApp con el detalle para facilitar el primer contacto.</p>
            </div>
            <div className="lg:col-span-8">
              <ContactForm subject="Servicios legales" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
