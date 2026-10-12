"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  CalendarRange,
  CheckCircle2,
  MonitorPlay,
  Play,
  Radio,
  Sparkles
} from "lucide-react";
import { digitalSignageImages } from "@/lib/digital-signage";

const screenSlides = [
  {
    id: "promo",
    title: "Promo temporada",
    subtitle: "Canal · Sucursales",
    gradient: "from-sky-400/90 via-sky-600/85 to-blue-900/95"
  },
  {
    id: "menu",
    title: "Cartelera & menú",
    subtitle: "Lobby · Rotación 15 s",
    gradient: "from-primary/85 via-rose-500/75 to-rose-900/90"
  },
  {
    id: "hq",
    title: "Comunicado corporativo",
    subtitle: "HQ · Aprobado por IT",
    gradient: "from-violet-400/80 via-indigo-600/85 to-slate-900/95"
  }
] as const;

const deliveryLines = [
  { player: "tv-lobby-01", status: "Reproduciendo", detail: "campaña verano" },
  { player: "tv-caja-02", status: "Entregado", detail: "playlist menú" },
  { player: "pi-showroom", status: "En cola", detail: "sync biblioteca" }
] as const;

const SLIDE_MS = 3800;
const DELIVERY_MS = 2600;

function SignageScreenMock({
  slideIndex,
  compact = false
}: {
  slideIndex: number;
  compact?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-white/15 bg-slate-900 shadow-lg shadow-black/40 ${
        compact ? "aspect-[16/10]" : "aspect-video"
      }`}
    >
      <div className="absolute inset-x-0 top-0 z-10 h-1.5 bg-slate-800">
        <div className="mx-auto mt-0.5 size-1 rounded-full bg-slate-600" aria-hidden />
      </div>
      {screenSlides.map((item, index) => (
        <div
          key={item.id}
          className={`hero-screen-slide absolute inset-0 flex flex-col justify-end bg-gradient-to-br p-3 sm:p-4 ${item.gradient}`}
          style={{
            opacity: index === slideIndex % screenSlides.length ? 1 : 0
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,rgba(255,255,255,0.12)_50%,transparent_60%)] opacity-40" />
          <p className="relative text-[10px] font-semibold uppercase tracking-widest text-white/70 sm:text-[11px]">
            {item.subtitle}
          </p>
          <p
            className={`relative font-bold leading-tight text-white ${
              compact ? "text-xs sm:text-sm" : "text-sm sm:text-base"
            }`}
          >
            {item.title}
          </p>
          <span className="relative mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-black/25 px-2 py-0.5 text-[9px] font-medium text-emerald-200 sm:text-[10px]">
            <Play className="size-2.5 fill-current" aria-hidden />
            En pantalla
          </span>
        </div>
      ))}
    </div>
  );
}

export function HeroSignageVisual() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [deliveryIndex, setDeliveryIndex] = useState(0);

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % screenSlides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const deliveryTimer = window.setInterval(() => {
      setDeliveryIndex((current) => (current + 1) % deliveryLines.length);
    }, DELIVERY_MS);
    return () => window.clearInterval(deliveryTimer);
  }, []);

  const activeDelivery = deliveryLines[deliveryIndex];

  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute -inset-6 -z-10 hero-glow rounded-[2rem] bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.32),transparent_55%),radial-gradient(circle_at_85%_75%,hsl(199_89%_48%/0.22),transparent_60%)] blur-2xl"
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-4 shadow-2xl shadow-primary/20 sm:p-5 md:p-6">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:28px_28px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_0%,rgba(56,189,248,0.16),transparent_50%)]"
          aria-hidden
        />

        <div className="relative flex flex-wrap items-center justify-between gap-2">
          <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:text-xs">
            <span className="relative flex size-2">
              <span className="hero-ping absolute inline-flex size-full rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Cartelería en sucursales
          </p>
          <p className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-slate-300 sm:text-xs">
            <MonitorPlay className="size-3 text-primary" aria-hidden />
            8 players · HDMI / Tizen
          </p>
        </div>

        <div className="relative mt-4 grid gap-3 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:items-stretch lg:gap-4">
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <div className="hero-node rounded-xl border border-white/10 bg-white/[0.03] p-2 backdrop-blur-sm">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Salón de ventas
              </p>
              <SignageScreenMock slideIndex={slideIndex} />
            </div>
            <div
              className="hero-node rounded-xl border border-white/10 bg-white/[0.03] p-2 backdrop-blur-sm"
              style={{ animationDelay: "0.35s" }}
            >
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Caja & lobby
              </p>
              <SignageScreenMock slideIndex={slideIndex + 1} compact />
            </div>
          </div>

          <div className="hero-node flex min-h-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-900/80 shadow-inner">
            <div className="flex items-center gap-2 border-b border-white/10 bg-slate-900/90 px-3 py-2">
              <span className="size-2 rounded-full bg-rose-400/90" aria-hidden />
              <span className="size-2 rounded-full bg-amber-400/90" aria-hidden />
              <span className="size-2 rounded-full bg-emerald-400/90" aria-hidden />
              <p className="ml-1 truncate font-mono text-[10px] text-slate-500 sm:text-xs">
                panel.wekoda · signage / campañas
              </p>
            </div>
            <div className="relative flex-1 min-h-[140px] sm:min-h-[180px]">
              <Image
                src={digitalSignageImages.app}
                alt="Panel WeKoda Digital Signage con campañas, biblioteca y canales"
                fill
                className="object-contain object-left-top p-1 sm:p-2"
                sizes="(min-width: 1024px) 28rem, 100vw"
                priority
              />
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/90 to-transparent"
                aria-hidden
              />
            </div>
          </div>
        </div>

        <div className="relative mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm">
            <p className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-200">
              <CalendarRange className="size-3.5 text-primary" aria-hidden />
              Flujo Marketing → IT
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] sm:text-xs">
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-slate-300">
                Borrador
              </span>
              <span className="text-slate-600" aria-hidden>→</span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-amber-100">
                Validación IT
              </span>
              <span className="text-slate-600" aria-hidden>→</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/35 bg-emerald-500/15 px-2 py-0.5 font-medium text-emerald-200">
                <CheckCircle2 className="size-3" aria-hidden />
                Publicado
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm">
            <p className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-200">
              <Sparkles className="size-3.5 text-primary" aria-hidden />
              Entrega & proof-of-play
            </p>
            <p
              key={activeDelivery.player}
              className="hero-log mt-2 font-mono text-[10px] sm:text-[11px]"
            >
              <span className="text-slate-400">{activeDelivery.player}</span>
              <span className="mx-2 text-slate-600" aria-hidden>·</span>
              <span className="text-emerald-400">{activeDelivery.status}</span>
              <span className="mt-0.5 block truncate text-slate-500">{activeDelivery.detail}</span>
            </p>
          </div>
        </div>

        <div className="relative mt-3 flex flex-wrap gap-1.5">
          {["Lobby", "Salón", "Caja 1", "Showroom Pi"].map((channel) => (
            <span
              key={channel}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-medium text-slate-400 sm:text-[10px]"
            >
              <Radio className="size-2.5 text-primary/80" aria-hidden />
              {channel}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
