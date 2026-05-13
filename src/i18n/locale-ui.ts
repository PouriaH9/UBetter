import type { Locale } from "./config";

export function localeDir(locale: Locale): "rtl" | "ltr" {
  return locale === "fa" ? "rtl" : "ltr";
}

/** One string per locale (e.g. nav labels). */
export function uiRecord(locale: Locale, m: Record<Locale, string>): string {
  return m[locale];
}

/** FA / EN / ZH triple (most common in this codebase). */
export function ui3(locale: Locale, fa: string, en: string, zh: string): string {
  if (locale === "fa") return fa;
  if (locale === "zh") return zh;
  return en;
}
