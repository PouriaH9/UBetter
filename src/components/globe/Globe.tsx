"use client";

import { useLayoutEffect, useMemo } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";

import type { CountryFeature } from "./globe-types";

/** UBETTER accent green `#7CFF00` — borders + Iran fill. */
const IR_CAP = "rgba(124,255,0,0.78)";
const IR_SIDE = "rgba(60,140,0,0.68)";
const IR_STROKE = "#d4ff8a";
const TRANSPARENT = "rgba(0,0,0,0)";
const WORLD_STROKE = "rgba(124,255,0,0.92)";

function iso(d: CountryFeature): string | undefined {
  const v = d.properties?.ISO_A2;
  return typeof v === "string" && v !== "-99" && v.length === 2 ? v : undefined;
}

type GlobeMeshProps = {
  polygons: CountryFeature[];
};

/**
 * ThreeGlobe polygon layer wired for IR-only filled land plus thin glowing MERIDIAN-style borders on all countries.
 */
export function Globe({ polygons }: GlobeMeshProps) {
  const globe = useMemo(
    () =>
      new ThreeGlobe({ waitForGlobeReady: false, animateIn: false }).showGlobe(true).showAtmosphere(false),
    [],
  );

  useLayoutEffect(() => {
    const matte = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#050507"),
      roughness: 0.96,
      metalness: 0.06,
      emissive: new THREE.Color("#020206"),
      emissiveIntensity: 0.52,
      envMapIntensity: 0,
    });

    globe
      .globeMaterial(matte)
      .globeCurvatureResolution(5)
      .polygonsData(polygons as object[])
      .polygonGeoJsonGeometry("geometry")
      .polygonAltitude((d) => (iso(d as CountryFeature) === "IR" ? 0.016 : 0.004))
      .polygonCapCurvatureResolution((d) => (iso(d as CountryFeature) === "IR" ? 4 : 3))
      .polygonCapColor((d) => (iso(d as CountryFeature) === "IR" ? IR_CAP : TRANSPARENT))
      .polygonSideColor((d) => (iso(d as CountryFeature) === "IR" ? IR_SIDE : TRANSPARENT))
      .polygonStrokeColor((d) => (iso(d as CountryFeature) === "IR" ? IR_STROKE : WORLD_STROKE))
      .polygonsTransitionDuration(0);
  }, [globe, polygons]);

  return <primitive object={globe} dispose={null} />;
}
