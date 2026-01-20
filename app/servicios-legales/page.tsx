import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/site/Section";
import ContactForm from "@/components/site/ContactForm";
import { copy } from "@/content/site";

export default function LegalPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/legal-banner.jpg" alt="Servicios legales" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,18,32,0.85),rgba(11,18,32,0.55),rgba(11,18,32,0.20))]" />
        <Container>
          <div className="relative py-16 sm:py-20">
            <p className="kicker text-white/70">Servicios</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {copy.legal.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80">
              {copy.legal.lead}
            </p>
          </div>
        </Container>
      </div>

      <Section title="Áreas de práctica" desc="Seleccione su necesidad y escríbanos para coordinar la asesoría.">
        <div className="grid gap-4 sm:grid-cols-2">
          {copy.legal.areas.map((a) => (
            <div key={a} className="card p-6">
              <div className="text-base font-semibold text-slate-900">{a}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Representación legal y asesoría con enfoque estratégico.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[var(--radius)] border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          <span className="font-semibold">Nota:</span> {copy.legal.note}
        </div>
      </Section>

      <Section
        kicker={copy.howItWorks.kicker}
        title="Cómo trabajamos"
        desc="Proceso claro, comunicación directa y estrategia paso a paso."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {copy.howItWorks.steps.map((s, idx) => (
            <div key={s.title} className="card p-6">
              <div className="text-xs font-semibold tracking-widest text-slate-500">
                PASO {idx + 1}
              </div>
              <div className="mt-2 text-base font-semibold text-slate-900">{s.title}</div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <p className="kicker">Consulta</p>
              <h2 className="h2 mt-3">Escríbanos y agendamos</h2>
              <p className="p mt-4">
                Envíe el formulario y se abrirá WhatsApp con el detalle de su solicitud.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ContactForm subject="Servicios legales" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
