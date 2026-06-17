import { notFound } from "next/navigation";

import ContactPageClient from "@/components/contact-page-client";
import { isLocale, locales, type Locale } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ContactPageClient locale={locale} />;
}
