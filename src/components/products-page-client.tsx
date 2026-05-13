"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SharedNavbar from "@/components/shared-navbar";
import SharedFooter from "@/components/shared-footer";
import CartDrawer from "@/components/cart-drawer";
import { CATEGORIES, tx } from "@/components/products-section";
import { PRODUCT_IMAGES, DETAIL_IMAGES } from "@/assets/productImages";
import { useTheme, DARK_C, LIGHT_C, type ColorPalette } from "@/contexts/theme-context";
import { useCart } from "@/contexts/cart-context";
import productsHeroDesktop from "@/assets/Source/products HERO desktopsize.png";
import productsHeroMobile from "@/assets/Source/products HERO mobilesize.png";
import type { Locale } from "@/i18n/config";

// ─── Constants ────────────────────────────────────────────────────────────────

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";
const easeOut = [0.22, 1, 0.36, 1] as const;

// ─── Reveal animation wrapper ─────────────────────────────────────────────────

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <div className={className}>{children}</div>;
}

// ─── Spec Modal ───────────────────────────────────────────────────────────────

// Spec modal stays dark regardless of page theme (standard modal UX)
const MODAL_ACCENT = "#7CFF00";
function SpecModal({ num, locale, onClose }: { num: number; locale: string; onClose: () => void }) {
  const img = DETAIL_IMAGES[num] ?? null;
  const isRTL = locale === "fa";
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
        <div className="flex items-center justify-between px-6 py-4 shrink-0" style={{ borderBottom: `1px solid ${C.divider}` }} dir={isRTL ? "rtl" : "ltr"}>
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase" style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}`, color: C.accent }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.accent }} />
            {isRTL ? `مشخصات فنی — محصول ${num}` : `Technical Specifications — Product ${num}`}
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
                {isRTL ? "مشخصات فنی در دسترس نیست" : "Technical specifications not available"}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0" style={{ borderTop: `1px solid ${C.divider}` }} dir={isRTL ? "rtl" : "ltr"}>
          <span style={{ color: C.text4, fontSize: "11px" }}>
            {isRTL ? "لیان صدر ملل | نماینده رسمی UBETTER در ایران" : "Lian Sadr Mellal | Official UBETTER Representative in Iran"}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-[12px] font-medium transition-all duration-200"
            style={{ border: `1px solid ${C.cardBorder}`, color: C.text3 }}
            onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.accent; b.style.borderColor = C.accentBorder; }}
            onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.color = C.text3; b.style.borderColor = C.cardBorder; }}
          >
            {isRTL ? "بستن" : "Close"}
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
  locale: string;
  C: ColorPalette;
  isDark: boolean;
}) {
  const [added, setAdded] = useState(false);
  const isRTL = locale === "fa";

  const handleClick = () => {
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.93 }}
      className="flex-1 py-2 rounded-xl text-[11px] font-semibold transition-all duration-200 flex items-center justify-center gap-1.5"
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
      {added ? (isRTL ? "اضافه شد" : "Added!") : (isRTL ? "افزودن" : "Add")}
    </motion.button>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ productNum, product, locale, onOpenSpecs, onAddToCart }: {
  productNum: number;
  product: { name: { fa: string; en: string }; category: { fa: string; en: string }; description: { fa: string; en: string }; features: { fa: string; en: string }[]; applications: { fa: string; en: string }[] };
  locale: string;
  onOpenSpecs: () => void;
  onAddToCart: () => void;
}) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const isRTL = locale === "fa";
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
        {/* Image area */}
        <div className="flex items-center justify-center" style={{ height: "200px", background: "#ffffff", position: "relative", borderBottom: `1px solid rgba(0,0,0,0.06)` }}>
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
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black"
            style={{ background: C.numBadgeBg, border: `1px solid ${C.cardBorder}`, color: C.numBadgeTxt, fontFamily: "'Inter', system-ui" }}>
            {productNum <= 21 ? productNum : productNum === 22 ? "E" : "H"}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5" dir={isRTL ? "rtl" : "ltr"}>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-[0.14em] uppercase mb-3 self-start"
            style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}`, color: C.accent }}>
            {tx(product.category, locale)}
          </span>

          <h3 className="font-bold mb-3 leading-snug"
            style={{ color: C.text1, fontFamily: YK, fontSize: "15px", lineHeight: 1.4, minHeight: "42px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {tx(product.name, locale)}
          </h3>

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

          <div className="flex gap-2">
            <button onClick={onOpenSpecs}
              className="flex-1 py-2 rounded-xl text-[11px] font-semibold transition-all duration-200 flex items-center justify-center gap-1.5"
              style={{ border: `1px solid ${isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.12)"}`, color: C.text2, background: "transparent", fontFamily: YK }}
              onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)"; b.style.color = C.text1; }}
              onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "transparent"; b.style.color = C.text2; }}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <rect x="1" y="1" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4 6h4M6 4v4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              {isRTL ? "مشخصات" : "Specs"}
            </button>
            <AddToCartButton onAdd={onAddToCart} isInCart={false} locale={locale} C={C} isDark={isDark} />
          </div>
        </div>
      </motion.div>
      </div>
    </Reveal>
  );
}

// ─── Category Tab Bar ─────────────────────────────────────────────────────────

const CATEGORY_ICONS = [
  // Residential
  <svg key="res" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 7.5L8 2l6 5.5V14H10v-4H6v4H2V7.5z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
  </svg>,
  // Commercial
  <svg key="com" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="6" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.25" />
    <path d="M5 6V4a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  </svg>,
  // EMS
  <svg key="ems" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.25" />
    <path d="M5.5 8l1.5 1.5L10.5 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

function CategoryTabs({ locale, activeId, onSelect }: { locale: string; activeId: string; onSelect: (id: string) => void }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const isRTL = locale === "fa";
  return (
    <div className="fixed top-[80px] left-0 right-0 z-40 overflow-x-auto"
      dir={isRTL ? "rtl" : "ltr"}
      style={{ background: C.tabBg, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: `1px solid ${C.tabBorder}`, transition: "background 0.35s ease" }}>
      <div className="max-w-[1280px] mx-auto px-3 sm:px-10">
        <div className="flex items-stretch gap-0 min-w-max sm:min-w-0">
          {CATEGORIES.map((cat, i) => {
            const isActive = cat.id === activeId;
            return (
              <button key={cat.id} onClick={() => onSelect(cat.id)}
                className="relative flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-5 py-2.5 sm:py-4 text-[11px] sm:text-[13px] font-semibold transition-all duration-200 whitespace-nowrap"
                style={{ color: isActive ? C.accent : C.text3, fontFamily: YK, borderBottom: isActive ? `2px solid ${C.accent}` : "2px solid transparent", background: "transparent" }}
                onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = C.text1; }}
                onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = C.text3; }}>
                {/* Icon hidden on small mobile to save space */}
                <span className="hidden xs:inline sm:inline" style={{ color: isActive ? C.accent : C.text4 }}>{CATEGORY_ICONS[i]}</span>
                <span>{tx(cat.title, locale)}</span>
                <span className="px-1 sm:px-1.5 py-0.5 rounded-full text-[9px] font-black"
                  style={{ background: isActive ? C.accentBg : C.tagBg, color: isActive ? C.accent : C.text4 }}>
                  {cat.products.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Category Section ─────────────────────────────────────────────────────────

function CategorySection({ cat, catIndex, startIndex, locale, onOpenSpecs }: {
  cat: typeof CATEGORIES[0]; catIndex: number; startIndex: number; locale: string; onOpenSpecs: (num: number) => void;
}) {
  const { addItem, openCart } = useCart();
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const isRTL = locale === "fa";
  const headBg = catIndex % 2 === 0 ? C.sectionHead1 : C.sectionHead2;
  const gridBg = catIndex % 2 === 0 ? C.sectionGrid1 : C.sectionGrid2;

  return (
    <section id={`cat-${cat.id}`} className="scroll-mt-[120px] sm:scroll-mt-[140px]">
      <div className="relative overflow-hidden" style={{ background: headBg, borderBottom: `1px solid ${C.divider}`, transition: "background 0.35s ease" }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-3" dir={isRTL ? "rtl" : "ltr"}>
          <Reveal>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div dir="ltr" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-[0.18em] uppercase shrink-0"
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
                  onOpenSpecs={() => onOpenSpecs(productNum)}
                  onAddToCart={() => {
                    addItem({ productNum, name: product.name, category: product.category });
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

function PageHeader({ locale }: { locale: string }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const isRTL = locale === "fa";
  const totalProducts = CATEGORIES.reduce((sum, c) => sum + c.products.length, 0);

  return (
    <div className="relative overflow-hidden pt-[80px] min-h-[70vh] flex flex-col justify-center">
      {/* Background images */}
      <div className="absolute inset-0">
        <Image src={productsHeroDesktop} alt="" fill className="object-cover object-center hidden sm:block" sizes="100vw" priority />
        <Image src={productsHeroMobile} alt="" fill className="object-cover object-top sm:hidden" sizes="100vw" priority />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background:
          "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.32) 50%, rgba(0,0,0,0.52) 100%)"
        }} />
      </div>
      {/* Accent line at top */}
      <div className="absolute top-[80px] inset-x-0 h-px z-10 pointer-events-none" style={{ background: `linear-gradient(90deg,transparent,${C.accentBorder} 30%,${C.accent}55 50%,${C.accentBorder} 70%,transparent)` }} />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10 py-16 lg:py-24" dir={isRTL ? "rtl" : "ltr"}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: easeOut }}>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-[12px]" style={{ color: "rgba(255,255,255,0.5)" }}>
            <a href={`/${locale}`} className="transition-colors duration-200" style={{ color: "rgba(255,255,255,0.5)" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)"; }}>
              {isRTL ? "صفحه اصلی" : "Home"}
            </a>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={isRTL ? "rotate-180" : ""}><path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ color: "#ffffff" }}>{isRTL ? "محصولات" : "Products"}</span>
          </div>

          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="font-black leading-none"
              style={{ color: "#ffffff", fontFamily: YK, fontSize: "clamp(28px, 4vw, 56px)", letterSpacing: isRTL ? "0" : "-0.03em", textShadow: "0 2px 24px rgba(0,0,0,0.65)" }}>
              {isRTL ? (<>راهکارهای ذخیره{" "}<span style={{ color: "#ffffff", opacity: 0.7 }}>انرژی</span></>) : (<>Energy Storage{" "}<span style={{ color: "#ffffff", opacity: 0.7 }}>Solutions</span></>)}
            </h1>

            <div className="flex items-center gap-4">
              {[{ val: String(totalProducts), label: isRTL ? "محصول" : "Products" }, { val: String(CATEGORIES.length), label: isRTL ? "دسته" : "Categories" }].map((s, i) => (
                <div key={i} className="flex flex-col items-center px-5 py-3 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px) saturate(140%)", WebkitBackdropFilter: "blur(12px) saturate(140%)", border: "1px solid rgba(255,255,255,0.18)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)" }}>
                  <span className="font-black leading-none mb-0.5" style={{ fontSize: "22px", color: "#ffffff", fontFamily: "'Inter', system-ui" }}>{s.val}</span>
                  <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.55)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</span>
                </div>
              ))}
            </div>
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
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].id);
  const [specModal, setSpecModal] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const closeModal = useCallback(() => setSpecModal(null), []);

  // Show scroll-to-top button after scrolling down
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const isRTL = locale === "fa";
  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="overflow-x-hidden min-h-screen"
      style={{ background: C.pageBg, color: C.text1, transition: "background 0.35s ease, color 0.35s ease" }}
    >
      <SharedNavbar locale={locale} activePage="products" />
      <CartDrawer locale={locale} />

      <PageHeader locale={locale} />
      <CategoryTabs locale={locale} activeId={activeTab} onSelect={handleTabSelect} />

      {/* Spacer matching the fixed tab bar height — shorter on mobile */}
      <div aria-hidden="true" className="h-[40px] sm:h-[54px]" />

      <main>
        {CATEGORIES.map((cat, catIndex) => (
          <CategorySection
            key={cat.id}
            cat={cat}
            catIndex={catIndex}
            startIndex={catStartIndices[catIndex]}
            locale={locale}
            onOpenSpecs={(num) => setSpecModal(num)}
          />
        ))}
      </main>

      {/* Contact CTA strip */}
      <div style={{ background: isDark ? "#030303" : "#e8e8e8", borderTop: `1px solid ${C.divider}`, transition: "background 0.35s ease" }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 py-16 text-center" dir={locale === "fa" ? "rtl" : "ltr"}>
          <Reveal>
            <p className="mb-2" style={{ color: C.text4, fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              {locale === "fa" ? "نماینده رسمی UBETTER در ایران" : "Official UBETTER Representative in Iran"}
            </p>
            <h3 className="font-bold mb-6" style={{ color: C.text1, fontFamily: YK, fontSize: "clamp(18px, 2vw, 28px)" }}>
              {locale === "fa" ? "برای مشاوره رایگان با ما تماس بگیرید" : "Get a Free Engineering Consultation"}
            </h3>
            <div className="btn-gradient-border" style={{ color: C.text1 }}>
              <a href={`/${locale}#contact`}
                className="btn-gradient-border-inner inline-flex items-center gap-2.5 px-7 py-3.5 font-bold text-[14px] transition-all duration-300 hover:scale-105"
                style={{ background: isDark ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.55)", color: C.text1, fontFamily: YK, backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = C.text1; el.style.color = isDark ? "#000" : "#fff"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = isDark ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.55)"; el.style.color = C.text1; }}>
                {locale === "fa" ? "تماس با ما" : "Contact Us"}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d={locale === "fa" ? "M9 7H3M6 4L3 7l3 3" : "M3 7h8M8 4l3 3-3 3"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
      </div>

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
            aria-label={locale === "fa" ? "بازگشت به بالا" : "Back to top"}
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
