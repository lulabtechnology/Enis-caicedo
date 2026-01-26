import Image from "next/image";
import Container from "@/components/ui/Container";

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
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src={image} alt={title} fill priority className="object-cover" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,22,28,0.92),rgba(6,55,59,0.70),rgba(7,22,28,0.20))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(18,182,182,0.26),transparent_60%)]" />

      <Container>
        <div className="relative py-16 sm:py-20">
          <div className="surface-deep p-7 sm:p-9">
            <p className="text-xs font-semibold tracking-[0.22em] text-white/70">{kicker}</p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[#12B6B6] sm:text-5xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/80">
                {subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
