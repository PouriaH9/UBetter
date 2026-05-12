import EnquiryPageClient from "@/components/enquiry-page-client";
import type { Locale } from "@/i18n/config";

export default async function EnquiryPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return <EnquiryPageClient locale={locale} />;
}
