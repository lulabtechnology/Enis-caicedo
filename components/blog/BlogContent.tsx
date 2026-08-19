import type { ReactNode } from "react";
import { looksLikeBlogHtml, sanitizeBlogHtml } from "@/lib/blog/content";

function safeLink(url: string): string | null {
  const trimmed = url.trim();
  if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmed)) return trimmed;
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
        nodes.push(<a key={`link-${key++}`} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="font-semibold text-brand-teal underline">{linkMatch[1]}</a>);
      } else nodes.push(token);
    }
    cursor = match.index + token.length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

function LegacyBlogContent({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let bullets: string[] = [];
  let numbered: string[] = [];
  let key = 0;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const text = paragraph.join(" ").trim();
    if (text) blocks.push(<p key={`p-${key++}`} className="text-base leading-8 text-slate-700 sm:text-[17px]">{inlineNodes(text)}</p>);
    paragraph = [];
  };

  const flushLists = () => {
    if (bullets.length) {
      blocks.push(<ul key={`ul-${key++}`} className="list-disc space-y-2 pl-8 text-base leading-7 text-slate-700 marker:text-brand-teal">{bullets.map((item, index) => <li key={`${item}-${index}`}>{inlineNodes(item)}</li>)}</ul>);
      bullets = [];
    }
    if (numbered.length) {
      blocks.push(<ol key={`ol-${key++}`} className="list-decimal space-y-2 pl-8 text-base leading-7 text-slate-700 marker:font-bold marker:text-brand-teal">{numbered.map((item, index) => <li key={`${item}-${index}`}>{inlineNodes(item)}</li>)}</ol>);
      numbered = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) { flushParagraph(); flushLists(); continue; }
    if (line.startsWith("### ")) { flushParagraph(); flushLists(); blocks.push(<h3 key={`h3-${key++}`} className="font-display text-2xl font-semibold text-slate-900">{inlineNodes(line.slice(4))}</h3>); continue; }
    if (line.startsWith("## ")) { flushParagraph(); flushLists(); blocks.push(<h2 key={`h2-${key++}`} className="font-display text-3xl font-semibold text-slate-900">{inlineNodes(line.slice(3))}</h2>); continue; }
    if (line.startsWith("> ")) { flushParagraph(); flushLists(); blocks.push(<blockquote key={`q-${key++}`} className="rounded-2xl border-l-4 border-brand-aqua bg-brand-ice px-5 py-4 text-base italic leading-7 text-slate-700">{inlineNodes(line.slice(2))}</blockquote>); continue; }
    if (/^[-*]\s+/.test(line)) { flushParagraph(); if (numbered.length) flushLists(); bullets.push(line.replace(/^[-*]\s+/, "")); continue; }
    if (/^\d+[.)]\s+/.test(line)) { flushParagraph(); if (bullets.length) flushLists(); numbered.push(line.replace(/^\d+[.)]\s+/, "")); continue; }
    paragraph.push(line);
  }

  flushParagraph(); flushLists();
  return <div className="space-y-6">{blocks}</div>;
}

export default function BlogContent({ content }: { content: string }) {
  if (!looksLikeBlogHtml(content)) return <LegacyBlogContent content={content} />;
  const clean = sanitizeBlogHtml(content);

  return (
    <div
      className="blog-rich-content text-base leading-8 text-slate-700 sm:text-[17px] [&_a]:font-semibold [&_a]:text-brand-teal [&_a]:underline [&_blockquote]:my-7 [&_blockquote]:rounded-r-2xl [&_blockquote]:border-l-4 [&_blockquote]:border-brand-aqua [&_blockquote]:bg-brand-ice [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:italic [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-slate-900 [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:text-slate-900 [&_li]:my-2 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-9 [&_p]:my-5 [&_strong]:font-bold [&_ul]:my-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-9"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
