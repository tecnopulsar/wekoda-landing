/** Base URL of the product app (dashboard). No trailing slash. */
export function getAppOrigin(): string {
  return (process.env.NEXT_PUBLIC_APP_ORIGIN ?? "https://app.wekoda.lat").replace(/\/$/, "");
}

export function getAppLoginUrl(): string {
  return `${getAppOrigin()}/settings/login`;
}
