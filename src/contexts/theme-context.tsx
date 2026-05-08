"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeCtx {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: "light",
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  // On mount: read stored preference; default = light
  useEffect(() => {
    const stored = localStorage.getItem("ubetter-theme") as Theme | null;
    const initial = stored ?? "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("ubetter-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === "dark", toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

// ─── Typed color palettes used across components ───────────────────────────────

export const DARK_C = {
  pageBg:       "#080808",
  s1:           "#0a0a0a",
  s2:           "#050505",
  s3:           "#0d0d0d",
  card:         "#0d0d0d",
  cardBorder:   "rgba(255,255,255,0.07)",
  cardBorderHv: "rgba(124,255,0,0.22)",
  navBg:        "rgba(0,0,0,0.55)",
  navBorder:    "rgba(255,255,255,0.06)",
  tabBg:        "rgba(8,8,8,0.9)",
  tabBorder:    "rgba(255,255,255,0.06)",
  text1:        "#ffffff",
  text2:        "rgba(255,255,255,0.52)",
  text3:        "rgba(255,255,255,0.35)",
  text4:        "rgba(255,255,255,0.18)",
  divider:      "rgba(255,255,255,0.05)",
  accent:       "#7CFF00",
  accentBg:     "rgba(124,255,0,0.07)",
  accentBorder: "rgba(124,255,0,0.18)",
  accentGlow:   "rgba(124,255,0,0.18)",
  numBadgeBg:   "rgba(0,0,0,0.55)",
  numBadgeTxt:  "rgba(255,255,255,0.3)",
  imgAreaBg:    "linear-gradient(160deg,#111 0%,#0a0a0a 100%)",
  tagBg:        "rgba(255,255,255,0.03)",
  tagBorder:    "rgba(255,255,255,0.07)",
  tagText:      "rgba(255,255,255,0.35)",
  breadcrumb:   "rgba(255,255,255,0.3)",
  statBg:       "rgba(255,255,255,0.02)",
  statBorder:   "rgba(255,255,255,0.06)",
  heroGrad:     "radial-gradient(ellipse 60% 50% at 50% 100%,rgba(124,255,0,0.06) 0%,transparent 70%)",
  catCountBg:   "rgba(124,255,0,0.04)",
  catCountBdr:  "rgba(124,255,0,0.1)",
  sectionHead1: "#070707",
  sectionHead2: "#060606",
  sectionGrid1: "#080808",
  sectionGrid2: "#070707",
};

export const LIGHT_C = {
  pageBg:       "#f4f4f4",
  s1:           "#ffffff",
  s2:           "#f0f0f0",
  s3:           "#fafafa",
  card:         "#ffffff",
  cardBorder:   "rgba(0,0,0,0.07)",
  cardBorderHv: "rgba(74,156,0,0.3)",
  navBg:        "rgba(255,255,255,0.9)",
  navBorder:    "rgba(0,0,0,0.08)",
  tabBg:        "rgba(245,245,245,0.96)",
  tabBorder:    "rgba(0,0,0,0.07)",
  text1:        "#0d0d0d",
  text2:        "rgba(0,0,0,0.58)",
  text3:        "rgba(0,0,0,0.38)",
  text4:        "rgba(0,0,0,0.2)",
  divider:      "rgba(0,0,0,0.06)",
  accent:       "#4a9c00",
  accentBg:     "rgba(74,156,0,0.07)",
  accentBorder: "rgba(74,156,0,0.22)",
  accentGlow:   "rgba(74,156,0,0.12)",
  numBadgeBg:   "rgba(0,0,0,0.06)",
  numBadgeTxt:  "rgba(0,0,0,0.35)",
  imgAreaBg:    "linear-gradient(160deg,#f8f8f8 0%,#f0f0f0 100%)",
  tagBg:        "rgba(0,0,0,0.03)",
  tagBorder:    "rgba(0,0,0,0.07)",
  tagText:      "rgba(0,0,0,0.38)",
  breadcrumb:   "rgba(0,0,0,0.35)",
  statBg:       "rgba(0,0,0,0.03)",
  statBorder:   "rgba(0,0,0,0.07)",
  heroGrad:     "radial-gradient(ellipse 60% 50% at 50% 100%,rgba(74,156,0,0.05) 0%,transparent 70%)",
  catCountBg:   "rgba(74,156,0,0.05)",
  catCountBdr:  "rgba(74,156,0,0.15)",
  sectionHead1: "#f8f8f8",
  sectionHead2: "#f2f2f2",
  sectionGrid1: "#ffffff",
  sectionGrid2: "#fafafa",
};

export type ColorPalette = typeof DARK_C;
