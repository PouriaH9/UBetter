import type { Locale } from "@/i18n/config";

export type HomeSectionCard = {
  title: string;
  desc: string;
  tag?: string;
};

export type HomeSectionBlock = {
  badge: string;
  title: string;
  subtitle: string;
  cards: HomeSectionCard[];
  cta?: string;
};

export type HomeSectionsDict = {
  services: HomeSectionBlock;
  certificates: HomeSectionBlock;
  projects: HomeSectionBlock;
  articles: HomeSectionBlock;
  catalog: HomeSectionBlock;
  contact: HomeSectionBlock & {
    formTitle: string;
    fields: { name: string; email: string; phone: string; company: string; message: string; send: string };
    channels: { label: string; value: string }[];
  };
};

export const homeSectionsCopy: Record<Locale, HomeSectionsDict> = {
  fa: {
    services: {
      badge: "خدمات و پشتیبانی",
      title: "خدمات، گارانتی و پشتیبانی",
      subtitle: "از مشاوره و نصب تا گارانتی رسمی و پشتیبانی فنی — در تمام مراحل پروژه در کنار شما هستیم.",
      cards: [
        { title: "مشاوره و طراحی", desc: "بررسی بار مصرفی، انتخاب ظرفیت مناسب و طراحی سیستم ذخیره‌سازی.", tag: "مهندسی" },
        { title: "نصب و راه‌اندازی", desc: "نصب استاندارد، تست بار و آموزش اپراتور در محل پروژه.", tag: "اجرا" },
        { title: "گارانتی و پشتیبانی", desc: "گارانتی رسمی محصول، قطعات یدکی و پشتیبانی فنی ۲۴/۷.", tag: "پس از فروش" },
      ],
      cta: "ثبت کد گارانتی دستگاه",
    },
    certificates: {
      badge: "کیفیت و استاندارد",
      title: "گواهی‌ها و استانداردها UBETTER",
      subtitle: "محصولات UBETTER با بالاترین استانداردهای بین‌المللی تست و تأیید شده‌اند.",
      cards: [
        { title: "ISO 9001", desc: "مدیریت کیفیت تولید و فرآیندهای سازمانی." },
        { title: "CE / UL", desc: "انطباق با الزامات ایمنی و بازار اروپا و آمریکا." },
        { title: "IEC 62619", desc: "استاندارد ایمنی باتری‌های لیتیوم صنعتی." },
        { title: "UN38.3", desc: "گواهی حمل و نقل ایمن باتری‌های لیتیوم." },
        { title: "RoHS", desc: "محدودیت مواد خطرناک در تولید الکترونیک." },
        { title: "ثبت اختراع", desc: "بیش از ۶۰ ثبت اختراع در فناوری BMS و ESS." },
      ],
    },
    projects: {
      badge: "نمونه کارها",
      title: "پروژه‌ها و نمونه کاربردها",
      subtitle: "",
      cards: [
        { title: "خانگی و اداری — ALL IN ONE", desc: "ذخیره‌سازی ALL IN ONE انرژی برای پروژه‌های سبک", tag: "سبک" },
        { title: "خانگی و اداری", desc: "ذخیره‌سازی انرژی برای پروژه‌های سبک", tag: "سبک" },
        { title: "تجاری", desc: "ذخیره‌سازی انرژی برای پروژه‌های متوسط", tag: "متوسط" },
        { title: "صنعتی", desc: "ذخیره‌سازی انرژی برای پروژه‌های بزرگ", tag: "بزرگ" },
      ],
    },
    articles: {
      badge: "دانش فنی",
      title: "مقالات و آموزش",
      subtitle: "راهنماهای فنی، مقایسه محصولات و نکات نگهداری سیستم‌های ذخیره‌سازی.",
      cards: [
        { title: "انتخاب ظرفیت ذخیره‌ساز", desc: "چگونه بار مصرفی را محاسبه و ذخیره‌ساز انرژی مناسب انتخاب کنیم.", tag: "راهنما" },
        { title: "LiFePO4 در مقابل NMC", desc: "مقایسه شیمی باتری برای کاربردهای مختلف.", tag: "مقایسه" },
        { title: "نگهداری ESS", desc: "چک‌لیست سرویس دوره‌ای و افزایش عمر باتری.", tag: "نگهداری" },
      ],
      cta: "به‌زودی",
    },
    catalog: {
      badge: "منابع محصول",
      title: "دانلود کاتالوگ",
      subtitle: "کاتالوگ کامل محصولات ذخیره‌ساز انرژی UBETTER",
      cards: [],
      cta: "دانلود کاتالوگ",
    },
    contact: {
      badge: "ارتباط با ما",
      title: "تماس با ما",
      subtitle: "برای مشاوره رایگان، پیش‌فاکتور یا همکاری — با تیم فروش و مهندسی در تماس باشید.",
      cards: [
        { title: "دفتر تهران", desc: "نمایندگی رسمی · لیان صدر ملل", tag: "ایران" },
        { title: "info@ubetterenergy.com", desc: "پاسخ در کمتر از ۲۴ ساعت کاری.", tag: "ایمیل" },
        { title: "+98 912 000 0000", desc: "پشتیبانی فروش و فنی.", tag: "تلفن" },
      ],
      cta: "دریافت پیش‌فاکتور رایگان",
      formTitle: "ارسال درخواست",
      fields: {
        name: "نام",
        email: "ایمیل",
        phone: "تلفن",
        company: "شرکت",
        message: "پیام",
        send: "ارسال",
      },
      channels: [],
    },
  },
  en: {
    services: {
      badge: "Services & Support",
      title: "Services, Warranty & Support",
      subtitle: "From consultation and installation to official warranty and technical support — we are with you at every stage.",
      cards: [
        { title: "Consulting & Design", desc: "Load analysis, capacity sizing, and ESS system design.", tag: "Engineering" },
        { title: "Installation & Commissioning", desc: "Standard installation, load testing, and on-site operator training.", tag: "Deployment" },
        { title: "Warranty & Support", desc: "Official product warranty, spare parts, and 24/7 technical support.", tag: "After-sales" },
      ],
      cta: "Submit your device warranty code",
    },
    certificates: {
      badge: "Quality & Standards",
      title: "UBETTER Certificates & Standards",
      subtitle: "UBETTER products are tested and certified to the highest international standards.",
      cards: [
        { title: "ISO 9001", desc: "Quality management for production and organizational processes." },
        { title: "CE / UL", desc: "Safety compliance for European and North American markets." },
        { title: "IEC 62619", desc: "Industrial lithium battery safety standard." },
        { title: "UN38.3", desc: "Safe transport certification for lithium batteries." },
        { title: "RoHS", desc: "Restriction of hazardous substances in electronics." },
        { title: "Patents", desc: "60+ patents in BMS and ESS technology." },
      ],
    },
    projects: {
      badge: "Case Studies",
      title: "Projects & Applications",
      subtitle: "",
      cards: [
        { title: "Residential & Office — ALL IN ONE", desc: "ALL-in-ONE energy storage for light projects", tag: "Light" },
        { title: "Residential & Office", desc: "Energy storage for light projects", tag: "Light" },
        { title: "Commercial", desc: "Energy storage for medium-scale projects", tag: "Medium" },
        { title: "Industrial", desc: "Energy storage for large-scale projects", tag: "Large" },
      ],
    },
    articles: {
      badge: "Knowledge Base",
      title: "Articles & Learning",
      subtitle: "Technical guides, product comparisons, and ESS maintenance best practices.",
      cards: [
        { title: "Choosing ESS Capacity", desc: "How to calculate load and select the right energy storage system.", tag: "Guide" },
        { title: "LiFePO4 vs NMC", desc: "Battery chemistry comparison for different applications.", tag: "Compare" },
        { title: "ESS Maintenance", desc: "Periodic service checklist and battery life tips.", tag: "Care" },
      ],
      cta: "Coming Soon",
    },
    catalog: {
      badge: "Product Resources",
      title: "Download Catalog",
      subtitle: "Complete UBETTER smart energy storage product catalog",
      cards: [],
      cta: "Download Catalog",
    },
    contact: {
      badge: "Get in Touch",
      title: "Contact Us",
      subtitle: "For a free consultation, quotation, or partnership — reach our sales and engineering team.",
      cards: [
        { title: "Tehran Office", desc: "Official representative · Lian Sadr Mellal", tag: "Iran" },
        { title: "info@ubetterenergy.com", desc: "Response within one business day.", tag: "Email" },
        { title: "+98 912 000 0000", desc: "Sales and technical support.", tag: "Phone" },
      ],
      cta: "Get Free Quote",
      formTitle: "Send an Inquiry",
      fields: {
        name: "Name",
        email: "Email",
        phone: "Phone",
        company: "Company",
        message: "Message",
        send: "Send",
      },
      channels: [],
    },
  },
  zh: {
    services: {
      badge: "服务与支持",
      title: "服务、保修与技术支持",
      subtitle: "从咨询设计、安装调试到官方保修与技术支持 — 全程陪伴您的项目。",
      cards: [
        { title: "咨询与设计", desc: "负载分析、容量选型与储能系统方案设计。", tag: "工程" },
        { title: "安装与调试", desc: "标准安装、带载测试及现场操作培训。", tag: "实施" },
        { title: "保修与支持", desc: "官方产品保修、备件供应与 7×24 技术支持。", tag: "售后" },
      ],
      cta: "提交设备保修码",
    },
    certificates: {
      badge: "质量与标准",
      title: "UBETTER 认证与标准",
      subtitle: "UBETTER 产品通过国际最高标准测试与认证。",
      cards: [
        { title: "ISO 9001", desc: "生产与组织流程质量管理体系。" },
        { title: "CE / UL", desc: "满足欧美市场安全合规要求。" },
        { title: "IEC 62619", desc: "工业锂电池安全标准。" },
        { title: "UN38.3", desc: "锂电池安全运输认证。" },
        { title: "RoHS", desc: "电子产品有害物质限制。" },
        { title: "专利", desc: "BMS 与 ESS 领域 60+ 项专利。" },
      ],
    },
    projects: {
      badge: "案例",
      title: "项目与应用场景",
      subtitle: "",
      cards: [
        { title: "家用与办公 — 一体机", desc: "ALL IN ONE 储能，适用于轻型项目", tag: "轻型" },
        { title: "家用与办公", desc: "储能系统，适用于轻型项目", tag: "轻型" },
        { title: "商业", desc: "储能系统，适用于中型项目", tag: "中型" },
        { title: "工业", desc: "储能系统，适用于大型项目", tag: "大型" },
      ],
    },
    articles: {
      badge: "技术知识",
      title: "文章与教程",
      subtitle: "技术指南、产品对比及储能系统维护要点。",
      cards: [
        { title: "储能容量选型", desc: "如何计算负载并选择合适的储能系统。", tag: "指南" },
        { title: "LiFePO4 与 NMC", desc: "不同应用场景下的电芯化学对比。", tag: "对比" },
        { title: "ESS 维护", desc: "定期巡检清单与电池寿命提升建议。", tag: "维护" },
      ],
      cta: "即将推出",
    },
    catalog: {
      badge: "产品资料",
      title: "下载产品目录",
      subtitle: "UBETTER 智能储能完整产品目录",
      cards: [],
      cta: "下载产品目录",
    },
    contact: {
      badge: "联系我们",
      title: "联系我们",
      subtitle: "免费咨询、报价或合作洽谈 — 欢迎联系销售与工程团队。",
      cards: [
        { title: "德黑兰办事处", desc: "官方代表 · Lian Sadr Mellal", tag: "伊朗" },
        { title: "info@ubetterenergy.com", desc: "一个工作日内回复。", tag: "邮箱" },
        { title: "+98 912 000 0000", desc: "销售与技术支持热线。", tag: "电话" },
      ],
      cta: "获取免费报价",
      formTitle: "发送询价",
      fields: {
        name: "姓名",
        email: "邮箱",
        phone: "电话",
        company: "公司",
        message: "留言",
        send: "发送",
      },
      channels: [],
    },
  },
  de: {
    services: {
      badge: "Service & Support",
      title: "Service, Garantie & Support",
      subtitle: "Von Beratung und Installation bis Garantie und technischem Support — wir begleiten Ihr Projekt.",
      cards: [
        { title: "Beratung & Planung", desc: "Lastanalyse, Kapazitätsauslegung und ESS-Systemdesign.", tag: "Engineering" },
        { title: "Installation & Inbetriebnahme", desc: "Standardinstallation, Lasttest und Schulung vor Ort.", tag: "Deployment" },
        { title: "Garantie & Support", desc: "Offizielle Produktgarantie, Ersatzteile und 24/7-Support.", tag: "After-sales" },
      ],
      cta: "Garantiecode einreichen",
    },
    certificates: {
      badge: "Qualität & Standards",
      title: "UBETTER Zertifikate & Standards",
      subtitle: "UBETTER-Produkte werden nach höchsten internationalen Standards geprüft und zertifiziert.",
      cards: [
        { title: "ISO 9001", desc: "Qualitätsmanagement für Produktion und Organisation." },
        { title: "CE / UL", desc: "Sicherheitskonformität für europäische und nordamerikanische Märkte." },
        { title: "IEC 62619", desc: "Sicherheitsstandard für industrielle Lithiumbatterien." },
        { title: "UN38.3", desc: "Transportzertifizierung für Lithiumbatterien." },
        { title: "RoHS", desc: "Beschränkung gefährlicher Stoffe in Elektronik." },
        { title: "Patente", desc: "60+ Patente in BMS- und ESS-Technologie." },
      ],
    },
    projects: {
      badge: "Referenzen",
      title: "Projekte & Anwendungen",
      subtitle: "",
      cards: [
        { title: "Wohnen & Büro — ALL IN ONE", desc: "ALL-in-ONE-Energiespeicher für leichte Projekte", tag: "Leicht" },
        { title: "Wohnen & Büro", desc: "Energiespeicher für leichte Projekte", tag: "Leicht" },
        { title: "Gewerbe", desc: "Energiespeicher für mittlere Projekte", tag: "Mittel" },
        { title: "Industrie", desc: "Energiespeicher für große Projekte", tag: "Groß" },
      ],
    },
    articles: {
      badge: "Wissensbasis",
      title: "Artikel & Lernen",
      subtitle: "Technische Leitfäden, Produktvergleiche und ESS-Wartung.",
      cards: [
        { title: "ESS-Kapazität wählen", desc: "Last berechnen und das passende Energiespeichersystem wählen.", tag: "Leitfaden" },
        { title: "LiFePO4 vs NMC", desc: "Batteriechemie-Vergleich für verschiedene Anwendungen.", tag: "Vergleich" },
        { title: "ESS-Wartung", desc: "Checkliste für periodische Wartung und längere Batterielebensdauer.", tag: "Pflege" },
      ],
      cta: "Demnächst",
    },
    catalog: {
      badge: "Produktressourcen",
      title: "Katalog herunterladen",
      subtitle: "Vollständiger UBETTER-Katalog für intelligente Energiespeicher",
      cards: [],
      cta: "Katalog herunterladen",
    },
    contact: {
      badge: "Kontakt",
      title: "Kontakt",
      subtitle: "Kostenlose Beratung, Angebot oder Partnerschaft — kontaktieren Sie unser Team.",
      cards: [
        { title: "Teheran Büro", desc: "Offizieller Vertreter · Lian Sadr Mellal", tag: "Iran" },
        { title: "info@ubetterenergy.com", desc: "Antwort innerhalb eines Werktags.", tag: "E-Mail" },
        { title: "+98 912 000 0000", desc: "Vertrieb und technischer Support.", tag: "Telefon" },
      ],
      cta: "Kostenloses Angebot",
      formTitle: "Anfrage senden",
      fields: {
        name: "Name",
        email: "E-Mail",
        phone: "Telefon",
        company: "Firma",
        message: "Nachricht",
        send: "Senden",
      },
      channels: [],
    },
  },
};
