"use client";

import type { Locale } from "@/i18n/config";
import { ui3 } from "@/i18n/locale-ui";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PRODUCT_IMAGES, DETAIL_IMAGES, LIFEPO4_BG } from "@/assets/productImages";
import {
  CATEGORIES,
  tx,
  getAllProductEntries,
  getProductEntryByNum,
  type T,
  type Product,
  type ProductCategory,
  type ProductEntry,
} from "@/data/product-categories";

export type { T, Product, ProductCategory, ProductEntry };
export { tx, CATEGORIES, getAllProductEntries, getProductEntryByNum };

// ─── Constants ────────────────────────────────────────────────────────────────

const easeOut = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#7CFF00";
const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";


// ─── Helpers ──────────────────────────────────────────────────────────────────

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div className={className}>{children}</div>;
}

// ─── Product Image (real or placeholder fallback) ─────────────────────────────

function ProductImg({ num, size = "lg" }: { num: number; size?: "lg" | "sm" }) {
  const img = PRODUCT_IMAGES[num] ?? null;
  const pad = String(num).padStart(2, "0");
  // Products 22+ are landscape images (inverters/EMS); others are portrait
  const isLandscape = num >= 22;

  return (
    <div className="relative w-full select-none" style={{ aspectRatio: isLandscape ? "16/9" : size === "lg" ? "3/4" : "3/4" }}>
      {/* Outer glow */}
      <div
        className="absolute -inset-2 rounded-[28px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(124,255,0,0.08) 0%, transparent 65%)", filter: "blur(12px)" }}
      />
      <div
        className="relative h-full rounded-3xl overflow-hidden flex items-center justify-center"
        style={{
          background: img
            ? "linear-gradient(170deg, #141414 0%, #0a0a0a 60%, #111 100%)"
            : "linear-gradient(145deg, rgba(124,255,0,0.03) 0%, rgba(10,10,10,0.97) 60%)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {img ? (
          <Image
            src={img}
            alt={`Product ${num}`}
            fill
            sizes={size === "lg" ? "(max-width:768px) 90vw, 45vw" : "320px"}
            className="object-contain p-6 drop-shadow-2xl"
            style={{ filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.6)) drop-shadow(0 0 20px rgba(124,255,0,0.08))" }}
          />
        ) : (
          <div className="relative z-10 flex flex-col items-center gap-3">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="opacity-40">
              <rect x="8" y="14" width="28" height="20" rx="3" stroke={ACCENT} strokeWidth="1.3" />
              <rect x="16" y="10" width="5" height="4" rx="1" stroke={ACCENT} strokeWidth="1.1" />
              <rect x="23" y="10" width="5" height="4" rx="1" stroke={ACCENT} strokeWidth="1.1" />
              <path d="M22 20v8M18 24h8" stroke={ACCENT} strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span style={{ color: "rgba(124,255,0,0.25)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "system-ui, sans-serif" }}>
              Coming Soon
            </span>
          </div>
        )}

        {/* Corner accents */}
        {["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map((cls, i) => (
          <div key={i} className={`absolute w-4 h-4 ${cls} pointer-events-none`} style={{ borderColor: "rgba(124,255,0,0.18)" }} />
        ))}

        {/* Faded product number */}
        {!img && (
          <div
            className="absolute bottom-4 right-5 font-black leading-none pointer-events-none"
            style={{ fontSize: "60px", color: "rgba(124,255,0,0.035)", fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {pad}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Spec Modal ───────────────────────────────────────────────────────────────

function SpecModal({ num, locale, onClose }: { num: number; locale: Locale; onClose: () => void }) {
  const img = DETAIL_IMAGES[num] ?? null;
  const isRTL = locale === "fa";

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
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
      onClick={onClose}
    >
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(124,255,0,0.07) 0%, transparent 70%)" }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl max-h-[90vh] flex flex-col rounded-3xl overflow-hidden"
        style={{ background: "#0a0a0a", border: "1px solid rgba(124,255,0,0.14)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase"
              style={{ background: "rgba(124,255,0,0.07)", border: "1px solid rgba(124,255,0,0.18)", color: ACCENT }}
            >
              <span className="w-1 h-1 rounded-full" style={{ background: ACCENT }} />
              {ui3(locale, `مشخصات فنی — محصول ${num}`, `Technical Specifications — Product ${num}`, `技术规格 — 产品 ${num}`)}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(124,255,0,0.1)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(124,255,0,0.3)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Image area */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-4 sm:p-8 min-h-0">
          {img ? (
            <div className="relative w-full" style={{ maxHeight: "75vh" }}>
              <Image
                src={img}
                alt={`Product ${num} specifications`}
                className="w-full h-auto object-contain rounded-xl"
                style={{ maxHeight: "75vh" }}
                sizes="(max-width: 768px) 95vw, 900px"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-16" dir={isRTL ? "rtl" : "ltr"}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-30">
                <rect x="8" y="8" width="32" height="32" rx="4" stroke={ACCENT} strokeWidth="1.5" strokeDasharray="4 3" />
                <path d="M18 24h12M24 18v12" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>
                {ui3(locale, "مشخصات فنی در دسترس نیست", "Technical specifications not available", "暂无技术规格图")}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px" }}>
            {ui3(locale, "لیان صدر ملل | نماینده رسمی UBETTER در ایران", "Lian Sadr Mellal | Official UBETTER Representative in Iran", "联森梅兰 | UBETTER 伊朗官方合作伙伴")}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-[12px] font-semibold transition-all duration-200"
            style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(124,255,0,0.3)"; (e.currentTarget as HTMLButtonElement).style.color = ACCENT; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.4)"; }}
          >
            {ui3(locale, "بستن", "Close", "关闭")}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Featured Product Block (cinematic alternating) ───────────────────────────

function FeaturedProductBlock({ product, globalIndex, imageLeft, locale, onOpenSpecs }: { product: Product; globalIndex: number; imageLeft: boolean; locale: Locale; onOpenSpecs: () => void }) {
  const isRTL = locale === "fa";
  const isDark = globalIndex % 2 === 0;
  const productNum = globalIndex + 1; // 1-indexed

  return (
    <div
      style={{
        background: isDark
          ? "#050505"
          : "linear-gradient(135deg, #0c0c0c 0%, #080808 100%)",
        borderTop: isDark
          ? "1px solid rgba(255,255,255,0.04)"
          : "1px solid rgba(124,255,0,0.05)",
      }}
    >
      <div className="max-w-[1300px] mx-auto px-6 sm:px-10 lg:px-20 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Image — constrained so it doesn't overwhelm the layout */}
          <Reveal
            delay={0.05}
            className={`${imageLeft ? "lg:order-1" : "lg:order-2"} flex items-center justify-center`}
          >
            <div style={{ width: "100%", maxWidth: "320px" }}>
              <ProductImg num={productNum} size="lg" />
            </div>
          </Reveal>

          {/* Content */}
          <div
            className={`flex flex-col ${imageLeft ? "lg:order-2" : "lg:order-1"}`}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Category pill */}
            <Reveal delay={0.1}>
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase"
                  style={{ background: "rgba(124,255,0,0.07)", border: "1px solid rgba(124,255,0,0.18)", color: ACCENT }}
                >
                  <span className="w-1 h-1 rounded-full" style={{ background: ACCENT }} />
                  {tx(product.category, locale)}
                </span>
              </div>
            </Reveal>

            {/* Name */}
            <Reveal delay={0.15}>
              <h3
                className="text-white font-bold mb-5 leading-tight"
                style={{ fontFamily: YK, fontSize: "clamp(20px, 2.2vw, 34px)", lineHeight: 1.18, letterSpacing: isRTL ? "0" : "-0.02em" }}
              >
                {tx(product.name, locale)}
              </h3>
            </Reveal>

            {/* Description */}
            <Reveal delay={0.2}>
              <p className="mb-8 leading-[1.9]" style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(13px, 1.05vw, 15px)" }}>
                {tx(product.description, locale)}
              </p>
            </Reveal>

            {/* Divider */}
            <Reveal delay={0.22}>
              <div
                className="mb-7 h-px"
                style={{ background: isRTL ? "linear-gradient(270deg, rgba(124,255,0,0.22) 0%, rgba(124,255,0,0.05) 60%, transparent 100%)" : "linear-gradient(90deg, rgba(124,255,0,0.22) 0%, rgba(124,255,0,0.05) 60%, transparent 100%)" }}
              />
            </Reveal>

            {/* Features */}
            <Reveal delay={0.25}>
              <div className="mb-8">
                <div className="mb-4 font-semibold tracking-[0.18em] uppercase" style={{ color: "rgba(255,255,255,0.2)", fontSize: "9px" }}>
                  {ui3(locale, "ویژگی‌های کلیدی", "Key Features", "核心特性")}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {product.features.map((feat, i) => (
                    <div key={i} className={`flex items-start gap-2.5 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <div className="w-[5px] h-[5px] rounded-full mt-[7px] shrink-0" style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
                      <span style={{ color: "rgba(255,255,255,0.62)", fontSize: "13px", lineHeight: 1.65 }}>{tx(feat, locale)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Applications */}
            <Reveal delay={0.3}>
              <div className="mb-10">
                <div className="mb-3 font-semibold tracking-[0.18em] uppercase" style={{ color: "rgba(255,255,255,0.2)", fontSize: "9px" }}>
                  {ui3(locale, "کاربردها", "Applications", "应用场景")}
                </div>
                <div className={`flex flex-wrap gap-2 ${isRTL ? "justify-end" : ""}`}>
                  {product.applications.map((app, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-[12px]"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.5)" }}
                    >
                      {tx(app, locale)}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* CTA */}
            <Reveal delay={0.35}>
              <div className={`flex flex-wrap gap-3 ${isRTL ? "justify-end" : "justify-start"}`}>
                <Link
                  href={`/${locale}/products/${productNum}`}
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-[13px] transition-all duration-300"
                  style={{ background: ACCENT, color: "#000", fontFamily: YK, letterSpacing: isRTL ? "0" : "0.02em", boxShadow: "0 0 24px rgba(124,255,0,0.22)" }}
                >
                  {ui3(locale, "جزئیات محصول", "Product details", "产品详情")}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d={isRTL ? "M6 3L11 7l-5 4" : "M8 3L3 7l5 4"} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenSpecs}
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-[13px] transition-all duration-300"
                  style={{ background: "transparent", border: `1px solid rgba(124,255,0,0.35)`, color: ACCENT, fontFamily: YK, letterSpacing: isRTL ? "0" : "0.02em" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = ACCENT;
                    (e.currentTarget as HTMLButtonElement).style.color = "#000";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 24px rgba(124,255,0,0.3)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = ACCENT;
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  }}
                >
                  {ui3(locale, "مشخصات فنی", "Technical Specs", "技术规格")}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="2" y="2" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M5 7h4M7 5v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </motion.button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Compact Product Card ─────────────────────────────────────────────────────

function CompactProductCard({ product, globalIndex, locale, onOpenSpecs }: { product: Product; globalIndex: number; locale: Locale; onOpenSpecs: () => void }) {
  const isRTL = locale === "fa";
  const productNum = globalIndex + 1;
  return (
    <Reveal>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="group flex flex-col h-full rounded-2xl overflow-hidden"
        style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)", transition: "border-color 0.3s" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(124,255,0,0.2)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
      >
        {/* Image area — fixed height so cards stay uniform */}
        <div className="relative flex items-center justify-center p-4 pb-0" style={{ height: "180px" }}>
          <div className="relative h-full" style={{ width: "130px" }}>
            <Image
              src={PRODUCT_IMAGES[productNum] ?? PRODUCT_IMAGES[1]!}
              alt={`Product ${productNum}`}
              fill
              sizes="130px"
              className="object-contain"
              style={{ filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.5)) drop-shadow(0 0 10px rgba(124,255,0,0.07))" }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 pt-4" dir={isRTL ? "rtl" : "ltr"}>
          {/* Category */}
          <div className="mb-3">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-[0.15em] uppercase"
              style={{ background: "rgba(124,255,0,0.06)", border: "1px solid rgba(124,255,0,0.14)", color: "rgba(124,255,0,0.8)" }}
            >
              {tx(product.category, locale)}
            </span>
          </div>

          {/* Name */}
          <h4
            className="text-white font-bold mb-3 leading-snug"
            style={{ fontFamily: YK, fontSize: "clamp(14px, 1.1vw, 17px)", lineHeight: 1.3 }}
          >
            {tx(product.name, locale)}
          </h4>

          {/* Description - truncated */}
          <p
            className="mb-4 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", lineHeight: 1.7, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}
          >
            {tx(product.description, locale)}
          </p>

          {/* Divider */}
          <div className="mb-4 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />

          {/* Features - first 4 */}
          <div className="mb-4 flex-1">
            <div className="space-y-1.5">
              {product.features.slice(0, 4).map((feat, i) => (
                <div key={i} className={`flex items-start gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: ACCENT }} />
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "11.5px", lineHeight: 1.5 }}>{tx(feat, locale)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Applications */}
          <div className={`flex flex-wrap gap-1.5 mb-5 ${isRTL ? "justify-end" : ""}`}>
            {product.applications.slice(0, 3).map((app, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-full text-[10px]"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}
              >
                {tx(app, locale)}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/${locale}/products/${productNum}`}
              className="py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-300 flex items-center justify-center gap-1.5"
              style={{ background: ACCENT, color: "#000", fontFamily: YK }}
            >
              {ui3(locale, "جزئیات", "Details", "详情")}
            </Link>
            <button
              type="button"
              onClick={onOpenSpecs}
              className="py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              style={{ border: "1px solid rgba(124,255,0,0.22)", color: ACCENT, background: "transparent", fontFamily: YK }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = ACCENT;
                (e.currentTarget as HTMLButtonElement).style.color = "#000";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 18px rgba(124,255,0,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = ACCENT;
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <rect x="1.5" y="1.5" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.3" />
                <path d="M4.5 6.5h4M6.5 4.5v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              {ui3(locale, "مشخصات", "Specs", "规格")}
            </button>
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

// ─── Category Header ──────────────────────────────────────────────────────────

function CategoryHeader({ cat, catIndex, locale }: { cat: ProductCategory; catIndex: number; locale: Locale }) {
  const isRTL = locale === "fa";
  return (
    <div
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: catIndex % 2 === 0 ? "#050505" : "#060606", borderTop: catIndex === 0 ? "none" : "1px solid rgba(255,255,255,0.05)" }}
    >
      <div
        className="absolute top-0 pointer-events-none"
        style={{
          left: isRTL ? "auto" : "10%",
          right: isRTL ? "10%" : "auto",
          width: "500px",
          height: "250px",
          background: "radial-gradient(ellipse at center, rgba(124,255,0,0.05) 0%, transparent 70%)",
          transform: "translateY(-50%)",
        }}
      />
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-20">
        <Reveal>
          <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 ${isRTL ? "lg:flex-row-reverse" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
            <div className="max-w-2xl">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-[10px] font-bold tracking-[0.2em] uppercase"
                style={{ background: "rgba(124,255,0,0.06)", border: "1px solid rgba(124,255,0,0.16)", color: "rgba(124,255,0,0.75)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                {tx(cat.pill, locale)}
              </div>
              <h2
                className="font-bold text-white mb-5 leading-tight"
                style={{ fontFamily: YK, fontSize: "clamp(24px, 3vw, 48px)", letterSpacing: isRTL ? "0" : "-0.025em", lineHeight: 1.12 }}
              >
                {tx(cat.title, locale)}
              </h2>
              <p
                className="leading-relaxed"
                style={{ color: "rgba(255,255,255,0.42)", fontSize: "clamp(13px, 1.05vw, 15px)", lineHeight: 1.9, maxWidth: "560px" }}
              >
                {tx(cat.description, locale)}
              </p>
            </div>
            <div
              className="shrink-0 flex flex-col items-center justify-center w-[100px] h-[100px] rounded-2xl"
              style={{ border: "1px solid rgba(124,255,0,0.14)", background: "rgba(124,255,0,0.03)" }}
            >
              <span className="font-black leading-none" style={{ fontSize: "34px", color: ACCENT, fontFamily: "'Inter', system-ui, sans-serif" }}>
                {cat.products.length}
              </span>
              <span
                className={`font-semibold tracking-[0.12em] mt-1 ${locale === "en" ? "uppercase" : ""}`}
                style={{ fontSize: "8px", color: "rgba(255,255,255,0.28)" }}
              >
                {ui3(locale, "محصول", "Products", "款产品")}
              </span>
            </div>
          </div>
        </Reveal>
        <div
          className="mt-12 h-px"
          style={{ background: isRTL ? "linear-gradient(270deg, rgba(124,255,0,0.25) 0%, rgba(124,255,0,0.07) 40%, transparent 80%)" : "linear-gradient(90deg, rgba(124,255,0,0.25) 0%, rgba(124,255,0,0.07) 40%, transparent 80%)" }}
        />
      </div>
    </div>
  );
}

// ─── Section Header ────────────────────────────────────────────────────────────

function SectionHeader({ locale }: { locale: Locale }) {
  const isRTL = locale === "fa";
  const totalProducts = CATEGORIES.reduce((sum, c) => sum + c.products.length, 0);

  return (
    <div id="products" className="relative py-28 lg:py-40 overflow-hidden" style={{ background: "#030303" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(124,255,0,0.07) 0%, transparent 70%)" }} />
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(124,255,0,0.2) 30%, rgba(124,255,0,0.35) 50%, rgba(124,255,0,0.2) 70%, transparent 100%)" }} />

      {/* LiFePO4 battery — floating background visual */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[560px] h-[560px] pointer-events-none select-none hidden lg:block" style={{ opacity: 0.055, filter: "blur(1px)" }}>
        <Image src={LIFEPO4_BG} alt="" fill className="object-contain" sizes="560px" />
      </div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[420px] h-[420px] pointer-events-none select-none hidden xl:block" style={{ opacity: 0.03, filter: "blur(2px)", transform: "translateY(-50%) scaleX(-1)" }}>
        <Image src={LIFEPO4_BG} alt="" fill className="object-contain" sizes="420px" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-20 text-center">
        <Reveal>
          {/* Overline */}
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-10 text-[10px] font-bold tracking-[0.2em] uppercase"
            style={{ background: "rgba(124,255,0,0.07)", border: "1px solid rgba(124,255,0,0.2)", color: ACCENT }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
            {ui3(locale, "پورتفولیو محصولات", "Product Portfolio", "产品矩阵")}
          </div>

          {/* Main title */}
          <h2
            className="text-white font-black mb-6 leading-none mx-auto"
            style={{ fontFamily: YK, fontSize: "clamp(32px, 5vw, 80px)", letterSpacing: isRTL ? "0" : "-0.03em", lineHeight: 1.0, maxWidth: "900px" }}
          >
            {locale === "fa" ? (
              <>
                راهکارهای ذخیره{" "}
                <span style={{ color: ACCENT, textShadow: "0 0 40px rgba(124,255,0,0.35), 0 0 80px rgba(124,255,0,0.12)" }}>انرژی</span>
              </>
            ) : locale === "zh" ? (
              <>
                <span style={{ color: ACCENT, textShadow: "0 0 40px rgba(124,255,0,0.35), 0 0 80px rgba(124,255,0,0.12)" }}>储能</span>
                {" "}解决方案
              </>
            ) : (
              <>
                Energy Storage{" "}
                <span style={{ color: ACCENT, textShadow: "0 0 40px rgba(124,255,0,0.35), 0 0 80px rgba(124,255,0,0.12)" }}>Solutions</span>
              </>
            )}
          </h2>

          {/* Subtitle */}
          <p className="mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(14px, 1.2vw, 17px)", maxWidth: "680px", lineHeight: 1.9 }}>
            {locale === "fa"
              ? "سیستم‌های پیشرفته ذخیره انرژی مسکونی، تجاری و صنعتی؛ طراحی شده برای مدیریت قابل اعتماد توان، ادغام با انرژی‌های تجدیدپذیر و بهینه‌سازی هوشمند مصرف انرژی."
              : locale === "zh"
                ? "面向住宅、工商业的先进储能系统，为可靠用电管理、可再生能源接入与智能能效优化而设计。"
                : "Advanced residential, commercial, and industrial energy storage systems designed for reliable power management, renewable energy integration, and intelligent energy optimization."}
          </p>

          {/* Stats row */}
          <div
            className="mt-14 grid grid-cols-3 gap-px max-w-sm mx-auto overflow-hidden rounded-2xl"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {[
              { value: String(totalProducts), label: ui3(locale, "محصول", "Products", "款产品") },
              { value: String(CATEGORIES.length), label: ui3(locale, "دسته‌بندی", "Categories", "品类") },
              { value: "MW+", label: ui3(locale, "مقیاس", "Scale", "规模") },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center py-5 px-4" style={{ background: "rgba(255,255,255,0.02)" }}>
                <span className="font-black leading-none mb-1" style={{ fontSize: "clamp(18px, 2.2vw, 28px)", color: ACCENT, fontFamily: "'Inter', system-ui, sans-serif" }}>
                  {s.value}
                </span>
                <span className="font-semibold tracking-[0.12em] uppercase" style={{ fontSize: "9px", color: "rgba(255,255,255,0.26)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-20 pointer-events-none" style={{ background: "linear-gradient(0deg, #050505 0%, transparent 100%)" }} />
    </div>
  );
}

// ─── Final CTA ─────────────────────────────────────────────────────────────────

function ProductsCTA({ locale }: { locale: Locale }) {
  const isRTL = locale === "fa";
  return (
    <div className="relative py-32 lg:py-48 overflow-hidden" style={{ background: "#030303" }}>
      {/* Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(124,255,0,0.09) 0%, rgba(0,200,80,0.04) 40%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute top-0 right-0 w-[500px] h-[300px] pointer-events-none opacity-40" style={{ background: "radial-gradient(ellipse at top right, rgba(0,180,255,0.06) 0%, transparent 70%)" }} />
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(124,255,0,0.15) 30%, rgba(124,255,0,0.3) 50%, rgba(124,255,0,0.15) 70%, transparent 100%)" }} />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-20 text-center">
        <Reveal>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 text-[10px] font-bold tracking-[0.2em] uppercase"
            style={{ background: "rgba(124,255,0,0.06)", border: "1px solid rgba(124,255,0,0.18)", color: "rgba(124,255,0,0.75)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: ACCENT }} />
            {ui3(locale, "تماس با ما", "Get in Touch", "联系我们")}
          </div>

          <h2
            className="text-white font-black mb-6 mx-auto leading-none"
            style={{ fontFamily: YK, fontSize: "clamp(28px, 4.2vw, 68px)", letterSpacing: isRTL ? "0" : "-0.03em", lineHeight: 1.05, maxWidth: "900px" }}
          >
            {locale === "fa" ? (
              <>
                آینده‌ای روشن با{" "}
                <span style={{ color: ACCENT, textShadow: "0 0 40px rgba(124,255,0,0.4), 0 0 80px rgba(124,255,0,0.15)" }}>انرژی هوشمند</span>
              </>
            ) : locale === "zh" ? (
              <>
                以<span style={{ color: ACCENT, textShadow: "0 0 40px rgba(124,255,0,0.4), 0 0 80px rgba(124,255,0,0.15)" }}>智慧能源</span>
                点亮未来
              </>
            ) : (
              <>
                Powering the Future of{" "}
                <span style={{ color: ACCENT, textShadow: "0 0 40px rgba(124,255,0,0.4), 0 0 80px rgba(124,255,0,0.15)" }}>Intelligent Energy</span>
              </>
            )}
          </h2>

          <p
            className="mx-auto mb-14 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.38)", fontSize: "clamp(14px, 1.15vw, 17px)", maxWidth: "580px", lineHeight: 1.95 }}
          >
            {locale === "fa"
              ? "از سیستم‌های مسکونی تا زیرساخت‌های مقیاس شبکه، پلتفرم‌های پیشرفته ذخیره انرژی ما برای بازتعریف روش ذخیره‌سازی، مدیریت و توزیع انرژی طراحی شده‌اند. با تیم مهندسی ما ارتباط بگیرید."
              : locale === "zh"
                ? "从家庭系统到电网级基础设施，我们的先进储能平台致力于重新定义电能的存储、调度与部署方式。欢迎与我们的工程团队沟通项目需求。"
                : "From residential systems to utility-scale infrastructure, our advanced energy storage platforms are engineered to redefine how the world stores, manages, and deploys power. Connect with our engineering team to discuss your project."}
          </p>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-black text-[15px] transition-all duration-300"
              style={{ background: ACCENT, boxShadow: "0 0 32px rgba(124,255,0,0.3), 0 4px 20px rgba(0,0,0,0.3)", fontFamily: YK }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#90ff1a"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 60px rgba(124,255,0,0.5), 0 4px 24px rgba(0,0,0,0.3)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = ACCENT; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 32px rgba(124,255,0,0.3), 0 4px 20px rgba(0,0,0,0.3)"; }}
            >
              {ui3(locale, "درخواست مشاوره رایگان", "Request a Consultation", "预约免费咨询")}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={isRTL ? "rotate-180" : ""}>
                <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
            <motion.a
              href="mailto:info@ubetterenergy.ir"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-semibold text-[15px] transition-all duration-300"
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.13)", color: "rgba(255,255,255,0.65)", fontFamily: YK }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(124,255,0,0.4)"; (e.currentTarget as HTMLAnchorElement).style.color = ACCENT; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.13)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)"; }}
            >
              {ui3(locale, "ارسال ایمیل", "Email Our Team", "发送邮件")}
            </motion.a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT EXPORT
// ══════════════════════════════════════════════════════════════════════════════

export default function ProductsSection({ locale = "en" }: { locale?: Locale }) {
  const [specModal, setSpecModal] = useState<number | null>(null);
  const closeModal = useCallback(() => setSpecModal(null), []);

  let globalIndex = 0;

  return (
    <div className="overflow-x-hidden">
      <SectionHeader locale={locale} />

      {CATEGORIES.map((cat, catIndex) => {
        const featured = cat.products.slice(0, cat.featuredCount);
        const grid = cat.products.slice(cat.featuredCount);

        return (
          <div key={cat.id}>
            <CategoryHeader cat={cat} catIndex={catIndex} locale={locale} />

            {/* Featured products — cinematic alternating blocks */}
            {featured.map((product, pi) => {
              const idx = globalIndex++;
              const num = idx + 1;
              return (
                <FeaturedProductBlock
                  key={`${cat.id}-featured-${pi}`}
                  product={product}
                  globalIndex={idx}
                  imageLeft={pi % 2 === 0}
                  locale={locale}
                  onOpenSpecs={() => setSpecModal(num)}
                />
              );
            })}

            {/* Remaining products — compact grid */}
            {grid.length > 0 && (
              <div
                style={{
                  background: "#060606",
                  borderTop: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-20 py-16 lg:py-24">
                  {/* Grid sub-header */}
                  <Reveal>
                    <div
                      className="mb-10 pb-6 border-b flex items-center justify-between"
                      style={{ borderColor: "rgba(255,255,255,0.05)" }}
                      dir={locale === "fa" ? "rtl" : "ltr"}
                    >
                      <span style={{ color: "rgba(255,255,255,0.22)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                        {locale === "fa" ? `${grid.length} محصول دیگر در این دسته` : `${grid.length} More Products in This Category`}
                      </span>
                      <div className="h-px flex-1 mx-6" style={{ background: "rgba(124,255,0,0.08)" }} />
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }} />
                    </div>
                  </Reveal>

                  <div className={`grid grid-cols-1 sm:grid-cols-2 ${cat.id === "commercial" ? "lg:grid-cols-3" : "lg:grid-cols-2 xl:grid-cols-3"} gap-5 lg:gap-6`}>
                    {grid.map((product) => {
                      const idx = globalIndex++;
                      const num = idx + 1;
                      return (
                        <CompactProductCard
                          key={`${cat.id}-grid-${idx}`}
                          product={product}
                          globalIndex={idx}
                          locale={locale}
                          onOpenSpecs={() => setSpecModal(num)}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <ProductsCTA locale={locale} />

      {/* ── Tech-Spec Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {specModal !== null && (
          <SpecModal
            key="spec-modal"
            num={specModal}
            locale={locale}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
