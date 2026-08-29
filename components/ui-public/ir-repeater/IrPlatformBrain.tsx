import Image from "next/image";
import { CalendarClock, Gamepad2, LayoutGrid } from "lucide-react";
import { irRepeaterImages } from "@/lib/ir-repeater";

const cards = [
  {
    title: "Espacios y escenas",
    body: "Agrupá el encendido del proyector IR con el apagado de luces (relés) en un solo botón. El operador no busca una MAC: enciende la sala.",
    image: irRepeaterImages.spaces,
    imageAlt: "Control por espacios con luces y comandos infrarrojos",
    Icon: LayoutGrid
  },
  {
    title: "Motor de agendas",
    body: "Programá el encendido de los aires a las 08:00 y el apagado a las 20:00, todos los días, sin intervención humana.",
    image: irRepeaterImages.agenda,
    imageAlt: "Agendas que ejecutan escenas y dispositivos por horario",
    Icon: CalendarClock
  },
  {
    title: "Mando virtual",
    body: "El control original vive en el navegador. Se comparte por enlace, se guarda en la organización y emite a través del nodo que elijas.",
    image: irRepeaterImages.remote,
    imageAlt: "Mando virtual de un televisor en el panel WeKoda",
    Icon: Gamepad2
  }
] as const;

export function IrPlatformBrain() {
  return (
    <section className="border-y border-border/60 bg-slate-50/80 px-4 py-12 sm:px-6 md:py-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
            El cerebro: la plataforma
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
            El hardware no viene solo. Es un nodo más del ecosistema.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {cards.map(({ title, body, image, imageAlt, Icon }) => (
            <article
              key={title}
              className="flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm"
            >
              <div className="relative aspect-[16/10] bg-slate-100">
                <Image src={image} alt={imageAlt} fill className="object-cover object-top" sizes="(min-width: 1024px) 33vw, 100vw" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 text-primary">
                  <Icon className="size-4" aria-hidden />
                  <h3 className="text-base font-semibold text-foreground">{title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
