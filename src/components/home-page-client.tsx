"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
  AnimatePresence,
} from "framer-motion";

import logoImg from "@/assets/LOGO.jpg";
import hero1Img from "@/assets/HERO1.png";
import hero2Img from "@/assets/HERO2.png";
import bannerImg from "@/assets/BANNER.jpg";
import frontProductImg from "@/assets/FrontOfProduct.png";
import productHeroImg from "@/assets/Product image and detail hero.jpg";
import productDetailsImg from "@/assets/Product details.jpg";
import sideProductImg from "@/assets/SideOfProduct.png";
import side2ProductImg from "@/assets/Side2 Product.png";
import front2ProductImg from "@/assets/product Front2.png";

import { translations } from "@/i18n/translations";
import type { Locale } from "@/i18n/config";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const easeOut = [0.22, 1, 0.36, 1] as const;

function stripLeadingEmoji(s: string) {
  return s.replace(/^[\s\S]*?([A-Za-z\u0600-\u06FF])/, "$1");
}

// ─── Animated counter ─────────────────────────────────────────────────────────

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(spanRef, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(0, end, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return ctrl.stop;
  }, [inView, end]);

  return (
    <span ref={spanRef} className="tabular-nums">
      {val.toLocaleString()}
      {suffix}
    </span>
  );
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

function Navbar({ locale, t }: { locale: Locale; t: (typeof translations)["en"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const other: Locale = locale === "en" ? "fa" : "en";

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks = [
    { href: "#solutions", label: locale === "en" ? "Solutions" : "راهکارها" },
    { href: "#products", label: locale === "en" ? "Products" : "محصولات" },
    { href: "#about", label: locale === "en" ? "About" : "درباره ما" },
    { href: "#contact", label: locale === "en" ? "Contact" : "تماس" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: easeOut }}
      dir={t.dir}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/75 backdrop-blur-2xl border-b border-white/[0.07]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-[64px] flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-7 h-7 relative rounded-md overflow-hidden">
            <Image src={logoImg} alt="UBETTER" fill className="object-cover" sizes="28px" />
          </div>
          <span className="text-white font-bold text-[15px] tracking-tight group-hover:text-[#00ff88] transition-colors duration-300">
            UBETTER
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/55 hover:text-white text-[13.5px] font-medium transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href={`/${other}`}
            className="hidden sm:flex items-center px-3 py-1.5 rounded-full border border-white/20 text-white/55 hover:text-white hover:border-white/40 text-[11px] font-bold tracking-widest uppercase transition-all duration-200"
          >
            {other === "fa" ? "فا" : "EN"}
          </Link>
          <a
            href="#contact"
            className="hidden sm:flex px-5 py-2.5 bg-[#00ff88] text-black text-[13px] font-bold rounded-full hover:bg-[#00e67a] transition-colors duration-200 hover:shadow-[0_0_24px_rgba(0,255,136,0.4)]"
          >
            {locale === "en" ? "Get Quote" : "پیش‌فاکتور"}
          </a>

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
                        ? "opacity-0 scale-x-0"
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
            className="md:hidden bg-[#060606]/95 backdrop-blur-2xl border-t border-white/[0.07] px-6 py-5 flex flex-col gap-3"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-white/65 hover:text-white py-2.5 text-[15px] border-b border-white/[0.05] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-2.5 pt-3">
              <Link
                href={`/${other}`}
                className="flex-1 text-center py-2.5 rounded-full border border-white/20 text-white/60 text-sm font-medium"
              >
                {other === "fa" ? "فارسی" : "English"}
              </Link>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex-1 text-center py-2.5 rounded-full bg-[#00ff88] text-black text-sm font-bold"
              >
                {locale === "en" ? "Get Quote" : "پیش‌فاکتور"}
              </a>
            </div>
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

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110 will-change-transform">
        <Image
          src={hero1Img}
          alt="UBETTER Energy Facility"
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25" />
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

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20"
        dir={t.dir}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.6, ease: easeOut }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] text-[11px] font-semibold tracking-[0.16em] uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
          {isRTL ? "قدرت‌بخشی به آینده سبز" : "Powering a Greener Future"}
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: easeOut }}
          className="text-5xl sm:text-[60px] md:text-[74px] lg:text-[90px] font-bold text-white leading-[1.04] tracking-tight mb-7"
        >
          {isRTL ? (
            <>
              انرژی لیتیومی
              <br />
              <span className="bg-gradient-to-r from-[#00ff88] via-[#00dd77] to-[#00ff88] bg-clip-text text-transparent">
                سیستم‌های هوشمند
              </span>
            </>
          ) : (
            <>
              Smart Lithium
              <br />
              <span className="bg-gradient-to-r from-[#00ff88] via-[#00cc66] to-[#00ff88] bg-clip-text text-transparent">
                Energy Systems
              </span>
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.85 }}
          className="text-[17px] sm:text-[19px] text-white/62 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {isRTL
            ? "سیستم‌های پیشرفته LiFePO4 از ذخیره‌سازی 2.5kWh خانگی تا پروژه‌های کانتینری 2MWh صنعتی."
            : "Advanced LiFePO₄ battery systems for residential, commercial and industrial use. From 2.5 kWh to 2 MWh — engineered for the long run."}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.92, duration: 0.75 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#products"
            className="group inline-flex items-center gap-2 px-9 py-4 bg-[#00ff88] text-black font-bold rounded-full text-[15px] hover:bg-[#00e67a] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_52px_rgba(0,255,136,0.38)]"
          >
            {stripLeadingEmoji(t.hero.ctaProducts)}
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center px-9 py-4 border border-white/28 text-white font-medium rounded-full text-[15px] backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/45 transition-all duration-300"
          >
            {stripLeadingEmoji(t.hero.ctaConsultation)}
          </a>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.8 }}
          className="mt-16 pt-12 border-t border-white/[0.1] flex flex-wrap justify-center gap-10"
        >
          {[
            { v: "10,848m²", l: t.hero.stats[0].label },
            { v: "60M ¥", l: t.hero.stats[1].label },
            { v: "30+", l: t.hero.stats[2].label },
            { v: "20+", l: isRTL ? "کشور تحت پوشش" : "Countries Served" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight">{s.v}</div>
              <div className="text-[11px] text-white/38 mt-1.5 tracking-wide">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-2.5 pointer-events-none"
      >
        <span className="text-white/28 text-[9px] tracking-[0.22em] uppercase">
          {isRTL ? "اسکرول" : "Scroll"}
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/22 flex justify-center pt-[7px]"
        >
          <span className="w-[3px] h-2 rounded-full bg-white/45" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 3. STATISTICS
// ══════════════════════════════════════════════════════════════════════════════

function Stats({ locale }: { locale: Locale }) {
  const isRTL = locale === "fa";

  const stats = [
    { end: 10848, suffix: "m²", label: isRTL ? "مساحت کارخانه" : "Factory Area", sub: isRTL ? "مجهزترین خط تولید" : "State-of-the-art facility" },
    { end: 60, suffix: "M ¥", label: isRTL ? "دارایی تجهیزات" : "Equipment Assets", sub: isRTL ? "سرمایه‌گذاری جهانی" : "World-class investment" },
    { end: 30, suffix: "+", label: isRTL ? "مهندس متخصص" : "Expert Engineers", sub: isRTL ? "اساتید + متخصصان" : "Professors & specialists" },
    { end: 500, suffix: "+", label: isRTL ? "پروژه اجرایی" : "Projects Deployed", sub: isRTL ? "در سراسر جهان" : "Globally deployed" },
    { end: 10, suffix: "M ¥", label: isRTL ? "سرمایه ثبت‌شده" : "Registered Capital", sub: isRTL ? "شرکت پایدار مالی" : "Financially stable" },
    { end: 20, suffix: "+", label: isRTL ? "کشور صادرات" : "Export Countries", sub: isRTL ? "حضور جهانی" : "Global presence" },
  ];

  return (
    <section className="py-28 bg-[#050505]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <Pill label={isRTL ? "ارقام و آمار" : "By the Numbers"} />
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {isRTL ? "مقیاس صنعتی،" : "Enterprise Scale,"}{" "}
            <span className="text-white/40">{isRTL ? "بلندپروازی جهانی" : "Global Ambition"}</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.06]">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: easeOut }}
              className="group bg-[#0a0a0a] hover:bg-[#111111] transition-colors duration-400 p-8 md:p-10"
            >
              <div className="text-[42px] md:text-[52px] font-bold text-white group-hover:text-[#00ff88] transition-colors duration-400 leading-none mb-3">
                <Counter end={s.end} suffix={s.suffix} />
              </div>
              <div className="text-white font-semibold text-[14px] mb-1">{s.label}</div>
              <div className="text-white/35 text-[12px]">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 4. SOLUTIONS
// ══════════════════════════════════════════════════════════════════════════════

function Solutions({ locale }: { locale: Locale }) {
  const isRTL = locale === "fa";

  const cards = [
    {
      icon: "⌂",
      title: isRTL ? "ذخیره خانگی" : "Residential Storage",
      desc: isRTL
        ? "سیستم‌های دیواری و عمودی از 2.5 تا 20 کیلووات ساعت برای خانه‌ها."
        : "Wall-mounted & vertical LiFePO4 systems from 2.5–20 kWh for homes.",
      tag: "2.5–20 kWh",
    },
    {
      icon: "◫",
      title: isRTL ? "ESS تجاری" : "Commercial ESS",
      desc: isRTL
        ? "سیستم‌های رک و استک‌بل برای دفاتر، فروشگاه‌ها و کسب‌وکارهای متوسط."
        : "Rack-mounted & stackable all-in-ones for offices and retail.",
      tag: "20–261 kWh",
    },
    {
      icon: "▣",
      title: isRTL ? "ESS صنعتی" : "Industrial ESS",
      desc: isRTL
        ? "ذخیره‌ساز کانتینری 500kWh تا 2MWh برای کارخانه و دیتاسنتر."
        : "Containerized ESS 500 kWh – 2 MWh for factories & data centers.",
      tag: "0.5–2 MWh",
    },
    {
      icon: "◉",
      title: isRTL ? "یکپارچه‌سازی خورشیدی" : "Solar Integration",
      desc: isRTL
        ? "سیستم‌های مستقل و متصل به شبکه با مدیریت هوشمند انرژی."
        : "Grid-tied & off-grid solar + storage with smart energy management.",
      tag: isRTL ? "آماده PV" : "PV Ready",
    },
    {
      icon: "⚙",
      title: isRTL ? "OEM / ODM سفارشی" : "Custom OEM / ODM",
      desc: isRTL
        ? "سیستم‌های باتری کاملاً سفارشی برای شرکای جهانی."
        : "Fully customized battery systems for OEM & ODM partners worldwide.",
      tag: isRTL ? "سفارشی" : "Tailored",
    },
    {
      icon: "⚡",
      title: isRTL ? "پشتیبان اضطراری" : "Emergency Backup",
      desc: isRTL
        ? "برق بی‌وقفه برای بیمارستان‌ها، مخابرات و مراکز داده."
        : "Mission-critical power for hospitals, telecom stations & data rooms.",
      tag: isRTL ? "حیاتی" : "Mission Critical",
    },
  ];

  return (
    <section id="solutions" className="py-32 bg-[#0a0a0a]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-20">
          <Pill label={isRTL ? "راهکارها" : "Solutions"} />
          <h2 className="text-4xl md:text-[58px] font-bold text-white leading-tight mb-5">
            {isRTL ? "راهکار انرژی برای هر مقیاس" : "Energy Solutions\nfor Every Scale"}
          </h2>
          <p className="text-white/48 text-[17px] max-w-2xl mx-auto leading-relaxed">
            {isRTL
              ? "از ذخیره خورشیدی خانگی تا استقرارهای صنعتی چند مگاواتی، UBETTER راهکارهای مهندسی‌شده ارائه می‌دهد."
              : "From residential solar storage to multi-megawatt industrial deployments, UBETTER delivers engineered solutions built to last."}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: easeOut }}
              className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-500 cursor-default overflow-hidden"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#00ff88]/[0.06] to-transparent rounded-2xl" />

              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-lg font-bold mb-5">
                  {card.icon}
                </div>
                <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#00ff88]/[0.08] text-[#00ff88] text-[11px] font-semibold mb-4">
                  {card.tag}
                </div>
                <h3 className="text-[18px] font-bold text-white mb-3 group-hover:text-[#00ff88] transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-white/48 text-[13.5px] leading-relaxed mb-6">{card.desc}</p>
                <div className="flex items-center gap-2 text-white/28 group-hover:text-[#00ff88] text-[13px] font-medium transition-all duration-300">
                  <span>{isRTL ? "بیشتر بدانید" : "Learn more"}</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${isRTL ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"}`}
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 5. PRODUCT SHOWCASE
// ══════════════════════════════════════════════════════════════════════════════

function Products({ locale }: { locale: Locale }) {
  const isRTL = locale === "fa";

  const products = [
    {
      img: frontProductImg,
      name: isRTL ? "سری خانگی" : "Home Series",
      model: "HB-2.5 / HB-5.0 / HB-10",
      desc: isRTL
        ? "باتری LiFePO4 دیواری برای یکپارچه‌سازی خورشیدی خانگی. فشرده، ساکت و کارآمد."
        : "Wall-mounted LiFePO4 for residential solar integration. Compact, silent, and highly efficient.",
      specs: ["2.5–10 kWh", "LiFePO4", isRTL ? "دیواری" : "Wall-mount", isRTL ? "آماده خورشیدی" : "Solar-ready"],
    },
    {
      img: productHeroImg,
      name: isRTL ? "سری تجاری" : "Commercial Series",
      model: "CB-60 / CB-100 / CB-261",
      desc: isRTL
        ? "سیستم‌های رک‌مونت و استک‌بل یکپارچه برای کاربردهای تجاری و صنعتی کوچک."
        : "Rack-mounted & stackable all-in-one systems for commercial and light industrial applications.",
      specs: ["60–261 kWh", isRTL ? "رک / استک" : "Rack / Stack", isRTL ? "متصل به شبکه" : "Grid-tied", "SCADA"],
    },
    {
      img: productDetailsImg,
      name: isRTL ? "سری صنعتی" : "Industrial Series",
      model: "IE-500 / IE-1000 / IE-2000",
      desc: isRTL
        ? "ذخیره‌سازی صنعتی کانتینری برای کارخانه‌ها، مراکز داده و تأسیسات بزرگ."
        : "Containerized industrial ESS for factories, data centers, and large-scale facilities.",
      specs: ["500 kWh – 2 MWh", isRTL ? "کانتینری" : "Container", isRTL ? "ماژولار" : "Modular", "BMS"],
    },
  ];

  return (
    <section id="products" className="py-32 bg-[#050505]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-20">
          <Pill label={isRTL ? "محصولات" : "Products"} />
          <h2 className="text-4xl md:text-[58px] font-bold text-white leading-tight mb-5">
            {isRTL ? "مهندسی‌شده برای هر کاربرد" : "Engineered for\nEvery Application"}
          </h2>
          <p className="text-white/48 text-[17px] max-w-2xl mx-auto leading-relaxed">
            {isRTL
              ? "سه خط محصول برای هر نیاز ذخیره‌سازی انرژی — از واحدهای خانگی کوچک تا استقرارهای صنعتی عظیم."
              : "Three product lines covering every energy storage need — from compact residential units to massive industrial deployments."}
          </p>
        </Reveal>

        <div className="space-y-4">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -48 : 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: easeOut }}
              className={`group flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} rounded-2xl overflow-hidden border border-white/[0.07] hover:border-white/[0.14] bg-[#0f0f0f] transition-all duration-500`}
            >
              {/* Image */}
              <div className="md:w-1/2 relative h-64 md:h-[400px] overflow-hidden shrink-0">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-${i % 2 === 0 ? "r" : "l"} from-[#0f0f0f] via-transparent to-transparent`}
                />
              </div>

              {/* Content */}
              <div className="md:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-16">
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#00ff88]/10 text-[#00ff88] text-[11px] font-semibold mb-6 w-fit tracking-wide">
                  {p.model}
                </div>
                <h3 className="text-3xl md:text-[40px] font-bold text-white leading-tight mb-4">{p.name}</h3>
                <p className="text-white/50 text-[15px] leading-relaxed mb-8">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-9">
                  {p.specs.map((spec) => (
                    <span
                      key={spec}
                      className="px-3.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-white/65 text-[13px] font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-[#00ff88] font-semibold text-[14px] group/link"
                >
                  {isRTL ? "درخواست مشخصات فنی" : "Request Specifications"}
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${isRTL ? "group-hover/link:-translate-x-1 rotate-180" : "group-hover/link:translate-x-1"}`}
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 6. CASE STUDIES
// ══════════════════════════════════════════════════════════════════════════════

function CaseStudies({ locale }: { locale: Locale }) {
  const isRTL = locale === "fa";

  const cases = [
    {
      img: bannerImg,
      tag: isRTL ? "صنعتی" : "Industrial",
      location: isRTL ? "جیانگشی، چین" : "Jiangxi, China",
      title: isRTL ? "مدیریت اوج مصرف کارخانه" : "Factory Peak Shaving",
      desc: isRTL
        ? "ذخیره‌ساز 500kWh در یک کارخانه تولیدی نصب شد و هزینه برق اوج مصرف را ۴۰٪ کاهش داد."
        : "500 kWh ESS deployed at a manufacturing plant — peak demand charges reduced by 40%.",
      metric: "40%",
      metricLabel: isRTL ? "کاهش هزینه" : "Cost Reduction",
    },
    {
      img: hero2Img,
      tag: isRTL ? "تجاری" : "Commercial",
      location: isRTL ? "اندونزی" : "Indonesia",
      title: isRTL ? "ریزورت خارج از شبکه" : "Resort Off-Grid Storage",
      desc: isRTL
        ? "خورشیدی + 200kWh ذخیره UBETTER، استقلال انرژی کامل برای یک اکوریزورت دورافتاده."
        : "Solar + 200 kWh UBETTER storage enabling full energy independence for a remote eco-resort.",
      metric: "100%",
      metricLabel: isRTL ? "استقلال انرژی" : "Energy Independence",
    },
    {
      img: side2ProductImg,
      tag: isRTL ? "جهانی" : "Global",
      location: isRTL ? "نمایشگاه کانتون، گوانگژو" : "Canton Fair, Guangzhou",
      title: isRTL ? "138امین نمایشگاه کانتون" : "138th Canton Fair",
      desc: isRTL
        ? "حضور بین‌المللی نمایشگاهی، همکاری OEM/ODM با بیش از ۲۰ کشور را تقویت کرد."
        : "Global exhibition establishing OEM/ODM partnerships across 20+ countries.",
      metric: "20+",
      metricLabel: isRTL ? "شریک جدید" : "New Partners",
    },
  ];

  return (
    <section className="py-32 bg-[#0a0a0a]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-20">
          <Pill label={isRTL ? "مطالعات موردی" : "Case Studies"} />
          <h2 className="text-4xl md:text-[58px] font-bold text-white leading-tight mb-5">
            {isRTL ? "نتایج واقعی در سراسر جهان" : "Proven Results\nAcross the Globe"}
          </h2>
          <p className="text-white/48 text-[17px] max-w-2xl mx-auto leading-relaxed">
            {isRTL
              ? "استقرارهای واقعی نشان‌دهنده قابلیت اطمینان و عملکرد سیستم‌های ذخیره‌سازی UBETTER است."
              : "Real-world deployments demonstrating the reliability and performance of UBETTER energy storage systems."}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 52 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.14, ease: easeOut }}
              className="group rounded-2xl overflow-hidden border border-white/[0.07] hover:border-white/[0.18] transition-all duration-500"
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#00ff88]/15 border border-[#00ff88]/35 text-[#00ff88] text-[11px] font-semibold">
                  {c.tag}
                </div>
              </div>
              <div className="bg-[#111111] p-6">
                <div className="text-white/35 text-[11px] uppercase tracking-widest mb-2">{c.location}</div>
                <h3 className="text-[19px] font-bold text-white mb-3">{c.title}</h3>
                <p className="text-white/48 text-[13px] leading-relaxed mb-6">{c.desc}</p>
                <div className="flex items-end gap-2">
                  <span className="text-[42px] font-bold text-[#00ff88] leading-none">{c.metric}</span>
                  <span className="text-white/45 text-[13px] pb-1.5">{c.metricLabel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 7. ABOUT
// ══════════════════════════════════════════════════════════════════════════════

function About({ locale, t }: { locale: Locale; t: (typeof translations)["en"] }) {
  const isRTL = locale === "fa";

  const kpis = [
    { label: isRTL ? "سرمایه ثبت‌شده" : "Registered Capital", val: "10M ¥" },
    { label: isRTL ? "دارایی تجهیزات" : "Equipment Assets", val: "60M ¥" },
    { label: isRTL ? "مساحت کارخانه" : "Factory Building", val: "10,848m²" },
    { label: isRTL ? "تیم مهندسی" : "Engineering Team", val: "30+" },
  ];

  return (
    <section id="about" className="py-32 bg-[#050505]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <Reveal>
            <Pill label={isRTL ? "درباره UBETTER" : "About UBETTER"} />
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              {isRTL ? "فناوری ملی،\nاستاندارد جهانی" : "National Innovation,\nGlobal Standard"}
            </h2>
            <p className="text-white/55 text-[16px] leading-relaxed mb-5">
              {stripLeadingEmoji(t.about.p1)}
            </p>
            <p className="text-white/55 text-[16px] leading-relaxed mb-10">
              {stripLeadingEmoji(t.about.p2)}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {kpis.map((k) => (
                <div
                  key={k.label}
                  className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-[#00ff88]/30 transition-colors duration-300"
                >
                  <div className="text-[22px] font-bold text-[#00ff88] mb-1">{k.val}</div>
                  <div className="text-white/50 text-[13px]">{k.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right image */}
          <Reveal delay={0.2} className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={bannerImg}
                alt="UBETTER Factory"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {/* Cert badges */}
              <div className="absolute bottom-5 left-5 right-5 flex gap-2">
                {["ISO 9001", "ISO 14001", "CE", "UL"].map((c) => (
                  <div
                    key={c}
                    className="flex-1 text-center py-2 bg-black/65 backdrop-blur-sm border border-white/18 rounded-lg text-white/78 text-[11px] font-bold tracking-wide"
                  >
                    {c}
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8, ease: easeOut }}
              className={`absolute -bottom-6 ${isRTL ? "left-6" : "right-6"} bg-[#111] border border-[#00ff88]/35 rounded-2xl p-5 shadow-2xl`}
            >
              <div className="text-[36px] font-bold text-[#00ff88] leading-none">10+</div>
              <div className="text-white/55 text-[13px] mt-1">{isRTL ? "سال تجربه" : "Years Experience"}</div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 8. GLOBAL PRESENCE
// ══════════════════════════════════════════════════════════════════════════════

function GlobalPresence({ locale }: { locale: Locale }) {
  const isRTL = locale === "fa";

  const regions = [
    { name: isRTL ? "آسیا-پاسیفیک" : "Asia Pacific", countries: 8, projects: 180, x: 77, y: 42 },
    { name: isRTL ? "خاورمیانه" : "Middle East", countries: 6, projects: 95, x: 62, y: 50 },
    { name: isRTL ? "اروپا" : "Europe", countries: 4, projects: 60, x: 49, y: 30 },
    { name: isRTL ? "آمریکا" : "Americas", countries: 3, projects: 40, x: 21, y: 40 },
    { name: isRTL ? "آفریقا" : "Africa", countries: 2, projects: 25, x: 51, y: 62 },
  ];

  return (
    <section className="py-32 bg-[#0a0a0a] overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <Pill label={isRTL ? "حضور جهانی" : "Global Reach"} />
          <h2 className="text-4xl md:text-[58px] font-bold text-white leading-tight mb-5">
            {isRTL ? "تأمین انرژی در سراسر جهان" : "Powering Projects\nWorldwide"}
          </h2>
          <p className="text-white/48 text-[17px] max-w-2xl mx-auto">
            {isRTL
              ? "سیستم‌های UBETTER در پنج قاره مستقر شده‌اند."
              : "UBETTER systems are deployed across five continents, supporting diverse commercial and industrial applications."}
          </p>
        </Reveal>

        {/* World dot map */}
        <div className="relative rounded-2xl overflow-hidden border border-white/[0.07] mb-10 bg-[#080808]">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(0,255,136,0.6) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080808]/60" />

          <div className="relative w-full" style={{ paddingBottom: "48%" }}>
            {regions.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.18 + 0.3, duration: 0.5, ease: "backOut" }}
                className="absolute"
                style={{ left: `${r.x}%`, top: `${r.y}%` }}
              >
                <div className="relative -translate-x-1/2 -translate-y-1/2 group cursor-default">
                  {/* Pulse rings */}
                  {[1, 2].map((ring) => (
                    <motion.div
                      key={ring}
                      animate={{ scale: [1, ring === 1 ? 2.5 : 3.5], opacity: [0.7, 0] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: ring * 0.5 + i * 0.2,
                        ease: "easeOut",
                      }}
                      className="absolute inset-0 rounded-full border border-[#00ff88]/50"
                    />
                  ))}
                  <div className="relative w-3 h-3 rounded-full bg-[#00ff88] shadow-[0_0_16px_rgba(0,255,136,0.9)]" />
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/80 px-2 py-1 rounded text-white text-[11px] font-medium pointer-events-none">
                    {r.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Region cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {regions.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className="bg-[#0f0f0f] border border-white/[0.07] hover:border-[#00ff88]/28 rounded-xl p-5 text-center transition-colors duration-300"
            >
              <div className="text-[26px] font-bold text-white mb-0.5">{r.countries}</div>
              <div className="text-[#00ff88] text-[11px] font-semibold mb-2">
                {isRTL ? "کشور" : "Countries"}
              </div>
              <div className="text-white/55 text-[12px] font-medium">{r.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 9. TESTIMONIALS
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
// 10. NEWS / MEDIA
// ══════════════════════════════════════════════════════════════════════════════

function News({ locale }: { locale: Locale }) {
  const isRTL = locale === "fa";

  const posts = [
    {
      img: hero2Img,
      tag: isRTL ? "اخبار شرکت" : "Company News",
      date: isRTL ? "فروردین ۱۴۰۴" : "April 2025",
      title: isRTL ? "UBETTER سیستم ESS تجاری 261kWh را عرضه کرد" : "UBETTER Launches New 261 kWh Commercial ESS",
      desc: isRTL
        ? "آخرین سیستم ذخیره‌سازی تجاری ما با عمر سیکل بهبودیافته و BMS یکپارچه."
        : "Our latest commercial ESS sets a new benchmark with improved cycle life and integrated BMS.",
    },
    {
      img: bannerImg,
      tag: isRTL ? "صنعت" : "Industry",
      date: isRTL ? "اسفند ۱۴۰۳" : "March 2025",
      title: isRTL ? "UBETTER در 138امین نمایشگاه کانتون" : "UBETTER at the 138th Canton Fair",
      desc: isRTL
        ? "نمایش کامل محصولات در گوانگژو و انعقاد شراکت‌های جدید در اروپا و خاورمیانه."
        : "Full product showcase in Guangzhou, forming new partnerships across Europe and the Middle East.",
    },
    {
      img: front2ProductImg,
      tag: isRTL ? "تکنولوژی" : "Technology",
      date: isRTL ? "بهمن ۱۴۰۳" : "February 2025",
      title: isRTL ? "شیمی LiFePO4 نسل بعدی" : "Next-Generation LiFePO4 Chemistry",
      desc: isRTL
        ? "تیم R&D ما به عمر سیکل بیش از ۸۰۰۰ دست یافته و گارانتی محصول را به ۱۵ سال افزایش داده است."
        : "Our R&D team achieves 8000+ cycle life in new cell development, extending warranty to 15 years.",
    },
  ];

  return (
    <section className="py-32 bg-[#0a0a0a]" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-16">
          <div>
            <Pill label={isRTL ? "اخبار و رسانه" : "News & Media"} />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              {isRTL ? "آخرین اخبار" : "Latest Updates"}
            </h2>
          </div>
          <a
            href="#"
            className="mt-6 sm:mt-0 text-[#00ff88] text-[13px] font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-200"
          >
            {isRTL ? "مشاهده همه" : "View all news"}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 44 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: easeOut }}
              className="group rounded-2xl overflow-hidden bg-[#0f0f0f] border border-white/[0.07] hover:border-white/[0.17] transition-all duration-500 cursor-pointer"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/55 backdrop-blur-sm border border-white/18 text-white/72 text-[11px] font-semibold">
                  {post.tag}
                </div>
              </div>
              <div className="p-6">
                <div className="text-white/30 text-[11px] mb-3 tracking-wide">{post.date}</div>
                <h3 className="text-[17px] font-bold text-white mb-3 group-hover:text-[#00ff88] transition-colors duration-300 leading-snug">
                  {post.title}
                </h3>
                <p className="text-white/45 text-[13px] leading-relaxed">{post.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 11. CTA SECTION
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
// 12. FOOTER
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
      <Stats locale={locale} />
      <Solutions locale={locale} />
      <Products locale={locale} />
      <CaseStudies locale={locale} />
      <About locale={locale} t={t} />
      <GlobalPresence locale={locale} />
      <Testimonials locale={locale} />
      <News locale={locale} />
      <CTA locale={locale} t={t} />
      <Footer locale={locale} />
    </div>
  );
}
