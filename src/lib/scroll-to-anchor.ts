/** Matches UsageCalculatorSection `scroll-mt-*` — clearance under fixed navbar. */
export function homeStickyHeaderReservePx(): number {
  if (typeof window === "undefined") return 96;
  const md = window.matchMedia("(min-width: 768px)").matches;
  const sm = window.matchMedia("(min-width: 640px)").matches;
  if (md || sm) return 96;
  return 88;
}

export const UPS_CALCULATOR_SECTION_ID = "ups-calculator";

function scrollYAlignVisualTop(el: HTMLElement, reservePx: number, behavior: ScrollBehavior) {
  const rect = el.getBoundingClientRect();
  const top = rect.top + window.scrollY - reservePx;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

/**
 * Align to the element’s painted position (accounts for transforms).
 * Re-applies across frames/timeouts — scroll-linked motion on stacked sheets
 * shifts the visual box after the browser’s default `#hash` scroll.
 */
export function scrollToSectionBelowStickyHeader(
  elementId: string,
  opts?: { behavior?: ScrollBehavior },
): boolean {
  const el = document.getElementById(elementId);
  if (!el) return false;

  const reserve = homeStickyHeaderReservePx();
  const primary = opts?.behavior ?? "auto";

  const snap = (behavior: ScrollBehavior) =>
    scrollYAlignVisualTop(el, reserve, behavior);

  snap(primary);

  requestAnimationFrame(() => {
    snap("auto");
    requestAnimationFrame(() => {
      snap("auto");
      requestAnimationFrame(() => snap("auto"));
    });
  });

  for (const ms of [50, 120, 260, 480, 720]) {
    window.setTimeout(() => snap("auto"), ms);
  }

  return true;
}
