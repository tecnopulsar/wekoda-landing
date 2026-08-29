import Image from "next/image";
import { Radio, Send } from "lucide-react";
import { irRepeaterImages } from "@/lib/ir-repeater";

export function IrHardwareShowcase() {
  return (
    <section className="bg-slate-50/80 px-4 py-12 sm:px-6 md:py-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Anatomía del hardware
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
            Diseño modular y universal.
          </h2>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            Alimentación estándar por USB-C y jacks de 3.5 mm para máxima compatibilidad comercial.
            El hub se instala una vez; los cabezales TX y RX se posicionan junto a cada equipo.
          </p>
        </div>

        <div className="mt-10 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="overflow-hidden rounded-3xl border border-border/70 bg-white shadow-lg">
            <Image
              src={irRepeaterImages.ports}
              alt="Puertos TX y RX de 3.5 mm en el módulo WeKoda IR"
              width={1200}
              height={900}
              className="h-auto w-full object-cover drop-shadow-2xl"
            />
          </div>
          <div className="space-y-5">
            <article className="rounded-2xl border border-border/70 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Radio className="size-5" aria-hidden />
                </span>
                <h3 className="text-lg font-semibold text-foreground">Modo captura (RX)</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Conectá el módulo receptor, apuntá el control original y cloná la señal directo a la
                biblioteca de la plataforma. Sin recargar y sin una petición HTTP por cada botón:
                las capturas llegan en vivo por WebSocket.
              </p>
            </article>
            <article className="rounded-2xl border border-border/70 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Send className="size-5" aria-hidden />
                </span>
                <h3 className="text-lg font-semibold text-foreground">Modo emisión (TX)</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Conectá el emisor infrarrojo —disponible en configuraciones de hasta 4 canales
                simultáneos— y escondelo junto al equipo. El control pasa a ser invisible, absoluto
                y ejecutable desde cualquier mando virtual o escena.
              </p>
            </article>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm">
            <Image
              src={irRepeaterImages.usb}
              alt="Alimentación USB-C del módulo WeKoda IR"
              width={1200}
              height={900}
              className="h-auto w-full object-cover"
            />
            <p className="p-4 text-sm text-muted-foreground">
              Alimentación USB-C: fuente comercial, power bank o puerto de un rack A/V.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-white shadow-sm">
            <Image
              src={irRepeaterImages.layout}
              alt="Kit WeKoda IR con hub, cable USB, emisor y receptor"
              width={1200}
              height={900}
              className="h-auto w-full object-cover"
            />
            <p className="p-4 text-sm text-muted-foreground">
              Kit completo: hub, alimentación, cabezal TX y receptor RX listos para desplegar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
