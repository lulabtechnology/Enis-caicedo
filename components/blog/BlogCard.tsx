import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import type { BlogPost } from "@/lib/blog/types";

function formatDate(value: string | null): string {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("es-PA", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(value));
  } catch {
    return "";
  }
}

export default function BlogCard({ post }: { post: BlogPost }) {
  const image = post.cover_url || "/images/about-banner.webp";

  return (
    <article className="group overflow-hidden rounded-[28px] border border-brand-deep/10 bg-white/90 shadow-soft transition duration-500 hover:-translate-y-2 hover:border-brand-aqua/25 hover:shadow-[0_34px_90px_rgba(7,22,28,.14)]">
      <Link href={`/blog/${post.slug}`} className="block no-underline">
        <div className="relative aspect-[16/11] overflow-hidden bg-brand-ice">
          <Image src={image} alt={`Portada de ${post.title}`} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.055]" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/[.38] via-transparent to-transparent" />
          <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-brand-ink/[.45] text-white backdrop-blur transition duration-300 group-hover:rotate-12 group-hover:bg-brand-teal"><ArrowUpRight size={17} /></div>
        </div>

        <div className="p-6 sm:p-7">
          <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.12em] text-slate-400">
            <CalendarDays size={14} className="text-brand-teal" /> {formatDate(post.published_at)}
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-[.98] text-brand-ink transition group-hover:text-brand-teal">{post.title}</h2>
          <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>
          <div className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.1em] text-brand-teal">Leer artículo <ArrowUpRight size={15} /></div>
        </div>
      </Link>
    </article>
  );
}
