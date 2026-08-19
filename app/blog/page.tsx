import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import Container from "@/components/ui/Container";
import BlogCard from "@/components/blog/BlogCard";
import { getPublishedBlogPosts } from "@/lib/blog/posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Enis Caicedo",
  description:
    "Artículos sobre derecho, bienes raíces e inversión en Panamá preparados por Enis Caicedo.",
  alternates: { canonical: "/blog" }
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts(36);

  return (
    <>
      <PageHero
        kicker="BLOG & ACTUALIDAD"
        title="Información para decidir con seguridad"
        subtitle="Contenido práctico sobre derecho, bienes raíces e inversión en Panamá, explicado con claridad y criterio profesional."
        image="/images/about-banner.jpg"
      />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="mb-8 max-w-3xl">
            <p className="kicker">ARTÍCULOS RECIENTES</p>
            <h2 className="h2 mt-3">Conocimiento que protege sus decisiones</h2>
            <p className="p mt-4">
              Consulte análisis, recomendaciones y puntos clave para comprender mejor sus opciones legales e inmobiliarias.
            </p>
          </div>

          {posts.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="surface-tint px-6 py-12 text-center sm:px-10">
              <p className="text-sm font-semibold text-brand-teal">Próximamente</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-slate-900">Estamos preparando nuevos artículos.</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
                El contenido publicado desde el panel aparecerá aquí automáticamente.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
