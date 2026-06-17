import type { Locale } from "@/i18n/config";
import type { UpsCalculatorDict } from "@/i18n/ups-calculator.dict";
import { upsCalculatorEn, upsCalculatorFa, upsCalculatorZh, upsCalculatorDe } from "@/i18n/ups-calculator.dict";

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
      ariaLabel:
        "Decorative globe map with Iran emphasized; scroll the page normally to explore the site.",
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
      ariaLabel:
        "نقشهٔ تزئینی کره‌ای با ایران برجسته؛ برای پیمایش سایت به‌طور معمول اسکرول کنید.",
    },
  },
  zh: {
    dir: "ltr",
    nav: {
      home: "首页",
      products: "产品",
      features: "功能",
      technology: "技术",
      about: "关于我们",
      contact: "联系我们",
      quote: "💬 免费咨询",
    },
    hero: {
      badge: "⚡ 迈向更绿色的未来",
      title: "家用、商用与工业级智能锂电储能 🔋",
      p1: "UBETTER 提供先进的磷酸铁锂电池系统，从 2.5kWh 家用储能到 1–2MWh 集装箱方案，帮助企业降低峰值电费并提升备用供电可靠性。",
      p2: "定制化方案、专业工程支持与全球交付服务，助力长期能源独立。🌍",
      ctaProducts: "🚀 浏览产品",
      ctaConsultation: "📩 预约咨询",
      stats: [
        { label: "厂区面积", value: "10848m²", icon: "🏭" },
        { label: "设备资产", value: "6000万元", icon: "💰" },
        { label: "工程团队", value: "30+ 专家", icon: "👷" },
      ],
    },
    products: {
      title: "UBETTER 产品矩阵 🧰",
      subtitle:
        "官方产品线涵盖壁挂式、立式、机架式、堆叠式一体机及家用 / 工商业储能系统，单机容量从 60kWh 到 261kWh 及以上。",
    },
    about: {
      title: "关于 UBETTER 🧠",
      p1: "Ubetter Technology Co., Ltd. 是国家高新技术企业，专注于先进定制研发、专业制造与稳健供应链。",
      p2: "公司通过 ISO 9001 与 ISO 14001 体系管理，依托磷酸铁锂电芯强调安全、长循环寿命与可持续。🌱",
      kpis: [
        "💼 注册资本：1000万元",
        "🏗️ 设备资产：6000万元",
        "🏭 厂房面积：10848m²",
        "👨‍🔬 团队：教授领衔 + 30+ 工程师",
      ],
    },
    projects: {
      title1: "印尼、江西、度假村及工厂等项目落地",
      p1: "官网展示的实景案例体现了工商业场景下光储一体化方案的集成能力。",
      title2: "🏆 UBETTER 亮相第138届广交会",
      p2: "国际化展会阵容助力全球合作，巩固 OEM/ODM 制造的信任基础。",
    },
    gallery: {
      title: "影像画廊与生产亮点 📸",
      subtitle: "滚动动画展示",
      exportReady: "🚢 出口就绪 / 工厂直供",
      slide: "幻灯片",
    },
    applications: {
      title: "工商业应用场景 🏢",
      items: [
        "🏭 工厂与制造园区",
        "📦 仓储与物流中心",
        "🏢 写字楼与购物中心",
        "🌾 农场与灌溉系统",
        "☀️ 光储一体化项目",
        "🏥 医院、通信基站与机房",
      ],
    },
    services: {
      title: "我们的服务承诺 🤝",
      items: [
        "🛠️ 定制化储能系统设计",
        "👩‍💻 专业技术支持与布线指导",
        "🚀 快速交付与海外仓储协同",
        "✅ 严苛质检、长质保与敏捷售后",
      ],
    },
    contact: {
      title: "免费咨询 📬",
      subtitle:
        "无论是住宅、工商业还是大型储能项目，请留下需求信息，我们将为您匹配专属电池方案与报价。",
      name: "姓名",
      email: "电子邮箱",
      phone: "电话号码",
      company: "公司名称",
      message: "请填写期望容量、应用场景与时间节点……",
      send: "✉️ 发送询价",
    },
    brandTagline: "🔋 可靠的磷酸铁锂电池与光伏储能制造商",
    upsCalculator: upsCalculatorZh,
    globe: {
      ariaLabel:
        "装饰性地球示意图，突出伊朗；请正常滚动页面浏览网站。",
    },
  },
  de: {
    dir: "ltr",
    nav: {
      home: "Startseite",
      products: "Produkte",
      features: "Funktionen",
      technology: "Technologie",
      about: "Über uns",
      contact: "Kontakt",
      quote: "💬 Kostenloses Angebot",
    },
    hero: {
      badge: "⚡ Eine grünere Zukunft",
      title: "Intelligente Lithium-Energie für Wohn-, Gewerbe- und Industrieanwendungen 🔋",
      p1: "UBETTER entwickelt fortschrittliche LiFePO4-Systeme von 2,5 kWh Heimspeicher bis zu 1–2 MWh Containerlösungen — für geringere Spitzenkosten und zuverlässige Notstromversorgung.",
      p2: "Maßgeschneiderte Lösungen, professionelle Ingenieurunterstützung und weltweite Lieferung für langfristige Energieunabhängigkeit. 🌍",
      ctaProducts: "🚀 Produkte entdecken",
      ctaConsultation: "📩 Beratung anfragen",
      stats: [
        { label: "Werkfläche", value: "10848m²", icon: "🏭" },
        { label: "Anlagenwert", value: "60 Mio. Yuan", icon: "💰" },
        { label: "Ingenieurteam", value: "30+ Experten", icon: "👷" },
      ],
    },
    products: {
      title: "Unser Produktportfolio 🧰",
      subtitle:
        "Das offizielle UBETTER-Sortiment umfasst Wand-, Stand-, Rack- und stapelbare All-in-One-Systeme sowie Gewerbe- und Industriespeicher von 60 kWh bis 261 kWh und mehr.",
    },
    about: {
      title: "Über UBETTER 🧠",
      p1: "Ubetter Technology Co., Ltd. ist ein nationales High-Tech-Unternehmen mit Fokus auf maßgeschneiderte F&E, professionelle Fertigung und starke Lieferkette.",
      p2: "Mit ISO 9001 und ISO 14001 steht UBETTER für Sicherheit, lange Zyklenlebensdauer und Nachhaltigkeit durch LiFePO4-Chemie. 🌱",
      kpis: [
        "💼 Stammkapital: 10 Mio. Yuan",
        "🏗️ Anlagenwert: 60 Mio. Yuan",
        "🏭 Werkgebäude: 10848m²",
        "👨‍🔬 Team: Professoren + 30+ Ingenieure",
      ],
    },
    projects: {
      title1: "Indonesien, Jiangxi, Resort- und Fabrikprojekte",
      p1: "Reale Installationen zeigen integrierte Photovoltaik- und Speicherlösungen für Gewerbe und Industrie.",
      title2: "🏆 UBETTER auf der 138. Canton Fair",
      p2: "Internationale Präsenz stärkt globale Partnerschaften und Vertrauen in OEM/ODM-Fertigung.",
    },
    gallery: {
      title: "Bildergalerie & Produktions-Highlights 📸",
      subtitle: "Scroll-Animation",
      exportReady: "🚢 Exportbereit / Direkt ab Werk",
      slide: "Folie",
    },
    applications: {
      title: "Gewerbe- & Industrieanwendungen 🏢",
      items: [
        "🏭 Fabriken und Produktionsanlagen",
        "📦 Lager und Logistikzentren",
        "🏢 Bürogebäude und Einkaufszentren",
        "🌾 Landwirtschaft und Bewässerung",
        "☀️ Solar + Speicher",
        "🏥 Krankenhäuser, Telekom-Basisstationen und Serverräume",
      ],
    },
    services: {
      title: "Unser Serviceversprechen 🤝",
      items: [
        "🛠️ Maßgeschneiderte Energiespeichersysteme",
        "👩‍💻 Professioneller technischer Support",
        "🚀 Schnelle Lieferung mit globalem Lager",
        "✅ Strenge QC, lange Garantie, reaktionsschneller Service",
      ],
    },
    contact: {
      title: "Kostenloses Angebot 📬",
      subtitle:
        "Heim-, Gewerbe- oder Industriespeicher? Senden Sie Ihre Projektdetails — wir erstellen ein passendes Angebot.",
      name: "Ihr Name",
      email: "Ihre E-Mail",
      phone: "Telefonnummer",
      company: "Firma",
      message: "Gewünschte Kapazität, Anwendung und Zeitplan...",
      send: "✉️ Anfrage senden",
    },
    brandTagline: "🔋 Zuverlässiger LiFePO4- & Solar-Speicherhersteller",
    upsCalculator: upsCalculatorDe,
    globe: {
      ariaLabel:
        "Dekorative Globuskarte mit Iran im Fokus; scrollen Sie normal, um die Website zu erkunden.",
    },
  },
};
