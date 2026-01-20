export function waLink(phoneE164: string, message: string) {
  const p = phoneE164.replace(/[^\d+]/g, "");
  const text = encodeURIComponent(message);
  return `https://wa.me/${p.replace("+", "")}?text=${text}`;
}
