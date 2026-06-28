import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import { site } from "@/content/site";

export default function TermsPage() {
  return (
    <>
      <PageHero
        kicker="Términos"
        title="Términos y condiciones"
        subtitle="Información general sobre el uso de este sitio web."
        image="/images/legal-banner.jpg"
      />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="surface-tint p-8 sm:p-10">
            <div className="prose max-w-none prose-slate">
              <p>
                El contenido de este sitio web es informativo y no constituye asesoría legal definitiva ni una oferta vinculante de compra, venta o alquiler de inmuebles.
              </p>
              <p>
                Los precios, disponibilidad, imágenes y características de propiedades pueden cambiar sin previo aviso. Toda información debe ser confirmada directamente con {site.brand} antes de tomar decisiones legales o comerciales.
              </p>
              <p>
                Al contactar por WhatsApp, formulario, correo o teléfono, usted acepta que podamos responderle para coordinar asesoría, visitas, seguimiento comercial o revisión de su solicitud.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
