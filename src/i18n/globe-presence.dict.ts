import type { Locale } from "@/i18n/config";

export type GlobePresenceCopy = {
  china: {
    badge: string;
    title: string;
    stats: { value: string; unit: string; label: string }[];
  };
  iran: {
    badge: string;
    title: string;
  };
};

export const globePresenceCopy: Record<Locale, GlobePresenceCopy> = {
  en: {
    china: {
      badge: "China HQ",
      title: "UBETTER",
      stats: [
        { value: "60", unit: "", label: "Patents" },
        { value: "16", unit: "", label: "Organizational certificates" },
        { value: "39", unit: "", label: "Product certificates" },
      ],
    },
    iran: {
      badge: "Official partnership · Iran",
      title: "Lian Sadr Mellal",
    },
  },
  fa: {
    china: {
      badge: "مقر چین",
      title: "UBETTER",
      stats: [
        { value: "60", unit: "", label: "ثبت اختراع" },
        { value: "16", unit: "", label: "گواهینامه سازمانی" },
        { value: "39", unit: "", label: "گواهینامه محصول" },
      ],
    },
    iran: {
      badge: "نمایندگی رسمی · ایران",
      title: "شرکت لیان صدر ملل",
    },
  },
  zh: {
    china: {
      badge: "中国总部",
      title: "UBETTER",
      stats: [
        { value: "60", unit: "项", label: "专利" },
        { value: "16", unit: "项", label: "体系 / 组织认证" },
        { value: "39", unit: "项", label: "产品认证" },
      ],
    },
    iran: {
      badge: "官方合作 · 伊朗",
      title: "Lian Sadr Mellal",
    },
  },
  de: {
    china: {
      badge: "China HQ",
      title: "UBETTER",
      stats: [
        { value: "60", unit: "", label: "Patente" },
        { value: "16", unit: "", label: "Organisationszertifikate" },
        { value: "39", unit: "", label: "Produktzertifikate" },
      ],
    },
    iran: {
      badge: "Offizielle Partnerschaft · Iran",
      title: "Lian Sadr Mellal",
    },
  },
};
