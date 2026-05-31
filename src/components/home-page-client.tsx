"use client";

import { useState, useEffect, useRef, useLayoutEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

import productsHeroDesktop from "@/assets/Source/products HERO desktopsize.png";
import productsHeroMobile from "@/assets/Source/products HERO mobilesize.png";
import hero1Img from "@/assets/HERO1.png";
import hero2Img from "@/assets/HERO2.png";
import hero3Img from "@/assets/HERO3.jpg";
import hero1MImg from "@/assets/HERO1M.jpg";
import hero2MImg from "@/assets/HERO2M.png";
import hero3MImg from "@/assets/HERO3M.png";

import { translations } from "@/i18n/translations";
import type { Locale } from "@/i18n/config";
import { CATEGORIES } from "@/data/product-categories";
import { localeNumber, ui3 } from "@/i18n/locale-ui";
import SharedNavbar from "@/components/shared-navbar";
import SharedFooter from "@/components/shared-footer";
import { BrandTrustSection } from "@/components/brand-trust-section";
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

const PORTFOLIO_PRODUCT_COUNT = CATEGORIES.reduce((sum, c) => sum + c.products.length, 0);
const PORTFOLIO_CATEGORY_COUNT = CATEGORIES.length;

// ══════════════════════════════════════════════════════════════════════════════
// 2. HERO
// ══════════════════════════════════════════════════════════════════════════════

function Hero({ locale, t }: { locale: Locale; t: (typeof translations)["en"] }) {
  // Hero has full-screen photo background, always uses dark/neon accent
  const ACCENT = "#7CFF00";

  const isRTL = locale === "fa";

  const heroImages = [hero1Img, hero2Img, hero3Img];
  const heroMobileImages = [hero1MImg, hero2MImg, hero3MImg];
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImg((i) => (i + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section className="relative z-0 h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Background — crossfading images */}
      <div className="absolute inset-0 scale-110">
        <AnimatePresence mode="sync">
          {/* Desktop images — hidden on mobile */}
          <motion.div
            key={`desktop-${activeImg}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
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
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 block sm:hidden"
          >
            <Image
              src={heroMobileImages[activeImg]}
              alt="UBETTER Energy"
              fill
              priority={activeImg === 0}
              quality={92}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/75" />
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
      <div className="absolute inset-0 z-10 flex flex-col">
        {/* Text block — vertically centered, responsive horizontal padding */}
        <div className={`flex-1 flex items-center ${isRTL ? "justify-end pr-8 sm:pr-12 md:pr-16 lg:pr-[6vw] xl:pr-24 2xl:pr-32 ml-8 sm:ml-12 md:ml-16 lg:ml-[6vw] xl:ml-24" : "justify-start pl-8 sm:pl-12 md:pl-16 lg:pl-[6vw] xl:pl-24 2xl:pl-32"}`}>
          <div
            className="flex flex-col items-start"
            style={{ maxWidth: "480px" }}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: easeOut }}
              className="text-white leading-none mb-0.5 sm:mb-1"
              style={{
                fontFamily: YK,
                fontSize: "clamp(28px, 4.2vw, 62px)",
                fontWeight: 800,
                lineHeight: 1.1,
                textShadow: "0 2px 40px rgba(0,0,0,0.5)",
              }}
            >
              {ui3(locale, "پاور استیشن", "Power Station", "储能电源")}
            </motion.h1>

            {/* "ALL IN ONE" — neon green with glow */}
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.9, ease: easeOut }}
              className="leading-none mb-2 sm:mb-5"
              style={{
                fontFamily: YK,
                fontSize: "clamp(26px, 3.8vw, 56px)",
                fontWeight: 900,
                color: ACCENT,
                textShadow: "0 0 32px rgba(124,255,0,0.45), 0 0 64px rgba(124,255,0,0.18)",
                lineHeight: 1.1,
              }}
            >
              ALL IN ONE
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72, duration: 0.85 }}
              className="text-white mb-4 sm:mb-8"
              style={{
                fontFamily: YK,
                fontSize: "clamp(12px, 1.4vw, 20px)",
                fontWeight: 400,
                lineHeight: 1.75,
                textShadow: "0 1px 20px rgba(0,0,0,0.4)",
                maxWidth: "400px",
                color: "rgba(255,255,255,0.88)",
              }}
            >
              {locale === "fa"
                ? <>تمام انرژی مورد نیاز شما،<br />هر زمان، هر مکان</>
                : locale === "zh"
                  ? <>随时随地<br />满足您的用电需求</>
                  : <>All the energy you need,<br />anytime, anywhere</>}
            </motion.p>

            {/* CTA button */}
            <motion.a
              href={`/${locale}/products`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.75 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 text-black font-bold cursor-pointer"
              style={{
                fontFamily: YK,
                fontSize: "clamp(12px, 1.1vw, 18px)",
                fontWeight: 700,
                background: ACCENT,
                padding: "clamp(9px, 1.2vw, 14px) clamp(18px, 2.5vw, 34px)",
                borderRadius: "14px",
                boxShadow: "0 0 24px rgba(124,255,0,0.32), 0 4px 16px rgba(0,0,0,0.28)",
                transition: "background 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#90ff1a";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 44px rgba(124,255,0,0.52), 0 4px 20px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = ACCENT;
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 24px rgba(124,255,0,0.32), 0 4px 16px rgba(0,0,0,0.28)";
              }}
            >
              {ui3(locale, "مشاهده محصولات", "Explore Products", "浏览产品")}
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d={locale === "fa" ? "M14 10H6M9 6l-4 4 4 4" : "M6 10h8M11 6l4 4-4 4"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </div>
        </div>

        {/* ── Features glass panel ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: easeOut }}
          className="mb-6 sm:mb-8 mx-4 sm:ml-12 md:ml-16 lg:ml-[6vw] xl:ml-24 sm:mr-28 md:mr-40 lg:mr-56 xl:mr-72"
          style={{
            background: "rgba(0,0,0,0.22)",
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <div
            className="grid grid-cols-2 sm:grid-cols-4 sm:h-[170px]"
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
                title: ui3(locale, "ظرفیت بالا", "High Capacity", "大容量"),
                desc: ui3(locale, "توان بالا برای\nتمام دستگاه‌های شما", "High power for\nall your devices", "为高功耗设备\n提供充沛电力"),
              },
              {
                icon: (
                  <svg width="36" height="36" viewBox="0 0 42 42" fill="none">
                    <path d="M23 8l-8 13h8l-2 13L29 21h-8l2-13z" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: ui3(locale, "شارژ سریع", "Fast Charging", "快速充电"),
                desc: ui3(locale, "شارژ سریع در\nهر شرایطی", "Fast charging in\nany condition", "多种场景下\n均可快充"),
              },
              {
                icon: (
                  <svg width="36" height="36" viewBox="0 0 42 42" fill="none">
                    <path d="M14 21a7 7 0 1 1 14 0 7 7 0 0 1-14 0z" stroke={ACCENT} strokeWidth="1.6" />
                    <path d="M21 14v-4M21 32v-4M14 21h-4M32 21h-4" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" />
                    <circle cx="21" cy="21" r="2.5" fill={ACCENT} />
                  </svg>
                ),
                title: ui3(locale, "باتری با عمر طولانی", "Long Life Battery", "长寿命电池"),
                desc: ui3(locale, "ساخته شده با سلول‌های\nباکیفیت و بادوام", "Built with premium\nhigh-durability cells", "采用高品质\n耐久电芯"),
              },
              {
                icon: (
                  <svg width="36" height="36" viewBox="0 0 42 42" fill="none">
                    <path d="M21 8l-10 4v9c0 6.075 4.477 11.745 10 13 5.523-1.255 10-6.925 10-13V12L21 8z" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 21l3.5 3.5L26 18" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: ui3(locale, "ایمن و قابل اعتماد", "Safe & Reliable", "安全可靠"),
                desc: ui3(locale, "مجهز به سیستم‌های\nحفاظتی پیشرفته", "Equipped with advanced\nprotection systems", "多重保护\n安心运行"),
              },
            ].map((feat, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center justify-center text-center px-4 sm:px-4 py-3 sm:py-0 gap-1.5 sm:gap-2.5 group"
              >
                {/* Vertical separator — desktop only */}
                {(isRTL ? i > 0 : i < 3) && (
                  <div
                    className="hidden sm:block absolute right-0 top-8 bottom-8"
                    style={{ width: "1px", background: "rgba(255,255,255,0.1)" }}
                  />
                )}
                {/* Horizontal separator — mobile 2×2 grid bottom row divider */}
                {i < 2 && (
                  <div
                    className="sm:hidden absolute bottom-0 left-4 right-4"
                    style={{ height: "1px", background: "rgba(255,255,255,0.1)" }}
                  />
                )}
                {/* Vertical separator — mobile between 2 columns */}
                {(i === 0 || i === 2) && (
                  <div
                    className="sm:hidden absolute right-0 top-4 bottom-4"
                    style={{ width: "1px", background: "rgba(255,255,255,0.1)" }}
                  />
                )}

                <div className="transition-transform duration-300 group-hover:scale-110 origin-center scale-75 sm:scale-100">
                  {feat.icon}
                </div>

                <div
                  className="text-white font-bold"
                  style={{ fontFamily: YK, fontSize: "clamp(11px, 1.1vw, 15px)", lineHeight: 1.2 }}
                >
                  {feat.title}
                </div>

                <div
                  className="whitespace-pre-line"
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
            ))}
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
                background: "rgba(255,255,255,0.06)",
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
                {ui3(locale, "پورتفولیو محصولات", "Product Portfolio", "产品矩阵")}
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
                {locale === "fa" ? (
                  <>
                    {localeNumber(PORTFOLIO_PRODUCT_COUNT, locale)} محصول در{" "}
                    <span style={{ color: C.text1 }}>
                      {localeNumber(PORTFOLIO_CATEGORY_COUNT, locale)} دسته‌بندی
                    </span>
                  </>
                ) : locale === "zh" ? (
                  <>
                    <span style={{ color: C.text1 }}>
                      {localeNumber(PORTFOLIO_CATEGORY_COUNT, locale)} 大类
                    </span>{" "}
                    共 {localeNumber(PORTFOLIO_PRODUCT_COUNT, locale)} 款产品
                  </>
                ) : (
                  <>
                    {localeNumber(PORTFOLIO_PRODUCT_COUNT, locale)} Products across{" "}
                    <span style={{ color: C.text1 }}>
                      {localeNumber(PORTFOLIO_CATEGORY_COUNT, locale)} Categories
                    </span>
                  </>
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
                  {ui3(locale, "مشاهده همه محصولات", "View All Products", "查看全部产品")}
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
      <Hero locale={locale} t={t} />

      {/* Products teaser — scrolls up as a sheet over the hero */}
      <ProductPortfolioScrollStack locale={locale} isRTL={isRTL} isDark={isDark} C={C} />

      <ScrollStackLayer zIndex={18} overlapVh={98} plain>
        <BrandTrustSection locale={locale} />
      </ScrollStackLayer>
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
