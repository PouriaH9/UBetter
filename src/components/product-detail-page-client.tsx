"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SharedNavbar from "@/components/shared-navbar";
import SharedFooter from "@/components/shared-footer";
import CartDrawer from "@/components/cart-drawer";
import { getProductEntryByNum, tx } from "@/data/product-categories";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { PRODUCT_IMAGES, DETAIL_IMAGES } from "@/assets/productImages";
import { useTheme, DARK_C, LIGHT_C, type ColorPalette } from "@/contexts/theme-context";
import { useCart } from "@/contexts/cart-context";
import { fetchMedusaProductByNum, formatPrice, type MergedProduct } from "@/lib/products";
import { localeDir, ui3 } from "@/i18n/locale-ui";

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";
const easeOut = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#7CFF00";

/** Soft pulsing aura behind fantasy glyphs */
function FantasyGlow({
  children,
  size = 34,
  accent = ACCENT,
  className = "",
}: {
  children: ReactNode;
  size?: number;
  accent?: string;
  className?: string;
}) {
  return (
    <motion.span
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.span
        className="absolute inset-[-35%] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent}55 0%, transparent 68%)` }}
        animate={{ opacity: [0.35, 0.9, 0.35], scale: [0.85, 1.2, 0.85] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ border: `1px solid ${accent}33`, boxShadow: `0 0 12px ${accent}22` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <span className="relative z-[1]">{children}</span>
    </motion.span>
  );
}

function SparkleBurst({ accent = ACCENT, className = "" }: { accent?: string; className?: string }) {
  const pts = [
    { x: "18%", y: "8%", d: 0 },
    { x: "78%", y: "22%", d: 0.4 },
    { x: "62%", y: "72%", d: 0.8 },
    { x: "8%", y: "58%", d: 1.1 },
  ];
  return (
    <span className={`absolute inset-0 pointer-events-none overflow-visible ${className}`} aria-hidden>
      {pts.map((p, i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{ left: p.x, top: p.y, background: accent, boxShadow: `0 0 6px ${accent}` }}
          animate={{ opacity: [0, 1, 0], scale: [0.3, 1.2, 0.3], y: [0, -6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: p.d, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

function IconCrystalHome({ stroke }: { stroke: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <motion.path
        d="M12 3l7 8.5v8H5v-8L12 3z"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinejoin="round"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
      <motion.path
        d="M12 8v4M10 10h4"
        stroke={stroke}
        strokeWidth="1.3"
        strokeLinecap="round"
        animate={{ pathLength: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </svg>
  );
}

function IconMagicGrid({ stroke }: { stroke: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      {[0, 1, 2, 3].map((i) => {
        const x = (i % 2) * 11 + 3;
        const y = Math.floor(i / 2) * 11 + 3;
        return (
          <motion.rect
            key={i}
            x={x}
            y={y}
            width="7"
            height="7"
            rx="1.5"
            stroke={stroke}
            strokeWidth="1.3"
            animate={{ opacity: [0.35, 1, 0.35], scale: [0.92, 1, 0.92] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.25 }}
            style={{ transformOrigin: `${x + 3.5}px ${y + 3.5}px` }}
          />
        );
      })}
    </svg>
  );
}

function IconEnergyOrb({ stroke }: { stroke: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <motion.circle
        cx="12"
        cy="12"
        r="7"
        stroke={stroke}
        strokeWidth="1.35"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "12px 12px" }}
      />
      <motion.path
        d="M12 6v12M8 9l4-3 4 3M8 15l4 3 4-3"
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </svg>
  );
}

function IconRuneStar({ stroke }: { stroke: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <motion.path
        d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.7L12 16.8 6.4 19.5l2.1-6.7L3 8.8h6.8L12 2z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinejoin="round"
        animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "12px 12px" }}
      />
    </svg>
  );
}

function IconCrystalCheck({ stroke, delay = 0 }: { stroke: string; delay?: number }) {
  return (
    <FantasyGlow size={28} accent={stroke} className="mt-0.5">
      <motion.svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <motion.path
          d="M12 3l2.5 4.5L20 9l-3.5 3.5.8 5.5L12 16l-5.3 2 1-5.5L4 9l5.5-1.5L12 3z"
          stroke={stroke}
          strokeWidth="1.2"
          strokeLinejoin="round"
          initial={{ opacity: 0.4, scale: 0.85 }}
          animate={{ opacity: [0.55, 1, 0.55], scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 2.2, repeat: Infinity, delay }}
        />
        <motion.path
          d="M9 12l2 2 4-4"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.5, delay: delay + 0.2 }}
        />
      </motion.svg>
    </FantasyGlow>
  );
}

function IconPortalPin({ stroke, delay = 0 }: { stroke: string; delay?: number }) {
  return (
    <motion.svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
      aria-hidden
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, delay }}
    >
      <motion.path
        d="M12 21s6-5.2 6-11a6 6 0 10-12 0c0 5.8 6 11 6 11z"
        stroke={stroke}
        strokeWidth="1.35"
        strokeLinejoin="round"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, delay }}
      />
      <motion.circle
        cx="12"
        cy="10"
        r="2.5"
        fill={stroke}
        animate={{ scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 1.8, repeat: Infinity, delay }}
      />
    </motion.svg>
  );
}

function IconScrollRune({ stroke }: { stroke: string }) {
  return (
    <motion.svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      animate={{ rotate: [-4, 4, -4] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M8 4h8l1 2h3a2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h2l1-2z" stroke={stroke} strokeWidth="1.3" strokeLinejoin="round" />
      <motion.path
        d="M9 11h6M9 15h4"
        stroke={stroke}
        strokeWidth="1.3"
        strokeLinecap="round"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />
      <motion.circle cx="17" cy="7" r="1" fill={stroke} animate={{ scale: [0, 1.3, 0] }} transition={{ duration: 2, repeat: Infinity }} />
    </motion.svg>
  );
}

function SectionTitle({
  icon,
  label,
  C,
  locale,
}: {
  icon: ReactNode;
  label: string;
  C: ColorPalette;
  locale: Locale;
}) {
  return (
    <h2
      className="relative text-[11px] font-bold tracking-[0.18em] mb-4 flex items-center gap-3"
      style={{ color: C.text4, fontFamily: locale === "en" ? "system-ui" : YK }}
    >
      <FantasyGlow size={32} accent={C.accent}>
        {icon}
      </FantasyGlow>
      <span className="relative">
        {label}
        <SparkleBurst accent={C.accent} className="-inset-x-2 -inset-y-1" />
      </span>
    </h2>
  );
}

function SpecModal({ num, locale, onClose }: { num: number; locale: Locale; onClose: () => void }) {
  const img = DETAIL_IMAGES[num] ?? null;
  const dir = localeDir(locale);
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
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
        <div className="flex items-center justify-between px-6 py-4 shrink-0" style={{ borderBottom: `1px solid ${C.divider}` }} dir={dir}>
          <div className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.15em] ${locale === "en" ? "uppercase" : ""}`} style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}`, color: C.accent }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.accent }} />
            {ui3(locale, `مشخصات فنی — محصول ${num}`, `Technical Specifications — Product ${num}`, `技术规格 — 产品 ${num}`)}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", border: `1px solid ${C.cardBorder}` }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = C.accentBg;
              (e.currentTarget as HTMLButtonElement).style.borderColor = C.accentBorder;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = C.cardBorder;
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1.5 1.5l10 10M11.5 1.5l-10 10" stroke={C.text1} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-auto flex items-center justify-center p-6 min-h-0" style={{ background: isDark ? C.card : "#ffffff" }}>
          {img ? (
            <Image src={img} alt={`Product ${num} specifications`} className="w-full h-auto object-contain rounded-xl" style={{ maxHeight: "75vh" }} sizes="(max-width:768px) 95vw, 900px" />
          ) : (
            <div className="flex flex-col items-center gap-3 py-20">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-25">
                <rect x="6" y="6" width="28" height="28" rx="4" stroke={C.accent} strokeWidth="1.5" strokeDasharray="4 3" />
                <path d="M14 20h12M20 14v12" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p style={{ color: C.text3, fontSize: "14px" }}>{ui3(locale, "مشخصات فنی در دسترس نیست", "Technical specifications not available", "暂无技术规格")}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-6 py-4 shrink-0" style={{ borderTop: `1px solid ${C.divider}` }} dir={dir}>
          <span style={{ color: C.text4, fontSize: "11px" }}>
            {ui3(locale, "لیان صدر ملل | نماینده رسمی UBETTER در ایران", "Lian Sadr Mellal | Official UBETTER Representative in Iran", "联萨徳梅兰 | UBETTER 伊朗官方合作伙伴")}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-[12px] font-medium transition-all duration-200"
            style={{ border: `1px solid ${C.cardBorder}`, color: C.text3 }}
            onMouseEnter={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.color = C.accent;
              b.style.borderColor = C.accentBorder;
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.color = C.text3;
              b.style.borderColor = C.cardBorder;
            }}
          >
            {ui3(locale, "بستن", "Close", "关闭")}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AddToCartButton({ onAdd, locale, C, isDark }: { onAdd: () => void; locale: Locale; C: ColorPalette; isDark: boolean }) {
  const [added, setAdded] = useState(false);
  const handleClick = () => {
    onAdd();
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };
  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.98 }}
      className="w-full sm:w-auto min-w-[200px] py-3 rounded-xl text-[13px] font-semibold transition-all duration-200 flex items-center justify-center gap-2"
      style={{
        background: added ? C.accent : C.accent,
        color: isDark ? "#000" : "#fff",
        border: `1px solid ${C.accentBorder}`,
        fontFamily: YK,
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {added ? (
          <motion.svg key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.18 }} width="14" height="14" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        ) : (
          <motion.svg key="cart" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.18 }} width="14" height="14" viewBox="0 0 12 12" fill="none">
            <path d="M1 1h1.5l1.6 5h5.5l1.4-4H4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="5.5" cy="9.5" r="0.8" fill="currentColor" />
            <circle cx="9" cy="9.5" r="0.8" fill="currentColor" />
          </motion.svg>
        )}
      </AnimatePresence>
      {added ? ui3(locale, "اضافه شد", "Added!", "已添加") : ui3(locale, "افزودن به سبد", "Add to cart", "加入购物车")}
    </motion.button>
  );
}

export default function ProductDetailPageClient({ locale, productNum }: { locale: Locale; productNum: number }) {
  const entry = useMemo(() => getProductEntryByNum(productNum), [productNum]);
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const dir = localeDir(locale);
  const { addItem, openCart } = useCart();
  const [specOpen, setSpecOpen] = useState(false);
  const [commerce, setCommerce] = useState<MergedProduct | null>(null);
  const closeSpec = useCallback(() => setSpecOpen(false), []);

  useEffect(() => {
    fetchMedusaProductByNum(productNum)
      .then((p) => {
        setCommerce({
          ...p,
          priceLabel:
            p.priceIrr !== undefined ? formatPrice(p.priceIrr, locale) : undefined,
        });
      })
      .catch(() => setCommerce(null));
  }, [productNum, locale]);

  const gallery = useMemo(() => {
    const items: { key: string; src: string; label: string }[] = [];
    const main = PRODUCT_IMAGES[productNum];
    const detail = DETAIL_IMAGES[productNum];
    if (main) items.push({ key: "hero", src: main, label: ui3(locale, "نمای محصول", "Product view", "产品图") });
    if (detail) items.push({ key: "spec", src: detail, label: ui3(locale, "برگه مشخصات", "Specification sheet", "规格图") });
    return items;
  }, [locale, productNum]);

  const [activeGallery, setActiveGallery] = useState(0);
  useEffect(() => {
    setActiveGallery(0);
  }, [productNum]);

  if (!entry) return null;
  const { category, product } = entry;
  const activeImg = gallery[activeGallery] ?? null;
  const isLandscape = productNum >= 22;

  return (
    <div className="overflow-x-hidden min-h-screen" style={{ background: C.pageBg, color: C.text1, transition: "background 0.35s ease, color 0.35s ease" }} dir={dir}>
      <SharedNavbar locale={locale} activePage="products" />
      <CartDrawer locale={locale} />

      <main className="pt-[88px] sm:pt-[92px] pb-16">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <nav className="flex flex-wrap items-center gap-2 text-[12px] mb-8" style={{ color: C.text4 }} aria-label="Breadcrumb">
            <Link href={localePath(locale, "/")} className="inline-flex items-center gap-2 transition-colors duration-200 hover:opacity-100" style={{ color: C.text3 }}>
              <FantasyGlow size={28} accent={C.accent}>
                <IconCrystalHome stroke={C.accent} />
              </FantasyGlow>
              {ui3(locale, "خانه", "Home", "首页")}
            </Link>
            <motion.span
              aria-hidden
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ color: C.accent }}
            >
              ✦
            </motion.span>
            <Link href={localePath(locale, "/products")} className="inline-flex items-center gap-2 transition-colors duration-200 hover:opacity-100" style={{ color: C.text3 }}>
              <FantasyGlow size={28} accent={C.accent}>
                <IconMagicGrid stroke={C.accent} />
              </FantasyGlow>
              {ui3(locale, "محصولات", "Products", "产品")}
            </Link>
            <motion.span
              aria-hidden
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              style={{ color: C.accent }}
            >
              ✦
            </motion.span>
            <span className="line-clamp-2 min-w-0 font-medium inline-flex items-center gap-2" style={{ color: C.text1 }}>
              <FantasyGlow size={28} accent={C.accent}>
                <IconEnergyOrb stroke={C.accent} />
              </FantasyGlow>
              {tx(product.name, locale)}
            </span>
          </nav>

          <Link
            href={`${localePath(locale, "/products")}#cat-${category.id}`}
            className="inline-flex items-center gap-2.5 text-[12px] font-medium mb-10 transition-opacity hover:opacity-80"
            style={{ color: C.accent, fontFamily: YK }}
          >
            <FantasyGlow size={26} accent={C.accent}>
              <motion.svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={locale === "fa" ? "rotate-180" : ""} animate={{ x: locale === "fa" ? [2, 0, 2] : [-2, 0, -2] }} transition={{ duration: 2, repeat: Infinity }}>
                <path d="M8.5 3L4 7l4.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </FantasyGlow>
            {ui3(locale, "بازگشت به محصولات", "Back to products", "返回产品列表")}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className="space-y-4 lg:sticky lg:top-28">
              <div
                className="relative w-full rounded-2xl overflow-hidden flex items-center justify-center p-6 sm:p-10"
                style={{
                  aspectRatio: isLandscape ? "16/10" : "4/5",
                  background: isDark ? "rgba(255,255,255,0.04)" : "#ffffff",
                  border: `1px solid ${C.cardBorder}`,
                  boxShadow: isDark ? "inset 0 1px 0 rgba(255,255,255,0.06)" : "0 8px 32px rgba(0,0,0,0.06)",
                }}
              >
                {activeImg ? (
                  <div className="relative w-full h-full min-h-[240px]">
                    <Image src={activeImg.src} alt={tx(product.name, locale)} fill className="object-contain" sizes="(max-width:1024px) 100vw, 50vw" priority />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 py-16 opacity-30">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <rect x="10" y="14" width="28" height="22" rx="4" stroke={C.accent} strokeWidth="1.3" />
                      <path d="M24 22v8M20 26h8" stroke={C.accent} strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
              </div>

              {gallery.length > 1 ? (
                <div className="flex flex-wrap gap-2">
                  {gallery.map((g, i) => (
                    <button
                      key={g.key}
                      type="button"
                      onClick={() => setActiveGallery(i)}
                      className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden shrink-0 transition-all duration-200"
                      style={{
                        border: `2px solid ${i === activeGallery ? C.accent : C.cardBorder}`,
                        opacity: i === activeGallery ? 1 : 0.75,
                        boxShadow: i === activeGallery ? `0 0 0 1px ${C.accentBorder}` : "none",
                      }}
                      aria-label={g.label}
                    >
                      <Image src={g.src} alt="" fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
              ) : null}

            </div>

            <div>
              <motion.span
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.14em] mb-4 ${locale === "en" ? "uppercase" : ""}`}
                style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}`, color: C.accent }}
                whileHover={{ scale: 1.03, boxShadow: `0 0 20px ${C.accent}33` }}
              >
                <FantasyGlow size={24} accent={C.accent}>
                  <IconEnergyOrb stroke={C.accent} />
                </FantasyGlow>
                {tx(product.category, locale)}
              </motion.span>

              <motion.div
                className="flex flex-wrap items-start justify-between gap-4 mb-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easeOut }}
              >
                <h1 className="font-black leading-tight flex-1 min-w-0" style={{ fontFamily: YK, fontSize: "clamp(22px, 3vw, 34px)", color: C.text1 }}>
                  {tx(product.name, locale)}
                </h1>
                <motion.span
                  className="tabular-nums text-[11px] font-bold px-2.5 py-1.5 rounded-lg shrink-0 inline-flex items-center gap-1.5"
                  style={{ background: C.numBadgeBg, border: `1px solid ${C.accentBorder}`, color: C.numBadgeTxt, fontFamily: "'Inter', system-ui", boxShadow: `0 0 16px ${C.accent}22` }}
                  animate={{ boxShadow: [`0 0 8px ${C.accent}18`, `0 0 22px ${C.accent}44`, `0 0 8px ${C.accent}18`] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <FantasyGlow size={22} accent={C.accent}>
                    <IconRuneStar stroke={C.accent} />
                  </FantasyGlow>
                  {productNum <= 21 ? productNum : productNum === 22 ? "EMS" : "HV"}
                </motion.span>
              </motion.div>

              <p className="leading-relaxed mb-8" style={{ color: C.text2, fontSize: "15px", lineHeight: 1.85 }}>
                {tx(product.description, locale)}
              </p>

              <div className="h-px mb-8" style={{ background: C.divider }} />

              <SectionTitle
                locale={locale}
                C={C}
                label={ui3(locale, "ویژگی‌ها", "Features", "产品特点")}
                icon={<IconRuneStar stroke={C.accent} />}
              />
              <motion.ul
                className="space-y-3 mb-10"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
              >
                {product.features.map((feat, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    variants={{ hidden: { opacity: 0, x: locale === "fa" ? 12 : -12 }, show: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.35, ease: easeOut }}
                  >
                    <IconCrystalCheck stroke={C.accent} delay={i * 0.15} />
                    <span style={{ color: C.text2, fontSize: "14px", lineHeight: 1.65 }}>{tx(feat, locale)}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <SectionTitle
                locale={locale}
                C={C}
                label={ui3(locale, "کاربردها", "Applications", "应用场景")}
                icon={<IconPortalPin stroke={C.accent} />}
              />
              <motion.div
                className="flex flex-wrap gap-2 mb-10"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
              >
                {product.applications.map((app, i) => (
                  <motion.span
                    key={i}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] relative overflow-visible"
                    style={{ background: C.tagBg, color: C.tagText, border: `1px solid ${C.cardBorder}` }}
                    variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
                    whileHover={{ scale: 1.04, borderColor: C.accentBorder, boxShadow: `0 0 18px ${C.accent}28` }}
                    transition={{ duration: 0.25 }}
                  >
                    <IconPortalPin stroke={C.accent} delay={i * 0.2} />
                    {tx(app, locale)}
                  </motion.span>
                ))}
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  type="button"
                  onClick={() => setSpecOpen(true)}
                  className="w-full sm:w-auto min-w-[160px] py-3 rounded-xl text-[13px] font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2.5 relative overflow-visible"
                  style={{ border: `1px solid ${C.accentBorder}`, color: C.text1, background: isDark ? "rgba(124,255,0,0.06)" : "rgba(124,255,0,0.08)", fontFamily: YK }}
                  whileHover={{ scale: 1.03, boxShadow: `0 0 24px ${C.accent}35` }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FantasyGlow size={28} accent={C.accent}>
                    <IconScrollRune stroke={C.accent} />
                  </FantasyGlow>
                  {ui3(locale, "مشخصات فنی", "Technical specs", "技术规格")}
                  <SparkleBurst accent={C.accent} className="inset-0 opacity-60" />
                </motion.button>
                <AddToCartButton
                  onAdd={() => {
                    addItem({
                      productNum,
                      name: product.name,
                      category: product.category,
                      variantId: commerce?.variantId,
                      unitPriceIrr: commerce?.priceIrr,
                    });
                    openCart();
                  }}
                  locale={locale}
                  C={C}
                  isDark={isDark}
                />
                {commerce?.priceLabel && (
                  <Link
                    href={localePath(locale, "/checkout")}
                    className="w-full sm:w-auto min-w-[160px] py-3 rounded-xl text-[13px] font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2"
                    style={{ background: C.accent, color: isDark ? "#000" : "#fff", fontFamily: YK }}
                  >
                    {ui3(locale, "خرید آنلاین", "Buy now", "立即购买")}
                  </Link>
                )}
              </div>
              {commerce?.priceLabel && (
                <p className="mt-3 text-lg font-bold" style={{ color: C.accent, fontFamily: YK }}>
                  {commerce.priceLabel}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <SharedFooter locale={locale} />

      <AnimatePresence>{specOpen && <SpecModal key="spec" num={productNum} locale={locale} onClose={closeSpec} />}</AnimatePresence>
    </div>
  );
}
