import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { waLink } from "@/lib/links";

export type Property = {
  id: string;
  title: string;
  priceFrom: string;
  location: string;
  tags: string[];
  image: string;
};

export default function PropertyCard({ p }: { p: Property }) {
  const wa = waLink(
    site.whatsapp,
    `Hola, me interesa la propiedad: ${p.title}\n${p.priceFrom}\nUbicación: ${p.location}\n¿Podemos coordinar una visita o recibir más información?`
  );

  return (
    <div className="card overflow-hidden border-slate-200">
      <div className="relative h-52 w-full">
        <Image src={p.image} alt={p.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/65 via-black/10 to-transparent" />
        <div className="absolute top-4 left-4 inline-flex rounded-full border border-brand-gold/30 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
          {p.priceFrom}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-base font-semibold text-slate-900">{p.title}</h3>
        <p className="mt-1 text-sm text-slate-600">{p.location}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-slate-200 bg-brand-ice px-3 py-1 text-xs font-medium text-slate-700"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5">
          <Button href={wa} variant="primary" className="w-full">
            Solicitar por WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
