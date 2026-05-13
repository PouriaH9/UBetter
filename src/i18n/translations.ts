import type { Locale } from "@/i18n/config";
import type { UpsCalculatorDict } from "@/i18n/ups-calculator.dict";
import { upsCalculatorEn, upsCalculatorFa } from "@/i18n/ups-calculator.dict";

type Translation = {
  dir: "ltr" | "rtl";
  nav: {
    home: string;
    products: string;
    features: string;
    technology: string;
    about: string;
    contact: string;
    quote: string;
  };
  hero: {
    badge: string;
    title: string;
    p1: string;
    p2: string;
    ctaProducts: string;
    ctaConsultation: string;
    stats: { label: string; value: string; icon: string }[];
  };
  products: { title: string; subtitle: string };
  about: { title: string; p1: string; p2: string; kpis: string[] };
  projects: { title1: string; p1: string; title2: string; p2: string };
  gallery: { title: string; subtitle: string; exportReady: string; slide: string };
  applications: { title: string; items: string[] };
  services: { title: string; items: string[] };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
    send: string;
  };
  brandTagline: string;
  upsCalculator: UpsCalculatorDict;
  globe: {
    badge: string;
    title: string;
    subtitle: string;
    ariaLabel: string;
  };
};

export const translations: Record<Locale, Translation> = {
  en: {
    dir: "ltr",
    nav: {
      home: "Home",
      products: "Products",
      features: "Features",
      technology: "Technology",
      about: "About",
      contact: "Contact",
      quote: "💬 Get Free Quote"
    },
    hero: {
      badge: "⚡ Powering A Greener Future",
      title: "Smart Lithium Energy for Home, Commercial and Industrial Use 🔋",
      p1: "UBETTER develops advanced LiFePO4 battery systems from 2.5kWh home storage to 1-2MWh containerized projects, helping businesses reduce peak energy costs and improve backup reliability.",
      p2: "Customized solutions, professional engineering support, and global delivery services built for long-term energy independence. 🌍",
      ctaProducts: "🚀 Explore Products",
      ctaConsultation: "📩 Request Consultation",
      stats: [
        { label: "Factory Area", value: "10848m²", icon: "🏭" },
        { label: "Equipment Assets", value: "60M Yuan", icon: "💰" },
        { label: "Engineering Team", value: "30+ Experts", icon: "👷" }
      ]
    },
    products: {
      title: "Our Product Portfolio 🧰",
      subtitle:
        "Product families from the official UBETTER lineup include wall-mounted, vertical, rack-mounted, stackable all-in-one systems, plus commercial and industrial ESS from 60kWh to 261kWh and beyond."
    },
    about: {
      title: "About UBETTER 🧠",
      p1: "Ubetter Technology Co., Ltd. is a national high-tech enterprise focused on advanced customized R&D, professional manufacturing, and a strong supply chain.",
      p2: "With ISO 9001 and ISO 14001 management systems, UBETTER emphasizes safety, long cycle life, and sustainability through LiFePO4 battery chemistry. 🌱",
      kpis: [
        "💼 Registered Capital: 10M Yuan",
        "🏗️ Equipment Assets: 60M Yuan",
        "🏭 Factory Building: 10848m²",
        "👨‍🔬 Team: Professors + 30+ Engineers"
      ]
    },
    projects: {
      title1: "Indonesia, Jiangxi, Resort and Factory Deployments",
      p1: "Real installation showcases from the main site demonstrate integrated photovoltaic + storage projects for business and industrial environments.",
      title2: "🏆 UBETTER at the 138th Canton Fair",
      p2: "Global exhibition presence supports international partnerships and strengthens trust for OEM/ODM battery manufacturing."
    },
    gallery: {
      title: "Visual Gallery & Production Highlights 📸",
      subtitle: "Scroll-Animated Showcase",
      exportReady: "🚢 Export Ready / Factory Direct",
      slide: "Slide"
    },
    applications: {
      title: "Commercial & Industrial Applications 🏢",
      items: [
        "🏭 Factories and manufacturing plants",
        "📦 Warehouses and logistics centers",
        "🏢 Office buildings and shopping malls",
        "🌾 Farms and irrigation systems",
        "☀️ Solar + storage projects",
        "🏥 Hospitals, telecom base stations, and data rooms"
      ]
    },
    services: {
      title: "Our Service Promise 🤝",
      items: [
        "🛠️ Customized energy storage system design",
        "👩‍💻 Professional technical support and wiring guidance",
        "🚀 Fast delivery with global warehousing support",
        "✅ Strict QC, long warranty, responsive after-sales"
      ]
    },
    contact: {
      title: "Get Free Quote 📬",
      subtitle:
        "Looking for residential, commercial, or industrial energy storage? Send your project details and our team will share a tailored battery solution and quotation.",
      name: "Your Name",
      email: "Your Email",
      phone: "Phone Number",
      company: "Company Name",
      message: "Tell us your required capacity, application, and timeline...",
      send: "✉️ Send Inquiry"
    },
    brandTagline: "🔋 Reliable LiFePO4 Battery & Solar Storage Manufacturer",
    upsCalculator: upsCalculatorEn,
    globe: {
      badge: "Global brand · Official Iran partnership",
      title: "UBETTER worldwide — represented in Iran",
      subtitle:
        "Lian Sadar Mellal is the official exclusive representative of UBETTER in Iran.",
      ariaLabel:
        "Globe map with Iran emphasized; wide screens drag to orbit. Wheel and trackpad scroll the page, not zoom the globe.",
    },
  },
  fa: {
    dir: "rtl",
    nav: {
      home: "صفحه اصلی",
      products: "محصولات",
      features: "ویژگی ها",
      technology: "تکنولوژی",
      about: "درباره ما",
      contact: "تماس با ما",
      quote: "💬 دریافت پیش‌فاکتور"
    },
    hero: {
      badge: "⚡ قدرت‌بخشی به آینده سبز",
      title: "انرژی لیتیومی هوشمند برای مصارف خانگی، تجاری و صنعتی 🔋",
      p1: "UBETTER سیستم‌های پیشرفته LiFePO4 را از ذخیره‌سازی 2.5kWh خانگی تا پروژه‌های کانتینری 1-2MWh ارائه می‌دهد تا هزینه برق اوج مصرف کاهش یابد و پایداری برق اضطراری بیشتر شود.",
      p2: "راهکار سفارشی، پشتیبانی مهندسی حرفه‌ای و تحویل جهانی برای استقلال انرژی بلندمدت. 🌍",
      ctaProducts: "🚀 مشاهده محصولات",
      ctaConsultation: "📩 دریافت مشاوره",
      stats: [
        { label: "مساحت کارخانه", value: "10848m²", icon: "🏭" },
        { label: "دارایی تجهیزات", value: "60M Yuan", icon: "💰" },
        { label: "تیم مهندسی", value: "30+ متخصص", icon: "👷" }
      ]
    },
    products: {
      title: "سبد محصولات UBETTER 🧰",
      subtitle:
        "بر اساس وب‌سایت رسمی، محصولات شامل باتری دیواری، عمودی، رک‌مونت، استک‌بل و سیستم‌های یکپارچه خانگی و صنعتی از 60kWh تا 261kWh و بالاتر است."
    },
    about: {
      title: "درباره UBETTER 🧠",
      p1: "شرکت Ubetter Technology Co., Ltd. یک مجموعه ملی های‌تک با تمرکز بر تحقیق‌وتوسعه سفارشی، تولید حرفه‌ای و زنجیره تامین قدرتمند است.",
      p2: "با استانداردهای ISO 9001 و ISO 14001، تمرکز UBETTER بر ایمنی، سیکل عمر بالا و پایداری با فناوری LiFePO4 است. 🌱",
      kpis: [
        "💼 سرمایه ثبت‌شده: 10 میلیون یوان",
        "🏗️ دارایی تجهیزات: 60 میلیون یوان",
        "🏭 مساحت کارخانه: 10848 مترمربع",
        "👨‍🔬 تیم: اساتید + بیش از 30 مهندس"
      ]
    },
    projects: {
      title1: "پروژه‌های اندونزی، جیانگشی، ریزورت و کارخانه",
      p1: "نمونه‌های اجرایی واقعی در وب‌سایت اصلی، توانمندی راهکار یکپارچه فتوولتائیک + ذخیره‌سازی را در سناریوهای صنعتی و تجاری نمایش می‌دهد.",
      title2: "🏆 حضور UBETTER در 138th Canton Fair",
      p2: "حضور بین‌المللی نمایشگاهی، همکاری‌های جهانی و اعتماد در تولید OEM/ODM را تقویت می‌کند."
    },
    gallery: {
      title: "گالری تصویری و خطوط تولید 📸",
      subtitle: "نمایش متحرک هنگام اسکرول",
      exportReady: "🚢 آماده صادرات / تولید مستقیم",
      slide: "اسلاید"
    },
    applications: {
      title: "کاربردهای تجاری و صنعتی 🏢",
      items: [
        "🏭 کارخانه‌ها و خطوط تولید",
        "📦 انبارها و مراکز لجستیک",
        "🏢 ساختمان‌های اداری و مراکز خرید",
        "🌾 مزارع و سیستم‌های آبیاری",
        "☀️ پروژه‌های خورشیدی + ذخیره‌سازی",
        "🏥 بیمارستان‌ها، ایستگاه‌های مخابراتی و دیتاروم‌ها"
      ]
    },
    services: {
      title: "تعهد خدمات ما 🤝",
      items: [
        "🛠️ طراحی سفارشی سیستم ذخیره‌سازی",
        "👩‍💻 پشتیبانی فنی و راهنمایی سیم‌کشی",
        "🚀 تحویل سریع با پشتیبانی انبار جهانی",
        "✅ کنترل کیفیت سخت‌گیرانه و خدمات پس از فروش"
      ]
    },
    contact: {
      title: "دریافت پیش‌فاکتور 📬",
      subtitle: "برای پروژه‌های خانگی، تجاری یا صنعتی، مشخصات خود را ارسال کنید تا راهکار و قیمت اختصاصی دریافت کنید.",
      name: "نام شما",
      email: "ایمیل شما",
      phone: "شماره تماس",
      company: "نام شرکت",
      message: "ظرفیت مورد نیاز، نوع کاربرد و زمان‌بندی پروژه را بنویسید...",
      send: "✉️ ارسال درخواست"
    },
    brandTagline: "🔋 تولیدکننده مطمئن باتری LiFePO4 و ذخیره‌سازی خورشیدی",
    upsCalculator: upsCalculatorFa,
    globe: {
      badge: "برند جهانی · نمای رسمی در ایران",
      title: "UBETTER در نقشه جهان و پل به ایران",
      subtitle: "لیان صدر ملل نمایندهٔ رسمی و انحصاری UBETTER در ایران",
      ariaLabel:
        "نقشهٔ کره‌ای با ایران برجسته؛ در صفحهٔ پهن با کشیدن می‌توانید بچرخانید؛ اسکرول معمولی صفحه است.",
    },
  },
};
