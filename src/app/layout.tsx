import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "UBETTER Energy | Advanced LiFePO4 Battery & Solar Storage Systems",
  description:
    "Advanced LiFePO4 battery systems for home, commercial and industrial applications. From 2.5kWh residential storage to 2MWh containerized industrial projects.",
  other: {
    enamad: "46846627",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
