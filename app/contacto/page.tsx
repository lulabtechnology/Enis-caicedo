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
        image="/images/realestate-banner.jpg"
      />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            {/* LEFT */}
            <div className="lg:col-span-5 space-y-6">
              <div className="surface-tint p-7 sm:p-8">
                <p className="kicker">Información</p>
                <h2 className="h2 mt-3">Canales oficiales</h2>
                <p className="p mt-4">{copy.contact.lead}</p>

                <div className="mt-8 grid gap-4">
                  <div className="card p-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <MapPin size={16} className="text-brand-teal" /> Dirección
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {site.locationLine}
                    </p>
                  </div>

                  <div className="card p-6">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Phone size={16} className="text-brand-gold" /> Teléfono / WhatsApp
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{site.phone}</p>

                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Mail size={16} className="text-brand-aqua" /> Email
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{site.email}</p>
                  </div>
                </div>
              </div>

              {/* FOTO CONTACTO (desktop + mobile) */}
              <div className="surface-tint overflow-hidden">
                <div className="relative aspect-[4/5] w-full">
                  {/* Desktop */}
                  <div className="absolute inset-0 hidden md:block">
                    <Image
                      src="/images/contact-photo.jpg"
                      alt="Enis Caicedo"
                      fill
                      className="object-cover"
                      priority={false}
                    />
                  </div>

                  {/* Mobile */}
                  <div className="absolute inset-0 md:hidden">
                    <Image
                      src="/images/contact-photo-mobile.jpg"
                      alt="Enis Caicedo (móvil)"
                      fill
                      className="object-cover"
                      priority={false}
                    />
                  </div>

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(7,22,28,0.55))]" />
                </div>

                <div className="p-6">
                  <p className="text-sm font-semibold text-slate-900">{site.brand}</p>
                  <p className="mt-1 text-sm text-slate-600">Abogada &amp; Real Estate</p>
                </div>
              </div>
              {/* /FOTO CONTACTO */}
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-7">
              <ContactForm subject="Contacto / Agendar cita" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
