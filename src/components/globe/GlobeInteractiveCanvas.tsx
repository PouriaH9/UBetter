"use client";

import { GlobeCanvas, type GlobeCanvasProps } from "./GlobeScene";

/** Default export for `next/dynamic(..., { ssr: false })`. */
export default function GlobeInteractiveCanvas(props: GlobeCanvasProps) {
  return <GlobeCanvas {...props} />;
}
