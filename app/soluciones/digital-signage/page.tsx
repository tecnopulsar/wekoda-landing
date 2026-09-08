import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  CalendarClock,
  HardDrive,
  MonitorPlay,
  ShieldCheck,
  Clapperboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DIGITAL_SIGNAGE_CONTACT_HREF,
  DIGITAL_SIGNAGE_PATH,
  digitalSignageImages
} from "@/lib/digital-signage";
import { SITE_NAME, absoluteUrl } from "@/lib/seo";

const title = "WeKoda Digital Signage — cartelería sobre Raspberry Pi";
const description =
  "Players HDMI en Raspberry Pi 4B gobernados desde WeKoda: biblioteca, playlists, agendas, cache local y proof-of-play, con el mismo modelo Zero Trust que el resto de la flota.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "digital signage",
    "cartelería digital",
    "Raspberry Pi signage",
    "proof of play",
    "playlist IoT",
    "WeKoda signage"
  ],
  alternates: { canonical: DIGITAL_SIGNAGE_PATH },
  openGraph: {
    type: "website",
    url: absoluteUrl(DIGITAL_SIGNAGE_PATH),
    title,
    description,
    images: [
      {
        url: digitalSignageImages.app,
        alt: "App Digital Signage en el panel WeKoda"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [digitalSignageImages.app]
  }
};

const features = [
  {
    title: "Biblioteca y playlists",
    body: "Videos, imágenes y URLs en una biblioteca de organización. Armá secuencias ordenadas y asignalas a cada player.",
    Icon: Clapperboard
  },
  {
    title: "Cache local en el player",
    body: "La Pi precarga contenido en disco. VLC arranca sin esperar la red: el primer frame no se bloquea por una descarga.",
    Icon: HardDrive
  },
  {
    title: "Agendas por dispositivo",
    body: "Programá qué se reproduce y cuándo, por player. Ideal para sucursales, lobbies y cartelería de turno.",
    Icon: CalendarClock
  },
  {
    title: "Proof-of-play",
    body: "Auditoría de lo que realmente se emitió. Demostrá reproducción ante operaciones, marketing o el cliente final.",
    Icon: ShieldCheck
  }
] as const;

const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "WeKoda Digital Signage",
  brand: { "@type": "Brand", name: SITE_NAME },
  description,
  image: absoluteUrl(digitalSignageImages.app),
  url: absoluteUrl(DIGITAL_SIGNAGE_PATH),
  applicationCategory: "BusinessApplication",
  operatingSystem: "Raspberry Pi OS Lite, Web"
};

export default function DigitalSignagePage() {
  return (
    <div className="flex w-full flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <section className="relative overflow-hidden bg-slate-950 px-4 pb-12 pt-10 text-slate-50 sm:px-6 md:pb-16 md:pt-14">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_10%,rgba(14,165,233,0.22),transparent_50%),radial-gradient(ellipse_at_90%_80%,rgba(239,77,99,0.12),transparent_45%)]"
          aria-hidden
        />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <MonitorPlay className="size-3.5" aria-hidden />
              WeKoda Digital Signage
            </p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              Cartelería digital gobernada como infraestructura.
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate-300 md:text-lg">
              Players HDMI sobre Raspberry Pi 4B, administrados desde el mismo panel que el resto de
              la flota: contenido, playlists, agendas y prueba de reproducción.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-primary text-white hover:bg-primary/90"
              >
                <Link
                  href={DIGITAL_SIGNAGE_CONTACT_HREF}
                  data-action="book-signage-demo"
                  data-entity="lead"
                >
                  Solicitar información
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="#panel" data-action="view-signage-panel" data-entity="digital-signage">
                  Ver el panel
                </Link>
              </Button>
            </div>
            <p className="mt-5 font-mono text-xs text-slate-500">
              Hardware: rpi4b-signage-player-v1 · agente Node.js + VLC
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl shadow-primary/20">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={digitalSignageImages.app}
                alt="App Digital Signage en el panel WeKoda con biblioteca, playlists y agendas"
                fill
                className="object-contain object-top"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-white px-4 py-12 sm:px-6 md:py-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              Qué incluye
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              De la biblioteca al HDMI, sin salirte de WeKoda.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-10 md:gap-5">
            {features.map(({ title, body, Icon }) => (
              <article
                key={title}
                className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm md:p-6"
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground md:text-lg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="panel" className="bg-slate-50/80 px-4 py-12 sm:px-6 md:py-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
              En el panel
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              Una vertical más de la plataforma, no un CMS aislado.
            </h2>
            <p className="mt-3 text-base text-muted-foreground md:text-lg">
              Flota, adopción, shadow y telemetría comparten el mismo contrato Zero Trust. El
              navegador nunca toca el broker; el player solo habla MQTT con el backend.
            </p>
          </div>
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border/70 bg-white shadow-lg md:mt-10">
            <Image
              src={digitalSignageImages.app}
              alt="Captura del dashboard Digital Signage con gestión de contenido"
              fill
              className="object-contain"
              sizes="(min-width: 1280px) 1200px, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-4 py-12 text-center text-slate-50 sm:px-6 md:py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold md:text-3xl">
            ¿Querés probar Digital Signage en tu red?
          </h2>
          <p className="mt-3 text-sm text-slate-300 md:text-base">
            Contanos el sitio y la cantidad de pantallas. Te armamos una demo con player Pi y el
            panel de producción.
          </p>
          <Button
            asChild
            className="mt-6 h-12 rounded-full bg-primary px-8 text-white hover:bg-primary/90"
          >
            <Link
              href={DIGITAL_SIGNAGE_CONTACT_HREF}
              data-action="request-signage-info"
              data-entity="lead"
            >
              Hablar con el equipo
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
          <p className="mt-4">
            <Link
              href="/devblog"
              className="text-sm text-slate-400 underline-offset-4 hover:text-primary hover:underline"
              data-action="nav-devblog-from-signage"
              data-entity="devblog"
            >
              Leer los posts técnicos de Signage en el DevBlog
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
