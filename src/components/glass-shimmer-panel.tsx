"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import type { ComponentType, ReactNode, SVGProps } from "react";

const panelSpring = [0.34, 1.45, 0.64, 1] as const;

export type GlassPanelSkin = {
  panelGradient: string;
  meshGlow: string;
  glassBg: string;
  glassBorder: string;
  glassShadow: string;
  badgeBg: string;
  badgeBorder: string;
  pulse: string;
  pulseGlow: string;
  divider: string;
  /** High-contrast copy on frosted panels over the globe */
  titleColor: string;
  subtitleColor: string;
  textShadow: string;
};

export function buildAccentGlassSkin(
  isDark: boolean,
  accent: string,
  accentGlow: string,
): GlassPanelSkin {
  return {
    panelGradient: isDark
      ? `linear-gradient(165deg, rgba(20,40,8,0.55) 0%, rgba(8,12,6,0.4) 48%, rgba(4,6,4,0.2) 100%)`
      : `linear-gradient(165deg, rgba(210,255,160,0.45) 0%, rgba(240,255,230,0.5) 50%, rgba(255,255,255,0.35) 100%)`,
    meshGlow: isDark ? `${accent}47` : `${accent}38`,
    glassBg: isDark ? "rgba(5,8,5,0.94)" : "rgba(255,255,255,0.96)",
    glassBorder: isDark ? `${accent}52` : `${accent}38`,
    glassShadow: isDark
      ? `inset 0 1px 0 ${accent}1a, 0 20px 60px rgba(0,0,0,0.55), 0 0 48px ${accent}0f`
      : `inset 0 1px 0 rgba(255,255,255,0.95), 0 20px 50px rgba(0,0,0,0.08), 0 0 40px ${accent}14`,
    badgeBg: isDark ? "rgba(0,0,0,0.4)" : `${accent}1a`,
    badgeBorder: isDark ? `${accent}59` : `${accent}47`,
    pulse: accent,
    pulseGlow: accentGlow,
    divider: isDark ? `${accent}73` : `${accent}59`,
    titleColor: isDark ? "#ffffff" : "#0a0a0a",
    subtitleColor: isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.78)",
    textShadow: isDark ? "0 1px 14px rgba(0,0,0,0.85)" : "0 1px 8px rgba(255,255,255,0.9)",
  };
}

/** Standard frosted glass for cards and content trays over the globe. */
export function sectionGlassSkin(isDark: boolean, variant: "panel" | "card" = "panel") {
  const border = isDark ? "rgba(124,255,0,0.22)" : "rgba(124,255,0,0.15)";
  return {
    background: isDark ? "rgba(6,8,6,0.82)" : "rgba(255,255,255,0.92)",
    backdropFilter: "blur(16px) saturate(140%)",
    WebkitBackdropFilter: "blur(16px) saturate(140%)",
    border: `1px solid ${border}`,
    boxShadow:
      variant === "panel"
        ? isDark
          ? "inset 0 1px 0 rgba(124,255,0,0.1), 0 12px 48px rgba(0,0,0,0.5)"
          : "inset 0 1px 0 rgba(255,255,255,0.6), 0 12px 40px rgba(0,0,0,0.1)"
        : isDark
          ? "inset 0 1px 0 rgba(124,255,0,0.1), inset 0 -1px 0 rgba(0,0,0,0.35), 0 8px 32px rgba(0,0,0,0.45)"
          : "inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.06), 0 8px 28px rgba(0,0,0,0.08)",
  };
}

export const glassPanelItemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: panelSpring },
  },
};

export function GlassPanelDivider({ skin }: { skin: GlassPanelSkin }) {
  return (
    <motion.div
      className="h-px w-full max-w-[min(100%,320px)] mx-auto"
      style={{
        background: `linear-gradient(90deg, transparent, ${skin.divider}, transparent)`,
      }}
      variants={glassPanelItemVariants}
      aria-hidden
    />
  );
}

export function GlassPanelBadge({
  locale,
  label,
  icon: Icon,
  skin,
  reduceMotion,
}: {
  locale: string;
  label: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  skin: GlassPanelSkin;
  reduceMotion: boolean;
}) {
  return (
    <motion.div className="flex w-full justify-center px-10 sm:px-12" variants={glassPanelItemVariants}>
      <motion.div
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[10px] font-bold tracking-[0.18em] sm:text-[11px] ${locale === "en" ? "uppercase" : ""}`}
        style={{
          background: skin.badgeBg,
          border: `1px solid ${skin.badgeBorder}`,
          color: skin.pulse,
        }}
        animate={
          reduceMotion
            ? undefined
            : {
                boxShadow: [
                  `0 0 0px ${skin.pulse}00`,
                  `0 0 20px ${skin.pulse}44`,
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
        {label}
      </motion.div>
    </motion.div>
  );
}

export function GlassShimmerPanel({
  skin,
  isDark,
  cornerIcon: CornerIcon,
  children,
  className = "",
  animateEntrance = true,
  compact = false,
}: {
  skin: GlassPanelSkin;
  isDark: boolean;
  cornerIcon?: ComponentType<SVGProps<SVGSVGElement>>;
  children: ReactNode;
  className?: string;
  animateEntrance?: boolean;
  /** Tighter padding for header-only panels */
  compact?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  const enter: Transition = {
    duration: reduceMotion ? 0.2 : 0.85,
    ease: panelSpring,
  };

  return (
    <motion.div
      className={`card-shimmer-border w-full ${className}`}
      style={{ color: skin.pulse }}
      initial={animateEntrance ? { opacity: 0, y: 28, scale: 0.94, filter: "blur(10px)" } : false}
      whileInView={animateEntrance ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : undefined}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={enter}
    >
      <motion.div
        className={`card-shimmer-inner relative overflow-hidden rounded-[20px] ${
          compact ? "px-6 py-6 sm:px-8 sm:py-7" : "px-6 py-7 sm:px-8 sm:py-8"
        }`}
        style={{
          background: compact
            ? isDark
              ? "rgba(4,6,4,0.96)"
              : "rgba(255,255,255,0.98)"
            : skin.glassBg,
          border: `1px solid ${skin.glassBorder}`,
          backdropFilter: "blur(24px) saturate(140%)",
          WebkitBackdropFilter: "blur(24px) saturate(140%)",
          boxShadow: skin.glassShadow,
          color: skin.titleColor,
        }}
        animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
        transition={
          reduceMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ background: skin.panelGradient }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: isDark
              ? "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%)"
              : "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.75) 100%)",
          }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute -left-1/4 top-0 h-[70%] w-[70%] rounded-full blur-3xl"
          style={{ background: skin.meshGlow }}
          aria-hidden
          animate={
            reduceMotion ? undefined : { x: [0, 20, 0], y: [0, 10, 0], opacity: compact ? [0.12, 0.22, 0.12] : [0.3, 0.5, 0.3] }
          }
          transition={
            reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          className="pointer-events-none absolute -bottom-1/4 -right-1/4 h-[55%] w-[55%] rounded-full blur-3xl"
          style={{ background: skin.meshGlow }}
          aria-hidden
          animate={
            reduceMotion ? undefined : { x: [0, -14, 0], opacity: compact ? [0.08, 0.16, 0.08] : [0.18, 0.36, 0.18] }
          }
          transition={
            reduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
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

        {CornerIcon ? (
          <motion.div
            className="absolute top-3 right-3 z-[2] flex h-10 w-10 items-center justify-center rounded-xl shadow-lg sm:top-4 sm:right-4 sm:h-11 sm:w-11"
            style={{
              background: isDark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.92)",
              border: `1px solid ${skin.badgeBorder}`,
              color: skin.pulse,
              boxShadow: `${skin.pulseGlow}, 0 8px 24px rgba(0,0,0,0.22)`,
            }}
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: panelSpring, delay: 0.1 }}
            aria-hidden
          >
            <CornerIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          </motion.div>
        ) : null}

        <motion.div
          className={`relative z-[1] flex flex-col items-center text-center ${
            compact ? "gap-4 sm:gap-5" : "gap-5 sm:gap-6"
          }`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-6% 0px" }}
          variants={{
            visible: {
              transition: { staggerChildren: reduceMotion ? 0 : 0.08, delayChildren: 0.05 },
            },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
