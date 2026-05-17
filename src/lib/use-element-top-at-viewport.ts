"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Fires when an element's top edge crosses the viewport top (plus optional offset).
 * Uses getBoundingClientRect — works across breakpoints and scroll-stack transforms.
 */
export function useElementTopAtViewport(
  ref: RefObject<HTMLElement | null>,
  onHit: () => void,
  options?: {
    offsetPx?: number;
    /** When set with `once: false`, fires after scrolling back above this (hysteresis). */
    leaveOffsetPx?: number;
    once?: boolean;
    onLeave?: () => void;
  },
) {
  const enteredRef = useRef(false);
  const onHitRef = useRef(onHit);
  const onLeaveRef = useRef(options?.onLeave);
  onHitRef.current = onHit;
  onLeaveRef.current = options?.onLeave;

  const enterOffsetPx = options?.offsetPx ?? 0;
  const leaveOffsetPx = options?.leaveOffsetPx ?? enterOffsetPx + 28;
  const once = options?.once ?? true;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const check = () => {
      const node = ref.current;
      if (!node) return;
      const top = node.getBoundingClientRect().top;
      if (top <= enterOffsetPx) {
        if (!enteredRef.current) {
          enteredRef.current = true;
          onHitRef.current();
        }
      } else if (top > leaveOffsetPx && enteredRef.current && !once) {
        enteredRef.current = false;
        onLeaveRef.current?.();
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
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
    };
  }, [ref, enterOffsetPx, leaveOffsetPx, once]);
}
