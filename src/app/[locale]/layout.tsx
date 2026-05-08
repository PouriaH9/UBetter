import { ThemeProvider } from "@/contexts/theme-context";

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
