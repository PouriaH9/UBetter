"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

import SharedNavbar from "@/components/shared-navbar";
import SharedFooter from "@/components/shared-footer";
import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { localeDir } from "@/i18n/locale-ui";
import { warrantyPageCopy } from "@/i18n/warranty.dict";
import JalaliDateInput from "@/components/jalali-date-input";

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";
const easeOut = [0.22, 1, 0.36, 1] as const;

type FormData = {
  warrantyCode: string;
  serialNumber: string;
  installationDate: string;
  deviceModel: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
};

const INITIAL: FormData = {
  warrantyCode: "",
  serialNumber: "",
  installationDate: "",
  deviceModel: "",
  fullName: "",
  phone: "",
  email: "",
  address: "",
  notes: "",
};

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <motion.div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-semibold tracking-wide" style={{ fontFamily: YK }}>
        {label}
        {required ? <span className="text-red-400 ms-1">*</span> : null}
      </label>
      {children}
    </motion.div>
  );
}

export default function WarrantyPageClient({ locale }: { locale: Locale }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const copy = warrantyPageCopy[locale];
  const dir = localeDir(locale);
  const isRTL = locale === "fa";

  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const set =
    (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: undefined }));
    };

  const setDate = (key: "serialNumber" | "installationDate") => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const renderDateField = (
    key: "serialNumber" | "installationDate",
    label: string,
    placeholder: string,
  ) => (
    <Field label={label}>
      {locale === "fa" ? (
        <JalaliDateInput
          value={form[key]}
          onChange={setDate(key)}
          placeholder={placeholder}
          isDark={isDark}
          textColor={C.text1}
          accentColor={C.accent}
          hasError={Boolean(errors[key])}
        />
      ) : (
        <input
          value={form[key]}
          onChange={set(key)}
          type="date"
          style={inputStyle}
          placeholder={placeholder}
          dir="ltr"
          onFocus={onFocus}
          onBlur={onBlur(key)}
        />
      )}
    </Field>
  );

  const inputStyle: React.CSSProperties = {
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
  };

  const focusStyle = (key: keyof FormData) => ({
    ...inputStyle,
    borderColor: errors[key] ? "#ef4444" : isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
  });

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = C.accent;
  };

  const onBlur =
    (key: keyof FormData) => (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.target.style.borderColor = errors[key]
        ? "#ef4444"
        : isDark
          ? "rgba(255,255,255,0.1)"
          : "rgba(0,0,0,0.1)";
    };

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.warrantyCode.trim()) e.warrantyCode = copy.errors.warrantyCode;
    if (!form.fullName.trim()) e.fullName = copy.errors.fullName;
    if (!form.phone.trim()) e.phone = copy.errors.phone;
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = copy.errors.email;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        className="overflow-x-hidden min-h-screen flex flex-col"
        style={{ background: C.pageBg, color: C.text1 }}
        dir={dir}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <SharedNavbar locale={locale} activePage="warranty" />
        <div className="flex-1 flex items-center justify-center px-6 py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="flex flex-col items-center gap-6 text-center max-w-md"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: C.accentBg, border: `2px solid ${C.accent}` }}
            >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ color: C.accent }}>
                <path
                  d="M8 18l7 7 13-13"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="font-black text-[28px]" style={{ fontFamily: YK, color: C.text1 }}>
              {copy.successTitle}
            </h1>
            <p style={{ color: C.text3, fontSize: "15px", lineHeight: 1.8, fontFamily: YK }}>{copy.successBody}</p>
            <Link
              href={localePath(locale, "/")}
              className="mt-2 px-8 py-3 rounded-2xl font-bold text-[14px] transition-all duration-200 hover:scale-105"
              style={{ background: C.accent, color: "#000", fontFamily: YK }}
            >
              {copy.backHome}
            </Link>
          </motion.div>
        </div>
        <SharedFooter locale={locale} />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="overflow-x-hidden min-h-screen flex flex-col"
      style={{ background: C.pageBg, color: C.text1, transition: "background 0.35s ease" }}
      dir={dir}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <SharedNavbar locale={locale} activePage="warranty" />

      <div className="flex-1 max-w-[640px] mx-auto w-full px-6 sm:px-10 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-10"
        >
          <nav className="flex items-center gap-2 mb-4 text-[12px] flex-wrap" style={{ color: C.text3 }}>
            <Link href={localePath(locale, "/")} className="transition-colors hover:opacity-80" style={{ color: C.text3 }}>
              {copy.breadcrumbHome}
            </Link>
            <Chevron isRTL={isRTL} />
            <span style={{ color: C.text3 }}>{copy.breadcrumbServices}</span>
            <Chevron isRTL={isRTL} />
            <span style={{ color: C.text1 }}>{copy.breadcrumbCurrent}</span>
          </nav>
          <h1
            className="font-black mb-2"
            style={{ fontFamily: YK, fontSize: "clamp(24px, 3vw, 36px)", color: C.text1 }}
          >
            {copy.title}
          </h1>
          <p style={{ color: C.text3, fontSize: "14px", lineHeight: 1.8, fontFamily: YK }}>{copy.subtitle}</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.08 }}
          className="rounded-3xl p-6 sm:p-8 space-y-8"
          style={{
            background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
          }}
        >
          <div className="space-y-4">
            <p
              className={`text-[11px] font-black tracking-[0.18em] ${locale === "en" ? "uppercase" : ""}`}
              style={{ color: C.accent, fontFamily: YK }}
            >
              {copy.sectionDevice}
            </p>
            <Field label={copy.fields.warrantyCode} required>
              <input
                value={form.warrantyCode}
                onChange={set("warrantyCode")}
                style={focusStyle("warrantyCode")}
                placeholder={copy.fields.warrantyCodePlaceholder}
                dir="ltr"
                className="font-mono tracking-wide"
                autoComplete="off"
                onFocus={onFocus}
                onBlur={onBlur("warrantyCode")}
              />
              {errors.warrantyCode ? <span className="text-[11px] text-red-400">{errors.warrantyCode}</span> : null}
            </Field>
            {renderDateField("serialNumber", copy.fields.serialNumber, copy.fields.serialNumberPlaceholder)}
            {renderDateField(
              "installationDate",
              copy.fields.installationDate,
              copy.fields.installationDatePlaceholder,
            )}
            <Field label={copy.fields.deviceModel}>
              <input
                value={form.deviceModel}
                onChange={set("deviceModel")}
                style={inputStyle}
                placeholder={copy.fields.deviceModelPlaceholder}
                onFocus={onFocus}
                onBlur={onBlur("deviceModel")}
              />
            </Field>
          </div>

          <div
            style={{ height: "1px", background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
          />

          <motion.div className="space-y-4">
            <p
              className={`text-[11px] font-black tracking-[0.18em] ${locale === "en" ? "uppercase" : ""}`}
              style={{ color: C.accent, fontFamily: YK }}
            >
              {copy.sectionContact}
            </p>
            <Field label={copy.fields.fullName} required>
              <input
                value={form.fullName}
                onChange={set("fullName")}
                style={focusStyle("fullName")}
                placeholder={copy.fields.fullNamePlaceholder}
                onFocus={onFocus}
                onBlur={onBlur("fullName")}
              />
              {errors.fullName ? <span className="text-[11px] text-red-400">{errors.fullName}</span> : null}
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={copy.fields.phone} required>
                <input
                  value={form.phone}
                  onChange={set("phone")}
                  type="tel"
                  style={focusStyle("phone")}
                  placeholder={copy.fields.phonePlaceholder}
                  dir="ltr"
                  onFocus={onFocus}
                  onBlur={onBlur("phone")}
                />
                {errors.phone ? <span className="text-[11px] text-red-400">{errors.phone}</span> : null}
              </Field>
              <Field label={copy.fields.email}>
                <input
                  value={form.email}
                  onChange={set("email")}
                  type="email"
                  style={focusStyle("email")}
                  placeholder={copy.fields.emailPlaceholder}
                  dir="ltr"
                  onFocus={onFocus}
                  onBlur={onBlur("email")}
                />
                {errors.email ? <span className="text-[11px] text-red-400">{errors.email}</span> : null}
              </Field>
            </div>
            <Field label={copy.fields.address}>
              <textarea
                value={form.address}
                onChange={set("address")}
                rows={2}
                style={{ ...inputStyle, resize: "vertical" as const, minHeight: "64px" }}
                placeholder={copy.fields.addressPlaceholder}
                onFocus={onFocus}
                onBlur={onBlur("address")}
              />
            </Field>
            <Field label={copy.fields.notes}>
              <textarea
                value={form.notes}
                onChange={set("notes")}
                rows={3}
                style={{ ...inputStyle, resize: "vertical" as const, minHeight: "88px" }}
                placeholder={copy.fields.notesPlaceholder}
                onFocus={onFocus}
                onBlur={onBlur("notes")}
              />
            </Field>
          </motion.div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl font-bold text-[15px] transition-transform duration-200 hover:scale-[1.02]"
            style={{
              background: C.accent,
              color: "#000",
              fontFamily: YK,
              boxShadow: `0 0 28px ${C.accentGlow}`,
            }}
          >
            {copy.submit}
          </button>
        </motion.form>
      </div>

      <SharedFooter locale={locale} />
    </motion.div>
  );
}

function Chevron({ isRTL }: { isRTL: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={isRTL ? "rotate-180" : ""} aria-hidden>
      <path
        d="M4.5 3l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
