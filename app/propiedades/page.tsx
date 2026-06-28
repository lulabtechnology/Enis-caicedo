import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import { copy } from "@/content/site";
import PropertyCard from "@/components/site/PropertyCard";
import { getIdxData, getIdxProperties } from "@/lib/idx/local-store";
import { getManualProperties, groupPropertiesByBuilding } from "@/lib/properties";
import { Info, RefreshCw } from "lucide-react";

export default function PropertiesPage() {
  const idxData = getIdxData();
  const idxProperties = getIdxProperties();
  const manualProperties = getManualProperties();
  const activeProperties = idxProperties.length ? idxProperties : manualProperties;
  const grouped = groupPropertiesByBuilding(activeProperties);
  const usingIdx = idxProperties.length > 0;

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
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="kicker">Inventario inmobiliario</p>
                <h2 className="h2 mt-2">{usingIdx ? "Propiedades ACOBIR IDX" : "Propiedades destacadas"}</h2>
                <p className="p mt-3 max-w-3xl">
                  {usingIdx
                    ? "Listado conectado al feed IDX. Las imágenes se sirven desde esta web, no como hotlink externo."
                    : "Inventario manual mientras se conecta y sincroniza el feed IDX de ACOBIR."}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-soft">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <RefreshCw size={16} className="text-brand-teal" />
                  {usingIdx ? `${idxData.counts.total} propiedades IDX` : "Modo manual"}
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {idxData.generatedAt
                    ? `Última sincronización: ${new Date(idxData.generatedAt).toLocaleString("es-PA")}`
                    : "IDX listo para sincronizar cuando se configuren las credenciales."}
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-10">
              {Object.entries(grouped).map(([building, items]) => (
                <div key={building}>
                  <p className="kicker">Zona / Edificio</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">{building}</h3>

                  <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((p) => (
                      <PropertyCard key={p.id} p={p} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

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
          </div>
        </Container>
      </section>
    </>
  );
}
