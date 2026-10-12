/** Nombre de marca canónico (siempre esta grafía en SEO visible). */
export const BRAND_NAME = "WeKoda";

export const SITE_NAME = "WeKoda IoT";

/** Variantes y dominio para schema.org y desambiguación frente a búsquedas erróneas (p. ej. Škoda). */
export const BRAND_ALTERNATE_NAMES = ["We Koda", "WeKoda IoT", "wekoda.lat", "WeKoda Signage"] as const;

export const BRAND_DISAMBIGUATION =
  "WeKoda es una marca de plataforma IoT-over-IP y cartelería digital (wekoda.lat). No está relacionada con Škoda Auto ni con vehículos.";

/** Logo oficial WeKoda (wordmark + tagline). */
export const BRAND_LOGO_SRC = "/images/brand/Wekoda-iot_over_ip.png";
export const BRAND_LOGO_ALT = "WeKoda — platform for IoT-over-IP";

export const SITE_DESCRIPTION =
  "WeKoda: CMS Signage e IoT-over-IP para empresas. Cartelería digital, flota y automatización en tu red. Marca tecnológica independiente (no Škoda automotriz).";

export const SITE_DESCRIPTION_SHORT =
  "WeKoda — cartelería digital, CMS Signage y plataforma IoT-over-IP para Marketing, IT y dirección.";

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
  "WeKoda",
  "We Koda",
  "wekoda",
  "wekoda.lat",
  "WeKoda IoT",
  "WeKoda Signage",
  "WeKoda cartelería digital",
  "CMS Signage WeKoda",
  "plataforma IoT-over-IP",
  "cartelería digital empresas",
  "digital signage Samsung Tizen",
  "proof of play",
  "MQTT Zero Trust",
  "domótica empresarial",
  "repetidor infrarrojo por IP",
  "Gateway IoT on-prem"
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
