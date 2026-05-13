/** three-globe uses an internal sphere radius of 100 world units */
export const GLOBE_RADIUS = 100;

export const GEOJSON_URL = "/geo/ne_110m_admin_0_countries.geojson";

/** Centroids — globe framing (`GlobeScene`) and IR↔CN arc endpoints */
export const IRAN_CENTROID = { lat: 32.43, lng: 53.68 } as const;
export const CHINA_CENTROID = { lat: 35.86, lng: 104.2 } as const;

/** Globe tilt + full presence card (chrome + copy) — one shared duration */
export const GLOBE_PRESENCE_TRANSITION_SEC = 5;

/** Same curve as Framer tuple below — standard smooth in/out */
export const GLOBE_PRESENCE_EASE_CSS = "cubic-bezier(0.4, 0, 0.2, 1)" as const;

export const GLOBE_PRESENCE_EASE_FRAMER: [number, number, number, number] = [0.4, 0, 0.2, 1];
