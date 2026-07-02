/** Public image paths (served from /public, not webpack-bundled). */

export const PRODUCT_IMAGES: (string | null)[] = [
  null,
  "/products/1.webp",
  "/products/2.webp",
  "/products/3.webp",
  "/products/4.webp",
  "/products/5.webp",
  "/products/6.webp",
  "/products/7.webp",
  "/products/8.webp",
  "/products/9.webp",
  "/products/10.webp",
  "/products/11.webp",
  "/products/12.webp",
  "/products/13.webp",
  "/products/14.webp",
  "/products/15.webp",
  "/products/16.webp",
  "/products/17.webp",
  "/products/18.webp",
  "/products/19.webp",
  "/products/20.webp",
  "/products/21.webp",
  "/products/inventor.webp",
  "/products/inventor-hybrid.webp",
];

export const DETAIL_IMAGES: (string | null)[] = [
  null,
  "/products/1-1.webp",
  "/products/2-2.webp",
  "/products/3-3.webp",
  "/products/4-4.webp",
  "/products/5-5.webp",
  "/products/6-6.webp",
  "/products/7-7.webp",
  "/products/8-8.webp",
  "/products/9-9.webp",
  "/products/10-10.webp",
  "/products/11-11.webp",
  "/products/12-12.webp",
  "/products/13-13.webp",
  "/products/14-14.webp",
  "/products/15-15.webp",
  "/products/16-16.webp",
  "/products/17-17.webp",
  "/products/18-18.webp",
  "/products/19-19.webp",
  "/products/20-20.webp",
  "/products/21-21.webp",
  null,
  null,
];

export const LIFEPO4_BG = "/products/lofi.webp";

export const HERO_IMAGES = {
  home: [
    { desktop: "/hero/home-1-desktop.webp", mobile: "/hero/home-1-mobile.webp" },
    { desktop: "/hero/home-2-desktop.webp", mobile: "/hero/home-2-mobile.webp" },
    { desktop: "/hero/home-3-desktop.webp", mobile: "/hero/home-3-mobile.webp" },
  ],
  products: {
    desktop: "/hero/products-desktop.webp",
    mobile: "/hero/products-mobile.webp",
  },
  calculator: {
    desktop: "/hero/calculator-desktop.webp",
    mobile: "/hero/calculator-mobile.webp",
  },
  garanty: {
    desktop: "/hero/garanty-desktop.webp",
    mobile: "/hero/garanty-mobile.webp",
  },
} as const;
