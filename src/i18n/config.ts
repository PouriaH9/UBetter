export const locales = ["en", "fa", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fa";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/** Path after the first `/{locale}` segment, e.g. `/fa/products` → `/products`. */
export function pathnameWithoutLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}

export function localizedPath(locale: Locale, pathname: string): string {
  const tail = pathnameWithoutLocale(pathname);
  if (tail === "/") return `/${locale}`;
  return `/${locale}${tail}`;
}
