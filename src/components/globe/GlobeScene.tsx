"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";

import { Atmosphere } from "./Atmosphere";
import { Globe } from "./Globe";
import { Starfield } from "./Starfield";
import { CHINA_CENTROID, GLOBE_PRESENCE_TRANSITION_SEC, IRAN_CENTROID } from "./constants";
import { GlobeLights } from "./GlobeLights";
import type { CountryFeature, GlobePresencePhase } from "./globe-types";

/** Fixed camera framing (no user orbit — drag/wheel must scroll the page). */
const CAM_Y = 29;
const CAM_Z = 348;
const CAM_FOV = 40;

type GlobeExperienceProps = {
  polygons: CountryFeature[];
  presencePhase: GlobePresencePhase;
  /** No atmosphere halo, bloom, or vignette — globe geometry only. */
  cleanShell?: boolean;
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

/** Softer than cubic — use for globe blend to match “ease” feel of the UI */
function easeInOutQuint(t: number): number {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - (-2 * t + 2) ** 5 / 2;
}

/**
 * Rotates the globe toward China or back to Iran-forward based on the same phase as the presence card.
 * Transition length matches the card’s Framer Motion duration (`GLOBE_PRESENCE_TRANSITION_SEC`).
 */
function GlobePresencePhaseMotion({
  phase,
  children,
}: {
  phase: GlobePresencePhase;
  children: ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const identityQuat = useMemo(() => new THREE.Quaternion(), []);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const peekQuat = useMemo(() => {
    const iranDir = globeLatLngDir(IRAN_CENTROID.lat, IRAN_CENTROID.lng);
    const chinaDir = globeLatLngDir(CHINA_CENTROID.lat, CHINA_CENTROID.lng);
    const axis = new THREE.Vector3().crossVectors(iranDir, chinaDir);
    if (axis.lengthSq() < 1e-10) return new THREE.Quaternion();
    axis.normalize();
    const gap = iranDir.angleTo(chinaDir);
    const angle = -gap * 0.88;
    return new THREE.Quaternion().setFromAxisAngle(axis, angle);
  }, []);

  const phaseRef = useRef(phase);
  const transStartRef = useRef<number | null>(null);
  const startBlendRef = useRef(0);
  const blendRef = useRef(0);

  useFrame(({ clock }) => {
    const g = groupRef.current;
    if (!g) return;
    if (reduceMotion) {
      g.quaternion.identity();
      return;
    }

    if (phaseRef.current !== phase) {
      phaseRef.current = phase;
      transStartRef.current = clock.elapsedTime;
      startBlendRef.current = blendRef.current;
    }

    if (transStartRef.current === null) {
      transStartRef.current = clock.elapsedTime;
      startBlendRef.current = 0;
    }

    const target = phase === "china" ? 1 : 0;
    const elapsed = clock.elapsedTime - transStartRef.current;
    const u = Math.min(1, elapsed / GLOBE_PRESENCE_TRANSITION_SEC);
    blendRef.current = THREE.MathUtils.lerp(
      startBlendRef.current,
      target,
      easeInOutQuint(u),
    );

    g.quaternion.slerpQuaternions(identityQuat, peekQuat, blendRef.current);
  });

  return <group ref={groupRef}>{children}</group>;
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

/**
 * Globe is display-only: pointer events pass through so drag/scroll hits the page on all viewports.
 * (No OrbitControls — they captured desktop drag and rotated the globe instead of scrolling.)
 */
function CanvasScrollPassthrough() {
  const gl = useThree((s) => s.gl);
  useLayoutEffect(() => {
    let node: HTMLElement | null = gl.domElement;
    for (let i = 0; i < 4 && node; i++) {
      node.style.pointerEvents = "none";
      node.style.touchAction = "pan-y";
      node = node.parentElement;
    }
  }, [gl]);
  return null;
}

function GlobeExperience({ polygons, presencePhase, cleanShell = false }: GlobeExperienceProps) {
  return (
    <>
      <CanvasScrollPassthrough />

      <Starfield />

      <GlobeLights>

      <GlobeLockedOnIran>
        <GlobePresencePhaseMotion phase={presencePhase}>
          <Globe polygons={polygons} />
          {!cleanShell ? <Atmosphere /> : null}
        </GlobePresencePhaseMotion>
      </GlobeLockedOnIran>

      </GlobeLights>

      <EffectComposer multisampling={0} enableNormalPass={false}>
        {cleanShell ? (
          <Bloom
            intensity={0.42}
            luminanceThreshold={0.62}
            luminanceSmoothing={0.25}
            mipmapBlur
            radius={0.32}
          />
        ) : (
          <>
            <Bloom
              intensity={0.88}
              luminanceThreshold={0.18}
              luminanceSmoothing={0.9}
              mipmapBlur
              radius={0.55}
            />
            <Vignette eskil={false} offset={0.09} darkness={0.42} />
          </>
        )}
      </EffectComposer>
    </>
  );
}

export type GlobeCanvasProps = {
  polygons: CountryFeature[];
  presencePhase: GlobePresencePhase;
  className?: string;
  style?: CSSProperties;
  cleanShell?: boolean;
};

/**
 * react-three-fiber Canvas + country polygons on three-globe (fixed camera; no user orbit).
 * Consume only from a Next.js `dynamic(..., { ssr: false })` boundary.
 */
export function GlobeCanvas({
  polygons,
  presencePhase,
  className,
  style,
  cleanShell = false,
}: GlobeCanvasProps) {
  return (
    <Canvas
      className={className}
      style={{ ...style, pointerEvents: "none", touchAction: "pan-y" }}
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
        <GlobeExperience
          polygons={polygons}
          presencePhase={presencePhase}
          cleanShell={cleanShell}
        />
      </Suspense>
    </Canvas>
  );
}
