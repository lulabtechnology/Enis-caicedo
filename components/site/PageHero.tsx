import Image from "next/image";
import Container from "@/components/ui/Container";
import { ArrowDownRight } from "lucide-react";

export default function PageHero({
  kicker,
  title,
  subtitle,
  image
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  image: string;
}) {
  return (
    <section className="page-hero relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          data-parallax
        />
      </div>
      <div className="page-hero-overlay absolute inset-0" />
      <div className="hero-grid absolute inset-0 opacity-50" aria-hidden="true" />

      <Container>
        <div className="relative flex min-h-[52svh] items-end py-12 sm:min-h-[56svh] sm:py-16 lg:min-h-[60svh] lg:py-20">
          <div className="grid w-full gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="page-hero-kicker" data-hero-line>
                <span /> {kicker}
              </div>
              <h1 className="page-hero-title mt-5" data-hero-line>{title}</h1>
            </div>
            {subtitle ? (
              <div className="lg:col-span-4" data-hero-line>
                <div className="page-hero-note">
                  <ArrowDownRight size={18} className="shrink-0 text-brand-aqua" />
                  <p>{subtitle}</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
