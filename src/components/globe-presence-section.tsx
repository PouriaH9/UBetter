"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";

import {
  GLOBE_JOURNEY_ENTER_OFFSET_PX,
  GLOBE_JOURNEY_LEAVE_OFFSET_PX,
  useHomeGlobeJourneyOptional,
} from "@/contexts/home-globe-journey-context";
import { useElementTopAtViewport } from "@/lib/use-element-top-at-viewport";
import { homeStickyHeaderReservePx } from "@/lib/scroll-to-anchor";

import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";
import type { Locale } from "@/i18n/config";
import { translations } from "@/i18n/translations";
import { globePresenceCopy } from "@/i18n/globe-presence.dict";

import {
  GLOBE_PRESENCE_EASE_CSS,
  GLOBE_PRESENCE_EASE_FRAMER,
  GLOBE_PRESENCE_TRANSITION_SEC,
} from "./globe/constants";
import type { GlobePresencePhase } from "./globe/globe-types";

const GlobeInteractiveCanvas = dynamic(
  () => import("@/components/globe/GlobeInteractiveCanvas"),
  { ssr: false },
);

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";

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
  const journey = useHomeGlobeJourneyOptional();

  const [showTopHitOk, setShowTopHitOk] = useState(false);
  const [navReserve, setNavReserve] = useState(72);
  const sectionRef = useRef<HTMLElement>(null);

  const isPinned = journey?.isPinned ?? false;
  const homeJourney = journey != null;
  const presencePhase: GlobePresencePhase = journey?.presencePhase ?? "china";
  const polygons = journey?.polygons ?? null;

  useLayoutEffect(() => {
    const sync = () => setNavReserve(homeStickyHeaderReservePx());
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const onSectionEnter = useCallback(() => {
    journey?.pin();
    setShowTopHitOk(true);
  }, [journey]);

  const onSectionLeave = useCallback(() => {
    journey?.unpin();
  }, [journey]);

  useElementTopAtViewport(sectionRef, onSectionEnter, {
    offsetPx: GLOBE_JOURNEY_ENTER_OFFSET_PX,
    leaveOffsetPx: GLOBE_JOURNEY_LEAVE_OFFSET_PX,
    once: !homeJourney,
    onLeave: homeJourney ? onSectionLeave : undefined,
  });

  const pinnedCanvasStyle = useMemo(
    () =>
      isPinned
        ? {
            position: "fixed" as const,
            top: navReserve,
            left: 0,
            width: "100vw",
            height: `calc(100vh - ${navReserve}px)`,
            zIndex: 0,
          }
        : undefined,
    [isPinned, navReserve],
  );

  useEffect(() => {
    if (!showTopHitOk) return;
    const id = setTimeout(() => setShowTopHitOk(false), 2200);
    return () => clearTimeout(id);
  }, [showTopHitOk]);

  const M = useMemo(() => {
    return {
      sectionTopBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
      glassBg: isDark ? "rgba(8,10,8,0.45)" : "rgba(255,255,255,0.82)",
      glassBorder: isDark ? "rgba(124,255,0,0.22)" : "rgba(124,255,0,0.15)",
      glassShadow: isDark
        ? "inset 0 1px 0 rgba(124,255,0,0.08), inset 0 -1px 0 rgba(0,0,0,0.35), 0 12px 48px rgba(0,0,0,0.55)"
        : "inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.06), 0 12px 44px rgba(0,0,0,0.1)",
    };
  }, [isDark]);

  const cardSkin = useMemo(() => {
    if (presencePhase === "china") {
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
  }, [presencePhase, isDark, M.glassBg, M.glassBorder, M.glassShadow, C.accent]);

  const slide = presencePhase === "china" ? presenceCopy.china : presenceCopy.iran;

  return (
    <section
      ref={sectionRef}
      dir={t.dir}
      lang={locale === "fa" ? "fa" : locale === "zh" ? "zh" : "en"}
      className={`relative overflow-hidden min-h-[100svh] w-full ${locale !== "fa" ? "font-sans" : ""}`}
      style={{
        borderTop: `1px solid ${M.sectionTopBorder}`,
        fontFamily: locale === "fa" ? YK : undefined,
        background: isPinned && homeJourney ? "transparent" : isDark ? "#040506" : "#dde6ea",
      }}
    >
      <div
        className="absolute inset-0 z-0 w-full min-h-[100svh]"
        style={pinnedCanvasStyle}
        role="img"
        aria-label={globeAriaLabel}
        aria-hidden={isPinned}
      >
        {polygons && polygons.length > 0 ? (
          <GlobeInteractiveCanvas
            presencePhase={presencePhase}
            polygons={polygons}
            cleanShell
            className="absolute inset-0 block h-full w-full [&>canvas]:absolute [&>canvas]:inset-0 [&>canvas]:h-full [&>canvas]:w-full [&>canvas]:outline-none [&>canvas]:block"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              background: "transparent",
            }}
          />
        ) : (
          <div className="absolute inset-0" aria-hidden />
        )}
      </div>

      <motion.div
        className="relative w-full max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 pt-10 pb-10 sm:pt-14 sm:pb-14 pointer-events-none"
        style={{ zIndex: isPinned ? 20 : 10 }}
      >
        <motion.div
          className="relative text-center mx-auto max-w-3xl w-full pointer-events-auto"
          aria-live="polite"
          style={{
            zIndex: isPinned ? 21 : 1,
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
              key={presencePhase}
              className="flex flex-col items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{
                duration: GLOBE_PRESENCE_TRANSITION_SEC * 0.5,
                ease: GLOBE_PRESENCE_EASE_FRAMER,
              }}
            >
              <motion.div
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
              </motion.div>
              <h2
                className="font-black leading-[1.08]"
                style={{
                  color: C.text1,
                  fontSize: "clamp(1.35rem, 3vw, 2.35rem)",
                  letterSpacing: locale === "fa" ? "0" : locale === "zh" ? "0" : "-0.02em",
                }}
              >
                {presencePhase === "china" ? globeChinaHeading(slide.title) : slide.title}
              </h2>
              {presencePhase === "china" ? (
                <div
                  className="grid grid-cols-3 gap-3 sm:gap-5 w-full max-w-xl mx-auto pt-1"
                  dir="ltr"
                >
                  {presenceCopy.china.stats.map((row) => (
                    <motion.div key={row.label} className="flex flex-col items-center gap-1">
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
                    </motion.div>
                  ))}
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showTopHitOk ? (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: GLOBE_PRESENCE_EASE_FRAMER }}
            className="fixed left-1/2 top-1/2 z-[100] -translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded-full text-sm font-bold tracking-wide pointer-events-none"
            style={{
              background: isDark ? "rgba(124,255,0,0.92)" : "rgba(74,156,0,0.94)",
              color: isDark ? "#041004" : "#fff",
              boxShadow: "0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.12)",
            }}
          >
            OK
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
