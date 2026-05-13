"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const sheetMotionShell =
  "pointer-events-auto relative origin-top overflow-hidden rounded-t-[2.25rem] sm:rounded-t-[3.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.4),0_-64px_170px_rgba(0,0,0,0.68),0_-110px_220px_rgba(0,0,0,0.32)] ring-1 ring-white/[0.12] sm:ring-2";

/** Pulls the next block up so it scrolls over the section below, with enter motion. */
export function ScrollStackLayer({
  children,
  zIndex,
  overlapVh = 92,
  /** When false, only vertical lift runs — avoids scaling WebGL / full-viewport layers (e.g. globe). */
  enterScale = true,
}: {
  children: ReactNode;
  zIndex: number;
  overlapVh?: number;
  enterScale?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });
  const lift = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [280, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion || !enterScale ? [1, 1] : [0.86, 1],
  );

  // Ref must sit *below* the overlap padding so "start" tracks the visible sheet, not the pulled-up margin edge.
  // Measuring the outer box completes progress ~overlapVh before the sheet enters — looks like no animation.
  return (
    <div
      className="relative pointer-events-none"
      style={{
        zIndex,
        marginTop: `calc(-1 * ${overlapVh}vh)`,
        paddingTop: `${overlapVh}vh`,
      }}
    >
      <div ref={ref} className="relative">
        <motion.div style={{ y: lift, scale }} className={sheetMotionShell}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}

/**
 * First sheet after a full-viewport hero (–100vh / +100vh). Same motion as the home product strip;
 * omit background images — children provide visuals.
 */
export function ScrollSheetOverHero({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const shellRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: shellRef,
    offset: ["start end", "start 0.28"],
  });
  const lift = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [340, 0]);
  const shellScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [0.84, 1]);

  return (
    <div className={`relative z-10 -mt-[100vh] pt-[100vh] pointer-events-none ${className}`}>
      <div ref={shellRef} className="relative">
        <motion.div style={{ y: lift, scale: shellScale }} className={sheetMotionShell}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
