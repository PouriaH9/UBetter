"use client";

import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/LOGO.jpg";
import type { Locale } from "@/i18n/config";
import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";

export default function SharedFooter({ locale }: { locale: Locale }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const isRTL = locale === "fa";
  const other: Locale = locale === "en" ? "fa" : "en";

  const columns = isRTL
    ? [
        { head: "محصولات", links: ["سری خانگی", "سری تجاری", "سری صنعتی", "OEM / ODM"] },
        { head: "شرکت",   links: ["درباره ما", "تکنولوژی", "گواهینامه‌ها", "اخبار"] },
        { head: "پشتیبانی", links: ["مستندات فنی", "پشتیبانی مهندسی", "گارانتی", "تماس با ما"] },
      ]
    : [
        { head: "Products", links: ["Home Series", "Commercial Series", "Industrial Series", "Custom OEM"] },
        { head: "Company",  links: ["About Us", "Technology", "Certifications", "News"] },
        { head: "Support",  links: ["Documentation", "Engineering Support", "Warranty", "Contact"] },
      ];

  return (
    <footer
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        background: isDark ? "#020202" : "#ececec",
        borderTop: `1px solid ${C.divider}`,
        transition: "background 0.35s ease",
      }}
      className="pt-20 pb-10"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 relative rounded-md overflow-hidden">
                <Image src={logoImg} alt="UBETTER" fill className="object-cover" sizes="28px" />
              </div>
              <span className="font-bold text-[15px]" style={{ color: C.text1 }}>UBETTER</span>
            </Link>
            <p className="text-[13px] leading-relaxed mb-5" style={{ color: C.text3 }}>
              {isRTL
                ? "سیستم‌های پیشرفته باتری LiFePO4 برای آینده‌ای پایدار."
                : "Advanced LiFePO4 battery systems for a sustainable future."}
            </p>
            <div className="text-[12px] font-semibold" style={{ color: C.accent }}>Ubetter Technology Co., Ltd.</div>
          </div>

          {columns.map((col) => (
            <div key={col.head}>
              <div className="font-semibold text-[13px] mb-5 tracking-wide" style={{ color: C.text1 }}>{col.head}</div>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[13px] transition-colors duration-200"
                      style={{ color: C.text3 }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = C.accent; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = C.text3; }}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4"
          style={{ borderTop: `1px solid ${C.divider}` }}
        >
          <div className="text-[12px]" style={{ color: C.text4 }}>
            © 2025 Ubetter Technology Co., Ltd. {isRTL ? "تمام حقوق محفوظ است." : "All rights reserved."}
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="text-[12px] transition-colors" style={{ color: C.text4 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = C.text1; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = C.text4; }}
            >
              {isRTL ? "حریم خصوصی" : "Privacy Policy"}
            </a>
            <a href="#" className="text-[12px] transition-colors" style={{ color: C.text4 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = C.text1; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = C.text4; }}
            >
              {isRTL ? "شرایط استفاده" : "Terms of Service"}
            </a>
            <Link
              href={`/${other}`}
              className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase transition-all duration-200"
              style={{ border: `1px solid ${C.divider}`, color: C.text3 }}
            >
              {other === "fa" ? "فا" : "EN"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
