import type { ReactNode } from "react";

function safeLink(url: string): string | null {
  const trimmed = url.trim();
  if (/^(https?:\/\/|mailto:)/i.test(trimmed)) return trimmed;
  return null;
}

function inlineNodes(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^\s)]+\))/g;
  let cursor = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text))) {
    if (match.index > cursor) nodes.push(text.slice(cursor, match.index));
    const token = match[0];

    if (token.startsWith("**")) {
      nodes.push(<strong key={`strong-${key++}`}>{token.slice(2, -2)}</strong>);
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      const href = linkMatch ? safeLink(linkMatch[2]) : null;
      if (linkMatch && href) {
        nodes.push(
          <a
            key={`link-${key++}`}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            className="font-semibold text-brand-teal underline"
          >
            {linkMatch[1]}
          </a>
        );
      } else {
        nodes.push(token);
      }
    }

    cursor = match.index + token.length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

export default function BlogContent({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let bullets: string[] = [];
  let numbered: string[] = [];
  let key = 0;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const text = paragraph.join(" ").trim();
    if (text) {
      blocks.push(
        <p key={`p-${key++}`} className="text-base leading-8 text-slate-700 sm:text-[17px]">
          {inlineNodes(text)}
        </p>
      );
    }
    paragraph = [];
  };

  const flushLists = () => {
    if (bullets.length) {
      blocks.push(
        <ul key={`ul-${key++}`} className="space-y-2 pl-6 text-base leading-7 text-slate-700 marker:text-brand-teal">
          {bullets.map((item, index) => (
            <li key={`${item}-${index}`}>{inlineNodes(item)}</li>
          ))}
        </ul>
      );
      bullets = [];
    }
    if (numbered.length) {
      blocks.push(
        <ol key={`ol-${key++}`} className="list-decimal space-y-2 pl-6 text-base leading-7 text-slate-700 marker:font-bold marker:text-brand-teal">
          {numbered.map((item, index) => (
            <li key={`${item}-${index}`}>{inlineNodes(item)}</li>
          ))}
        </ol>
      );
      numbered = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushLists();
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushLists();
      blocks.push(
        <h3 key={`h3-${key++}`} className="font-display text-2xl font-semibold text-slate-900">
          {inlineNodes(line.slice(4))}
        </h3>
      );
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushLists();
      blocks.push(
        <h2 key={`h2-${key++}`} className="font-display text-3xl font-semibold text-slate-900">
          {inlineNodes(line.slice(3))}
        </h2>
      );
      continue;
    }

    if (line.startsWith("> ")) {
      flushParagraph();
      flushLists();
      blocks.push(
        <blockquote key={`q-${key++}`} className="rounded-2xl border-l-4 border-brand-aqua bg-brand-ice px-5 py-4 text-base italic leading-7 text-slate-700">
          {inlineNodes(line.slice(2))}
        </blockquote>
      );
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      if (numbered.length) flushLists();
      bullets.push(line.replace(/^[-*]\s+/, ""));
      continue;
    }

    if (/^\d+[.)]\s+/.test(line)) {
      flushParagraph();
      if (bullets.length) flushLists();
      numbered.push(line.replace(/^\d+[.)]\s+/, ""));
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  flushLists();

  return <div className="space-y-6">{blocks}</div>;
}
