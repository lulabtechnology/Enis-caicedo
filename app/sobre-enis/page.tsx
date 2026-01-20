import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/site/Section";
import { copy } from "@/content/site";

export default function AboutPage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/about-banner.jpg" alt="Sobre Enis" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,18,32,0.85),rgba(11,18,32,0.55),rgba(11,18,32,0.20))]" />
        <Container>
          <div className="relative py-16 sm:py-20">
            <p className="kicker text-white/70">Perfil</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Sobre Enis Caicedo
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80">
              Abogada y corredora de bienes raíces, con enfoque en seguridad, confianza y ejecución estratégica.
            </p>
          </div>
        </Container>
      </div>

      <Section title="Enfoque profesional" desc="Asesoría legal e inmobiliaria para proteger su patrimonio y tomar decisiones informadas.">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="card p-6">
            <p className="text-sm font-semibold text-slate-900">Lo que priorizamos</p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-600">
              <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-aqua" />Seguridad y confianza</li>
              <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-aqua" />Defensa con estrategia</li>
              <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-aqua" />Acompañamiento en inversiones</li>
              <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-aqua" />Paso a paso</li>
            </ul>
          </div>

          <div className="card p-6">
            <p className="text-sm font-semibold text-slate-900">Credenciales</p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-600">
              {copy.trust.credentials.map((c) => (
                <li key={c} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-gold" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
