import CheckoutCancelClient from "@/components/checkout-cancel-client";
import type { Locale } from "@/i18n/config";

export default async function CheckoutCancelPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return <CheckoutCancelClient locale={locale} />;
}
