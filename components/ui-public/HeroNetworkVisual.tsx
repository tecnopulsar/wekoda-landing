"use client";

import { useEffect, useState } from "react";
import { Activity, Lightbulb, Radio, Server, ShieldCheck, Thermometer } from "lucide-react";

const edgeDevices = [
  { id: "ir-repeater", label: "IR Repeater", model: "esp32-eth", Icon: Radio },
  { id: "sensor-node", label: "Nodo sensor", model: "temp / hum", Icon: Thermometer },
  { id: "led-dimmer", label: "Dimmer LED", model: "esp32-c3", Icon: Lightbulb }
] as const;

const eventLines = [
  { topic: "devices/ir-a3f1/telemetry", detail: "rssi −52 dBm" },
  { topic: "devices/dimmer-9c2/shadow", detail: "reported ok" },
  { topic: "devices/ir-a3f1/cmd", detail: "ack 42 ms" },
  { topic: "devices/sensor-7b4/telemetry", detail: "24.6 °C" },
  { topic: "internal/acl", detail: "allow scope org" }
] as const;

const VISIBLE_LINES = 3;
const LINE_ROTATION_MS = 2200;

export function HeroNetworkVisual() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setOffset((current) => (current + 1) % eventLines.length);
    }, LINE_ROTATION_MS);
    return () => window.clearInterval(interval);
  }, []);

  const visibleEvents = Array.from({ length: VISIBLE_LINES }, (_, index) => {
    const line = eventLines[(offset + index) % eventLines.length];
    return { ...line, key: `${line.topic}-${(offset + index) % eventLines.length}` };
  });

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute -inset-6 -z-10 hero-glow rounded-[2rem] bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.35),transparent_60%),radial-gradient(circle_at_75%_70%,hsl(var(--secondary)/0.25),transparent_60%)] blur-2xl" />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-4 shadow-2xl shadow-primary/20 sm:p-5 md:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:28px_28px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.18),transparent_55%)]" />

        <div className="relative flex items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:text-xs">
            <span className="relative flex size-2">
              <span className="hero-ping absolute inline-flex size-full rounded-full bg-emerald-400/70" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Red operativa
          </p>
          <p className="font-mono text-[10px] text-slate-500 sm:text-xs">mqtt/tls · ws</p>
        </div>

        <div className="relative mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1.5 sm:gap-3">
          <div className="flex flex-col gap-2">
            {edgeDevices.map(({ id, label, model, Icon }, index) => (
              <div
                key={id}
                className="hero-node flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur-sm sm:gap-2.5 sm:p-2.5"
                style={{ animationDelay: `${index * 0.45}s` }}
              >
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary sm:size-8">
                  <Icon className="size-3.5 sm:size-4" aria-hidden />
                </span>
                <span className="min-w-0 hidden sm:block">
                  <span className="block truncate text-xs font-medium text-slate-100">{label}</span>
                  <span className="block truncate font-mono text-[10px] text-slate-500">{model}</span>
                </span>
                <span className="ml-auto size-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
              </div>
            ))}
          </div>

          <div className="hero-wire h-px w-full min-w-6" aria-hidden />

          <div className="flex flex-col items-center gap-2">
            <div className="hero-core relative flex size-14 items-center justify-center rounded-2xl border border-primary/40 bg-primary/15 text-primary sm:size-16">
              <Server className="size-6 sm:size-7" aria-hidden />
            </div>
            <p className="text-center text-[10px] font-semibold uppercase tracking-widest text-slate-300 sm:text-xs">
              Gateway
            </p>
            <p className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-medium text-slate-300 sm:text-[10px]">
              <ShieldCheck className="size-3 text-emerald-400" aria-hidden />
              Zero Trust
            </p>
          </div>
        </div>

        <div className="relative mt-4 flex items-center gap-2 sm:gap-3">
          <div className="hero-wire hero-wire-reverse h-px flex-1" aria-hidden />
          <p className="font-mono text-[9px] uppercase tracking-widest text-slate-500 sm:text-[10px]">
            websocket
          </p>
          <div className="hero-wire hero-wire-reverse h-px flex-1" aria-hidden />
        </div>

        <div className="relative mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-200">
              <Activity className="size-3.5 text-primary" aria-hidden />
              Panel WeKoda
            </p>
            <p className="font-mono text-[10px] text-emerald-400">2.148 online</p>
          </div>

          <div className="mt-3 flex h-10 items-end gap-1">
            {[45, 70, 38, 88, 60, 96, 52, 74, 41, 82, 63, 90].map((height, index) => (
              <span
                key={`${height}-${index}`}
                className="hero-bar flex-1 rounded-sm bg-gradient-to-t from-primary/30 to-primary"
                style={{ height: `${height}%`, animationDelay: `${index * 0.12}s` }}
              />
            ))}
          </div>

          <ul className="mt-3 space-y-1 border-t border-white/10 pt-2.5">
            {visibleEvents.map((event, index) => (
              <li
                key={event.key}
                className="hero-log flex items-center justify-between gap-2 font-mono text-[10px] sm:text-[11px]"
                style={{ opacity: 1 - index * 0.28 }}
              >
                <span className="truncate text-slate-400">{event.topic}</span>
                <span className="shrink-0 text-emerald-400">{event.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
