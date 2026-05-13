"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";
import type { Locale } from "@/i18n/config";
import { translations } from "@/i18n/translations";

import { GEOJSON_URL } from "./globe/constants";
import type { CountryFeature } from "./globe/globe-types";

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";

const GlobeInteractiveCanvas = dynamic(
  () => import("@/components/globe/GlobeInteractiveCanvas"),
  { ssr: false, loading: () => <GlobeLoadingPlaceholder /> },
);

function GlobeLoadingPlaceholder() {
  return (
    <div
      className="absolute inset-0 w-full h-full min-h-[100svh] animate-pulse"
      style={{
        background:
          "radial-gradient(ellipse 100% 70% at 50% 55%,rgba(124,255,0,0.08),transparent),linear-gradient(180deg,#060708 0%,#030304 100%)",
      }}
      aria-hidden
    />
  );
}

function normalizeFeatures(raw: CountryFeature[]): CountryFeature[] {
  return raw.filter((f) => {
    const iso = f.properties?.ISO_A2;
    return typeof iso === "string" && iso.length === 2 && iso !== "AQ" && iso !== "-99";
  });
}

export function GlobePresenceSection({ locale }: { locale: Locale }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const t = translations[locale];
  const copy = t.globe;

  const [polygons, setPolygons] = useState<CountryFeature[] | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(GEOJSON_URL);
        if (!res.ok) throw new Error(String(res.status));
        const gj = await res.json();
        const list = gj?.features as CountryFeature[] | undefined;
        if (alive && Array.isArray(list)) setPolygons(normalizeFeatures(list));
      } catch {
        /* keep null; graceful empty state */
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const M = useMemo(() => {
    return {
      sectionTopBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
      halo: isDark ? "rgba(124,255,0,0.04)" : "rgba(124,255,0,0.06)",
      glassBg: isDark ? "rgba(8,10,8,0.45)" : "rgba(255,255,255,0.82)",
      glassBorder: isDark ? "rgba(124,255,0,0.22)" : "rgba(124,255,0,0.15)",
      glassShadow: isDark
        ? "inset 0 1px 0 rgba(124,255,0,0.08), inset 0 -1px 0 rgba(0,0,0,0.35), 0 12px 48px rgba(0,0,0,0.55)"
        : "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.06), 0 12px 44px rgba(0,0,0,0.1)",
      canvasBgBase: isDark ? "#040506" : "#dde6ea",
      scrimTop: isDark
        ? "linear-gradient(180deg,rgba(4,5,6,0.92) 0%,rgba(4,5,6,0.45) 28%,transparent 55%)"
        : "linear-gradient(180deg,rgba(248,252,250,0.34) 0%,rgba(248,252,250,0.1) 26%,transparent 50%)",
      scrimBottom: isDark
        ? "linear-gradient(0deg,rgba(4,5,6,0.88) 0%,rgba(4,5,6,0.35) 30%,transparent 58%)"
        : "linear-gradient(0deg,rgba(220,230,235,0.32) 0%,rgba(220,230,235,0.06) 40%,transparent 56%)",
    };
  }, [isDark]);

  return (
    <section
      dir={t.dir}
      lang={locale === "en" ? "en" : "fa"}
      className={`relative overflow-hidden min-h-[100svh] w-full ${locale === "en" ? "font-sans" : ""}`}
      style={{
        borderTop: `1px solid ${M.sectionTopBorder}`,
        fontFamily: locale === "fa" ? YK : undefined,
        background: M.canvasBgBase,
      }}
    >
      {/* Full-viewport WebGL layer (background) */}
      <div
        className="absolute inset-0 z-0 w-full min-h-[100svh]"
        role="img"
        aria-label={copy.ariaLabel}
      >
        {polygons && polygons.length ? (
          <GlobeInteractiveCanvas
            polygons={polygons}
            className="absolute inset-0 block h-full w-full min-h-[100svh] [&>canvas]:absolute [&>canvas]:inset-0 [&>canvas]:h-full [&>canvas]:min-h-[100svh] [&>canvas]:w-full [&>canvas]:outline-none [&>canvas]:block"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              minHeight: "100svh",
              background: "transparent",
            }}
          />
        ) : (
          <GlobeLoadingPlaceholder />
        )}
      </div>

      {/* Legibility + brand wash (no pointer capture) */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] min-h-[100svh] pointer-events-none"
        style={{
          background: `${M.scrimTop}, ${M.scrimBottom}, radial-gradient(ellipse 130% 85% at 50% 42%,${M.halo},transparent 70%)`,
        }}
      />

      {/* Foreground copy — only the card captures pointer events */}
      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 pt-10 pb-10 sm:pt-14 sm:pb-14 pointer-events-none">
        <div
          className="text-center mx-auto max-w-3xl w-full pointer-events-auto"
          style={{
            background: M.glassBg,
            backdropFilter: "blur(10px) saturate(120%)",
            WebkitBackdropFilter: "blur(10px) saturate(120%)",
            borderRadius: "22px",
            border: `1px solid ${M.glassBorder}`,
            boxShadow: M.glassShadow,
            padding: "20px 24px 22px",
          }}
        >
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.22em] uppercase"
              style={{
                background: isDark ? "rgba(0,0,0,0.35)" : "rgba(124,255,0,0.1)",
                border: `1px solid ${isDark ? "rgba(124,255,0,0.28)" : "rgba(124,255,0,0.25)"}`,
                color: C.text1,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
                style={{
                  background: C.accent,
                  boxShadow: "0 0 12px rgba(124,255,0,0.75)",
                }}
              />
              {copy.badge}
            </div>
            <h2
              className="font-black leading-[1.08]"
              style={{
                color: C.text1,
                fontSize: "clamp(1.35rem, 3vw, 2.35rem)",
                letterSpacing: locale === "fa" ? "0" : "-0.02em",
              }}
            >
              {copy.title}
            </h2>
            <p
              className="text-[14px] sm:text-[15px] leading-relaxed max-w-2xl mx-auto"
              style={{ color: C.text2 }}
            >
              {copy.subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
