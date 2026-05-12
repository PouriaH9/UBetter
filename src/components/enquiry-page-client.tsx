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

const BUILDING_TYPES_FA = ["مسکونی (آپارتمان/ویلا)", "تجاری (دفتر/مرکز خرید)", "صنعتی (کارخانه/انبار)", "کشاورزی", "پروژه زیرساختی", "سایر"];
const BUILDING_TYPES_EN = ["Residential (Apartment/Villa)", "Commercial (Office/Mall)", "Industrial (Factory/Warehouse)", "Agricultural", "Infrastructure Project", "Other"];

const TIMELINES_FA = ["فوری (۱–۳ ماه)", "کوتاه مدت (۳–۶ ماه)", "میان مدت (۶–۱۲ ماه)", "بلند مدت (بیش از ۱ سال)"];
const TIMELINES_EN = ["Urgent (1–3 months)", "Short-term (3–6 months)", "Mid-term (6–12 months)", "Long-term (1+ year)"];

const BUDGETS_FA = ["زیر ۵۰۰ میلیون تومان", "۵۰۰ میلیون – ۲ میلیارد", "۲ – ۵ میلیارد", "بیش از ۵ میلیارد", "نیاز به مشاوره دارم"];
const BUDGETS_EN = ["Under $10K", "$10K – $50K", "$50K – $150K", "Over $150K", "Need consultation"];

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
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const tx = (s: { fa: string; en: string }) => (isRTL ? s.fa : s.en);

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.fullName.trim()) e.fullName = isRTL ? "نام الزامی است" : "Name is required";
    if (!form.phone.trim()) e.phone = isRTL ? "شماره تماس الزامی است" : "Phone is required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = isRTL ? "ایمیل نامعتبر است" : "Invalid email";
    if (!form.province.trim()) e.province = isRTL ? "استان الزامی است" : "Province is required";
    if (!form.buildingType) e.buildingType = isRTL ? "نوع ساختمان الزامی است" : "Building type is required";
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

  if (submitted) {
    return (
      <div className="overflow-x-hidden min-h-screen flex flex-col" style={{ background: C.pageBg, color: C.text1 }} dir={isRTL ? "rtl" : "ltr"}>
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
              {isRTL ? "درخواست شما ثبت شد!" : "Request Submitted!"}
            </h2>
            <p style={{ color: C.text3, fontSize: "15px", lineHeight: 1.8, fontFamily: YK }}>
              {isRTL
                ? "تیم کارشناسان لیان صدر ملل در اسرع وقت با شما تماس خواهند گرفت."
                : "Our team of experts will contact you as soon as possible."}
            </p>
            <Link href={`/${locale}/products`}
              className="mt-2 px-8 py-3 rounded-2xl font-bold text-[14px] transition-all duration-200 hover:scale-105"
              style={{ background: C.accent, color: isDark ? "#000" : "#fff", fontFamily: YK }}>
              {isRTL ? "بازگشت به محصولات" : "Back to Products"}
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden min-h-screen" style={{ background: C.pageBg, color: C.text1, transition: "background 0.35s ease" }} dir={isRTL ? "rtl" : "ltr"}>
      <SharedNavbar locale={locale} activePage="products" />

      <div className="max-w-[1100px] mx-auto px-6 sm:px-10 pt-28 pb-20">
        {/* Page heading */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easeOut }} className="mb-10">
          <div className="flex items-center gap-2 mb-4 text-[12px]" style={{ color: C.text3 }}>
            <Link href={`/${locale}`} style={{ color: C.text3 }} className="transition-colors hover:text-white">{isRTL ? "صفحه اصلی" : "Home"}</Link>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={isRTL ? "rotate-180" : ""}><path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <Link href={`/${locale}/products`} style={{ color: C.text3 }} className="transition-colors hover:text-white">{isRTL ? "محصولات" : "Products"}</Link>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={isRTL ? "rotate-180" : ""}><path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span style={{ color: C.text1 }}>{isRTL ? "ثبت درخواست" : "Enquiry"}</span>
          </div>
          <h1 className="font-black mb-2" style={{ fontFamily: YK, fontSize: "clamp(24px, 3vw, 40px)", color: C.text1 }}>
            {isRTL ? "ثبت درخواست پروژه" : "Project Enquiry"}
          </h1>
          <p style={{ color: C.text3, fontSize: "14px", lineHeight: 1.8, fontFamily: YK }}>
            {isRTL
              ? "اطلاعات پروژه خود را وارد کنید. کارشناسان ما پس از بررسی با شما تماس می‌گیرند."
              : "Fill in your project details. Our experts will review and get back to you shortly."}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">

            {/* ── Left: Form ── */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easeOut, delay: 0.1 }}
              className="rounded-3xl p-6 sm:p-8 space-y-6"
              style={{ background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}` }}>

              {/* Section: Contact */}
              <div>
                <p className="text-[11px] font-black tracking-[0.18em] uppercase mb-4" style={{ color: C.accent, fontFamily: YK }}>
                  {isRTL ? "اطلاعات تماس" : "Contact Information"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label={isRTL ? "نام و نام خانوادگی" : "Full Name"} required>
                    <input value={form.fullName} onChange={set("fullName")} style={focusStyle("fullName")}
                      placeholder={isRTL ? "مثال: علی محمدی" : "e.g. John Smith"}
                      onFocus={(e) => { e.target.style.borderColor = C.accent; }}
                      onBlur={(e) => { e.target.style.borderColor = errors.fullName ? "#ef4444" : (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"); }} />
                    {errors.fullName && <span className="text-[11px] text-red-400">{errors.fullName}</span>}
                  </Field>
                  <Field label={isRTL ? "نام شرکت / سازمان" : "Company / Organization"}>
                    <input value={form.company} onChange={set("company")} style={inputStyle}
                      placeholder={isRTL ? "اختیاری" : "Optional"}
                      onFocus={(e) => { e.target.style.borderColor = C.accent; }}
                      onBlur={(e) => { e.target.style.borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"; }} />
                  </Field>
                  <Field label={isRTL ? "شماره تماس" : "Phone Number"} required>
                    <input value={form.phone} onChange={set("phone")} type="tel" style={focusStyle("phone")}
                      placeholder={isRTL ? "مثال: ۰۹۱۲۰۰۰۰۰۰۰" : "e.g. +98 912 000 0000"} dir="ltr"
                      onFocus={(e) => { e.target.style.borderColor = C.accent; }}
                      onBlur={(e) => { e.target.style.borderColor = errors.phone ? "#ef4444" : (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"); }} />
                    {errors.phone && <span className="text-[11px] text-red-400">{errors.phone}</span>}
                  </Field>
                  <Field label={isRTL ? "ایمیل" : "Email Address"}>
                    <input value={form.email} onChange={set("email")} type="email" style={focusStyle("email")}
                      placeholder="example@email.com" dir="ltr"
                      onFocus={(e) => { e.target.style.borderColor = C.accent; }}
                      onBlur={(e) => { e.target.style.borderColor = errors.email ? "#ef4444" : (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"); }} />
                    {errors.email && <span className="text-[11px] text-red-400">{errors.email}</span>}
                  </Field>
                </div>
              </div>

              <div style={{ height: "1px", background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />

              {/* Section: Project Location */}
              <div>
                <p className="text-[11px] font-black tracking-[0.18em] uppercase mb-4" style={{ color: C.accent, fontFamily: YK }}>
                  {isRTL ? "موقعیت پروژه" : "Project Location"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label={isRTL ? "استان" : "Province / State"} required>
                    <input value={form.province} onChange={set("province")} style={focusStyle("province")}
                      placeholder={isRTL ? "مثال: تهران" : "e.g. Tehran"}
                      onFocus={(e) => { e.target.style.borderColor = C.accent; }}
                      onBlur={(e) => { e.target.style.borderColor = errors.province ? "#ef4444" : (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"); }} />
                    {errors.province && <span className="text-[11px] text-red-400">{errors.province}</span>}
                  </Field>
                  <Field label={isRTL ? "شهر" : "City"}>
                    <input value={form.city} onChange={set("city")} style={inputStyle}
                      placeholder={isRTL ? "مثال: تهران" : "e.g. Tehran"}
                      onFocus={(e) => { e.target.style.borderColor = C.accent; }}
                      onBlur={(e) => { e.target.style.borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"; }} />
                  </Field>
                </div>
              </div>

              <div style={{ height: "1px", background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />

              {/* Section: Project Details */}
              <div>
                <p className="text-[11px] font-black tracking-[0.18em] uppercase mb-4" style={{ color: C.accent, fontFamily: YK }}>
                  {isRTL ? "جزئیات پروژه" : "Project Details"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label={isRTL ? "نوع ساختمان / پروژه" : "Building / Project Type"} required>
                    <select value={form.buildingType} onChange={set("buildingType")} style={{ ...focusStyle("buildingType"), appearance: "none" as const }}>
                      <option value="">{isRTL ? "انتخاب کنید..." : "Select..."}</option>
                      {(isRTL ? BUILDING_TYPES_FA : BUILDING_TYPES_EN).map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.buildingType && <span className="text-[11px] text-red-400">{errors.buildingType}</span>}
                  </Field>
                  <Field label={isRTL ? "ظرفیت مورد نیاز (تقریبی)" : "Required Capacity (approx.)"}>
                    <input value={form.capacity} onChange={set("capacity")} style={inputStyle}
                      placeholder={isRTL ? "مثال: ۱۰ کیلووات ساعت" : "e.g. 10 kWh"}
                      onFocus={(e) => { e.target.style.borderColor = C.accent; }}
                      onBlur={(e) => { e.target.style.borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"; }} />
                  </Field>
                  <Field label={isRTL ? "بازه زمانی اجرا" : "Implementation Timeline"}>
                    <select value={form.timeline} onChange={set("timeline")} style={{ ...inputStyle, appearance: "none" as const }}>
                      <option value="">{isRTL ? "انتخاب کنید..." : "Select..."}</option>
                      {(isRTL ? TIMELINES_FA : TIMELINES_EN).map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label={isRTL ? "بودجه تقریبی" : "Approximate Budget"}>
                    <select value={form.budget} onChange={set("budget")} style={{ ...inputStyle, appearance: "none" as const }}>
                      <option value="">{isRTL ? "انتخاب کنید..." : "Select..."}</option>
                      {(isRTL ? BUDGETS_FA : BUDGETS_EN).map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <div className="mt-4">
                  <Field label={isRTL ? "توضیحات تکمیلی" : "Additional Notes"}>
                    <textarea value={form.notes} onChange={set("notes")} rows={4} style={{ ...inputStyle, resize: "vertical" }}
                      placeholder={isRTL ? "هر اطلاعات اضافه‌ای که فکر می‌کنید مفید است..." : "Any additional information you think may be helpful..."}
                      onFocus={(e) => { e.target.style.borderColor = C.accent; }}
                      onBlur={(e) => { e.target.style.borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"; }} />
                  </Field>
                </div>
              </div>

              {/* Submit */}
              <motion.button type="submit" whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2.5 transition-all duration-200"
                style={{ background: C.accent, color: isDark ? "#000" : "#fff", fontFamily: YK }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {isRTL ? "ارسال و ثبت نهایی درخواست" : "Submit Project Enquiry"}
              </motion.button>
            </motion.div>

            {/* ── Right: Cart Summary ── */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
              className="rounded-3xl overflow-hidden sticky top-[100px]"
              style={{ border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}` }}>

              {/* Cart header */}
              <div className="px-5 py-4 flex items-center justify-between"
                style={{ background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}` }}>
                <span className="font-bold text-[14px]" style={{ fontFamily: YK, color: C.text1 }}>
                  {isRTL ? "محصولات انتخابی" : "Selected Products"}
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: C.accentBg, color: C.accent, border: `1px solid ${C.accentBorder}` }}>
                  {totalQty} {isRTL ? "عدد" : "item(s)"}
                </span>
              </div>

              {/* Items */}
              <div className="divide-y" style={{ ['--tw-divide-opacity' as string]: 1 }}>
                <AnimatePresence initial={false}>
                  {items.length === 0 ? (
                    <div className="px-5 py-8 text-center" style={{ color: C.text3, fontFamily: YK, fontSize: "13px" }}>
                      {isRTL ? "محصولی انتخاب نشده" : "No products selected"}
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

              {/* Note */}
              <div className="px-5 py-4" style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
                <div className="flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0" style={{ color: C.accent }}>
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M7 6v4M7 4.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  <p style={{ fontFamily: YK, fontSize: "11px", color: C.text3, lineHeight: 1.7 }}>
                    {isRTL
                      ? "پس از ثبت درخواست، کارشناسان ما در اسرع وقت با شما تماس گرفته و مشاوره رایگان ارائه خواهند داد."
                      : "After submission, our experts will contact you promptly for a free consultation."}
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
