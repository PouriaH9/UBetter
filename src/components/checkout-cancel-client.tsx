"use client";

import Link from "next/link";
import SharedNavbar from "@/components/shared-navbar";
import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { localeDir, ui3 } from "@/i18n/locale-ui";

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";

export default function CheckoutCancelClient({ locale }: { locale: Locale }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const dir = localeDir(locale);

  return (
    <div className="min-h-screen" style={{ background: C.pageBg, color: C.text1 }} dir={dir}>
      <SharedNavbar locale={locale} />
      <main className="max-w-xl mx-auto px-6 py-32 text-center">
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: YK }}>
          {ui3(locale, "پرداخت لغو شد", "Payment cancelled", "支付已取消")}
        </h1>
        <p className="mb-8" style={{ fontFamily: YK, color: C.text3 }}>
          {ui3(
            locale,
            "می‌توانید دوباره تلاش کنید یا درخواست قیمت ثبت کنید.",
            "You can try again or submit a quote request.",
            "您可以重试或提交询价。"
          )}
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href={localePath(locale, "/checkout")}
            className="px-6 py-3 rounded-2xl font-bold"
            style={{ background: C.accent, color: isDark ? "#000" : "#fff", fontFamily: YK }}
          >
            {ui3(locale, "تلاش مجدد", "Try again", "重试")}
          </Link>
          <Link
            href={localePath(locale, "/enquiry")}
            className="px-6 py-3 rounded-2xl font-bold border"
            style={{ borderColor: C.cardBorder, fontFamily: YK }}
          >
            {ui3(locale, "درخواست قیمت", "Request quote", "询价")}
          </Link>
        </div>
      </main>
    </div>
  );
}
