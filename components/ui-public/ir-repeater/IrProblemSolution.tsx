import { BatteryWarning, ClipboardList, LayoutDashboard } from "lucide-react";

const items = [
  {
    title: "Adiós a las baterías y a los mandos perdidos",
    body: "Los controles físicos se agotan, se rompen o desaparecen. El personal deja equipos encendidos y el costo energético se va de escala.",
    Icon: BatteryWarning
  },
  {
    title: "Control centralizado desde el panel",
    body: "Un módulo discreto absorbe las funciones del control original y las transfiere a un panel web seguro, con el mismo comando disponible para toda la organización.",
    Icon: LayoutDashboard
  },
  {
    title: "Auditoría y apagado automático",
    body: "Cada emisión queda registrada. Las agendas apagan aires, proyectores y TVs al cierre, sin depender de que alguien recuerde el botón.",
    Icon: ClipboardList
  }
] as const;

export function IrProblemSolution() {
  return (
    <section className="border-y border-border/60 bg-white px-4 py-12 sm:px-6 md:py-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
            El problema frente a la solución
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
            Del control físico perdido a un activo gobernable.
          </h2>
        </div>
        <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3 md:gap-5">
          {items.map(({ title, body, Icon }) => (
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
  );
}
