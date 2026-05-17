"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { SVGProps } from "react";

import {
  buildAccentGlassSkin,
  GlassPanelBadge,
  GlassShimmerPanel,
  glassPanelItemVariants,
  sectionGlassSkin,
} from "@/components/glass-shimmer-panel";
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
  const glass = sectionGlassSkin(isDark, "card");

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-4% 0px" }}
      transition={{ delay: 0.06 * index, duration: 0.55, ease: easeOut }}
      className="group relative flex h-full min-w-0 gap-3.5 rounded-2xl p-4 sm:gap-4 sm:p-5"
      style={glass}
      whileHover={{
        borderColor: isDark ? "rgba(124,255,0,0.38)" : "rgba(124,255,0,0.28)",
        boxShadow: isDark
          ? "inset 0 1px 0 rgba(124,255,0,0.12), inset 0 -1px 0 rgba(0,0,0,0.35), 0 12px 40px rgba(124,255,0,0.12)"
          : "inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -1px 0 rgba(0,0,0,0.06), 0 12px 36px rgba(124,255,0,0.1)",
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
        <p
          className="text-[12px] leading-relaxed sm:text-[13px]"
          style={{ color: isDark ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.75)" }}
        >
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

  const panelSkin = buildAccentGlassSkin(isDark, C.accent, C.accentGlow);
  const contentGlass = sectionGlassSkin(isDark, "panel");
  const statGlass = sectionGlassSkin(isDark, "card");

  return (
    <section
      dir={t.dir}
      lang={locale === "fa" ? "fa" : locale === "zh" ? "zh" : "en"}
      className={`relative overflow-hidden min-h-[100svh] w-full flex flex-col justify-center pt-10 pb-10 sm:pt-14 sm:pb-14 ${locale !== "fa" ? "font-sans" : ""}`}
      style={{
        fontFamily: locale === "fa" ? YK : undefined,
        borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
      }}
    >
      <CertificatesBackdrop isDark={isDark} />

      <motion.div
        className="relative z-10 flex w-full max-w-[1340px] flex-col gap-8 sm:gap-10 lg:gap-12 mx-auto px-4 sm:px-8 lg:px-12 pointer-events-none"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.75, ease: easeOut }}
      >
        <motion.div className="relative mx-auto w-full max-w-3xl pointer-events-auto">
          <GlassShimmerPanel skin={panelSkin} isDark={isDark} cornerIcon={IconShield} compact>
            <GlassPanelBadge locale={locale} label={copy.badge} skin={panelSkin} reduceMotion={false} />
            <motion.h2
              className="text-center font-black leading-[1.1] px-2"
              style={{
                color: panelSkin.titleColor,
                textShadow: panelSkin.textShadow,
                fontSize: "clamp(1.3rem, 3.2vw, 2.35rem)",
                letterSpacing: locale === "fa" ? "0" : "-0.02em",
              }}
              variants={glassPanelItemVariants}
            >
              {copy.title}
            </motion.h2>
            <motion.p
              className="mx-auto max-w-2xl px-2 text-center leading-relaxed"
              style={{
                color: panelSkin.subtitleColor,
                textShadow: panelSkin.textShadow,
                fontSize: "clamp(13px, 1.4vw, 16px)",
              }}
              variants={glassPanelItemVariants}
            >
              {copy.subtitle}
            </motion.p>
          </GlassShimmerPanel>
        </motion.div>

        <motion.div
          className="relative w-full pointer-events-auto rounded-[20px] p-4 sm:p-6 flex flex-col gap-6 sm:gap-8"
          style={contentGlass}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-6% 0px" }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
            {/* Mobile: icon strip */}
        <motion.div
          className="flex w-full gap-2.5 overflow-x-auto px-1 pb-1 scrollbar-none sm:hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
          variants={glassPanelItemVariants}
        >
          {copy.cards.map((card) => {
            const key = certIconKey(card.title);
            const Icon = CERT_ICONS[key];
            return (
              <motion.div
                key={card.title}
                className="flex w-[4.5rem] flex-shrink-0 flex-col items-center gap-2"
              >
                <motion.div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    background: panelSkin.badgeBg,
                    border: `1px solid ${panelSkin.badgeBorder}`,
                    color: panelSkin.pulse,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span
                  className="text-[9px] font-bold text-center leading-tight"
                  style={{ color: panelSkin.subtitleColor }}
                >
                  {CERT_SHORT_LABEL[key]}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

            <motion.div
              className="mx-auto grid w-full max-w-xl grid-cols-3 gap-3 sm:gap-4"
              variants={glassPanelItemVariants}
            >
              {highlights.map((h) => (
                <motion.div
                  key={h.label}
                  className="rounded-xl px-2 py-3 text-center"
                  style={statGlass}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="font-black text-[15px] sm:text-[18px]" style={{ color: C.accent }}>
                    {h.n}
                  </div>
                  <motion.div className="mt-1 text-[9px] font-semibold leading-tight sm:text-[10px]" style={{ color: panelSkin.subtitleColor }}>
                    {h.label}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-4% 0px" }}
              variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {copy.cards.map((card, i) => (
                <CertificateCard key={card.title} locale={locale} title={card.title} desc={card.desc} index={i} />
              ))}
            </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
