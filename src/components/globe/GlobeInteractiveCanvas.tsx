"use client";

import type { CSSProperties } from "react";

import type { CountryFeature } from "./globe-types";
import { GlobeCanvas } from "./GlobeScene";

type Props = {
  polygons: CountryFeature[];
  className?: string;
  style?: CSSProperties;
};

/** Default export for `next/dynamic(..., { ssr: false })`. */
export default function GlobeInteractiveCanvas({
  polygons,
  className,
  style,
}: Props) {
  return (
    <GlobeCanvas polygons={polygons} className={className} style={style} />
  );
}
