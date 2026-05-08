"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";

import logoImg from "@/assets/LOGO.jpg";
import hero1Img from "@/assets/HERO1.png";
import hero2Img from "@/assets/HERO2.png";
import hero3Img from "@/assets/HERO3.jpg";
import hero1MImg from "@/assets/HERO1M.jpg";
import hero2MImg from "@/assets/HERO2M.png";
import hero3MImg from "@/assets/HERO3M.png";

import { translations } from "@/i18n/translations";
import type { Locale } from "@/i18n/config";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const easeOut = [0.22, 1, 0.36, 1] as const;

function stripLeadingEmoji(s: string) {
  return s.replace(/^[\s\S]*?([A-Za-z\u0600-\u06FF])/, "$1");
}

// ─── Reveal wrapper ────────────────────────────────────────────────────────────

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: easeOut, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Section label pill ───────────────────────────────────────────────────────

function Pill({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/25 text-[#00ff88] text-[11px] font-semibold tracking-[0.18em] uppercase mb-6">
      <span className="w-1 h-1 rounded-full bg-[#00ff88]" />
      {label}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 1. NAVBAR
// ══════════════════════════════════════════════════════════════════════════════

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";
const ACCENT = "#7CFF00";

function Navbar({ locale, t }: { locale: Locale; t: (typeof translations)["en"] }) {
  const [open, setOpen] = useState(false);
  const other: Locale = locale === "en" ? "fa" : "en";
  const isRTL = locale === "fa";

  const faLinks = [
    { href: `/${locale}`, label: "صفحه اصلی" },
    { href: "#products", label: "محصولات" },
    { href: "#solutions", label: "ویژگی‌ها" },
    { href: "#about", label: "تکنولوژی" },
    { href: "#about", label: "درباره ما" },
    { href: "#contact", label: "تماس با ما" },
  ];
  const enLinks = [
    { href: `/${locale}`, label: "Home" },
    { href: "#products", label: "Products" },
    { href: "#solutions", label: "Features" },
    { href: "#about", label: "Technology" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
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
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="h-full px-4 sm:px-12 flex items-center justify-between gap-6" dir="ltr">
        {/* Logo — always LTR so "ALL IN ONE" reads correctly in both locales */}
        <Link href={`/${locale}`} className="shrink-0 flex items-center gap-1.5 select-none" dir="ltr">
          <span
            className="text-[18px] font-black tracking-tight leading-none"
            style={{ color: ACCENT, fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            ALL
          </span>
          <span
            className="text-[18px] font-black tracking-tight leading-none text-white"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            IN ONE
          </span>
        </Link>

        {/* Desktop nav — centered */}
        <nav className="hidden md:flex items-center gap-10 ml-auto mr-8" dir={isRTL ? "rtl" : "ltr"}>
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-white transition-colors duration-300 hover:text-[#7CFF00]"
              style={{ fontFamily: YK, fontSize: "14px", fontWeight: 500, letterSpacing: "-0.01em" }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href={`/${other}`}
            className="hidden sm:flex items-center text-white/50 hover:text-[#7CFF00] text-[12px] font-bold tracking-widest uppercase transition-colors duration-200"
          >
            {other === "fa" ? "فا" : "EN"}
          </Link>

          {/* User outline icon */}
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:border-[#7CFF00]/50"
            style={{ border: "1px solid rgba(255,255,255,0.22)" }}
            aria-label="Profile"
          >
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="7" r="3.5" stroke="white" strokeWidth="1.5" />
              <path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
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
                className={`block w-5 h-[1.8px] bg-white rounded-full transition-all duration-300 ${
                  open
                    ? i === 0
                      ? "rotate-45 translate-y-[6.8px]"
                      : i === 1
                        ? "opacity-0"
                        : "-rotate-45 -translate-y-[6.8px]"
                    : ""
                }`}
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
            className="md:hidden border-t border-white/[0.07] px-6 py-5 flex flex-col gap-3"
            style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)" }}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 border-b border-white/[0.06] transition-colors duration-200 hover:text-[#7CFF00]"
                style={{ fontFamily: YK, fontSize: "16px", color: "rgba(255,255,255,0.72)" }}
              >
                {l.label}
              </a>
            ))}
            <Link
              href={`/${other}`}
              className="mt-2 text-center py-2.5 rounded-2xl border border-white/20 text-white/60 text-sm font-semibold"
            >
              {other === "fa" ? "فارسی" : "English"}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 2. HERO
// ══════════════════════════════════════════════════════════════════════════════

function Hero({ locale, t }: { locale: Locale; t: (typeof translations)["en"] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

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
    <section ref={sectionRef} className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Parallax background with crossfading images */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110 will-change-transform">
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
      </motion.div>

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
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute inset-0 z-10 flex flex-col"
      >
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
              {isRTL ? "پاور استیشن" : "Power Station"}
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
              {isRTL
                ? <>تمام انرژی مورد نیاز شما،<br />هر زمان، هر مکان</>
                : <>All the energy you need,<br />anytime, anywhere</>}
            </motion.p>

            {/* CTA button */}
            <motion.a
              href="#products"
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
              {isRTL ? "مشاهده محصولات" : "Explore Products"}
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d={isRTL ? "M14 10H6M9 6l-4 4 4 4" : "M6 10h8M11 6l4 4-4 4"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.1)",
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
                title: isRTL ? "ظرفیت بالا" : "High Capacity",
                desc: isRTL ? "توان بالا برای\nتمام دستگاه‌های شما" : "High power for\nall your devices",
              },
              {
                icon: (
                  <svg width="36" height="36" viewBox="0 0 42 42" fill="none">
                    <path d="M23 8l-8 13h8l-2 13L29 21h-8l2-13z" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: isRTL ? "شارژ سریع" : "Fast Charging",
                desc: isRTL ? "شارژ سریع در\nهر شرایطی" : "Fast charging in\nany condition",
              },
              {
                icon: (
                  <svg width="36" height="36" viewBox="0 0 42 42" fill="none">
                    <path d="M14 21a7 7 0 1 1 14 0 7 7 0 0 1-14 0z" stroke={ACCENT} strokeWidth="1.6" />
                    <path d="M21 14v-4M21 32v-4M14 21h-4M32 21h-4" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" />
                    <circle cx="21" cy="21" r="2.5" fill={ACCENT} />
                  </svg>
                ),
                title: isRTL ? "باتری با عمر طولانی" : "Long Life Battery",
                desc: isRTL ? "ساخته شده با سلول‌های\nباکیفیت و بادوام" : "Built with premium\nhigh-durability cells",
              },
              {
                icon: (
                  <svg width="36" height="36" viewBox="0 0 42 42" fill="none">
                    <path d="M21 8l-10 4v9c0 6.075 4.477 11.745 10 13 5.523-1.255 10-6.925 10-13V12L21 8z" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 21l3.5 3.5L26 18" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: isRTL ? "ایمن و قابل اعتماد" : "Safe & Reliable",
                desc: isRTL ? "مجهز به سیستم‌های\nحفاظتی پیشرفته" : "Equipped with advanced\nprotection systems",
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
      </motion.div>

    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 3. TESTIMONIALS
// ══════════════════════════════════════════════════════════════════════════════

function Testimonials({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const isRTL = locale === "fa";

  const items = [
    {
      quote: isRTL
        ? "سیستم ESS صنعتی 500kWh یوبتر در اولین سال هزینه برق اوج مصرف ما را ۳۸٪ کاهش داد. نصب بی‌دردسر بود و تیم مهندسی کاملاً حرفه‌ای عمل کرد."
        : "UBETTER's 500 kWh industrial ESS reduced our peak electricity costs by 38% in the first year. The installation was seamless and the engineering team was exceptional.",
      author: "Zhang Wei",
      role: isRTL ? "مدیر عملیات، گوانگژو" : "Operations Director",
      company: isRTL ? "شرکت تولیدی گوانگژو" : "Guangzhou Manufacturing Co.",
    },
    {
      quote: isRTL
        ? "سیستم‌های UBETTER را در سه ملک تجاری خود نصب کردیم. بازگشت سرمایه در ۱۸ ماه کاملاً مشهود بود. کیفیت محصول و پشتیبانی پس از فروش عالی است."
        : "We deployed UBETTER systems across three commercial properties. The ROI was clear within 18 months. Outstanding product quality and after-sales support.",
      author: "Ahmad Hassan",
      role: "CEO",
      company: isRTL ? "النور ملک، امارات" : "Al Noor Real Estate, UAE",
    },
    {
      quote: isRTL
        ? "همکاری OEM با UBETTER برای خط محصولات خورشیدی ما تحول‌آفرین بود. سلول‌های LiFePO4 آن‌ها بالاترین گواهینامه‌های بین‌المللی را دارند."
        : "The OEM partnership with UBETTER has been transformative for our solar product line. Their LiFePO4 cells meet the highest international certifications.",
      author: "Thomas Müller",
      role: "Product Director",
      company: "SolarTech Europe GmbH",
    },
  ];

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <section className="py-32 bg-[#050505]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <Pill label={isRTL ? "نظرات مشتریان" : "Testimonials"} />
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {isRTL ? "اعتماد رهبران صنعت" : "Trusted by Industry Leaders"}
          </h2>
        </Reveal>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.55 }}
              className="bg-[#0f0f0f] border border-white/[0.08] rounded-3xl p-8 md:p-14 text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#00ff88]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-[19px] md:text-[22px] text-white/75 leading-relaxed mb-10 italic">
                &ldquo;{items[active].quote}&rdquo;
              </blockquote>

              <div>
                <div className="text-white font-bold text-[17px]">{items[active].author}</div>
                <div className="text-white/42 text-sm mt-1.5">
                  {items[active].role} — {items[active].company}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-400 ${i === active ? "w-8 bg-[#00ff88]" : "w-1.5 bg-white/20 hover:bg-white/35"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 5. CTA SECTION
// ══════════════════════════════════════════════════════════════════════════════

function CTA({ locale, t }: { locale: Locale; t: (typeof translations)["en"] }) {
  const isRTL = locale === "fa";

  return (
    <section id="contact" className="py-32 bg-[#050505]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: easeOut }}
          className="relative rounded-3xl overflow-hidden border border-[#00ff88]/18 p-12 md:p-20 text-center mb-12"
          style={{ background: "linear-gradient(135deg, rgba(0,255,136,0.06) 0%, #0a0a0a 50%, #111111 100%)" }}
        >
          {/* Radial glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#00ff88]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <Pill label={isRTL ? "شروع کنید" : "Get Started Today"} />
            <h2 className="text-4xl md:text-[60px] font-bold text-white leading-tight mb-5">
              {isRTL ? "آماده‌اید آینده انرژی\nخود را بسازید؟" : "Ready to Power\nYour Future?"}
            </h2>
            <p className="text-white/55 text-[17px] max-w-2xl mx-auto mb-10 leading-relaxed">
              {isRTL
                ? "با تیم مهندسی ما تماس بگیرید تا مشاوره رایگان و پیش‌فاکتور اختصاصی برای پروژه ذخیره‌سازی انرژی شما دریافت کنید."
                : "Contact our engineering team for a free consultation and tailored quotation for your residential, commercial, or industrial energy storage project."}
            </p>
            <a
              href="mailto:info@ubetterenergy.com"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#00ff88] text-black font-bold rounded-full text-[16px] hover:bg-[#00e67a] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_64px_rgba(0,255,136,0.45)]"
            >
              {isRTL ? "دریافت پیش‌فاکتور رایگان" : "Get Free Quote"}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                <path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
          className="bg-[#0f0f0f] border border-white/[0.07] rounded-3xl p-8 md:p-12"
        >
          <h3 className="text-[22px] font-bold text-white mb-8 text-center">
            {isRTL ? "ارسال درخواست" : "Send an Inquiry"}
          </h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
            {[
              { label: t.contact.name, type: "text", ph: isRTL ? "نام شما" : "Your full name" },
              { label: t.contact.email, type: "email", ph: "email@company.com" },
              { label: t.contact.phone, type: "tel", ph: "+1 234 567 890" },
              { label: t.contact.company, type: "text", ph: isRTL ? "نام شرکت" : "Your company" },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-white/45 text-[13px] mb-2 font-medium">{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.ph}
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3.5 text-white placeholder-white/18 text-[14px] focus:outline-none focus:border-[#00ff88]/45 focus:bg-white/[0.07] transition-all duration-200"
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block text-white/45 text-[13px] mb-2 font-medium">{t.contact.message}</label>
              <textarea
                rows={4}
                placeholder={t.contact.message}
                className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-3.5 text-white placeholder-white/18 text-[14px] focus:outline-none focus:border-[#00ff88]/45 focus:bg-white/[0.07] transition-all duration-200 resize-none"
              />
            </div>
            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="px-12 py-4 bg-[#00ff88] text-black font-bold rounded-full text-[15px] hover:bg-[#00e67a] transition-all duration-300 hover:scale-105"
              >
                {stripLeadingEmoji(t.contact.send)}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 6. FOOTER
// ══════════════════════════════════════════════════════════════════════════════

function Footer({ locale }: { locale: Locale }) {
  const isRTL = locale === "fa";
  const other: Locale = locale === "en" ? "fa" : "en";

  const columns = isRTL
    ? [
        { head: "محصولات", links: ["سری خانگی", "سری تجاری", "سری صنعتی", "OEM / ODM"] },
        { head: "شرکت", links: ["درباره ما", "تکنولوژی", "گواهینامه‌ها", "اخبار"] },
        { head: "پشتیبانی", links: ["مستندات فنی", "پشتیبانی مهندسی", "گارانتی", "تماس با ما"] },
      ]
    : [
        { head: "Products", links: ["Home Series", "Commercial Series", "Industrial Series", "Custom OEM"] },
        { head: "Company", links: ["About Us", "Technology", "Certifications", "News"] },
        { head: "Support", links: ["Documentation", "Engineering Support", "Warranty", "Contact"] },
      ];

  return (
    <footer className="bg-[#020202] border-t border-white/[0.06] pt-20 pb-10" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 relative rounded-md overflow-hidden">
                <Image src={logoImg} alt="UBETTER" fill className="object-cover" sizes="28px" />
              </div>
              <span className="text-white font-bold text-[15px]">UBETTER</span>
            </Link>
            <p className="text-white/36 text-[13px] leading-relaxed mb-5">
              {isRTL
                ? "سیستم‌های پیشرفته باتری LiFePO4 برای آینده‌ای پایدار."
                : "Advanced LiFePO4 battery systems for a sustainable future."}
            </p>
            <div className="text-[#00ff88] text-[12px] font-semibold">Ubetter Technology Co., Ltd.</div>
          </div>

          {columns.map((col) => (
            <div key={col.head}>
              <div className="text-white font-semibold text-[13px] mb-5 tracking-wide">{col.head}</div>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-white/35 hover:text-white text-[13px] transition-colors duration-200">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/[0.06] gap-4">
          <div className="text-white/25 text-[12px]">
            © 2025 Ubetter Technology Co., Ltd. {isRTL ? "تمام حقوق محفوظ است." : "All rights reserved."}
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="text-white/25 hover:text-white text-[12px] transition-colors">
              {isRTL ? "حریم خصوصی" : "Privacy Policy"}
            </a>
            <a href="#" className="text-white/25 hover:text-white text-[12px] transition-colors">
              {isRTL ? "شرایط استفاده" : "Terms of Service"}
            </a>
            <Link
              href={`/${other}`}
              className="px-3 py-1 rounded-full border border-white/18 text-white/45 hover:text-white hover:border-white/35 text-[11px] font-semibold tracking-widest uppercase transition-all duration-200"
            >
              {other === "fa" ? "فا" : "EN"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT EXPORT
// ══════════════════════════════════════════════════════════════════════════════

export default function HomePageClient({ locale }: { locale: Locale }) {
  const t = translations[locale];

  return (
    <div className="bg-[#0a0a0a] text-white overflow-x-hidden" dir={t.dir}>
      <Navbar locale={locale} t={t} />
      <Hero locale={locale} t={t} />
      <Testimonials locale={locale} />
      <CTA locale={locale} t={t} />
      <Footer locale={locale} />
    </div>
  );
}
