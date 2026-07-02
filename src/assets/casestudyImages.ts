export const CASE_STUDY_IMAGES: string[] = [
  "/casestudy/1.webp",
  "/casestudy/2.webp",
  "/casestudy/3.webp",
  "/casestudy/4.webp",
  "/casestudy/5.webp",
  "/casestudy/6.webp",
  "/casestudy/7.webp",
];

/** Stable pseudo-random order per section index (does not reshuffle on re-render). */
export function caseStudyImagesForSection(
  sectionIndex: number,
  count = CASE_STUDY_IMAGES.length,
): string[] {
  if (CASE_STUDY_IMAGES.length === 0) return [];

  const pool = [...CASE_STUDY_IMAGES];
  let seed = (sectionIndex + 1) * 9973;

  for (let i = pool.length - 1; i > 0; i--) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    const j = seed % (i + 1);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, Math.min(count, pool.length));
}
