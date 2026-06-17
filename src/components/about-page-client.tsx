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

      <div className="flex-1 max-w-[820px] mx-auto w-full px-6 sm:px-10 pt-28 pb-20">
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="flex items-center gap-2 mb-8 text-[12px] flex-wrap"
          style={{ color: C.text3 }}
        >
          <Link href={`/${locale}`} className="transition-colors hover:opacity-80" style={{ color: C.text3 }}>
            {ui(locale, { fa: "خانه", en: "Home", zh: "首页", de: "Startseite" })}
          </Link>
          <Chevron isRTL={isRTL} />
          <span style={{ color: C.text1 }}>
            {ui(locale, { fa: "درباره ما", en: "About", zh: "关于我们", de: "Über uns" })}
          </span>
        </motion.nav>

        <motion.article
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: easeOut, delay: 0.05 }}
          className="rounded-3xl px-6 py-8 sm:px-10 sm:py-11"
          style={{
            background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
            boxShadow: isDark ? "0 24px 60px rgba(0,0,0,0.22)" : "0 20px 50px rgba(0,0,0,0.04)",
          }}
        >
          <div className="space-y-7 sm:space-y-8">
            {t.about.paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: easeOut, delay: 0.08 + index * 0.05 }}
                className={index === 0 ? "font-semibold" : ""}
                style={{
                  color: index === 0 ? C.text1 : C.text2,
                  fontSize: index === 0 ? "clamp(15px, 1.6vw, 17px)" : "clamp(14px, 1.45vw, 15.5px)",
                  lineHeight: index === 0 ? 2.05 : 2,
                  textAlign: "justify",
                  fontFamily: locale === "fa" ? YK : undefined,
                  paddingBottom: index < t.about.paragraphs.length - 1 ? "0.25rem" : undefined,
                  borderBottom:
                    index < t.about.paragraphs.length - 1
                      ? `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`
                      : undefined,
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.article>
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

