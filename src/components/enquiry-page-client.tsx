"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import SharedNavbar from "@/components/shared-navbar";
import { useCart } from "@/contexts/cart-context";
import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";
import { PRODUCT_IMAGES } from "@/assets/productImages";
import type { Locale } from "@/i18n/config";
import { localeDir, ui3 } from "@/i18n/locale-ui";

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";
const easeOut = [0.22, 1, 0.36, 1] as const;

type FormData = {
  fullName: string;
  company: string;
  phone: string;
  email: string;
  province: string;
  city: string;
  buildingType: string;
  capacity: string;
  timeline: string;
  budget: string;
  notes: string;
};

const INITIAL: FormData = {
  fullName: "", company: "", phone: "", email: "",
  province: "", city: "", buildingType: "", capacity: "",
  timeline: "", budget: "", notes: "",
};

const BUILDING_TYPES: Record<Locale, string[]> = {
  fa: ["مسکونی (آپارتمان/ویلا)", "تجاری (دفتر/مرکز خرید)", "صنعتی (کارخانه/انبار)", "کشاورزی", "پروژه زیرساختی", "سایر"],
  en: ["Residential (Apartment/Villa)", "Commercial (Office/Mall)", "Industrial (Factory/Warehouse)", "Agricultural", "Infrastructure Project", "Other"],
  zh: ["住宅（公寓/别墅）", "商业（写字楼/商场）", "工业（工厂/仓库）", "农业", "基础设施项目", "其他"],
  de: ["Wohnen (Wohnung/Villa)", "Gewerbe (Büro/Einkaufszentrum)", "Industrie (Fabrik/Lager)", "Landwirtschaft", "Infrastrukturprojekt", "Sonstiges"],
};

const TIMELINES: Record<Locale, string[]> = {
  fa: ["فوری (۱–۳ ماه)", "کوتاه مدت (۳–۶ ماه)", "میان مدت (۶–۱۲ ماه)", "بلند مدت (بیش از ۱ سال)"],
  en: ["Urgent (1–3 months)", "Short-term (3–6 months)", "Mid-term (6–12 months)", "Long-term (1+ year)"],
  zh: ["紧急（1–3 个月）", "短期（3–6 个月）", "中期（6–12 个月）", "长期（一年以上）"],
  de: ["Dringend (1–3 Monate)", "Kurzfristig (3–6 Monate)", "Mittelfristig (6–12 Monate)", "Langfristig (1+ Jahr)"],
};

const BUDGETS: Record<Locale, string[]> = {
  fa: ["زیر ۵۰۰ میلیون تومان", "۵۰۰ میلیون – ۲ میلیارد", "۲ – ۵ میلیارد", "بیش از ۵ میلیارد", "نیاز به مشاوره دارم"],
  en: ["Under $10K", "$10K – $50K", "$50K – $150K", "Over $150K", "Need consultation"],
  zh: ["10 万元人民币以下", "10–50 万元", "50–150 万元", "150 万元以上", "需要咨询"],
  de: ["Unter 10.000 €", "10.000 – 50.000 €", "50.000 – 150.000 €", "Über 150.000 €", "Beratung gewünscht"],
};

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-semibold tracking-wide" style={{ fontFamily: YK }}>
        {label}{required && <span className="text-red-400 mr-1">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function EnquiryPageClient({ locale }: { locale: Locale }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const { items, totalQty, removeItem, clearCart } = useCart();
  const isRTL = locale === "fa";
  const dir = localeDir(locale);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const tx = (s: { fa: string; en: string; zh?: string; de?: string }) => {
    if (locale === "fa") return s.fa;
    if (locale === "zh") return s.zh ?? s.en;
    if (locale === "de") return s.de ?? s.en;
    return s.en;
  };

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.fullName.trim()) e.fullName = ui3(locale, "نام الزامی است", "Name is required", "请填写姓名");
    if (!form.phone.trim()) e.phone = ui3(locale, "شماره تماس الزامی است", "Phone is required", "请填写电话");
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = ui3(locale, "ایمیل نامعتبر است", "Invalid email", "邮箱格式不正确");
    if (!form.province.trim()) e.province = ui3(locale, "استان الزامی است", "Province is required", "请填写省/州");
    if (!form.buildingType) e.buildingType = ui3(locale, "نوع ساختمان الزامی است", "Building type is required", "请选择建筑/项目类型");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    clearCart();
  };

  const inputStyle = {
    background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
    color: C.text1,
    borderRadius: "12px",
    padding: "10px 14px",
    fontSize: "13px",
    fontFamily: YK,
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s",
  } as React.CSSProperties;

  const focusStyle = (key: keyof FormData) => ({
    ...inputStyle,
    borderColor: errors[key] ? "#ef4444" : (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"),
  });

  const selectEmpty = ui3(locale, "انتخاب کنید...", "Select...", "请选择…");

  if (submitted) {
    return (
      <div className="overflow-x-hidden min-h-screen flex flex-col" style={{ background: C.pageBg, color: C.text1 }} dir={dir}>
        <SharedNavbar locale={locale} />
        <div className="flex-1 flex items-center justify-center px-6 py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="flex flex-col items-center gap-6 text-center max-w-md"
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: C.accentBg, border: `2px solid ${C.accent}` }}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ color: C.accent }}>
                <path d="M8 18l7 7 13-13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="font-black text-[28px]" style={{ fontFamily: YK, color: C.text1 }}>
              {ui3(locale, "درخواست شما ثبت شد!", "Request Submitted!", "提交成功！")}
            </h2>
            <p style={{ color: C.text3, fontSize: "15px", lineHeight: 1.8, fontFamily: YK }}>
              {ui3(
                locale,
                "تیم کارشناسان لیان صدر ملل در اسرع وقت با شما تماس خواهند گرفت.",
                "Our team of experts will contact you as soon as possible.",
                "我们的专家将尽快与您联系。",
              )}
            </p>
            <Link href={`/${locale}/products`}
              className="mt-2 px-8 py-3 rounded-2xl font-bold text-[14px] transition-all duration-200 hover:scale-105"
              style={{ background: C.accent, color: isDark ? "#000" : "#fff", fontFamily: YK }}>
              {ui3(locale, "بازگشت به محصولات", "Back to Products", "返回产品页")}
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden min-h-screen" style={{ background: C.pageBg, color: C.text1, transition: "background 0.35s ease" }} dir={dir}>
      <SharedNavbar locale={locale} activePage="products" />

      <div className="max-w-[1100px] mx-auto px-6 sm:px-10 pt-28 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easeOut }} className="mb-10">
          <div className="flex items-center gap-2 mb-4 text-[12px]" style={{ color: C.text3 }}>
            <Link href={`/${locale}`} style={{ color: C.text3 }} className="transition-colors hover:text-white">{ui3(locale, "صفحه اصلی", "Home", "首页")}</Link>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={isRTL ? "rotate-180" : ""}><path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <Link href={`/${locale}/products`} style={{ color: C.text3 }} className="transition-colors hover:text-white">{ui3(locale, "محصولات", "Products", "产品")}</Link>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={isRTL ? "rotate-180" : ""}><path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ color: C.text1 }}>{ui3(locale, "ثبت درخواست", "Enquiry", "项目询价")}</span>
          </div>
          <h1 className="font-black mb-2" style={{ fontFamily: YK, fontSize: "clamp(24px, 3vw, 40px)", color: C.text1 }}>
            {ui3(locale, "ثبت درخواست پروژه", "Project Enquiry", "项目询价")}
          </h1>
          <p style={{ color: C.text3, fontSize: "14px", lineHeight: 1.8, fontFamily: YK }}>
            {ui3(
              locale,
              "اطلاعات پروژه خود را وارد کنید. کارشناسان ما پس از بررسی با شما تماس می‌گیرند.",
              "Fill in your project details. Our experts will review and get back to you shortly.",
              "请填写项目信息，我们将在审核后尽快与您联系。",
            )}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
              className="rounded-3xl p-6 sm:p-8 space-y-6"
              style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}` }}>

              <div>
                <p className={`text-[11px] font-black tracking-[0.18em] mb-4 ${locale === "zh" ? "" : "uppercase"}`} style={{ color: C.accent, fontFamily: YK }}>
                  {ui3(locale, "اطلاعات تماس", "Contact Information", "联系信息")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label={ui3(locale, "نام و نام خانوادگی", "Full Name", "姓名")} required>
                    <input value={form.fullName} onChange={set("fullName")} style={focusStyle("fullName")}
                      placeholder={ui3(locale, "مثال: علی محمدی", "e.g. John Smith", "例如：张三")}
                      onFocus={(e) => { e.target.style.borderColor = C.accent; }}
                      onBlur={(e) => { e.target.style.borderColor = errors.fullName ? "#ef4444" : (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"); }} />
                    {errors.fullName && <span className="text-[11px] text-red-400">{errors.fullName}</span>}
                  </Field>
                  <Field label={ui3(locale, "نام شرکت / سازمان", "Company / Organization", "公司 / 机构")}>
                    <input value={form.company} onChange={set("company")} style={inputStyle}
                      placeholder={ui3(locale, "اختیاری", "Optional", "选填")}
                      onFocus={(e) => { e.target.style.borderColor = C.accent; }}
                      onBlur={(e) => { e.target.style.borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"; }} />
                  </Field>
                  <Field label={ui3(locale, "شماره تماس", "Phone Number", "电话")} required>
                    <input value={form.phone} onChange={set("phone")} type="tel" style={focusStyle("phone")}
                      placeholder={ui3(locale, "مثال: ۰۹۱۲۰۰۰۰۰۰۰", "e.g. +86 138 0000 0000", "例如：+86 138 0000 0000")} dir="ltr"
                      onFocus={(e) => { e.target.style.borderColor = C.accent; }}
                      onBlur={(e) => { e.target.style.borderColor = errors.phone ? "#ef4444" : (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"); }} />
                    {errors.phone && <span className="text-[11px] text-red-400">{errors.phone}</span>}
                  </Field>
                  <Field label={ui3(locale, "ایمیل", "Email Address", "电子邮箱")}>
                    <input value={form.email} onChange={set("email")} type="email" style={focusStyle("email")}
                      placeholder="example@email.com" dir="ltr"
                      onFocus={(e) => { e.target.style.borderColor = C.accent; }}
                      onBlur={(e) => { e.target.style.borderColor = errors.email ? "#ef4444" : (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"); }} />
                    {errors.email && <span className="text-[11px] text-red-400">{errors.email}</span>}
                  </Field>
                </div>
              </div>

              <div style={{ height: "1px", background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />

              <div>
                <p className={`text-[11px] font-black tracking-[0.18em] mb-4 ${locale === "zh" ? "" : "uppercase"}`} style={{ color: C.accent, fontFamily: YK }}>
                  {ui3(locale, "موقعیت پروژه", "Project Location", "项目地点")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label={ui3(locale, "استان", "Province / State", "省/州")} required>
                    <input value={form.province} onChange={set("province")} style={focusStyle("province")}
                      placeholder={ui3(locale, "مثال: تهران", "e.g. Guangdong", "例如：广东省")}
                      onFocus={(e) => { e.target.style.borderColor = C.accent; }}
                      onBlur={(e) => { e.target.style.borderColor = errors.province ? "#ef4444" : (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"); }} />
                    {errors.province && <span className="text-[11px] text-red-400">{errors.province}</span>}
                  </Field>
                  <Field label={ui3(locale, "شهر", "City", "城市")}>
                    <input value={form.city} onChange={set("city")} style={inputStyle}
                      placeholder={ui3(locale, "مثال: تهران", "e.g. Shenzhen", "例如：深圳市")}
                      onFocus={(e) => { e.target.style.borderColor = C.accent; }}
                      onBlur={(e) => { e.target.style.borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"; }} />
                  </Field>
                </div>
              </div>

              <div style={{ height: "1px", background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />

              <div>
                <p className={`text-[11px] font-black tracking-[0.18em] mb-4 ${locale === "zh" ? "" : "uppercase"}`} style={{ color: C.accent, fontFamily: YK }}>
                  {ui3(locale, "جزئیات پروژه", "Project Details", "项目详情")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label={ui3(locale, "نوع ساختمان / پروژه", "Building / Project Type", "建筑/项目类型")} required>
                    <select value={form.buildingType} onChange={set("buildingType")} style={{ ...focusStyle("buildingType"), appearance: "none" as const }}>
                      <option value="">{selectEmpty}</option>
                      {BUILDING_TYPES[locale].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.buildingType && <span className="text-[11px] text-red-400">{errors.buildingType}</span>}
                  </Field>
                  <Field label={ui3(locale, "ظرفیت مورد نیاز (تقریبی)", "Required Capacity (approx.)", "所需容量（约）")}>
                    <input value={form.capacity} onChange={set("capacity")} style={inputStyle}
                      placeholder={ui3(locale, "مثال: ۱۰ کیلووات ساعت", "e.g. 10 kWh", "例如：10 kWh")}
                      onFocus={(e) => { e.target.style.borderColor = C.accent; }}
                      onBlur={(e) => { e.target.style.borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"; }} />
                  </Field>
                  <Field label={ui3(locale, "بازه زمانی اجرا", "Implementation Timeline", "实施周期")}>
                    <select value={form.timeline} onChange={set("timeline")} style={{ ...inputStyle, appearance: "none" as const }}>
                      <option value="">{selectEmpty}</option>
                      {TIMELINES[locale].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label={ui3(locale, "بودجه تقریبی", "Approximate Budget", "大致预算")}>
                    <select value={form.budget} onChange={set("budget")} style={{ ...inputStyle, appearance: "none" as const }}>
                      <option value="">{selectEmpty}</option>
                      {BUDGETS[locale].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <div className="mt-4">
                  <Field label={ui3(locale, "توضیحات تکمیلی", "Additional Notes", "补充说明")}>
                    <textarea value={form.notes} onChange={set("notes")} rows={4} style={{ ...inputStyle, resize: "vertical" }}
                      placeholder={ui3(
                        locale,
                        "هر اطلاعات اضافه‌ای که فکر می‌کنید مفید است...",
                        "Any additional information you think may be helpful...",
                        "您认为有帮助的任何补充信息……",
                      )}
                      onFocus={(e) => { e.target.style.borderColor = C.accent; }}
                      onBlur={(e) => { e.target.style.borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"; }} />
                  </Field>
                </div>
              </div>

              <motion.button type="submit" whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2.5 transition-all duration-200"
                style={{ background: C.accent, color: isDark ? "#000" : "#fff", fontFamily: YK }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {ui3(locale, "ارسال و ثبت نهایی درخواست", "Submit Project Enquiry", "提交询价")}
              </motion.button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
              className="rounded-3xl overflow-hidden sticky top-[100px]"
              style={{ border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}` }}>

              <div className="px-5 py-4 flex items-center justify-between"
                style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}` }}>
                <span className="font-bold text-[14px]" style={{ fontFamily: YK, color: C.text1 }}>
                  {ui3(locale, "محصولات انتخابی", "Selected Products", "已选产品")}
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: C.accentBg, color: C.accent, border: `1px solid ${C.accentBorder}` }}>
                  {totalQty} {ui3(locale, "عدد", "item(s)", "件")}
                </span>
              </div>

              <div className="divide-y" style={{ ['--tw-divide-opacity' as string]: 1 }}>
                <AnimatePresence initial={false}>
                  {items.length === 0 ? (
                    <div className="px-5 py-8 text-center" style={{ color: C.text3, fontFamily: YK, fontSize: "13px" }}>
                      {ui3(locale, "محصولی انتخاب نشده", "No products selected", "未选择产品")}
                    </div>
                  ) : items.map((item) => {
                    const img = PRODUCT_IMAGES[item.productNum] ?? null;
                    return (
                      <motion.div key={item.productNum}
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-3 px-5 py-4"
                        style={{ borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}` }}>
                        <div className="shrink-0 rounded-xl overflow-hidden flex items-center justify-center"
                          style={{ width: 52, height: 52, background: "#fff" }}>
                          {img ? (
                            <div className="relative w-full h-full">
                              <Image src={img} alt={tx(item.name)} fill sizes="52px" className="object-contain p-1" />
                            </div>
                          ) : (
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color: C.text3, opacity: 0.3 }}>
                              <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold line-clamp-2 leading-snug" style={{ fontFamily: YK, fontSize: "12px", color: C.text1 }}>{tx(item.name)}</p>
                          <p style={{ fontFamily: YK, fontSize: "10px", color: C.text3, marginTop: 2 }}>{tx(item.category)}</p>
                          <p className="font-bold mt-1" style={{ fontSize: "11px", color: C.accent, fontFamily: "'Inter', system-ui" }}>×{item.qty}</p>
                        </div>
                        <button onClick={() => removeItem(item.productNum)} className="shrink-0 p-1 transition-colors"
                          style={{ color: C.text3 }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#ef4444"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = C.text3; }}>
                          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                            <path d="M3 3.5l8 7M11 3.5l-8 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                          </svg>
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              <div className="px-5 py-4" style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
                <div className="flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0" style={{ color: C.accent }}>
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M7 6v4M7 4.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  <p style={{ fontFamily: YK, fontSize: "11px", color: C.text3, lineHeight: 1.7 }}>
                    {ui3(
                      locale,
                      "پس از ثبت درخواست، کارشناسان ما در اسرع وقت با شما تماس گرفته و مشاوره رایگان ارائه خواهند داد.",
                      "After submission, our experts will contact you promptly for a free consultation.",
                      "提交后，我们将尽快与您联系并提供免费咨询。",
                    )}
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </form>
      </div>
    </div>
  );
}
