"use client";

import { motion } from "framer-motion";

import {
  GermanyTechnologyBadge,
  LianSadrMelalLogo,
  UbetterLogoWithAiBadge,
} from "@/components/brand-logo";
import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";
import type { Locale } from "@/i18n/config";
import { ui3 } from "@/i18n/locale-ui";

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";
const easeOut = [0.22, 1, 0.36, 1] as const;

export function BrandTrustSection({ locale }: { locale: Locale }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const isRTL = locale === "fa";

  const heading = ui3(locale, "برندهای مورد اعتماد", "Trusted Brands & Partners", "值得信赖的品牌");
  const subtitle = ui3(
    locale,
    "فناوری پیشرفته با پشتوانه تولیدکنندگان معتبر جهانی",
    "Advanced technology backed by trusted global manufacturers",
    "先进技术，值得信赖的全球制造商支持",
  );

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative py-10 sm:py-14 px-4 sm:px-8"
      style={{
        background: C.pageBg,
        borderTop: `1px solid ${C.divider}`,
        borderBottom: `1px solid ${C.divider}`,
      }}
      aria-label={heading}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2
            className="font-bold mb-1.5"
            style={{
              fontFamily: YK,
              fontSize: "clamp(14px, 2vw, 18px)",
              color: C.text1,
              letterSpacing: "0.04em",
            }}
          >
            {heading}
          </h2>
          <p
            className="text-[11px] sm:text-[13px] max-w-md mx-auto leading-relaxed"
            style={{ color: C.text3, fontFamily: YK }}
          >
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.1, duration: 0.65, ease: easeOut }}
          className="grid grid-cols-1 sm:flex sm:flex-row sm:flex-wrap items-center justify-center gap-8 sm:gap-10 md:gap-14"
        >
          {/* UBETTER + AI badge */}
          <div className="flex flex-col items-center gap-2">
            <UbetterLogoWithAiBadge responsive priority />
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider opacity-60">
              UBETTER
            </span>
          </div>

          <Divider C={C} />

          {/* Germany Technology */}
          <GermanyTechnologyBadge size="lg" locale={locale} showLabel />

          <Divider C={C} />

          {/* Lian Sadr Melal */}
          <LianSadrMelalLogo size="lg" locale={locale} showLabel />
        </motion.div>
      </div>
    </section>
  );
}

function Divider({ C }: { C: (typeof DARK_C) | (typeof LIGHT_C) }) {
  return (
    <>
      <div
        className="hidden sm:block w-px self-stretch min-h-[48px] opacity-40"
        style={{ background: C.divider }}
        aria-hidden
      />
      <div
        className="sm:hidden w-16 h-px mx-auto opacity-30"
        style={{ background: C.divider }}
        aria-hidden
      />
    </>
  );
}

/** Compact inline strip for hero or navbar-adjacent placement. */
export function BrandTrustStrip({ locale }: { locale: Locale }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 opacity-90">
      <UbetterLogoWithAiBadge size="sm" />
      <GermanyTechnologyBadge size="sm" locale={locale} />
      <LianSadrMelalLogo size="sm" locale={locale} />
    </div>
  );
}
