export type CountryFeature = {
  type: string;
  properties: Record<string, unknown> & { ISO_A2?: string };
  geometry?: { type: string };
};
