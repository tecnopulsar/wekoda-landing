"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { showcaseSections } from "@/lib/platform-content";

export function PlatformShowcase() {
  const [activeId, setActiveId] = useState(showcaseSections[0].id);
  const active = showcaseSections.find((section) => section.id === activeId) ?? showcaseSections[0];

  return (
    <div className="w-full">
      <div
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
        role="tablist"
        aria-label="Secciones de la plataforma"
      >
        {showcaseSections.map(({ id, label, Icon }) => {
          const isActive = id === activeId;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`showcase-tab-${id}`}
              aria-selected={isActive}
              aria-controls={`showcase-panel-${id}`}
              onClick={() => setActiveId(id)}
              data-action="select-showcase-section"
              data-entity="platform-section"
              data-row-id={id}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-primary bg-primary text-white shadow-sm"
                  : "border-border/70 bg-background text-muted-foreground hover:border-primary/40 hover:text-primary"
              }`}
            >
              <Icon className="size-4" aria-hidden />
              {label}
            </button>
          );
        })}
      </div>

      <div
        key={active.id}
        role="tabpanel"
        id={`showcase-panel-${active.id}`}
        aria-labelledby={`showcase-tab-${active.id}`}
        className="showcase-panel mt-6 grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border/70 bg-slate-100 shadow-xl">
          <Image
            src={active.image}
            alt={active.imageAlt}
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 60vw, 100vw"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {active.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {active.description}
          </p>
          <ul className="mt-5 space-y-3">
            {active.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-3" aria-hidden />
                </span>
                <span className="text-sm leading-relaxed text-foreground/90">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
