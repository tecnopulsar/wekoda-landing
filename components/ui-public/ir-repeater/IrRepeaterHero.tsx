import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IR_REPEATER_CONTACT_HREF, irRepeaterImages } from "@/lib/ir-repeater";

export function IrRepeaterHero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 px-4 pb-12 pt-10 text-slate-50 sm:px-6 md:pb-16 md:pt-14">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(14,165,233,0.22),transparent_50%),radial-gradient(ellipse_at_90%_80%,rgba(239,77,99,0.12),transparent_45%)]"
        aria-hidden
      />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            WeKoda IR Repeater
          </p>
          <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Centralización infrarroja para infraestructuras inteligentes.
          </h1>
          <p className="mt-5 max-w-xl text-base text-slate-300 md:text-lg">
            Convierte cualquier equipo con control remoto tradicional —aires acondicionados,
            proyectores, TVs— en un activo digital gobernable desde la plataforma.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-primary text-white hover:bg-primary/90"
            >
              <Link
                href={IR_REPEATER_CONTACT_HREF}
                data-action="book-ir-demo"
                data-entity="lead"
              >
                Agendar una demo
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="#especificaciones" data-action="view-ir-specs" data-entity="ir-repeater">
                <FileText className="size-4" aria-hidden />
                Ver especificaciones
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] bg-primary/20 blur-3xl" />
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 shadow-2xl shadow-primary/20">
            <Image
              src={irRepeaterImages.hero}
              alt="Kit WeKoda IR Repeater con alimentación USB, emisor TX y receptor RX conectados"
              width={1200}
              height={1600}
              className="h-auto w-full object-cover drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
