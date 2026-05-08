"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";
import type { Locale } from "@/i18n/config";

const easeOut = [0.22, 1, 0.36, 1] as const;
const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  return (
    <motion.button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      whileTap={{ scale: 0.9 }}
      className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shrink-0"
      style={{
        border: isDark ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(0,0,0,0.14)",
        background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        const b = e.currentTarget as HTMLButtonElement;
        b.style.borderColor = isDark ? DARK_C.accent : LIGHT_C.accent;
        b.style.boxShadow = `0 0 12px ${isDark ? "rgba(124,255,0,0.18)" : "rgba(74,156,0,0.15)"}`;
      }}
      onMouseLeave={(e) => {
        const b = e.currentTarget as HTMLButtonElement;
        b.style.borderColor = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.14)";
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
            style={{ color: "#7CFF00" }}
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
            style={{ color: "#4a9c00" }}
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
  activePage?: "home" | "products";
}) {
  const [open, setOpen] = useState(false);
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;

  const other: Locale = locale === "en" ? "fa" : "en";
  const isRTL = locale === "fa";

  const faLinks = [
    { href: `/${locale}`,          label: "صفحه اصلی",   page: "home" },
    { href: `/${locale}/products`, label: "محصولات",      page: "products" },
    { href: `/${locale}#solutions`,label: "ویژگی‌ها",    page: "home" },
    { href: `/${locale}#about`,    label: "تکنولوژی",    page: "home" },
    { href: `/${locale}#about`,    label: "درباره ما",   page: "home" },
    { href: `/${locale}#contact`,  label: "تماس با ما",  page: "home" },
  ];
  const enLinks = [
    { href: `/${locale}`,          label: "Home",       page: "home" },
    { href: `/${locale}/products`, label: "Products",   page: "products" },
    { href: `/${locale}#solutions`,label: "Features",   page: "home" },
    { href: `/${locale}#about`,    label: "Technology", page: "home" },
    { href: `/${locale}#about`,    label: "About",      page: "home" },
    { href: `/${locale}#contact`,  label: "Contact",    page: "home" },
  ];
  const navLinks = isRTL ? faLinks : enLinks;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: easeOut }}
      className="fixed inset-x-0 top-0 z-50"
      style={{
        height: "80px",
        background: C.navBg,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${C.navBorder}`,
        transition: "background 0.35s ease, border-color 0.35s ease",
      }}
    >
      <div className="h-full px-4 sm:px-12 flex items-center justify-between gap-6" dir="ltr">
        {/* Logo */}
        <Link href={`/${locale}`} className="shrink-0 flex items-center gap-1.5 select-none" dir="ltr">
          <span className="text-[18px] font-black tracking-tight leading-none" style={{ color: C.accent, fontFamily: "'Inter', system-ui, sans-serif" }}>ALL</span>
          <span className="text-[18px] font-black tracking-tight leading-none" style={{ color: C.text1, fontFamily: "'Inter', system-ui, sans-serif" }}>IN ONE</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 ml-auto mr-6" dir={isRTL ? "rtl" : "ltr"}>
          {navLinks.map((l) => {
            const isActive = (l.page === "products" && activePage === "products") || (l.page === "home" && l.label === (isRTL ? "صفحه اصلی" : "Home") && activePage === "home");
            return (
              <Link
                key={l.label}
                href={l.href}
                className="relative transition-colors duration-300"
                style={{
                  fontFamily: YK,
                  fontSize: "14px",
                  fontWeight: 500,
                  color: isActive ? C.accent : C.text2,
                  textDecoration: "none",
                }}
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
          <Link
            href={`/${other}`}
            className="hidden sm:flex items-center text-[12px] font-bold tracking-widest uppercase transition-colors duration-200"
            style={{ color: C.text3 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = C.accent; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = C.text3; }}
          >
            {other === "fa" ? "فا" : "EN"}
          </Link>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Profile icon */}
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ border: `1px solid ${C.navBorder}` }}
            aria-label="Profile"
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.accentBorder; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.navBorder; }}
          >
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="7" r="3.5" stroke={C.text2} strokeWidth="1.5" />
              <path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke={C.text2} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

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
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-6 py-5 flex flex-col gap-3"
            style={{
              background: isDark ? "rgba(0,0,0,0.97)" : "rgba(255,255,255,0.98)",
              backdropFilter: "blur(20px)",
              borderTop: `1px solid ${C.navBorder}`,
            }}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 transition-colors duration-200"
                style={{
                  fontFamily: YK,
                  fontSize: "16px",
                  color: C.text2,
                  borderBottom: `1px solid ${C.divider}`,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = C.accent; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = C.text2; }}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center justify-between mt-2 pt-3">
              <Link
                href={`/${other}`}
                className="py-2 px-4 rounded-xl text-sm font-semibold transition-colors duration-200"
                style={{ border: `1px solid ${C.navBorder}`, color: C.text3 }}
              >
                {other === "fa" ? "فارسی" : "English"}
              </Link>
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
