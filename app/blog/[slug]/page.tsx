import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays } from "lucide-react";
import BlogContent from "@/components/blog/BlogContent";
import Container from "@/components/ui/Container";
import { getPublishedBlogPostBySlug } from "@/lib/blog/posts";
import { publicSiteUrl } from "@/lib/blog/config";

export const dynamic = "force-dynamic";

function formatDate(value: string | null): string {
  if (!value) return "";
  return new Intl.DateTimeFormat("es-PA", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(value));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPublishedBlogPostBySlug(params.slug);
  if (!post) return { title: "Artículo no encontrado | Enis Caicedo" };

  const url = `${publicSiteUrl()}/blog/${post.slug}`;
  const image = post.cover_url || `${publicSiteUrl()}/images/about-banner.webp`;

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

  const cover = post.cover_url || "/images/about-banner.webp";

  return (
    <article>
      <section className="relative isolate -mt-[88px] overflow-hidden bg-brand-ink pt-[88px] sm:min-h-[70svh]">
        <div className="absolute inset-0">
          <Image src={cover} alt={`Portada de ${post.title}`} fill priority sizes="100vw" className="object-cover" data-parallax />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,28,32,.97),rgba(5,46,50,.82)_54%,rgba(5,28,32,.52)),linear-gradient(180deg,rgba(7,22,28,.16),rgba(7,22,28,.82))]" />
        <div className="hero-grid absolute inset-0 opacity-25" />

        <Container>
          <div className="relative flex min-h-[62svh] items-end py-12 sm:py-16 lg:py-20">
            <div className="max-w-5xl">
              <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.12em] text-white/65 no-underline hover:text-brand-aqua" data-hero-line>
                <ArrowLeft size={15} /> Volver al blog
              </Link>
              <p className="mt-8 text-xs font-extrabold uppercase tracking-[.2em] text-brand-aqua" data-hero-line>Blog Enis Caicedo</p>
              <h1 className="mt-4 max-w-5xl font-display text-[clamp(3.7rem,8vw,7.8rem)] font-semibold leading-[.84] tracking-[-.045em] text-white" data-hero-line>{post.title}</h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 sm:text-lg" data-hero-line>{post.excerpt}</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[.1em] text-white/48" data-hero-line><CalendarDays size={15} className="text-brand-aqua" /> {formatDate(post.published_at)}</div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl" data-reveal>
            <BlogContent content={post.content} />

            <div className="mt-14 rounded-[30px] border border-brand-aqua/20 bg-[linear-gradient(135deg,rgba(18,182,182,.10),rgba(255,255,255,.94))] p-7 shadow-soft sm:p-9">
              <p className="kicker">ORIENTACIÓN PROFESIONAL</p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-none text-brand-ink">Converse con Enis Caicedo sobre su caso o inversión.</h2>
              <Link href="/contacto" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-deep px-6 py-3 text-sm font-bold text-white no-underline transition hover:-translate-y-0.5 hover:bg-brand-teal">
                Ir a contacto <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </article>
  );
}
