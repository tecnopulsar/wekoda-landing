import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllPosts, getPostBySlug, getPostSlugs, formatPostDate } from "@/lib/devblog";
import { ORGANIZATION, SITE_NAME, absoluteUrl } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post no encontrado" };

  const url = absoluteUrl(`/devblog/${post.slug}`);

  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    alternates: { canonical: `/devblog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      tags: post.tags,
      authors: [ORGANIZATION.legalName]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary
    }
  };
}

export default async function DevBlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const previousPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    inLanguage: "es-AR",
    mainEntityOfPage: absoluteUrl(`/devblog/${post.slug}`),
    author: {
      "@type": "Organization",
      name: ORGANIZATION.legalName
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: absoluteUrl("/")
    }
  };

  return (
    <div className="flex w-full flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="mx-auto w-full max-w-3xl px-4 pb-16 pt-10 sm:px-6 md:pt-14">
        <Link
          href="/devblog"
          data-action="back-to-devblog"
          data-entity="devblog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Volver al DevBlog
        </Link>

        <header className="mt-6 border-b border-border/60 pb-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" aria-hidden />
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden />
              {post.readingMinutes} min de lectura
            </span>
          </div>
          <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          {post.summary ? (
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">{post.summary}</p>
          ) : null}
          {post.tags.length > 0 ? (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Tag className="size-3.5 text-muted-foreground" aria-hidden />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </header>

        <div
          className="devblog-prose mt-8"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <div className="mt-12 rounded-2xl border border-border/60 bg-slate-50 p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
            ¿Te interesa lo que hacemos?
          </p>
          <h2 className="mt-2 text-xl font-bold text-foreground md:text-2xl">
            Aplicá esta arquitectura a tu proyecto.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            WeKoda IoT te da la plataforma; nuestro equipo te acompaña en la integración.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button
              asChild
              className="rounded-full bg-primary text-white hover:bg-primary/90"
            >
              <Link
                href="/#contacto"
                data-action="go-contact-from-post"
                data-entity="lead"
                data-row-id={post.slug}
              >
                Contactar al equipo
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full"
            >
              <Link
                href="/devblog"
                data-action="view-more-posts"
                data-entity="devblog"
              >
                Ver más posts
              </Link>
            </Button>
          </div>
        </div>

        {(previousPost || nextPost) && (
          <nav className="mt-10 grid gap-4 border-t border-border/60 pt-8 sm:grid-cols-2">
            {previousPost ? (
              <Link
                href={`/devblog/${previousPost.slug}`}
                data-action="open-post"
                data-entity="devblog-post"
                data-row-id={previousPost.slug}
                className="group rounded-2xl border border-border/60 bg-white p-4 transition-colors hover:border-primary/40"
              >
                <p className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <ArrowLeft className="size-3.5" aria-hidden />
                  Post anterior
                </p>
                <p className="mt-1.5 text-sm font-semibold text-foreground group-hover:text-primary">
                  {previousPost.title}
                </p>
              </Link>
            ) : (
              <span aria-hidden />
            )}
            {nextPost ? (
              <Link
                href={`/devblog/${nextPost.slug}`}
                data-action="open-post"
                data-entity="devblog-post"
                data-row-id={nextPost.slug}
                className="group rounded-2xl border border-border/60 bg-white p-4 text-right transition-colors hover:border-primary/40"
              >
                <p className="inline-flex w-full items-center justify-end gap-1.5 text-xs font-medium text-muted-foreground">
                  Post siguiente
                  <ArrowRight className="size-3.5" aria-hidden />
                </p>
                <p className="mt-1.5 text-sm font-semibold text-foreground group-hover:text-primary">
                  {nextPost.title}
                </p>
              </Link>
            ) : (
              <span aria-hidden />
            )}
          </nav>
        )}
      </article>
    </div>
  );
}
