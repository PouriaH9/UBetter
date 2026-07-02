import CheckoutSuccessClient from "@/components/checkout-success-client";
import type { Locale } from "@/i18n/config";

export default async function CheckoutSuccessPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <CheckoutSuccessClient locale={locale} />;
}
