"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { GEOJSON_URL } from "@/components/globe/constants";
import type { CountryFeature, GlobePresencePhase } from "@/components/globe/globe-types";

type HomeGlobeJourneyValue = {
  polygons: CountryFeature[] | null;
  presencePhase: GlobePresencePhase;
};

const HomeGlobeJourneyContext = createContext<HomeGlobeJourneyValue | null>(null);

function normalizeFeatures(raw: CountryFeature[]): CountryFeature[] {
  return raw.filter((f) => {
    const iso = f.properties?.ISO_A2;
    return typeof iso === "string" && iso.length === 2 && iso !== "AQ" && iso !== "-99";
  });
}

export function HomeGlobeJourneyProvider({ children }: { children: ReactNode }) {
  const [polygons, setPolygons] = useState<CountryFeature[] | null>(null);
  const [presencePhase, setPresencePhase] = useState<GlobePresencePhase>("china");

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const intervalMs = reduce ? 14000 : 7000;
    const id = window.setInterval(() => {
      setPresencePhase((p) => (p === "china" ? "iran" : "china"));
    }, intervalMs);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(GEOJSON_URL);
        if (!res.ok) throw new Error(String(res.status));
        const gj = await res.json();
        const list = gj?.features as CountryFeature[] | undefined;
        if (alive && Array.isArray(list)) setPolygons(normalizeFeatures(list));
      } catch {
        /* graceful empty */
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const value = useMemo<HomeGlobeJourneyValue>(
    () => ({
      polygons,
      presencePhase,
    }),
    [polygons, presencePhase],
  );

  return (
    <HomeGlobeJourneyContext.Provider value={value}>{children}</HomeGlobeJourneyContext.Provider>
  );
}

export function useHomeGlobeJourneyOptional() {
  return useContext(HomeGlobeJourneyContext);
}
