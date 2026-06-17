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
  about: { paragraphs: string[] };
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
      paragraphs: [
        "UBETTER TECHNOLOGY COMPANY LIMITED, founded in China in 2013, is a specialized provider of integrated energy storage solutions and lithium batteries, with a focus on R&D, smart manufacturing, sales, and after-sales services. Through years of effective presence in the new energy industry, advanced technologies, and product development aligned with contemporary standards, the company has established a notable position in international markets.",
        "A key advantage of UBETTER is access to technology licensed from Germany, combined with R&D capabilities in two major industrial centers: China and Germany. Offices and R&D centers in both countries enable the brand to unite engineering precision, industrial innovation, and smart manufacturing — delivering products competitive in safety, stability, lifespan, technical design, and reliability.",
        "In this context, Lian Sadr Melal serves as the official and exclusive representative of UBETTER in Iran, responsible for presenting the brand's products, solutions, and services in the Iranian market as a reliable bridge between this advanced global technology and domestic customers. The goal of this partnership is to deliver safe, reliable, and economical energy storage solutions for residential, office, commercial, and industrial applications.",
        "UBETTER has earned recognition including Guangdong Province's top brand, Shenzhen famous brand, and renowned brand in the Guangdong–Hong Kong–Macao Greater Bay Area. The company holds national certifications as a specialized, innovative, and leading enterprise and is recognized as a national high-tech enterprise in China. With numerous patents and comprehensive management systems covering quality, environment, occupational health and safety, and energy management, it has built reliable infrastructure for advanced and sustainable production. Leveraging strong R&D, large-scale smart manufacturing, and an integrated supply chain, UBETTER products are widely used across new energy storage, medical equipment, security and surveillance systems, rail infrastructure, power tools, aerospace, energy, and telecommunications. These products are recognized as reliable solutions for energy supply and management with high safety, stable performance, long lifespan, smart design, and adaptability to diverse needs.",
        "Along this path, Lian Sadr Melal, leveraging UBETTER's technical support and products, is committed to providing safe, sustainable, and competitive energy storage solutions in the Iranian market. This collaboration aims to enhance energy security, reduce dependence on unreliable grid power, promote clean energy use, and enable a low-carbon future. UBETTER consistently adheres to principles of customer focus, quality orientation, innovation, and sustainable development, seeking continuous industry advancement and global expansion — while Lian Sadr Melal, as the sole official and exclusive representative of this brand in Iran, strives to realize this vision in the domestic market.",
      ],
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
      paragraphs: [
        "شرکت UBETTER TECHNOLOGY COMPANY LIMITED که در سال 2013 در چین تأسیس شده است، به‌عنوان یکی از ارائه‌دهندگان تخصصی راهکارهای یکپارچه ذخیره‌سازهای انرژی و باتری‌های لیتیومی، فعالیت خود را در حوزه R&D، تولید هوشمند، فروش و خدمات پس از فروش متمرکز کرده است. این شرکت با سال‌ها حضور مؤثر در صنعت انرژی‌های نو، برخورداری از فناوری‌های پیشرفته و توسعه محصولات مبتنی بر استانداردهای روز، توانسته جایگاه قابل توجهی در بازارهای بین‌المللی به دست آورد.",
        "یکی از مزیت‌های مهم UBETTER بهره‌مندی از فناوری تحت لیسانس تکنولوژی آلمان و برخورداری از ظرفیت‌های تحقیق و توسعه در دو مرکز مهم صنعتی، یعنی چین و آلمان است. وجود دفاتر و مراکز R&D در این دو کشور، امکان تلفیق دقت مهندسی، نوآوری صنعتی و توان تولید هوشمند را برای این برند فراهم کرده و موجب شده محصولات آن از نظر ایمنی، پایداری، طول عمر، طراحی فنی و قابلیت اطمینان در سطحی رقابتی عرضه شوند.",
        "در همین راستا، شرکت لیان صدر ملل به‌عنوان نماینده رسمی و انحصاری UBETTER در ایران، مسئولیت ارائه محصولات، راهکارها و خدمات این برند را در بازار ایران بر عهده دارد و به‌عنوان پل ارتباطی مطمئن میان این فناوری پیشرفته جهانی و مشتریان داخلی فعالیت می‌کند. هدف این همکاری، عرضه راهکارهایی مطمئن، ایمن و اقتصادی در حوزه ذخیره‌سازی انرژی برای مصارف خانگی، اداری، تجاری و صنعتی است.",
        "شرکت UBETTER موفق به کسب عناوینی نظیر برند برتر استان گوانگدونگ، برند مطرح شنژن و برند شناخته‌شده منطقه خلیج بزرگ گوانگدونگ–هنگ‌کنگ–ماکائو شده است. همچنین این شرکت دارای گواهی «شرکت‌های تخصصی، نوآور و پیشرو» در سطح ملی بوده و به‌عنوان یک شرکت دانش‌بنیان ملی در چین نیز شناخته می‌شود. این مجموعه با در اختیار داشتن ثبت اختراع‌های متعدد و پیاده‌سازی سیستم‌های مدیریتی جامع در حوزه کیفیت، محیط زیست، ایمنی، سلامت شغلی و مدیریت انرژی، زیرساختی قابل اعتماد برای تولید محصولات پیشرفته و پایدار ایجاد کرده است. با تکیه بر توانمندی‌های قوی در تحقیق و توسعه، تولید هوشمند در مقیاس بزرگ و زنجیره تأمین یکپارچه، محصولات و راهکارهای UBETTER در حوزه‌های کلیدی از جمله ذخیره‌سازی انرژی‌های نو، تجهیزات پزشکی، سیستم‌های امنیتی و نظارتی، زیرساخت‌های ریلی، ابزارهای قدرت، صنایع هوافضا، انرژی و مخابرات به‌طور گسترده مورد استفاده قرار گرفته‌اند. این محصولات با برخورداری از ایمنی بالا، پایداری عملکرد، طول عمر طولانی، طراحی هوشمند و سازگاری با نیازهای متنوع مصرف‌کنندگان، به‌عنوان راهکاری قابل اعتماد برای تأمین و مدیریت انرژی شناخته می‌شوند.",
        "در همین مسیر، شرکت لیان صدر ملل با بهره‌گیری از پشتیبانی فنی و محصولات UBETTER، متعهد به ارائه راهکارهای ایمن، پایدار و رقابتی در حوزه ذخیره‌سازی انرژی در بازار ایران است. این همکاری با هدف افزایش امنیت انرژی، کاهش وابستگی به برق ناپایدار، توسعه استفاده از انرژی‌های پاک و فراهم‌سازی آینده‌ای کم‌کربن شکل گرفته است. UBETTER همواره با پایبندی به اصول «مشتری‌مداری»، «کیفیت‌محوری»، «نوآوری» و «توسعه پایدار» به دنبال ارتقای مستمر صنعت و گسترش حضور جهانی خود بوده و شرکت لیان صدر ملل به‌عنوان تنها نماینده رسمی و انحصاری این برند در ایران، تلاش می‌کند این چشم‌انداز را در بازار داخلی محقق سازد.",
      ],
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
      paragraphs: [
        "UBETTER TECHNOLOGY COMPANY LIMITED 成立于 2013 年，总部位于中国，是储能与锂电池一体化解决方案的专业提供商，专注于研发、智能制造、销售及售后服务。凭借在新能源行业多年的深耕、先进技术以及符合当代标准的产品开发，公司已在国际市场占据重要地位。",
        "UBETTER 的重要优势之一是采用德国技术授权，并在中国与德国两大工业中心拥有研发能力。两国办公与研发中心使品牌能够融合工程精度、工业创新与智能制造实力，产品在安全性、稳定性、寿命、技术设计与可靠性方面具备竞争力。",
        "在此背景下，Lian Sadr Melal 作为 UBETTER 在伊朗的官方独家代表，负责该品牌产品、方案与服务在伊朗市场的推广，是连接全球先进技术与国内客户的可靠桥梁。此次合作旨在为家庭、办公、商业及工业应用提供安全、可靠、经济的储能解决方案。",
        "UBETTER 荣获广东省名牌、深圳知名品牌及粤港澳大湾区知名品牌等称号，并拥有国家级「专精特新」企业资质，被认定为中国国家高新技术企业。公司持有众多专利，并建立涵盖质量、环境、职业健康安全与能源管理的综合管理体系，为先进、可持续生产奠定可靠基础。依托强大的研发能力、大规模智能制造与一体化供应链，UBETTER 产品广泛应用于新能源储能、医疗设备、安防监控、轨道交通、电动工具、航空航天、能源与通信等领域，以高安全性、稳定性能、长寿命、智能设计与多样化适配能力，成为可靠的供能与能源管理方案。",
        "在此进程中，Lian Sadr Melal 借助 UBETTER 的技术支持与产品，致力于在伊朗市场提供安全、可持续、具竞争力的储能方案。双方合作旨在提升能源安全、降低对不稳定电网的依赖、推动清洁能源应用并迈向低碳未来。UBETTER 始终秉持「客户至上」「质量为本」「创新」与「可持续发展」理念，持续推动产业升级与全球拓展；Lian Sadr Melal 作为该品牌在伊朗唯一官方独家代表，致力于在国内市场实现这一愿景。",
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
      paragraphs: [
        "UBETTER TECHNOLOGY COMPANY LIMITED wurde 2013 in China gegründet und ist ein spezialisierter Anbieter integrierter Energiespeicherlösungen und Lithiumbatterien mit Fokus auf F&E, intelligente Fertigung, Vertrieb und Kundendienst. Durch langjährige Präsenz in der Neue-Energien-Branche, fortschrittliche Technologien und produktentwicklung nach aktuellen Standards hat das Unternehmen eine beachtliche Position auf internationalen Märkten erreicht.",
        "Ein wesentlicher Vorteil von UBETTER ist die Nutzung deutsch lizenzierter Technologie sowie F&E-Kapazitäten in zwei wichtigen Industriezentren: China und Deutschland. Büros und F&E-Zentren in beiden Ländern ermöglichen die Verbindung von Ingenieurpräzision, industrieller Innovation und intelligenter Fertigung — Produkte überzeugen in Sicherheit, Stabilität, Lebensdauer, technischem Design und Zuverlässigkeit.",
        "In diesem Zusammenhang ist Lian Sadr Melal der offizielle und exklusive Vertreter von UBETTER im Iran und verantwortlich für Produkte, Lösungen und Dienstleistungen der Marke auf dem iranischen Markt als verlässliche Brücke zwischen globaler Spitzentechnologie und inländischen Kunden. Ziel der Partnerschaft sind sichere, zuverlässige und wirtschaftliche Speicherlösungen für Wohn-, Büro-, Gewerbe- und Industrieanwendungen.",
        "UBETTER wurde u. a. als Top-Marke der Provinz Guangdong, als Shenzhen-Bekanntheitsmarke und als Marke im Großraum Guangdong–Hongkong–Macau ausgezeichnet. Das Unternehmen verfügt über nationale Zertifizierungen als spezialisiertes, innovatives und führendes Unternehmen und gilt als nationales High-Tech-Unternehmen in China. Mit zahlreichen Patenten und umfassenden Managementsystemen für Qualität, Umwelt, Arbeitsschutz und Energiemanagement schafft es eine verlässliche Infrastruktur für fortschrittliche und nachhaltige Produktion. Dank starker F&E, großskaliger intelligenter Fertigung und integrierter Lieferkette werden UBETTER-Produkte breit in Bereichen wie Neue-Energien-Speicher, Medizintechnik, Sicherheits- und Überwachungssysteme, Schieneninfrastruktur, Elektrowerkzeuge, Luft- und Raumfahrt, Energie und Telekommunikation eingesetzt — als verlässliche Lösungen für Energieversorgung und -management mit hoher Sicherheit, stabiler Leistung, langer Lebensdauer, intelligentem Design und vielfältiger Anpassungsfähigkeit.",
        "Auf diesem Weg verpflichtet sich Lian Sadr Melal, mit technischer Unterstützung und Produkten von UBETTER sichere, nachhaltige und wettbewerbsfähige Speicherlösungen auf dem iranischen Markt anzubieten. Die Zusammenarbeit zielt auf mehr Energiesicherheit, geringere Abhängigkeit von instabilem Netzstrom, den Ausbau sauberer Energie und eine kohlenstoffarme Zukunft. UBETTER folgt konsequent den Prinzipien Kundenorientierung, Qualitätsfokus, Innovation und nachhaltige Entwicklung — Lian Sadr Melal als einziger offizieller und exklusiver Vertreter der Marke im Iran arbeitet daran, diese Vision auf dem Inlandsmarkt zu verwirklichen.",
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
