import Link from "next/link";
import { MapPin, Phone, Mail, Linkedin, Instagram } from "lucide-react";
import { getAppLoginUrl, SHOW_APP_LOGIN } from "@/lib/constants";

/** Actualizar con las URLs oficiales de la marca cuando estén disponibles. */
const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/wetechar",
  instagram: "https://www.instagram.com/wetechar",
  x: "https://x.com/wetechar"
} as const;

const CONTACT = {
  addressLines: ["Olleros 3916", "CABA — Buenos Aires", "Argentina"],
  mapsQuery: "Olleros+3916+C1427+CABA+Argentina",
  phoneDisplay: "+54 11 5823-0996",
  phoneTel: "+541158230996",
  email: "ingenieria@wetechar.com"
} as const;

export function PublicFooter() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${CONTACT.mapsQuery}`;

  return (
    <footer className="border-t border-white/10 bg-black text-zinc-300">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <p className="text-lg font-black tracking-tighter">
              <span className="text-secondary">We</span>
              <span className="text-primary">Koda</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-400">
              Plataforma de orquestación y seguridad para dispositivos en el edge.
            </p>
            <p className="mt-6 text-xs text-zinc-500">
              © {new Date().getFullYear()} We Koda. Todos los derechos reservados.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Contacto
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                  data-action="open-map"
                  data-entity="contact"
                >
                  {CONTACT.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-primary" aria-hidden />
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="transition-colors hover:text-white"
                  data-action="call-phone"
                  data-entity="contact"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-primary" aria-hidden />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="break-all transition-colors hover:text-white"
                  data-action="open-email"
                  data-entity="contact"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Redes sociales
            </h3>
            <p className="mt-4 text-sm text-zinc-400">
              Seguinos para novedades de producto y arquitectura edge.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 transition-colors hover:border-primary/50 hover:bg-white/10 hover:text-primary"
                aria-label="We Koda en LinkedIn"
                data-action="open-social"
                data-entity="linkedin"
              >
                <Linkedin className="size-5" aria-hidden />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 transition-colors hover:border-primary/50 hover:bg-white/10 hover:text-primary"
                aria-label="We Koda en Instagram"
                data-action="open-social"
                data-entity="instagram"
              >
                <Instagram className="size-5" aria-hidden />
              </a>
              <a
                href={SOCIAL_LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 transition-colors hover:border-primary/50 hover:bg-white/10 hover:text-primary"
                aria-label="We Koda en X"
                data-action="open-social"
                data-entity="x"
              >
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  aria-hidden
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Legal y acceso
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link
                  href="/soluciones/ir-repeater"
                  className="text-zinc-400 transition-colors hover:text-white"
                  data-action="nav-ir-repeater-footer"
                  data-entity="ir-repeater"
                >
                  IR Repeater
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 transition-colors hover:text-white">
                  Términos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 transition-colors hover:text-white">
                  Privacidad
                </Link>
              </li>
              {SHOW_APP_LOGIN ? (
                <li>
                  <a
                    href={getAppLoginUrl()}
                    className="font-medium text-primary transition-colors hover:text-primary/90 hover:underline"
                    data-action="nav-login-footer"
                    data-entity="session"
                  >
                    Iniciar sesión
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
