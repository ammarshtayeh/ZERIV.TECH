/** Canonical site origin — override with NEXT_PUBLIC_SITE_URL on the host. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://zeriv.tech").replace(/\/$/, "");
