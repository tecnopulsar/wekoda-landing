import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Building2,
  Megaphone,
  Server
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ui-public/ContactForm";
import { DevBlogInvitePopup } from "@/components/ui-public/DevBlogInvitePopup";
import { ScrollToContactOnHash } from "@/components/ui-public/ScrollToContactOnHash";
import { HeroNetworkVisual } from "@/components/ui-public/HeroNetworkVisual";
import { PlatformShowcase } from "@/components/ui-public/PlatformShowcase";
import { SignageJourney } from "@/components/ui-public/SignageJourney";
import { DeploymentPlans } from "@/components/ui-public/DeploymentPlans";
import { verticalApps, faqItems, heroPreviewCards } from "@/lib/platform-content";
import { getAppLoginUrl, SHOW_APP_LOGIN } from "@/lib/constants";
import { SITE_NAME, absoluteUrl, getSiteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "WeKoda — Cartelería digital y plataforma IoT en tu red",
  description:
    "Cartelería pensada en dos equipos: Marketing arma campañas; IT opera la flota, publica y da soporte. Mismo panel, roles distintos, trabajo colaborativo on‑prem.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: getSiteUrl(),
    title: "WeKoda — Cartelería digital y plataforma IoT en tu red",
    description:
      "Marketing: campañas y calendario. IT: operación, publicación y soporte a Marketing. Colaboración en un solo panel en tu LAN."
  },
  twitter: {
    card: "summary_large_image",
    title: "WeKoda — Cartelería digital y plataforma IoT en tu red",
    description:
      "Marketing: campañas y calendario. IT: operación, publicación y soporte a Marketing. Colaboración en un solo panel en tu LAN.",
    images: [absoluteUrl("/opengraph-image")]
  }
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, Linux",
  url: getSiteUrl(),
  image: absoluteUrl("/opengraph-image"),
  description:
    "Plataforma IoT-over-IP on‑prem con CMS Signage: campañas, canales, entrega y proof-of-play. Players Raspberry Pi y Samsung Tizen; flota, OTA y automatización bajo Zero Trust.",
  inLanguage: "es-AR",
  featureList: [
    "Flujo colaborativo Marketing (edición de campañas) e IT (publicación y operación)",
    "CMS Signage con campañas, calendario y aprobación antes del aire",
    "Soporte de IT a Marketing: flota, entrega, proof-of-play y diagnóstico",
    "Players HDMI commodity y Samsung Tizen SSSP",
    "Gateway on‑prem y multi-tenant con auditoría",
    "Verticales IoT: espacios, sensores e IR Repeater"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
};

/**
 * Sin min-h-screen: el alto lo define el contenido y desaparece el “medio pantalla vacío”.
 * Scroll snap suave: proximity evita saltos bruscos entre bloques compactos.
 */
const sectionSnapHero =
  "relative flex w-full snap-start flex-col justify-start px-4 pb-7 pt-6 sm:px-6 sm:pb-8 sm:pt-7 md:pb-9";

const sectionSnap =
  "relative flex w-full snap-start flex-col justify-start px-4 py-8 sm:px-6 md:py-9 lg:py-10";

/** Franja de confianza */
const sectionSnapCompact =
  "relative flex w-full snap-start flex-col justify-center px-4 py-3.5 sm:px-6 md:py-4";

const securityItems = [
  "Cada dispositivo opera con sus propias credenciales (deviceId + deviceSecret).",
  "El frontend nunca accede a credenciales ni al broker.",
  "Cada comando es trazable y verificable.",
  "Aislamiento estricto por organización."
];

const heroHighlights = [
  { label: "Marketing: campañas", Icon: Megaphone },
  { label: "IT: operación y soporte", Icon: Server },
  { label: "Publicación colaborativa", Icon: Building2 },
  { label: "Proof-of-play", Icon: ShieldCheck }
];

const personaItBullets = [
  "Opera players, Gateway y red on‑prem con Zero Trust",
  "Aprueba, publica o pausa lo que Marketing prepara — sin tickets por cada TV",
  "OTA, diagnóstico, entrega y evidencia para responder al equipo comercial"
];

const personaMarketingBullets = [
  "Armá campañas, subí piezas y definí calendario sin hablar en MAC ni MQTT",
  "Pedís publicación a IT; el borrador no sale al HDMI hasta que operación lo valida",
  "Sabés qué se reprodujo y cuándo, con menos idas a sucursal o pendrives"
];

export default function LandingPage() {
  return (
    <div className="h-full min-h-0 flex-1 snap-y snap-proximity overflow-y-scroll scroll-smooth scroll-pt-16">
      <ScrollToContactOnHash />
      <section
        className={`${sectionSnapHero} overflow-hidden bg-slate-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[length:24px_24px]`}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.12),transparent_55%),radial-gradient(ellipse_at_bottom_left,hsl(var(--secondary)/0.08),transparent_50%)]"
          aria-hidden
        />
        <div className="relative mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
            <div className="text-left">
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                <span className="relative flex size-1.5">
                  <span className="hero-ping absolute inline-flex size-full rounded-full bg-primary/70" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                </span>
                CMS Signage · Marketing e IT
              </p>
              <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Campañas para Marketing.{" "}
                <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                  Operación y soporte para IT
                </span>
                , en una sola plataforma.
              </h1>
              <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
                WeKoda está pensado para trabajar en dupla: Marketing concentra campañas,
                contenido y calendario; IT mantiene la flota, publica con criterio de seguridad y
                acompaña al equipo comercial con entrega y evidencia en pantalla.
              </p>

              <div className="mt-5 grid max-w-2xl gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    Para Marketing
                  </p>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">
                    Campañas, biblioteca y fechas de vigencia — sin inventario de televisores ni
                    otra herramienta aparte.
                  </p>
                </div>
                <div className="rounded-xl border border-border/70 bg-background/80 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                    Para IT
                  </p>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">
                    Players, publicación, prioridades y diagnóstico — optimizando el soporte al
                    personal de Marketing.
                  </p>
                </div>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2 md:mt-6">
                {heroHighlights.map(({ label, Icon }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm"
                  >
                    <Icon className="size-3.5 text-primary" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3 md:mt-7">
                {SHOW_APP_LOGIN ? (
                  <Button
                    asChild
                    size="lg"
                    className="group bg-primary text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40"
                  >
                    <Link href={getAppLoginUrl()} data-action="start-login" data-entity="session">
                      Empezar ahora
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    asChild
                    size="lg"
                    className="group bg-primary text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40"
                  >
                    <Link href="#contacto" data-action="go-contact" data-entity="lead">
                      Solicitar información
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </Link>
                  </Button>
                )}
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary/20 text-primary hover:bg-primary/10"
                >
                  <Link
                    href="/soluciones/digital-signage"
                    data-action="open-signage-solution"
                    data-entity="digital-signage"
                  >
                    Ver cartelería
                  </Link>
                </Button>
              </div>

              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
                Colaboración real entre dirección comercial y sistemas — en sucursales y edificios.
              </p>
            </div>

            <HeroNetworkVisual />
          </div>

          <div className="mt-6 md:mt-10">
            <div className="mb-3 flex items-end justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Capturas reales del panel
              </p>
              <Link
                href="#carteleria"
                data-action="view-signage-previews"
                data-entity="digital-signage"
                className="hidden text-xs font-medium text-primary hover:underline sm:inline"
              >
                Ver el recorrido de campaña
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              {heroPreviewCards.map(({ id, label, caption, image, imageAlt }) => (
                <Link
                  key={id}
                  href="#plataforma"
                  data-action="open-signage-preview"
                  data-entity="digital-signage"
                  data-row-id={id}
                  className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width: 640px) 33vw, 100vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
                        {label}
                      </p>
                      <p className="mt-0.5 text-sm font-medium text-white">{caption}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionSnapCompact} border-y bg-muted/20`}>
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-medium text-muted-foreground">
          <p>✔ Marketing arma campañas</p>
          <p>✔ IT publica y da soporte</p>
          <p>✔ Un panel, trabajo en conjunto</p>
        </div>
      </section>

      <section id="it-marketing" className={`${sectionSnap} border-b border-border/60 bg-white`}>
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Dualidad Marketing · IT
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              El mismo programa de cartelería, con tareas claras para cada equipo.
            </h2>
            <p className="mt-3 text-base text-muted-foreground md:text-lg">
              No es “Marketing contra IT”: es un flujo colaborativo. Marketing avanza en campañas y
              piezas con permisos acotados; IT se enfoca en operatividad — red, players,
              publicación, prioridades y soporte cuando hace falta salir al aire o corregir una
              sucursal. Menos fricción, menos reprocesos, más previsibilidad para ambos.
            </p>
          </div>
          <div className="mt-8 grid gap-5 md:mt-10 lg:grid-cols-2 lg:gap-6">
            <article className="rounded-2xl border border-border/70 bg-slate-50/80 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Server className="size-5" aria-hidden />
                </span>
                <h3 className="text-lg font-semibold text-foreground">IT — operación y soporte</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Infraestructura, flota y publicación: el brazo técnico que hace viable el trabajo de
                Marketing, sin exponer MQTT ni multiplicar herramientas.
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {personaItBullets.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant="outline"
                className="mt-5 rounded-full border-primary/30 text-primary"
              >
                <Link href="#contacto" data-action="select-persona-it" data-entity="lead">
                  Demo técnica
                </Link>
              </Button>
            </article>
            <article className="rounded-2xl border border-primary/25 bg-primary/5 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Megaphone className="size-5" aria-hidden />
                </span>
                <h3 className="text-lg font-semibold text-foreground">Marketing — campañas</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                El foco comercial: mensaje, calendario y sucursales correctas — con IT al lado para
                publicar y demostrar que la pieza se vio.
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {personaMarketingBullets.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-5 rounded-full">
                <Link
                  href="/soluciones/digital-signage"
                  data-action="select-persona-marketing"
                  data-entity="digital-signage"
                >
                  Ver cómo opera una campaña
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </article>
          </div>
        </div>
      </section>

      <section id="carteleria" className={`${sectionSnap} bg-slate-50/80`}>
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Flujo colaborativo
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              Cuatro pasos que Marketing e IT recorren juntos.
            </h2>
            <p className="mt-3 text-base text-muted-foreground md:text-lg">
              Marketing aporta contenido y campaña; IT define canales, publica y confirma entrega.
              Así se optimiza el trabajo en conjunto, de la biblioteca a la evidencia en pantalla.
            </p>
          </div>
          <div className="mt-8 md:mt-10">
            <SignageJourney />
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="rounded-full border-primary/30 text-primary">
              <Link
                href="/soluciones/digital-signage"
                data-action="open-signage-solution"
                data-entity="digital-signage"
              >
                Explorar solución Digital Signage
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="plataforma" className={`${sectionSnap} bg-white`}>
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Así se ve por dentro
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              Cartelería, flota y gobierno en el mismo panel.
            </h2>
            <p className="mt-3 text-base text-muted-foreground md:text-lg">
              Capturas reales: campañas y canales primero; después dispositivos, operaciones,
              espacios y el resto de verticales IoT.
            </p>
          </div>

          <div className="mt-8 md:mt-10">
            <PlatformShowcase />
          </div>
        </div>
      </section>

      <section id="domotica-iot" className={`${sectionSnap} border-y border-border/60 bg-slate-50/80`}>
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Verticales integradas
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              Soluciones listas, no un lienzo en blanco.
            </h2>
            <p className="mt-3 text-base text-muted-foreground md:text-lg">
              Cada vertical trae su hardware de referencia, su firmware y su consola dentro de la
              misma plataforma. Sumar una nueva no rompe las que ya funcionan.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
            {verticalApps.map(({ id, name, hardware, description, available, featured, href, Icon }) => {
              const card = (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        available
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {available ? "Disponible" : "En desarrollo"}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{name}</h3>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground/80">{hardware}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
                  {href ? (
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Ver solución
                      <ArrowRight className="size-4" aria-hidden />
                    </span>
                  ) : null}
                </>
              );

              const cardClass = [
                "flex h-full flex-col rounded-2xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md",
                featured
                  ? "border-primary/40 bg-primary/[0.03] ring-1 ring-primary/20"
                  : "border-border/70"
              ].join(" ");

              return href ? (
                <Link
                  key={id}
                  href={href}
                  data-action="open-vertical"
                  data-entity="vertical"
                  data-row-id={id}
                  className={cardClass}
                >
                  {card}
                </Link>
              ) : (
                <article key={id} className={cardClass}>
                  {card}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`${sectionSnap} border-t border-border/60 bg-white`}>
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              También en el edificio
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              IR Repeater para salas que aún usan control remoto.
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Captura, biblioteca, mando virtual y automatización con luces y agendas. Vertical
              diferenciadora en oficinas y hoteles; convive con Signage en la misma plataforma.
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0 rounded-full border-primary/30 text-primary">
            <Link
              href="/soluciones/ir-repeater"
              data-action="open-ir-repeater-page"
              data-entity="ir-repeater"
            >
              Ver WeKoda IR Repeater
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>

      <section className={`${sectionSnap} bg-slate-950 text-slate-50`}>
        <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-50 md:text-4xl lg:text-5xl">
              Seguridad desde el diseño.
            </h2>
            <p className="mt-3 text-lg text-slate-400 md:text-xl">Modelo Zero Trust end-to-end.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {securityItems.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm md:p-5"
              >
                <ShieldCheck className="size-5 text-secondary" aria-hidden />
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="arquitectura" className={`${sectionSnap} border-y border-blue-100 bg-blue-50/50`}>
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
            <div className="space-y-4">
              <p className="font-mono text-sm text-foreground">
                [ Dispositivo Edge ] -&gt; [ Backend / Gateway ] -&gt; [ UI Plataforma ]
              </p>
              <p className="text-lg font-medium text-foreground">
                El backend es el gateway seguro entre dispositivos y usuarios: un punto único de
                control para toda la infraestructura.
              </p>
              <p className="text-lg font-medium text-foreground">
                Sin conexiones directas entre cliente y broker. Sin exposición de credenciales.
              </p>
              <p className="text-base text-muted-foreground">
                Sobre esa base se apoya todo el panel: operación de flota, control por espacios,
                automatización, aplicaciones verticales y gobierno de la organización.
              </p>
              <Button
                asChild
                variant="outline"
                className="mt-2 border-primary/30 text-primary hover:bg-primary/10"
              >
                <Link href="/devblog" data-action="nav-devblog-from-landing" data-entity="devblog">
                  Leer cómo está construida
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-2xl border border-blue-100/80 bg-white shadow-lg">
              <Image
                src="/images/platform/sidebar/sidebar-1.png"
                alt="Navegación de la plataforma con operación, control, automatización y aplicaciones"
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 25vw, 60vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="modalidades" className={sectionSnap}>
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Cómo empezar
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              Tres formas de tener WeKoda funcionando.
            </h2>
            <p className="mt-3 text-base text-muted-foreground md:text-lg">
              Gateway o licencia para la plataforma completa; kit de arranque para pilotos de
              cartelería o IoT en una sucursal.
            </p>
          </div>

          <div className="mt-10 md:mt-12">
            <DeploymentPlans />
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Preparamos una propuesta a medida según el tamaño de la flota y el alcance de la
            integración.
          </p>
        </div>
      </section>

      <section id="preguntas" className={`${sectionSnap} border-t border-border/60 bg-white`}>
        <div className="mx-auto w-full max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Preguntas frecuentes
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              Lo que suelen preguntarnos antes de empezar.
            </h2>
          </div>

          <div className="mt-8 divide-y divide-border/60 border-y border-border/60 md:mt-10">
            {faqItems.map(({ question, answer }) => (
              <details key={question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-foreground transition-colors hover:text-primary md:text-lg">
                  <h3>{question}</h3>
                  <ChevronDown
                    className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className={`${sectionSnap} border-t border-border/60 bg-muted/30`}>
        <div className="mx-auto grid w-full max-w-7xl items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="text-left">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Hablemos de tu infraestructura.
            </h2>
            <p className="mt-3 text-base text-muted-foreground md:text-lg">
              Contanos qué querés automatizar. Nuestro equipo de ingeniería te asesorará sobre cómo
              We Koda puede centralizar y asegurar tus operaciones.
            </p>
            <div className="mt-5 space-y-2.5 md:mt-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                <span>Consultoría técnica sin compromiso</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                <span>Demos personalizadas de la arquitectura</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                <span>Presupuesto de kit, gateway o licencia según tu caso</span>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border/50 bg-background p-5 shadow-xl md:p-6">
            <ContactForm />
          </div>
        </div>
      </section>

      <DevBlogInvitePopup />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([softwareSchema, faqSchema]) }}
      />
    </div>
  );
}
