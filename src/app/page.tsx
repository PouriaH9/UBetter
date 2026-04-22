"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import aboutImage from "@/assets/original content/工商储-拷贝1.jpg";
import expoImage from "@/assets/original content/邀请函广交会12.jpg";
import heroImage from "@/assets/original content/全系列-拷贝1.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 }
};

const productItems = [
  { title: "120/180/261kWh سیستم ذخیره‌سازی صنعتی و تجاری", image: "合集英文1.jpg" },
  { title: "60kWh سیستم باتری صنعتی و تجاری", image: "国际站图_03-768x564.jpg" },
  { title: "140kWh سیستم ذخیره‌سازی برای کاربرد صنعتی", image: "unnamed-768x768.jpg" },
  { title: "Smart 120kWh سیستم هوشمند کسب‌وکار", image: "21-1-768x768.jpg" },
  { title: "15kWh 48V 314Ah LiFePO4 Battery", image: "360albumviewer_imgproc_33154375-768x768.png" },
  { title: "1-2MWh سیستم کانتینری ذخیره انرژی", image: "2.png" },
  { title: "261kWh ذخیره‌ساز خورشیدی صنعتی", image: "7.png" },
  { title: "16kWh باتری عمودی خانگی", image: "4-5-768x768.jpg" },
  { title: "2.5kWh سیستم باتری منزل و دفتر", image: "9-768x768.jpg" },
  { title: "100kWh باتری رک‌مونت صنعتی", image: "4-拷贝-3-768x768.jpg" },
  { title: "241kWh ذخیره‌ساز انرژی تجاری", image: "英文详241_03.jpg" },
  { title: "51.2V 100Ah باتری ماژولار رک‌مونت", image: "c5dbe6fdee51944e7044f4599786976a-768x768.jpg" }
];

const galleryFiles = [
  "1-14.jpg",
  "1-17.jpg",
  "1-19.jpg",
  "1-20.jpg",
  "2-2.jpg",
  "3.jpg",
  "8.jpg",
  "321.jpg",
  "331.jpg",
  "A_02.jpg",
  "A_03.jpg",
  "maxresdefault.jpg",
  "IMG_4141-拷贝1-scaled.jpg",
  "52960297-008a-477e-8cbc-966098114e781-scaled.jpg",
  "4d8d8e1b-d5c5-4081-a306-2b3baf84c367121-scaled.jpg",
  "31-scaled.jpg",
  "5-2.jpg",
  "94cd1cd76afcdcb81ffb5d1918e9ec53_compress.jpg",
  "家储-拷贝1.jpg",
  "家储海报英文1.jpg",
  "工商储-拷贝1.jpg",
  "合集英文1.jpg",
  "全系列-拷贝1.jpg",
  "图片渲染-1.png"
];

function filePath(name: string) {
  return `/original-content/${encodeURIComponent(name)}`;
}

export default function Home() {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGalleryIndex((prev) => (prev + 1) % galleryFiles.length);
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  const prevGallerySlide = () => {
    setActiveGalleryIndex((prev) => (prev - 1 + galleryFiles.length) % galleryFiles.length);
  };

  const nextGallerySlide = () => {
    setActiveGalleryIndex((prev) => (prev + 1) % galleryFiles.length);
  };

  const galleryThumbs = Array.from({ length: 5 }, (_, offset) => {
    return (activeGalleryIndex + offset) % galleryFiles.length;
  });

  return (
    <main className="text-slate-100">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-300/30 bg-blue-600/25 text-sm font-bold text-blue-200">
              U
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold tracking-wide sm:text-base">UBETTER ENERGY</p>
              <p className="hidden text-xs text-slate-400 sm:block">تولیدکننده باتری LiFePO4 و سیستم ذخیره سازی انرژی</p>
            </div>
          </div>
          <nav className="hidden gap-8 text-sm font-semibold text-slate-300 lg:flex">
            <a href="#products" className="transition hover:text-cyan-300">محصولات</a>
            <a href="#about" className="transition hover:text-cyan-300">درباره ما</a>
            <a href="#projects" className="transition hover:text-cyan-300">پروژه ها</a>
            <a href="#contact" className="transition hover:text-cyan-300">تماس</a>
          </nav>
          <Link
            href="#contact"
            className="rounded-full border border-cyan-300/50 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-400/20 sm:px-5 sm:text-sm"
          >
            دریافت پیش‌فاکتور
          </Link>
        </div>
      </header>

      <section className="section-padding cyber-grid relative min-h-[92vh] overflow-hidden">
        <div className="electricity-bg absolute inset-0 z-0" />
        <div className="electricity-wave electricity-wave-a pointer-events-none absolute inset-0 z-10" />
        <div className="electricity-wave electricity-wave-b pointer-events-none absolute inset-0 z-10" />
        <div className="electricity-scan pointer-events-none absolute inset-0 z-10" />
        <div className="electricity-sparks pointer-events-none absolute inset-0 z-10">
          {Array.from({ length: 70 }).map((_, i) => (
            <span key={i} className="electricity-spark" />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-slate-950/25 via-slate-950/45 to-slate-950/75" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-slate-950/75 via-slate-950/35 to-slate-950/50" />
        <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-2">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.7 }}>
            <p className="mb-4 inline-flex rounded-full border border-cyan-300/35 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200 sm:text-sm">
              Stay Secure. Stay Ahead.
            </p>
            <motion.h1
              className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              آینده برق کسب وکار شما
              <br />
              با سامانه های
              <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent"> ذخیره انرژی UBETTER</span>
              <br />
              همیشه پایدار می ماند
            </motion.h1>
            <motion.p
              className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              از 60kWh تا 2MWh، راهکارهای LiFePO4 ما برای کارخانه ها، ساختمان های تجاری و پروژه های خورشیدی
              طراحی شده تا قطعی برق، نوسان شبکه و هزینه انرژی را مدیریت کنید.
            </motion.p>
            <motion.p
              className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              طراحی سفارشی، تحویل سریع و خدمات فنی کامل برای اجرای پروژه انرژی بدون ریسک.
            </motion.p>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
              <Link
                href="#products"
                className="animated-gradient rounded-full px-7 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-90 sm:text-base"
              >
                مشاهده محصولات
              </Link>
              <Link
                href="#contact"
                className="rounded-full border border-slate-600 bg-slate-900/50 px-7 py-3 text-center text-sm font-bold text-slate-100 transition hover:border-cyan-300/50 hover:text-cyan-200 sm:text-base"
              >
                دریافت مشاوره
              </Link>
            </div>
            <div className="mt-9 grid max-w-xl grid-cols-3 gap-3 text-center">
              {[
                { label: "پروژه فعال", value: "200+" },
                { label: "حداکثر ظرفیت", value: "2MWh" },
                { label: "مهندس متخصص", value: "30+" }
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-900/60 px-3 py-4">
                  <p className="text-lg font-black text-cyan-200 sm:text-xl">{item.value}</p>
                  <p className="mt-1 text-xs text-slate-400 sm:text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div className="float-soft" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="rounded-[2rem] border border-cyan-300/30 bg-slate-950/55 p-6 shadow-[0_0_50px_rgba(14,165,233,0.16)] backdrop-blur-md sm:p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200 sm:text-sm">Power Intelligence</p>
              <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl">Solar + Storage + Backup</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                زیرساخت انرژی یکپارچه برای پایداری عملیاتی کسب وکار در ساعات اوج مصرف، قطعی شبکه و پروژه های توسعه صنعتی.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {["ISO 9001/14001", "Factory Direct", "Custom BMS", "Global Delivery"].map((item) => (
                  <div key={item} className="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-center text-xs font-semibold text-slate-200 sm:text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8 overflow-hidden rounded-2xl border border-cyan-300/30 shadow-[0_10px_35px_rgba(14,165,233,0.18)] sm:mt-10"
          >
            <div className="relative h-56 w-full sm:h-72 lg:h-[88vh]">
              <Image src={heroImage} alt="hero top visual" fill sizes="100vw" className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-slate-950/10 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="products" className="section-padding">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-white sm:text-3xl md:text-4xl">محصولات حرفه ای برای پروژه های انرژی</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            طراحی کارت ها و نمایش تصاویر با سبک یکپارچه انجام شده تا سایت شما حس برند صنعتی، مدرن و قابل اعتماد داشته باشد.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productItems.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300/35 hover:shadow-[0_20px_45px_rgba(2,132,199,0.18)]"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image src={filePath(item.image)} alt={item.title} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 to-transparent opacity-80" />
                </div>
                <div className="p-4 sm:p-5">
                  <p className="mb-3 inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-200">محصول</p>
                  <p className="text-sm font-bold leading-7 text-slate-100">{item.title}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section-padding">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-xl">
            <Image src={aboutImage} alt="توانمندی تولیدی یوبتر" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 to-transparent" />
          </div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.7 }}>
            <h2 className="text-2xl font-black text-white sm:text-3xl md:text-4xl">درباره UBETTER</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              Ubetter Technology Co., Ltd. یک شرکت ملی های‌تک با R&D سفارشی، تولید حرفه‌ای و زنجیره تامین قوی است.
              این مجموعه با استانداردهای ISO 9001 و ISO 14001 و تیم فنی تخصصی، راهکارهای باتری را برای صنایع مختلف
              از انرژی خورشیدی تا مخابرات، پزشکی و لجستیک ارائه می‌دهد.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["10M Yuan سرمایه ثبت‌شده", "60M Yuan تجهیزات تولید", "10848m2 فضای کارخانه", "30+ مهندس متخصص"].map((kpi) => (
                <div key={kpi} className="rounded-xl border border-blue-300/20 bg-blue-500/10 px-4 py-3 text-xs font-semibold text-blue-100 sm:text-sm">
                  {kpi}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="section-padding">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <article className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 shadow-sm lg:col-span-2">
            <div className="relative h-72">
              <Image src={filePath("maxresdefault.jpg")} alt="ویدیو پروژه‌های یوبتر" fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            </div>
            <div className="p-6">
              <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-200">PROJECT VIDEO</p>
              <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">Indonesian / Jiangxi / Factory Case Study</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">نمایش پروژه های واقعی با قاب بندی حرفه ای، حس اعتماد و اعتبار برند را بیشتر می کند.</p>
            </div>
          </article>
          <article className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 shadow-sm">
            <div className="relative h-72">
              <Image src={expoImage} alt="نمایشگاه کانتون" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
            </div>
            <div className="p-6">
              <p className="text-lg font-bold text-white sm:text-xl">UBETTER در Canton Fair</p>
              <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">حضور در نمایشگاه بین المللی برای توسعه بازار صادراتی و شبکه نمایندگی جهانی.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-black text-white sm:text-3xl md:text-4xl">گالری پروژه ها و خطوط تولید</h2>
            <p className="text-sm text-slate-400 sm:text-base">Animated Showcase / Pro Carousel</p>
          </div>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-slate-900/55 p-3 shadow-[0_20px_60px_rgba(2,132,199,0.16)] sm:p-4">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10">
              <div className="relative h-[340px] w-full sm:h-[460px] lg:h-[560px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={galleryFiles[activeGalleryIndex]}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={filePath(galleryFiles[activeGalleryIndex])}
                      alt={`گالری ${activeGalleryIndex + 1}`}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-slate-950/10" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <div className="max-w-lg">
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">Industrial Visual Gallery</p>
                    <p className="mt-2 text-sm font-semibold text-slate-200 sm:text-base">
                      اسلاید {activeGalleryIndex + 1} از {galleryFiles.length}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={prevGallerySlide}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-slate-950/65 text-xl text-white transition hover:border-cyan-300/60 hover:text-cyan-200"
                      aria-label="Previous gallery slide"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={nextGallerySlide}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-slate-950/65 text-xl text-white transition hover:border-cyan-300/60 hover:text-cyan-200"
                      aria-label="Next gallery slide"
                    >
                      ›
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-3">
              {galleryThumbs.map((idx) => (
                <button
                  key={`${galleryFiles[idx]}-${idx}`}
                  type="button"
                  onClick={() => setActiveGalleryIndex(idx)}
                  className={`relative h-16 overflow-hidden rounded-xl border sm:h-20 ${
                    idx === activeGalleryIndex
                      ? "border-cyan-300/70 ring-2 ring-cyan-300/35"
                      : "border-white/10 hover:border-cyan-300/40"
                  }`}
                  aria-label={`Go to gallery slide ${idx + 1}`}
                >
                  <Image src={filePath(galleryFiles[idx])} alt={`thumbnail ${idx + 1}`} fill sizes="20vw" className="object-cover" />
                  <div className="absolute inset-0 bg-slate-950/25" />
                </button>
              ))}
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                key={activeGalleryIndex}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 4.1, ease: "linear" }}
                className="h-full rounded-full bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-padding border-t border-white/10">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-black text-white sm:text-3xl md:text-4xl">Book A Demo / Get Free Quote</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              اگر پروژه صنعتی، تجاری یا خانگی دارید، همین حالا پیام بدهید تا طرح فنی و قیمت اختصاصی متناسب با ظرفیت مورد
              نیازتان ارائه کنیم.
            </p>
            <div className="mt-6 space-y-2 text-slate-300">
              <p>E-mail: ubetterbattery@gmail.com</p>
              <p>Mobile phone: +86 181 2378 3632</p>
              <p>Telephone: +0086-755-85235266</p>
              <p>Shenzhen, Guangdong, China</p>
            </div>
          </div>
          <form className="glass rounded-3xl border border-white/20 p-4 text-slate-100 sm:p-6">
            <div className="grid gap-4">
              <input className="rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400/50" placeholder="نام" />
              <input className="rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400/50" placeholder="ایمیل" />
              <input className="rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400/50" placeholder="شماره تماس" />
              <input className="rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400/50" placeholder="نام شرکت" />
              <textarea rows={4} className="rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400/50" placeholder="پیام شما" />
              <button type="button" className="animated-gradient rounded-xl px-5 py-3 font-bold text-white">
                ارسال درخواست
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
