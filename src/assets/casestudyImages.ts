import type { StaticImageData } from "next/image";

import cs1 from "@/assets/casestudy/1.jpg";
import cs2 from "@/assets/casestudy/2.png";
import cs3 from "@/assets/casestudy/3.png";
import cs4 from "@/assets/casestudy/4.png";
import cs5 from "@/assets/casestudy/5.png";
import cs6 from "@/assets/casestudy/6.png";
import cs7 from "@/assets/casestudy/7.png";

export const CASE_STUDY_IMAGES: StaticImageData[] = [cs1, cs2, cs3, cs4, cs5, cs6, cs7];

/** Stable pseudo-random order per section index (does not reshuffle on re-render). */
export function caseStudyImagesForSection(
  sectionIndex: number,
  count = CASE_STUDY_IMAGES.length,
): StaticImageData[] {
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
