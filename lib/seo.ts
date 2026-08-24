export const SITE_NAME = "WeKoda IoT";

export const SITE_DESCRIPTION =
  "Plataforma IoT para gestionar, asegurar y automatizar dispositivos conectados: inventario de flota, OTA remoto, control por espacios y seguridad Zero Trust.";

export const ORGANIZATION = {
  legalName: "WeTech",
  email: "ingenieria@wetechar.com",
  phone: "+541158230996",
  street: "Olleros 3916",
  city: "Ciudad Autónoma de Buenos Aires",
  region: "CABA",
  country: "AR",
  social: [
    "https://www.linkedin.com/company/wetechar",
    "https://www.instagram.com/wetechar",
    "https://x.com/wetechar"
  ]
} as const;

/** Palabras clave objetivo, en el español que usa el mercado local. */
export const SITE_KEYWORDS = [
  "plataforma IoT",
  "gestión de dispositivos IoT",
  "automatización industrial",
  "domótica empresarial",
  "MQTT",
  "Zero Trust IoT",
  "actualización OTA ESP32",
  "repetidor infrarrojo por IP",
  "control remoto IR sobre IP",
  "telemetría en tiempo real",
  "infraestructura edge",
  "ESP32",
  "multi-tenant IoT"
];

/**
 * URL pública del sitio, sin barra final. Debe coincidir con el dominio que
 * Vercel sirve como principal: el apex redirige a www, y declarar el apex como
 * canónico obligaría a los buscadores a un salto extra en cada URL.
 */
export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.wekoda.lat").replace(/\/$/, "");
}

export function absoluteUrl(path = "/"): string {
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
