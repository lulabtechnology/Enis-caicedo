const ALLOWED_TAGS = new Set([
  "p", "div", "br", "strong", "b", "em", "i", "u", "s",
  "h2", "h3", "ul", "ol", "li", "blockquote", "a"
]);

const BLOCKED_WITH_CONTENT = /<(script|style|iframe|object|embed|svg|math|form|template|noscript)\b[^>]*>[\s\S]*?<\/\1\s*>/gi;
const BLOCKED_SINGLE = /<(input|textarea|select|option|button|link|meta|base|video|audio|source|track|canvas)\b[^>]*\/?\s*>/gi;

function safeHref(value: string): string | null {
  const href = value.trim();
  if (/^(https?:\/\/|mailto:|tel:)/i.test(href)) return href;
  return null;
}

function safeTextAlign(style: string): string | null {
  const match = style.match(/(?:^|;)\s*text-align\s*:\s*(left|center|right|justify)\s*(?:;|$)/i);
  return match ? match[1].toLowerCase() : null;
}

function escapeAttribute(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function sanitizeBlogHtml(input: string): string {
  let html = String(input || "").replace(/\u0000/g, "");
  html = html.replace(/<!--[\s\S]*?-->/g, "");
  html = html.replace(BLOCKED_WITH_CONTENT, "");
  html = html.replace(BLOCKED_SINGLE, "");

  html = html.replace(/<\/?([a-z0-9]+)\b([^>]*)>/gi, (full, rawTag: string, rawAttrs: string) => {
    const closing = /^<\//.test(full);
    const tag = rawTag.toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return "";
    if (closing) return `</${tag}>`;
    if (tag === "br") return "<br>";

    const attrs: string[] = [];

    if (["p", "div", "h2", "h3", "li", "blockquote"].includes(tag)) {
      const styleMatch = rawAttrs.match(/\bstyle\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
      const align = safeTextAlign(styleMatch?.[1] || styleMatch?.[2] || styleMatch?.[3] || "");
      if (align) attrs.push(`style="text-align:${align}"`);

      const alignMatch = rawAttrs.match(/\balign\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
      const legacyAlign = (alignMatch?.[1] || alignMatch?.[2] || alignMatch?.[3] || "").toLowerCase();
      if (!align && ["left", "center", "right", "justify"].includes(legacyAlign)) {
        attrs.push(`style="text-align:${legacyAlign}"`);
      }
    }

    if (tag === "ol") {
      const startMatch = rawAttrs.match(/\bstart\s*=\s*(?:"(\d+)"|'(\d+)'|(\d+))/i);
      const start = startMatch?.[1] || startMatch?.[2] || startMatch?.[3];
      if (start) attrs.push(`start="${start}"`);
    }

    if (tag === "a") {
      const hrefMatch = rawAttrs.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
      const href = safeHref(hrefMatch?.[1] || hrefMatch?.[2] || hrefMatch?.[3] || "");
      if (!href) return "<a>";
      attrs.push(`href="${escapeAttribute(href)}"`);
      if (/^https?:\/\//i.test(href)) attrs.push('target="_blank"', 'rel="noopener noreferrer"');
    }

    return `<${tag}${attrs.length ? ` ${attrs.join(" ")}` : ""}>`;
  });

  return html.trim();
}

export function blogContentPlainText(content: string): string {
  return String(content || "")
    .replace(/<br\s*\/?\s*>/gi, " ")
    .replace(/<\/p\s*>/gi, " ")
    .replace(/<\/div\s*>/gi, " ")
    .replace(/<\/li\s*>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/[#>*_\-\[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function looksLikeBlogHtml(content: string): boolean {
  return /<(p|div|h2|h3|ul|ol|li|blockquote|strong|b|em|i|u|s|a|br)\b/i.test(content);
}
