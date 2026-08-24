"use client";

import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deploymentPlans } from "@/lib/platform-content";
import { requestContactWithInterest } from "@/lib/constants";

export function DeploymentPlans() {
  return (
    <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
      {deploymentPlans.map(
        ({ id, name, tagline, price, priceNote, featured, features, interestValue, Icon }) => (
          <article
            key={id}
            className={`relative flex flex-col rounded-2xl border p-6 shadow-sm transition-shadow hover:shadow-lg md:p-7 ${
              featured
                ? "border-primary/50 bg-card shadow-lg shadow-primary/10 lg:-translate-y-2"
                : "border-border/70 bg-card"
            }`}
          >
            {featured ? (
              <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-sm">
                <Sparkles className="size-3" aria-hidden />
                Más elegido
              </span>
            ) : null}

            <div className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="size-5" aria-hidden />
            </div>

            <h3 className="mt-4 text-xl font-bold text-foreground">{name}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{tagline}</p>

            <div className="mt-5 border-y border-border/60 py-4">
              <p className="text-lg font-semibold tracking-tight text-foreground/80">{price}</p>
              <p className="mt-1 text-xs text-muted-foreground">{priceNote}</p>
            </div>

            <ul className="mt-5 flex-1 space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex gap-2.5">
                  <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="size-2.5" aria-hidden />
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => requestContactWithInterest(interestValue)}
              data-action="request-plan-info"
              data-entity="lead"
              data-row-id={id}
              className={`mt-6 h-11 w-full rounded-full text-sm font-semibold ${
                featured
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              }`}
            >
              Solicitar información
            </Button>
          </article>
        )
      )}
    </div>
  );
}
