"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
  return (
    <main className="text-slate-900">
      <header className="sticky top-0 z-50 border-b border-white/40 glass">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-3 py-2 sm:px-6 sm:py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700 text-xs font-bold text-white sm:h-10 sm:w-10 sm:text-sm">U</span>
            <div className="leading-tight">
              <p className="text-sm font-bold sm:text-base">UBETTER ENERGY</p>
              <p className="hidden text-xs text-slate-600 sm:block">تولیدکننده باتری LiFePO4 و سیستم ذخیره‌سازی خورشیدی</p>
            </div>
          </div>
          <nav className="hidden gap-6 text-sm font-semibold lg:flex">
            <a href="#products" className="hover:text-blue-700">محصولات</a>
            <a href="#about" className="hover:text-blue-700">درباره ما</a>
            <a href="#cases" className="hover:text-blue-700">مشتریان</a>
            <a href="#contact" className="hover:text-blue-700">تماس</a>
          </nav>
          <Link href="#contact" className="rounded-full bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 sm:px-5 sm:text-sm">
            دریافت پیش‌فاکتور
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden section-padding">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:gap-10 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.7 }}>
            <p className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 sm:px-4 sm:text-sm">
              Reliable Lithium Iron Phosphate Battery Manufacturer
            </p>
            <motion.h1
              className="text-3xl font-black leading-tight sm:text-4xl md:text-6xl"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              راهکارهای ذخیره‌سازی انرژی
              <span className=" text-blue-700">UBETTER </span>  <span className=" text-red-700"> ENERGY</span>
              برای خانه، کسب‌وکار و صنعت
            </motion.h1>
            <motion.p
              className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              با باتری‌های LiFePO4 ایمن و بادوام، هزینه برق را کاهش دهید، پایداری انرژی را افزایش دهید و در زمان قطعی
              برق همیشه آماده باشید. از 60kWh تا 2MWh، یوبتر برای هر مقیاس پروژه پاسخ حرفه‌ای دارد.
            </motion.p>
            <motion.p
              className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:mt-3 sm:text-base sm:leading-7"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              طراحی سفارشی، تحویل سریع، پشتیبانی فنی و خدمات پس از فروش کامل برای اجرای موفق پروژه‌های انرژی.
            </motion.p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:flex sm:flex-wrap">
              <Link href="#products" className="rounded-full bg-blue-700 px-6 py-3 text-center text-sm font-bold text-white hover:bg-blue-800 sm:text-base">مشاهده محصولات</Link>
              <Link href="#contact" className="rounded-full bg-red-600 px-6 py-3 text-center text-sm font-bold text-white hover:bg-red-700 sm:text-base">شروع همکاری</Link>
            </div>
          </motion.div>
          <motion.div className="float-soft" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-2xl sm:rounded-[2rem]">
              <div className="relative h-[260px] w-full sm:h-[360px]">
                <Image src={heroImage} alt="راهکارهای ذخیره‌سازی صنعتی و خانگی" fill className="object-cover" priority sizes="(max-width: 640px) 100vw, 50vw" />
              </div>
              <div className="animated-gradient absolute bottom-0 left-0 right-0 p-4 text-white sm:p-5">
                <p className="text-xs sm:text-sm">60kWh تا 2MWh راهکار صنعتی</p>
                <p className="text-base font-bold sm:text-xl">Solar + Storage + Backup Power</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="products" className="section-padding bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black sm:text-3xl md:text-4xl">محصولات (تصویری و واقعی)</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">تمام کارت‌ها بر اساس لیست واقعی سایت مرجع و با عکس‌های آرشیو شما ساخته شده‌اند.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productItems.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image src={filePath(item.image)} alt={item.title} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-4 sm:p-5">
                  <p className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">محصول</p>
                  <p className="line-clamp-3 text-sm font-bold leading-7">{item.title}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section-padding">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl shadow-xl">
            <Image src={aboutImage} alt="توانمندی تولیدی یوبتر" className="h-full w-full object-cover" />
          </div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.7 }}>
            <h2 className="text-2xl font-black sm:text-3xl md:text-4xl">درباره UBETTER</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Ubetter Technology Co., Ltd. یک شرکت ملی های‌تک با R&D سفارشی، تولید حرفه‌ای و زنجیره تامین قوی است.
              این مجموعه با استانداردهای ISO 9001 و ISO 14001 و تیم فنی تخصصی، راهکارهای باتری را برای صنایع مختلف
              از انرژی خورشیدی تا مخابرات، پزشکی و لجستیک ارائه می‌دهد.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["10M Yuan سرمایه ثبت‌شده", "60M Yuan تجهیزات تولید", "10848m2 فضای کارخانه", "30+ مهندس متخصص"].map((kpi) => (
                <div key={kpi} className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs font-semibold text-blue-900 sm:text-sm">{kpi}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
            <div className="relative h-72">
              <Image src={filePath("maxresdefault.jpg")} alt="ویدیو پروژه‌های یوبتر" fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover" />
            </div>
            <div className="p-6">
              <p className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">OUR VIDEOS</p>
              <h3 className="mt-3 text-xl font-bold sm:text-2xl">Indonesian / Jiangxi / Factory Case Study</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">ویدیوها حالا در یک بلوک برجسته نمایش داده می‌شوند تا اعتبار پروژه‌ها سریع‌تر منتقل شود.</p>
            </div>
          </article>
          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="relative h-72">
              <Image src={expoImage} alt="نمایشگاه کانتون" className="h-full w-full object-cover" />
            </div>
            <div className="p-6">
              <p className="text-lg font-bold sm:text-xl">UBETTER در Canton Fair</p>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">حضور نمایشگاهی برای توسعه بازار بین‌المللی و شبکه نمایندگان.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black sm:text-3xl md:text-4xl">گالری تصویری پروژه‌ها و خطوط تولید</h2>
          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {galleryFiles.map((file, i) => (
              <motion.figure key={file} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.02 }} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                <div className="relative h-52 w-full sm:h-64">
                  <Image src={filePath(file)} alt={`تصویر ${file}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 hover:scale-[1.03]" />
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-padding bg-slate-950 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-black sm:text-3xl md:text-4xl">GET FREE QUOTE</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">اگر پروژه صنعتی، تجاری یا خانگی دارید، همین حالا پیام بدهید تا طرح فنی و قیمت اختصاصی ارائه کنیم.</p>
            <div className="mt-6 space-y-2 text-slate-300">
              <p>E-mail: ubetterbattery@gmail.com</p>
              <p>Mobile phone: +86 181 2378 3632</p>
              <p>Telephone: +0086-755-85235266</p>
              <p>Shenzhen, Guangdong, China</p>
            </div>
          </div>
          <form className="glass rounded-3xl border border-white/20 p-4 text-slate-900 sm:p-6">
            <div className="grid gap-4">
              <input className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600" placeholder="نام" />
              <input className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600" placeholder="ایمیل" />
              <input className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600" placeholder="شماره تماس" />
              <input className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600" placeholder="نام شرکت" />
              <textarea rows={4} className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600" placeholder="پیام شما" />
              <button type="button" className="animated-gradient rounded-xl px-5 py-3 font-bold text-white">ارسال</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
