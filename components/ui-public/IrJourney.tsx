import Image from "next/image";
import { irJourneySteps } from "@/lib/platform-content";

export function IrJourney() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
      {irJourneySteps.map(({ id, step, title, description, image, imageAlt }) => (
        <article
          key={id}
          className="flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm"
        >
          <div className="relative aspect-[16/9] w-full border-b border-border/60 bg-slate-100">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-contain"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-bold text-primary">
                {step}
              </span>
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
