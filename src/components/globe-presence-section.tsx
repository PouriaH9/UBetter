"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState, type ReactNode } from "react";

import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";
import type { Locale } from "@/i18n/config";
import { translations } from "@/i18n/translations";
import { globePresenceCopy } from "@/i18n/globe-presence.dict";

import {
  GEOJSON_URL,
  GLOBE_PRESENCE_EASE_CSS,
  GLOBE_PRESENCE_EASE_FRAMER,
  GLOBE_PRESENCE_TRANSITION_SEC,
} from "./globe/constants";
import type { CountryFeature, GlobePresencePhase } from "./globe/globe-types";

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

const BRAND_MARK = "UBETTER";
const TITLE_SEP = " — ";

function globeChinaHeading(title: string): ReactNode {
  if (title === BRAND_MARK) {
    return (
      <span dir="ltr" className="inline-block align-baseline">
        {BRAND_MARK}
      </span>
    );
  }
  const prefix = BRAND_MARK + TITLE_SEP;
  if (title.startsWith(prefix)) {
    const after = title.slice(prefix.length);
    return (
      <>
        <span dir="ltr" className="inline-block align-baseline">
          {BRAND_MARK}
        </span>
        {TITLE_SEP}
        {after}
      </>
    );
  }
  return title;
}

export function GlobePresenceSection({ locale }: { locale: Locale }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const t = translations[locale];
  const presenceCopy = globePresenceCopy[locale];
  const globeAriaLabel = t.globe.ariaLabel;

  const [phase, setPhase] = useState<GlobePresencePhase>("china");
  const [polygons, setPolygons] = useState<CountryFeature[] | null>(null);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const intervalMs = reduce ? 14000 : 7000;
    const id = window.setInterval(() => {
      setPhase((p) => (p === "china" ? "iran" : "china"));
    }, intervalMs);
    return () => window.clearInterval(id);
  }, []);

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

  const cardSkin = useMemo(() => {
    if (phase === "china") {
      return {
        glassBg: isDark ? "rgba(36,10,10,0.5)" : "rgba(255,246,246,0.9)",
        glassBorder: isDark ? "rgba(255,100,100,0.45)" : "rgba(210,70,70,0.32)",
        glassShadow: isDark
          ? "inset 0 1px 0 rgba(255,130,130,0.14), inset 0 -1px 0 rgba(0,0,0,0.38), 0 12px 48px rgba(60,0,0,0.42)"
          : "inset 0 1px 0 rgba(255,210,210,0.55), inset 0 -1px 0 rgba(0,0,0,0.07), 0 12px 44px rgba(180,50,50,0.14)",
        badgeBg: isDark ? "rgba(70,18,18,0.5)" : "rgba(255,210,210,0.45)",
        badgeBorder: isDark ? "rgba(255,130,130,0.42)" : "rgba(200,80,80,0.3)",
        pulse: isDark ? "#ff6b6b" : "#e03131",
        pulseGlow: isDark ? "0 0 14px rgba(255,90,90,0.9)" : "0 0 12px rgba(224,49,49,0.55)",
        statNum: isDark ? "#ff8787" : "#c92a2a",
      };
    }
    return {
      glassBg: M.glassBg,
      glassBorder: M.glassBorder,
      glassShadow: M.glassShadow,
      badgeBg: isDark ? "rgba(0,0,0,0.35)" : "rgba(124,255,0,0.1)",
      badgeBorder: isDark ? "rgba(124,255,0,0.28)" : "rgba(124,255,0,0.25)",
      pulse: C.accent,
      pulseGlow: isDark ? "0 0 12px rgba(124,255,0,0.75)" : "0 0 12px rgba(74,156,0,0.45)",
      statNum: C.accent,
    };
  }, [phase, isDark, M.glassBg, M.glassBorder, M.glassShadow, C.accent]);

  const slide = phase === "china" ? presenceCopy.china : presenceCopy.iran;

  return (
    <section
      dir={t.dir}
      lang={locale === "fa" ? "fa" : locale === "zh" ? "zh" : "en"}
      className={`relative overflow-hidden min-h-[100svh] w-full ${locale !== "fa" ? "font-sans" : ""}`}
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
        aria-label={globeAriaLabel}
      >
        {polygons && polygons.length ? (
          <GlobeInteractiveCanvas
            presencePhase={phase}
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
          aria-live="polite"
          style={{
            background: cardSkin.glassBg,
            backdropFilter: "blur(10px) saturate(120%)",
            WebkitBackdropFilter: "blur(10px) saturate(120%)",
            borderRadius: "22px",
            border: `1px solid ${cardSkin.glassBorder}`,
            boxShadow: cardSkin.glassShadow,
            padding: "20px 24px 22px",
            transition: `background ${GLOBE_PRESENCE_TRANSITION_SEC}s ${GLOBE_PRESENCE_EASE_CSS}, border-color ${GLOBE_PRESENCE_TRANSITION_SEC}s ${GLOBE_PRESENCE_EASE_CSS}, box-shadow ${GLOBE_PRESENCE_TRANSITION_SEC}s ${GLOBE_PRESENCE_EASE_CSS}`,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={phase}
              className="flex flex-col items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{
                /* Exit + enter = one full `GLOBE_PRESENCE_TRANSITION_SEC`, same as globe blend */
                duration: GLOBE_PRESENCE_TRANSITION_SEC * 0.5,
                ease: GLOBE_PRESENCE_EASE_FRAMER,
              }}
            >
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.22em] ${locale === "en" ? "uppercase" : ""}`}
                style={{
                  background: cardSkin.badgeBg,
                  border: `1px solid ${cardSkin.badgeBorder}`,
                  color: C.text1,
                  transition: `background ${GLOBE_PRESENCE_TRANSITION_SEC}s ${GLOBE_PRESENCE_EASE_CSS}, border-color ${GLOBE_PRESENCE_TRANSITION_SEC}s ${GLOBE_PRESENCE_EASE_CSS}`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
                  style={{
                    background: cardSkin.pulse,
                    boxShadow: cardSkin.pulseGlow,
                    transition: `background ${GLOBE_PRESENCE_TRANSITION_SEC}s ${GLOBE_PRESENCE_EASE_CSS}, box-shadow ${GLOBE_PRESENCE_TRANSITION_SEC}s ${GLOBE_PRESENCE_EASE_CSS}`,
                  }}
                />
                {slide.badge}
              </div>
              <h2
                className="font-black leading-[1.08]"
                style={{
                  color: C.text1,
                  fontSize: "clamp(1.35rem, 3vw, 2.35rem)",
                  letterSpacing: locale === "fa" ? "0" : locale === "zh" ? "0" : "-0.02em",
                }}
              >
                {phase === "china" ? globeChinaHeading(slide.title) : slide.title}
              </h2>
              {phase === "china" ? (
                <div
                  className="grid grid-cols-3 gap-3 sm:gap-5 w-full max-w-xl mx-auto pt-1"
                  dir="ltr"
                >
                  {presenceCopy.china.stats.map((row) => (
                    <div key={row.label} className="flex flex-col items-center gap-1">
                      <div
                        className="font-black tabular-nums leading-none flex flex-wrap items-baseline justify-center gap-0.5"
                        style={{
                          color: cardSkin.statNum,
                          fontSize: "clamp(1.65rem, 4.2vw, 2.35rem)",
                          transition: `color ${GLOBE_PRESENCE_TRANSITION_SEC}s ${GLOBE_PRESENCE_EASE_CSS}`,
                        }}
                      >
                        <span>{row.value}</span>
                        {row.unit ? (
                          <span
                            className="text-[11px] sm:text-xs font-bold opacity-90"
                            style={{ color: C.text2 }}
                          >
                            {row.unit}
                          </span>
                        ) : null}
                      </div>
                      <p
                        className="text-[11px] sm:text-[12px] leading-snug px-0.5"
                        style={{ color: C.text2 }}
                      >
                        {row.label}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
