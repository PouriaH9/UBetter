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
import SharedNavbar from "@/components/shared-navbar";
import SharedFooter from "@/components/shared-footer";
import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";

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
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-semibold tracking-[0.18em] uppercase mb-6"
      style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}`, color: C.accent }}>
      <span className="w-1 h-1 rounded-full" style={{ background: C.accent }} />
      {label}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 1. CONSTANTS (shared with sections below)
// ══════════════════════════════════════════════════════════════════════════════

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";

// ══════════════════════════════════════════════════════════════════════════════
// 2. HERO
// ══════════════════════════════════════════════════════════════════════════════

function Hero({ locale, t }: { locale: Locale; t: (typeof translations)["en"] }) {
  // Hero has full-screen photo background, always uses dark/neon accent
  const ACCENT = "#7CFF00";
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
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
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
    <section className="py-32" dir={isRTL ? "rtl" : "ltr"}
      style={{ background: isDark ? "#050505" : "#f0f0f0", transition: "background 0.35s ease" }}>
      <div className="max-w-4xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <Pill label={isRTL ? "نظرات مشتریان" : "Testimonials"} />
          <h2 className="text-4xl md:text-5xl font-bold" style={{ color: C.text1 }}>
            {isRTL ? "اعتماد رهبران صنعت" : "Trusted by Industry Leaders"}
          </h2>
        </Reveal>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.55 }}
              className="rounded-3xl p-8 md:p-14 text-center"
              style={{ background: C.card, border: `1px solid ${C.cardBorder}`, transition: "background 0.35s ease" }}>
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" style={{ color: C.accent }}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-[19px] md:text-[22px] leading-relaxed mb-10 italic" style={{ color: C.text2 }}>
                &ldquo;{items[active].quote}&rdquo;
              </blockquote>
              <div>
                <div className="font-bold text-[17px]" style={{ color: C.text1 }}>{items[active].author}</div>
                <div className="text-sm mt-1.5" style={{ color: C.text3 }}>{items[active].role} — {items[active].company}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-2 mt-8">
            {items.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="h-1.5 rounded-full transition-all duration-400"
                style={{ width: i === active ? "32px" : "6px", background: i === active ? C.accent : C.divider }} />
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
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const isRTL = locale === "fa";

  return (
    <section id="contact" className="py-32" dir={isRTL ? "rtl" : "ltr"}
      style={{ background: isDark ? "#050505" : "#f0f0f0", transition: "background 0.35s ease" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.85, ease: easeOut }}
          className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center mb-12"
          style={{ background: isDark ? `linear-gradient(135deg,${C.accentBg} 0%,#0a0a0a 50%,#111 100%)` : `linear-gradient(135deg,${C.accentBg} 0%,#ffffff 50%,#f8f8f8 100%)`, border: `1px solid ${C.accentBorder}` }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: C.accentGlow }} />
          <div className="relative z-10">
            <Pill label={isRTL ? "شروع کنید" : "Get Started Today"} />
            <h2 className="text-4xl md:text-[60px] font-bold leading-tight mb-5" style={{ color: C.text1 }}>
              {isRTL ? "آماده‌اید آینده انرژی\nخود را بسازید؟" : "Ready to Power\nYour Future?"}
            </h2>
            <p className="text-[17px] max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: C.text2 }}>
              {isRTL ? "با تیم مهندسی ما تماس بگیرید تا مشاوره رایگان و پیش‌فاکتور اختصاصی برای پروژه ذخیره‌سازی انرژی شما دریافت کنید." : "Contact our engineering team for a free consultation and tailored quotation for your residential, commercial, or industrial energy storage project."}
            </p>
            <a href="mailto:info@ubetterenergy.com"
              className="inline-flex items-center gap-3 px-10 py-5 text-black font-bold rounded-full text-[16px] transition-all duration-300 hover:scale-105"
              style={{ background: C.accent, boxShadow: `0 0 40px ${C.accentGlow}` }}>
              {isRTL ? "دریافت پیش‌فاکتور رایگان" : "Get Free Quote"}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                <path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
          className="rounded-3xl p-8 md:p-12"
          style={{ background: C.card, border: `1px solid ${C.cardBorder}`, transition: "background 0.35s ease" }}>
          <h3 className="text-[22px] font-bold mb-8 text-center" style={{ color: C.text1 }}>
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
                <label className="block text-[13px] mb-2 font-medium" style={{ color: C.text3 }}>{f.label}</label>
                <input type={f.type} placeholder={f.ph}
                  className="w-full rounded-xl px-4 py-3.5 text-[14px] focus:outline-none transition-all duration-200"
                  style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", border: `1px solid ${C.cardBorder}`, color: C.text1 }} />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block text-[13px] mb-2 font-medium" style={{ color: C.text3 }}>{t.contact.message}</label>
              <textarea rows={4} placeholder={t.contact.message}
                className="w-full rounded-xl px-4 py-3.5 text-[14px] focus:outline-none transition-all duration-200 resize-none"
                style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", border: `1px solid ${C.cardBorder}`, color: C.text1 }} />
            </div>
            <div className="md:col-span-2 flex justify-center">
              <button type="submit" className="px-12 py-4 text-black font-bold rounded-full text-[15px] transition-all duration-300 hover:scale-105"
                style={{ background: C.accent }}>
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
// 6. FOOTER — now handled by SharedFooter
// ══════════════════════════════════════════════════════════════════════════════

// ══════════════════════════════════════════════════════════════════════════════
// ROOT EXPORT
// ══════════════════════════════════════════════════════════════════════════════

export default function HomePageClient({ locale }: { locale: Locale }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const t = translations[locale];
  const isRTL = locale === "fa";

  return (
    <div className="overflow-x-hidden" dir={t.dir}
      style={{ background: C.pageBg, color: C.text1, transition: "background 0.35s ease, color 0.35s ease" }}>
      <SharedNavbar locale={locale} activePage="home" />
      <Hero locale={locale} t={t} />

      {/* Products teaser — links to the dedicated products page */}
      <div style={{ background: isDark ? "#050505" : "#f0f0f0", borderTop: `1px solid ${C.divider}`, transition: "background 0.35s ease" }}>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-20 text-center" dir={isRTL ? "rtl" : "ltr"}>
          <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-[10px] font-bold tracking-[0.2em] uppercase"
              style={{ background: C.accentBg, border: `1px solid ${C.accentBorder}`, color: C.accent }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.accent }} />
              {isRTL ? "پورتفولیو محصولات" : "Product Portfolio"}
            </div>
            <h2 className="font-black mb-5 leading-none" style={{ color: C.text1, fontFamily: YK, fontSize: "clamp(26px, 4vw, 60px)", letterSpacing: isRTL ? "0" : "-0.03em" }}>
              {isRTL ? (<>۲۳ محصول در <span style={{ color: C.accent }}>۳ دسته‌بندی</span></>) : (<>23 Products across <span style={{ color: C.accent }}>3 Categories</span></>)}
            </h2>
            <p className="mx-auto mb-10" style={{ color: C.text3, fontSize: "clamp(13px, 1.1vw, 16px)", lineHeight: 1.9, maxWidth: "560px" }}>
              {isRTL ? "سیستم‌های ذخیره انرژی مسکونی، تجاری و صنعتی با فناوری LiFePO4 و پشتیبانی هوشمند EMS" : "Residential, commercial, and industrial energy storage systems with LiFePO4 technology and smart EMS support"}
            </p>
            <Link href={`/${locale}/products`}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-black text-[14px] transition-all duration-300 hover:scale-105"
              style={{ background: C.accent, boxShadow: `0 0 24px ${C.accentGlow}`, fontFamily: YK }}>
              {isRTL ? "مشاهده همه محصولات" : "View All Products"}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d={isRTL ? "M10 8H4M7 5L4 8l3 3" : "M4 8h8M9 5l3 3-3 3"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      <Testimonials locale={locale} />
      <CTA locale={locale} t={t} />
      <SharedFooter locale={locale} />
    </div>
  );
}
