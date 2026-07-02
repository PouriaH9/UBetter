"use client";

import { useState, useEffect, useCallback, useRef, type ReactNode, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SharedNavbar from "@/components/shared-navbar";
import SharedFooter from "@/components/shared-footer";
import { ScrollSheetOverHero, ScrollStackLayer } from "@/components/scroll-stack-layers";
import CartDrawer from "@/components/cart-drawer";
import { CATEGORIES, tx } from "@/components/products-section";
import { PRODUCT_IMAGES, DETAIL_IMAGES, HERO_IMAGES } from "@/assets/productImages";
import { useTheme, DARK_C, LIGHT_C, type ColorPalette } from "@/contexts/theme-context";
import { useCart } from "@/contexts/cart-context";
import { useProductCommerceMap, type ProductCommerceInfo } from "@/hooks/use-product-commerce";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { localeDir, ui3 } from "@/i18n/locale-ui";

// ─── Constants ────────────────────────────────────────────────────────────────

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";
const easeOut = [0.22, 1, 0.36, 1] as const;

// ─── Reveal animation wrapper ─────────────────────────────────────────────────

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <div className={className}>{children}</div>;
}

// ─── Spec Modal ───────────────────────────────────────────────────────────────

// Spec modal stays dark regardless of page theme (standard modal UX)
function SpecModal({ num, locale, onClose }: { num: number; locale: Locale; onClose: () => void }) {
  const img = DETAIL_IMAGES[num] ?? null;
  const dir = localeDir(locale);
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
      style={{ background: isDark ? "rgba(0,0,0,0.93)" : "rgba(0,0,0,0.65)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
      onClick={onClose}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 50%, ${C.accentGlow} 0%, transparent 65%)` }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.28, ease: easeOut }}
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden"
        style={{ background: C.card, border: `1px solid ${C.accentBorder}`, transition: "background 0.35s ease" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0" style={{ borderBottom: `1px solid ${C.divider}` }} dir={dir}>
          <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.15em] ${locale === "en" ? "uppercase" : ""}`} style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}`, color: C.accent }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.accent }} />
            {ui3(locale, `مشخصات فنی — محصول ${num}`, `Technical Specifications — Product ${num}`, `技术规格 — 产品 ${num}`)}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", border: `1px solid ${C.cardBorder}` }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = C.accentBg; (e.currentTarget as HTMLButtonElement).style.borderColor = C.accentBorder; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"; (e.currentTarget as HTMLButtonElement).style.borderColor = C.cardBorder; }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1.5 1.5l10 10M11.5 1.5l-10 10" stroke={C.text1} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Image */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-6 min-h-0" style={{ background: isDark ? C.card : "#ffffff" }}>
          {img ? (
            <Image src={img} alt={`Product ${num} specifications`} className="w-full h-auto object-contain rounded-xl" style={{ maxHeight: "75vh" }} sizes="(max-width:768px) 95vw, 900px" />
          ) : (
            <div className="flex flex-col items-center gap-3 py-20">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-25">
                <rect x="6" y="6" width="28" height="28" rx="4" stroke={C.accent} strokeWidth="1.5" strokeDasharray="4 3" />
                <path d="M14 20h12M20 14v12" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p style={{ color: C.text3, fontSize: "14px" }}>
                {ui3(locale, "مشخصات فنی در دسترس نیست", "Technical specifications not available", "暂无技术规格")}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0" style={{ borderTop: `1px solid ${C.divider}` }} dir={dir}>
          <span style={{ color: C.text4, fontSize: "11px" }}>
            {ui3(
              locale,
              "لیان صدر ملل | نماینده رسمی UBETTER در ایران",
              "Lian Sadr Mellal | Official UBETTER Representative in Iran",
              "联萨徳梅兰 | UBETTER 伊朗官方合作伙伴",
            )}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-[12px] font-medium transition-all duration-200"
            style={{ border: `1px solid ${C.cardBorder}`, color: C.text3 }}
            onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.accent; b.style.borderColor = C.accentBorder; }}
            onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.text3; b.style.borderColor = C.cardBorder; }}
          >
            {ui3(locale, "بستن", "Close", "关闭")}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Add-to-Cart Button ───────────────────────────────────────────────────────

function AddToCartButton({ onAdd, isInCart, locale, C, isDark }: {
  onAdd: () => void;
  isInCart: boolean;
  locale: Locale;
  C: ColorPalette;
  isDark: boolean;
}) {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.93 }}
      className="w-full py-2 rounded-xl text-[11px] font-semibold transition-all duration-200 flex items-center justify-center gap-1.5"
      style={{
        background: added ? C.accent : (isInCart ? C.accentBg : C.accent),
        color: added ? (isDark ? "#000" : "#fff") : (isInCart ? C.accent : (isDark ? "#000" : "#fff")),
        border: isInCart && !added ? `1px solid ${C.accentBorder}` : "1px solid transparent",
        fontFamily: YK,
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {added ? (
          <motion.svg key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.18 }}
            width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        ) : (
          <motion.svg key="cart" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.18 }}
            width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M1 1h1.5l1.6 5h5.5l1.4-4H4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="5.5" cy="9.5" r="0.8" fill="currentColor" />
            <circle cx="9" cy="9.5" r="0.8" fill="currentColor" />
          </motion.svg>
        )}
      </AnimatePresence>
      {added ? ui3(locale, "اضافه شد", "Added!", "已添加") : ui3(locale, "افزودن", "Add", "加入")}
    </motion.button>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ productNum, product, locale, onOpenSpecs, onAddToCart, commerce }: {
  productNum: number;
  product: { name: { fa: string; en: string }; category: { fa: string; en: string }; description: { fa: string; en: string }; features: { fa: string; en: string }[]; applications: { fa: string; en: string }[] };
  locale: Locale;
  onOpenSpecs: () => void;
  onAddToCart: () => void;
  commerce?: ProductCommerceInfo;
}) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const dir = localeDir(locale);
  const img = PRODUCT_IMAGES[productNum] ?? null;

  return (
    <Reveal className="h-full">
      <div className="card-shimmer-border" style={{ color: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.45)" }}>
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25 }}
        className="card-shimmer-inner flex flex-col"
        style={{
          background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.72)",
          backdropFilter: "blur(6px) saturate(140%)",
          WebkitBackdropFilter: "blur(6px) saturate(140%)",
          boxShadow: isDark ? "inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.22)" : "inset 0 1px 0 rgba(255,255,255,0.9), 0 4px 20px rgba(0,0,0,0.06)",
          outline: isDark ? "1px solid rgba(255,255,255,0.09)" : "1px solid rgba(0,0,0,0.1)",
        }}
      >
        <Link
          href={localePath(locale, `/products/${productNum}`)}
          className="flex items-center justify-center"
          style={{ height: "200px", background: "#ffffff", position: "relative", borderBottom: `1px solid rgba(0,0,0,0.06)` }}
        >
          {img ? (
            <div className="relative h-full" style={{ width: "160px" }}>
              <Image src={img} alt={tx(product.name, locale)} fill sizes="160px" className="object-contain" />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 opacity-25">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect x="6" y="10" width="24" height="18" rx="3" stroke={C.accent} strokeWidth="1.3" />
                <path d="M18 16v6M15 19h6" stroke={C.accent} strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
          )}
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black pointer-events-none"
            style={{ background: C.numBadgeBg, border: `1px solid ${C.cardBorder}`, color: C.numBadgeTxt, fontFamily: "'Inter', system-ui" }}>
            {productNum <= 21 ? productNum : productNum === 22 ? "E" : "H"}
          </div>
        </Link>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5" dir={dir}>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-[0.14em] mb-3 self-start ${locale === "en" ? "uppercase" : ""}`}
            style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}`, color: C.accent }}>
            {tx(product.category, locale)}
          </span>

          <Link href={localePath(locale, `/products/${productNum}`)} className="block group/title">
            <h3 className="font-bold mb-3 leading-snug transition-opacity duration-200 group-hover/title:opacity-85"
              style={{ color: C.text1, fontFamily: YK, fontSize: "15px", lineHeight: 1.4, minHeight: "42px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {tx(product.name, locale)}
            </h3>
          </Link>

          {commerce?.priceLabel && (
            <p className="mb-2 font-bold text-[13px]" style={{ color: C.accent, fontFamily: YK }}>
              {commerce.priceLabel}
            </p>
          )}

          <div className="mb-3 h-px" style={{ background: C.divider }} />

          <div className="space-y-2 mb-4 flex-1">
            {product.features.slice(0, 4).map((feat, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-[5px] h-[5px] rounded-full mt-[6px] shrink-0" style={{ background: C.accent }} />
                <span style={{ color: C.text2, fontSize: "12px", lineHeight: 1.55 }}>{tx(feat, locale)}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.applications.slice(0, 3).map((app, i) => (
              <div key={i} className="tag-shimmer-border" style={{ color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.25)" }}>
                <span className="tag-shimmer-inner px-2 py-0.5 text-[10px] block"
                  style={{ background: C.tagBg, color: C.tagText }}>
                  {tx(app, locale)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <Link
                href={localePath(locale, `/products/${productNum}`)}
                className="py-2 rounded-xl text-[11px] font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 text-center"
                style={{ background: C.accent, color: isDark ? "#000" : "#fff", border: `1px solid ${C.accentBorder}`, fontFamily: YK }}
              >
                {ui3(locale, "جزئیات", "Details", "详情")}
              </Link>
              <button type="button" onClick={onOpenSpecs}
                className="py-2 rounded-xl text-[11px] font-semibold transition-all duration-200 flex items-center justify-center gap-1.5"
                style={{ border: `1px solid ${isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.12)"}`, color: C.text2, background: "transparent", fontFamily: YK }}
                onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)"; b.style.color = C.text1; }}
                onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "transparent"; b.style.color = C.text2; }}>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <rect x="1" y="1" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M4 6h4M6 4v4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
                {ui3(locale, "مشخصات", "Specs", "规格")}
              </button>
            </div>
            <AddToCartButton onAdd={onAddToCart} isInCart={false} locale={locale} C={C} isDark={isDark} />
          </div>
        </div>
      </motion.div>
      </div>
    </Reveal>
  );
}

// ─── Category nav — shared list (hero glass vs theme floating) ─────────────────

function heroChipBaseStyle(isActive: boolean, isDark: boolean, C: ColorPalette): CSSProperties {
  if (isDark) {
    return isActive
      ? {
          color: C.accent,
          background: "rgba(255,255,255,0.14)",
          border: `1px solid ${C.accentBorder}`,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.22)",
        }
      : {
          color: "rgba(255,255,255,0.98)",
          background: "rgba(0,0,0,0.28)",
          border: "1px solid rgba(255,255,255,0.22)",
        };
  }
  return isActive
    ? {
        color: C.accent,
        background: C.accentBg,
        border: `1px solid ${C.accentBorder}`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.85)`,
      }
    : {
        color: C.text1,
        background: "rgba(255,255,255,0.72)",
        border: `1px solid ${C.cardBorder}`,
      };
}

function CategoryNavList({
  locale,
  activeId,
  onSelect,
  surface,
  heroLayout = "stack",
}: {
  locale: Locale;
  activeId: string;
  onSelect: (id: string) => void;
  surface: "hero" | "theme";
  /** Only applies when `surface="hero"`: vertical stack vs horizontal chips. */
  heroLayout?: "stack" | "inline";
}) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const isHeroInline = surface === "hero" && heroLayout === "inline";

  return (
    <>
      {CATEGORIES.map((cat) => {
        const isActive = cat.id === activeId;
        const n = cat.products.length;

        const heroStyle = surface === "hero" ? heroChipBaseStyle(isActive, isDark, C) : {};
        const themeStyle = {
          color: isActive ? C.accent : C.text2,
          background: isActive ? C.accentBg : "transparent",
          border: `1px solid ${isActive ? C.accentBorder : "transparent"}`,
          boxShadow: isActive ? `inset 0 0 0 1px ${C.accentBorder}` : undefined,
        };

        const btnClass = isHeroInline
          ? "inline-flex items-center gap-1 rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 shrink-0 transition-colors duration-200 max-w-[min(100%,10.5rem)]"
          : "flex w-full items-baseline justify-between gap-1 rounded-lg px-1.5 py-1 sm:px-2 sm:py-1.5 text-start transition-colors duration-200";

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            className={btnClass}
            style={surface === "hero" ? heroStyle : themeStyle}
            onMouseEnter={(e) => {
              if (!isActive) {
                const b = e.currentTarget;
                if (surface === "hero") {
                  if (isDark) {
                    b.style.background = "rgba(255,255,255,0.14)";
                    b.style.borderColor = "rgba(255,255,255,0.32)";
                    b.style.color = "#ffffff";
                  } else {
                    b.style.background = "rgba(255,255,255,0.92)";
                    b.style.borderColor = C.accentBorder;
                    b.style.color = C.text1;
                  }
                } else {
                  b.style.background = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
                  b.style.color = C.text1;
                }
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                const b = e.currentTarget;
                if (surface === "hero") {
                  const s = heroChipBaseStyle(false, isDark, C);
                  b.style.background = s.background as string;
                  b.style.color = s.color as string;
                  b.style.border = s.border as string;
                  b.style.boxShadow = s.boxShadow != null ? String(s.boxShadow) : "";
                } else {
                  b.style.background = "transparent";
                  b.style.color = C.text2;
                  b.style.border = "1px solid transparent";
                  b.style.boxShadow = "none";
                }
              }
            }}
          >
            <span
              className={`min-w-0 font-semibold leading-tight ${isHeroInline ? "text-[9px] sm:text-[10px] truncate" : "flex-1 text-[9px] sm:text-[10px] line-clamp-2"}`}
            >
              {tx(cat.title, locale)}
            </span>
            <span
              className={`shrink-0 font-bold tabular-nums ${isHeroInline ? "text-[9px] sm:text-[10px]" : "text-[9px] sm:text-[10px]"}`}
              style={{
                color:
                  isActive
                    ? C.accent
                    : surface === "hero"
                      ? isDark
                        ? "rgba(255,255,255,0.85)"
                        : C.text3
                      : C.text3,
              }}
            >
              {n}
            </span>
          </button>
        );
      })}
    </>
  );
}

// ─── Category side nav (floating, left edge — after hero) ──────────────────────

function CategorySideNav({
  locale,
  activeId,
  onSelect,
  floatingActive,
}: {
  locale: Locale;
  activeId: string;
  onSelect: (id: string) => void;
  floatingActive: boolean;
}) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const labels = { nav: ui3(locale, "دسته‌های محصول", "Product categories", "产品类别") };
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!floatingActive) {
      setVisible(false);
      return;
    }
    lastScrollY.current = window.scrollY;
  }, [floatingActive]);

  useEffect(() => {
    if (!mounted || !floatingActive) return;
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      lastScrollY.current = y;

      if (delta > 10) setVisible(false);
      else if (delta < -8) setVisible(true);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted, floatingActive]);

  if (!mounted || !floatingActive) return null;

  const nav = (
    <nav
      aria-label={labels.nav}
      aria-hidden={!visible}
      dir={localeDir(locale)}
      className="fixed z-[45] flex flex-col gap-0.5 rounded-2xl p-1 sm:p-1.5 w-[8.25rem] sm:w-36 max-h-[min(26rem,calc(100vh-5.25rem))] overflow-y-auto overflow-x-hidden shadow-lg"
      style={{
        top: "calc(5rem + 0.25rem + env(safe-area-inset-top, 0px))",
        left: "max(0.375rem, env(safe-area-inset-left, 0px))",
        right: "auto",
        bottom: "auto",
        background: C.navBg,
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        border: `1px solid ${isDark ? C.navBorder : "rgba(0,0,0,0.08)"}`,
        boxShadow: isDark
          ? "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 40px rgba(0,0,0,0.45)"
          : "inset 0 1px 0 rgba(255,255,255,0.75), 0 10px 36px rgba(0,0,0,0.1)",
        fontFamily: YK,
        transform: visible ? "translateX(0)" : "translateX(calc(-100% - 16px))",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition:
          "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.22s ease, background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      <CategoryNavList locale={locale} activeId={activeId} onSelect={onSelect} surface="theme" />
    </nav>
  );

  return createPortal(nav, document.body);
}

// ─── Category Section ─────────────────────────────────────────────────────────

function CategorySection({ cat, catIndex, startIndex, locale, onOpenSpecs, commerceMap }: {
  cat: typeof CATEGORIES[0]; catIndex: number; startIndex: number; locale: Locale; onOpenSpecs: (num: number) => void;
  commerceMap: Record<number, ProductCommerceInfo>;
}) {
  const { addItem, openCart } = useCart();
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const dir = localeDir(locale);
  const headBg = catIndex % 2 === 0 ? C.sectionHead1 : C.sectionHead2;
  const gridBg = catIndex % 2 === 0 ? C.sectionGrid1 : C.sectionGrid2;

  return (
    <section id={`cat-${cat.id}`} className="scroll-mt-[88px] sm:scroll-mt-[96px]">
      <div className="relative overflow-hidden" style={{ background: headBg, borderBottom: `1px solid ${C.divider}`, transition: "background 0.35s ease" }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-3" dir={dir}>
          <Reveal>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div dir="ltr" className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-[0.18em] shrink-0 ${locale === "en" ? "uppercase" : ""}`}
                  style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}`, color: C.accent }}>
                  <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: C.accent }} />
                  {tx(cat.pill, locale)}
                </div>
                <h2 className="font-black leading-tight" style={{ color: C.text1, fontFamily: YK, fontSize: "clamp(16px, 2vw, 22px)" }}>
                  {tx(cat.title, locale)}
                </h2>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div style={{ background: gridBg, transition: "background 0.35s ease" }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-6 lg:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {cat.products.map((product, pi) => {
              const productNum = startIndex + pi + 1;
              return (
                <ProductCard
                  key={pi}
                  productNum={productNum}
                  product={product}
                  locale={locale}
                  commerce={commerceMap[productNum]}
                  onOpenSpecs={() => onOpenSpecs(productNum)}
                  onAddToCart={() => {
                    const info = commerceMap[productNum];
                    addItem({
                      productNum,
                      name: product.name,
                      category: product.category,
                      variantId: info?.variantId,
                      unitPriceIrr: info?.priceIrr,
                    });
                    openCart();
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Page Header ──────────────────────────────────────────────────────────────

function PageHeader({
  locale,
  showCategoryNav,
  activeCategoryId,
  onCategorySelect,
}: {
  locale: Locale;
  showCategoryNav: boolean;
  activeCategoryId: string;
  onCategorySelect: (id: string) => void;
}) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const dir = localeDir(locale);
  const navLabel = ui3(locale, "دسته‌های محصول", "Product categories", "产品类别");

  return (
    <div className="relative z-0 overflow-hidden min-h-screen flex flex-col justify-start pt-[92px] sm:pt-[96px]">
      {/* Background images */}
      <div className="absolute inset-0">
        <Image src={HERO_IMAGES.products.desktop} alt="" fill className="object-cover object-center hidden sm:block" sizes="100vw" priority />
        <Image src={HERO_IMAGES.products.mobile} alt="" fill className="object-cover object-top sm:hidden" sizes="100vw" priority />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background:
          "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.32) 50%, rgba(0,0,0,0.52) 100%)"
        }} />
      </div>
      {/* Accent line under navbar */}
      <div className="absolute top-[80px] inset-x-0 h-px z-10 pointer-events-none" style={{ background: `linear-gradient(90deg,transparent,${C.accentBorder} 30%,${C.accent}55 50%,${C.accentBorder} 70%,transparent)` }} />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 pt-2 pb-10 sm:pt-3 sm:pb-14 lg:pb-16" dir={dir}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: easeOut }}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 sm:mb-5 text-[12px]" style={{ color: "rgba(255,255,255,0.5)" }}>
            <a href={localePath(locale, "/")} className="transition-colors duration-200" style={{ color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)"; }}>
              {ui3(locale, "خانه", "Home", "首页")}
            </a>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={locale === "fa" ? "rotate-180" : ""}><path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ color: "#ffffff" }}>{ui3(locale, "محصولات", "Products", "产品")}</span>
          </div>

          <div className="flex flex-col items-center gap-3 sm:gap-4 text-center">
            <h1 className="font-black leading-none"
              style={{
                color: "#ffffff",
                fontFamily: YK,
                fontSize: "clamp(28px, 4vw, 56px)",
                letterSpacing: locale === "fa" ? "0" : locale === "zh" ? "-0.02em" : "-0.03em",
                textShadow: "0 2px 24px rgba(0,0,0,0.65)",
              }}>
              {locale === "fa" ? (
                <>راهکارهای ذخیره{" "}<span style={{ color: "#ffffff", opacity: 0.7 }}>انرژی</span></>
              ) : locale === "zh" ? (
                <><span style={{ color: "#ffffff", opacity: 0.7 }}>储能</span>{" "}解决方案</>
              ) : (
                <>Energy Storage{" "}<span style={{ color: "#ffffff", opacity: 0.7 }}>Solutions</span></>
              )}
            </h1>

            {showCategoryNav && (
              <nav
                aria-label={navLabel}
                dir={dir}
                className="w-full max-w-xl mx-auto flex flex-row flex-wrap justify-center gap-1.5 sm:gap-2 rounded-2xl py-2 px-2 sm:px-3 shadow-lg"
                style={{
                  ...(isDark
                    ? {
                        background: "rgba(255,255,255,0.1)",
                        backdropFilter: "blur(12px) saturate(140%)",
                        WebkitBackdropFilter: "blur(12px) saturate(140%)",
                        border: "1px solid rgba(255,255,255,0.22)",
                        boxShadow:
                          "inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -1px 0 rgba(0,0,0,0.06), 0 8px 40px rgba(0,0,0,0.2)",
                      }
                    : {
                        background: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(14px) saturate(140%)",
                        WebkitBackdropFilter: "blur(14px) saturate(140%)",
                        border: `1px solid ${C.cardBorder}`,
                        boxShadow:
                          "inset 0 1px 0 rgba(255,255,255,0.95), 0 8px 32px rgba(0,0,0,0.14)",
                      }),
                  fontFamily: YK,
                }}
              >
                <CategoryNavList locale={locale} activeId={activeCategoryId} onSelect={onCategorySelect} surface="hero" heroLayout="inline" />
              </nav>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Root Export ──────────────────────────────────────────────────────────────

export default function ProductsPageClient({ locale }: { locale: Locale }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const { map: commerceMap } = useProductCommerceMap(locale);
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].id);
  const [specModal, setSpecModal] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [viewHeight, setViewHeight] = useState(800);
  const closeModal = useCallback(() => setSpecModal(null), []);

  useEffect(() => {
    const measure = () => setViewHeight(window.innerHeight);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      setShowScrollTop(y > 500);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showHeroCategoryNav = scrollY < viewHeight * 0.9;

  // Compute cumulative start indices for product numbering
  const catStartIndices = CATEGORIES.reduce<number[]>((acc, cat, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + CATEGORIES[i - 1].products.length);
    return acc;
  }, []);

  // Scroll to category section when tab clicked
  const handleTabSelect = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(`cat-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Update active tab based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("cat-", "");
            setActiveTab(id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    CATEGORIES.forEach((cat) => {
      const el = document.getElementById(`cat-${cat.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      dir={localeDir(locale)}
      className="overflow-x-hidden min-h-screen"
      style={{ background: C.pageBg, color: C.text1, transition: "background 0.35s ease, color 0.35s ease" }}
    >
      <SharedNavbar locale={locale} activePage="products" />
      <CartDrawer locale={locale} />

      <PageHeader
        locale={locale}
        showCategoryNav={showHeroCategoryNav}
        activeCategoryId={activeTab}
        onCategorySelect={handleTabSelect}
      />
      <CategorySideNav
        locale={locale}
        activeId={activeTab}
        onSelect={handleTabSelect}
        floatingActive={!showHeroCategoryNav}
      />

      <main>
        <ScrollSheetOverHero>
          <CategorySection
            cat={CATEGORIES[0]}
            catIndex={0}
            startIndex={catStartIndices[0]}
            locale={locale}
            commerceMap={commerceMap}
            onOpenSpecs={(num) => setSpecModal(num)}
          />
        </ScrollSheetOverHero>

        {CATEGORIES.slice(1).map((cat, i) => (
          <ScrollStackLayer key={cat.id} zIndex={20 + i * 2} overlapVh={97}>
            <CategorySection
              cat={cat}
              catIndex={i + 1}
              startIndex={catStartIndices[i + 1]}
              locale={locale}
              commerceMap={commerceMap}
              onOpenSpecs={(num) => setSpecModal(num)}
            />
          </ScrollStackLayer>
        ))}
      </main>

      <SharedFooter locale={locale} />

      {/* Spec Modal */}
      <AnimatePresence>
        {specModal !== null && (
          <SpecModal key="spec-modal" num={specModal} locale={locale} onClose={closeModal} />
        )}
      </AnimatePresence>

      {/* ── Scroll-to-top button ── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-top"
            initial={{ opacity: 0, scale: 0.7, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 16 }}
            transition={{ duration: 0.25, ease: easeOut }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label={ui3(locale, "بازگشت به بالا", "Back to top", "返回顶部")}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 group"
            style={{ outline: "none" }}
          >
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: C.accentGlow, filter: "blur(10px)", borderRadius: "50%" }} />
            <span className="relative flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-300 group-hover:scale-110"
              style={{ background: C.card, border: `1px solid ${C.accentBorder}`, boxShadow: `0 4px 24px ${isDark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.12)"}` }}
              onMouseEnter={(e) => { const s = e.currentTarget as HTMLSpanElement; s.style.background = C.accent; s.style.borderColor = C.accent; }}
              onMouseLeave={(e) => { const s = e.currentTarget as HTMLSpanElement; s.style.background = C.card; s.style.borderColor = C.accentBorder; }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ color: C.accent }} className="group-hover:!text-black transition-colors duration-200">
                <path d="M9 14V4M4.5 8.5L9 4l4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
