import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { waLink } from "@/lib/links";

export default function WhatsAppFloat() {
  const href = waLink(
    site.whatsapp,
    "Hola, me gustaría solicitar una asesoría personalizada. ¿Podemos coordinar una cita?"
  );

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-brand-aqua text-white shadow-soft no-underline hover:opacity-95"
      aria-label="WhatsApp"
    >
      <MessageCircle size={22} />
    </Link>
  );
}
