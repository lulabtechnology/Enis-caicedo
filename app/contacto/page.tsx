import Image from "next/image";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/site/ContactForm";
import { site, copy } from "@/content/site";
import { Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/site/PageHero";

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contacto"
        title={copy.contact.headline}
        subtitle="Agende su asesoría. Respuesta rápida por WhatsApp."
        image="/images/phase1/contact-office.webp"
      />

      <section className="editorial-section py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5" data-reveal>
              <p className="kicker">CANALES OFICIALES</p>
              <h2 className="display-heading mt-5">Conversemos sobre su próximo paso.</h2>
              <p className="editorial-lead mt-6">{copy.contact.lead}</p>

              <div className="mt-8 grid gap-3">
                <div className="card p-5">
                  <div className="flex gap-3"><MapPin size={18} className="mt-1 shrink-0 text-brand-teal" /><div><p className="text-xs font-extrabold uppercase tracking-[.14em] text-slate-400">Dirección</p><p className="mt-2 text-sm leading-6 text-slate-700">{site.locationLine}</p></div></div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="card flex items-center gap-3 p-5 no-underline"><Phone size={18} className="text-brand-teal" /><div><p className="text-xs font-extrabold uppercase tracking-[.14em] text-slate-400">Teléfono</p><p className="mt-1 text-sm font-bold text-brand-ink">{site.phone}</p></div></a>
                  <a href={`mailto:${site.email}`} className="card flex items-center gap-3 p-5 no-underline"><Mail size={18} className="text-brand-teal" /><div className="min-w-0"><p className="text-xs font-extrabold uppercase tracking-[.14em] text-slate-400">Email</p><p className="mt-1 truncate text-sm font-bold text-brand-ink">{site.email}</p></div></a>
                </div>
              </div>

              <div className="relative mt-6 aspect-[16/11] overflow-hidden rounded-[30px] shadow-soft">
                <Image src="/images/contact-photo.webp" alt="Enis Caicedo" fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/[.45] via-transparent to-transparent" />
              </div>
            </div>

            <div className="lg:col-span-7" data-reveal>
              <div className="rounded-[32px] border border-brand-deep/10 bg-white/[.86] p-4 shadow-soft sm:p-7">
                <ContactForm subject="Contacto / Agendar cita" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
