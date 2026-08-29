import Link from "next/link";
import { ArrowRight, ShieldCheck, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IR_REPEATER_CONTACT_HREF } from "@/lib/ir-repeater";

const specs = [
  {
    title: "Zero Trust en el nodo",
    body: "El IR Repeater no toma decisiones ni almacena horarios. Es un ejecutor ciego: recibe el comando, emite el pulso y reporta el resultado."
  },
  {
    title: "Contrato MQTT v2.1",
    body: "Toda la comunicación pasa por el backend. El panel nunca habla MQTT. Un solo lugar para tenant, RBAC y auditoría."
  },
  {
    title: "Aislamiento de flota",
    body: "Los dispositivos no se hablan entre sí. Las credenciales se gestionan de forma centralizada y cada nodo solo opera en sus propios topics."
  },
  {
    title: "OTA y operación remota",
    body: "Firmware por modelo de hardware, historial de actualizaciones, localización por LED y factory reset sin ir hasta el sitio."
  }
] as const;

export function IrTechSpecs() {
  return (
    <section
      id="especificaciones"
      className="bg-slate-950 px-4 py-12 text-slate-50 sm:px-6 md:py-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              <Terminal className="size-3.5" aria-hidden />
              Para integradores
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              El nodo obedece. La inteligencia vive en el servidor.
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {specs.map(({ title, body }) => (
            <article
              key={title}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm md:p-6"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" aria-hidden />
                <h3 className="text-base font-semibold text-white">{title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{body}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center md:p-10">
          <h3 className="text-xl font-bold md:text-2xl">¿Listo para el primer kit?</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-300 md:text-base">
            Contanos el sitio —oficina, hotel, sala A/V— y te armamos una demo con el hardware
            real y el panel de producción.
          </p>
          <Button
            asChild
            className="mt-6 h-12 rounded-full bg-primary px-8 text-white hover:bg-primary/90"
          >
            <Link
              href={IR_REPEATER_CONTACT_HREF}
              data-action="request-ir-kit"
              data-entity="lead"
            >
              Solicitar información
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
