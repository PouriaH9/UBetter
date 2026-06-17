"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import SharedNavbar from "@/components/shared-navbar";
import SharedFooter from "@/components/shared-footer";
import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";
import type { Locale } from "@/i18n/config";
import { localeDir, ui } from "@/i18n/locale-ui";
import { translations } from "@/i18n/translations";

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";
const easeOut = [0.22, 1, 0.36, 1] as const;

export default function AboutPageClient({ locale }: { locale: Locale }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const dir = localeDir(locale);
  const isRTL = locale === "fa";
  const t = translations[locale];

  return (
    <motion.div
      className="overflow-x-hidden min-h-screen flex flex-col"
      style={{ background: C.pageBg, color: C.text1, transition: "background 0.35s ease, color 0.35s ease" }}
      dir={dir}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <SharedNavbar locale={locale} activePage="home" />

      <div className="flex-1 max-w-[900px] mx-auto w-full px-6 sm:px-10 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-10"
        >
          <nav className="flex items-center gap-2 mb-4 text-[12px] flex-wrap" style={{ color: C.text3 }}>
            <Link href={`/${locale}`} className="transition-colors hover:opacity-80" style={{ color: C.text3 }}>
              {ui(locale, { fa: "خانه", en: "Home", zh: "首页", de: "Startseite" })}
            </Link>
            <Chevron isRTL={isRTL} />
            <span style={{ color: C.text1 }}>
              {ui(locale, { fa: "درباره ما", en: "About", zh: "关于我们", de: "Über uns" })}
            </span>
          </nav>

          <h1
            className="font-black mb-3 leading-tight"
            style={{ fontFamily: locale === "fa" ? YK : undefined, fontSize: "clamp(26px, 3.2vw, 42px)" }}
          >
            {t.about.title}
          </h1>
          <p style={{ color: C.text3, fontSize: "15px", lineHeight: 1.9, fontFamily: locale === "fa" ? YK : undefined }}>
            {t.about.p1}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.06 }}
          className="rounded-3xl p-6 sm:p-8 space-y-6"
          style={{
            background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
          }}
        >
          <p style={{ color: C.text2, fontSize: "14px", lineHeight: 1.9, fontFamily: locale === "fa" ? YK : undefined }}>
            {t.about.p2}
          </p>

          <div style={{ height: "1px", background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {t.about.kpis.map((kpi) => (
              <div
                key={kpi}
                className="rounded-2xl px-4 py-3 text-[13px] font-semibold"
                style={{
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)"}`,
                  background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)",
                  color: C.text2,
                  fontFamily: locale === "fa" ? YK : undefined,
                }}
              >
                {kpi}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <SharedFooter locale={locale} />
    </motion.div>
  );
}

function Chevron({ isRTL }: { isRTL: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={isRTL ? "rotate-180" : ""} aria-hidden>
      <path
        d="M4.5 3l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

