import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/site/ContactForm";
import { copy } from "@/content/site";

export default function RealEstatePage() {
  return (
    <>
      <PageHero
        kicker="Inmobiliaria"
        title={copy.realestate.headline}
        subtitle={copy.realestate.lead}
        image="/images/realestate-banner.jpg"
      />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="surface-tint p-8 sm:p-10">
            <h2 className="h2">Lo que obtiene</h2>
            <p className="p mt-3">Acompañamiento para invertir y cerrar con claridad.</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {copy.realestate.bullets.map((b) => (
                <div key={b} className="card p-6">
                  <div className="text-base font-semibold text-slate-900">{b}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Enfoque práctico para reducir riesgos y proteger su patrimonio.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <p className="kicker">Contacto</p>
              <h2 className="h2 mt-3">Solicite asesoría</h2>
              <p className="p mt-4">
                Si está evaluando una compra o inversión, le ayudamos a minimizar riesgos desde el inicio.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ContactForm subject="Bienes raíces e inversiones" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
