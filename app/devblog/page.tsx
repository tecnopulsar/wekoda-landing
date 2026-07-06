import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Cpu, ShieldCheck, Radio, Server, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllPosts, formatPostDate } from "@/lib/devblog";

export const metadata: Metadata = {
  title: "DevBlog — WeKoda IoT",
  description:
    "Ingeniería, seguridad y arquitectura detrás de WeKoda IoT. Contenido técnico para desarrolladores, CTOs y entusiastas de la automatización."
};

const audienceHooks = [
  {
    icon: Cpu,
    title: "Para desarrolladores e integradores",
    body: "Contratos MQTT, device shadow, capabilities y firmware ESP32 explicados sin humo."
  },
  {
    icon: ShieldCheck,
    title: "Para CTOs y líderes técnicos",
    body: "Decisiones de arquitectura Zero Trust, multi-tenant y edge que se sostienen en producción."
  },
  {
    icon: Radio,
    title: "Para entusiastas de domótica e IoT",
    body: "Cómo se resuelven de verdad los problemas reales: infrarrojo, telemetría y control remoto."
  }
];

export default function DevBlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="flex w-full flex-1 flex-col">
      <section className="relative overflow-hidden border-b border-border/60 bg-slate-950 text-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:32px_32px]" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-secondary">
              <Sparkles className="size-3.5" aria-hidden />
              DevBlog · Ingeniería WeKoda
            </p>
            <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              La plataforma IoT que soluciona los problemas reales de automatización.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-300 md:text-xl">
              Cómo pensamos, diseñamos y desplegamos infraestructura de dispositivos conectados.
              Escrito por los ingenieros que la construyen, sin marketing vacío.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 md:mt-8">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-primary text-white hover:bg-primary/90"
              >
                <Link
                  href="#posts"
                  data-action="view-posts"
                  data-entity="devblog"
                >
                  Leer los posts
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link
                  href="/#contacto"
                  data-action="go-contact-from-devblog"
                  data-entity="lead"
                >
                  Hablar con ingeniería
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 md:py-12">
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {audienceHooks.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm md:p-6"
              >
                <div className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground md:text-lg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="posts" className="bg-slate-50/70">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
                Últimas publicaciones
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
                Cada post ataca un problema concreto de una plataforma IoT en producción.
              </p>
            </div>
            <div className="hidden shrink-0 items-center gap-2 rounded-full border border-border/60 bg-white px-3 py-1.5 text-xs text-muted-foreground md:inline-flex">
              <Server className="size-3.5" aria-hidden />
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </div>
          </div>

          {posts.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-border/60 bg-white p-10 text-center text-muted-foreground">
              Todavía no hay publicaciones. Volvé pronto.
            </div>
          ) : (
            <ul className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug} className="h-full">
                  <Link
                    href={`/devblog/${post.slug}`}
                    data-action="open-post"
                    data-entity="devblog-post"
                    data-row-id={post.slug}
                    className="group flex h-full flex-col rounded-2xl border border-border/70 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md md:p-6"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                      <span aria-hidden>·</span>
                      <span>{post.readingMinutes} min de lectura</span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-foreground group-hover:text-primary md:text-xl">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {post.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Leer post
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="border-t border-border/60 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <div className="rounded-3xl bg-slate-900 p-8 text-center text-white md:p-12">
            <h2 className="text-balance text-2xl font-bold md:text-3xl lg:text-4xl">
              ¿Automatización o domótica compleja en tu roadmap?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
              WeKoda IoT convierte dispositivos dispersos en infraestructura operable. Contanos tu
              caso y te mostramos cómo lo resolvemos.
            </p>
            <Button
              asChild
              className="mt-6 h-12 rounded-full bg-primary px-8 text-base text-white hover:bg-primary/90 md:mt-8 md:h-14 md:px-10 md:text-lg"
            >
              <Link
                href="/#contacto"
                data-action="go-contact-from-devblog-cta"
                data-entity="lead"
              >
                Hablemos de tu proyecto
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
