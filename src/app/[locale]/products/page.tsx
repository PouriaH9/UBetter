import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import ProductsPageClient from "@/components/products-page-client";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ProductsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ProductsPageClient locale={locale} />;
}
