import CheckoutPageClient from "@/components/checkout-page-client";
import type { Locale } from "@/i18n/config";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <CheckoutPageClient locale={locale} />;
}
