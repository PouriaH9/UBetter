/** three-globe uses an internal sphere radius of 100 world units */
export const GLOBE_RADIUS = 100;

export const GEOJSON_URL = "/geo/ne_110m_admin_0_countries.geojson";

/** Centroids — globe framing (`GlobeScene`) and IR↔CN arc endpoints */
export const IRAN_CENTROID = { lat: 32.43, lng: 53.68 } as const;
export const CHINA_CENTROID = { lat: 35.86, lng: 104.2 } as const;
