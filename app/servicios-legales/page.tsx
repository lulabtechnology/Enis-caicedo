import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/site/ContactForm";
import { copy } from "@/content/site";

export default function LegalPage() {
  const hooks =
    (copy.legal as { hooks?: Record<string, string> }).hooks ?? {};

  return (
    <>
      <PageHero
        kicker="Servicios"
        title={copy.legal.headline}
        subtitle={copy.legal.lead}
        image="/images/legal-banner.jpg"
      />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="surface-tint p-8 sm:p-10">
            <h2 className="h2">Áreas de práctica</h2>
            <p className="p mt-3">Seleccione su necesidad y escríbanos para coordinar la asesoría.</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {copy.legal.areas.map((a) => (
                <div key={a} className="card p-6">
                  <div className="text-base font-semibold text-slate-900">{a}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {hooks[a] ?? "Representación legal y asesoría con enfoque estratégico."}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[var(--radius)] border border-brand-gold/30 bg-[linear-gradient(135deg,rgba(214,177,94,0.10),rgba(18,182,182,0.10))] p-5 text-sm text-slate-800">
              <span className="font-semibold">Nota:</span> {copy.legal.note}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <p className="kicker">Consulta</p>
              <h2 className="h2 mt-3">Escríbanos y agendamos</h2>
              <p className="p mt-4">
                Envíe el formulario y se abrirá WhatsApp con el detalle de su solicitud.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ContactForm subject="Servicios legales" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
