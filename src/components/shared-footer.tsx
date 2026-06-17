"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UbetterLogoWithAiBadge } from "@/components/brand-logo";
import type { Locale } from "@/i18n/config";
import { locales, localizedPath } from "@/i18n/config";
import {
  LocaleFlagMark,
  localeNavLabel,
  localeSwitchAria,
} from "@/components/locale-flag-mark";
import { useHomeGlobeJourneyOptional } from "@/contexts/home-globe-journey-context";
import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";
import { ui } from "@/i18n/locale-ui";

type FooterCol = { head: string; links: string[] };

const FOOTER_COLUMNS: Record<Locale, FooterCol[]> = {
  fa: [
    { head: "محصولات", links: ["سری خانگی", "سری تجاری", "سری صنعتی", "OEM / ODM"] },
    { head: "شرکت", links: ["درباره ما", "تکنولوژی", "اخبار"] },
    { head: "پشتیبانی", links: ["مستندات فنی", "پشتیبانی مهندسی", "گارانتی", "تماس با ما"] },
  ],
  en: [
    { head: "Products", links: ["Home Series", "Commercial Series", "Industrial Series", "Custom OEM"] },
    { head: "Company", links: ["About Us", "Technology", "News"] },
    { head: "Support", links: ["Documentation", "Engineering Support", "Warranty", "Contact"] },
  ],
  zh: [
    { head: "产品", links: ["家用系列", "商用系列", "工业系列", "定制 OEM"] },
    { head: "公司", links: ["关于我们", "技术", "新闻"] },
    { head: "支持", links: ["文档", "工程支持", "质保", "联系我们"] },
  ],
  de: [
    { head: "Produkte", links: ["Heimserie", "Gewerbeserie", "Industrieserie", "OEM / ODM"] },
    { head: "Unternehmen", links: ["Über uns", "Technologie", "News"] },
    { head: "Support", links: ["Dokumentation", "Engineering", "Garantie", "Kontakt"] },
  ],
};

export default function SharedFooter({ locale }: { locale: Locale }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const stackAboveGlobe = useHomeGlobeJourneyOptional()?.showGlobeBackdrop ?? false;
  const isRTL = locale === "fa";
  const pathname = usePathname() ?? "/";
  const alternateLocales = locales.filter((l) => l !== locale);

  const footerColumns = FOOTER_COLUMNS[locale];

  const tagline = ui(locale, {
    fa: "سیستم‌های ذخیره‌ساز انرژی هوشمند لیتیوم فسفات LiFePO4 برای آینده‌ای پایدار",
    en: "Smart LiFePO4 lithium phosphate energy storage systems for a sustainable future",
    zh: "智能磷酸铁锂 LiFePO4 储能系统，助力可持续未来",
    de: "Intelligente LiFePO4-Energiespeichersysteme für eine nachhaltige Zukunft",
  });

  const companyLine = ui(locale, {
    fa: "شرکت لیان صدر ملل نماینده انحصاری شرکت Ubetter Technology Co., Ltd. تحت لیسانس تکنولوژی آلمان، ساخت چین",
    en: "Lian Sadr Melal — exclusive representative of Ubetter Technology Co., Ltd. Under German technology license, made in China",
    zh: "Lian Sadr Melal — Ubetter Technology Co., Ltd. 独家代表。德国技术授权，中国制造",
    de: "Lian Sadr Melal — exklusiver Vertreter von Ubetter Technology Co., Ltd. Unter deutscher Technologielizenz, hergestellt in China",
  });

  const copyrightLine = ui(locale, {
    en: "© 2025 Lian Sadr Melal / UBETTER. All rights reserved.",
    zh: "© 2025 Lian Sadr Melal / UBETTER. 保留所有权利。",
    de: "© 2025 Lian Sadr Melal / UBETTER. Alle Rechte vorbehalten.",
  });

  const privacyLabel = ui(locale, {
    fa: "حریم خصوصی",
    en: "Privacy Policy",
    zh: "隐私政策",
    de: "Datenschutz",
  });

  const termsLabel = ui(locale, {
    fa: "شرایط استفاده",
    en: "Terms of Service",
    zh: "服务条款",
    de: "Nutzungsbedingungen",
  });

  return (
    <footer
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        background: isDark ? "#020202" : "#ececec",
        borderTop: `1px solid ${C.divider}`,
        transition: "background 0.35s ease",
      }}
      className={`pt-20 pb-10${stackAboveGlobe ? " relative z-[60]" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link href={`/${locale}`} className="inline-flex mb-5">
              <UbetterLogoWithAiBadge size="sm" />
            </Link>
            <p className="text-[13px] leading-relaxed mb-5" style={{ color: C.text3 }}>
              {tagline}
            </p>
            <div className="text-[11px] sm:text-[12px] font-semibold leading-relaxed" style={{ color: C.accent }}>
              {companyLine}
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.head}>
              <div className="font-semibold text-[13px] mb-5 tracking-wide" style={{ color: C.text1 }}>
                {col.head}
              </div>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[13px] transition-colors duration-200"
                      style={{ color: C.text3 }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = C.accent;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = C.text3;
                      }}
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
          <div className="text-[12px] text-center sm:text-start" style={{ color: C.text4 }}>
            {locale === "fa" ? (
              <>
                <span className="font-semibold">لیان صدر ملل</span> تمامی حقوق محفوظ است
              </>
            ) : (
              copyrightLine
            )}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            <a
              href="#"
              className="text-[12px] transition-colors"
              style={{ color: C.text4 }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = C.text1;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = C.text4;
              }}
            >
              {privacyLabel}
            </a>
            <a
              href="#"
              className="text-[12px] transition-colors"
              style={{ color: C.text4 }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = C.text1;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = C.text4;
              }}
            >
              {termsLabel}
            </a>
            <div className="flex items-center gap-2">
              {alternateLocales.map((loc) => (
                <Link
                  key={loc}
                  href={localizedPath(loc, pathname)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all duration-200"
                  style={{ border: `1px solid ${C.divider}`, color: C.text3 }}
                  aria-label={localeSwitchAria(loc)}
                >
                  <LocaleFlagMark locale={loc} />
                  <span className={loc === "en" || loc === "de" ? "tracking-widest uppercase" : undefined}>
                    {localeNavLabel(loc, "short")}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
