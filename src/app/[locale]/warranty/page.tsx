import { notFound } from "next/navigation";

import WarrantyPageClient from "@/components/warranty-page-client";
import { isLocale, locales, type Locale } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function WarrantyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <WarrantyPageClient locale={locale} />;
}
