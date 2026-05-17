"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";
import { useHomeGlobeJourneyOptional } from "@/contexts/home-globe-journey-context";
import type { Locale } from "@/i18n/config";
import { homeSectionsCopy, type HomeSectionBlock } from "@/i18n/home-sections.dict";
import { translations } from "@/i18n/translations";

const CATALOG_PDF_URL = "/UBETTER-Catalog.pdf";
const CATALOG_DOWNLOAD_NAME = "UBETTER-Catalog.pdf";

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";
const easeOut = [0.22, 1, 0.36, 1] as const;

const SECTION_GRADIENTS = {
  services: {
    dark: "radial-gradient(ellipse 90% 60% at 20% 30%, rgba(124,255,0,0.09) 0%, transparent 55%), linear-gradient(165deg, #060806 0%, #0a0c08 45%, #050505 100%)",
    light: "radial-gradient(ellipse 90% 60% at 20% 30%, rgba(124,255,0,0.12) 0%, transparent 55%), linear-gradient(165deg, #f4f6f0 0%, #eef2e8 45%, #e8ece4 100%)",
  },
  certificates: {
    dark: "radial-gradient(ellipse 80% 50% at 80% 20%, rgba(124,255,0,0.07) 0%, transparent 50%), linear-gradient(180deg, #050505 0%, #0a0a0a 100%)",
    light: "radial-gradient(ellipse 80% 50% at 80% 20%, rgba(124,255,0,0.1) 0%, transparent 50%), linear-gradient(180deg, #f0f0f0 0%, #e8ebe4 100%)",
  },
  projects: {
    dark: "radial-gradient(ellipse 70% 55% at 50% 100%, rgba(124,255,0,0.08) 0%, transparent 60%), linear-gradient(180deg, #080808 0%, #0d0d0d 100%)",
    light: "radial-gradient(ellipse 70% 55% at 50% 100%, rgba(124,255,0,0.1) 0%, transparent 60%), linear-gradient(180deg, #f2f2f2 0%, #eaecea 100%)",
  },
  articles: {
    dark: "linear-gradient(135deg, #050505 0%, #0c0e0a 50%, #080808 100%)",
    light: "linear-gradient(135deg, #f0f0f0 0%, #eef0ea 50%, #e8e8e8 100%)",
  },
  catalog: {
    dark: "radial-gradient(ellipse 100% 70% at 50% 0%, rgba(124,255,0,0.06) 0%, transparent 55%), linear-gradient(180deg, #0a0a0a 0%, #050505 100%)",
    light: "radial-gradient(ellipse 100% 70% at 50% 0%, rgba(124,255,0,0.1) 0%, transparent 55%), linear-gradient(180deg, #f4f4f4 0%, #eceee8 100%)",
  },
  contact: {
    dark: "radial-gradient(ellipse 90% 65% at 50% 40%, rgba(124,255,0,0.1) 0%, transparent 65%), linear-gradient(180deg, #060806 0%, #050505 100%)",
    light: "radial-gradient(ellipse 90% 65% at 50% 40%, rgba(124,255,0,0.14) 0%, transparent 65%), linear-gradient(180deg, #f0f4ec 0%, #e8ece4 100%)",
  },
} as const;

type SectionKey = keyof typeof SECTION_GRADIENTS;

function SectionHeroBackground({
  desktop,
  mobile,
  isDark,
  variant = "default",
}: {
  desktop: StaticImageData;
  mobile: StaticImageData;
  isDark: boolean;
  variant?: "default" | "garanty";
}) {
  const isGaranty = variant === "garanty";

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      aria-hidden
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: easeOut }}
      style={isGaranty && !isDark ? { background: "#f5e8ea" } : undefined}
    >
      {/* Wide desktop art (1700×1550) — md+ tablets & desktops */}
      <Image
        src={desktop}
        alt=""
        fill
        className={
          isGaranty
            ? "hidden md:block object-cover object-[72%_42%] xl:object-[68%_38%]"
            : "hidden sm:block object-cover object-center"
        }
        sizes={isGaranty ? "(min-width: 768px) 100vw" : "100vw"}
        quality={isGaranty ? 92 : 88}
      />
      <Image
        src={mobile}
        alt=""
        fill
        className={isGaranty ? "object-cover object-top md:hidden" : "object-cover object-top sm:hidden"}
        sizes={isGaranty ? "(max-width: 767px) 100vw" : "100vw"}
        quality={88}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background: isDark
            ? isGaranty
              ? "linear-gradient(to bottom, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.52) 45%, rgba(0,0,0,0.68) 100%), linear-gradient(90deg, rgba(0,0,0,0.14) 0%, transparent 42%)"
              : "linear-gradient(to bottom, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0.58) 45%, rgba(0,0,0,0.72) 100%), linear-gradient(90deg, rgba(0,0,0,0.18) 0%, transparent 50%)"
            : isGaranty
              ? "linear-gradient(to bottom, rgba(255,252,252,0.08) 0%, rgba(255,246,248,0.04) 50%, rgba(252,238,242,0.1) 100%), linear-gradient(90deg, rgba(255,252,252,0.04) 0%, transparent 35%)"
              : "linear-gradient(to bottom, rgba(255,252,252,0.4) 0%, rgba(255,246,248,0.28) 50%, rgba(252,238,242,0.36) 100%)",
        }}
      />
    </motion.div>
  );
}

function SectionShell({
  locale,
  sectionId,
  gradientKey,
  copy,
  children,
  className = "",
  heroArt,
  globeBackdrop = false,
}: {
  locale: Locale;
  sectionId?: string;
  gradientKey: SectionKey;
  copy: HomeSectionBlock;
  children: ReactNode;
  className?: string;
  heroArt?: { desktop: StaticImageData; mobile: StaticImageData; variant?: "default" | "garanty" };
  globeBackdrop?: boolean;
}) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const t = translations[locale];
  const grad = SECTION_GRADIENTS[gradientKey][isDark ? "dark" : "light"];
  const journey = useHomeGlobeJourneyOptional();
  const showGlobeThrough = globeBackdrop && (journey?.showGlobeBackdrop ?? false) && !heroArt;

  return (
    <section
      id={sectionId}
      dir={t.dir}
      lang={locale === "fa" ? "fa" : locale === "zh" ? "zh" : "en"}
      className={`relative overflow-hidden min-h-[100svh] flex flex-col justify-center py-14 sm:py-16 ${locale !== "fa" ? "font-sans" : ""} ${className}`}
      style={{
        background: showGlobeThrough
          ? isDark
            ? "linear-gradient(165deg, rgba(6,8,6,0.48) 0%, rgba(10,12,8,0.52) 45%, rgba(5,5,5,0.58) 100%)"
            : "linear-gradient(165deg, rgba(244,246,240,0.5) 0%, rgba(238,242,232,0.55) 45%, rgba(232,236,228,0.62) 100%)"
          : heroArt
            ? undefined
            : grad,
        fontFamily: locale === "fa" ? YK : undefined,
        borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
      }}
    >
      {heroArt ? (
        <SectionHeroBackground
          desktop={heroArt.desktop}
          mobile={heroArt.mobile}
          isDark={isDark}
          variant={heroArt.variant}
        />
      ) : null}
      <motion.div
        className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.75, ease: easeOut }}
      >
        <header
          className="text-center mx-auto max-w-3xl w-full mb-8 sm:mb-10"
          style={{
            background: isDark ? "rgba(8,10,8,0.55)" : "rgba(255,255,255,0.82)",
            backdropFilter: "blur(10px) saturate(120%)",
            WebkitBackdropFilter: "blur(10px) saturate(120%)",
            borderRadius: "22px",
            border: `1px solid ${isDark ? "rgba(124,255,0,0.2)" : "rgba(124,255,0,0.15)"}`,
            boxShadow: isDark
              ? "inset 0 1px 0 rgba(124,255,0,0.08), 0 12px 48px rgba(0,0,0,0.45)"
              : "inset 0 1px 0 rgba(255,255,255,0.5), 0 12px 40px rgba(0,0,0,0.08)",
            padding: "20px 24px 22px",
          }}
        >
          <motion.div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] mb-4 ${locale === "en" ? "uppercase" : ""}`}
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
            className="font-black leading-[1.1] mb-3"
            style={{
              color: C.text1,
              fontSize: "clamp(1.35rem, 3.2vw, 2.5rem)",
              letterSpacing: locale === "fa" ? "0" : "-0.02em",
            }}
          >
            {copy.title}
          </h2>
          <p
            className="max-w-2xl mx-auto leading-relaxed"
            style={{ color: C.text2, fontSize: "clamp(13px, 1.35vw, 16px)" }}
          >
            {copy.subtitle}
          </p>
        </header>
        {children}
      </motion.div>
    </section>
  );
}

function FeatureCard({
  locale,
  title,
  desc,
  tag,
  index,
}: {
  locale: Locale;
  title: string;
  desc: string;
  tag?: string;
  index: number;
}) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ delay: 0.08 * index, duration: 0.6, ease: easeOut }}
      className="rounded-2xl p-5 sm:p-6 flex flex-col gap-3 h-full"
      style={{
        background: C.card,
        border: `1px solid ${C.cardBorder}`,
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
      }}
      whileHover={{
        borderColor: C.cardBorderHv,
        boxShadow: isDark ? "0 8px 32px rgba(124,255,0,0.08)" : "0 8px 28px rgba(0,0,0,0.06)",
      }}
    >
      {tag ? (
        <span
          className="self-start text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full"
          style={{ background: C.accentBg, color: C.accent, border: `1px solid ${C.accentBorder}` }}
        >
          {tag}
        </span>
      ) : null}
      <h3 className="font-bold text-[16px] sm:text-[17px]" style={{ color: C.text1, fontFamily: locale === "fa" ? YK : undefined }}>
        {title}
      </h3>
      <p className="text-[13px] sm:text-[14px] leading-relaxed flex-1" style={{ color: C.text2 }}>
        {desc}
      </p>
    </motion.div>
  );
}

function SectionCta({ locale, label, href }: { locale: Locale; label: string; href?: string }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;

  const className =
    "inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full font-bold text-[13px] sm:text-[14px] text-center leading-snug transition-transform duration-200 hover:scale-[1.03] max-w-[min(100%,20rem)]";
  const style = {
    background: C.accent,
    color: "#000",
    fontFamily: locale === "fa" ? YK : undefined,
    boxShadow: `0 0 28px ${C.accentGlow}`,
  } as const;

  const arrow = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d={locale === "fa" ? "M10 8H4M7 5L4 8l3 3" : "M4 8h8M9 5l3 3-3 3"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <motion.div
      className="flex justify-center mt-8 sm:mt-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.35, duration: 0.5 }}
    >
      {href ? (
        <Link href={href} className={className} style={style}>
          {label}
          {arrow}
        </Link>
      ) : (
        <button type="button" className={className} style={style}>
          {label}
          {arrow}
        </button>
      )}
    </motion.div>
  );
}

// ─── 5. Services ─────────────────────────────────────────────────────────────

export function HomeServicesSection({ locale }: { locale: Locale }) {
  const copy = homeSectionsCopy[locale].services;

  return (
    <SectionShell locale={locale} gradientKey="services" copy={copy} globeBackdrop>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-6% 0px" }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {copy.cards.map((card, i) => (
          <FeatureCard key={card.title} locale={locale} {...card} index={i} />
        ))}
      </motion.div>
      {copy.cta ? <SectionCta locale={locale} label={copy.cta} href={`/${locale}/warranty`} /> : null}
    </SectionShell>
  );
}

// ─── 6. Certificates ─────────────────────────────────────────────────────────

export { HomeCertificatesSection } from "@/components/certificates-section";

// ─── 7. Projects ─────────────────────────────────────────────────────────────

export function HomeProjectsSection({ locale }: { locale: Locale }) {
  const copy = homeSectionsCopy[locale].projects;

  return (
    <SectionShell locale={locale} gradientKey="projects" copy={copy} globeBackdrop>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {copy.cards.map((card, i) => (
          <FeatureCard key={card.title} locale={locale} {...card} index={i} />
        ))}
      </div>
      {copy.cta ? <SectionCta locale={locale} label={copy.cta} /> : null}
    </SectionShell>
  );
}

// ─── 8. Articles ───────────────────────────────────────────────────────────────

export function HomeArticlesSection({ locale }: { locale: Locale }) {
  const copy = homeSectionsCopy[locale].articles;

  return (
    <SectionShell locale={locale} gradientKey="articles" copy={copy} globeBackdrop>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-6% 0px" }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {copy.cards.map((card, i) => (
          <FeatureCard key={card.title} locale={locale} {...card} index={i} />
        ))}
      </motion.div>
      {copy.cta ? <SectionCta locale={locale} label={copy.cta} /> : null}
    </SectionShell>
  );
}

// ─── 9. Catalog ────────────────────────────────────────────────────────────────

export function HomeCatalogSection({ locale }: { locale: Locale }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const copy = homeSectionsCopy[locale].catalog;
  return (
    <SectionShell locale={locale} gradientKey="catalog" copy={copy} globeBackdrop>
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-6% 0px" }}
        transition={{ duration: 0.6, ease: easeOut }}
      >
        <a
          href={CATALOG_PDF_URL}
          download={CATALOG_DOWNLOAD_NAME}
          className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-full font-bold text-[15px] sm:text-[16px] transition-all duration-200 hover:scale-[1.03]"
          style={{
            background: C.accent,
            color: "#000",
            fontFamily: locale === "fa" ? YK : undefined,
            boxShadow: `0 0 28px ${C.accentGlow}`,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 3v12M8 11l4 4 4-4M5 21h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {copy.cta}
        </a>
      </motion.div>
    </SectionShell>
  );
}

// ─── 10. Contact ─────────────────────────────────────────────────────────────

export function HomeContactSection({ locale }: { locale: Locale }) {
  const copy = homeSectionsCopy[locale].contact;

  return (
    <SectionShell locale={locale} sectionId="contact" gradientKey="contact" copy={copy} globeBackdrop>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: easeOut }}
      >
        {copy.cards.map((card, i) => (
          <FeatureCard key={card.title} locale={locale} {...card} index={i} />
        ))}
      </motion.div>

    </SectionShell>
  );
}
