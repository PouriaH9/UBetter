import { notFound } from "next/navigation";
import HomePageClient from "@/components/home-page-client";
import { isLocale, locales } from "@/i18n/config";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocalePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePageClient locale={locale} />;
}
