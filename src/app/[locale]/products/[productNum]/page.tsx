import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLocale, locales } from "@/i18n/config";
import { getAllProductEntries, getProductEntryByNum, tx } from "@/data/product-categories";
import type { Locale } from "@/i18n/config";
import ProductDetailPageClient from "@/components/product-detail-page-client";

type PageProps = {
  params: Promise<{ locale: string; productNum: string }>;
};

export function generateStaticParams() {
  const entries = getAllProductEntries();
  return locales.flatMap((locale) => entries.map((e) => ({ locale, productNum: String(e.productNum) })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: loc, productNum: raw } = await params;
  if (!isLocale(loc)) return {};
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 1) return {};
  const entry = getProductEntryByNum(n);
  if (!entry) return {};
  const locale = loc as Locale;
  const title = `${tx(entry.product.name, locale)} | UBETTER`;
  const description = tx(entry.product.description, locale);
  return {
    title,
    description: description.length > 180 ? `${description.slice(0, 177)}…` : description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale: loc, productNum: raw } = await params;
  if (!isLocale(loc)) notFound();
  const n = parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 1 || !/^\d+$/.test(raw)) notFound();
  const entry = getProductEntryByNum(n);
  if (!entry) notFound();
  return <ProductDetailPageClient locale={loc} productNum={n} />;
}
