"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STAR_COUNT = 7500;
const SHELL_INNER = 380;
const SHELL_OUTER = 920;

const vertexShader = /* glsl */ `
attribute float aSize;
attribute float aPhase;
attribute float aTwinkleSpeed;

uniform float uTime;
uniform float uPixelRatio;

varying float vTwinkle;
varying float vDepthFade;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  float twinkle = 0.42 + 0.58 * sin(uTime * aTwinkleSpeed + aPhase);
  vTwinkle = twinkle;

  float dist = length(mvPosition.xyz);
  vDepthFade = smoothstep(900.0, 180.0, dist);

  float size = aSize * twinkle * uPixelRatio * (320.0 / -mvPosition.z);
  gl_PointSize = clamp(size, 0.6, 4.2);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uColorCool;
uniform vec3 uColorWarm;

varying float vTwinkle;
varying float vDepthFade;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);
  float core = smoothstep(0.5, 0.0, d);
  float halo = smoothstep(0.5, 0.12, d) * 0.35;
  float alpha = (core + halo) * vTwinkle * vDepthFade;
  if (alpha < 0.02) discard;

  vec3 col = mix(uColorCool, uColorWarm, vTwinkle * 0.35 + 0.12);
  gl_FragColor = vec4(col, alpha * 0.92);
}
`;

function buildStarAttributes(count: number) {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const twinkleSpeeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = THREE.MathUtils.lerp(SHELL_INNER, SHELL_OUTER, Math.random() ** 0.55);

    const sinPhi = Math.sin(phi);
    positions[i * 3] = r * sinPhi * Math.cos(theta);
    positions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    sizes[i] = THREE.MathUtils.lerp(0.85, 2.6, Math.random() ** 2.4);
    phases[i] = Math.random() * Math.PI * 2;
    twinkleSpeeds[i] = THREE.MathUtils.lerp(0.55, 2.4, Math.random());
  }

  return { positions, sizes, phases, twinkleSpeeds };
}

/**
 * Distant star shell behind the globe — soft twinkle + slow drift.
 */
export function Starfield() {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const starData = useMemo(() => buildStarAttributes(STAR_COUNT), []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(starData.positions, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(starData.sizes, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(starData.phases, 1));
    geo.setAttribute("aTwinkleSpeed", new THREE.BufferAttribute(starData.twinkleSpeeds, 1));
    return geo;
  }, [starData]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uColorCool: { value: new THREE.Color("#d8ecff") },
      uColorWarm: { value: new THREE.Color("#fff6e8") },
    }),
    [],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useFrame((state, dt) => {
    const mat = matRef.current;
    if (mat) {
      mat.uniforms.uTime.value += reduceMotion ? 0 : dt;
      mat.uniforms.uPixelRatio.value = state.viewport.dpr;
    }

    const pts = pointsRef.current;
    if (!pts || reduceMotion) return;
    pts.rotation.y += dt * 0.018;
    pts.rotation.x = Math.sin(state.clock.elapsedTime * 0.07) * 0.04;
  });

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false} renderOrder={-2}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        depthTest
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
