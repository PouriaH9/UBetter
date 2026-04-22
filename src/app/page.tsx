"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";

import aboutImage from "@/assets/original content/工商储-拷贝1.jpg";
import expoImage from "@/assets/original content/邀请函广交会12.jpg";
import heroImage from "@/assets/original content/全系列-拷贝1.jpg";

const sectionVariants = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0 }
};

const staggerParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 }
};

const products = [
  { title: "60kWh Commercial & Industrial Energy Storage System", image: "国际站图_03-768x564.jpg", badge: "⚡ C&I" },
  { title: "100kWh Rack-Mounted C&I Energy Storage System", image: "4-拷贝-3-768x768.jpg", badge: "🏭 Factory" },
  { title: "120/180/261kWh Industrial Commercial System", image: "合集英文1.jpg", badge: "🔋 High Capacity" },
  { title: "241kWh Commercial & Industrial ESS", image: "英文详241_03.jpg", badge: "📈 Scalable" },
  { title: "1-2MWh Containerized Energy Storage System", image: "2.png", badge: "🚚 Container" },
  { title: "15kWh 48V 314Ah LiFePO4 Battery", image: "360albumviewer_imgproc_33154375-768x768.png", badge: "🏠 Home" },
  { title: "16kWh Vertical Home Energy Battery", image: "4-5-768x768.jpg", badge: "☀️ Solar Ready" },
  { title: "51.2V 100Ah Modular Rack-Mounted Battery", image: "c5dbe6fdee51944e7044f4599786976a-768x768.jpg", badge: "🧩 Modular" }
];

const serviceItems = [
  "🛠️ Customized energy storage system design",
  "👩‍💻 Professional technical support and wiring guidance",
  "🚀 Fast delivery with global warehousing support",
  "✅ Strict QC, long warranty, responsive after-sales"
];

const applicationItems = [
  "🏭 Factories and manufacturing plants",
  "📦 Warehouses and logistics centers",
  "🏢 Office buildings and shopping malls",
  "🌾 Farms and irrigation systems",
  "☀️ Solar + storage projects",
  "🏥 Hospitals, telecom base stations, and data rooms"
];

const galleryFiles = [
  "家储海报英文1.jpg",
  "工商储-拷贝1.jpg",
  "合集英文1.jpg",
  "全系列-拷贝1.jpg",
  "maxresdefault.jpg",
  "IMG_4141-拷贝1-scaled.jpg",
  "52960297-008a-477e-8cbc-966098114e781-scaled.jpg",
  "31-scaled.jpg"
];

function filePath(name: string) {
  return `/original-content/${encodeURIComponent(name)}`;
}

export default function Home() {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.25 });

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

  return (
    <main className="text-slate-100">
      <motion.div className="fixed left-0 top-0 z-[80] h-1 w-full origin-left bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-500" style={{ scaleX: progressScaleX }} />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <motion.div className="flex items-center gap-3" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-300/30 bg-blue-600/25 text-sm font-bold text-blue-200">
              U
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold tracking-wide sm:text-base">UBETTER ENERGY</p>
              <p className="hidden text-xs text-slate-400 sm:block">🔋 Reliable LiFePO4 Battery & Solar Storage Manufacturer</p>
            </div>
          </motion.div>

          <nav className="hidden gap-8 text-sm font-semibold text-slate-300 lg:flex">
            {[
              { label: "Products", href: "#products" },
              { label: "About", href: "#about" },
              { label: "Projects", href: "#projects" },
              { label: "Contact", href: "#contact" }
            ].map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ y: -2, color: "#67e8f9" }}
                whileTap={{ scale: 0.98 }}
                className="transition"
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
            <Link
              href="#contact"
              className="rounded-full border border-cyan-300/50 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-400/20 sm:px-5 sm:text-sm"
            >
              💬 Get Free Quote
            </Link>
          </motion.div>
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

        <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-2">
            <motion.div initial="hidden" animate="show" variants={staggerParent}>
              <motion.p variants={staggerItem} className="mb-4 inline-flex rounded-full border border-cyan-300/35 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200 sm:text-sm">
                ⚡ Powering A Greener Future
              </motion.p>
              <motion.h1 variants={staggerItem} className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
                Smart Lithium Energy
                <br />
                for Home, Commercial
                <br />
                and Industrial Use 🔋
              </motion.h1>
              <motion.p variants={staggerItem} className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                UBETTER develops advanced LiFePO4 battery systems from <strong>2.5kWh</strong> home storage to <strong>1-2MWh</strong> containerized projects, helping businesses reduce peak energy costs and improve backup reliability.
              </motion.p>
              <motion.p variants={staggerItem} className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
                Customized solutions, professional engineering support, and global delivery services built for long-term energy independence. 🌍
              </motion.p>
              <motion.div variants={staggerItem} className="mt-8 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
                <Link href="#products" className="animated-gradient rounded-full px-7 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-90 sm:text-base">
                  🚀 Explore Products
                </Link>
                <Link href="#contact" className="rounded-full border border-slate-600 bg-slate-900/50 px-7 py-3 text-center text-sm font-bold text-slate-100 transition hover:border-cyan-300/50 hover:text-cyan-200 sm:text-base">
                  📩 Request Consultation
                </Link>
              </motion.div>
              <motion.div variants={staggerItem} className="mt-9 grid max-w-xl grid-cols-3 gap-3 text-center">
                {[
                  { label: "Factory Area", value: "10848m²", icon: "🏭" },
                  { label: "Equipment Assets", value: "60M Yuan", icon: "💰" },
                  { label: "Engineering Team", value: "30+ Experts", icon: "👷" }
                ].map((item) => (
                  <motion.div key={item.label} whileHover={{ y: -4 }} className="rounded-2xl border border-white/10 bg-slate-900/60 px-3 py-4">
                    <p className="text-lg font-black text-cyan-200 sm:text-xl">{item.icon} {item.value}</p>
                    <p className="mt-1 text-xs text-slate-400 sm:text-sm">{item.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="float-soft"
              initial={{ opacity: 0, y: 24, rotateX: 6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.01 }} className="rounded-[2rem] border border-cyan-300/30 bg-slate-950/55 p-6 shadow-[0_0_50px_rgba(14,165,233,0.16)] backdrop-blur-md sm:p-7">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200 sm:text-sm">🔌 Integrated Solar + Storage + Backup</p>
                <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl">Built for Business Continuity</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                  Designed for factories, office buildings, logistics hubs, farms, and critical facilities that need stable power during outages and peak demand.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {["✅ ISO 9001/14001", "🧠 Custom BMS", "🌐 Global Supply", "🧪 Strict QC"].map((item) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35 }}
                      className="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-center text-xs font-semibold text-slate-200 sm:text-sm"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
            className="mt-8 overflow-hidden rounded-2xl border border-cyan-300/30 shadow-[0_10px_35px_rgba(14,165,233,0.18)] sm:mt-10"
          >
            <div className="relative h-56 w-full sm:h-72 lg:h-[78vh]">
              <Image src={heroImage} alt="UBETTER energy storage product lineup" fill sizes="100vw" className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-950/10 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section
        id="products"
        className="section-padding"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-white sm:text-3xl md:text-4xl">Our Product Portfolio 🧰</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
            Product families from the official UBETTER lineup include wall-mounted, vertical, rack-mounted, stackable all-in-one systems, plus commercial and industrial ESS from 60kWh to 261kWh and beyond.
          </p>
          <motion.div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" variants={staggerParent}>
            {products.map((item) => (
              <motion.article
                key={item.title}
                variants={staggerItem}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 170, damping: 18 }}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-sm hover:border-cyan-300/35 hover:shadow-[0_20px_45px_rgba(2,132,199,0.18)]"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image src={filePath(item.image)} alt={item.title} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 to-transparent opacity-85" />
                </div>
                <div className="p-4 sm:p-5">
                  <p className="mb-3 inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-200">{item.badge}</p>
                  <p className="text-sm font-bold leading-7 text-slate-100">{item.title}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="about"
        className="section-padding"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={sectionVariants}
        transition={{ duration: 0.7 }}
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-xl" whileHover={{ scale: 1.01 }}>
            <Image src={aboutImage} alt="UBETTER manufacturing capability" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 to-transparent" />
          </motion.div>
          <motion.div variants={staggerParent}>
            <motion.h2 variants={staggerItem} className="text-2xl font-black text-white sm:text-3xl md:text-4xl">About UBETTER 🧠</motion.h2>
            <motion.p variants={staggerItem} className="mt-4 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              Ubetter Technology Co., Ltd. is a national high-tech enterprise focused on advanced customized R&D, professional manufacturing, and a strong supply chain. The company serves industries including photovoltaic storage, telecommunications, medical electronics, transportation, logistics, and public infrastructure.
            </motion.p>
            <motion.p variants={staggerItem} className="mt-3 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              With ISO 9001 and ISO 14001 management systems, UBETTER emphasizes safety, long cycle life, and sustainability through LiFePO4 battery chemistry. 🌱
            </motion.p>
            <motion.div variants={staggerParent} className="mt-6 grid gap-3 sm:grid-cols-2">
              {["💼 Registered Capital: 10M Yuan", "🏗️ Equipment Assets: 60M Yuan", "🏭 Factory Building: 10848m²", "👨‍🔬 Team: Professors + 30+ Engineers"].map((kpi) => (
                <motion.div key={kpi} variants={staggerItem} className="rounded-xl border border-blue-300/20 bg-blue-500/10 px-4 py-3 text-xs font-semibold text-blue-100 sm:text-sm">
                  {kpi}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="projects"
        className="section-padding"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <motion.article whileHover={{ y: -6 }} className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 shadow-sm lg:col-span-2">
            <div className="relative h-72">
              <Image src={filePath("maxresdefault.jpg")} alt="UBETTER project installations" fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            </div>
            <div className="p-6">
              <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-200">🎬 CASE VIDEOS</p>
              <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">Indonesia, Jiangxi, Resort and Factory Deployments</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                Real installation showcases from the main site demonstrate integrated photovoltaic + storage projects for business and industrial environments.
              </p>
            </div>
          </motion.article>
          <motion.article whileHover={{ y: -6 }} className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 shadow-sm">
            <div className="relative h-72">
              <Image src={expoImage} alt="UBETTER at Canton Fair" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
            </div>
            <div className="p-6">
              <p className="text-lg font-bold text-white sm:text-xl">🏆 UBETTER at the 138th Canton Fair</p>
              <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                Global exhibition presence supports international partnerships and strengthens trust for OEM/ODM battery manufacturing.
              </p>
            </div>
          </motion.article>
        </div>
      </motion.section>

      <motion.section
        className="section-padding"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-black text-white sm:text-3xl md:text-4xl">Visual Gallery & Production Highlights 📸</h2>
            <p className="text-sm text-slate-400 sm:text-base">Scroll-Animated Showcase</p>
          </div>

          <div className="mt-8 overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-slate-900/55 p-3 shadow-[0_20px_60px_rgba(2,132,199,0.16)] sm:p-4">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10">
              <div className="relative h-[340px] w-full sm:h-[460px] lg:h-[560px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={galleryFiles[activeGalleryIndex]}
                    initial={{ opacity: 0, scale: 1.06, rotate: 0.2 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image src={filePath(galleryFiles[activeGalleryIndex])} alt={`UBETTER gallery slide ${activeGalleryIndex + 1}`} fill sizes="100vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-slate-950/10" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <div className="max-w-lg">
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">🚢 Export Ready / Factory Direct</p>
                    <p className="mt-2 text-sm font-semibold text-slate-200 sm:text-base">
                      Slide {activeGalleryIndex + 1} of {galleryFiles.length}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      type="button"
                      onClick={prevGallerySlide}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-slate-950/65 text-xl text-white transition hover:border-cyan-300/60 hover:text-cyan-200"
                      aria-label="Previous gallery slide"
                    >
                      ‹
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={nextGallerySlide}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-slate-950/65 text-xl text-white transition hover:border-cyan-300/60 hover:text-cyan-200"
                      aria-label="Next gallery slide"
                    >
                      ›
                    </motion.button>
                  </div>
                </div>
              </div>
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
      </motion.section>

      <motion.section
        className="section-padding border-y border-white/10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div variants={staggerParent}>
            <motion.h3 variants={staggerItem} className="text-2xl font-black text-white sm:text-3xl">Commercial & Industrial Applications 🏢</motion.h3>
            <motion.div variants={staggerParent} className="mt-5 grid gap-3">
              {applicationItems.map((item) => (
                <motion.p key={item} variants={staggerItem} className="rounded-xl border border-white/10 bg-slate-900/45 px-4 py-3 text-sm text-slate-200">
                  {item}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
          <motion.div variants={staggerParent}>
            <motion.h3 variants={staggerItem} className="text-2xl font-black text-white sm:text-3xl">Our Service Promise 🤝</motion.h3>
            <motion.div variants={staggerParent} className="mt-5 grid gap-3">
              {serviceItems.map((item) => (
                <motion.p key={item} variants={staggerItem} className="rounded-xl border border-cyan-300/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">
                  {item}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="contact"
        className="section-padding"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div variants={staggerParent}>
            <motion.h2 variants={staggerItem} className="text-2xl font-black text-white sm:text-3xl md:text-4xl">Get Free Quote 📬</motion.h2>
            <motion.p variants={staggerItem} className="mt-4 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
              Looking for residential, commercial, or industrial energy storage? Send your project details and our team will share a tailored battery solution and quotation.
            </motion.p>
            <motion.div variants={staggerParent} className="mt-6 space-y-2 text-slate-300">
              <motion.p variants={staggerItem}>📧 E-mail: ubetterbattery@gmail.com</motion.p>
              <motion.p variants={staggerItem}>📱 Mobile: +86 181 2378 3632</motion.p>
              <motion.p variants={staggerItem}>☎️ Telephone: +0086-755-85235266</motion.p>
              <motion.p variants={staggerItem}>📍 Shenzhen, Guangdong, China</motion.p>
            </motion.div>
          </motion.div>
          <motion.form initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="glass rounded-3xl border border-white/20 p-4 text-slate-100 sm:p-6">
            <div className="grid gap-4">
              <input className="rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400/50" placeholder="Your Name" />
              <input className="rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400/50" placeholder="Your Email" />
              <input className="rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400/50" placeholder="Phone Number" />
              <input className="rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400/50" placeholder="Company Name" />
              <textarea rows={4} className="rounded-xl border border-white/15 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400/50" placeholder="Tell us your required capacity, application, and timeline..." />
              <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="animated-gradient rounded-xl px-5 py-3 font-bold text-white">
                ✉️ Send Inquiry
              </motion.button>
            </div>
          </motion.form>
        </div>
      </motion.section>
    </main>
  );
}
