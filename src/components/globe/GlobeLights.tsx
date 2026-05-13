"use client";

import type { PropsWithChildren } from "react";

/**
 * Physical / cinematic trio: ambient base, main key sun, faint rim accent.
 */
export function GlobeLights({ children }: PropsWithChildren) {
  return (
    <>
      <ambientLight color="#bcd8ff" intensity={1.95} />
      <directionalLight
        castShadow={false}
        color="#eaf5ff"
        intensity={Math.PI * 1.08}
        position={[220, 120, 320]}
      />
      <directionalLight
        color="#7b5cff"
        intensity={Math.PI * 0.35}
        position={[-180, -60, -120]}
      />
      <hemisphereLight color="#9ce7ff" groundColor="#0a050a" intensity={Math.PI * 0.52} />
      {children}
    </>
  );
}
