import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import { copy } from "@/content/site";
import PropertyCard from "@/components/site/PropertyCard";

export default function PropertiesPage() {
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {copy.properties.items.map((p) => (
                <PropertyCard key={p.id} p={p} />
              ))}
            </div>

            <div className="mt-10 rounded-[var(--radius)] border border-slate-200 bg-white p-6 text-sm text-slate-700">
              Reemplace estas tarjetas por sus propiedades reales (imagen, precio, ubicación y tags).
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
