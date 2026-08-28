import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ShieldCheck, CheckCircle2, ArrowRight, ChevronDown, Cpu, Network, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ui-public/ContactForm";
import { DevBlogInvitePopup } from "@/components/ui-public/DevBlogInvitePopup";
import { ScrollToContactOnHash } from "@/components/ui-public/ScrollToContactOnHash";
import { HeroNetworkVisual } from "@/components/ui-public/HeroNetworkVisual";
import { PlatformShowcase } from "@/components/ui-public/PlatformShowcase";
import { IrJourney } from "@/components/ui-public/IrJourney";
import { DeploymentPlans } from "@/components/ui-public/DeploymentPlans";
import { verticalApps, faqItems, heroPreviewCards } from "@/lib/platform-content";
import { getAppLoginUrl, SHOW_APP_LOGIN } from "@/lib/constants";
import { SITE_NAME, absoluteUrl, getSiteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "WeKoda — Plataforma IoT para gestionar y automatizar dispositivos",
  description:
    "Gestioná tu flota de dispositivos IoT desde un solo panel: inventario en vivo, actualización OTA remota, control por espacios, mandos infrarrojos sobre IP y seguridad Zero Trust.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: getSiteUrl(),
    title: "WeKoda — Plataforma IoT para gestionar y automatizar dispositivos",
    description:
      "Inventario de flota, OTA remoto, control por espacios y automatización sobre un modelo de seguridad Zero Trust."
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
    "Plataforma de gestión de dispositivos IoT con inventario de flota, actualización OTA remota, control por espacios, automatización por agendas y seguridad Zero Trust.",
  inLanguage: "es-AR",
  featureList: [
    "Inventario de flota con capacidades autodescubiertas",
    "Actualización de firmware OTA con historial",
    "Control por espacios y escenas",
    "Mandos virtuales infrarrojos sobre IP",
    "Automatización por agendas y reglas",
    "Multi-tenant con roles y auditoría"
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
  { label: "Protocolo MQTT sobre TLS", Icon: Network },
  { label: "Firmware ESP32 y edge Linux", Icon: Cpu },
  { label: "Telemetría en tiempo real", Icon: Radio }
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
                Plataforma IoT over IP
              </p>
              <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Operá dispositivos como{" "}
                <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                  infraestructura
                </span>
                , no como hardware.
              </h1>
              <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
                Cada sensor, actuador o gateway se convierte en un nodo direccionable sobre IP.
                Gestioná, asegurá y escalá tu flota con control total y un modelo de seguridad Zero
                Trust.
              </p>

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
                  <Link href="#plataforma" data-action="view-platform" data-entity="platform">
                    Ver la plataforma
                  </Link>
                </Button>
              </div>

              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
                Para equipos técnicos, integradores y empresas que operan infraestructura en el edge.
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
                href="#plataforma"
                data-action="view-platform-previews"
                data-entity="platform"
                className="hidden text-xs font-medium text-primary hover:underline sm:inline"
              >
                Ver más pantallas
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              {heroPreviewCards.map(({ id, label, caption, image, imageAlt }) => (
                <Link
                  key={id}
                  href="#plataforma"
                  data-action="open-platform-preview"
                  data-entity="platform-section"
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
          <p>✔ Diseñado para producción</p>
          <p>✔ Arquitectura probada en campo</p>
          <p>✔ Multi-tenant listo para escalar</p>
        </div>
      </section>

      <section id="plataforma" className={`${sectionSnap} bg-white`}>
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Así se ve por dentro
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              No es una maqueta: es el panel que usamos todos los días.
            </h2>
            <p className="mt-3 text-base text-muted-foreground md:text-lg">
              Recorré las pantallas reales de la plataforma y mirá cómo se administra una flota de
              principio a fin.
            </p>
          </div>

          <div className="mt-8 md:mt-10">
            <PlatformShowcase />
          </div>
        </div>
      </section>

      <section className={`${sectionSnap} border-y border-border/60 bg-slate-50/80`}>
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
            {verticalApps.map(({ id, name, hardware, description, available, Icon }) => (
              <article
                key={id}
                className="flex flex-col rounded-2xl border border-border/70 bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionSnap}>
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Caso completo
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              Del control remoto a la automatización, en cuatro pasos.
            </h2>
            <p className="mt-3 text-base text-muted-foreground md:text-lg">
              Así se integra un televisor, un aire acondicionado o un decodificador que solo entiende
              infrarrojo, y termina respondiendo a una agenda.
            </p>
          </div>

          <div className="mt-8 md:mt-10">
            <IrJourney />
          </div>
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
              Desde un kit para probar en una sala hasta la licencia para desplegar la plataforma en
              tu propia infraestructura.
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
