export const locales = ["en", "fa", "zh", "de"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fa";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/** Path after the first `/{locale}` segment, e.g. `/fa/products` or `/en/products` → `/products`. */
export function pathnameWithoutLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && locales.includes(segments[0] as Locale)) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}

export function localeFromPathname(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0];
  if (first && isLocale(first) && first !== defaultLocale) {
    return first;
  }
  return defaultLocale;
}

/** Public URL for a locale + path. Persian (default) has no `/fa` prefix. */
export function localePath(locale: Locale, pathname: string): string {
  const tail = pathnameWithoutLocale(pathname);
  if (locale === defaultLocale) {
    return tail;
  }
  if (tail === "/") {
    return `/${locale}`;
  }
  return `/${locale}${tail}`;
}

export function localizedPath(locale: Locale, pathname: string): string {
  return localePath(locale, pathname);
}
