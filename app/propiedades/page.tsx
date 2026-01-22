import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import { copy } from "@/content/site";
import BuildingCard from "@/components/site/BuildingCard";

export default function PropertiesPage() {
  return (
    <>
      <PageHero
        kicker="Propiedades"
        title={copy.properties.headline}
        subtitle={copy.properties.lead}
        image="/images/properties-banner.jpg"
      />

      {/* EDIFICIOS (11) */}
      <section className="py-14 sm:py-16">
        <Container>
          <div className="surface-tint p-8 sm:p-10">
            <p className="kicker">Nuevo</p>
            <h2 className="h2 mt-3">{copy.buildings.headline}</h2>
            <p className="p mt-4 max-w-3xl">{copy.buildings.lead}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {copy.buildings.items.map((b) => (
                <BuildingCard key={b.id} b={b} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* (Si quieres, dejamos la sección anterior de “propiedades individuales” abajo luego) */}
    </>
  );
}
