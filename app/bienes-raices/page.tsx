import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import { copy } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { waLink } from "@/lib/links";

export default function BienesRaicesPage() {
  const waHref = waLink(
    site.whatsapp,
    "Hola Enis, me interesa una asesoría de bienes raíces. ¿Podemos coordinar una llamada o cita?"
  );

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
            <p className="kicker">Servicios inmobiliarios</p>
            <h2 className="h2 mt-3">Acompañamiento claro, de principio a fin</h2>
            <p className="p mt-4 max-w-3xl">
              Selección de propiedad, validación de documentos, negociación y cierre con enfoque
              legal y estratégico.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {copy.realestate.bullets.map((t) => (
                <div key={t} className="card p-6">
                  <p className="font-display text-lg font-semibold text-brand-teal">{t}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Texto placeholder breve. Tú lo cambias luego con el detalle real del servicio.
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={waHref} variant="primary">
                Solicitar por WhatsApp
              </Button>
              <Button href="/propiedades" variant="secondary">
                Ver propiedades
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
