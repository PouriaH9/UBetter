export type PublicImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/** Central registry for brand / trust image assets. */
export const brandAssets = {
  ubetter: {
    src: "/brand/ubetter-logo.webp",
    width: 3583,
    height: 2152,
    alt: "UBETTER",
    file: "public/brand/ubetter-logo.webp",
    available: true,
  },
  aiBadge: {
    src: null as string | null,
    width: 0,
    height: 0,
    alt: "AI Powered",
    file: "public/brand/ai-badge.webp",
    available: false,
  },
  germanyTechnology: {
    src: "/brand/flag.webp",
    width: 957,
    height: 725,
    alt: "German Technology",
    file: "public/brand/flag.webp",
    dedicatedFile: "public/brand/germany-technology-badge.webp",
    available: true,
  },
  lianSadrMelal: {
    src: "/brand/lian-sadr-melal.webp",
    width: 3508,
    height: 2480,
    alt: "Lian Sadr Melal",
    file: "public/brand/lian-sadr-melal.webp",
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
