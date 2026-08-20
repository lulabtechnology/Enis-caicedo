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
      className="whatsapp-float no-underline"
      aria-label="WhatsApp"
    >
      <span className="whatsapp-float-ring" aria-hidden="true" />
      <MessageCircle size={22} />
    </Link>
  );
}
