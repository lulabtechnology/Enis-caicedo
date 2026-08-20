import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import BlogCard from "@/components/blog/BlogCard";
import { getPublishedBlogPosts } from "@/lib/blog/posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Enis Caicedo",
  description: "Artículos sobre derecho, bienes raíces e inversión en Panamá preparados por Enis Caicedo.",
  alternates: { canonical: "/blog" }
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts(36);

  return (
    <>
      <PageHero
        kicker="Blog & actualidad"
        title="Información para decidir con seguridad"
        subtitle="Contenido práctico sobre derecho e inversiones inmobiliarias bicontinentales, explicado con claridad y criterio profesional."
        image="/images/phase1/editorial-desk.webp"
      />

      <section className="editorial-section py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7" data-reveal>
              <p className="kicker">ARTÍCULOS RECIENTES</p>
              <h2 className="display-heading mt-5">Conocimiento que protege sus decisiones.</h2>
            </div>
            <div className="lg:col-span-5" data-reveal>
              <p className="editorial-lead">Análisis, recomendaciones y puntos clave para comprender mejor opciones legales, patrimoniales e inmobiliarias.</p>
            </div>
          </div>

          {posts.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3" data-stagger>
              {posts.map((post) => <BlogCard key={post.id} post={post} />)}
            </div>
          ) : (
            <div className="surface-tint mt-12 px-6 py-14 text-center sm:px-10" data-reveal>
              <p className="kicker">PRÓXIMAMENTE</p>
              <h2 className="mt-4 font-display text-4xl font-semibold text-brand-ink">Estamos preparando nuevos artículos.</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">El contenido publicado desde el panel aparecerá aquí automáticamente.</p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
