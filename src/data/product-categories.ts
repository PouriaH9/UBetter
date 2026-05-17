import type { Locale } from "@/i18n/config";

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

// ─── Product catalog lookup (global 1..N productNum) ───────────────────────────

export interface ProductEntry {
  productNum: number;
  category: ProductCategory;
  product: Product;
}

export function getAllProductEntries(): ProductEntry[] {
  const out: ProductEntry[] = [];
  let n = 0;
  for (const category of CATEGORIES) {
    for (const product of category.products) {
      n += 1;
      out.push({ productNum: n, category, product });
    }
  }
  return out;
}

export function getProductEntryByNum(productNum: number): ProductEntry | null {
  if (!Number.isFinite(productNum) || productNum < 1) return null;
  let n = 0;
  for (const category of CATEGORIES) {
    for (const product of category.products) {
      n += 1;
      if (n === productNum) return { productNum, category, product };
    }
  }
  return null;
}
