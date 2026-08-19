"use client";

import { useEffect, useRef, useState } from "react";
import type { ClipboardEvent } from "react";
import {
  AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Eraser, Italic,
  Link2, List, ListOrdered, Quote, Redo2, Type, Underline, Undo2
} from "lucide-react";
import { looksLikeBlogHtml, sanitizeBlogHtml } from "@/lib/blog/content";

type Props = {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
};

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inlineMarkdown(text: string): string {
  let result = escapeHtml(text);
  result = result.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  result = result.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+)\)/g, '<a href="$2">$1</a>');
  return result;
}

function legacyContentToHtml(content: string): string {
  if (!content.trim()) return "";
  if (looksLikeBlogHtml(content)) return sanitizeBlogHtml(content);

  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  let paragraph: string[] = [];
  let bullets: string[] = [];
  let numbered: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(" ").trim())}</p>`);
    paragraph = [];
  };

  const flushLists = () => {
    if (bullets.length) {
      html.push(`<ul>${bullets.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`);
      bullets = [];
    }
    if (numbered.length) {
      html.push(`<ol>${numbered.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ol>`);
      numbered = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushParagraph();
      flushLists();
      continue;
    }
    if (line.startsWith("### ")) {
      flushParagraph(); flushLists();
      html.push(`<h3>${inlineMarkdown(line.slice(4))}</h3>`);
      continue;
    }
    if (line.startsWith("## ")) {
      flushParagraph(); flushLists();
      html.push(`<h2>${inlineMarkdown(line.slice(3))}</h2>`);
      continue;
    }
    if (line.startsWith("> ")) {
      flushParagraph(); flushLists();
      html.push(`<blockquote>${inlineMarkdown(line.slice(2))}</blockquote>`);
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
  return sanitizeBlogHtml(html.join(""));
}

const toolClass = "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-transparent px-2 text-slate-600 transition hover:border-slate-200 hover:bg-white hover:text-brand-deep active:bg-brand-ice";

export default function RichTextEditor({ value, onChange, required = false }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const lastEmittedRef = useRef<string | null>(null);
  const [wordCount, setWordCount] = useState(0);

  const emitChange = () => {
    const editor = editorRef.current;
    if (!editor) return;
    const clean = sanitizeBlogHtml(editor.innerHTML);
    const plain = editor.innerText.replace(/\s+/g, " ").trim();
    setWordCount(plain ? plain.split(" ").length : 0);
    lastEmittedRef.current = clean;
    onChange(clean);
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    if (value === lastEmittedRef.current) return;
    const normalized = legacyContentToHtml(value);
    if (editor.innerHTML !== normalized) editor.innerHTML = normalized;
    const plain = editor.innerText.replace(/\s+/g, " ").trim();
    setWordCount(plain ? plain.split(" ").length : 0);
  }, [value]);

  const run = (command: string, argument?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, argument);
    emitChange();
  };

  const formatBlock = (tag: "p" | "h2" | "h3" | "blockquote") => run("formatBlock", `<${tag}>`);

  const addLink = () => {
    const url = window.prompt("Pegue la URL del enlace (https://...):")?.trim();
    if (!url) return;
    if (!/^(https?:\/\/|mailto:|tel:)/i.test(url)) {
      window.alert("Use una URL que comience con https://, http://, mailto: o tel:.");
      return;
    }
    run("createLink", url);
  };

  const handlePaste = (event: ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const html = event.clipboardData.getData("text/html");
    const text = event.clipboardData.getData("text/plain");
    document.execCommand("insertHTML", false, html ? sanitizeBlogHtml(html) : legacyContentToHtml(text));
    window.setTimeout(emitChange, 0);
  };

  return (
    <div className="mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition focus-within:border-brand-teal focus-within:ring-4 focus-within:ring-brand-aqua/10">
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50/95 px-2.5 py-2.5 backdrop-blur">
        <select
          aria-label="Estilo de texto"
          defaultValue="p"
          onChange={(event) => formatBlock(event.target.value as "p" | "h2" | "h3" | "blockquote")}
          className="mr-1 h-9 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-bold text-slate-700 outline-none focus:border-brand-teal"
        >
          <option value="p">Párrafo</option>
          <option value="h2">Título 2</option>
          <option value="h3">Título 3</option>
          <option value="blockquote">Cita</option>
        </select>

        <span className="mx-1 h-6 w-px bg-slate-200" />
        <button type="button" title="Negrita" aria-label="Negrita" onClick={() => run("bold")} className={toolClass}><Bold size={16} /></button>
        <button type="button" title="Cursiva" aria-label="Cursiva" onClick={() => run("italic")} className={toolClass}><Italic size={16} /></button>
        <button type="button" title="Subrayado" aria-label="Subrayado" onClick={() => run("underline")} className={toolClass}><Underline size={16} /></button>

        <span className="mx-1 h-6 w-px bg-slate-200" />
        <button type="button" title="Lista con viñetas" aria-label="Lista con viñetas" onClick={() => run("insertUnorderedList")} className={toolClass}><List size={17} /></button>
        <button type="button" title="Lista numerada" aria-label="Lista numerada" onClick={() => run("insertOrderedList")} className={toolClass}><ListOrdered size={17} /></button>
        <button type="button" title="Cita" aria-label="Cita" onClick={() => formatBlock("blockquote")} className={toolClass}><Quote size={16} /></button>

        <span className="mx-1 h-6 w-px bg-slate-200" />
        <button type="button" title="Alinear a la izquierda" aria-label="Alinear a la izquierda" onClick={() => run("justifyLeft")} className={toolClass}><AlignLeft size={17} /></button>
        <button type="button" title="Centrar" aria-label="Centrar" onClick={() => run("justifyCenter")} className={toolClass}><AlignCenter size={17} /></button>
        <button type="button" title="Alinear a la derecha" aria-label="Alinear a la derecha" onClick={() => run("justifyRight")} className={toolClass}><AlignRight size={17} /></button>
        <button type="button" title="Justificar" aria-label="Justificar" onClick={() => run("justifyFull")} className={toolClass}><AlignJustify size={17} /></button>

        <span className="mx-1 h-6 w-px bg-slate-200" />
        <button type="button" title="Agregar enlace" aria-label="Agregar enlace" onClick={addLink} className={toolClass}><Link2 size={16} /></button>
        <button type="button" title="Quitar formato" aria-label="Quitar formato" onClick={() => run("removeFormat")} className={toolClass}><Eraser size={16} /></button>
        <button type="button" title="Deshacer" aria-label="Deshacer" onClick={() => run("undo")} className={toolClass}><Undo2 size={16} /></button>
        <button type="button" title="Rehacer" aria-label="Rehacer" onClick={() => run("redo")} className={toolClass}><Redo2 size={16} /></button>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        spellCheck
        role="textbox"
        aria-multiline="true"
        aria-required={required}
        data-placeholder="Escriba aquí el artículo como en Word. Use Enter para separar párrafos..."
        onInput={emitChange}
        onBlur={emitChange}
        onPaste={handlePaste}
        className="min-h-[420px] w-full px-5 py-5 text-[16px] leading-8 text-slate-700 outline-none before:pointer-events-none before:text-slate-400 before:content-[attr(data-placeholder)] [&:not(:empty)]:before:hidden [&_a]:font-semibold [&_a]:text-brand-teal [&_a]:underline [&_blockquote]:my-5 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-aqua [&_blockquote]:bg-brand-ice [&_blockquote]:px-5 [&_blockquote]:py-4 [&_h2]:mb-3 [&_h2]:mt-7 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-brand-ink [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-brand-ink [&_li]:my-1.5 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-8 [&_p]:my-3 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-8"
      />

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-white px-4 py-2.5 text-[11px] font-semibold text-slate-400">
        <span className="inline-flex items-center gap-1.5"><Type size={13} /> Editor visual · Enter crea un párrafo nuevo</span>
        <span>{wordCount} {wordCount === 1 ? "palabra" : "palabras"}</span>
      </div>
    </div>
  );
}
