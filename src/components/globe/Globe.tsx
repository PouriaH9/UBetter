"use client";

import { useLayoutEffect, useMemo } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";

import type { CountryFeature } from "./globe-types";
import { CHINA_CENTROID, IRAN_CENTROID } from "./constants";

/** UBETTER accent green `#7CFF00` — borders + Iran fill. */
const IR_CAP = "rgba(124,255,0,0.78)";
const IR_SIDE = "rgba(60,140,0,0.68)";
const IR_STROKE = "#d4ff8a";
/** China flag red `#DE2910` — cap + stroke on globe. */
const CN_CAP = "rgba(222,41,16,0.82)";
const CN_SIDE = "rgba(120,28,14,0.74)";
const CN_STROKE = "#ffb4a8";
const TRANSPARENT = "rgba(0,0,0,0)";
const WORLD_STROKE = "rgba(124,255,0,0.92)";

/** Animated dash strand width (FatLine linewidth, ~px). */
const CONNECTOR_LINE_PX = 1.95;

/** Soft underlay: match dash rhythm (avoid one solid dark band under dotted line). Thin stroke + low alpha. */
const CONNECTOR_SHADOW_STROKE_PX = 2.08;

/** Fraction of globe radius — tuck shadow spline slightly under foreground dashes */
const CONNECTOR_SHADOW_ALT_OFFSET = -0.006;

type ConnectorPathDatum = {
  points: PathLLA[];
  color: string;
  stroke: number;
  dashLength: number;
  dashGap: number;
  dashAnimateTime: number;
  dashInitialGap: number;
};

function offsetPathAltitude(points: PathLLA[], delta: number): PathLLA[] {
  return points.map(([lat, lng, alt]): PathLLA => [lat, lng, alt + delta]);
}

/** Max southward latitude dip at mid-path (smooth envelope, not a kink) */
const U_DIP_AMPLITUDE_DEG = 6.2;

/** Samples along IR→CN — dense enough that the path reads as one smooth curve */
const PATH_SMOOTH_SEGMENTS = 72;

/** `three-globe` path points: `[lat, lng, alt]` (altitudes = fraction of globe radius, see lib). */
type PathLLA = readonly [lat: number, lng: number, alt: number];

/** Same convention as `GlobeScene` / `three-globe` polar placement */
function latLngToUnitDir(lat: number, lng: number): THREE.Vector3 {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(90 - lng);
  const sinPhi = Math.sin(phi);
  return new THREE.Vector3(
    sinPhi * Math.cos(theta),
    Math.cos(phi),
    sinPhi * Math.sin(theta),
  ).normalize();
}

function unitDirToLatLng(dir: THREE.Vector3): { lat: number; lng: number } {
  const v = dir.clone().normalize();
  const phiRad = Math.atan2(Math.hypot(v.x, v.z), v.y);
  const thetaRad = Math.atan2(v.z, v.x);
  return {
    lat: THREE.MathUtils.radToDeg(Math.PI / 2 - phiRad),
    lng: THREE.MathUtils.radToDeg(Math.PI / 2 - thetaRad),
  };
}

function slerpUnitDir(a: THREE.Vector3, b: THREE.Vector3, t: number): THREE.Vector3 {
  const av = a.clone().normalize();
  const bv = b.clone().normalize();
  const omega = av.angleTo(bv);
  if (omega < 1e-5) return av.clone();
  const inv = 1 / Math.sin(omega);
  return new THREE.Vector3()
    .addScaledVector(av, Math.sin((1 - t) * omega) * inv)
    .addScaledVector(bv, Math.sin(t * omega) * inv)
    .normalize();
}

function smoothIranChinaPathPoints(
  lngShift: number,
  endAlt: number,
  midAlt: number,
): PathLLA[] {
  const ir = IRAN_CENTROID;
  const cn = CHINA_CENTROID;
  const start = latLngToUnitDir(ir.lat, ir.lng + lngShift);
  const end = latLngToUnitDir(cn.lat, cn.lng + lngShift);
  const n = PATH_SMOOTH_SEGMENTS;
  const out: PathLLA[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const env = Math.sin(Math.PI * t) ** 2;
    const base = slerpUnitDir(start, end, t);
    const { lat, lng } = unitDirToLatLng(base);
    const latD = lat - U_DIP_AMPLITUDE_DEG * env;
    const alt = endAlt + (midAlt - endAlt) * env;
    out.push([latD, lng, alt]);
  }
  return out;
}

function clonePath(points: readonly PathLLA[]): PathLLA[] {
  return points.map((p) => [p[0], p[1], p[2]] as PathLLA);
}

/** One IR→CN ribbon: translucent underlay + dashed strokes. Vertices run China → Iran so motion reads right→left on the default Iran-framed view. */
function irChinaConnectionPathData(): ConnectorPathDatum[] {
  const endAlt = 0.096;
  const midAlt = 0.139;
  const spline = [...smoothIranChinaPathPoints(0, endAlt, midAlt)].reverse();

  /** Larger value = slower marquee along the path (ms loop hint for `three-globe`). */
  const dashTravelMs = 16500;

  /** Dash / gap as fractions of path length (`three-globe`); larger gap ⇒ more air between dots. */
  const dashPiece = 0.024;
  const dashHole = 0.062;

  return [
    {
      points: offsetPathAltitude(spline, CONNECTOR_SHADOW_ALT_OFFSET),
      color: "rgba(0,0,0,0.17)",
      stroke: CONNECTOR_SHADOW_STROKE_PX,
      dashLength: dashPiece,
      dashGap: dashHole,
      dashAnimateTime: dashTravelMs,
      dashInitialGap: dashPiece * 0.08,
    },
    {
      points: clonePath(spline),
      color: "#f2f4f7",
      stroke: CONNECTOR_LINE_PX,
      dashLength: dashPiece,
      dashGap: dashHole,
      dashAnimateTime: dashTravelMs,
      dashInitialGap: 0,
    },
  ];
}

function iso(d: CountryFeature): string | undefined {
  const v = d.properties?.ISO_A2;
  return typeof v === "string" && v !== "-99" && v.length === 2 ? v : undefined;
}

function highlightedLand(code: string | undefined): "ir" | "cn" | null {
  if (code === "IR") return "ir";
  if (code === "CN") return "cn";
  return null;
}

type GlobeMeshProps = {
  polygons: CountryFeature[];
};

/**
 * ThreeGlobe: IR/CN polygons — single dashed IR↔CN connector (ghost); dashes march right→left (CN→IR path order).
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
      .polygonAltitude((d) => (highlightedLand(iso(d as CountryFeature)) ? 0.016 : 0.004))
      .polygonCapCurvatureResolution((d) => (highlightedLand(iso(d as CountryFeature)) ? 4 : 3))
      .polygonCapColor((d) => {
        const h = highlightedLand(iso(d as CountryFeature));
        if (h === "ir") return IR_CAP;
        if (h === "cn") return CN_CAP;
        return TRANSPARENT;
      })
      .polygonSideColor((d) => {
        const h = highlightedLand(iso(d as CountryFeature));
        if (h === "ir") return IR_SIDE;
        if (h === "cn") return CN_SIDE;
        return TRANSPARENT;
      })
      .polygonStrokeColor((d) => {
        const h = highlightedLand(iso(d as CountryFeature));
        if (h === "ir") return IR_STROKE;
        if (h === "cn") return CN_STROKE;
        return WORLD_STROKE;
      })
      .polygonsTransitionDuration(0)
      .arcsData([])
      .pathsData(irChinaConnectionPathData())
      .pathPoints("points")
      .pathPointLat((p: PathLLA) => p[0])
      .pathPointLng((p: PathLLA) => p[1])
      .pathPointAlt((p: PathLLA) => p[2])
      .pathColor("color")
      .pathStroke("stroke")
      .pathDashLength((d: object) => (d as ConnectorPathDatum).dashLength)
      .pathDashGap((d: object) => (d as ConnectorPathDatum).dashGap)
      .pathDashInitialGap((d: object) => (d as ConnectorPathDatum).dashInitialGap)
      .pathDashAnimateTime((d: object) => (d as ConnectorPathDatum).dashAnimateTime)
      .pathResolution(0.35)
      .pathTransitionDuration(0);
  }, [globe, polygons]);

  return <primitive object={globe} dispose={null} />;
}
