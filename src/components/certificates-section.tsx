"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { SVGProps } from "react";

import { useHomeGlobeJourneyOptional } from "@/contexts/home-globe-journey-context";
import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";
import type { Locale } from "@/i18n/config";
import { homeSectionsCopy } from "@/i18n/home-sections.dict";
import { translations } from "@/i18n/translations";

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";
const easeOut = [0.22, 1, 0.36, 1] as const;

type CertIconKey = "iso" | "ce" | "iec" | "un" | "rohs" | "patent";

function certIconKey(title: string): CertIconKey {
  if (title.startsWith("ISO")) return "iso";
  if (title.startsWith("CE")) return "ce";
  if (title.startsWith("IEC")) return "iec";
  if (title.startsWith("UN")) return "un";
  if (title.startsWith("RoHS")) return "rohs";
  return "patent";
}

function IconIso(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.2.47.31.98.33 1.51V11a2 2 0 1 1 0 4h-.09c-.02.53-.13 1.04-.33 1.51Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconShield(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBatterySafe(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="2" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M22 11v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 11v4M10 11v4M14 11v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function IconTransport(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M15 18H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="18" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconEco(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconPatent(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M9 18h6M10 22h4M12 2v2M4.93 4.93l1.41 1.41M2 12h2M4.93 19.07l1.41-1.41M19.07 4.93l-1.41 1.41M22 12h-2M19.07 19.07l-1.41-1.41"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 6a4 4 0 0 1 4 4c0 2.5-2 4-4 6-2-2-4-3.5-4-6a4 4 0 0 1 4-4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CERT_ICONS: Record<CertIconKey, typeof IconIso> = {
  iso: IconIso,
  ce: IconShield,
  iec: IconBatterySafe,
  un: IconTransport,
  rohs: IconEco,
  patent: IconPatent,
};

const CERT_SHORT_LABEL: Record<CertIconKey, string> = {
  iso: "ISO",
  ce: "CE",
  iec: "IEC",
  un: "UN",
  rohs: "RoHS",
  patent: "IP",
};

const FLOATING_BADGES: { key: CertIconKey; label: string; pos: string }[] = [
  { key: "iso", label: "ISO", pos: "top-[8%] left-[4%]" },
  { key: "ce", label: "CE", pos: "top-[14%] right-[5%]" },
  { key: "iec", label: "IEC", pos: "bottom-[28%] left-[6%]" },
  { key: "un", label: "UN", pos: "bottom-[22%] right-[4%]" },
];

function CertificatesBackdrop({ isDark }: { isDark: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: easeOut }}
      style={{
        background: isDark
          ? "linear-gradient(165deg, #060806 0%, #0a0c08 40%, #050505 100%)"
          : "linear-gradient(165deg, #f4f6f0 0%, #eef2e8 50%, #e8ece4 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.35] sm:opacity-40"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(circle at 20% 30%, rgba(124,255,0,0.12) 0%, transparent 45%), radial-gradient(circle at 85% 70%, rgba(124,255,0,0.08) 0%, transparent 40%)"
            : "radial-gradient(circle at 20% 30%, rgba(124,255,0,0.18) 0%, transparent 45%), radial-gradient(circle at 85% 70%, rgba(124,255,0,0.12) 0%, transparent 40%)",
        }}
      />

      {/* Desktop-only floating badges */}
      <motion.div
        className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(70vw,420px)] aspect-square opacity-[0.12]"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
          <circle cx="100" cy="100" r="94" stroke="rgba(124,255,0,0.35)" strokeWidth="0.75" strokeDasharray="6 10" />
          <circle cx="100" cy="100" r="70" stroke="rgba(124,255,0,0.2)" strokeWidth="0.5" strokeDasharray="3 8" />
        </svg>
      </motion.div>

      {FLOATING_BADGES.map((b, i) => {
        const Icon = CERT_ICONS[b.key];
        return (
          <motion.div
            key={b.key}
            className={`absolute hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full ${b.pos}`}
            style={{
              background: isDark ? "rgba(124,255,0,0.08)" : "rgba(124,255,0,0.12)",
              border: `1px solid ${isDark ? "rgba(124,255,0,0.22)" : "rgba(124,255,0,0.28)"}`,
              color: "rgba(124,255,0,0.75)",
            }}
            animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold tracking-wider">{b.label}</span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function CertificateCard({
  locale,
  title,
  desc,
  index,
}: {
  locale: Locale;
  title: string;
  desc: string;
  index: number;
}) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const key = certIconKey(title);
  const Icon = CERT_ICONS[key];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-4% 0px" }}
      transition={{ delay: 0.06 * index, duration: 0.55, ease: easeOut }}
      className="group relative flex gap-3.5 sm:gap-4 rounded-2xl p-4 sm:p-5 h-full min-w-0"
      style={{
        background: isDark ? "rgba(12,14,10,0.72)" : "rgba(255,255,255,0.88)",
        border: `1px solid ${isDark ? "rgba(124,255,0,0.18)" : "rgba(124,255,0,0.2)"}`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.35)" : "0 8px 28px rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{
          background: C.accentBg,
          border: `1px solid ${C.accentBorder}`,
          color: C.accent,
          boxShadow: `0 0 20px ${C.accentGlow}`,
        }}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <motion.div className="flex flex-col gap-1 min-w-0 flex-1">
        <h3
          className="font-bold text-[14px] sm:text-[16px] leading-snug"
          style={{ color: C.text1, fontFamily: locale === "fa" ? YK : undefined }}
        >
          {title}
        </h3>
        <p className="text-[12px] sm:text-[13px] leading-relaxed" style={{ color: C.text2 }}>
          {desc}
        </p>
      </motion.div>
    </motion.article>
  );
}

export function HomeCertificatesSection({ locale }: { locale: Locale }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const copy = homeSectionsCopy[locale].certificates;
  const t = translations[locale];
  const showGlobeThrough = useHomeGlobeJourneyOptional()?.showGlobeBackdrop ?? false;

  const highlights =
    locale === "fa"
      ? [
          { n: "۶+", label: "گواهی بین‌المللی" },
          { n: "ISO", label: "مدیریت کیفیت" },
          { n: "CE/UL", label: "ایمنی صادراتی" },
        ]
      : locale === "zh"
        ? [
            { n: "6+", label: "国际认证" },
            { n: "ISO", label: "质量管理" },
            { n: "CE/UL", label: "出口安全" },
          ]
        : [
            { n: "6+", label: "Global certs" },
            { n: "ISO", label: "Quality mgmt" },
            { n: "CE/UL", label: "Export safety" },
          ];

  return (
    <section
      dir={t.dir}
      lang={locale === "fa" ? "fa" : locale === "zh" ? "zh" : "en"}
      className={`relative overflow-hidden py-12 sm:py-16 lg:py-20 ${locale !== "fa" ? "font-sans" : ""}`}
      style={{
        fontFamily: locale === "fa" ? YK : undefined,
        borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
        background: showGlobeThrough
          ? isDark
            ? "linear-gradient(165deg, rgba(6,8,6,0.48) 0%, rgba(10,12,8,0.52) 45%, rgba(5,5,5,0.58) 100%)"
            : "linear-gradient(165deg, rgba(244,246,240,0.5) 0%, rgba(238,242,232,0.55) 45%, rgba(232,236,228,0.62) 100%)"
          : undefined,
      }}
    >
      {showGlobeThrough ? null : <CertificatesBackdrop isDark={isDark} />}

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.header
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <motion.div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-[0.18em] mb-3 sm:mb-4 ${locale === "en" ? "uppercase" : ""}`}
            style={{
              background: C.accentBg,
              border: `1px solid ${C.accentBorder}`,
              color: C.accent,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: C.accent }} />
            {copy.badge}
          </motion.div>
          <h2
            className="font-black leading-[1.15] mb-2 sm:mb-3"
            style={{
              color: C.text1,
              fontSize: "clamp(1.25rem, 4.5vw, 2.35rem)",
              letterSpacing: locale === "fa" ? "0" : "-0.02em",
            }}
          >
            {copy.title}
          </h2>
          <p
            className="leading-relaxed px-1"
            style={{ color: C.text2, fontSize: "clamp(12px, 3.2vw, 15px)" }}
          >
            {copy.subtitle}
          </p>
        </motion.header>

        {/* Mobile: icon strip + stats */}
        <motion.div
          className="flex sm:hidden gap-2 overflow-x-auto pb-1 mb-5 -mx-1 px-1 scrollbar-none"
          style={{ WebkitOverflowScrolling: "touch" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {copy.cards.map((card) => {
            const key = certIconKey(card.title);
            const Icon = CERT_ICONS[key];
            return (
              <motion.div
                key={card.title}
                className="flex-shrink-0 flex flex-col items-center gap-1.5 w-[4.25rem]"
              >
                <motion.div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: C.accentBg,
                    border: `1px solid ${C.accentBorder}`,
                    color: C.accent,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span
                  className="text-[9px] font-bold text-center leading-tight"
                  style={{ color: C.text2 }}
                >
                  {CERT_SHORT_LABEL[key]}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats pills */}
        <motion.div
          className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8 max-w-lg sm:max-w-xl mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.55 }}
        >
          {highlights.map((h) => (
            <div
              key={h.label}
              className="text-center rounded-xl py-2.5 sm:py-3 px-2"
              style={{
                background: isDark ? "rgba(124,255,0,0.06)" : "rgba(124,255,0,0.1)",
                border: `1px solid ${isDark ? "rgba(124,255,0,0.15)" : "rgba(124,255,0,0.22)"}`,
              }}
            >
              <div className="font-black text-[15px] sm:text-[17px]" style={{ color: C.accent }}>
                {h.n}
              </div>
              <motion.div className="text-[9px] sm:text-[10px] font-semibold mt-0.5 leading-tight" style={{ color: C.text2 }}>
                {h.label}
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Cards — single column mobile, 2 col tablet, 3 col desktop */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-4% 0px" }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {copy.cards.map((card, i) => (
            <CertificateCard key={card.title} locale={locale} title={card.title} desc={card.desc} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
