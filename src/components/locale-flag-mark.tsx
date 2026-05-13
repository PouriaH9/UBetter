import type { Locale } from "@/i18n/config";

const ring =
  "shrink-0 rounded-[3px] overflow-hidden ring-1 ring-black/12 dark:ring-white/18";

/** Compact SVG flags for locale switcher (Iran / USA / China). */
export function LocaleFlagMark({ locale }: { locale: Locale }) {
  if (locale === "fa") {
    return (
      <svg className={ring} width="22" height="13" viewBox="0 0 22 13" aria-hidden>
        <rect fill="#239F40" width="22" height="4.33" />
        <rect fill="#FFFFFF" width="22" height="4.34" y="4.33" />
        <rect fill="#DA0000" width="22" height="4.33" y="8.67" />
      </svg>
    );
  }
  if (locale === "zh") {
    return (
      <svg className={ring} width="22" height="15" viewBox="0 0 30 20" aria-hidden>
        <rect fill="#DE2910" width="30" height="20" />
        <path
          fill="#FFDE00"
          d="M7 4l1.55 4.76h5l-4.05 2.94 1.55 4.76L7 13.52 2.95 16.46 4.5 11.7.45 8.76h5z"
        />
        <circle fill="#FFDE00" cx="17.5" cy="4.5" r="1.35" />
        <circle fill="#FFDE00" cx="20.5" cy="7.5" r="1.35" />
        <circle fill="#FFDE00" cx="20.5" cy="11.5" r="1.35" />
        <circle fill="#FFDE00" cx="17.5" cy="14" r="1.35" />
      </svg>
    );
  }
  /* en — USA */
  return (
    <svg className={ring} width="22" height="12" viewBox="0 0 190 100" aria-hidden>
      <rect fill="#B22234" width="190" height="100" />
      <path fill="#FFFFFF" d="M0 7.69h190v7.69H0zm0 15.38h190v7.69H0zm0 15.38h190v7.69H0zm0 15.38h190v7.69H0zm0 15.38h190v7.69H0zm0 15.38h190v7.69H0z" />
      <rect fill="#3C3B6E" width="76" height="53.85" />
      <g fill="#FFFFFF">
        <circle cx="9.5" cy="10" r="3.5" />
        <circle cx="28.5" cy="10" r="3.5" />
        <circle cx="47.5" cy="10" r="3.5" />
        <circle cx="66.5" cy="10" r="3.5" />
        <circle cx="19" cy="26" r="3.5" />
        <circle cx="38" cy="26" r="3.5" />
        <circle cx="57" cy="26" r="3.5" />
        <circle cx="9.5" cy="42" r="3.5" />
        <circle cx="28.5" cy="42" r="3.5" />
        <circle cx="47.5" cy="42" r="3.5" />
        <circle cx="66.5" cy="42" r="3.5" />
      </g>
    </svg>
  );
}

export function localeNavLabel(locale: Locale, size: "short" | "long"): string {
  if (size === "short") {
    switch (locale) {
      case "fa":
        return "فا";
      case "zh":
        return "中文";
      default:
        return "EN";
    }
  }
  switch (locale) {
    case "fa":
      return "فارسی";
    case "zh":
      return "中文";
    default:
      return "English";
  }
}

export function localeSwitchAria(target: Locale): string {
  switch (target) {
    case "fa":
      return "Switch to Persian";
    case "zh":
      return "Switch to Chinese";
    default:
      return "Switch to English";
  }
}
