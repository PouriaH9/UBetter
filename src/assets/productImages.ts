// ─── Product Images (main product render) ────────────────────────────────────
import p1  from "@/assets/Source/1.png";
import p2  from "@/assets/Source/2.png";
import p3  from "@/assets/Source/3.png";
import p4  from "@/assets/Source/4.png";
import p5  from "@/assets/Source/5.png";
import p6  from "@/assets/Source/6.png";
import p7  from "@/assets/Source/7.png";
import p8  from "@/assets/Source/8.png";
import p9  from "@/assets/Source/9.png";
import p10 from "@/assets/Source/10.png";
import p11 from "@/assets/Source/11.png";
import p12 from "@/assets/Source/12.png";
import p13 from "@/assets/Source/13.png";
import p14 from "@/assets/Source/14.png";
import p15 from "@/assets/Source/15.png";
import p16 from "@/assets/Source/16.png";
import p17 from "@/assets/Source/17.png";
import p18 from "@/assets/Source/18.png";
import p19 from "@/assets/Source/19.png";
import p20 from "@/assets/Source/20.png";
import p21 from "@/assets/Source/21.png";
// Products 22 (EMS) and 23 (Hybrid Inverter)
import pEms    from "@/assets/Source/inventor.png";
import pHybrid from "@/assets/Source/inventor hybrid.png";

// ─── Detail / Tech-Info Images (shown in spec modal) ─────────────────────────
import d1  from "@/assets/Source/1-1.png";
import d2  from "@/assets/Source/2-2.png";
import d3  from "@/assets/Source/3-3.png";
import d4  from "@/assets/Source/4-4.png";
import d5  from "@/assets/Source/5-5.png";
import d6  from "@/assets/Source/6-6.png";
import d7  from "@/assets/Source/7-7.png";
import d8  from "@/assets/Source/8-8.png";
import d9  from "@/assets/Source/9-9.png";
import d10 from "@/assets/Source/10-10.png";
import d11 from "@/assets/Source/11-11.png";
import d12 from "@/assets/Source/12-12.png";
import d13 from "@/assets/Source/13-13.png";
import d14 from "@/assets/Source/14-14.png";
import d15 from "@/assets/Source/15-15.png";
import d16 from "@/assets/Source/16-16.png";
import d17 from "@/assets/Source/17-17.png";
import d18 from "@/assets/Source/18-18.png";
import d19 from "@/assets/Source/19-19.png";
import d20 from "@/assets/Source/20-20.png";
import d21 from "@/assets/Source/21-21.png";

// ─── LiFePO4 technology background image (used in section header) ─────────────
export { default as LIFEPO4_BG } from "@/assets/Source/lofi.png";

import type { StaticImageData } from "next/image";

// 1-indexed arrays — index 0 is null (no product 0)
// Indices 22 = EMS, 23 = Hybrid Inverter
export const PRODUCT_IMAGES: (StaticImageData | null)[] = [
  null, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
  p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21,
  pEms, pHybrid,
];

// No numbered detail images for products 22–23 (use null)
export const DETAIL_IMAGES: (StaticImageData | null)[] = [
  null, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10,
  d11, d12, d13, d14, d15, d16, d17, d18, d19, d20, d21,
  null, null,
];
