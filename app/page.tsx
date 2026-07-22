import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ui-public/ContactForm";
import { DevBlogInvitePopup } from "@/components/ui-public/DevBlogInvitePopup";
import { ScrollToContactOnHash } from "@/components/ui-public/ScrollToContactOnHash";
import { getAppLoginUrl } from "@/lib/constants";

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

const capabilityCards = [
  "Alta y provisión de dispositivos sin intervención manual.",
  "Ejecución remota de comandos con confirmación transaccional.",
  "Telemetría continua y observabilidad de estado.",
  "Orquestación centralizada de flotas distribuidas."
];

const securityItems = [
  "Cada dispositivo opera con sus propias credenciales (deviceId + deviceSecret).",
  "El frontend nunca accede a credenciales ni al broker.",
  "Cada comando es trazable y verificable.",
  "Aislamiento estricto por organización."
];

const flowSteps = [
  "Registrás y adoptás dispositivos.",
  "Ejecutás comandos y automatizaciones.",
  "Monitoreás estado y métricas en tiempo real."
];

const useCaseCards: { title: string; image: string }[] = [
  {
    title: "Cartelería digital distribuida a gran escala",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop"
  },
  {
    title: "IoT industrial y monitoreo remoto",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80&auto=format&fit=crop"
  },
  {
    title: "Automatización de espacios y control centralizado",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop"
  },
  {
    title: "Infraestructura edge en múltiples ubicaciones",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop"
  }
];

const HERO_VISUAL =
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80&auto=format&fit=crop";
const ARCH_VISUAL =
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80&auto=format&fit=crop";

export default function LandingPage() {
  const loginUrl = getAppLoginUrl();

  return (
    <div className="h-full min-h-0 flex-1 snap-y snap-proximity overflow-y-scroll scroll-smooth scroll-pt-16">
      <ScrollToContactOnHash />
      <section
        className={`${sectionSnapHero} overflow-hidden bg-slate-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[length:24px_24px]`}
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="text-left">
              <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
                El poder de conectar. La seguridad de controlar.
              </p>
              <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Operá dispositivos como infraestructura, no como hardware.
              </h1>
              <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
                Gestioná, asegurá y escalá dispositivos conectados con control total y un modelo de
                seguridad Zero Trust.
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
                Para equipos técnicos, integradores y empresas que operan infraestructura en el edge.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 md:mt-7">
                <Button asChild size="lg" className="bg-primary text-white hover:bg-primary/90">
                  <Link
                    href={loginUrl}
                    data-action="start-login"
                    data-entity="session"
                  >
                    Empezar ahora
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary/20 text-primary hover:bg-primary/10"
                >
                  <Link
                    href="#arquitectura"
                    data-action="view-architecture"
                    data-entity="platform"
                  >
                    Ver arquitectura
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50 shadow-2xl">
              <Image
                src={HERO_VISUAL}
                alt="Infraestructura y operaciones de red"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent" />
            </div>
          </div>

          <div className="mt-6 w-full rounded-2xl border border-border/70 bg-background/80 p-4 shadow-2xl shadow-primary/5 backdrop-blur-sm md:mt-10 md:p-5">
            <div className="grid gap-3 md:grid-cols-3 md:gap-4">
              <div className="rounded-xl border bg-card p-3 text-left md:p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Fleet</p>
                <p className="mt-2 text-2xl font-semibold">2.148</p>
                <p className="text-sm text-muted-foreground">dispositivos activos</p>
              </div>
              <div className="rounded-xl border bg-card p-3 text-left md:p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Comandos</p>
                <p className="mt-2 text-2xl font-semibold">99.98%</p>
                <p className="text-sm text-muted-foreground">confirmación transaccional</p>
              </div>
              <div className="rounded-xl border bg-card p-3 text-left md:p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Tenants</p>
                <p className="mt-2 text-2xl font-semibold">Aislados</p>
                <p className="text-sm text-muted-foreground">modelo Zero Trust nativo</p>
              </div>
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

      <section className={`${sectionSnap} bg-white`}>
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Operá, monitoreá y protegé tu tecnología sin complejidad.
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 md:mt-10 lg:grid-cols-4">
            {capabilityCards.map((item) => (
              <div key={item} className="rounded-2xl border border-border/80 bg-card p-4 shadow-sm md:p-5">
                <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
              </div>
            ))}
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

      <section
        id="arquitectura"
        className={`${sectionSnap} border-y border-blue-100 bg-blue-50/50`}
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="space-y-4">
              <p className="font-mono text-sm text-foreground">
                [ Dispositivo Edge ] -&gt; [ Backend / Gateway ] -&gt; [ UI Plataforma ]
              </p>
              <div className="grid gap-4 md:grid-cols-1">
                <p className="text-lg font-medium text-foreground">
                  Backend como gateway seguro entre dispositivos y usuarios. Punto único de control
                  para toda la infraestructura.
                </p>
                <p className="text-lg font-medium text-foreground">
                  Sin conexiones directas entre cliente y broker. Sin exposición de credenciales.
                </p>
              </div>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-blue-100/80 bg-white shadow-lg">
              <Image
                src={ARCH_VISUAL}
                alt="Equipo colaborando en infraestructura cloud"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionSnap} bg-slate-50/80`}>
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">Cómo funciona</h2>
          <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3 md:gap-6">
            {flowSteps.map((step, idx) => (
              <div key={step} className="relative overflow-hidden rounded-2xl border bg-card p-4 shadow-sm md:p-5">
                <span className="absolute right-2 top-1 -z-10 text-6xl font-black text-muted/20 md:text-7xl">
                  {idx + 1}
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionSnap}>
        <div className="mx-auto w-full max-w-7xl">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">Casos de uso</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {useCaseCards.map((uc) => (
              <div
                key={uc.title}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl sm:aspect-[3/4]"
              >
                <Image
                  src={uc.image}
                  alt={uc.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <p className="absolute bottom-0 p-4 text-base font-bold leading-snug text-white md:p-5 md:text-lg">
                  {uc.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionSnap}>
        <div className="mx-auto w-full max-w-7xl">
          <div className="rounded-3xl bg-slate-900 p-6 text-center text-white md:p-8">
            <h2 className="text-balance text-2xl font-bold md:text-3xl lg:text-4xl">
              Empezá a operar tu infraestructura hoy.
            </h2>
            <p className="mt-3 text-sm text-slate-300 md:text-base">
              Centralizá el control de tus dispositivos en una sola plataforma.
            </p>
            <Button
              asChild
              className="mt-6 h-12 rounded-full bg-primary px-8 text-base text-white hover:bg-primary/90 md:mt-8 md:h-14 md:px-10 md:text-lg"
            >
              <Link href="#contacto" data-action="go-contact" data-entity="lead">
                Contacto
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="contacto"
        className={`${sectionSnap} border-t border-border/60 bg-muted/30`}
      >
        <div className="mx-auto grid w-full max-w-7xl items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="text-left">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Hablemos de tu infraestructura.
            </h2>
            <p className="mt-3 text-base text-muted-foreground md:text-lg">
              Contanos tus desafíos de orquestación edge. Nuestro equipo de ingeniería te asesorará
              sobre cómo We Koda puede centralizar y asegurar tus operaciones.
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
            </div>
          </div>
          <div className="rounded-2xl border border-border/50 bg-background p-5 shadow-xl md:p-6">
            <ContactForm />
          </div>
        </div>
      </section>

      <DevBlogInvitePopup />
    </div>
  );
}
