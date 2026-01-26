import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { site, copy } from "@/content/site";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden">
      <div className="absolute inset-0 hidden md:block">
        <Image src="/images/footer-desktop.jpg" alt="Footer background" fill className="object-cover" />
      </div>

      <div className="absolute inset-0 md:hidden">
        <Image src="/images/footer-mobile.jpg" alt="Footer background móvil" fill className="object-cover" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,55,59,0.55),rgba(7,22,28,0.93))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(18,182,182,0.22),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_35%,rgba(18,182,182,0.18),transparent_60%)]" />

      <div className="relative">
        <div className="h-px w-full gradient-line" />

        <Container>
          <div className="grid gap-10 py-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-3">
                <div className="relative grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/10 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(18,182,182,0.35),transparent_60%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(18,182,182,0.22),transparent_55%)]" />
                  <span className="relative text-sm font-extrabold tracking-tight text-white">EC</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{site.brand}</div>
                  <div className="text-xs text-white/70">{site.tagline}</div>
                </div>
              </div>

              <p className="mt-5 text-sm leading-6 text-white/75">
                {copy.footer.close}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="badge-dark">Asesoría legal</span>
                <span className="badge-dark">Bienes raíces</span>
                <span className="badge-dark">Inversionistas</span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-[var(--radius)] border border-white/10 bg-white/10 p-6 backdrop-blur">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <MapPin size={16} className="text-brand-aqua" /> Dirección
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/75">{site.locationLine}</p>
                </div>

                <div className="rounded-[var(--radius)] border border-white/10 bg-white/10 p-6 backdrop-blur">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <Phone size={16} className="text-brand-gold" /> Teléfono / WhatsApp
                  </div>
                  <p className="mt-3 text-sm text-white/75">{site.phone}</p>

                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-white">
                    <Mail size={16} className="text-brand-aqua" /> Email
                  </div>
                  <p className="mt-3 text-sm text-white/75">{site.email}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                <nav className="flex flex-wrap gap-4 text-sm text-white/75">
                  <Link className="no-underline hover:text-white" href="/privacidad">Privacidad</Link>
                  <Link className="no-underline hover:text-white" href="/terminos">Términos</Link>
                  <Link className="no-underline hover:text-white" href="/contacto">Contacto</Link>
                </nav>

                <div className="flex flex-wrap gap-4 text-sm">
                  <Link className="text-white/75 no-underline hover:text-white" href={site.socials.instagram} target="_blank" rel="noreferrer">
                    Instagram
                  </Link>
                  <Link className="text-white/75 no-underline hover:text-white" href={site.socials.youtube} target="_blank" rel="noreferrer">
                    YouTube
                  </Link>
                  <Link className="text-white/75 no-underline hover:text-white" href={site.socials.facebook} target="_blank" rel="noreferrer">
                    Facebook
                  </Link>
                </div>
              </div>

              <p className="mt-4 text-xs text-white/55">
                © {new Date().getFullYear()} {site.brand}. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
