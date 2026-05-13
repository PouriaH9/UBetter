"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";

import { Atmosphere } from "./Atmosphere";
import { Globe } from "./Globe";
import { GlobeLights } from "./GlobeLights";
import type { CountryFeature } from "./globe-types";

/** Default framing for pointer orbit (zoom disabled — wheel must scroll the page, not dolly the camera). */
const CAM_Y = 26;
const CAM_Z = 312;
const CAM_FOV = 40;
const ORBIT_DIST = Math.hypot(CAM_Z, CAM_Y);

/** Approximate centroid of Iran (°N / °E) — lines up initial view before user orbits */
const IRAN_CENTROID = { lat: 32.43, lng: 53.68 };

type GlobeExperienceProps = {
  polygons: CountryFeature[];
};

/** Matches `three-globe` internal `polar2Cartesian(lat, lng)` (unit direction from globe center). */
function globeLatLngDir(lat: number, lng: number): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(90 - lng);
  const sinPhi = Math.sin(phi);
  return new THREE.Vector3(
    sinPhi * Math.cos(theta),
    Math.cos(phi),
    sinPhi * Math.sin(theta),
  ).normalize();
}

/**
 * Lock Iran on the camera axis, then roll so geographic north (+Y pole) reads as “up” on screen.
 */
function GlobeLockedOnIran({ children }: { children: ReactNode }) {
  const quat = useMemo(() => {
    const iranDir = globeLatLngDir(IRAN_CENTROID.lat, IRAN_CENTROID.lng);
    const viewDir = new THREE.Vector3(0, CAM_Y, CAM_Z).normalize();

    const qAlign = new THREE.Quaternion().setFromUnitVectors(iranDir, viewDir);

    const worldNorth = new THREE.Vector3(0, 1, 0);
    const northTan0 = worldNorth
      .clone()
      .sub(iranDir.clone().multiplyScalar(iranDir.dot(worldNorth)));
    if (northTan0.lengthSq() < 1e-8) return qAlign;
    northTan0.normalize();

    const northAfterAlign = northTan0.applyQuaternion(qAlign).normalize();

    const screenUp = worldNorth
      .clone()
      .sub(viewDir.clone().multiplyScalar(worldNorth.dot(viewDir)));
    if (screenUp.lengthSq() < 1e-8) return qAlign;
    screenUp.normalize();

    const cross = new THREE.Vector3().crossVectors(northAfterAlign, screenUp);
    const sinRoll = cross.dot(viewDir);
    const cosRoll = northAfterAlign.dot(screenUp);
    const roll = Math.atan2(sinRoll, cosRoll);
    const qRoll = new THREE.Quaternion().setFromAxisAngle(viewDir, roll);

    return new THREE.Quaternion().multiplyQuaternions(qRoll, qAlign);
  }, []);

  return <group quaternion={quat}>{children}</group>;
}

const NARROW_MAX = "(max-width: 1023px)";

/** Below `lg`, let the page keep touch + scroll; canvas ignores hit-testing. */
function CanvasScrollPassthrough() {
  const gl = useThree((s) => s.gl);
  useLayoutEffect(() => {
    const apply = () => {
      const narrow = window.matchMedia(NARROW_MAX).matches;
      const el = gl.domElement;
      el.style.pointerEvents = narrow ? "none" : "auto";
      el.style.touchAction = narrow ? "auto" : "none";
    };
    apply();
    const mq = window.matchMedia(NARROW_MAX);
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [gl]);
  return null;
}

function GlobeExperience({ polygons }: GlobeExperienceProps) {
  const [narrowViewport, setNarrowViewport] = useState(() =>
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia(NARROW_MAX).matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia(NARROW_MAX);
    const sync = () => setNarrowViewport(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <>
      <CanvasScrollPassthrough />

      <GlobeLights />

      <GlobeLockedOnIran>
        <Globe polygons={polygons} />
        <Atmosphere />
      </GlobeLockedOnIran>

      <OrbitControls
        enablePan={false}
        enableRotate={!narrowViewport}
        enableZoom={false}
        rotateSpeed={0.42}
        minDistance={ORBIT_DIST * 0.74}
        maxDistance={ORBIT_DIST * 1.48}
        minPolarAngle={Math.PI * 0.14}
        maxPolarAngle={Math.PI * 0.86}
        enableDamping={false}
        makeDefault
      />

      <EffectComposer multisampling={0} enableNormalPass={false}>
        <Bloom
          intensity={0.88}
          luminanceThreshold={0.18}
          luminanceSmoothing={0.9}
          mipmapBlur
          radius={0.55}
        />
        <Vignette eskil={false} offset={0.09} darkness={0.42} />
      </EffectComposer>
    </>
  );
}

export type GlobeCanvasProps = {
  polygons: CountryFeature[];
  className?: string;
  style?: CSSProperties;
};

/**
 * react-three-fiber Canvas + drei controls + country polygons on three-globe.
 * Consume only from a Next.js `dynamic(..., { ssr: false })` boundary.
 */
export function GlobeCanvas({ polygons, className, style }: GlobeCanvasProps) {
  return (
    <Canvas
      className={className}
      style={style}
      camera={{
        position: [0, CAM_Y, CAM_Z],
        fov: CAM_FOV,
        near: 0.25,
        far: 2500,
        zoom: 1,
      }}
      gl={{
        alpha: true,
        antialias: true,
        stencil: false,
        powerPreference: "high-performance",
      }}
      dpr={[1, 2]}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Suspense fallback={null}>
        <GlobeExperience polygons={polygons} />
      </Suspense>
    </Canvas>
  );
}
