"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Code2, X, ArrowRight } from "lucide-react";

const STORAGE_KEY = "wekoda:devblog-invite:dismissed-at";
const SHOW_AFTER_MS = 8000;
const REMIND_AFTER_DAYS = 7;

function shouldShow(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const dismissedAt = window.localStorage.getItem(STORAGE_KEY);
    if (!dismissedAt) return true;
    const ts = Number(dismissedAt);
    if (Number.isNaN(ts)) return true;
    const daysSince = (Date.now() - ts) / (1000 * 60 * 60 * 24);
    return daysSince > REMIND_AFTER_DAYS;
  } catch {
    return true;
  }
}

function persistDismissal() {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // Ignorar si localStorage no está disponible (modo privado, etc.).
  }
}

export function DevBlogInvitePopup() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!shouldShow()) return;
    const timer = window.setTimeout(() => {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    }, SHOW_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted]);

  function handleClose() {
    setVisible(false);
    persistDismissal();
    window.setTimeout(() => setMounted(false), 250);
  }

  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center px-3 pb-4 sm:right-4 sm:left-auto sm:justify-end sm:px-0 sm:pb-6"
      role="dialog"
      aria-labelledby="devblog-invite-title"
      aria-describedby="devblog-invite-body"
      aria-modal="false"
    >
      <div
        className={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl border border-border/60 bg-white shadow-2xl shadow-primary/10 ring-1 ring-black/5 transition-all duration-300 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-primary/70 p-5 text-white">
          <button
            type="button"
            onClick={handleClose}
            data-action="dismiss-devblog-invite"
            data-entity="devblog"
            aria-label="Cerrar invitación al DevBlog"
            className="absolute right-2 top-2 inline-flex size-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <X className="size-4" aria-hidden />
          </button>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest">
            <Code2 className="size-3" aria-hidden />
            Para desarrolladores
          </div>
          <h3
            id="devblog-invite-title"
            className="mt-3 text-lg font-bold leading-snug text-white"
          >
            ¿Te interesa cómo está construida esta plataforma?
          </h3>
        </div>
        <div className="p-5">
          <p
            id="devblog-invite-body"
            className="text-sm leading-relaxed text-muted-foreground"
          >
            En el <span className="font-semibold text-foreground">DevBlog</span> contamos
            arquitectura Zero Trust, device shadow, firmware ESP32 y cómo resolvemos
            automatización y domótica en producción.
          </p>
          <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              data-action="postpone-devblog-invite"
              data-entity="devblog"
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Ahora no
            </button>
            <Link
              href="/devblog"
              onClick={handleClose}
              data-action="open-devblog-from-invite"
              data-entity="devblog"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90"
            >
              Ir al DevBlog
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
