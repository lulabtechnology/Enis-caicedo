import Hero from "@/components/site/Hero";
import Container from "@/components/ui/Container";
import Image from "next/image";
import { copy } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="surface-tint p-8 sm:p-10">
            <p className="kicker">Sección nueva</p>
            <h2 className="h2 mt-3">{copy.whyPanama.headline}</h2>
            <p className="p mt-4 max-w-3xl">{copy.whyPanama.lead}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {copy.whyPanama.items.map((it) => (
                <div key={it.title} className="card overflow-hidden">
                  <div className="relative h-52 w-full">
                    <Image src={it.image} alt={it.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(7,22,28,0.62))]" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="font-display text-xl font-semibold text-white">{it.title}</p>
                      <p className="mt-1 text-sm text-white/85">{it.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </Container>
      </section>
    </>
  );
}
