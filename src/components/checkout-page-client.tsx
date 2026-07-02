"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SharedNavbar from "@/components/shared-navbar";
import { useCart } from "@/contexts/cart-context";
import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";
import { formatPrice } from "@/lib/products";
import { medusa, MEDUSA_ENABLED } from "@/lib/medusa";
import type { Locale } from "@/i18n/config";
import { localeDir, ui3 } from "@/i18n/locale-ui";

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";

export default function CheckoutPageClient({ locale }: { locale: Locale }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const dir = localeDir(locale);
  const { items, totalIrr, cartId, loading, refreshCart } = useCart();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const handleCheckout = async () => {
    if (!MEDUSA_ENABLED || !cartId) {
      setError(
        ui3(
          locale,
          "درگاه پرداخت در دسترس نیست",
          "Checkout is temporarily unavailable",
          "结账暂不可用"
        )
      );
      return;
    }

    if (!firstName || !phone || !address || !city || !province) {
      setError(
        ui3(
          locale,
          "لطفاً تمام فیلدهای ضروری را پر کنید",
          "Please fill all required fields",
          "请填写所有必填项"
        )
      );
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await medusa.store.cart.update(cartId, {
        email: email || undefined,
        shipping_address: {
          first_name: firstName,
          last_name: lastName || "-",
          address_1: address,
          city,
          province,
          country_code: "ir",
          phone,
        },
      });

      const { shipping_options } = await medusa.store.fulfillment.listCartOptions({
        cart_id: cartId,
      });
      const shippingOption = shipping_options?.[0];
      if (shippingOption?.id) {
        await medusa.store.cart.addShippingMethod(cartId, {
          option_id: shippingOption.id,
        });
      }

      const { cart: cartForPayment } = await medusa.store.cart.retrieve(cartId, {
        fields: "+payment_collection",
      });

      const { payment_providers } = await medusa.store.payment.listPaymentProviders({
        region_id: cartForPayment?.region_id ?? undefined,
      });
      const zarinpal = payment_providers?.find((p: { id: string }) =>
        p.id.includes("zarinpal")
      );

      if (!zarinpal?.id || !cartForPayment) {
        throw new Error("Zarinpal not configured");
      }

      const { payment_collection } = await medusa.store.payment.initiatePaymentSession(
        cartForPayment,
        { provider_id: zarinpal.id }
      );

      const session = payment_collection?.payment_sessions?.find(
        (s: { provider_id?: string; data?: Record<string, unknown> }) =>
          s.provider_id === zarinpal.id
      );
      const redirectUrl = session?.data?.url as string | undefined;

      if (!redirectUrl) {
        throw new Error("Payment redirect URL missing");
      }

      window.location.href = redirectUrl;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : ui3(locale, "خطا در پرداخت", "Payment failed", "支付失败")
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: C.pageBg, color: C.text1 }} dir={dir}>
      <SharedNavbar locale={locale} />
      <main className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: YK }}>
          {ui3(locale, "تسویه حساب", "Checkout", "结账")}
        </h1>

        {items.length === 0 ? (
          <p style={{ fontFamily: YK, color: C.text3 }}>
            {ui3(locale, "سبد خرید خالی است", "Your cart is empty", "购物车是空的")}
          </p>
        ) : (
          <div className="space-y-6">
            <div
              className="rounded-2xl p-5 space-y-3"
              style={{
                background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
              }}
            >
              {items.map((item) => (
                <div key={item.productNum} className="flex justify-between text-sm">
                  <span style={{ fontFamily: YK }}>
                    {locale === "fa" ? item.name.fa : item.name.en} × {item.qty}
                  </span>
                  {item.unitPriceIrr !== undefined && (
                    <span>{formatPrice(item.unitPriceIrr * item.qty, locale)}</span>
                  )}
                </div>
              ))}
              {totalIrr > 0 && (
                <div className="flex justify-between font-bold pt-3 border-t border-white/10">
                  <span>{ui3(locale, "جمع کل", "Total", "合计")}</span>
                  <span>{formatPrice(totalIrr, locale)}</span>
                </div>
              )}
            </div>

            <div className="grid gap-4">
              <input
                className="rounded-xl px-4 py-3 bg-transparent border"
                style={{ borderColor: C.cardBorder, fontFamily: YK }}
                placeholder={ui3(locale, "نام *", "First name *", "名 *")}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="rounded-xl px-4 py-3 bg-transparent border"
                style={{ borderColor: C.cardBorder, fontFamily: YK }}
                placeholder={ui3(locale, "نام خانوادگی", "Last name", "姓")}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                className="rounded-xl px-4 py-3 bg-transparent border"
                style={{ borderColor: C.cardBorder, fontFamily: YK }}
                placeholder={ui3(locale, "موبایل *", "Phone *", "手机 *")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                className="rounded-xl px-4 py-3 bg-transparent border"
                style={{ borderColor: C.cardBorder, fontFamily: YK }}
                placeholder={ui3(locale, "ایمیل", "Email", "邮箱")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="rounded-xl px-4 py-3 bg-transparent border"
                style={{ borderColor: C.cardBorder, fontFamily: YK }}
                placeholder={ui3(locale, "استان *", "Province *", "省 *")}
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
              <input
                className="rounded-xl px-4 py-3 bg-transparent border"
                style={{ borderColor: C.cardBorder, fontFamily: YK }}
                placeholder={ui3(locale, "شهر *", "City *", "城市 *")}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <textarea
                className="rounded-xl px-4 py-3 bg-transparent border min-h-[100px]"
                style={{ borderColor: C.cardBorder, fontFamily: YK }}
                placeholder={ui3(locale, "آدرس *", "Address *", "地址 *")}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={handleCheckout}
                disabled={submitting || loading}
                className="flex-1 py-3.5 rounded-2xl font-bold"
                style={{ background: C.accent, color: isDark ? "#000" : "#fff", fontFamily: YK }}
              >
                {submitting
                  ? ui3(locale, "در حال انتقال...", "Redirecting...", "跳转中...")
                  : ui3(locale, "پرداخت با زرین‌پال", "Pay with Zarinpal", "Zarinpal 支付")}
              </button>
              <Link
                href={`/${locale}/enquiry`}
                className="px-5 py-3.5 rounded-2xl font-bold border text-center"
                style={{ borderColor: C.cardBorder, fontFamily: YK }}
              >
                {ui3(locale, "درخواست قیمت", "Request quote", "询价")}
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
