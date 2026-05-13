import { notFound } from "next/navigation";
import EnquiryPageClient from "@/components/enquiry-page-client";
import { isLocale, locales, type Locale } from "@/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function EnquiryPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <EnquiryPageClient locale={locale} />;
}
