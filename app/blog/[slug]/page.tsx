import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import BlogContent from "@/components/blog/BlogContent";
import Container from "@/components/ui/Container";
import { getPublishedBlogPostBySlug } from "@/lib/blog/posts";
import { publicSiteUrl } from "@/lib/blog/config";

export const dynamic = "force-dynamic";

function formatDate(value: string | null): string {
  if (!value) return "";
  return new Intl.DateTimeFormat("es-PA", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(value));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPublishedBlogPostBySlug(params.slug);
  if (!post) return { title: "Artículo no encontrado | Enis Caicedo" };

  const url = `${publicSiteUrl()}/blog/${post.slug}`;
  const image = post.cover_url || `${publicSiteUrl()}/images/about-banner.jpg`;

  return {
    title: `${post.title} | Enis Caicedo`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      publishedTime: post.published_at || undefined,
      images: [{ url: image }]
    }
  };
}

export default async function BlogArticlePage({ params }: { params: { slug: string } }) {
  const post = await getPublishedBlogPostBySlug(params.slug);
  if (!post) notFound();

  const cover = post.cover_url || "/images/about-banner.jpg";

  return (
    <article className="pb-8">
      <section className="border-b border-slate-200 bg-white/75 py-10 sm:py-14">
        <Container>
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-teal no-underline hover:text-brand-deep">
            <ArrowLeft size={16} /> Volver al blog
          </Link>
          <div className="mt-6 max-w-4xl">
            <p className="kicker">BLOG ENIS CAICEDO</p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">{post.excerpt}</p>
            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-slate-500">
              <CalendarDays size={16} className="text-brand-teal" /> {formatDate(post.published_at)}
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="relative -mt-1 aspect-[16/8] overflow-hidden rounded-b-[28px] border-x border-b border-slate-200 bg-brand-ice shadow-soft sm:aspect-[16/7]">
          <Image src={cover} alt={`Portada de ${post.title}`} fill priority sizes="100vw" className="object-cover" />
        </div>

        <div className="mx-auto max-w-3xl py-10 sm:py-14">
          <BlogContent content={post.content} />
          <div className="mt-12 rounded-[var(--radius)] border border-brand-aqua/20 bg-brand-ice p-6 sm:p-8">
            <p className="text-sm font-bold text-brand-teal">¿Necesita orientación profesional?</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-slate-900">Converse con Enis Caicedo sobre su caso o inversión.</h2>
            <Link href="/contacto" className="mt-5 inline-flex rounded-full bg-brand-deep px-5 py-3 text-sm font-semibold text-white no-underline transition hover:opacity-90">
              Ir a contacto
            </Link>
          </div>
        </div>
      </Container>
    </article>
  );
}
