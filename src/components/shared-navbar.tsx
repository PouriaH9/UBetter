"use client";

import { useState, useEffect } from "react";
import type { CSSProperties, MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";
import { useCart } from "@/contexts/cart-context";
import type { Locale } from "@/i18n/config";
import { locales, localizedPath, localePath } from "@/i18n/config";
import {
  LocaleFlagMark,
  localeNavLabel,
  localeSwitchAria,
} from "@/components/locale-flag-mark";
import {
  UPS_CALCULATOR_SECTION_ID,
  scrollToSectionBelowStickyHeader,
} from "@/lib/scroll-to-anchor";

const PRODUCT_CATS = [
  { id: "residential", fa: "خانگی و ویلایی", en: "Residential & Villa", zh: "住宅与别墅" },
  { id: "commercial", fa: "تجاری و اداری", en: "Commercial & Office", zh: "商业与办公" },
  { id: "industrial", fa: "صنعتی", en: "Industrial", zh: "工业" },
  { id: "solar", fa: "خورشیدی و هیبریدی", en: "Solar & Hybrid", zh: "光伏与混合系统" },
  { id: "large-scale", fa: "پروژه‌های بزرگ و میکروگرید", en: "Large Projects & Microgrid", zh: "大型项目与微电网" },
  { id: "ups", fa: "ذخیره‌ساز انرژی هوشمند", en: "Smart Energy Storage", zh: "智能储能", de: "Intelligenter Energiespeicher" },
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;
const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";

function catLabel(locale: Locale, cat: (typeof PRODUCT_CATS)[number]): string {
  if (locale === "fa") return cat.fa;
  if (locale === "zh") return cat.zh;
  if (locale === "de") return "de" in cat ? cat.de : cat.en;
  return cat.en;
}

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <motion.button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      whileTap={{ scale: 0.9 }}
      className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shrink-0"
      style={{
        border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.12)",
        background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        const b = e.currentTarget as HTMLButtonElement;
        b.style.borderColor = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.25)";
        b.style.boxShadow = isDark ? "0 0 10px rgba(255,255,255,0.1)" : "0 0 10px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        const b = e.currentTarget as HTMLButtonElement;
        b.style.borderColor = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)";
        b.style.boxShadow = "none";
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          // Sun icon — click to go light
          <motion.svg
            key="sun"
            initial={{ opacity: 0, rotate: -60, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 60, scale: 0.7 }}
            transition={{ duration: 0.22 }}
            width="16" height="16" viewBox="0 0 20 20" fill="none"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.34 4.34l1.42 1.42M14.24 14.24l1.42 1.42M4.34 15.66l1.42-1.42M14.24 5.76l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </motion.svg>
        ) : (
          // Moon icon — click to go dark
          <motion.svg
            key="moon"
            initial={{ opacity: 0, rotate: 60, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -60, scale: 0.7 }}
            transition={{ duration: 0.22 }}
            width="15" height="15" viewBox="0 0 20 20" fill="none"
            style={{ color: "rgba(0,0,0,0.65)" }}
          >
            <path d="M17.5 12.5A8 8 0 018 3a7.5 7.5 0 100 15 8 8 0 009.5-5.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function SharedNavbar({
  locale,
  activePage = "home",
}: {
  locale: Locale;
  activePage?: "home" | "products" | "warranty" | "contact";
}) {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isDark } = useTheme();
  const { totalQty, openCart } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const compactMobileBar = isMobile && scrolled;
  const compactDesktopBar = !isMobile && scrolled;

  /** Same glass recipe as hero “Product Portfolio” card (home-page-client). */
  const mobileGlassBar = isDark
    ? {
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(4px) saturate(120%)",
        WebkitBackdropFilter: "blur(4px) saturate(120%)",
        borderBottom: "1px solid rgba(255,255,255,0.18)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.06), 0 8px 40px rgba(0,0,0,0.12)",
      }
    : {
        background: "rgba(255,255,255,0.62)",
        backdropFilter: "blur(10px) saturate(140%)",
        WebkitBackdropFilter: "blur(10px) saturate(140%)",
        borderBottom: "1px solid rgba(255,255,255,0.55)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)",
      };

  /** Full border + same glass as mobile compact (floating pill on desktop when scrolled). */
  const desktopFloatingBar: CSSProperties = isDark
    ? {
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(4px) saturate(120%)",
        WebkitBackdropFilter: "blur(4px) saturate(120%)",
        border: "1px solid rgba(255,255,255,0.18)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.06), 0 8px 40px rgba(0,0,0,0.12)",
      }
    : {
        background: "rgba(255,255,255,0.62)",
        backdropFilter: "blur(10px) saturate(140%)",
        WebkitBackdropFilter: "blur(10px) saturate(140%)",
        border: "1px solid rgba(255,255,255,0.55)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.08)",
      };

  const C = isDark ? DARK_C : LIGHT_C;

  const shellBackground: CSSProperties =
    compactMobileBar
      ? mobileGlassBar
      : compactDesktopBar
        ? {
            background: "transparent",
            backdropFilter: "none",
            WebkitBackdropFilter: "none",
            borderBottom: "none",
            boxShadow: "none",
          }
        : scrolled
          ? {
              background: isDark ? "rgba(0,0,0,0.95)" : "rgba(255,255,255,0.97)",
              backdropFilter: "blur(28px) saturate(180%)",
              WebkitBackdropFilter: "blur(28px) saturate(180%)",
              borderBottom: isDark
                ? `1px solid rgba(255,255,255,0.08)`
                : `1px solid rgba(0,0,0,0.1)`,
              boxShadow: isDark ? "0 4px 32px rgba(0,0,0,0.5)" : "0 4px 32px rgba(0,0,0,0.1)",
            }
          : {
              background: C.navBg,
              backdropFilter: "blur(28px) saturate(180%)",
              WebkitBackdropFilter: "blur(28px) saturate(180%)",
              borderBottom: isDark ? `1px solid ${C.navBorder}` : `1px solid rgba(0,0,0,0.07)`,
              boxShadow: isDark ? "none" : "0 4px 24px rgba(0,0,0,0.06)",
            };

  /** Row bar fill: only the inner row when desktop is in floating mode. */
  const rowBarSurface: CSSProperties | undefined = compactDesktopBar ? desktopFloatingBar : undefined;

  const isRTL = locale === "fa";
  const pathForLocale = pathname ?? "/";
  const alternateLocales = locales.filter((l) => l !== locale);

  const homePath = localePath(locale, "/");
  const upsCalculatorHref = `${homePath}#${UPS_CALCULATOR_SECTION_ID}`;

  const warrantyPath = localePath(locale, "/warranty");
  const contactPath = localePath(locale, "/contact");

  const faLinks = [
    { href: homePath, label: "خانه", page: "home" as const },
    { href: localePath(locale, "/products"), label: "محصولات", page: "products" as const },
    {
      href: upsCalculatorHref,
      label: "ماشین حساب",
      page: "home" as const,
      scrollTargetId: UPS_CALCULATOR_SECTION_ID,
    },
    { href: warrantyPath, label: "گارانتی", page: "warranty" as const },
    { href: localePath(locale, "/about"), label: "درباره ما", page: "home" as const },
    { href: contactPath, label: "تماس با ما", page: "contact" as const },
  ];
  const enLinks = [
    { href: homePath, label: "Home", page: "home" as const },
    { href: localePath(locale, "/products"), label: "Products", page: "products" as const },
    {
      href: upsCalculatorHref,
      label: "Calculator",
      page: "home" as const,
      scrollTargetId: UPS_CALCULATOR_SECTION_ID,
    },
    { href: warrantyPath, label: "Warranty", page: "warranty" as const },
    { href: localePath(locale, "/about"), label: "About", page: "home" as const },
    { href: contactPath, label: "Contact", page: "contact" as const },
  ];
  const zhLinks = [
    { href: homePath, label: "首页", page: "home" as const },
    { href: localePath(locale, "/products"), label: "产品", page: "products" as const },
    {
      href: upsCalculatorHref,
      label: "计算器",
      page: "home" as const,
      scrollTargetId: UPS_CALCULATOR_SECTION_ID,
    },
    { href: warrantyPath, label: "保修服务", page: "warranty" as const },
    { href: localePath(locale, "/about"), label: "关于我们", page: "home" as const },
    { href: contactPath, label: "联系我们", page: "contact" as const },
  ];
  const navLinks = locale === "fa" ? faLinks : locale === "zh" ? zhLinks : enLinks;

  const homeNavLabel = locale === "fa" ? "خانه" : locale === "zh" ? "首页" : "Home";
  const productsViewAllShort =
    locale === "fa" ? "← مشاهده همه" : locale === "zh" ? "查看全部 →" : "View All →";
  const productsViewAllLong =
    locale === "fa"
      ? "← مشاهده همه محصولات"
      : locale === "zh"
        ? "← 查看全部产品"
        : "View All Products →";

  function handleHomeAnchoredNav(e: MouseEvent<HTMLAnchorElement>, scrollTargetId?: string) {
    if (!scrollTargetId || !pathname || pathname !== homePath) return;
    e.preventDefault();
    scrollToSectionBelowStickyHeader(scrollTargetId, { behavior: "smooth" });
    window.history.replaceState(null, "", `${homePath}#${scrollTargetId}`);
  }

  const desktopBarExpandedH = 70;
  const desktopBarCompactH = 54;
  const barHeightPx = compactMobileBar
    ? 56
    : isMobile
      ? 76
      : compactDesktopBar
        ? desktopBarCompactH
        : desktopBarExpandedH;

  const logoFontPx =
    compactMobileBar ? 15 : compactDesktopBar ? 14 : isMobile ? 17 : 16;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: easeOut }}
      className={`fixed inset-x-0 top-0 z-[100] overflow-visible ${
        compactDesktopBar ? "md:mx-6 lg:mx-10 xl:mx-14 md:pt-3" : ""
      }`}
      style={{
        ...shellBackground,
        transition:
          "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, backdrop-filter 0.35s ease",
      }}
    >
      <motion.div
        className={`flex items-center justify-between gap-6 px-4 sm:px-12 ${
          compactDesktopBar ? "md:rounded-2xl md:overflow-visible md:max-w-[1200px] md:mx-auto" : ""
        }`}
        dir="ltr"
        initial={false}
        animate={{ height: barHeightPx }}
        style={rowBarSurface}
        transition={{ duration: 0.35, ease: easeOut }}
      >
        {/* Logo */}
        <Link href={homePath} className="shrink-0 flex items-center gap-1.5 select-none" dir="ltr">
          <motion.span
            className="font-black tracking-tight leading-none block"
            animate={{ fontSize: logoFontPx }}
            transition={{ duration: 0.35, ease: easeOut }}
            style={{ color: C.accent, fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            ALL
          </motion.span>
          <motion.span
            className="font-black tracking-tight leading-none block"
            animate={{ fontSize: logoFontPx }}
            transition={{ duration: 0.35, ease: easeOut }}
            style={{ color: C.text1, fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            IN ONE
          </motion.span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 ml-auto mr-6" dir={isRTL ? "rtl" : "ltr"}>
          {navLinks.map((l) => {
            const isActive =
              (l.page === "products" && activePage === "products") ||
              (l.page === "warranty" && activePage === "warranty") ||
              (l.page === "contact" && activePage === "contact") ||
              (l.page === "home" && l.label === homeNavLabel && activePage === "home");
            const isProducts = l.href === localePath(locale, "/products");

            if (isProducts) {
              return (
                <div
                  key={l.label}
                  className="relative"
                  onMouseEnter={() => setDesktopDropdown(true)}
                  onMouseLeave={() => setDesktopDropdown(false)}
                >
                  <Link
                    href={l.href}
                    className="flex items-center gap-1 relative transition-colors duration-300"
                    style={{ fontFamily: YK, fontSize: "12px", fontWeight: 500, color: isActive ? C.accent : C.text2, textDecoration: "none" }}
                  >
                    {l.label}
                    <motion.svg
                      animate={{ rotate: desktopDropdown ? 180 : 0 }}
                      transition={{ duration: 0.18 }}
                      width="11" height="11" viewBox="0 0 12 12" fill="none"
                      style={{ color: isActive ? C.accent : C.text3 }}
                    >
                      <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                    {isActive && <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full" style={{ background: C.accent }} />}
                  </Link>

                  <AnimatePresence>
                    {desktopDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full mt-3 min-w-[220px] rounded-2xl overflow-hidden z-50"
                        style={{
                          background: isDark ? "rgba(10,10,10,0.96)" : "rgba(255,255,255,0.98)",
                          backdropFilter: "blur(20px)",
                          border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                          boxShadow: isDark ? "0 16px 48px rgba(0,0,0,0.6)" : "0 16px 48px rgba(0,0,0,0.12)",
                          ...(isRTL ? { right: 0 } : { left: 0 }),
                        }}
                        dir={isRTL ? "rtl" : "ltr"}
                      >
                        <div className="py-2">
                          {PRODUCT_CATS.map((cat) => (
                            <Link
                              key={cat.id}
                              href={`${localePath(locale, "/products")}#cat-${cat.id}`}
                              className="flex items-center gap-3 px-4 py-2.5 transition-colors duration-150 group"
                              style={{ fontFamily: YK, fontSize: "13px", color: C.text2 }}
                              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = C.accent; }}
                              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = C.text2; }}
                              onClick={() => setDesktopDropdown(false)}
                            >
                              <span className="w-1.5 h-1.5 rounded-full shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" style={{ background: C.accent }} />
                              {catLabel(locale, cat)}
                            </Link>
                          ))}
                          <div style={{ height: "1px", margin: "6px 16px", background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />
                          <Link
                            href={localePath(locale, "/products")}
                            className="flex items-center gap-2 px-4 py-2.5 text-[12px] font-semibold transition-colors duration-150"
                            style={{ fontFamily: YK, color: C.accent }}
                            onClick={() => setDesktopDropdown(false)}
                          >
                            {productsViewAllShort}
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={l.label}
                href={l.href}
                className="relative transition-colors duration-300"
                style={{ fontFamily: YK, fontSize: "12px", fontWeight: 500, color: isActive ? C.accent : C.text2, textDecoration: "none" }}
                onClick={(e) =>
                  handleHomeAnchoredNav(e, "scrollTargetId" in l ? l.scrollTargetId : undefined)
                }
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = C.accent; }}
                onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = C.text2; }}
              >
                {l.label}
                {isActive && <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full" style={{ background: C.accent }} />}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Language switcher */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {alternateLocales.map((loc) => (
              <Link
                key={loc}
                href={localizedPath(loc, pathForLocale)}
                className="flex items-center gap-2 text-[12px] font-bold tracking-wide transition-colors duration-200"
                style={{ color: C.text3 }}
                aria-label={localeSwitchAria(loc)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = C.accent;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = C.text3;
                }}
              >
                <LocaleFlagMark locale={loc} />
                <span className={loc === "en" ? "tracking-widest uppercase" : undefined}>
                  {localeNavLabel(loc, "short")}
                </span>
              </Link>
            ))}
          </div>

          {/* Cart icon */}
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative p-2 flex items-center justify-center rounded-full transition-all duration-200"
            style={{ color: C.text2 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.text1; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.text2; }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M2.5 2.5h1.667l2.666 8.333h8.334l2-6.666H6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="8.5" cy="14.5" r="1.2" fill="currentColor" />
              <circle cx="13.5" cy="14.5" r="1.2" fill="currentColor" />
            </svg>
            <AnimatePresence>
              {totalQty > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="absolute top-0.5 right-0.5 min-w-[16px] h-4 rounded-full flex items-center justify-center text-[9px] font-black px-1"
                  style={{ background: C.accent, color: isDark ? "#000" : "#fff" }}
                >
                  {totalQty > 9 ? "9+" : totalQty}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Theme toggle */}
          <ThemeToggle />


          {/* Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden p-2 flex flex-col gap-[5px]"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-5 h-[1.8px] rounded-full transition-all duration-300"
                style={{
                  background: C.text1,
                  transform: open
                    ? i === 0 ? "rotate(45deg) translateY(6.8px)"
                    : i === 1 ? "scaleX(0)"
                    : "rotate(-45deg) translateY(-6.8px)"
                    : "none",
                  opacity: open && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </motion.div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col"
            style={{
              background: isDark ? "rgba(0,0,0,0.95)" : "rgba(255,255,255,0.97)",
              backdropFilter: "blur(20px)",
              borderTop: `1px solid ${C.divider}`,
            }}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {navLinks.map((l) => {
              const isProducts = l.href === localePath(locale, "/products");
              const isMobileLinkActive =
                (l.page === "warranty" && activePage === "warranty") ||
                (l.page === "contact" && activePage === "contact") ||
                (l.page === "home" && l.label === homeNavLabel && activePage === "home");
              return (
                <div key={l.label} style={{ borderBottom: `1px solid ${C.divider}` }}>
                  {isProducts ? (
                    <>
                      {/* Expandable Products row */}
                      <button
                        onClick={() => setProductsOpen((v) => !v)}
                        className="w-full flex items-center justify-between px-6 py-4 transition-colors duration-200"
                        style={{ fontFamily: YK, fontSize: "15px", color: activePage === "products" ? C.accent : C.text2, background: "transparent" }}
                      >
                        <span>{l.label}</span>
                        <motion.svg
                          animate={{ rotate: productsOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          width="14" height="14" viewBox="0 0 14 14" fill="none"
                          style={{ color: C.text3 }}
                        >
                          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </motion.svg>
                      </button>

                      {/* Sub-categories */}
                      <AnimatePresence>
                        {productsOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex flex-col"
                            style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}
                          >
                            {PRODUCT_CATS.map((cat) => (
                              <Link
                                key={cat.id}
                                href={`${localePath(locale, "/products")}#cat-${cat.id}`}
                                onClick={() => { setOpen(false); setProductsOpen(false); }}
                                className="flex items-center gap-3 px-8 py-3 transition-colors duration-200"
                                style={{ fontFamily: YK, fontSize: "13px", color: C.text3 }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = C.accent; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = C.text3; }}
                              >
                                <span className="w-1 h-1 rounded-full shrink-0" style={{ background: C.accent }} />
                                {catLabel(locale, cat)}
                              </Link>
                            ))}
                            <Link
                              href={localePath(locale, "/products")}
                              onClick={() => { setOpen(false); setProductsOpen(false); }}
                              className="flex items-center gap-2 px-8 py-3 text-[12px] font-semibold transition-colors duration-200"
                              style={{ fontFamily: YK, color: C.accent }}
                            >
                              {productsViewAllLong}
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={l.href}
                      onClick={(e) => {
                        handleHomeAnchoredNav(e, "scrollTargetId" in l ? l.scrollTargetId : undefined);
                        setOpen(false);
                      }}
                      className="flex items-center px-6 py-4 transition-colors duration-200"
                      style={{ fontFamily: YK, fontSize: "15px", color: isMobileLinkActive ? C.accent : C.text2 }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = C.accent; }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = isMobileLinkActive ? C.accent : C.text2;
                      }}
                    >
                      {l.label}
                    </Link>
                  )}
                </div>
              );
            })}

            <div className="flex items-center justify-between px-6 py-4 gap-3 flex-wrap">
              <div className="flex flex-wrap items-center gap-2">
                {alternateLocales.map((loc) => (
                  <Link
                    key={loc}
                    href={localizedPath(loc, pathForLocale)}
                    className="flex items-center gap-2 py-2 px-3 rounded-xl text-sm font-semibold transition-colors duration-200"
                    style={{ border: `1px solid ${C.navBorder}`, color: C.text3 }}
                    aria-label={localeSwitchAria(loc)}
                  >
                    <LocaleFlagMark locale={loc} />
                    {localeNavLabel(loc, "long")}
                  </Link>
                ))}
              </div>
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
