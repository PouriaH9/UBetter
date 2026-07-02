/**
 * One-shot image optimizer: converts src/assets raster files to WebP under public/.
 * Run: npm run optimize-images
 */
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const ASSETS = path.join(ROOT, "src/assets");
const PUBLIC = path.join(ROOT, "public");
const MANIFEST_PATH = path.join(ROOT, "src/assets/image-manifest.json");

/** @type {{ input: string; output: string; quality?: number }[]} */
const JOBS = [
  // Products (canonical copies for storefront + Medusa seed URLs)
  ...Array.from({ length: 21 }, (_, i) => ({
    input: `Source/${i + 1}.png`,
    output: `products/${i + 1}.webp`,
  })),
  ...Array.from({ length: 21 }, (_, i) => ({
    input: `Source/${i + 1}-${i + 1}.png`,
    output: `products/${i + 1}-${i + 1}.webp`,
  })),
  { input: "Source/inventor.png", output: "products/inventor.webp" },
  { input: "Source/inventor hybrid.png", output: "products/inventor-hybrid.webp" },
  { input: "Source/lofi.png", output: "products/lofi.webp" },
  { input: "Source/products HERO desktopsize.png", output: "hero/products-desktop.webp", quality: 82 },
  { input: "Source/products HERO mobilesize.png", output: "hero/products-mobile.webp", quality: 82 },
  // Home heroes
  { input: "HERO1.png", output: "hero/home-1-desktop.webp", quality: 82 },
  { input: "HERO1M.png", output: "hero/home-1-mobile.webp", quality: 82 },
  { input: "HERO2.png", output: "hero/home-2-desktop.webp", quality: 82 },
  { input: "HERO2M.png", output: "hero/home-2-mobile.webp", quality: 82 },
  { input: "HERO3.jpg", output: "hero/home-3-desktop.webp", quality: 82 },
  { input: "HERO3M.png", output: "hero/home-3-mobile.webp", quality: 82 },
  // Calculator + garanty section art
  { input: "CALCULATOR DESKTOP SIZE.png", output: "hero/calculator-desktop.webp", quality: 82 },
  { input: "CALCULATOR MOBILE SIZE.png", output: "hero/calculator-mobile.webp", quality: 82 },
  { input: "GARANTY HERO DESKTOP.png", output: "hero/garanty-desktop.webp", quality: 82 },
  { input: "GARANTY HERO MOBILE.png", output: "hero/garanty-mobile.webp", quality: 82 },
  // Brand
  { input: "ubetter logo.png", output: "brand/ubetter-logo.webp", quality: 90 },
  { input: "Flag.png", output: "brand/flag.webp", quality: 90 },
  { input: "6--.jpg", output: "brand/lian-sadr-melal.webp", quality: 85 },
  // Case studies
  { input: "casestudy/1.jpg", output: "casestudy/1.webp", quality: 60, maxWidth: 1400 },
  ...[2, 3, 4, 5, 6, 7].map((n) => ({
    input: `casestudy/${n}.png`,
    output: `casestudy/${n}.webp`,
    quality: 80,
  })),
];

async function exists(filePath) {
  try {
    await readFile(filePath);
    return true;
  } catch {
    return false;
  }
}

async function convertJob({ input, output, quality = 78, maxWidth }) {
  const src = path.join(ASSETS, input);
  const dest = path.join(PUBLIC, output);
  if (!(await exists(src))) {
    console.warn(`skip missing: ${input}`);
    return null;
  }
  await mkdir(path.dirname(dest), { recursive: true });
  let image = sharp(src);
  if (maxWidth) {
    image = image.resize({ width: maxWidth, withoutEnlargement: true });
  }
  const meta = await image.metadata();
  await image.webp({ quality, effort: 4 }).toFile(dest);
  const publicPath = `/${output}`;
  return {
    path: publicPath,
    width: meta.width ?? 0,
    height: meta.height ?? 0,
    bytes: (await readFile(dest)).length,
  };
}

async function compressPdf() {
  const src = path.join(PUBLIC, "UBETTER-Catalog.pdf");
  if (!(await exists(src))) return;
  // Keep PDF as-is if no compressor available; gs often not installed in CI.
  const { size } = await import("node:fs/promises").then((fs) => fs.stat(src));
  console.log(`catalog PDF: ${(size / 1024 / 1024).toFixed(1)} MB (kept in public/)`);
}

const manifest = {};

for (const job of JOBS) {
  const result = await convertJob(job);
  if (result) {
    manifest[job.output.replace(/\.webp$/, "").replace(/\//g, "-")] = result;
    console.log(`ok ${job.input} -> ${job.output} (${(result.bytes / 1024).toFixed(0)} KB)`);
  }
}

await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
await compressPdf();
console.log(`\nWrote manifest: ${MANIFEST_PATH}`);
