import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import { copy } from "@/content/site";

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Perfil"
        title="Sobre Enis Caicedo"
        subtitle="Abogada y corredora de bienes raíces, con enfoque en seguridad, confianza y ejecución estratégica."
        image="/images/about-banner.jpg"
      />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="surface-tint p-8 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card p-6">
                <p className="text-sm font-semibold text-slate-900">Enfoque</p>
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
          </div>
        </Container>
      </section>
    </>
  );
}
