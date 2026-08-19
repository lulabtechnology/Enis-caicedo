import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import type { BlogPost } from "@/lib/blog/types";

function formatDate(value: string | null): string {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("es-PA", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).format(new Date(value));
  } catch {
    return "";
  }
}

export default function BlogCard({ post }: { post: BlogPost }) {
  const image = post.cover_url || "/images/about-banner.jpg";

  return (
    <article className="group overflow-hidden rounded-[var(--radius)] border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1">
      <Link href={`/blog/${post.slug}`} className="block no-underline">
        <div className="relative aspect-[16/10] overflow-hidden bg-brand-ice">
          <Image
            src={image}
            alt={`Portada de ${post.title}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/20 via-transparent to-transparent" />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <CalendarDays size={14} className="text-brand-teal" />
            {formatDate(post.published_at)}
          </div>
          <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-slate-900 transition group-hover:text-brand-teal">
            {post.title}
          </h2>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>
          <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-teal">
            Leer artículo <ArrowUpRight size={16} />
          </div>
        </div>
      </Link>
    </article>
  );
}
