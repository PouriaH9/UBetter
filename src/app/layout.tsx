import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "یوبتر انرژی | راهکارهای ذخیره‌سازی انرژی",
  description:
    "نسخه بازطراحی‌شده صفحه اصلی یوبتر انرژی با تمرکز بر سیستم‌های ذخیره‌سازی انرژی خانگی، تجاری و صنعتی."
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
