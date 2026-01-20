import Container from "@/components/ui/Container";
import ContactForm from "@/components/site/ContactForm";
import { site, copy } from "@/content/site";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="kicker">Contacto</p>
            <h1 className="h1 mt-3">{copy.contact.headline}</h1>
            <p className="p mt-4">{copy.contact.lead}</p>

            <div className="mt-8 grid gap-4">
              <div className="card p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <MapPin size={16} /> Dirección
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{site.locationLine}</p>
              </div>

              <div className="card p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Phone size={16} /> Teléfono
                </div>
                <p className="mt-3 text-sm text-slate-600">{site.phone}</p>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Mail size={16} /> Email
                </div>
                <p className="mt-3 text-sm text-slate-600">{site.email}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm subject="Contacto / Agendar cita" />
          </div>
        </div>
      </Container>
    </section>
  );
}
