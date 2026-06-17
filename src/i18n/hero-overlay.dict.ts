import type { Locale } from "@/i18n/config";

export type HeroOverlayCopy = {
  titleLines: string[];
  taglinePrefix: string;
  taglineAccent: string;
  /** Optional second accent line (e.g. "ALL IN ONE" on mobile for FA). */
  taglineBrand?: string;
  ctaProducts: string;
};

export const heroOverlayCopy: Record<Locale, HeroOverlayCopy> = {
  fa: {
    titleLines: [
      "انرژی بدون وقفه،",
      "نسل جدید",
      "ذخیره‌ساز انرژی",
      "هوشمند AI",
    ],
    taglinePrefix: "نسل جدید",
    taglineAccent: "ذخیره‌ساز انرژی",
    taglineBrand: "ALL IN ONE",
    ctaProducts: "مشاهده محصولات",
  },
  en: {
    titleLines: ["Uninterrupted Power — Next-Gen Smart AI Energy Storage"],
    taglinePrefix: "Next Generation",
    taglineAccent: "ALL IN ONE Energy Storage",
    ctaProducts: "Explore Products",
  },
  zh: {
    titleLines: ["不间断能源，新一代智能 AI 储能系统"],
    taglinePrefix: "新一代",
    taglineAccent: "ALL IN ONE 储能系统",
    ctaProducts: "浏览产品",
  },
  de: {
    titleLines: [
      "Unterbrechungsfreie Energie — KI-Energiespeicher der neuen Generation",
    ],
    taglinePrefix: "Neue Generation",
    taglineAccent: "ALL IN ONE Energiespeicher",
    ctaProducts: "Produkte entdecken",
  },
};
