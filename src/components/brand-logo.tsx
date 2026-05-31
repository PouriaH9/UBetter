"use client";

import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";

import { brandAssets } from "@/assets/brand-assets";
import type { Locale } from "@/i18n/config";
import { ui3 } from "@/i18n/locale-ui";

export type BrandLogoSize = "xs" | "sm" | "md" | "lg";

const HEIGHT: Record<BrandLogoSize, number> = {
  xs: 22,
  sm: 32,
  md: 44,
  lg: 56,
};

type BaseProps = {
  size?: BrandLogoSize;
  className?: string;
  priority?: boolean;
};

function logoHeight(size: BrandLogoSize, responsive?: boolean): CSSProperties {
  if (!responsive) return { height: HEIGHT[size] };
  const h = HEIGHT[size];
  return { height: `clamp(${Math.round(h * 0.65)}px, ${h * 0.12}vw + ${Math.round(h * 0.4)}px, ${h}px)` };
}

/** Visible placeholder when an asset file is not yet provided. */
export function BrandImagePlaceholder({
  label,
  requiredFile,
  size = "md",
  className = "",
}: {
  label: string;
  requiredFile: string;
  size?: BrandLogoSize;
  className?: string;
}) {
  const h = HEIGHT[size];
  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-lg border border-dashed px-3 text-center ${className}`}
      style={{
        minHeight: h,
        minWidth: h * 1.6,
        borderColor: "rgba(124,255,0,0.35)",
        background: "rgba(124,255,0,0.06)",
      }}
      title={`Required: ${requiredFile}`}
    >
      <span className="text-[9px] font-bold uppercase tracking-wider text-[#7CFF00] opacity-80">
        {label}
      </span>
      <span className="mt-0.5 text-[8px] leading-tight opacity-50 max-w-[120px] truncate">
        {requiredFile}
      </span>
    </div>
  );
}

/** Crops the left or right half of a side-by-side composite image. */
function CroppedHalfImage({
  src,
  alt,
  side,
  height,
  responsive,
  className = "",
  priority,
}: {
  src: StaticImageData;
  alt: string;
  side: "left" | "right";
  height: number;
  responsive?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const aspect = src.width / (src.height * 2);
  const width = height * aspect;

  return (
    <div
      className={`relative shrink-0 overflow-hidden ${className}`}
      style={{
        ...logoHeight(responsive ? "md" : "md"),
        ...(responsive
          ? {
              height: `clamp(${Math.round(height * 0.65)}px, ${height * 0.12}vw + ${Math.round(height * 0.4)}px, ${height}px)`,
            }
          : { height }),
        width: responsive
          ? `clamp(${Math.round(width * 0.65)}px, ${width * 0.12}vw + ${Math.round(width * 0.4)}px, ${width}px)`
          : width,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={`${Math.round(width)}px`}
        className="object-cover"
        style={{
          width: "200%",
          maxWidth: "none",
          objectPosition: side === "left" ? "0% center" : "100% center",
        }}
      />
    </div>
  );
}

/** UBETTER wordmark logo. */
export function UbetterLogo({ size = "md", className = "", priority }: BaseProps) {
  const asset = brandAssets.ubetter;
  const h = HEIGHT[size];
  const aspect = asset.src.width / asset.src.height;
  const w = h * aspect;

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{
        height: h,
        width: w,
      }}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        priority={priority}
        sizes={`${Math.round(w)}px`}
        className="object-contain object-left"
      />
    </div>
  );
}

/** Responsive UBETTER logo — scales between sm and lg bounds. */
export function UbetterLogoResponsive({ className = "", priority }: Omit<BaseProps, "size">) {
  const asset = brandAssets.ubetter;
  const aspect = asset.src.width / asset.src.height;

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{
        ...logoHeight("lg", true),
        aspectRatio: `${aspect}`,
      }}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        priority={priority}
        sizes="(max-width: 640px) 120px, 180px"
        className="object-contain object-left"
      />
    </div>
  );
}

/** AI badge — uses asset when available, otherwise a styled placeholder. */
export function AiBadge({ size = "sm", className = "" }: Omit<BaseProps, "priority">) {
  const asset = brandAssets.aiBadge;
  const h = HEIGHT[size];

  if (asset.available && asset.src) {
    const aspect = asset.src.width / asset.src.height;
    return (
      <div className={`relative shrink-0 ${className}`} style={{ height: h, width: h * aspect }}>
        <Image src={asset.src} alt={asset.alt} fill sizes={`${Math.round(h * aspect)}px`} className="object-contain" />
      </div>
    );
  }

  return (
    <div
      className={`inline-flex shrink-0 items-center justify-center rounded-md font-black tracking-tight ${className}`}
      style={{
        height: h,
        minWidth: h * 1.35,
        paddingInline: h * 0.22,
        fontSize: h * 0.38,
        background: "linear-gradient(135deg, #7CFF00 0%, #4a9c00 100%)",
        color: "#0a0a0a",
        boxShadow: "0 0 12px rgba(124,255,0,0.35)",
      }}
      title={`Placeholder — add ${asset.file}`}
      aria-label={asset.alt}
    >
      AI
    </div>
  );
}

/** UBETTER logo with AI badge grouped together. */
export function UbetterLogoWithAiBadge({
  size = "md",
  className = "",
  priority,
  responsive,
}: BaseProps & { responsive?: boolean }) {
  const badgeSize: BrandLogoSize = size === "lg" ? "md" : size === "md" ? "sm" : "xs";

  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 ${className}`}>
      {responsive ? (
        <UbetterLogoResponsive priority={priority} />
      ) : (
        <UbetterLogo size={size} priority={priority} />
      )}
      <AiBadge size={badgeSize} />
    </div>
  );
}

/** Germany Technology shield badge (cropped from Flag.png). */
export function GermanyTechnologyBadge({
  size = "md",
  className = "",
  locale,
  showLabel = false,
}: BaseProps & { locale?: Locale; showLabel?: boolean }) {
  const asset = brandAssets.germanyTechnology;
  const h = HEIGHT[size];

  const label =
    locale != null
      ? ui3(locale, "فناوری آلمان", "German Technology", "德国技术")
      : "German Technology";

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <CroppedHalfImage src={asset.src} alt={asset.alt} side="right" height={h} />
      {showLabel && (
        <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide opacity-70 whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
}

/** Lian Sadr Melal logo — English (left) or Persian (right) from composite image. */
export function LianSadrMelalLogo({
  size = "md",
  locale,
  className = "",
  showLabel = false,
}: BaseProps & { locale: Locale; showLabel?: boolean }) {
  const asset = brandAssets.lianSadrMelal;
  const h = HEIGHT[size];
  const side = locale === "fa" ? "right" : "left";
  const label = locale === "fa" ? "لیان صدر ملل" : locale === "zh" ? "Lian Sadr Melal" : "Lian Sadr Melal";

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <CroppedHalfImage
        src={asset.src}
        alt={asset.alt}
        side={side}
        height={h}
      />
      {showLabel && (
        <span
          className="text-[9px] sm:text-[10px] font-semibold opacity-70 whitespace-nowrap"
          style={{ fontFamily: locale === "fa" ? "'YekanBakh', system-ui, sans-serif" : undefined }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
