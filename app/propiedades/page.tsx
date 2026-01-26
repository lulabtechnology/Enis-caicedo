import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import { copy } from "@/content/site";
import PropertyCard from "@/components/site/PropertyCard";

export default function PropertiesPage() {
  const groups = copy.properties.items.reduce((acc: Record<string, typeof copy.properties.items>, p) => {
    const key = p.building || "Edificios";
    (acc[key] ??= []).push(p);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        kicker="Propiedades"
        title={copy.properties.headline}
        subtitle={copy.properties.lead}
        image="/images/properties-banner.jpg"
      />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="surface-tint p-8 sm:p-10">
            <div className="grid gap-10">
              {Object.entries(groups).map(([building, items]) => (
                <div key={building}>
                  <div className="mb-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="kicker">EDIFICIO</p>
                      <h2 className="h2 mt-2">{building}</h2>
                    </div>
                    <p className="text-sm text-slate-600">
                      {items.length} {items.length === 1 ? "propiedad" : "propiedades"}
                    </p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((p) => (
                      <PropertyCard key={p.id} p={p} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[var(--radius)] border border-slate-200 bg-white p-6 text-sm text-slate-700">
              Nota: Reemplace nombres de edificios, títulos, precios, highlights y rutas de imágenes por los reales.
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
