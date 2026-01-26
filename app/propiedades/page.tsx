import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import { copy } from "@/content/site";
import PropertyCard from "@/components/site/PropertyCard";
import { Info } from "lucide-react";

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

            {/* Callout informativo (reemplaza la nota vieja) */}
            <div className="mt-10 card p-6">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-white shadow-soft">
                  <Info size={18} className="text-brand-teal" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    Residencia permanente por inversión
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Inversiones inmobiliarias desde{" "}
                    <span className="font-semibold">$300,000</span> pueden calificar
                    al permiso de residencia permanente en calidad de Inversionista
                    Calificado, sujeto a requisitos, documentación y evaluación legal.
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Importante: La elegibilidad final depende de la normativa vigente y del caso particular.
                  </p>
                </div>
              </div>
            </div>
            {/* /Callout */}
          </div>
        </Container>
      </section>
    </>
  );
}
