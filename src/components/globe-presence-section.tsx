"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type SVGProps,
} from "react";

import {
  GLOBE_JOURNEY_ENTER_OFFSET_PX,
  GLOBE_PINNED_Z_INDEX,
  useHomeGlobeJourneyOptional,
} from "@/contexts/home-globe-journey-context";
import { homeStickyHeaderReservePx } from "@/lib/scroll-to-anchor";

import { useTheme, DARK_C, LIGHT_C } from "@/contexts/theme-context";
import type { Locale } from "@/i18n/config";
import { translations } from "@/i18n/translations";
import { globePresenceCopy } from "@/i18n/globe-presence.dict";

import { GLOBE_PRESENCE_EASE_CSS, GLOBE_PRESENCE_TRANSITION_SEC } from "./globe/constants";
import type { GlobePresencePhase } from "./globe/globe-types";

const GlobeInteractiveCanvas = dynamic(
  () => import("@/components/globe/GlobeInteractiveCanvas"),
  { ssr: false },
);

const YK = "'YekanBakh', 'IRANSansX', system-ui, sans-serif";

const BRAND_MARK = "UBETTER";
const TITLE_SEP = " — ";
const presenceSpring = [0.34, 1.45, 0.64, 1] as const;

type PresenceSceneSkin = {
  panelGradient: string;
  meshGlow: string;
  glassBg: string;
  glassBorder: string;
  glassShadow: string;
  badgeBg: string;
  badgeBorder: string;
  pulse: string;
  pulseGlow: string;
  statNum: string;
  divider: string;
};

function IconPresenceHq(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 12h18M12 3c2.5 2.8 3.8 5.9 3.8 9s-1.3 6.2-3.8 9M12 3c-2.5 2.8-3.8 5.9-3.8 9s1.3 6.2 3.8 9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

function IconPresencePartner(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12.5l2 2 3.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPresencePatent(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M8 4h8l2 2v14H6V6l2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M14 4v2h2M8 11h8M8 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 17l1.2 1.2L19 16.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPresenceCertOrg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M12 3l7 3v5c0 3.2-1.8 5.8-7 8-5.2-2.2-7-4.8-7-8V6l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9.5 12.5 11 14l3.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPresenceCertProduct(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="5" y="7" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CHINA_STAT_ICONS: ComponentType<SVGProps<SVGSVGElement>>[] = [
  IconPresencePatent,
  IconPresenceCertOrg,
  IconPresenceCertProduct,
];

function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduceMotion;
}

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

function PresenceSceneCornerBadge({
  skin,
  phase,
  isDark,
  reduceMotion,
}: {
  skin: PresenceSceneSkin;
  phase: GlobePresencePhase;
  isDark: boolean;
  reduceMotion: boolean;
}) {
  const SceneIcon = phase === "china" ? IconPresenceHq : IconPresencePartner;

  return (
    <motion.div
      className="absolute top-3 right-3 z-[2] flex h-10 w-10 items-center justify-center rounded-xl shadow-lg sm:top-4 sm:right-4 sm:h-11 sm:w-11"
      style={{
        background: isDark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.92)",
        border: `1px solid ${skin.badgeBorder}`,
        color: skin.pulse,
        boxShadow: `${skin.pulseGlow}, 0 8px 24px rgba(0,0,0,0.25)`,
      }}
      initial={{ opacity: 0, scale: 0.75, rotate: 12 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.5, ease: presenceSpring, delay: 0.12 }}
      aria-hidden
    >
      <motion.div
        animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
        transition={
          reduceMotion ? undefined : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <SceneIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
      </motion.div>
    </motion.div>
  );
}

function PresenceScenePanel({
  skin,
  phase,
  isDark,
  textColor,
  reduceMotion,
  children,
}: {
  skin: PresenceSceneSkin;
  phase: GlobePresencePhase;
  isDark: boolean;
  textColor: string;
  reduceMotion: boolean;
  children: ReactNode;
}) {
  const enter: Transition = {
    duration: reduceMotion ? 0.25 : 0.85,
    ease: presenceSpring,
  };

  return (
    <motion.div
      className="card-shimmer-border w-full"
      style={{ color: skin.pulse }}
      initial={{ opacity: 0, y: 32, scale: 0.94, filter: "blur(12px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, scale: 0.97, filter: "blur(8px)" }}
      transition={enter}
    >
      <motion.div
        className="card-shimmer-inner relative overflow-hidden rounded-[20px] px-6 py-6 sm:px-8 sm:py-7"
        style={{
          background: skin.glassBg,
          border: `1px solid ${skin.glassBorder}`,
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          boxShadow: skin.glassShadow,
          transition: `background ${GLOBE_PRESENCE_TRANSITION_SEC}s ${GLOBE_PRESENCE_EASE_CSS}, border-color ${GLOBE_PRESENCE_TRANSITION_SEC}s ${GLOBE_PRESENCE_EASE_CSS}, box-shadow ${GLOBE_PRESENCE_TRANSITION_SEC}s ${GLOBE_PRESENCE_EASE_CSS}`,
        }}
        animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
        transition={
          reduceMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* Layered scene background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: skin.panelGradient }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute -left-1/4 top-0 h-[70%] w-[70%] rounded-full blur-3xl"
          style={{ background: skin.meshGlow }}
          aria-hidden
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 24, 0], y: [0, 12, 0], opacity: [0.35, 0.55, 0.35] }
          }
          transition={
            reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          className="pointer-events-none absolute -bottom-1/4 -right-1/4 h-[60%] w-[60%] rounded-full blur-3xl"
          style={{ background: skin.meshGlow }}
          aria-hidden
          animate={
            reduceMotion
              ? undefined
              : { x: [0, -18, 0], opacity: [0.2, 0.4, 0.2] }
          }
          transition={
            reduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(${skin.pulse} 0.6px, transparent 0.6px)`,
            backgroundSize: "14px 14px",
          }}
          aria-hidden
        />

        <PresenceSceneCornerBadge
          skin={skin}
          phase={phase}
          isDark={isDark}
          reduceMotion={reduceMotion}
        />

        <motion.div
          className="relative z-[1] flex flex-col items-center gap-4 text-center"
          style={{ color: textColor }}
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.09, delayChildren: 0.06 } },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: presenceSpring },
  },
};

function PresenceSceneHeader({
  skin,
  locale,
  badge,
  reduceMotion,
}: {
  skin: PresenceSceneSkin;
  locale: Locale;
  badge: string;
  reduceMotion: boolean;
}) {
  return (
    <motion.div className="flex w-full justify-center px-10 sm:px-12" variants={itemVariants}>
      <motion.div
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[10px] font-bold tracking-[0.18em] sm:text-[11px] ${locale === "en" ? "uppercase" : ""}`}
        style={{
          background: skin.badgeBg,
          border: `1px solid ${skin.badgeBorder}`,
        }}
        animate={
          reduceMotion
            ? undefined
            : {
                boxShadow: [
                  `0 0 0px ${skin.pulse}00`,
                  `0 0 22px ${skin.pulse}44`,
                  `0 0 0px ${skin.pulse}00`,
                ],
              }
        }
        transition={
          reduceMotion ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <motion.span
          className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
          style={{ background: skin.pulse, boxShadow: skin.pulseGlow }}
          animate={reduceMotion ? undefined : { scale: [1, 1.35, 1] }}
          transition={
            reduceMotion ? undefined : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
          }
        />
        {badge}
      </motion.div>
    </motion.div>
  );
}

function PresenceSceneDivider({ skin }: { skin: PresenceSceneSkin }) {
  return (
    <motion.div
      className="h-px w-full max-w-[280px]"
      style={{
        background: `linear-gradient(90deg, transparent, ${skin.divider}, transparent)`,
      }}
      variants={itemVariants}
      aria-hidden
    />
  );
}

export function GlobePresenceSection({ locale }: { locale: Locale }) {
  const { isDark } = useTheme();
  const C = isDark ? DARK_C : LIGHT_C;
  const t = translations[locale];
  const presenceCopy = globePresenceCopy[locale];
  const globeAriaLabel = t.globe.ariaLabel;
  const journey = useHomeGlobeJourneyOptional();

  const [navReserve, setNavReserve] = useState(72);
  /** After first pin, keep canvas in a fixed layer — only fade in/out to avoid scroll jumps. */
  const [globeDocked, setGlobeDocked] = useState(false);
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

  /** Pin for the full scroll journey; unpin only when user scrolls back above the globe block. */
  useEffect(() => {
    if (!homeJourney || !sectionRef.current) return;

    let raf = 0;
    const check = () => {
      const el = sectionRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const vh = window.innerHeight;

      if (top <= GLOBE_JOURNEY_ENTER_OFFSET_PX) {
        journey?.pin();
      } else if (top > vh * 1.02) {
        journey?.unpin();
      }
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(check);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(sectionRef.current);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
    };
  }, [homeJourney, journey]);

  useEffect(() => {
    if (isPinned) setGlobeDocked(true);
  }, [isPinned]);

  const globeCanvasStyle = useMemo(() => {
    if (!globeDocked) return undefined;
    return {
      position: "fixed" as const,
      top: navReserve,
      left: 0,
      width: "100vw",
      height: `calc(100vh - ${navReserve}px)`,
      zIndex: GLOBE_PINNED_Z_INDEX,
      opacity: isPinned ? 1 : 0,
      visibility: isPinned ? ("visible" as const) : ("hidden" as const),
      pointerEvents: isPinned ? ("auto" as const) : ("none" as const),
      transition: "opacity 0.4s ease",
    };
  }, [globeDocked, isPinned, navReserve]);

  const sectionTopBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  const sceneSkin = useMemo((): PresenceSceneSkin => {
    if (presencePhase === "china") {
      return {
        panelGradient: isDark
          ? "linear-gradient(165deg, rgba(80,12,12,0.55) 0%, rgba(20,6,6,0.35) 45%, rgba(8,4,4,0.2) 100%)"
          : "linear-gradient(165deg, rgba(255,220,220,0.85) 0%, rgba(255,248,248,0.6) 50%, rgba(255,255,255,0.4) 100%)",
        meshGlow: isDark ? "rgba(255,90,90,0.35)" : "rgba(224,49,49,0.25)",
        glassBg: isDark ? "rgba(28,8,8,0.72)" : "rgba(255,250,250,0.88)",
        glassBorder: isDark ? "rgba(255,120,120,0.4)" : "rgba(210,70,70,0.35)",
        glassShadow: isDark
          ? "inset 0 1px 0 rgba(255,150,150,0.12), 0 20px 60px rgba(40,0,0,0.5), 0 0 0 1px rgba(255,80,80,0.08)"
          : "inset 0 1px 0 rgba(255,255,255,0.9), 0 20px 50px rgba(180,50,50,0.12), 0 0 40px rgba(224,49,49,0.08)",
        badgeBg: isDark ? "rgba(90,20,20,0.55)" : "rgba(255,210,210,0.5)",
        badgeBorder: isDark ? "rgba(255,140,140,0.45)" : "rgba(200,80,80,0.32)",
        pulse: isDark ? "#ff6b6b" : "#e03131",
        pulseGlow: isDark ? "0 0 20px rgba(255,90,90,0.85)" : "0 0 16px rgba(224,49,49,0.5)",
        statNum: isDark ? "#ff8787" : "#c92a2a",
        divider: isDark ? "rgba(255,130,130,0.5)" : "rgba(210,70,70,0.4)",
      };
    }
    return {
      panelGradient: isDark
        ? "linear-gradient(165deg, rgba(20,40,8,0.5) 0%, rgba(8,12,6,0.35) 50%, rgba(4,6,4,0.15) 100%)"
        : "linear-gradient(165deg, rgba(210,255,160,0.5) 0%, rgba(240,255,230,0.55) 50%, rgba(255,255,255,0.35) 100%)",
      meshGlow: isDark ? "rgba(124,255,0,0.28)" : "rgba(74,156,0,0.22)",
      glassBg: isDark ? "rgba(8,12,8,0.78)" : "rgba(255,255,255,0.9)",
      glassBorder: isDark ? "rgba(124,255,0,0.32)" : "rgba(124,255,0,0.22)",
      glassShadow: isDark
        ? "inset 0 1px 0 rgba(124,255,0,0.1), 0 20px 60px rgba(0,0,0,0.55), 0 0 48px rgba(124,255,0,0.06)"
        : "inset 0 1px 0 rgba(255,255,255,0.95), 0 20px 50px rgba(0,0,0,0.08), 0 0 40px rgba(124,255,0,0.1)",
      badgeBg: isDark ? "rgba(0,0,0,0.4)" : "rgba(124,255,0,0.12)",
      badgeBorder: isDark ? "rgba(124,255,0,0.35)" : "rgba(74,156,0,0.28)",
      pulse: C.accent,
      pulseGlow: isDark ? "0 0 18px rgba(124,255,0,0.7)" : "0 0 14px rgba(74,156,0,0.45)",
      statNum: C.accent,
      divider: isDark ? "rgba(124,255,0,0.45)" : "rgba(74,156,0,0.35)",
    };
  }, [presencePhase, isDark, C.accent]);

  const slide = presencePhase === "china" ? presenceCopy.china : presenceCopy.iran;
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      ref={sectionRef}
      dir={t.dir}
      lang={locale === "fa" ? "fa" : locale === "zh" ? "zh" : "en"}
      className={`relative overflow-hidden min-h-[100svh] w-full ${locale !== "fa" ? "font-sans" : ""}`}
      style={{
        borderTop: `1px solid ${sectionTopBorder}`,
        fontFamily: locale === "fa" ? YK : undefined,
        background: isPinned && homeJourney ? "transparent" : isDark ? "#040506" : "#dde6ea",
      }}
    >
      <motion.div
        className="absolute inset-0 z-0 w-full min-h-[100svh]"
        style={globeCanvasStyle}
        role="img"
        aria-label={globeAriaLabel}
        aria-hidden={!isPinned}
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
      </motion.div>

      <motion.div
        className="relative w-full max-w-[1340px] mx-auto px-4 sm:px-8 lg:px-12 pt-10 pb-10 sm:pt-14 sm:pb-14 pointer-events-none"
        style={{ zIndex: isPinned ? 20 : 10 }}
      >
        <div
          className="relative mx-auto w-full max-w-3xl pointer-events-auto"
          aria-live="polite"
          style={{ zIndex: isPinned ? 21 : 1 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <PresenceScenePanel
              key={presencePhase}
              skin={sceneSkin}
              phase={presencePhase}
              isDark={isDark}
              textColor={C.text1}
              reduceMotion={reduceMotion}
            >
              <PresenceSceneHeader
                skin={sceneSkin}
                locale={locale}
                badge={slide.badge}
                reduceMotion={reduceMotion}
              />

              <PresenceSceneDivider skin={sceneSkin} />

              {presencePhase === "china" ? (
                <>
                  <motion.h2
                    className="font-black leading-[1.08]"
                    style={{
                      fontSize: "clamp(1.35rem, 3vw, 2.2rem)",
                      letterSpacing: locale === "en" ? "-0.02em" : "0",
                    }}
                    variants={itemVariants}
                  >
                    {globeChinaHeading(slide.title)}
                  </motion.h2>
                  <motion.div
                    className="grid w-full max-w-xl grid-cols-3 gap-3 pt-1 sm:gap-4"
                    dir="ltr"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.08, delayChildren: 0.04 } },
                    }}
                  >
                    {presenceCopy.china.stats.map((row, i) => {
                      const StatIcon = CHINA_STAT_ICONS[i] ?? IconPresenceCertProduct;
                      return (
                        <motion.div
                          key={row.label}
                          className="flex flex-col items-center gap-2 rounded-xl px-1 py-2"
                          style={{
                            background: isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.45)",
                            border: `1px solid ${sceneSkin.badgeBorder}`,
                          }}
                          variants={itemVariants}
                        >
                          <motion.div
                            className="flex h-9 w-9 items-center justify-center rounded-xl"
                            style={{
                              background: sceneSkin.badgeBg,
                              color: sceneSkin.pulse,
                            }}
                            animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
                            transition={
                              reduceMotion
                                ? undefined
                                : {
                                    duration: 3 + i * 0.35,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.2,
                                  }
                            }
                          >
                            <StatIcon className="h-4 w-4" />
                          </motion.div>
                          <motion.div
                            className="flex flex-wrap items-baseline justify-center gap-0.5 font-black tabular-nums leading-none"
                            style={{
                              color: sceneSkin.statNum,
                              fontSize: "clamp(1.4rem, 3.8vw, 2rem)",
                            }}
                          >
                            <span>{row.value}</span>
                            {row.unit ? (
                              <span
                                className="text-[10px] font-bold opacity-90 sm:text-[11px]"
                                style={{ color: C.text2 }}
                              >
                                {row.unit}
                              </span>
                            ) : null}
                          </motion.div>
                          <p
                            className="text-[10px] leading-snug sm:text-[11px]"
                            style={{ color: C.text2 }}
                          >
                            {row.label}
                          </p>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </>
              ) : (
                <motion.h2
                  className="font-black leading-[1.1] px-2"
                  style={{
                    fontSize: "clamp(1.3rem, 3.5vw, 2.15rem)",
                    letterSpacing: locale === "fa" ? "0" : locale === "en" ? "-0.02em" : "0",
                  }}
                  variants={itemVariants}
                >
                  {slide.title}
                </motion.h2>
              )}
            </PresenceScenePanel>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
