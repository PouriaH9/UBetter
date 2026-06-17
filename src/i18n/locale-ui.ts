import type { Locale } from "./config";

export function localeDir(locale: Locale): "rtl" | "ltr" {
  return locale === "fa" ? "rtl" : "ltr";
}

export function localeHtmlLang(locale: Locale): string {
  if (locale === "fa") return "fa";
  if (locale === "zh") return "zh";
  if (locale === "de") return "de";
  return "en";
}

export function localeNumTag(locale: Locale): string {
  if (locale === "fa") return "fa-IR";
  if (locale === "zh") return "zh-CN";
  if (locale === "de") return "de-DE";
  return "en-US";
}

/** Pick localized string; falls back to `en`. */
export function ui(locale: Locale, m: Partial<Record<Locale, string>> & { en: string }): string {
  return m[locale] ?? m.en;
}

/** One string per locale (e.g. nav labels). */
export function uiRecord(locale: Locale, m: Record<Locale, string>): string {
  return m[locale];
}

/** FA / EN / ZH / DE — pass `de` or it falls back to `en`. */
export function ui3(locale: Locale, fa: string, en: string, zh: string, de?: string): string {
  return ui(locale, { fa, en, zh, de: de ?? en });
}

/** Locale-appropriate digits (e.g. ۲۳ for fa, 23 for en/zh/de). */
export function localeNumber(n: number, locale: Locale): string {
  return n.toLocaleString(localeNumTag(locale));
}
