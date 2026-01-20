import Image from "next/image";
import Container from "@/components/ui/Container";
import { copy } from "@/content/site";
import PropertyCard from "@/components/site/PropertyCard";

export default function PropertiesPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/properties-banner.jpg" alt="Propiedades" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,18,32,0.85),rgba(11,18,32,0.55),rgba(11,18,32,0.20))]" />
        <Container>
          <div className="relative py-16 sm:py-20">
            <p className="kicker text-white/70">Propiedades</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {copy.properties.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80">
              {copy.properties.lead}
            </p>
          </div>
        </Container>
      </div>

      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {copy.properties.items.map((p) => (
              <PropertyCard key={p.id} p={p} />
            ))}
          </div>

          <div className="mt-10 rounded-[var(--radius)] border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
            Reemplace estas tarjetas por sus propiedades reales (imagen, precio, ubicación y tags).
          </div>
        </Container>
      </section>
    </>
  );
}
