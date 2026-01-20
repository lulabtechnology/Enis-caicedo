import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/site/Section";
import ContactForm from "@/components/site/ContactForm";
import { copy } from "@/content/site";

export default function RealEstatePage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/realestate-banner.jpg" alt="Bienes raíces" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,18,32,0.85),rgba(11,18,32,0.55),rgba(11,18,32,0.20))]" />
        <Container>
          <div className="relative py-16 sm:py-20">
            <p className="kicker text-white/70">Inmobiliaria</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {copy.realestate.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80">
              {copy.realestate.lead}
            </p>
          </div>
        </Container>
      </div>

      <Section title="Lo que obtiene" desc="Acompañamiento para invertir y cerrar con claridad.">
        <div className="grid gap-4 sm:grid-cols-3">
          {copy.realestate.bullets.map((b) => (
            <div key={b} className="card p-6">
              <div className="text-base font-semibold text-slate-900">{b}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Enfoque práctico para reducir riesgos y proteger su patrimonio.
              </p>
            </div>
          ))}
        </div>
      </Section>

      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <p className="kicker">Propiedades</p>
              <h2 className="h2 mt-3">Vea opciones y solicite detalles</h2>
              <p className="p mt-4">
                Puede revisar la sección de Propiedades y pedir información directa por WhatsApp.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ContactForm subject="Bienes raíces e inversiones" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
