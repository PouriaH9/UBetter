"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

import productsHeroDesktop from "@/assets/Source/products HERO desktopsize.png";
import productsHeroMobile from "@/assets/Source/products HERO mobilesize.png";
import hero1Img from "@/assets/HERO1.png";
import hero2Img from "@/assets/HERO2.png";
import hero3Img from "@/assets/HERO3.jpg";
import hero1MImg from "@/assets/HERO1M.png";
import hero2MImg from "@/assets/HERO2M.png";
import hero3MImg from "@/assets/HERO3M.png";

import { translations } from "@/i18n/translations";
import type { Locale } from "@/i18n/config";
import { localeDir, ui, ui3 } from "@/i18n/locale-ui";
import { heroOverlayCopy } from "@/i18n/hero-overlay.dict";
import SharedNavbar from "@/components/shared-navbar";
import SharedFooter from "@/components/shared-footer";
import { ScrollStackLayer, usePreferStaticScrollLayers } from "@/components/scroll-stack-layers";
import { UsageCalculatorSection } from "@/components/usage-calculator-section";
import { GlobePresenceSection } from "@/components/globe-presence-section";
import { HomeGlobeJourneyProvider } from "@/contexts/home-globe-journey-context";
import {
  HomeServicesSection,
  HomeCertificatesSection,
  HomeProjectsSection,
  HomeArticlesSection,
  HomeCatalogSection,
} from "@/components/home-scroll-sections";
import { useTheme, DARK_C, LIGHT_C, type ColorPalette } from "@/contexts/theme-context";
import {
  UPS_CALCULATOR_SECTION_ID,
  scrollToSectionBelowStickyHeader,
} from "@/lib/scroll-to-anchor";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const easeOut = [0.22, 1, 0.36, 1] as const;


// ══════════════════════════════════════════════════════════════════════════════
// 1. CONSTANTS (shared with sections below)
// ══════════════════════════════════════════════════════════════════════════════

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";

const HERO_ACCENT = "#7CFF00";
const HERO_ACCENT_GLOW =
  "0 0 32px rgba(124,255,0,0.45), 0 0 64px rgba(124,255,0,0.18)";

function HeroOverlayContent({ locale }: { locale: Locale }) {
  const copy = heroOverlayCopy[locale];
  const dir = localeDir(locale);

  return (
    <div
      dir={dir}
      className="flex flex-col shrink-0 gap-2.5 sm:gap-4 max-w-[min(100%,48vw)] sm:max-w-[min(340px,42vw)] items-start text-start"
    >
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9, ease: easeOut }}
        className="text-white leading-snug"
        style={{
          fontFamily: YK,
          fontSize: "clamp(18px, 5vw, 40px)",
          fontWeight: 800,
          lineHeight: 1.15,
          textShadow: "0 2px 40px rgba(0,0,0,0.5)",
        }}
      >
        {copy.titleLines.map((line, i) => (
          <span key={line}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.9, ease: easeOut }}
        className="leading-snug"
        style={{
          fontFamily: YK,
          fontSize: "clamp(14px, 3.8vw, 28px)",
          fontWeight: 700,
          lineHeight: 1.2,
          textShadow: "0 1px 20px rgba(0,0,0,0.4)",
          maxWidth: dir === "rtl" ? undefined : "440px",
        }}
      >
        <span style={{ color: "rgba(255,255,255,0.88)" }}>{copy.taglinePrefix}</span>
        <br />
        <span
          style={{
            color: HERO_ACCENT,
            fontWeight: 900,
            textShadow: HERO_ACCENT_GLOW,
          }}
        >
          {copy.taglineAccent}
          {copy.taglineBrand && (
            <>
              <br className="sm:hidden" />
              {copy.taglineBrand}
            </>
          )}
        </span>
      </motion.p>

      <motion.a
        href={`/${locale}/products`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.75 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex items-center gap-1.5 sm:gap-2 self-start text-black font-bold cursor-pointer text-[12px] sm:text-[13px] md:text-[15px] lg:text-[18px] px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-[10px] sm:rounded-[14px]"
        style={{
          fontFamily: YK,
          fontWeight: 700,
          background: HERO_ACCENT,
          boxShadow: "0 0 24px rgba(124,255,0,0.32), 0 4px 16px rgba(0,0,0,0.28)",
          transition: "background 0.25s ease, box-shadow 0.25s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = "#90ff1a";
          (e.currentTarget as HTMLAnchorElement).style.boxShadow =
            "0 0 44px rgba(124,255,0,0.52), 0 4px 20px rgba(0,0,0,0.3)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.background = HERO_ACCENT;
          (e.currentTarget as HTMLAnchorElement).style.boxShadow =
            "0 0 24px rgba(124,255,0,0.32), 0 4px 16px rgba(0,0,0,0.28)";
        }}
      >
        {copy.ctaProducts}
        <svg className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] shrink-0" viewBox="0 0 20 20" fill="none">
          <path
            d={dir === "rtl" ? "M14 10H6M9 6l-4 4 4 4" : "M6 10h8M11 6l4 4-4 4"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.a>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 2. HERO
// ══════════════════════════════════════════════════════════════════════════════


function Hero({ locale }: { locale: Locale }) {
  const ACCENT = HERO_ACCENT;

  const isRTL = locale === "fa";

  const heroImages = [hero1Img, hero2Img, hero3Img];
  const heroMobileImages = [hero1MImg, hero2MImg, hero3MImg];
  const heroSlideIntervalMs = 3500;
  const heroCrossfadeDuration = 0.9;
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImg((i) => (i + 1) % heroImages.length);
    }, heroSlideIntervalMs);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section className="relative z-0 h-[100dvh] min-h-[100dvh] sm:h-screen sm:min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Background — crossfading images */}
      <div className="absolute inset-0 sm:scale-110">
        <AnimatePresence mode="sync">
          {/* Desktop images — hidden on mobile */}
          <motion.div
            key={`desktop-${activeImg}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: heroCrossfadeDuration, ease: "easeInOut" }}
            className="absolute inset-0 hidden sm:block"
          >
            <Image
              src={heroImages[activeImg]}
              alt="UBETTER Energy"
              fill
              priority={activeImg === 0}
              quality={92}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>

          {/* Mobile images — hidden on desktop */}
          <motion.div
            key={`mobile-${activeImg}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: heroCrossfadeDuration, ease: "easeInOut" }}
            className="absolute inset-0 block sm:hidden"
          >
            <Image
              src={heroMobileImages[activeImg]}
              alt="UBETTER Energy"
              fill
              priority={activeImg === 0}
              quality={92}
              sizes="100vw"
              className="object-cover object-[center_20%] sm:object-center"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/80 sm:from-black/40 sm:via-black/20 sm:to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/15" />
      </div>

      {/* Noise overlay for cinematic texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Hero overlay content ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-10 flex flex-col min-h-0">
        {/* Layout wrapper: dir=ltr so justify-start is physical LEFT (page is rtl for fa). */}
        <div
          dir="ltr"
          className="flex-1 min-h-0 w-full flex items-center justify-start pl-5 pr-4 sm:pl-8 sm:pr-[42vw] md:pl-10 md:pr-[38vw] lg:pl-12 lg:pr-[42vw] xl:pl-16 xl:pr-[46vw]"
        >
          <HeroOverlayContent locale={locale} />
        </div>

        {/* ── ALL IN ONE system panel ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: easeOut }}
          className="mt-auto shrink-0 mb-4 sm:mb-6 mx-4 sm:mx-4 sm:ml-12 md:ml-16 lg:ml-[6vw] xl:ml-24 sm:mr-28 md:mr-40 lg:mr-56 xl:mr-72 bg-[rgba(0,0,0,0.22)] sm:bg-[rgba(0,0,0,0.2)] backdrop-blur-md sm:backdrop-blur-xl rounded-xl sm:rounded-[18px] border border-white/10"
          style={{
            WebkitBackdropFilter: "blur(16px) saturate(140%)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="grid grid-cols-2 sm:grid-cols-4"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {[
              {
                icon: (
                  <svg width="36" height="36" viewBox="0 0 42 42" fill="none">
                    <rect x="9" y="13" width="24" height="20" rx="3" stroke={ACCENT} strokeWidth="1.6" />
                    <path d="M16 13V10a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M21 19v8M17 23h8" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                ),
                title: ui3(locale, "ظرفیت بالا", "High Capacity", "大容量", "Hohe Kapazität"),
                desc: ui3(
                  locale,
                  "توان بالای اینورتر (سانورتر) و باتری لیتیوم فسفات\nبرای همه نیازهای شما",
                  "High-power inverter (Sunverter) & LiFePO₄ battery\nfor all your needs",
                  "高功率逆变器与磷酸铁锂电池\n满足各类用电需求",
                  "Leistungsstarker Wechselrichter & LiFePO₄-Akku\nfür alle Anforderungen",
                ),
                mobileDesc: ui3(
                  locale,
                  "توان بالا برای همه نیازها",
                  "High power for all needs",
                  "满足各类需求",
                  "Hohe Leistung",
                ),
              },
              {
                icon: (
                  <svg width="36" height="36" viewBox="0 0 42 42" fill="none">
                    <path d="M23 8l-8 13h8l-2 13L29 21h-8l2-13z" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: ui3(locale, "سویچ فوق سریع", "Ultra-Fast Switch", "超快切换", "Ultraschneller Wechsel"),
                desc: ui3(
                  locale,
                  "قابلیت شارژ از برق شهری به‌تنهایی\nیا همراه با پنل خورشیدی",
                  "Charge from grid alone\nor combined with solar panels",
                  "可单独市电充电\n或与太阳能板组合",
                  "Laden vom Netz allein\noder mit Solarmodulen",
                ),
                mobileDesc: ui3(
                  locale,
                  "شارژ شهری یا خورشیدی",
                  "Grid or solar charging",
                  "市电或太阳能",
                  "Netz oder Solar",
                ),
              },
              {
                icon: (
                  <svg width="36" height="36" viewBox="0 0 42 42" fill="none">
                    <path d="M14 21a7 7 0 1 1 14 0 7 7 0 0 1-14 0z" stroke={ACCENT} strokeWidth="1.6" />
                    <path d="M21 14v-4M21 32v-4M14 21h-4M32 21h-4" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" />
                    <circle cx="21" cy="21" r="2.5" fill={ACCENT} />
                  </svg>
                ),
                title: ui3(locale, "باتری با عمر بسیار طولانی", "Ultra Long-Life Battery", "超长寿命电池", "Extra langlebiger Akku"),
                desc: ui3(
                  locale,
                  "سلول‌های لیتیوم فسفات گرید A++\nبا عمر بالای ۸۰۰۰ سیکل و بیش از ۲۰ سال",
                  "A++ LiFePO₄ cells\n8,000+ cycles & 20+ year lifespan",
                  "A++ 磷酸铁锂电芯\n8000+ 循环，20+ 年寿命",
                  "A++ LiFePO₄-Zellen\n8.000+ Zyklen & 20+ Jahre",
                ),
                mobileDesc: ui3(
                  locale,
                  "A++ · ۸۰۰۰+ سیکل · ۲۰+ سال",
                  "A++ · 8,000+ cycles · 20+ yrs",
                  "A++ · 8000+ 循环",
                  "A++ · 8.000+ Zyklen",
                ),
              },
              {
                icon: (
                  <svg width="36" height="36" viewBox="0 0 42 42" fill="none">
                    <path d="M21 8l-10 4v9c0 6.075 4.477 11.745 10 13 5.523-1.255 10-6.925 10-13V12L21 8z" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 21l3.5 3.5L26 18" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: ui3(locale, "ایمن و قابل اعتماد", "Safe & Reliable", "安全可靠", "Sicher & zuverlässig"),
                desc: ui3(
                  locale,
                  "مجهز به سیستم‌های حفاظتی\nچندلایه پیشرفته",
                  "Equipped with advanced\nmulti-layer protection",
                  "配备先进\n多层保护系统",
                  "Fortschrittlicher\nMehrschicht-Schutz",
                ),
                mobileDesc: ui3(
                  locale,
                  "حفاظت چندلایه پیشرفته",
                  "Multi-layer protection",
                  "多层保护",
                  "Mehrschicht-Schutz",
                ),
              },
            ].map((feat, i) => {
              const showMobileColSep = i % 2 === 1;
              const showMobileRowSep = i >= 2;

              return (
              <div
                key={i}
                className="relative flex flex-col items-center justify-center text-center px-2 py-2.5 sm:px-4 sm:py-0 gap-1 sm:gap-2.5 group min-w-0"
              >
                {(isRTL ? i % 4 !== 0 : i % 4 !== 3) && (
                  <div
                    className="hidden sm:block absolute right-0 top-8 bottom-8"
                    style={{ width: "1px", background: "rgba(255,255,255,0.1)" }}
                  />
                )}
                {showMobileColSep && (
                  <div
                    className="sm:hidden absolute right-0 top-2 bottom-2"
                    style={{ width: "1px", background: "rgba(255,255,255,0.1)" }}
                  />
                )}
                {showMobileRowSep && (
                  <div
                    className="sm:hidden absolute top-0 left-3 right-3"
                    style={{ height: "1px", background: "rgba(255,255,255,0.1)" }}
                  />
                )}

                <div className="transition-transform duration-300 group-hover:scale-110 origin-center scale-[0.68] sm:scale-100">
                  {feat.icon}
                </div>

                <div
                  className="text-white font-bold leading-tight line-clamp-2"
                  style={{ fontFamily: YK, fontSize: "clamp(10px, 2.8vw, 15px)" }}
                >
                  {feat.title}
                </div>

                <div
                  className="whitespace-pre-line leading-tight sm:hidden line-clamp-2"
                  style={{
                    fontFamily: YK,
                    fontSize: "clamp(9px, 2.4vw, 11px)",
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.4,
                  }}
                >
                  {feat.mobileDesc}
                </div>

                <div
                  className="whitespace-pre-line hidden sm:block"
                  style={{
                    fontFamily: YK,
                    fontSize: "clamp(10px, 0.85vw, 12px)",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.6,
                  }}
                >
                  {feat.desc}
                </div>
              </div>
            );
            })}
          </div>
        </motion.div>

      </div>

    </section>
  );
}


// ══════════════════════════════════════════════════════════════════════════════


// ══════════════════════════════════════════════════════════════════════════════
// SCROLL LAYERS — stacked sheets (each block scrolls up over the one below)
// ══════════════════════════════════════════════════════════════════════════════

function ProductPortfolioScrollStack({
  locale,
  isRTL,
  isDark,
  C,
}: {
  locale: Locale;
  isRTL: boolean;
  isDark: boolean;
  C: ColorPalette;
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const staticLayers = usePreferStaticScrollLayers();
  const { scrollYProgress } = useScroll({
    target: shellRef,
    // Longer range = motion plays across more scroll
    offset: ["start end", "start 0.28"],
  });
  const lift = useTransform(scrollYProgress, [0, 1], staticLayers ? [0, 0] : [340, 0]);
  const shellScale = useTransform(scrollYProgress, [0, 1], staticLayers ? [1, 1] : [0.84, 1]);
  const bgScale = useTransform(scrollYProgress, [0, 1], staticLayers ? [1, 1] : [1.32, 1]);

  return (
    <div className="relative z-10 -mt-[100vh] pt-[100vh] pointer-events-none">
      <div ref={shellRef} className="relative">
        <motion.div
          style={{ y: lift, scale: shellScale }}
          className="pointer-events-auto relative min-h-screen flex flex-col justify-center overflow-hidden origin-top max-lg:[touch-action:pan-y]"
        >
        <motion.div
          className="absolute inset-0 origin-center"
          style={{ scale: bgScale }}
          aria-hidden
        >
          <Image src={productsHeroDesktop} alt="" fill className="object-cover object-center hidden sm:block" sizes="100vw" priority={false} />
          <Image src={productsHeroMobile} alt="" fill className="object-cover object-top sm:hidden" sizes="100vw" priority={false} />
          <div
            className="absolute inset-0"
            style={{
              background: isDark
                ? "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.32) 50%, rgba(0,0,0,0.50) 100%)"
                : "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.32) 100%)",
            }}
          />
        </motion.div>

        <div className="relative z-10 flex flex-col justify-between min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
          <div className="flex-1 flex flex-col items-center justify-start max-w-[1200px] mx-auto px-6 sm:px-10 pt-10 pb-8 text-center w-full">
            <div
              style={{
                background: "rgba(255,255,255,0.14)",
                backdropFilter: "blur(4px) saturate(120%)",
                WebkitBackdropFilter: "blur(4px) saturate(120%)",
                borderRadius: "24px",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.06), 0 8px 40px rgba(0,0,0,0.12)",
                padding: "28px 40px 32px",
              }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-[10px] font-bold tracking-[0.2em] uppercase"
                style={{
                  background: "rgba(0,0,0,0.22)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: C.text1,
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.text1 }} />
                {ui3(locale, "محصولات UBETTER", "UBETTER Products", "UBETTER 产品")}
              </div>
              <h2
                key={locale}
                className="font-black mb-6 leading-none tabular-nums"
                style={{
                  color: "#ffffff",
                  fontFamily: YK,
                  fontSize: "clamp(22px, 3.2vw, 48px)",
                  letterSpacing: isRTL ? "0" : "-0.03em",
                  textShadow: "0 2px 24px rgba(0,0,0,0.65), 0 4px 48px rgba(0,0,0,0.45)",
                }}
              >
                {ui3(
                  locale,
                  "ذخیره ساز انرژی و برق اضطراری با توجه به نیاز شما",
                  "Energy Storage & Emergency Power Tailored to Your Needs",
                  "根据您的需求定制储能及应急供电",
                )}
              </h2>
              <div className="btn-gradient-border" style={{ color: C.text1 }}>
                <Link
                  href={`/${locale}/products`}
                  className="btn-gradient-border-inner inline-flex items-center gap-2.5 px-7 py-3.5 font-bold text-[14px] sm:text-[15px] transition-all duration-300 hover:scale-105"
                  style={{
                    background: isDark ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.55)",
                    color: C.text1,
                    fontFamily: YK,
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = C.text1;
                    el.style.color = isDark ? "#000" : "#fff";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = isDark ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.55)";
                    el.style.color = C.text1;
                  }}
                >
                  {ui(locale, {
                    fa: "مشاهده محصولات ذخیره‌ساز انرژی هوشمند",
                    en: "View Smart Energy Storage Products",
                    zh: "查看智能储能产品",
                    de: "Intelligente Energiespeicher ansehen",
                  })}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d={locale === "fa" ? "M10 8H4M7 5L4 8l3 3" : "M4 8h8M9 5l3 3-3 3"}
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        </motion.div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT EXPORT
// ══════════════════════════════════════════════════════════════════════════════

export default function HomePageClient({ locale }: { locale: Locale }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const t = translations[locale];
  const isRTL = locale === "fa";

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash.slice(1) !== UPS_CALCULATOR_SECTION_ID) return;
    scrollToSectionBelowStickyHeader(UPS_CALCULATOR_SECTION_ID, { behavior: "auto" });
  }, []);

  return (
    <HomeGlobeJourneyProvider>
    <div
      className="overflow-x-hidden"
      dir={t.dir}
      style={{ background: C.pageBg, color: C.text1, transition: "background 0.35s ease, color 0.35s ease" }}>
      <SharedNavbar locale={locale} activePage="home" />
      <Hero locale={locale} />

      {/* Products teaser — scrolls up as a sheet over the hero */}
      <ProductPortfolioScrollStack locale={locale} isRTL={isRTL} isDark={isDark} C={C} />

      <ScrollStackLayer zIndex={20} overlapVh={98} plain>
        <UsageCalculatorSection locale={locale} />
      </ScrollStackLayer>
      <ScrollStackLayer zIndex={30} overlapVh={99} enterScale={false} plain>
        <GlobePresenceSection locale={locale} />
      </ScrollStackLayer>
      <ScrollStackLayer zIndex={35} overlapVh={98} plain>
        <HomeServicesSection locale={locale} />
      </ScrollStackLayer>
      <ScrollStackLayer zIndex={40} overlapVh={98} plain>
        <HomeCertificatesSection locale={locale} />
      </ScrollStackLayer>
      <ScrollStackLayer zIndex={45} overlapVh={98} plain>
        <HomeProjectsSection locale={locale} />
      </ScrollStackLayer>
      <ScrollStackLayer zIndex={50} overlapVh={98} plain>
        <HomeArticlesSection locale={locale} />
      </ScrollStackLayer>
      <ScrollStackLayer zIndex={55} overlapVh={98} plain>
        <HomeCatalogSection locale={locale} />
      </ScrollStackLayer>
      <SharedFooter locale={locale} />
    </div>
    </HomeGlobeJourneyProvider>
  );
}
