"use client";

import Link from "next/link";
import SharedNavbar from "@/components/shared-navbar";
import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";
import { localeDir, ui3 } from "@/i18n/locale-ui";

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";

export default function CheckoutSuccessClient({ locale }: { locale: Locale }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const dir = localeDir(locale);

  return (
    <div className="min-h-screen" style={{ background: C.pageBg, color: C.text1 }} dir={dir}>
      <SharedNavbar locale={locale} />
      <main className="max-w-xl mx-auto px-6 py-32 text-center">
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: YK }}>
          {ui3(locale, "پرداخت موفق", "Payment successful", "支付成功")}
        </h1>
        <p className="mb-8" style={{ fontFamily: YK, color: C.text3 }}>
          {ui3(
            locale,
            "سفارش شما ثبت شد. به زودی با شما تماس می‌گیریم.",
            "Your order has been placed. We will contact you soon.",
            "订单已提交，我们会尽快与您联系。"
          )}
        </p>
        <Link
          href={localePath(locale, "/products")}
          className="inline-block px-6 py-3 rounded-2xl font-bold"
          style={{ background: C.accent, color: isDark ? "#000" : "#fff", fontFamily: YK }}
        >
          {ui3(locale, "بازگشت به محصولات", "Back to products", "返回产品")}
        </Link>
      </main>
    </div>
  );
}
