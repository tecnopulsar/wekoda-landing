import { Cable, Wifi } from "lucide-react";

export function IrConnectivityBento() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 md:py-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Conectividad para cada entorno
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
            WiFi para desplegar rápido. Ethernet cuando la latencia no es negociable.
          </h2>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            No es un gadget de hogar. Elegís el transporte según el sitio: oficina y hotelería, o
            rack A/V y sala técnica.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
          <article className="rounded-3xl border border-border/70 bg-slate-50 p-6 md:col-span-2 md:p-8">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Cable className="size-5" aria-hidden />
            </span>
            <h3 className="mt-5 text-xl font-bold text-foreground md:text-2xl">
              WeKoda IR Ethernet
            </h3>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              esp32-eth-ir-repeater-v1 · WT32-ETH01
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Hardware industrial con Ethernet cableado. Pensado para salas de servidores, racks A/V
              o entornos con saturación inalámbrica, donde la latencia cero y la estabilidad son
              obligatorias.
            </p>
          </article>

          <article className="rounded-3xl border border-border/70 bg-card p-6 md:p-8">
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Wifi className="size-5" aria-hidden />
            </span>
            <h3 className="mt-5 text-xl font-bold text-foreground">WeKoda IR WiFi</h3>
            <p className="mt-1 font-mono text-xs text-muted-foreground">esp32-ir-repeater-v1</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Ideal para oficinas dinámicas y hotelería. Despliegue rápido sin cables estructurales,
              con el mismo contrato MQTT y el mismo panel.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
