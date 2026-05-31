import type { StaticImageData } from "next/image";

import ubetterLogo from "@/assets/ubetter logo.png";
import flagShieldImage from "@/assets/Flag.png";
import lianSadrMelalLogo from "@/assets/6--.jpg";

/** Central registry for brand / trust image assets. */
export const brandAssets = {
  ubetter: {
    src: ubetterLogo,
    alt: "UBETTER",
    /** Expected file: src/assets/ubetter logo.png */
    file: "src/assets/ubetter logo.png",
    available: true,
  },
  aiBadge: {
    src: null as StaticImageData | null,
    alt: "AI Powered",
    /** Expected file: src/assets/ai-badge.png */
    file: "src/assets/ai-badge.png",
    available: false,
  },
  germanyTechnology: {
    src: flagShieldImage,
    alt: "German Technology",
    /** Right half of src/assets/Flag.png (Germany shield). Dedicated crop optional: src/assets/germany-technology-badge.png */
    file: "src/assets/Flag.png",
    dedicatedFile: "src/assets/germany-technology-badge.png",
    available: true,
  },
  lianSadrMelal: {
    src: lianSadrMelalLogo,
    alt: "Lian Sadr Melal",
    /** Expected file: src/assets/6--.jpg (EN left / FA right) */
    file: "src/assets/6--.jpg",
    available: true,
  },
} as const;

/** Image files still needed for full brand trust coverage. */
export const requiredBrandAssetFiles = [
  {
    file: brandAssets.aiBadge.file,
    purpose: "AI badge displayed beside the UBETTER logo",
    status: "missing" as const,
  },
  {
    file: brandAssets.germanyTechnology.dedicatedFile,
    purpose: "Optional dedicated Germany Technology badge (currently using right half of Flag.png)",
    status: "optional" as const,
  },
  {
    file: brandAssets.ubetter.file,
    purpose: "UBETTER primary logo",
    status: "provided" as const,
  },
  {
    file: brandAssets.lianSadrMelal.file,
    purpose: "Lian Sadr Melal (لیان صدر ملل) logo — English left, Persian right",
    status: "provided" as const,
  },
  {
    file: brandAssets.germanyTechnology.file,
    purpose: "China & Germany shield flags (Germany crop in use)",
    status: "provided" as const,
  },
];
