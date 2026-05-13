"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { GLOBE_RADIUS } from "./constants";

const vertexShader = /* glsl */ `
varying vec3 vNormalW;
varying vec3 vViewDir;
void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vNormalW = normalize(mat3(modelMatrix) * normal);
  vViewDir = normalize(cameraPosition - worldPosition.xyz);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uGlowColorInner;
uniform vec3 uGlowColorOuter;
uniform float uOpacity;
uniform float uPower;
uniform float uTime;

varying vec3 vNormalW;
varying vec3 vViewDir;

void main() {
  float vDotN = clamp(dot(normalize(vViewDir), vNormalW), 0.0, 1.0);
  float rim = pow(1.0 - abs(vDotN), uPower);
  float breathe = 0.92 + 0.08 * sin(uTime * 0.85);
  float alpha = rim * uOpacity * breathe;

  vec3 col = mix(uGlowColorInner, uGlowColorOuter, rim);
  gl_FragColor = vec4(col, alpha);
}
`;

type AtmosphereProps = {
  radius?: number;
};

/**
 * Transparent Fresnel halo just outside the globe (additive, backsided).
 */
export function Atmosphere({ radius = GLOBE_RADIUS * 1.036 }: AtmosphereProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uGlowColorInner: { value: new THREE.Color("#8fff3a") },
      uGlowColorOuter: { value: new THREE.Color("#2a5c00") },
      uOpacity: { value: 0.28 },
      uPower: { value: 2.35 },
      uTime: { value: 0 },
    }),
    [],
  );

  useFrame((_s, dt) => {
    const u = matRef.current?.uniforms?.uTime;
    if (u) u.value += dt;
  });

  return (
    <mesh raycast={() => null} renderOrder={1}>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        depthTest={true}
        side={THREE.BackSide}
        transparent
      />
    </mesh>
  );
}
