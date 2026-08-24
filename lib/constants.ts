/** Base URL of the product app (dashboard). No trailing slash. */
export function getAppOrigin(): string {
  return (process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.wekoda.lat").replace(/\/$/, "");
}

export function getAppLoginUrl(): string {
  return `${getAppOrigin()}/settings/login`;
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
