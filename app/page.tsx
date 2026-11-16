import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CheckCircle2, ChevronDown, CalendarRange, Store, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/ui-public/ContactForm';
import { FounderApplyButton } from '@/components/ui-public/FounderApplyButton';
import { ScrollToContactOnHash } from '@/components/ui-public/ScrollToContactOnHash';
import { HeroSignageVisual } from '@/components/ui-public/HeroSignageVisual';
import { founderHomeFaq, heroPreviewCards } from '@/lib/platform-content';
import {
  BRAND_ALTERNATE_NAMES,
  BRAND_DISAMBIGUATION,
  BRAND_NAME,
  SITE_DESCRIPTION_SHORT,
  SITE_KEYWORDS,
  absoluteUrl,
  getSiteUrl,
} from '@/lib/seo';

export const metadata: Metadata = {
  title: 'WeKoda — Sitios fundadores de cartelería digital',
  description: `${SITE_DESCRIPTION_SHORT} ${BRAND_DISAMBIGUATION}`,
  keywords: SITE_KEYWORDS,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: getSiteUrl(),
    siteName: BRAND_NAME,
    title: 'WeKoda — Programa de sitios fundadores',
    description: SITE_DESCRIPTION_SHORT,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WeKoda — Programa de sitios fundadores',
    description: SITE_DESCRIPTION_SHORT,
    images: [absoluteUrl('/opengraph-image')],
  },
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: `Inicio — ${BRAND_NAME}`,
  url: getSiteUrl(),
  inLanguage: 'es-AR',
  isPartOf: { '@type': 'WebSite', name: BRAND_NAME, url: getSiteUrl() },
  about: {
    '@type': 'Brand',
    name: BRAND_NAME,
    alternateName: [...BRAND_ALTERNATE_NAMES],
  },
  description: SITE_DESCRIPTION_SHORT,
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: `${BRAND_NAME} Platform`,
  alternateName: [...BRAND_ALTERNATE_NAMES],
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Linux',
  url: getSiteUrl(),
  image: absoluteUrl('/opengraph-image'),
  description: SITE_DESCRIPTION_SHORT,
  inLanguage: 'es-AR',
  featureList: [
    'Programa de sitios fundadores',
    'Cartelería digital con campañas y calendario',
    'Aprobación antes de salir al aire',
    'Evidencia de reproducción',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: founderHomeFaq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

const sectionSnapHero =
  'relative flex w-full snap-start flex-col justify-start px-4 pb-7 pt-6 sm:px-6 sm:pb-8 sm:pt-7 md:pb-9';
const sectionSnap =
  'relative flex w-full snap-start flex-col justify-start px-4 py-8 sm:px-6 md:py-9 lg:py-10';
const sectionSnapCompact =
  'relative flex w-full snap-start flex-col justify-center px-4 py-3.5 sm:px-6 md:py-4';

const receives = [
  'Piloto acompañado en tu sitio, instalado con nosotros.',
  'Condición comercial de fundador, mantenida en el tiempo.',
  'Línea directa con quienes construyen la plataforma.',
  'Tus casos de uso primero en el roadmap.',
];

const asks = [
  'Un sitio real: sucursales, edificio, hotel o clínica.',
  'Un referente de negocio y, si existe, uno de sistemas.',
  'Feedback honesto durante el piloto.',
  'Si funciona, contarlo.',
];

const dayBeats = [
  {
    time: '09:00',
    title: 'La campaña sale en las sucursales correctas',
    body: 'Marketing la cargó el martes. Operación la aprobó. Hoy arranca en el canal Norte, no en el resto.',
  },
  {
    time: '13:10',
    title: 'Un aviso pisa la promo',
    body: 'El mensaje urgente toma las pantallas. Cuando termina, cada una vuelve a su programa.',
  },
  {
    time: '18:40',
    title: 'Sabés qué se vio',
    body: 'Dirección pregunta si la pieza salió. La respuesta está en el panel, sin recorrer locales.',
  },
  {
    time: 'Al día siguiente',
    title: 'El calendario sigue solo',
    body: 'La vigencia vence y la pantalla cambia. Nadie arma un pendrive.',
  },
];

export default function LandingPage() {
  return (
    <div className='h-full min-h-0 flex-1 snap-y snap-proximity overflow-y-scroll scroll-smooth scroll-pt-16'>
      <ScrollToContactOnHash />

      <section
        className={`${sectionSnapHero} overflow-hidden bg-slate-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[length:24px_24px]`}
      >
        <div
          className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.12),transparent_55%),radial-gradient(ellipse_at_bottom_left,hsl(var(--secondary)/0.08),transparent_50%)]'
          aria-hidden
        />
        <div className='relative mx-auto w-full max-w-7xl'>
          <div className='grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10'>
            <div className='text-left'>
              <p className='inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary'>
                <span className='relative flex size-1.5'>
                  <span className='hero-ping absolute inline-flex size-full rounded-full bg-primary/70' />
                  <span className='relative inline-flex size-1.5 rounded-full bg-primary' />
                </span>
                Programa de sitios fundadores
              </p>
              <h1 className='mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl'>
                La misma campaña, en las sucursales correctas.{' '}
                <span className='bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent'>
                  Y la prueba de que se vio.
                </span>
              </h1>
              <p className='mt-4 max-w-2xl text-base text-muted-foreground md:text-lg'>
                WeKoda abre una cohorte chica de sitios fundadores. Operás la
                cartelería de verdad y ayudás a darle forma a la plataforma.
                Acompañamos pocos sitios a la vez.
              </p>
              <div className='mt-6 flex flex-wrap gap-3 md:mt-7'>
                <FounderApplyButton />
                <Button
                  asChild
                  variant='outline'
                  size='lg'
                  className='border-primary/20 text-primary hover:bg-primary/10'
                >
                  <Link
                    href='#fundadores'
                    data-action='see-founder-program'
                    data-entity='founder-program'
                  >
                    Ver el acuerdo
                  </Link>
                </Button>
              </div>
              <p className='mt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground/70'>
                Cliente semilla, no participación societaria · cartelería primero
              </p>
            </div>
            <HeroSignageVisual />
          </div>
        </div>
      </section>

      <section className={`${sectionSnapCompact} border-y bg-muted/20`}>
        <div className='mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-medium text-muted-foreground'>
          <p>✔ Campaña con fecha de inicio y fin</p>
          <p>✔ Nada sale al aire sin aprobación</p>
          <p>✔ Evidencia de lo que se reprodujo</p>
        </div>
      </section>

      <section
        id='fundadores'
        className={`${sectionSnap} border-b border-border/60 bg-white`}
      >
        <div className='mx-auto w-full max-w-7xl'>
          <div className='max-w-3xl'>
            <p className='text-sm font-semibold uppercase tracking-widest text-secondary'>
              El acuerdo
            </p>
            <h2 className='mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl'>
              Buscamos sitios, no espectadores.
            </h2>
            <p className='mt-3 text-base text-muted-foreground md:text-lg'>
              Cadenas, oficinas, hoteles, clínicas o integradores con pantallas
              que hoy dependen de un pendrive o de un proveedor que no conocen
              el local.
            </p>
          </div>
          <div className='mt-8 grid gap-5 md:mt-10 lg:grid-cols-2'>
            <article className='rounded-2xl border border-primary/25 bg-primary/5 p-6 shadow-sm'>
              <h3 className='text-lg font-semibold text-foreground'>
                Lo que recibís
              </h3>
              <ul className='mt-4 space-y-2.5 text-sm text-muted-foreground'>
                {receives.map((item) => (
                  <li key={item} className='flex gap-2'>
                    <CheckCircle2
                      className='mt-0.5 size-4 shrink-0 text-primary'
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className='rounded-2xl border border-border/70 bg-slate-50/80 p-6 shadow-sm'>
              <h3 className='text-lg font-semibold text-foreground'>
                Lo que pedimos
              </h3>
              <ul className='mt-4 space-y-2.5 text-sm text-muted-foreground'>
                {asks.map((item) => (
                  <li key={item} className='flex gap-2'>
                    <CheckCircle2
                      className='mt-0.5 size-4 shrink-0 text-primary'
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <ol className='mt-6 grid gap-3 sm:grid-cols-4'>
            {[
              'Primera llamada',
              'Relevamos el sitio',
              'Piloto en marcha',
              'Decidís con datos',
            ].map((step, index) => (
              <li
                key={step}
                className='rounded-2xl border border-border/70 bg-card px-4 py-3 text-sm font-medium text-foreground'
              >
                <span className='mr-2 font-mono text-primary'>0{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <div className='mt-8'>
            <FounderApplyButton size='default' className='rounded-full' />
          </div>
        </div>
      </section>

      <section id='dia' className={`${sectionSnap} bg-slate-50/80`}>
        <div className='mx-auto w-full max-w-7xl'>
          <div className='max-w-3xl'>
            <p className='text-sm font-semibold uppercase tracking-widest text-secondary'>
              Un día en el sitio
            </p>
            <h2 className='mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl'>
              Nadie pregunta si la promo salió.
            </h2>
          </div>
          <ol className='mt-8 grid gap-4 md:grid-cols-2 md:mt-10'>
            {dayBeats.map(({ time, title, body }) => (
              <li
                key={time}
                className='rounded-2xl border border-border/70 bg-card p-5 shadow-sm'
              >
                <p className='font-mono text-sm font-semibold text-primary'>
                  {time}
                </p>
                <h3 className='mt-2 text-base font-semibold text-foreground'>
                  {title}
                </h3>
                <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                  {body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id='panel' className={`${sectionSnap} bg-white`}>
        <div className='mx-auto w-full max-w-7xl'>
          <div className='flex flex-wrap items-end justify-between gap-4'>
            <div className='max-w-3xl'>
              <p className='text-sm font-semibold uppercase tracking-widest text-secondary'>
                El producto que entra primero
              </p>
              <h2 className='mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl'>
                Cartelería que Marketing carga y operación publica.
              </h2>
            </div>
            <Button
              asChild
              variant='outline'
              className='rounded-full border-primary/30 text-primary'
            >
              <Link
                href='/soluciones/digital-signage'
                data-action='open-signage-solution'
                data-entity='digital-signage'
              >
                Ver la solución
              </Link>
            </Button>
          </div>
          <div className='mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4'>
            {heroPreviewCards.map(({ id, label, caption, image, imageAlt }) => (
              <article
                key={id}
                className='overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm'
              >
                <div className='relative aspect-[16/10] overflow-hidden bg-slate-100'>
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    className='object-cover object-top'
                    sizes='(min-width: 640px) 33vw, 100vw'
                  />
                  <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent' />
                  <div className='absolute inset-x-0 bottom-0 p-3'>
                    <p className='text-xs font-semibold uppercase tracking-wider text-white/80'>
                      {label}
                    </p>
                    <p className='mt-0.5 text-sm font-medium text-white'>
                      {caption}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className='mt-6 grid gap-4 sm:grid-cols-3'>
            <p className='flex gap-2 text-sm text-muted-foreground'>
              <CalendarRange className='mt-0.5 size-4 shrink-0 text-primary' aria-hidden />
              Calendario y vigencia, no un inventario de televisores.
            </p>
            <p className='flex gap-2 text-sm text-muted-foreground'>
              <Store className='mt-0.5 size-4 shrink-0 text-primary' aria-hidden />
              Un canal para el grupo de sucursales que corresponde.
            </p>
            <p className='flex gap-2 text-sm text-muted-foreground'>
              <Eye className='mt-0.5 size-4 shrink-0 text-primary' aria-hidden />
              Entrega y evidencia para responder a dirección.
            </p>
          </div>
        </div>
      </section>

      <section className={`${sectionSnap} border-y border-border/60 bg-slate-950 text-slate-50`}>
        <div className='mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-widest text-sky-300/90'>
              Sin humo
            </p>
            <h2 className='mt-3 text-2xl font-bold tracking-tight md:text-3xl'>
              Cartelería en marcha. El resto del edificio, cuando haga falta.
            </h2>
            <p className='mt-3 text-base text-slate-300 md:text-lg'>
              La cohorte arranca por pantallas. Luces, aires por control remoto
              y la flota conviven en la misma plataforma, pero no hace falta
              comprar todo junto.
            </p>
          </div>
          <div className='flex flex-col gap-3'>
            <Button
              asChild
              variant='outline'
              className='rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white'
            >
              <Link
                href='/soluciones/digital-signage'
                data-action='open-signage-from-honesty'
                data-entity='digital-signage'
              >
                Cartelería digital
              </Link>
            </Button>
            <Button
              asChild
              variant='outline'
              className='rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white'
            >
              <Link
                href='/soluciones/ir-repeater'
                data-action='open-ir-repeater-page'
                data-entity='ir-repeater'
              >
                Equipos que solo entienden el control remoto
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id='preguntas' className={`${sectionSnap} bg-white`}>
        <div className='mx-auto w-full max-w-4xl'>
          <div className='text-center'>
            <p className='text-sm font-semibold uppercase tracking-widest text-secondary'>
              Preguntas
            </p>
            <h2 className='mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl'>
              Antes de la primera llamada.
            </h2>
          </div>
          <div className='mt-8 divide-y divide-border/60 border-y border-border/60'>
            {founderHomeFaq.map(({ question, answer }) => (
              <details key={question} className='group py-4'>
                <summary className='flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-foreground hover:text-primary md:text-lg'>
                  <h3>{question}</h3>
                  <ChevronDown
                    className='size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180'
                    aria-hidden
                  />
                </summary>
                <p className='mt-3 text-sm leading-relaxed text-muted-foreground md:text-base'>
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id='contacto' className={`${sectionSnap} border-t border-border/60 bg-muted/30`}>
        <div className='mx-auto grid w-full max-w-7xl items-start gap-8 lg:grid-cols-2 lg:gap-10'>
          <div>
            <h2 className='text-3xl font-extrabold tracking-tight text-foreground md:text-4xl'>
              Contanos tu sitio
            </h2>
            <p className='mt-3 text-base text-muted-foreground md:text-lg'>
              Pantallas, sedes y el dolor de hoy. Coordinamos una primera
              llamada para ver si esta cohorte te sirve.
            </p>
            <ul className='mt-5 space-y-2.5 text-muted-foreground'>
              <li className='flex gap-3'>
                <CheckCircle2 className='mt-0.5 size-5 shrink-0 text-primary' aria-hidden />
                Sin tarifa de catálogo en el programa
              </li>
              <li className='flex gap-3'>
                <CheckCircle2 className='mt-0.5 size-5 shrink-0 text-primary' aria-hidden />
                Respuesta de quienes construyen la plataforma
              </li>
              <li className='flex gap-3'>
                <CheckCircle2 className='mt-0.5 size-5 shrink-0 text-primary' aria-hidden />
                Podés empezar solo por cartelería
              </li>
            </ul>
          </div>
          <div className='rounded-2xl border border-border/50 bg-background p-5 shadow-xl md:p-6'>
            <ContactForm />
          </div>
        </div>
      </section>

      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([webPageSchema, softwareSchema, faqSchema]),
        }}
      />
    </div>
  );
}
