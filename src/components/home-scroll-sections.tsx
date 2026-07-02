"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { ComponentType, MouseEvent, ReactNode, SVGProps } from "react";

import {
  buildAccentGlassSkin,
  GlassPanelBadge,
  GlassShimmerPanel,
  glassPanelItemVariants,
  sectionGlassSkin,
} from "@/components/glass-shimmer-panel";
import { useHomeGlobeJourneyOptional } from "@/contexts/home-globe-journey-context";
import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { homeSectionsCopy, type HomeSectionBlock } from "@/i18n/home-sections.dict";
import { translations } from "@/i18n/translations";
import { localeHtmlLang } from "@/i18n/locale-ui";
import { caseStudyImagesForSection } from "@/assets/casestudyImages";

const CATALOG_PDF_URL = "/UBETTER-Catalog.pdf";
const CATALOG_DOWNLOAD_NAME = "UBETTER-Catalog.pdf";

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";
/** Matches products page / site gradient CTAs */
const GRADIENT_CTA_INNER_CLASS =
  "btn-gradient-border-inner inline-flex items-center gap-2.5 px-7 py-3.5 font-bold text-[14px] sm:text-[15px] transition-all duration-300 hover:scale-105";
const GRADIENT_CTA_INNER_DISABLED_CLASS =
  "btn-gradient-border-inner inline-flex items-center gap-2.5 px-7 py-3.5 font-bold text-[14px] sm:text-[15px] cursor-not-allowed";
const easeOut = [0.22, 1, 0.36, 1] as const;
const easeSpring = [0.34, 1.45, 0.64, 1] as const;

function IconServiceEngineering(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M4 18h16M7 18V8l5-4 5 4v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 12h4M12 10v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function IconServiceDeploy(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M14 4h6v6M10 20H4v-6M20 4l-8 8M4 20l8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconServiceSupport(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9.5 12.5l2 2 3.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SERVICE_CARD_ICONS: ComponentType<SVGProps<SVGSVGElement>>[] = [
  IconServiceEngineering,
  IconServiceDeploy,
  IconServiceSupport,
];

function IconBadgeProjects(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="3" y="8" width="7" height="13" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="14" y="4" width="7" height="17" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 12h1M17 8h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconBadgeArticles(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M6 4h9l3 3v13H6V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M15 4v3h3M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconBadgeCatalog(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M12 3v12M8 11l4 4 4-4M5 21h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconBadgeContact(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M4 6h16v12H4V6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
function IconBadgeCertificates(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12.5l2 2 3.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SECTION_BADGE_ICONS: Partial<Record<SectionKey, ComponentType<SVGProps<SVGSVGElement>>>> = {
  services: IconServiceSupport,
  certificates: IconBadgeCertificates,
  projects: IconBadgeProjects,
  articles: IconBadgeArticles,
  catalog: IconBadgeCatalog,
  contact: IconBadgeContact,
};

function SectionBadge({
  locale,
  label,
  icon: Icon,
  accent,
  accentBg,
  accentBorder,
  accentGlow,
}: {
  locale: Locale;
  label: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  accent: string;
  accentBg: string;
  accentBorder: string;
  accentGlow: string;
}) {
  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] mb-4 ${locale === "en" ? "uppercase" : ""}`}
      style={{
        background: accentBg,
        border: `1px solid ${accentBorder}`,
        color: accent,
      }}
      initial={{ opacity: 0, y: 10, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: easeSpring }}
    >
      {Icon ? <Icon className="h-3.5 w-3.5 shrink-0 opacity-90" style={{ color: accent }} /> : null}
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
        style={{
          background: accent,
          boxShadow: `0 0 12px ${accentGlow}, 0 0 4px ${accent}`,
        }}
      />
      {label}
    </motion.div>
  );
}

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
  desktop: string;
  mobile: string;
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
  bare = false,
  looseBottom = false,
  contentInGlass = true,
  unifiedPanel = false,
}: {
  locale: Locale;
  sectionId?: string;
  gradientKey: SectionKey;
  copy: HomeSectionBlock;
  children: ReactNode;
  className?: string;
  heroArt?: { desktop: string; mobile: string; variant?: "default" | "garanty" };
  /** Transparent over pinned globe when journey is active. */
  globeBackdrop?: boolean;
  /** Use glass header panel layout for scroll-stack sections. */
  bare?: boolean;
  /** Extra padding below section content (e.g. services grid). */
  looseBottom?: boolean;
  /** Wrap section body in frosted glass (off for minimal blocks e.g. catalog CTA). */
  contentInGlass?: boolean;
  /** Render children inside the header glass panel (single box). */
  unifiedPanel?: boolean;
}) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const t = translations[locale];
  const grad = SECTION_GRADIENTS[gradientKey][isDark ? "dark" : "light"];
  const journey = useHomeGlobeJourneyOptional();
  const showGlobeThrough = !bare && globeBackdrop && (journey?.showGlobeBackdrop ?? false) && !heroArt;
  const useGlassPanel = bare && globeBackdrop && !heroArt;
  const BadgeIcon = SECTION_BADGE_ICONS[gradientKey];
  const panelSkin = buildAccentGlassSkin(isDark, C.accent, C.accentGlow);

  const headerBlock = (
    <>
      <GlassPanelBadge
        locale={locale}
        label={copy.badge}
        skin={panelSkin}
        reduceMotion={false}
      />
      <motion.h2
        className="font-black leading-[1.1] px-2"
        style={{
          color: panelSkin.titleColor,
          textShadow: panelSkin.textShadow,
          fontSize: "clamp(1.3rem, 3.2vw, 2.35rem)",
          letterSpacing: locale === "fa" ? "0" : "-0.02em",
          fontFamily: locale === "fa" ? YK : undefined,
        }}
        variants={glassPanelItemVariants}
      >
        {copy.title}
      </motion.h2>
      {copy.subtitle ? (
        <motion.p
          className="max-w-2xl mx-auto leading-relaxed px-2"
          style={{
            color: panelSkin.subtitleColor,
            textShadow: panelSkin.textShadow,
            fontSize: "clamp(13px, 1.4vw, 16px)",
          }}
          variants={glassPanelItemVariants}
        >
          {copy.subtitle}
        </motion.p>
      ) : null}
    </>
  );

  if (useGlassPanel) {
    return (
      <section
        id={sectionId}
        dir={t.dir}
        lang={localeHtmlLang(locale)}
        className={`relative overflow-hidden min-h-[100svh] w-full flex flex-col justify-center pt-10 pb-10 sm:pt-14 sm:pb-14 ${looseBottom ? "pb-20 sm:pb-28 lg:pb-32" : ""} ${locale !== "fa" ? "font-sans" : ""} ${className}`}
        style={{
          background: "transparent",
          fontFamily: locale === "fa" ? YK : undefined,
        }}
      >
        <motion.div
          className="relative z-10 flex w-full max-w-[1340px] flex-col gap-8 sm:gap-10 lg:gap-12 mx-auto px-4 sm:px-8 lg:px-12 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div className="relative mx-auto w-full max-w-3xl pointer-events-auto">
            <GlassShimmerPanel skin={panelSkin} isDark={isDark} cornerIcon={BadgeIcon} compact>
              {headerBlock}
              {unifiedPanel ? (
                <motion.div
                  className="flex w-full flex-col items-center pt-2 sm:pt-3"
                  variants={glassPanelItemVariants}
                >
                  {children}
                </motion.div>
              ) : null}
            </GlassShimmerPanel>
          </motion.div>
          {!unifiedPanel && contentInGlass ? (
            <motion.div
              className="relative flex w-full flex-col gap-6 pointer-events-auto rounded-[20px] p-4 sm:gap-8 sm:p-6"
              style={sectionGlassSkin(isDark, "panel")}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6% 0px" }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              {children}
            </motion.div>
          ) : !unifiedPanel ? (
            <motion.div
              className="relative flex w-full flex-col items-center gap-6 pointer-events-auto sm:gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-6% 0px" }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              {children}
            </motion.div>
          ) : null}
        </motion.div>
      </section>
    );
  }

  const pulseGlow = isDark ? "rgba(124,255,0,0.85)" : "rgba(74,156,0,0.55)";

  return (
    <section
      id={sectionId}
      dir={t.dir}
      lang={locale === "fa" ? "fa" : locale === "zh" ? "zh" : "en"}
      className={`relative overflow-hidden min-h-[100svh] flex flex-col justify-center py-14 sm:py-16 ${looseBottom ? "pb-24 sm:pb-32 lg:pb-40" : ""} ${locale !== "fa" ? "font-sans" : ""} ${className}`}
      style={{
        background: bare
          ? "transparent"
          : showGlobeThrough
            ? isDark
              ? "linear-gradient(165deg, rgba(6,8,6,0.48) 0%, rgba(10,12,8,0.52) 45%, rgba(5,5,5,0.58) 100%)"
              : "linear-gradient(165deg, rgba(244,246,240,0.5) 0%, rgba(238,242,232,0.55) 45%, rgba(232,236,228,0.62) 100%)"
            : heroArt
              ? undefined
              : grad,
        fontFamily: locale === "fa" ? YK : undefined,
        borderTop: bare ? undefined : `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
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
        <motion.header
          className={`text-center mx-auto max-w-3xl w-full ${looseBottom ? "mb-12 sm:mb-14" : "mb-8 sm:mb-10"}`}
          style={{
            ...sectionGlassSkin(isDark, "panel"),
            borderRadius: "22px",
            padding: "22px 26px 24px",
          }}
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-6% 0px" }}
          transition={{ duration: 0.65, ease: easeSpring }}
        >
          <SectionBadge
            locale={locale}
            label={copy.badge}
            icon={BadgeIcon}
            accent={C.accent}
            accentBg={C.accentBg}
            accentBorder={C.accentBorder}
            accentGlow={pulseGlow}
          />
          <motion.h2
            className="font-black leading-[1.1] mb-3"
            style={{
              color: C.text1,
              fontSize: "clamp(1.35rem, 3.2vw, 2.5rem)",
              letterSpacing: locale === "fa" ? "0" : "-0.02em",
              fontFamily: locale === "fa" ? YK : undefined,
            }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.55, ease: easeOut }}
          >
            {copy.title}
          </motion.h2>
          {copy.subtitle ? (
            <motion.p
              className="max-w-2xl mx-auto leading-relaxed"
              style={{ color: C.text2, fontSize: "clamp(13px, 1.35vw, 16px)" }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14, duration: 0.55, ease: easeOut }}
            >
              {copy.subtitle}
            </motion.p>
          ) : null}
        </motion.header>
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
  const glass = sectionGlassSkin(isDark, "card");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ delay: 0.08 * index, duration: 0.6, ease: easeOut }}
      className="rounded-2xl p-5 sm:p-6 flex flex-col gap-3 h-full text-start"
      style={{
        ...glass,
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
      }}
      whileHover={{
        borderColor: isDark ? "rgba(124,255,0,0.38)" : "rgba(124,255,0,0.28)",
        boxShadow: isDark
          ? "inset 0 1px 0 rgba(124,255,0,0.12), inset 0 -1px 0 rgba(0,0,0,0.35), 0 12px 40px rgba(124,255,0,0.12)"
          : "inset 0 1px 0 rgba(255,255,255,0.65), inset 0 -1px 0 rgba(0,0,0,0.06), 0 12px 36px rgba(124,255,0,0.1)",
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

function sectionCtaInnerStyle(isDark: boolean, C: typeof DARK_C) {
  return {
    background: isDark ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.55)",
    color: C.text1,
    fontFamily: YK,
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  } as const;
}

function sectionCtaHoverIn(e: MouseEvent<HTMLElement>, isDark: boolean, C: typeof DARK_C) {
  const el = e.currentTarget;
  el.style.background = C.text1;
  el.style.color = isDark ? "#000" : "#fff";
}

function sectionCtaHoverOut(e: MouseEvent<HTMLElement>, isDark: boolean, C: typeof DARK_C) {
  const el = e.currentTarget;
  el.style.background = isDark ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.55)";
  el.style.color = C.text1;
}

function SectionCta({
  locale,
  label,
  href,
  comingSoon = false,
}: {
  locale: Locale;
  label: string;
  href?: string;
  comingSoon?: boolean;
}) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;

  const innerStyle = sectionCtaInnerStyle(isDark, C);
  const disabledStyle = comingSoon
    ? ({
        ...innerStyle,
        opacity: 0.55,
      } as const)
    : innerStyle;

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
      <div
        className={`btn-gradient-border${comingSoon ? " opacity-70 pointer-events-none" : ""}`}
        style={{ color: C.text1 }}
      >
        {comingSoon ? (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className={GRADIENT_CTA_INNER_DISABLED_CLASS}
            style={disabledStyle}
          >
            {label}
          </button>
        ) : href ? (
          <Link
            href={href}
            className={GRADIENT_CTA_INNER_CLASS}
            style={innerStyle}
            onMouseEnter={(e) => sectionCtaHoverIn(e, isDark, C)}
            onMouseLeave={(e) => sectionCtaHoverOut(e, isDark, C)}
          >
            {label}
            {arrow}
          </Link>
        ) : (
          <button
            type="button"
            className={GRADIENT_CTA_INNER_CLASS}
            style={innerStyle}
            onMouseEnter={(e) => sectionCtaHoverIn(e, isDark, C)}
            onMouseLeave={(e) => sectionCtaHoverOut(e, isDark, C)}
          >
            {label}
            {arrow}
          </button>
        )}
      </div>
    </motion.div>
  );
}

function ServicesFeatureCard({
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
  const glass = sectionGlassSkin(isDark, "card");
  const Icon = SERVICE_CARD_ICONS[index % SERVICE_CARD_ICONS.length];

  return (
    <motion.article
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8% 0px" }}
      variants={{
        hidden: { opacity: 0, y: 56, scale: 0.92, filter: "blur(10px)" },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          transition: { duration: 0.7, ease: easeSpring, delay: i * 0.14 },
        }),
      }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: easeOut } }}
      className="rounded-2xl p-6 sm:p-7 flex flex-col gap-5 h-full"
      style={{
        ...glass,
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <motion.div
        className="flex items-start justify-between gap-4"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.08 * index + 0.2, duration: 0.5, ease: easeSpring }}
      >
        <div
          className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl"
          style={{
            background: isDark ? "rgba(124,255,0,0.12)" : "rgba(124,255,0,0.14)",
            border: `1px solid ${isDark ? "rgba(124,255,0,0.35)" : "rgba(74,156,0,0.28)"}`,
            boxShadow: isDark ? `0 0 28px ${C.accentGlow}` : `0 8px 24px rgba(74,156,0,0.15)`,
            color: C.accent,
          }}
        >
          <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
        </div>
        {tag ? (
          <span
            className="text-[10px] font-bold tracking-wide px-3 py-1.5 rounded-full"
            style={{ background: C.accentBg, color: C.accent, border: `1px solid ${C.accentBorder}` }}
          >
            {tag}
          </span>
        ) : null}
      </motion.div>
      <motion.div
        className="flex flex-col gap-3 flex-1"
        initial={{ opacity: 0, x: locale === "fa" ? 12 : -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.08 * index + 0.32, duration: 0.55, ease: easeOut }}
      >
        <h3
          className="font-bold text-[17px] sm:text-[18px] leading-snug"
          style={{ color: C.text1, fontFamily: locale === "fa" ? YK : undefined }}
        >
          {title}
        </h3>
        <p className="text-[14px] sm:text-[15px] leading-relaxed" style={{ color: C.text2 }}>
          {desc}
        </p>
      </motion.div>
    </motion.article>
  );
}

// ─── 5. Services ─────────────────────────────────────────────────────────────

export function HomeServicesSection({ locale }: { locale: Locale }) {
  const copy = homeSectionsCopy[locale].services;

  return (
    <SectionShell locale={locale} gradientKey="services" copy={copy} globeBackdrop bare looseBottom>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 sm:gap-y-14 md:gap-y-0 md:gap-x-5 lg:gap-x-6">
        {copy.cards.map((card, i) => (
          <ServicesFeatureCard key={card.title} locale={locale} {...card} index={i} />
        ))}
      </div>
      {copy.cta ? <SectionCta locale={locale} label={copy.cta} href={localePath(locale, "/warranty")} /> : null}
    </SectionShell>
  );
}

// ─── 6. Certificates ─────────────────────────────────────────────────────────

export { HomeCertificatesSection } from "@/components/certificates-section";

// ─── 7. Projects ─────────────────────────────────────────────────────────────

function CaseStudyCarousel({
  images,
  sectionKey,
  isDark,
}: {
  images: string[];
  sectionKey: number;
  isDark: boolean;
}) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    setSlide(0);
  }, [sectionKey]);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = window.setInterval(() => {
      setSlide((current) => (current + 1) % images.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, [images.length, sectionKey]);

  if (images.length === 0) return null;

  return (
    <motion.div
      className="relative w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08 }}
    >
      <div
        className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-2xl"
        style={{ ...sectionGlassSkin(isDark, "card"), padding: 0 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${sectionKey}-${slide}`}
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: isDark ? "rgba(0,0,0,0.28)" : "rgba(0,0,0,0.04)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Image
              src={images[slide]}
              alt=""
              fill
              className="object-contain p-2 sm:p-3"
              sizes="(max-width: 768px) 100vw, 768px"
              quality={88}
              priority={slide === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function HomeProjectsSection({ locale }: { locale: Locale }) {
  const copy = homeSectionsCopy[locale].projects;
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const [activeIdx, setActiveIdx] = useState(0);
  const active = copy.cards[activeIdx] ?? copy.cards[0];
  const sectionImages = useMemo(() => caseStudyImagesForSection(activeIdx), [activeIdx]);

  return (
    <SectionShell locale={locale} gradientKey="projects" copy={copy} globeBackdrop bare>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
        {copy.cards.map((card, i) => (
          <button
            key={card.title}
            type="button"
            onClick={() => setActiveIdx(i)}
            className="px-4 py-2.5 rounded-xl text-[12px] sm:text-[13px] font-bold transition-all duration-200"
            style={{
              background: activeIdx === i ? C.accent : isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
              color: activeIdx === i ? "#000" : C.text2,
              border: `1px solid ${activeIdx === i ? C.accent : C.divider}`,
              fontFamily: locale === "fa" ? YK : undefined,
            }}
          >
            {card.title}
          </button>
        ))}
      </div>
      {active ? (
        <motion.div
          key={active.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-4xl mx-auto flex flex-col gap-6 sm:gap-8"
        >
          <div
            className="max-w-2xl mx-auto w-full text-center rounded-2xl p-6 sm:p-8"
            style={sectionGlassSkin(isDark, "card")}
          >
            {active.tag ? (
              <span
                className="inline-block mb-3 text-[10px] font-bold tracking-wide px-2.5 py-1 rounded-full"
                style={{ background: C.accentBg, color: C.accent, border: `1px solid ${C.accentBorder}` }}
              >
                {active.tag}
              </span>
            ) : null}
            <h3
              className="font-bold text-[18px] sm:text-[20px] mb-3"
              style={{ color: C.text1, fontFamily: locale === "fa" ? YK : undefined }}
            >
              {active.title}
            </h3>
            <p className="text-[14px] sm:text-[15px] leading-relaxed" style={{ color: C.text2 }}>
              {active.desc}
            </p>
          </div>

          <CaseStudyCarousel images={sectionImages} sectionKey={activeIdx} isDark={isDark} />
        </motion.div>
      ) : null}
    </SectionShell>
  );
}

// ─── 8. Articles ───────────────────────────────────────────────────────────────

export function HomeArticlesSection({ locale }: { locale: Locale }) {
  const copy = homeSectionsCopy[locale].articles;

  return (
    <SectionShell locale={locale} gradientKey="articles" copy={copy} globeBackdrop bare>
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
      {copy.cta ? <SectionCta locale={locale} label={copy.cta} comingSoon /> : null}
    </SectionShell>
  );
}

// ─── 9. Catalog ────────────────────────────────────────────────────────────────

export function HomeCatalogSection({ locale }: { locale: Locale }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const copy = homeSectionsCopy[locale].catalog;
  return (
    <SectionShell locale={locale} gradientKey="catalog" copy={copy} globeBackdrop bare unifiedPanel>
      <a
        href={CATALOG_PDF_URL}
        download={CATALOG_DOWNLOAD_NAME}
        className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[15px] font-bold transition-all duration-200 hover:scale-[1.03] sm:px-10 sm:text-[16px]"
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
    </SectionShell>
  );
}

// ─── 10. Contact ─────────────────────────────────────────────────────────────

export function HomeContactSection({ locale }: { locale: Locale }) {
  const copy = homeSectionsCopy[locale].contact;

  return (
    <SectionShell locale={locale} sectionId="contact" gradientKey="contact" copy={copy}>
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
