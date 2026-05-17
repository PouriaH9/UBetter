"use client";

import { useEffect, useState } from "react";

/** Tailwind default breakpoints (matches tailwind.config — no custom screens). */
const BREAKPOINTS = [
  { name: "2xl", min: 1536 },
  { name: "xl", min: 1280 },
  { name: "lg", min: 1024 },
  { name: "md", min: 768 },
  { name: "sm", min: 640 },
] as const;

function getBreakpoint(width: number): string {
  for (const bp of BREAKPOINTS) {
    if (width >= bp.min) return bp.name;
  }
  return "base (<640)";
}

type Metrics = {
  scrollY: number;
  maxScroll: number;
  scrollPct: number;
  width: number;
  height: number;
  breakpoint: string;
};

function readMetrics(): Metrics {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight;
  const height = window.innerHeight;
  const maxScroll = Math.max(0, docHeight - height);
  const scrollPct = maxScroll > 0 ? Math.round((scrollY / maxScroll) * 100) : 0;

  return {
    scrollY: Math.round(scrollY),
    maxScroll: Math.round(maxScroll),
    scrollPct,
    width: window.innerWidth,
    height,
    breakpoint: getBreakpoint(window.innerWidth),
  };
}

export function ScrollViewportDebug() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const update = () => setMetrics(readMetrics());
    update();

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (process.env.NODE_ENV !== "development" || !metrics) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-3 left-3 z-[99999] rounded-lg border border-white/15 bg-black/80 px-2.5 py-2 font-mono text-[10px] leading-relaxed text-white/90 shadow-lg backdrop-blur-sm"
    >
      <div className="mb-1 text-[9px] font-semibold uppercase tracking-wider text-emerald-400/90">
        Scroll · viewport
      </div>
      <div>
        <span className="text-white/50">Y </span>
        {metrics.scrollY}px
        <span className="text-white/40"> / {metrics.maxScroll}px</span>
        <span className="text-emerald-300/80"> ({metrics.scrollPct}%)</span>
      </div>
      <div>
        <span className="text-white/50">Size </span>
        {metrics.width}×{metrics.height}
      </div>
      <div className="text-amber-300/90">
        <span className="text-white/50">BP </span>
        {metrics.breakpoint}
      </div>
    </div>
  );
}
