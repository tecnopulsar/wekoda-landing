/**
 * Base URL of the product admin (`iot-over-ip` full). No trailing slash.
 * Set `NEXT_PUBLIC_APP_ORIGIN` only when that admin is deployed (not the Lite repo).
 * `https://app.wekoda.lat` has no DNS — do not use as default.
 */
export function getAppOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_APP_ORIGIN?.trim();
  if (!configured) return "";
  return configured.replace(/\/$/, "");
}

export function getAppLoginUrl(): string {
  const origin = getAppOrigin();
  if (!origin) return "/#contacto";
  return `${origin}/settings/login`;
}

/**
 * Controles de acceso a la app (Iniciar sesión / Empezar ahora → login).
 * Poné `true` cuando el login público vuelva a estar habilitado.
 */
export const SHOW_APP_LOGIN = false;

/** Evento que preselecciona el interés en el formulario de contacto. */
export const SELECT_INTEREST_EVENT = "wekoda:select-interest";

export function requestContactWithInterest(interest: string): void {
  window.dispatchEvent(new CustomEvent(SELECT_INTEREST_EVENT, { detail: interest }));
  document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
