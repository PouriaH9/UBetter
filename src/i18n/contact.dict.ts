import type { Locale } from "@/i18n/config";

export type ContactPhone = {
  number: string;
  label: string;
  href: string;
};

export type ContactAddress = {
  label: string;
  value: string;
};

export type ContactPageCopy = {
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  title: string;
  intro: string;
  phones: ContactPhone[];
  officePhone: ContactPhone;
  addresses: ContactAddress[];
  email: string;
  emailLabel: string;
};

const SHENZHEN =
  "Room 401/501, Building G, Junxuan Industrial Park, No 16, Yinkui Road, Kuixin Community, Kuichong Street, Dapeng New District, Shenzhen City, Guangdong Province, China.";

const HUIZHOU =
  "No. 1 Factory Building, 45 Guantian Avenue, Liangjing Town, Huiyang District, Huizhou City, Guangdong Province, China.";

const TABRIZ = "تبریز، شهرک شهید رجایی، سی متری دوم، بیست متری دوم غربی";

export const contactPageCopy: Record<Locale, ContactPageCopy> = {
  fa: {
    breadcrumbHome: "خانه",
    breadcrumbCurrent: "تماس با ما",
    title: "تماس با ما",
    intro: "برای مشاوره تخصصی و انتخاب ذخیره‌ساز انرژی راهنمایی‌تان می‌کنیم. شماره:",
    phones: [
      { number: "09333401555", label: "مشاوره تخصصی و فروش", href: "tel:+989333401555" },
      { number: "09333402555", label: "مشاوره تخصصی و فروش", href: "tel:+989333402555" },
      { number: "09333403555", label: "خدمات پس از فروش", href: "tel:+989333403555" },
    ],
    officePhone: { number: "02188547867", label: "تلفن تماس دفتر", href: "tel:+982188547867" },
    addresses: [
      { label: "آدرس دفتر", value: TABRIZ },
      { label: "آدرس کارخانه شنزن", value: SHENZHEN },
      { label: "آدرس کارخانه هویژو", value: HUIZHOU },
    ],
    email: "info@ubetterenergy.ir",
    emailLabel: "ایمیل",
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Contact",
    title: "Contact Us",
    intro:
      "We guide you through expert consultation and choosing the right energy storage system. Phone numbers:",
    phones: [
      { number: "09333401555", label: "Expert sales consultation", href: "tel:+989333401555" },
      { number: "09333402555", label: "Expert sales consultation", href: "tel:+989333402555" },
      { number: "09333403555", label: "After-sales service", href: "tel:+989333403555" },
    ],
    officePhone: { number: "02188547867", label: "Office phone", href: "tel:+982188547867" },
    addresses: [
      { label: "Office address", value: TABRIZ },
      { label: "Shenzhen factory", value: SHENZHEN },
      { label: "Huizhou factory", value: HUIZHOU },
    ],
    email: "info@ubetterenergy.ir",
    emailLabel: "Email",
  },
  zh: {
    breadcrumbHome: "首页",
    breadcrumbCurrent: "联系我们",
    title: "联系我们",
    intro: "我们为您提供专业咨询，帮助您选择合适的储能系统。联系电话：",
    phones: [
      { number: "09333401555", label: "专业销售咨询", href: "tel:+989333401555" },
      { number: "09333402555", label: "专业销售咨询", href: "tel:+989333402555" },
      { number: "09333403555", label: "售后服务", href: "tel:+989333403555" },
    ],
    officePhone: { number: "02188547867", label: "办公室电话", href: "tel:+982188547867" },
    addresses: [
      { label: "办公室地址", value: TABRIZ },
      { label: "深圳工厂地址", value: SHENZHEN },
      { label: "惠州工厂地址", value: HUIZHOU },
    ],
    email: "info@ubetterenergy.ir",
    emailLabel: "邮箱",
  },
  de: {
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Kontakt",
    title: "Kontakt",
    intro:
      "Wir beraten Sie fachkundig bei der Auswahl des passenden Energiespeichers. Telefonnummern:",
    phones: [
      { number: "09333401555", label: "Fachberatung & Vertrieb", href: "tel:+989333401555" },
      { number: "09333402555", label: "Fachberatung & Vertrieb", href: "tel:+989333402555" },
      { number: "09333403555", label: "Kundendienst", href: "tel:+989333403555" },
    ],
    officePhone: { number: "02188547867", label: "Bürotelefon", href: "tel:+982188547867" },
    addresses: [
      { label: "Büroadresse", value: TABRIZ },
      { label: "Werk Shenzhen", value: SHENZHEN },
      { label: "Werk Huizhou", value: HUIZHOU },
    ],
    email: "info@ubetterenergy.ir",
    emailLabel: "E-Mail",
  },
};
