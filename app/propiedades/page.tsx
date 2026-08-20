import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import { copy } from "@/content/site";
import PropertyCard from "@/components/site/PropertyCard";
import { getActivePropertiesForSite, groupPropertiesByBuilding } from "@/lib/properties";
import { Info, MapPinned } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const { properties: activeProperties } = await getActivePropertiesForSite();
  const grouped = groupPropertiesByBuilding(activeProperties);

  return (
    <>
      <PageHero
        kicker="Propiedades"
        title={copy.properties.headline}
        subtitle={copy.properties.lead}
        image="/images/phase1/realestate-residence.webp"
      />

      <section className="editorial-section py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7" data-reveal>
              <p className="kicker">INVENTARIO INMOBILIARIO</p>
              <h2 className="display-heading mt-5">Oportunidades para vivir, invertir y diversificar.</h2>
            </div>
            <div className="lg:col-span-5" data-reveal>
              <p className="editorial-lead">Explore las propiedades disponibles y solicite información directamente por WhatsApp. Cada ficha conserva los datos operativos del inventario actual.</p>
            </div>
          </div>

          <div className="mt-14 grid gap-14">
            {Object.entries(grouped).map(([building, items]) => (
              <section key={building} data-reveal>
                <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-brand-deep/10 pb-5">
                  <div>
                    <p className="kicker">ZONA / EDIFICIO</p>
                    <h3 className="mt-2 flex items-center gap-3 font-display text-3xl font-semibold text-brand-ink sm:text-4xl">
                      <MapPinned size={20} className="text-brand-aqua" /> {building}
                    </h3>
                  </div>
                  <span className="rounded-full border border-brand-aqua/20 bg-brand-ice px-4 py-2 text-xs font-extrabold tracking-[.12em] text-brand-teal">
                    {items.length} {items.length === 1 ? "PROPIEDAD" : "PROPIEDADES"}
                  </span>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
                  {items.map((property) => <PropertyCard key={property.id} p={property} />)}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 flex items-start gap-4 rounded-[28px] border border-brand-aqua/20 bg-[linear-gradient(135deg,rgba(18,182,182,.10),rgba(255,255,255,.88))] p-6 shadow-soft sm:p-8" data-reveal>
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-deep text-brand-aqua"><Info size={19} /></div>
            <div>
              <p className="font-display text-2xl font-semibold text-brand-ink">Residencia permanente por inversión</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">Inversiones inmobiliarias desde <strong className="text-brand-ink">$300,000</strong> pueden calificar al permiso de residencia permanente en calidad de Inversionista Calificado, sujeto a requisitos, documentación y evaluación legal.</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">La elegibilidad final depende de la normativa vigente y del caso particular.</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
