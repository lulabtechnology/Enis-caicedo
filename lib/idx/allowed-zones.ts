import type { IdxProperty } from "./types";

export const DEFAULT_ALLOWED_IDX_ZONES = [
  "Costa del Este",
  "San Francisco",
  "Obarrio",
  "Bella Vista",
  "Santa María"
];

function normalizeSearchText(value: string): string {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseAllowedZones(value?: string): string[] {
  const zones = String(value || "")
    .split(",")
    .map((zone) => zone.trim())
    .filter(Boolean);

  return zones.length ? zones : DEFAULT_ALLOWED_IDX_ZONES;
}

export function getAllowedIdxZones(): string[] {
  return parseAllowedZones(process.env.IDX_ALLOWED_ZONES);
}

export function getAllowedIdxZoneLabel(): string {
  return getAllowedIdxZones().join(", ");
}

function rawValues(raw: IdxProperty["raw"]): string[] {
  if (!raw) return [];

  return Object.entries(raw)
    .filter(([key]) => {
      const normalizedKey = normalizeSearchText(key);
      return [
        "address",
        "direccion",
        "district",
        "distrito",
        "city",
        "ciudad",
        "zone",
        "zona",
        "neighborhood",
        "neighbourhood",
        "barrio",
        "building",
        "edificio",
        "project",
        "proyecto",
        "subdivision"
      ].some((candidate) => normalizedKey.includes(candidate));
    })
    .map(([, value]) => String(value ?? ""))
    .filter(Boolean);
}

export function isAllowedIdxProperty(property: IdxProperty): boolean {
  const allowedNeedles = getAllowedIdxZones().map(normalizeSearchText).filter(Boolean);
  if (!allowedNeedles.length) return true;

  const haystack = normalizeSearchText(
    [
      property.location,
      property.building,
      property.title,
      property.propertyType,
      property.operation,
      ...(property.tags ?? []),
      ...rawValues(property.raw)
    ].join(" ")
  );

  return allowedNeedles.some((zone) => haystack.includes(zone));
}

export function filterAllowedIdxProperties(properties: IdxProperty[]): IdxProperty[] {
  return properties.filter(isAllowedIdxProperty);
}
