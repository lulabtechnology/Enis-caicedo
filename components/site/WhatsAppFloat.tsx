import Link from "next/link";
import WhatsAppIcon from "@/components/site/WhatsAppIcon";
import { site } from "@/content/site";
import { waLink } from "@/lib/links";

export default function WhatsAppFloat() {
  const href = waLink(site.whatsapp, "Hola, me gustaría solicitar una asesoría personalizada. ¿Podemos coordinar una cita?");
  return (
    <Link href={href} target="_blank" rel="noreferrer" className="whatsapp-float no-underline" aria-label="Abrir conversación en WhatsApp">
      <span className="whatsapp-float-ring" aria-hidden="true" />
      <WhatsAppIcon size={28} />
    </Link>
  );
}
