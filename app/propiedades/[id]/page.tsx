import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { getPropertyById } from "@/lib/properties";
import { waLink } from "@/lib/links";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const property = await getPropertyById(params.id);

  if (!property) {
    return {
      title: `Propiedad no encontrada | ${site.brand}`
    };
  }

  return {
    title: `${property.title} | ${site.brand}`,
    description: `${property.priceFrom} - ${property.location}`,
    openGraph: {
      title: property.title,
      description: `${property.priceFrom} - ${property.location}`,
      images: [property.image]
    }
  };
}

export default async function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = await getPropertyById(params.id);

  if (!property) notFound();

  const gallery = Array.from(new Set([property.image, ...(property.images ?? [])].filter(Boolean))).slice(0, 12);
  const wa = waLink(
    site.whatsapp,
    `Hola, me interesa esta propiedad: ${property.title}\n${property.priceFrom}\nUbicación: ${property.location}\nLink: /propiedades/${property.id}\n¿Me puede compartir más información?`
  );

  return (
    <>
      <PageHero
        kicker={property.source ? property.source : "Propiedad"}
        title={property.title}
        subtitle={`${property.priceFrom} · ${property.location}`}
        image={gallery[0] || "/images/properties-banner.jpg"}
      />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="card overflow-hidden">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={gallery[0] || "/images/properties-banner.jpg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {gallery.length > 1 ? (
                  <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
                    {gallery.slice(1).map((src, index) => (
                      <div key={`${src}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200">
                        <Image src={src} alt={`${property.title} foto ${index + 2}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="card sticky top-24 p-6">
                <p className="kicker">Ficha</p>
                <h1 className="mt-2 font-display text-2xl font-semibold text-slate-900">{property.title}</h1>
                <p className="mt-3 text-lg font-semibold text-brand-teal">{property.priceFrom}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{property.location}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {property.source ? (
                    <span className="rounded-full border border-brand-aqua/40 bg-brand-aqua/10 px-3 py-1 text-xs font-semibold text-brand-teal">
                      {property.source}
                    </span>
                  ) : null}
                  {property.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200 bg-brand-ice px-3 py-1 text-xs font-medium text-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>

                {property.highlights.length ? (
                  <ul className="mt-6 grid gap-3 text-sm text-slate-700">
                    {property.highlights.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-aqua" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {property.description ? (
                  <p className="mt-6 text-sm leading-6 text-slate-600">{property.description}</p>
                ) : null}

                <div className="mt-7">
                  <Button href={wa} variant="primary" className="w-full">
                    Solicitar por WhatsApp
                  </Button>
                </div>

                <p className="mt-4 text-xs leading-5 text-slate-500">
                  La disponibilidad, precio y condiciones pueden cambiar. Confirme la información antes de tomar una decisión.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
