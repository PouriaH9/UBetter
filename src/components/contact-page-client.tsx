"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import SharedNavbar from "@/components/shared-navbar";
import SharedFooter from "@/components/shared-footer";
import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";
import type { Locale } from "@/i18n/config";
import { localeDir } from "@/i18n/locale-ui";
import { contactPageCopy } from "@/i18n/contact.dict";

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";
const easeOut = [0.22, 1, 0.36, 1] as const;

export default function ContactPageClient({ locale }: { locale: Locale }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const copy = contactPageCopy[locale];
  const dir = localeDir(locale);
  const isRTL = locale === "fa";
  const cardStyle = {
    background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
  };

  return (
    <motion.div
      className="overflow-x-hidden min-h-screen flex flex-col"
      style={{ background: C.pageBg, color: C.text1, transition: "background 0.35s ease, color 0.35s ease" }}
      dir={dir}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <SharedNavbar locale={locale} activePage="contact" />

      <div className="flex-1 max-w-[900px] mx-auto w-full px-6 sm:px-10 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="mb-10"
        >
          <nav className="flex items-center gap-2 mb-4 text-[12px] flex-wrap" style={{ color: C.text3 }}>
            <Link href={`/${locale}`} className="transition-colors hover:opacity-80" style={{ color: C.text3 }}>
              {copy.breadcrumbHome}
            </Link>
            <Chevron isRTL={isRTL} />
            <span style={{ color: C.text1 }}>{copy.breadcrumbCurrent}</span>
          </nav>

          <h1
            className="font-black mb-3 leading-tight"
            style={{ fontFamily: locale === "fa" ? YK : undefined, fontSize: "clamp(26px, 3.2vw, 42px)" }}
          >
            {copy.title}
          </h1>
          <p
            style={{
              color: C.text3,
              fontSize: "15px",
              lineHeight: 1.9,
              fontFamily: locale === "fa" ? YK : undefined,
            }}
          >
            {copy.intro}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.06 }}
          className="rounded-3xl p-6 sm:p-8 space-y-6"
          style={cardStyle}
        >
          <div className="space-y-3">
            {copy.phones.map((phone) => (
              <ContactRow key={phone.number} locale={locale} C={C} isDark={isDark}>
                <a
                  href={phone.href}
                  className="font-semibold transition-colors hover:opacity-80"
                  style={{ color: C.accent, fontFamily: locale === "fa" ? YK : undefined }}
                  dir="ltr"
                >
                  {phone.number}
                </a>
                <span style={{ color: C.text2, fontFamily: locale === "fa" ? YK : undefined }}>{phone.label}</span>
              </ContactRow>
            ))}
            <ContactRow locale={locale} C={C} isDark={isDark}>
              <a
                href={copy.officePhone.href}
                className="font-semibold transition-colors hover:opacity-80"
                style={{ color: C.accent, fontFamily: locale === "fa" ? YK : undefined }}
                dir="ltr"
              >
                {copy.officePhone.number}
              </a>
              <span style={{ color: C.text2, fontFamily: locale === "fa" ? YK : undefined }}>
                {copy.officePhone.label}
              </span>
            </ContactRow>
          </div>

          <div style={{ height: "1px", background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />

          <div className="space-y-5">
            {copy.addresses.map((address) => (
              <div key={address.label}>
                <div
                  className="text-[13px] font-semibold mb-1.5"
                  style={{ color: C.text1, fontFamily: locale === "fa" ? YK : undefined }}
                >
                  {address.label}
                </div>
                <p
                  className="text-[14px] leading-relaxed"
                  style={{ color: C.text2, fontFamily: locale === "fa" ? YK : undefined }}
                >
                  {address.value}
                </p>
              </div>
            ))}
          </div>

          <div style={{ height: "1px", background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }} />

          <div>
            <div
              className="text-[13px] font-semibold mb-1.5"
              style={{ color: C.text1, fontFamily: locale === "fa" ? YK : undefined }}
            >
              {copy.emailLabel}
            </div>
            <a
              href={`mailto:${copy.email}`}
              className="text-[14px] font-semibold transition-colors hover:opacity-80"
              style={{ color: C.accent }}
              dir="ltr"
            >
              {copy.email}
            </a>
          </div>
        </motion.div>
      </div>

      <SharedFooter locale={locale} />
    </motion.div>
  );
}

function ContactRow({
  children,
  locale,
  C,
  isDark,
}: {
  children: React.ReactNode;
  locale: Locale;
  C: typeof DARK_C;
  isDark: boolean;
}) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center sm:gap-4 rounded-2xl px-4 py-3 gap-1"
      style={{
        border: `1px solid ${isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)"}`,
        background: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.6)",
        fontSize: "14px",
        fontFamily: locale === "fa" ? YK : undefined,
      }}
    >
      {children}
    </div>
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
