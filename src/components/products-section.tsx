"use client";

import type { Locale } from "@/i18n/config";
import { ui3 } from "@/i18n/locale-ui";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { PRODUCT_IMAGES, DETAIL_IMAGES, LIFEPO4_BG } from "@/assets/productImages";

// ─── Constants ────────────────────────────────────────────────────────────────

const easeOut = [0.22, 1, 0.36, 1] as const;
const ACCENT = "#7CFF00";
const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface T {
  fa: string;
  en: string;
  zh?: string;
}
export function tx(text: T, locale: Locale): string {
  if (locale === "fa") return text.fa;
  if (locale === "zh") return text.zh ?? text.en;
  return text.en;
}

export interface Product {
  name: T;
  category: T;
  description: T;
  features: T[];
  applications: T[];
}
export interface ProductCategory {
  id: string;
  pill: T;
  title: T;
  description: T;
  featuredCount: number;
  products: Product[];
}

// ─── Bilingual Product Data ────────────────────────────────────────────────────

export const CATEGORIES: ProductCategory[] = [
  // ── 1. Residential & Villa ────────────────────────────────────────────────
  {
    id: "residential",
    pill: { fa: "دسته ۱", en: "Category 1" },
    title: { fa: "خانگی و ویلایی", en: "Residential & Villa" },
    description: {
      fa: "سیستم‌های ذخیره انرژی هوشمند برای منازل، آپارتمان‌ها و ویلاها. طراحی شده برای برق پشتیبان، ادغام با انرژی خورشیدی و تأمین برق بدون وقفه در فضاهای مسکونی.",
      en: "Smart energy storage systems for homes, apartments, and villas. Designed for backup power, solar integration, and uninterrupted electricity supply in residential spaces.",
    },
    featuredCount: 1,
    products: [
      {
        name: { fa: "باتری ذخیره انرژی مدل ایستاده و دیواری", en: "Wall-Mounted & Floor-Standing ESS Battery" },
        category: { fa: "باتری ذخیره انرژی خانگی و دفتری", en: "Residential ESS Battery" },
        description: {
          fa: "باتری‌های ذخیره انرژی ایستاده و دیواری، به عنوان مدیران هوشمند و کارآمد انرژی در فضاهای مختلف طراحی شده‌اند. این محصولات راهکارهایی پیشرفته و بهینه برای مدیریت انرژی و استفاده حداکثری از فضای نصب ارائه می‌دهند و با دو روش نصب دیواری و ایستاده، انعطاف‌پذیری بالایی در اجرا فراهم می‌کنند.",
          en: "Wall-mounted and floor-standing energy storage batteries are designed as smart and efficient energy managers for various spaces. These products provide advanced and optimized solutions for energy management and maximum use of installation space, offering high flexibility in execution with both wall-mounted and floor-standing installation methods.",
        },
        features: [
          { fa: "وزن سبک و ابعاد جمع‌وجور", en: "Lightweight and compact dimensions" },
          { fa: "طول عمر بسیار بالا", en: "Very long lifespan" },
          { fa: "مجهز به سیستم هوشمند مدیریت باتری (BMS)", en: "Smart BMS battery management system" },
          { fa: "ایمنی فوق‌العاده بالا؛ مقاوم در برابر آتش‌سوزی، انفجار و نشتی", en: "Extremely high safety — resistant to fire, explosion, and leakage" },
          { fa: "سازگار با انواع اینورترها", en: "Compatible with multiple inverter brands" },
          { fa: "پشتیبانی از RS485، RS232 و CAN", en: "RS232 / RS485 / CAN communication" },
        ],
        applications: [
          { fa: "برق پشتیبان منازل و آپارتمان‌ها", en: "Home & apartment backup power" },
          { fa: "سیستم‌های خورشیدی", en: "Solar energy systems" },
          { fa: "برق پشتیبان دفاتر", en: "Office backup systems" },
          { fa: "ویلاها و مزارع", en: "Villas and farms" },
        ],
      },
      {
        name: { fa: "باتری ذخیره انرژی مدل چرخدار", en: "Wheeled Energy Storage Battery" },
        category: { fa: "باتری ذخیره انرژی خانگی و دفتری", en: "Portable Residential ESS" },
        description: {
          fa: "باتری‌های ذخیره‌سازی انرژی نوع چرخدار، نسل جدیدی از راهکارهای ذخیره انرژی هستند که با قابلیت جابه‌جایی آسان طراحی شده‌اند. مهم‌ترین ویژگی این محصول، تجهیز به چرخ‌های متحرک (کاستر) در بخش زیرین دستگاه است که علاوه بر ظرفیت بالای ذخیره‌سازی انرژی، امکان حمل و جابه‌جایی سریع و آسان را فراهم می‌سازد.",
          en: "Wheeled energy storage batteries are a new generation of energy storage solutions designed for easy mobility. The most important feature is the mobile caster wheels at the base, which, in addition to high energy storage capacity, enables quick and easy transport.",
        },
        features: [
          { fa: "ساختار چرخدار قابل حمل", en: "Portable wheeled structure" },
          { fa: "سیستم هوشمند مدیریت باتری (BMS)", en: "Smart BMS system" },
          { fa: "استانداردهای ایمنی بالا", en: "High safety standards" },
          { fa: "جمع‌وجور و سبک", en: "Compact and lightweight" },
          { fa: "طول عمر عملیاتی بالا", en: "Long operational life" },
          { fa: "سازگاری با انواع اینورترها", en: "Multi-inverter compatibility" },
          { fa: "پشتیبانی از RS485، RS232 و CAN", en: "RS232 / RS485 / CAN communication" },
        ],
        applications: [
          { fa: "برق پشتیبان سیار", en: "Mobile backup power" },
          { fa: "ذخیره انرژی مسکونی", en: "Residential backup" },
          { fa: "تأمین برق موقت", en: "Temporary energy supply" },
          { fa: "سیستم‌های انرژی دفاتر", en: "Office energy systems" },
        ],
      },
      {
        name: { fa: "باتری ذخیره انرژی با نمایشگر لمسی عمودی", en: "Vertical ESS Battery with Touchscreen" },
        category: { fa: "باتری ذخیره انرژی خانگی و دفتری", en: "Smart Residential Energy Storage" },
        description: {
          fa: "باتری‌های ذخیره انرژی عمودی با نمایشگر لمسی، راهکاری پیشرفته در حوزه ذخیره انرژی هستند که علاوه بر طراحی مدرن و رابط کاربری هوشمند، از قابلیت جابه‌جایی آسان نیز برخوردارند. این محصول با بهره‌گیری از چرخ‌های متحرک (کاستر) در بخش زیرین، امکان حمل و انتقال آسان را فراهم کرده است.",
          en: "Vertical energy storage batteries with touchscreen are advanced energy storage solutions that, in addition to modern design and smart user interface, also offer easy mobility with mobile caster wheels at the base.",
        },
        features: [
          { fa: "نمایشگر لمسی تعاملی", en: "Interactive touchscreen display" },
          { fa: "سیستم هوشمند مدیریت BMS", en: "Smart BMS management" },
          { fa: "طراحی عمودی مدرن", en: "Modern vertical design" },
          { fa: "طول عمر بالا", en: "Long lifecycle" },
          { fa: "ساختار چرخدار قابل حمل", en: "Portable wheeled structure" },
          { fa: "پشتیبانی از RS485، RS232 و CAN", en: "RS232 / RS485 / CAN communication" },
        ],
        applications: [
          { fa: "خانه‌های هوشمند", en: "Smart homes" },
          { fa: "سیستم‌های خورشیدی مسکونی", en: "Residential solar systems" },
          { fa: "سیستم‌های پایش انرژی", en: "Energy monitoring systems" },
          { fa: "سیستم‌های برق پشتیبان", en: "Backup electricity systems" },
        ],
      },
      {
        name: { fa: "سیستم یکپارچه ذخیره انرژی ایستاده (All-in-One)", en: "All-in-One Integrated ESS Cabinet" },
        category: { fa: "باتری ذخیره انرژی خانگی و دفتری", en: "Integrated Residential ESS" },
        description: {
          fa: "سیستم یکپارچه ذخیره‌سازی انرژی، یک راهکار جامع و پیشرفته در مدیریت انرژی است که باتری‌های ذخیره‌سازی انرژی، اینورتر و سیستم کنترل هوشمند را در قالب یک باکس تجمیع کرده است. این طراحی یکپارچه، پیچیدگی‌های سیستم‌های سنتی و نصب تجهیزات پراکنده را به حداقل رسانده و تجربه‌ای کامل از مدیریت انرژی پاک را در قالب یک راهکار All-in-One در اختیار کاربران قرار می‌دهد.",
          en: "The integrated energy storage system is a comprehensive and advanced solution that consolidates energy storage batteries, inverter, and intelligent control into a single unit. This integrated design minimizes the complexities of traditional systems and provides users with a complete clean energy management experience in an All-in-One solution.",
        },
        features: [
          { fa: "سیستم هوشمند مدیریت باتری (BMS)", en: "Intelligent BMS system" },
          { fa: "سیستم هشداردهی کاربرپسند", en: "User-friendly warning system" },
          { fa: "مکانیزم‌های کامل حفاظت آنلاین", en: "Complete online protection mechanisms" },
          { fa: "طراحی یکپارچه با نصب سریع و آسان", en: "Integrated design with fast installation" },
          { fa: "نمایشگر تعاملی راجب انسان و ماشین کاربرپسند", en: "User-friendly interactive HMI display" },
          { fa: "ایمنی فوق‌العاده بالا", en: "Extremely high safety" },
        ],
        applications: [
          { fa: "سیستم‌های مسکونی هوشمند", en: "Smart residential systems" },
          { fa: "ادغام خورشیدی خانگی", en: "Home solar integration" },
          { fa: "سیستم‌های برق پشتیبان", en: "Backup power systems" },
          { fa: "بهینه‌سازی انرژی", en: "Energy optimization" },
        ],
      },
      {
        name: { fa: "سیستم یکپارچه ذخیره انرژی ماژولار (Stacked)", en: "Stacked Modular All-in-One ESS" },
        category: { fa: "ذخیره انرژی ماژولار مسکونی", en: "Modular Residential ESS" },
        description: {
          fa: "سیستم یکپارچه ذخیره انرژی ماژولار (Stacked All-in-One)، یک راهکار پیشرفته و ماژولار در حوزه مدیریت انرژی است که اجزای کلیدی شامل اینورتر (PV)، ماژول شارژ DC، مبدل ذخیره‌سازی انرژی (PCS)، باتری ذخیره انرژی و سیستم مدیریت انرژی (EMS) را در یک مجموعه یکپارچه گرد هم آورده است.",
          en: "The Stacked All-in-One modular energy storage system is an advanced energy management solution that brings together key components including PV inverter, DC charging module, Power Conversion System (PCS), energy storage battery, and Energy Management System (EMS) in one integrated package.",
        },
        features: [
          { fa: "طراحی ماژولار با تعداد دلخواه و کاربری آسان", en: "Modular expandable design with easy scalability" },
          { fa: "نمایشگر LED برای نمایش لحظه‌ای پارامترها و وضعیت عملکرد", en: "LED monitoring display" },
          { fa: "ایمنی فوق‌العاده بالا", en: "Extremely high safety" },
          { fa: "پشتیبانی از RS485، RS232 و CAN", en: "RS232 / RS485 / CAN communication" },
          { fa: "ساختار ماژولار با نصب آسان و سریع", en: "Modular structure with fast installation" },
          { fa: "طول عمر بسیار بالا", en: "Very long lifecycle" },
          { fa: "مجهز به سیستم هوشمند مدیریت باتری (BMS)", en: "Smart BMS system" },
        ],
        applications: [
          { fa: "سیستم‌های انرژی مسکونی", en: "Residential energy systems" },
          { fa: "برق پشتیبان تجاری", en: "Commercial backup power" },
          { fa: "ادغام با انرژی خورشیدی", en: "Solar integration" },
          { fa: "مدیریت هوشمند انرژی", en: "Smart energy management" },
        ],
      },
    ],
  },

  // ── 2. Commercial & Office ────────────────────────────────────────────────
  {
    id: "commercial",
    pill: { fa: "دسته ۲", en: "Category 2" },
    title: { fa: "تجاری و اداری", en: "Commercial & Office" },
    description: {
      fa: "سیستم‌های ذخیره انرژی مقیاس‌پذیر برای ساختمان‌های تجاری، دفاتر، مراکز خرید و کسب‌وکارهای متوسط. با قابلیت ادغام با شبکه و انرژی‌های تجدیدپذیر.",
      en: "Scalable energy storage for commercial buildings, offices, shopping centers, and medium-scale businesses. With grid integration and renewable energy compatibility.",
    },
    featuredCount: 1,
    products: [
      {
        name: { fa: "سیستم ذخیره انرژی ولتاژ بالا ماژولار (Stacked)", en: "High-Voltage Modular All-in-One ESS" },
        category: { fa: "ذخیره انرژی ولتاژ بالا", en: "High-Voltage Energy Storage" },
        description: {
          fa: "سیستم یکپارچه ذخیره انرژی ولتاژ بالا ماژولار، یک راهکار پیشرفته و کاملاً یکپارچه است که چندین ماژول عملکردی کلیدی را در یک ساختار منسجم ترکیب می‌کند. این سیستم شامل اینورتر (PV)، باتری ذخیره انرژی، مبدل ذخیره‌سازی انرژی (PCS) و سیستم مدیریت انرژی (EMS) می‌باشد. این طراحی یکپارچه، فرآیند نصب و نگهداری تجهیزات را ساده‌تر کرده و در عین حال، انعطاف‌پذیری و قابلیت توسعه‌پذیری سیستم را به شکل قابل توجهی افزایش می‌دهد.",
          en: "The High-Voltage Modular All-in-One ESS is an advanced and fully integrated solution combining PV inverter, energy storage battery, Power Conversion System (PCS), and Energy Management System (EMS) in one cohesive structure. This integrated design simplifies installation and maintenance while significantly increasing system flexibility and expandability.",
        },
        features: [
          { fa: "معماری ولتاژ بالا", en: "High-voltage architecture" },
          { fa: "سیستم ماژولار قابل توسعه", en: "Expandable modular system" },
          { fa: "مدیریت هوشمند انرژی", en: "Smart energy management" },
          { fa: "نمایشگر LED", en: "LED monitoring system" },
          { fa: "طول عمر عملیاتی بالا", en: "Long operational lifespan" },
          { fa: "مجهز به سیستم هوشمند BMS", en: "Smart BMS system" },
        ],
        applications: [
          { fa: "سیستم‌های انرژی مسکونی", en: "Residential energy systems" },
          { fa: "تأسیسات تجاری", en: "Commercial facilities" },
          { fa: "برق پشتیبان صنعتی", en: "Industrial backup power" },
          { fa: "ادغام با انرژی تجدیدپذیر", en: "Renewable energy integration" },
        ],
      },
      {
        name: { fa: "باتری ذخیره انرژی قفسه‌ای (Rack-mounted)", en: "Rack-Mounted ESS Battery" },
        category: { fa: "سیستم ذخیره انرژی قفسه‌ای", en: "Rack Energy Storage System" },
        description: {
          fa: "باتری‌های ذخیره انرژی قفسه‌ای، با طراحی ماژولار، چگالی انرژی بالا، ظاهر مدرن و امکان نصب و توسعه آسان، راهکاری کارآمد و انعطاف‌پذیر برای ذخیره انرژی محسوب می‌شوند. این محصولات به طور گسترده در کاربردهای مختلف از جمله ایستگاه‌های مخابراتی، سیستم‌های ذخیره انرژی تجاری برای کسب‌وکارهای کوچک، سیستم‌های UPS و سیستم‌های ذخیره انرژی خورشیدی خانگی مورد استفاده قرار می‌گیرند.",
          en: "Rack-mounted energy storage batteries, with their modular design, high energy density, modern appearance, and easy installation capability, represent an efficient and flexible energy storage solution. These products are widely used in telecom stations, commercial energy storage for small businesses, UPS systems, and home solar storage.",
        },
        features: [
          { fa: "طراحی ماژولار با تعداد دلخواه و کاربری آسان", en: "Modular rack-mounted architecture" },
          { fa: "وزن سبک و ابعاد جمع‌وجور", en: "Lightweight and compact" },
          { fa: "ایمنی فوق‌العاده بالا", en: "Extremely high safety" },
          { fa: "سازگار با انواع اینورترها", en: "Multi-inverter compatibility" },
          { fa: "طول عمر بسیار بالا", en: "Very long lifecycle" },
          { fa: "مجهز به BMS هوشمند", en: "Smart BMS management" },
          { fa: "پشتیبانی از RS485، RS232 و CAN", en: "RS232 / RS485 / CAN communication" },
        ],
        applications: [
          { fa: "ایستگاه‌های مخابراتی", en: "Telecom stations" },
          { fa: "سیستم‌های UPS", en: "UPS systems" },
          { fa: "ذخیره‌سازی خورشیدی", en: "Solar storage" },
          { fa: "سیستم‌های پشتیبان تجاری", en: "Commercial backup systems" },
        ],
      },
      {
        name: { fa: "سیستم ذخیره انرژی ولتاژ بالا ماژولار 1C (از ۲۰ تا ۸۷ کیلووات ساعت)", en: "C1 High-Voltage Modular ESS (20–87 kWh)" },
        category: { fa: "سیستم ذخیره انرژی ولتاژ بالا تجاری", en: "Commercial High-Voltage ESS" },
        description: {
          fa: "هر واحد از این محصول شامل یک ماژول باتری و یک ماژول ولتاژ بالا می‌باشد که بر پایه مفهوم طراحی «ایمن و قابل اعتماد» توسعه یافته است. این رویکرد امکان ارائه محصولاتی ایمن، قابل اعتماد، مقرون‌به‌صرفه، باکیفیت، آسان در نصب و توسعه‌پذیر را برای مشتریان فراهم می‌کند. این سیستم ذخیره انرژی، فرآیند اجرای پروژه‌های ذخیره انرژی را ساده‌تر، بهره‌برداری را آسان‌تر و عملیات نگهداری و پشتیبانی را کارآمدتر و سریع‌تر می‌سازد.",
          en: "Each unit includes a battery module and a high-voltage module, developed on the basis of a 'safe and reliable' design concept. This approach enables safe, reliable, cost-effective, high-quality, easy-to-install, and expandable products. This system simplifies energy storage project implementation, operation, and maintenance.",
        },
        features: [
          { fa: "ماژول‌های باتری ولتاژ بالا", en: "High-voltage battery modules" },
          { fa: "معماری قابل توسعه", en: "Expandable architecture" },
          { fa: "سیستم هوشمند مدیریت باتری (BMS)", en: "Smart BMS system" },
          { fa: "نصب آسان و سریع", en: "Easy and fast installation" },
          { fa: "مهندسی ایمنی پیشرفته", en: "Advanced safety engineering" },
          { fa: "سازگار با انواع اینورترها", en: "Multi-inverter compatibility" },
          { fa: "طول عمر بالا", en: "Long lifecycle" },
          { fa: "مقیاس‌پذیری ماژولار", en: "Modular scalability" },
        ],
        applications: [
          { fa: "پروژه‌های انرژی تجاری", en: "Commercial energy projects" },
          { fa: "تأسیسات صنعتی", en: "Industrial facilities" },
          { fa: "ذخیره‌سازی انرژی خورشیدی", en: "Solar energy storage" },
          { fa: "سیستم‌های شبکه هوشمند", en: "Smart grid systems" },
        ],
      },
      {
        name: { fa: "سیستم ذخیره انرژی ولتاژ بالا ماژولار 0.5C (از ۶۴ تا ۲۷۲ کیلووات ساعت)", en: "C0.5 High-Voltage Modular ESS (64–272 kWh)" },
        category: { fa: "سیستم ذخیره انرژی با ظرفیت بالا صنعتی", en: "Industrial High-Capacity ESS" },
        description: {
          fa: "هر واحد از این محصول شامل یک ماژول باتری و یک ماژول ولتاژ بالا بوده و بر پایه مفهوم طراحی «ایمن و قابل اعتماد» توسعه یافته است که این رویکرد امکان ارائه محصولاتی با ایمنی بالا، قابلیت اطمینان ممتاز، کیفیت برتر، مقرون‌به‌صرفه بودن، نصب آسان و قابلیت توسعه‌پذیری بالا را برای مشتریان فراهم می‌سازد. این سیستم با ساده‌سازی فرآیند اجرای پروژه‌های ذخیره انرژی، بهره‌برداری آسان‌تر و عملیات نگهداری و پشتیبانی کارآمدتر، راهکاری حرفه‌ای و مطمئن برای مدیریت انرژی در مقیاس‌های مختلف ارائه می‌دهد.",
          en: "Each unit includes a battery module and a high-voltage module, developed on the basis of a 'safe and reliable' design concept, enabling high safety, outstanding reliability, superior quality, cost-effectiveness, easy installation, and high expandability. This system simplifies project implementation, operation, and maintenance for professional energy management at various scales.",
        },
        features: [
          { fa: "سیستم ماژولار با ظرفیت بالا", en: "High-capacity modular system" },
          { fa: "طراحی ایمنی صنعتی", en: "Industrial safety design" },
          { fa: "طول عمر عملیاتی بالا", en: "Long operational lifespan" },
          { fa: "توسعه‌پذیری آسان", en: "Easy scalability" },
          { fa: "مدیریت هوشمند BMS", en: "Smart BMS management" },
          { fa: "نصب سریع", en: "Fast installation" },
          { fa: "حفاظت چندلایه", en: "Multi-layer protection" },
          { fa: "بهره‌وری بالا", en: "High efficiency" },
        ],
        applications: [
          { fa: "تأسیسات صنعتی", en: "Industrial facilities" },
          { fa: "نیروگاه‌های انرژی تجدیدپذیر", en: "Renewable energy plants" },
          { fa: "سیستم‌های پشتیبان در مقیاس بزرگ", en: "Large-scale backup systems" },
          { fa: "زیرساخت‌های تجاری", en: "Commercial infrastructure" },
        ],
      },
    ],
  },

  // ── 3. Industrial ─────────────────────────────────────────────────────────
  {
    id: "industrial",
    pill: { fa: "دسته ۳", en: "Category 3" },
    title: { fa: "صنعتی", en: "Industrial" },
    description: {
      fa: "سیستم‌های ذخیره انرژی با ظرفیت بالا برای کارخانه‌ها، شهرک‌های صنعتی و تأسیسات سنگین. مجهز به سیستم‌های حفاظتی پیشرفته و مدیریت حرارتی هوشمند.",
      en: "High-capacity energy storage for factories, industrial parks, and heavy facilities. Equipped with advanced protection systems and intelligent thermal management.",
    },
    featuredCount: 1,
    products: [
      {
        name: { fa: "سیستم ذخیره انرژی ولتاژ بالا، مدل قفسه‌ای", en: "High-Voltage Rack ESS" },
        category: { fa: "ذخیره انرژی صنعتی قفسه‌ای", en: "Industrial Rack Energy Storage" },
        description: {
          fa: "سیستم ذخیره انرژی ولتاژ بالا قفسه‌ای، یک راهکار استاندارد، یکپارچه و پیشرفته در حوزه ذخیره انرژی است که به طور ویژه برای کاربردهایی مانند ذخیره انرژی صنعتی و تجاری، مراکز داده، ایستگاه‌های مخابراتی و میکروگریدها طراحی و توسعه یافته است. این سیستم با بهره‌گیری از ساختار یکپارچه و طراحی مبتنی بر ولتاژ بالا، ضمن افزایش راندمان و بهره‌وری انرژی، امکان نصب، توسعه و نگهداری آسان را فراهم می‌کند.",
          en: "The high-voltage rack ESS is a standard, integrated, and advanced energy storage solution specifically designed for industrial and commercial energy storage, data centers, telecom stations, and microgrids. With integrated architecture and high-voltage design, it improves efficiency and enables easy installation, expansion, and maintenance.",
        },
        features: [
          { fa: "سیستم قفسه‌ای ولتاژ بالا", en: "High-voltage rack system" },
          { fa: "ساختار ماژولار پیشرفته", en: "Advanced modular structure" },
          { fa: "بهره‌وری بالا", en: "High efficiency" },
          { fa: "نگهداری آسان", en: "Easy maintenance" },
          { fa: "طول عمر بالا", en: "Long lifecycle" },
          { fa: "پایش هوشمند", en: "Smart monitoring" },
          { fa: "ایمنی در سطح صنعتی", en: "Industrial-grade safety" },
          { fa: "استقرار قابل توسعه", en: "Expandable deployment" },
        ],
        applications: [
          { fa: "مراکز داده", en: "Data centers" },
          { fa: "زیرساخت مخابراتی", en: "Telecom infrastructure" },
          { fa: "سیستم‌های برق صنعتی", en: "Industrial power systems" },
          { fa: "میکروگریدها", en: "Microgrids" },
        ],
      },
      {
        name: { fa: "سیستم ذخیره انرژی صنعتی و تجاری ESS 60kWh", en: "ESS 60 kWh" },
        category: { fa: "کابینت ذخیره انرژی تجاری", en: "Commercial ESS Cabinet" },
        description: {
          fa: "این سیستم ذخیره انرژی، یک راهکار حرفه‌ای ویژه مصارف صنعتی و تجاری است که با بهره‌گیری از نرم‌افزار هوشمند، فرآیند محاسبه، مدیریت تولید و مصرف انرژی را به صورت خودکار انجام می‌دهد. مازاد انرژی تولید شده به صورت هوشمند در باتری‌های لیتیومی ذخیره شده و در زمان مورد نیاز مورد استفاده قرار می‌گیرد. این سیستم با برخورداری از ظرفیت بالا، طول عمر طولانی و سطح ایمنی عالی، راهکاری قابل اعتماد و کارآمد برای بهینه‌سازی مصرف انرژی محسوب می‌شود.",
          en: "This professional energy storage system for industrial and commercial applications uses intelligent software to automatically manage energy production and consumption. Surplus energy is intelligently stored in lithium batteries for use when needed. With high capacity, long lifespan, and excellent safety, it is a reliable solution for energy optimization.",
        },
        features: [
          { fa: "پشتیبانی از On-Grid و Off-Grid", en: "Grid-On and Grid-Off support" },
          { fa: "مجهز به سیستم حفاظت در برابر آتش", en: "Fire protection system" },
          { fa: "سیستم تهویه مطبوع داخلی برای حفظ تعادل دما", en: "Internal climate control" },
          { fa: "طراحی الکترودها با شیارهای عایق پلاستیکی جهت جلوگیری از نشتی", en: "Plastic-insulated electrode design to prevent leakage" },
          { fa: "حفاظت‌های چندلایه ایمنی", en: "Multi-layer safety protection" },
        ],
        applications: [
          { fa: "ساختمان‌های تجاری", en: "Commercial buildings" },
          { fa: "کارخانه‌ها", en: "Factories" },
          { fa: "کارگاه‌های صنعتی", en: "Industrial workshops" },
          { fa: "سیستم‌های برق پشتیبان", en: "Backup power systems" },
        ],
      },
      {
        name: { fa: "سیستم ذخیره انرژی صنعتی و تجاری ESS 100kWh", en: "ESS 100 kWh" },
        category: { fa: "کابینت ذخیره انرژی تجاری", en: "Commercial ESS Cabinet" },
        description: {
          fa: "این سیستم ذخیره انرژی، یک راهکار حرفه‌ای ویژه مصارف صنعتی و تجاری است که با بهره‌گیری از نرم‌افزار هوشمند، فرآیند محاسبه، مدیریت تولید و مصرف انرژی را به صورت خودکار انجام می‌دهد. این سیستم با برخورداری از ظرفیت بالا، طول عمر طولانی و سطح ایمنی عالی، راهکاری قابل اعتماد و کارآمد برای بهینه‌سازی مصرف انرژی و کاهش هزینه‌های عملیاتی در پروژه‌های صنعتی و تجاری محسوب می‌شود.",
          en: "This professional industrial and commercial energy storage system uses intelligent software to automatically manage energy production and consumption. With high capacity, long lifespan, and excellent safety, it is a reliable and efficient solution for energy optimization and reducing operational costs.",
        },
        features: [
          { fa: "پشتیبانی از On-Grid و Off-Grid", en: "Grid-connected and off-grid operation" },
          { fa: "سیستم حفاظت پیشرفته در برابر آتش", en: "Advanced fire protection" },
          { fa: "مدیریت حرارتی هوشمند داخلی", en: "Intelligent internal thermal management" },
          { fa: "استانداردهای ایمنی بالا", en: "High safety standards" },
          { fa: "حفاظت‌های چندلایه ایمنی", en: "Multi-layer safety protection" },
        ],
        applications: [
          { fa: "تأسیسات تجاری", en: "Commercial facilities" },
          { fa: "سایت‌های صنعتی", en: "Industrial sites" },
          { fa: "ذخیره‌سازی انرژی تجدیدپذیر", en: "Renewable energy storage" },
          { fa: "ساختمان‌های هوشمند", en: "Smart buildings" },
        ],
      },
      {
        name: { fa: "سیستم ذخیره انرژی صنعتی و تجاری ESS 140kWh", en: "ESS 140 kWh" },
        category: { fa: "سیستم ذخیره انرژی صنعتی", en: "Industrial Energy Storage System" },
        description: {
          fa: "این سیستم ذخیره انرژی، یک راهکار حرفه‌ای ویژه مصارف صنعتی و تجاری است که با بهره‌گیری از نرم‌افزار هوشمند، فرآیند محاسبه، مدیریت تولید و مصرف انرژی را به صورت خودکار انجام می‌دهد. طراحی یکپارچه و ماژولار با سطح بالای یکپارچگی، مجهز به سیستم مدیریت دیجیتال بهره‌برداری و نگهداری، ایمن و قابل اعتماد، مقاوم در برابر شرایط محیطی سخت.",
          en: "This professional industrial and commercial energy storage system uses intelligent software to automatically manage energy production and consumption. Integrated and modular design with high integration level, equipped with digital operation and maintenance management system, safe and reliable under harsh environmental conditions.",
        },
        features: [
          { fa: "طراحی یکپارچه و ماژولار با سطح بالای یکپارچگی", en: "Integrated and modular design with high integration" },
          { fa: "مجهز به سیستم مدیریت دیجیتال بهره‌برداری و نگهداری", en: "Digital operation and maintenance management system" },
          { fa: "ایمن و قابل اعتماد، مقاوم در برابر شرایط محیطی سخت", en: "Safe, reliable, and harsh-environment resistant" },
          { fa: "قابل استفاده در سناریوهای متنوع کاربردی", en: "Multiple application scenarios" },
          { fa: "پشتیبانی از On-Grid و Off-Grid", en: "Grid-On / Grid-Off support" },
        ],
        applications: [
          { fa: "شهرک‌های صنعتی", en: "Industrial parks" },
          { fa: "زیرساخت‌های تجاری", en: "Commercial infrastructure" },
          { fa: "سیستم‌های انرژی هوشمند", en: "Smart energy systems" },
          { fa: "پروژه‌های انرژی تجدیدپذیر", en: "Renewable energy projects" },
        ],
      },
      {
        name: { fa: "سیستم ذخیره انرژی صنعتی و تجاری ESS 160kWh", en: "ESS 160 kWh" },
        category: { fa: "کابینت ذخیره انرژی صنعتی", en: "Industrial ESS Cabinet" },
        description: {
          fa: "این سیستم ذخیره انرژی، یک راهکار حرفه‌ای ویژه مصارف صنعتی و تجاری است که با بهره‌گیری از نرم‌افزار هوشمند، فرآیند محاسبه، مدیریت تولید و مصرف انرژی را به صورت خودکار انجام می‌دهد. مازاد انرژی تولید شده به صورت هوشمند در باتری‌های لیتیومی ذخیره شده و در زمان مورد نیاز مورد استفاده قرار می‌گیرد.",
          en: "This professional industrial and commercial energy storage system uses intelligent software to automatically manage energy production and consumption. Surplus energy is intelligently stored in lithium batteries for use when needed.",
        },
        features: [
          { fa: "سیستم حفاظت در برابر آتش", en: "Fire protection system" },
          { fa: "تعادل حرارتی داخلی", en: "Internal thermal balancing" },
          { fa: "ایمنی عملیاتی بالا", en: "High operational safety" },
          { fa: "بهینه‌سازی خودکار انرژی", en: "Automated energy optimization" },
          { fa: "پایایی در سطح صنعتی", en: "Industrial-grade reliability" },
          { fa: "حفاظت‌های چندلایه", en: "Multi-layer protection" },
        ],
        applications: [
          { fa: "سیستم‌های پشتیبان صنعتی", en: "Industrial backup systems" },
          { fa: "تأسیسات تجاری", en: "Commercial facilities" },
          { fa: "کارخانه‌های تولیدی", en: "Manufacturing plants" },
          { fa: "مدیریت هوشمند انرژی", en: "Smart energy management" },
        ],
      },
      {
        name: { fa: "سیستم ذخیره انرژی صنعتی و تجاری ESS 215/241kWh", en: "ESS 215/241 kWh" },
        category: { fa: "سیستم ذخیره انرژی تجاری بزرگ", en: "Large Commercial ESS" },
        description: {
          fa: "این سیستم ذخیره انرژی، یک راهکار حرفه‌ای ویژه مصارف صنعتی و تجاری است که با بهره‌گیری از نرم‌افزار هوشمند، فرآیند محاسبه، مدیریت تولید و مصرف انرژی را به صورت خودکار انجام می‌دهد. این سیستم با برخورداری از ظرفیت بالا، طول عمر طولانی و سطح ایمنی عالی، راهکاری قابل اعتماد و کارآمد برای بهینه‌سازی مصرف انرژی و کاهش هزینه‌های عملیاتی محسوب می‌شود.",
          en: "This professional industrial and commercial energy storage system uses intelligent software to automatically manage energy production and consumption. With high capacity, long lifespan, and excellent safety level, it is a reliable and efficient solution for energy optimization and operational cost reduction.",
        },
        features: [
          { fa: "پشتیبانی از On-Grid و Off-Grid", en: "Grid-On / Grid-Off support" },
          { fa: "سیستم حفاظت در برابر آتش", en: "Fire protection system" },
          { fa: "مدیریت حرارتی", en: "Thermal management" },
          { fa: "بهینه‌سازی نرم‌افزاری هوشمند", en: "Smart software optimization" },
          { fa: "ایمنی چندلایه", en: "Multi-layer safety" },
          { fa: "معماری با ظرفیت بالا", en: "High-capacity architecture" },
        ],
        applications: [
          { fa: "زیرساخت‌های تجاری", en: "Commercial infrastructure" },
          { fa: "پروژه‌های بهینه‌سازی انرژی", en: "Energy optimization projects" },
          { fa: "سیستم‌های پشتیبان صنعتی", en: "Industrial backup systems" },
          { fa: "تأسیسات هوشمند", en: "Smart facilities" },
        ],
      },
      {
        name: { fa: "سیستم ذخیره انرژی صنعتی و تجاری ESS 261kWh", en: "ESS 261 kWh" },
        category: { fa: "پلتفرم ذخیره انرژی صنعتی", en: "Industrial ESS Platform" },
        description: {
          fa: "این سیستم ذخیره انرژی، یک راهکار حرفه‌ای ویژه مصارف صنعتی و تجاری است. امکان طراحی مستقل بخش‌های AC و DC فراهم شده و با بهره‌گیری از استراتژی‌های سوئیچینگ هوشمند برای سناریوهای مختلف از جمله کاهش پیک مصرف (Peak Shaving) و پر کردن دره مصرف (Valley Filling)، مدیریت ظرفیت، توسعه پویا ظرفیت، بهینه‌سازی مصرف انرژی‌های نو، مدیریت انرژی صنعتی را بهینه می‌سازد.",
          en: "This professional industrial and commercial energy storage system offers independent AC/DC design and intelligent switching strategies for Peak Shaving, Valley Filling, capacity management, dynamic capacity expansion, and renewable energy consumption optimization.",
        },
        features: [
          { fa: "امکان طراحی مستقل بخش‌های AC و DC", en: "Independent AC/DC design" },
          { fa: "بهره‌گیری از استراتژی‌های سوئیچینگ هوشمند", en: "Intelligent switching strategies" },
          { fa: "کاهش پیک مصرف (Peak Shaving) و پر کردن دره مصرف (Valley Filling)", en: "Peak Shaving and Valley Filling" },
          { fa: "سیستم حفاظت در برابر آتش در سه سطح", en: "Three-level fire protection" },
          { fa: "استقرار انعطاف‌پذیر", en: "Flexible deployment" },
          { fa: "سیستم ایمن و پایدار", en: "Safe and stable system" },
        ],
        applications: [
          { fa: "زیرساخت انرژی صنعتی", en: "Industrial energy infrastructure" },
          { fa: "تعادل‌سازی شبکه", en: "Grid balancing" },
          { fa: "کاهش پیک مصرف", en: "Peak shaving" },
          { fa: "بهینه‌سازی انرژی تجدیدپذیر", en: "Renewable energy optimization" },
        ],
      },
      {
        name: { fa: "سیستم ذخیره انرژی صنعتی و تجاری ESS 261kWh (خنک‌کاری مایع)", en: "ESS 261 kWh Liquid Cooling" },
        category: { fa: "ذخیره انرژی صنعتی با خنک‌کاری مایع", en: "Liquid-Cooled Industrial ESS" },
        description: {
          fa: "این سیستم ذخیره انرژی یک راهکار حرفه‌ای ویژه مصارف صنعتی و تجاری با تکنولوژی خنک‌کاری مایع است که با بهره‌گیری از استراتژی‌های سوئیچینگ هوشمند برای Peak Shaving و Valley Filling، مدیریت انرژی صنعتی را بهینه می‌سازد و از پایداری حرارتی بالا در شرایط دشوار برخوردار است.",
          en: "This advanced liquid-cooled industrial and commercial energy storage system uses intelligent switching strategies for Peak Shaving and Valley Filling to optimize industrial energy management and offers high thermal stability under demanding conditions.",
        },
        features: [
          { fa: "تکنولوژی خنک‌کاری مایع", en: "Liquid cooling technology" },
          { fa: "بهره‌گیری از استراتژی‌های سوئیچینگ هوشمند", en: "Intelligent energy switching" },
          { fa: "پایداری حرارتی بالا", en: "High thermal stability" },
          { fa: "ایمنی در سطح صنعتی", en: "Industrial-grade safety" },
          { fa: "بهینه‌سازی Peak Shaving", en: "Peak shaving optimization" },
          { fa: "معماری مستقل AC/DC", en: "Independent AC/DC architecture" },
        ],
        applications: [
          { fa: "پروژه‌های صنعتی در مقیاس بزرگ", en: "Large-scale industrial projects" },
          { fa: "سیستم‌های انرژی با بار بالا", en: "High-load energy systems" },
          { fa: "ادغام انرژی تجدیدپذیر", en: "Renewable integration" },
          { fa: "تأسیسات صنعتی هوشمند", en: "Smart industrial facilities" },
        ],
      },
    ],
  },

  // ── 4. Solar & Hybrid ─────────────────────────────────────────────────────
  {
    id: "solar",
    pill: { fa: "دسته ۴", en: "Category 4" },
    title: { fa: "خورشیدی و هیبریدی", en: "Solar & Hybrid" },
    description: {
      fa: "سیستم‌های ذخیره انرژی فضای باز هیبریدی طراحی شده برای ادغام با نیروگاه‌های خورشیدی و منابع انرژی تجدیدپذیر. مناسب برای محیط‌های فضای باز با مقاومت محیطی بالا.",
      en: "Outdoor hybrid energy storage systems designed for integration with solar farms and renewable energy sources. Suitable for outdoor environments with high environmental resistance.",
    },
    featuredCount: 1,
    products: [
      {
        name: { fa: "کابینت فضای باز هیبریدی ذخیره انرژی صنعتی و تجاری با خنک‌کاری هوایی 120kWh", en: "120 kWh Outdoor Hybrid ESS" },
        category: { fa: "سیستم ذخیره انرژی تجاری فضای باز", en: "Outdoor Commercial ESS" },
        description: {
          fa: "این سیستم ذخیره انرژی، یک راهکار حرفه‌ای ویژه مصارف صنعتی و تجاری است که با بهره‌گیری از نرم‌افزار هوشمند، فرآیند محاسبه، مدیریت تولید و مصرف انرژی را به صورت خودکار انجام می‌دهد. این سیستم با برخورداری از ظرفیت بالا، طول عمر طولانی و سطح ایمنی عالی، راهکاری قابل اعتماد و کارآمد برای محیط‌های فضای باز محسوب می‌شود.",
          en: "This professional outdoor industrial and commercial energy storage system uses intelligent software to automatically manage energy production and consumption. With high capacity, long lifespan, and excellent safety, it is a reliable solution for outdoor environments.",
        },
        features: [
          { fa: "ساختار مناسب فضای باز", en: "Outdoor-rated structure" },
          { fa: "سیستم خنک‌کاری هوایی", en: "Air cooling system" },
          { fa: "مجهز به سیستم حفاظت در برابر آتش", en: "Fire protection" },
          { fa: "سیستم تهویه مطبوع داخلی برای حفظ تعادل دما", en: "Internal thermal balancing" },
          { fa: "پشتیبانی از On-Grid و Off-Grid", en: "Grid-On / Grid-Off support" },
          { fa: "حفاظت‌های چندلایه ایمنی", en: "Multi-layer safety protection" },
        ],
        applications: [
          { fa: "سیستم‌های صنعتی فضای باز", en: "Outdoor industrial systems" },
          { fa: "پروژه‌های انرژی تجدیدپذیر", en: "Renewable energy projects" },
          { fa: "زیرساخت‌های تجاری", en: "Commercial infrastructure" },
          { fa: "برق پشتیبان", en: "Backup power" },
        ],
      },
      {
        name: { fa: "کابینت فضای باز هیبریدی ذخیره انرژی صنعتی و تجاری با خنک‌کاری هوایی 261kWh", en: "261 kWh Outdoor Hybrid ESS" },
        category: { fa: "سیستم ذخیره انرژی صنعتی فضای باز", en: "Outdoor Industrial ESS" },
        description: {
          fa: "این سیستم ذخیره انرژی هیبریدی فضای باز با ظرفیت بالا، برای مدیریت انرژی تجدیدپذیر در مقیاس صنعتی و مدیریت هوشمند توان طراحی شده است و با بهره‌گیری از نرم‌افزار هوشمند، فرآیند محاسبه، مدیریت تولید و مصرف انرژی را به صورت خودکار انجام می‌دهد.",
          en: "This large-capacity outdoor hybrid ESS system is designed for industrial-scale renewable energy management and intelligent power management, using intelligent software to automatically manage energy production and consumption.",
        },
        features: [
          { fa: "کابینت صنعتی فضای باز", en: "Outdoor industrial cabinet" },
          { fa: "ذخیره‌سازی لیتیوم با ظرفیت بالا", en: "High-capacity lithium storage" },
          { fa: "مدیریت هوشمند انرژی", en: "Smart energy management" },
          { fa: "سیستم حفاظت در برابر آتش", en: "Fire protection" },
          { fa: "کنترل حرارتی هوشمند", en: "Intelligent thermal control" },
          { fa: "مقاومت محیطی بالا", en: "High environmental resistance" },
        ],
        applications: [
          { fa: "پروژه‌های انرژی صنعتی", en: "Industrial energy projects" },
          { fa: "زیرساخت‌های فضای باز", en: "Outdoor infrastructure" },
          { fa: "نیروگاه‌های برق تجدیدپذیر", en: "Renewable power plants" },
          { fa: "بهینه‌سازی شبکه", en: "Grid optimization" },
        ],
      },
    ],
  },

  // ── 5. Large Projects & Microgrid ─────────────────────────────────────────
  {
    id: "large-scale",
    pill: { fa: "دسته ۵", en: "Category 5" },
    title: { fa: "پروژه‌های بزرگ و میکروگرید", en: "Large Projects & Microgrid" },
    description: {
      fa: "سیستم‌های ذخیره انرژی کانتینری در مقیاس شبکه برای پروژه‌های زیرساختی بزرگ، میکروگریدها و نیروگاه‌های تجدیدپذیر. با قابلیت Plug & Play و استقرار سریع.",
      en: "Container-scale grid-level energy storage for large infrastructure projects, microgrids, and renewable power plants. Plug & Play capable with rapid deployment.",
    },
    featuredCount: 1,
    products: [
      {
        name: { fa: "سیستم ذخیره انرژی ESS صنعتی و تجاری کانتینری ۲۰ فوتی", en: "20-Foot Containerized ESS" },
        category: { fa: "سیستم ذخیره انرژی کانتینری", en: "Container Energy Storage System" },
        description: {
          fa: "سیستم ذخیره انرژی کانتینری، به استفاده و مدیریت بهینه انرژی کمک کرده و موجب کاهش هزینه‌های برق می‌شود. این سیستم‌ها در سناریوهای متنوعی قابل استفاده هستند؛ از جمله آربیتراژ پیک و دره مصرف برای مشترکین، تنظیم فرکانس شبکه و جابه‌جایی بار (Peak Shifting)، افزایش بهره‌وری در مصرف انرژی‌های نو و بهبود پایداری تأمین برق از شبکه.",
          en: "The containerized energy storage system helps optimize energy use and management, reducing electricity costs. These systems can be used in various scenarios including peak-valley arbitrage for customers, grid frequency regulation and peak shifting, improving renewable energy utilization, and enhancing grid power supply stability.",
        },
        features: [
          { fa: "مکانیزم هوشمند طبقه‌بندی و مدیریت خطا", en: "Smart fault classification and management" },
          { fa: "سیستم اعلام و اطفاء حریق تمام اتوماتیک", en: "Automatic fire suppression system" },
          { fa: "نصب سریع و آسان Plug & Play با کاهش هزینه‌های نصب، بهره‌برداری و نگهداری", en: "Plug & Play installation with reduced cost" },
          { fa: "سیستم پیشرفته مدیریت باتری (BMS)", en: "Advanced BMS management" },
          { fa: "استاندارد حفاظت IP54", en: "IP54 protection rating" },
        ],
        applications: [
          { fa: "پروژه‌های مقیاس شبکه", en: "Utility-scale projects" },
          { fa: "تعادل‌سازی شبکه", en: "Grid balancing" },
          { fa: "نیروگاه‌های انرژی تجدیدپذیر", en: "Renewable energy plants" },
          { fa: "زیرساخت‌های صنعتی", en: "Industrial infrastructure" },
        ],
      },
      {
        name: { fa: "سیستم ذخیره انرژی ESS صنعتی و تجاری کانتینری ۴۰ فوتی", en: "40-Foot Containerized ESS" },
        category: { fa: "سیستم ذخیره انرژی کانتینری در مقیاس بزرگ", en: "Large-Scale Container ESS" },
        description: {
          fa: "سیستم ذخیره انرژی کانتینری در مقیاس بزرگ، به استفاده و مدیریت بهینه انرژی کمک کرده و موجب کاهش هزینه‌های برق می‌شود. این سیستم‌ها در سناریوهای متنوعی قابل استفاده هستند؛ از جمله آربیتراژ پیک و دره مصرف برای مشترکین، تنظیم فرکانس شبکه و جابه‌جایی بار (Peak Shifting) و بهبود پایداری تأمین برق از شبکه.",
          en: "The large-scale containerized energy storage system helps optimize energy use and management, reducing electricity costs. These systems can be used in various scenarios including peak-valley arbitrage for customers, grid frequency regulation and peak shifting, and enhancing grid power supply stability.",
        },
        features: [
          { fa: "سیستم کانتینری صنعتی بزرگ", en: "Large industrial container system" },
          { fa: "استقرار Plug & Play", en: "Plug-and-play deployment" },
          { fa: "مکانیزم هوشمند طبقه‌بندی و مدیریت خطا", en: "Smart fault management" },
          { fa: "سیستم اعلام و اطفاء حریق تمام اتوماتیک", en: "Automatic fire suppression" },
          { fa: "استاندارد حفاظت IP54", en: "IP54 protection rating" },
          { fa: "سیستم هوشمند BMS", en: "Smart BMS system" },
        ],
        applications: [
          { fa: "پروژه‌های انرژی در مقیاس شبکه", en: "Utility-scale energy projects" },
          { fa: "زیرساخت انرژی تجدیدپذیر", en: "Renewable energy infrastructure" },
          { fa: "سیستم‌های پشتیبانی از شبکه", en: "Grid support systems" },
          { fa: "استقرارهای صنعتی بزرگ", en: "Large industrial deployments" },
        ],
      },
    ],
  },
  // ── 6. Emergency Power & UPS ──────────────────────────────────────────────
  {
    id: "ups",
    pill: { fa: "دسته ۶", en: "Category 6" },
    title: { fa: "برق اضطراری و UPS", en: "Emergency Power & UPS" },
    description: {
      fa: "پلتفرم‌های مدیریت انرژی و اینورترهای هیبریدی با کارایی بالا برای تأمین برق اضطراری، سوئیچینگ بی‌وقفه و مدیریت هوشمند میکروگرید.",
      en: "High-performance energy management platforms and hybrid inverters for emergency power supply, seamless switching, and intelligent microgrid management.",
    },
    featuredCount: 1,
    products: [
      {
        name: { fa: "پلتفرم مدیریت انرژی (EMS)", en: "Energy Management System (EMS)" },
        category: { fa: "پلتفرم انرژی هوشمند", en: "Smart Energy Platform" },
        description: {
          fa: "اپلیکیشن اختصاصی UBETTER به صورت یکپارچه با سیستم EMS در ارتباط بوده و وضعیت عملکرد تجهیزات را در قالب نمودار نمایش می‌دهد. این قابلیت امکان مدیریت آسان و در دسترس محصولات ذخیره انرژی UBETTER را برای کاربران فراهم می‌سازد. سیستم هوشمند بهره‌برداری و نگهداری، کلیه داده‌های تجهیزات انرژی و شرایط محیطی را از طریق فناوری اینترنت اشیاء به بستر ابری منتقل کرده و امکان ذخیره‌سازی و تحلیل متمرکز آن‌ها را فراهم می‌سازد.",
          en: "The dedicated UBETTER app is integrated with the EMS system and displays equipment operation status in chart format, providing users with easy and accessible management of UBETTER energy storage products. The smart operation and maintenance system transfers all energy equipment data and environmental conditions to the cloud platform via IoT technology, enabling centralized storage and analysis.",
        },
        features: [
          { fa: "پایش لحظه‌ای وضعیت عملکرد", en: "Real-time status monitoring" },
          { fa: "مانیتورینگ و کنترل از راه دور", en: "Remote monitoring and control" },
          { fa: "تنظیم حالت‌های عملکرد سیستم", en: "System operation mode configuration" },
          { fa: "تنظیم زمان‌بندی ساعات اوج و کم‌باری مصرف", en: "Peak and off-peak scheduling" },
          { fa: "اتصال ابری و یکپارچگی IoT", en: "Cloud connectivity and IoT integration" },
          { fa: "مدیریت از طریق اپلیکیشن موبایل", en: "Mobile app management" },
          { fa: "زمان‌بندی هوشمند", en: "Smart scheduling" },
          { fa: "سیستم هشدار و پیش‌آگاهی مؤثر جهت شناسایی به‌موقع خطاها", en: "Effective warning and pre-notification system" },
        ],
        applications: [
          { fa: "خانه‌های هوشمند", en: "Smart homes" },
          { fa: "سیستم‌های انرژی تجاری", en: "Commercial energy systems" },
          { fa: "مدیریت انرژی صنعتی", en: "Industrial energy management" },
          { fa: "بهینه‌سازی انرژی تجدیدپذیر", en: "Renewable energy optimization" },
        ],
      },
      {
        name: { fa: "اینورتر هیبریدی میکروگرید", en: "Hybrid Microgrid Inverter" },
        category: { fa: "اینورتر هیبریدی صنعتی", en: "Industrial Hybrid Inverter" },
        description: {
          fa: "این محصول یک اینورتر ذخیره انرژی با راندمان بالا و قابلیت اطمینان بالا است که به طور ویژه برای میکروگریدهای ذخیره انرژی در مقیاس کوچک و متوسط توسعه یافته است. این دستگاه از اتصال به سیستم‌های فتوولتاییک پشتیبانی کرده و مجهز به قابلیت سوئیچینگ بین حالت متصل به شبکه (On-Grid) و مستقل از شبکه (Off-Grid) می‌باشد. همچنین امکان عملکرد موازی چندین دستگاه، بهره‌برداری هیبریدی با ژنراتور دیزلی و سوئیچینگ سریع بین حالت‌های On-Grid و Off-Grid را فراهم می‌سازد.",
          en: "This high-efficiency, high-reliability energy storage inverter is specifically developed for small and medium-scale microgrid energy storage. The device supports photovoltaic system connection and is equipped with seamless switching between On-Grid and Off-Grid modes. It also enables parallel operation of multiple devices, hybrid operation with diesel generator, and fast switching between modes.",
        },
        features: [
          { fa: "اینورتر گرید-فرمینگ", en: "Grid-forming inverter" },
          { fa: "ظرفیت اضافه بار تا ۱۵۰٪", en: "Up to 150% overload capacity" },
          { fa: "قابلیت سوئیچینگ بدون وقفه", en: "Seamless switching capability" },
          { fa: "پشتیبانی از حالت هیبریدی با ژنراتور دیزلی", en: "Diesel generator hybrid support" },
          { fa: "فناوری کنترل اتصال مستقل شبکه سه فاز", en: "Three-phase independent grid control" },
          { fa: "سازگاری با انواع باتری‌ها در سیستم‌های میکروگرید", en: "Multi-battery microgrid compatibility" },
          { fa: "عملکرد موازی چندین دستگاه", en: "Parallel operation support" },
        ],
        applications: [
          { fa: "میکروگریدهای صنعتی", en: "Industrial microgrids" },
          { fa: "سیستم‌های پشتیبان تجاری", en: "Commercial backup systems" },
          { fa: "ایستگاه‌های شارژ خودروی برقی", en: "EV charging stations" },
          { fa: "سیستم‌های خورشیدی + ذخیره‌سازی", en: "Solar + storage systems" },
          { fa: "میکروگرید کوچک فتوولتاییک-ذخیره‌سازی-دیزل", en: "PV-Storage-Diesel mini microgrid" },
        ],
      },
    ],
  },
];

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
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenSpecs}
                className={`${isRTL ? "self-end" : "self-start"} inline-flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-[13px] transition-all duration-300`}
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

          {/* Specs button */}
          <button
            onClick={onOpenSpecs}
            className="w-full py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-300 flex items-center justify-center gap-2"
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
            {ui3(locale, "مشخصات فنی", "Technical Specs", "技术规格")}
          </button>
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
