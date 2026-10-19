/** Panel behind the AWS load balancer. Public hosts log in here. */
export const CLOUD_APP_ORIGIN = 'https://cms.wekoda.lat';

/**
 * Base URL of the product admin (`iot-over-ip` full). No trailing slash.
 * Set `NEXT_PUBLIC_APP_ORIGIN` only to force one destination for every host.
 * Leave it empty so the request host chooses the lab panel or the cloud panel.
 * `https://app.wekoda.lat` has no DNS — do not use as default.
 */
export function getAppOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_APP_ORIGIN?.trim();
  if (!configured) return '';
  return configured.replace(/\/$/, '');
}

type HostParts = { hostname: string; port: string | null };

function splitHostHeader(host: string): HostParts {
  const raw = host.split(',')[0]?.trim() ?? '';
  if (!raw) return { hostname: '', port: null };
  if (raw.startsWith('[')) {
    const end = raw.indexOf(']');
    const hostname = end >= 0 ? raw.slice(1, end) : raw;
    const rest = end >= 0 ? raw.slice(end + 1) : '';
    const port = rest.startsWith(':') ? rest.slice(1) : null;
    return { hostname, port };
  }
  const colon = raw.lastIndexOf(':');
  if (colon > 0 && /^\d+$/.test(raw.slice(colon + 1))) {
    return { hostname: raw.slice(0, colon), port: raw.slice(colon + 1) };
  }
  return { hostname: raw, port: null };
}

function isPrivateHostname(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, '');
  if (
    host === 'localhost' ||
    host === '::1' ||
    host === '0.0.0.0' ||
    host.endsWith('.local')
  ) {
    return true;
  }
  const match = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
  if (!match) return false;
  const octets = match.slice(1).map((part) => Number(part));
  if (octets.some((value) => value > 255)) return false;
  const [a, b] = octets;
  if (a === 10 || a === 127) return true;
  if (a === 192 && b === 168) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  return false;
}

/**
 * Login URL for the current request.
 * `NEXT_PUBLIC_APP_ORIGIN` wins when set.
 * Lab hosts (localhost, loopback, LAN, or port 3010) use that host on port 3001.
 * Public hosts use the cloud panel on the load balancer.
 */
export function getAppLoginUrl(host?: string | null): string {
  const origin = getAppOrigin();
  if (origin) return `${origin}/settings/login`;
  const { hostname, port } = splitHostHeader(host ?? '');
  if (!hostname) return '/#contacto';
  if (isPrivateHostname(hostname) || port === '3010') {
    const bracketed = hostname.includes(':') ? `[${hostname}]` : hostname;
    return `http://${bracketed}:3001/settings/login`;
  }
  return `${CLOUD_APP_ORIGIN}/settings/login`;
}

/**
 * Public login controls (Iniciar sesión / Empezar ahora).
 * The destination still follows the request host.
 */
export const SHOW_APP_LOGIN = true;

/** Evento que preselecciona el interés en el formulario de contacto. */
export const SELECT_INTEREST_EVENT = 'wekoda:select-interest';

export function requestContactWithInterest(interest: string): void {
  window.dispatchEvent(
    new CustomEvent(SELECT_INTEREST_EVENT, { detail: interest }),
  );
  document
    .getElementById('contacto')
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
