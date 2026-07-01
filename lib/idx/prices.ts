import type { IdxProperty } from "./types";

export type IdxPriceContext = {
  title?: string;
  operation?: string;
  propertyType?: string;
};

export type NormalizedIdxPrice = {
  label: string;
  value?: number;
  scaledFromThousands: boolean;
};

export function normalizePriceKey(key: string): string {
  return key
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function normalizePriceSearchText(value: string): string {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function parseIdxPriceValue(value: string | number | null | undefined): number {
  let normalized = String(value ?? "")
    .replace(/[^0-9.,-]/g, "")
    .trim();

  if (!normalized) return Number.NaN;

  const hasComma = normalized.includes(",");
  const hasDot = normalized.includes(".");

  if (hasComma && hasDot) {
    const lastComma = normalized.lastIndexOf(",");
    const lastDot = normalized.lastIndexOf(".");
    normalized = lastComma > lastDot
      ? normalized.replace(/\./g, "").replace(",", ".")
      : normalized.replace(/,/g, "");
  } else if (hasComma) {
    const commaParts = normalized.split(",");
    const last = commaParts[commaParts.length - 1] ?? "";
    normalized = last.length === 3 ? normalized.replace(/,/g, "") : normalized.replace(",", ".");
  }

  return Number(normalized);
}

export function formatUsdNoDecimals(value: number): string {
  return `USD ${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0
  }).format(value)}`;
}

function contextText(context: IdxPriceContext): string {
  return normalizePriceSearchText([
    context.title,
    context.operation,
    context.propertyType
  ].filter(Boolean).join(" "));
}

export function isSaleOnlyIdxListing(context: IdxPriceContext): boolean {
  const haystack = contextText(context);
  if (!haystack) return false;

  const hasSale = [
    "en venta",
    "venta",
    "vende",
    "for sale",
    "sale"
  ].some((word) => haystack.includes(word));

  const hasRent = [
    "alquiler",
    "renta",
    "arrendamiento",
    "for rent",
    "rent",
    "rental",
    "lease"
  ].some((word) => haystack.includes(word));

  return hasSale && !hasRent;
}

export function shouldScaleSalePriceFromThousands(value: number, context: IdxPriceContext): boolean {
  if (!Number.isFinite(value) || value <= 0) return false;
  if (!isSaleOnlyIdxListing(context)) return false;

  // ACOBIR/MLS sometimes delivers sale prices in thousands.
  // Example: 943 means 943,000 and 1021 means 1,021,000.
  // This must only be applied to sale listings, never rentals.
  return value >= 1 && value < 10000;
}

export function normalizeIdxPrice(
  rawValue: string | number | null | undefined,
  context: IdxPriceContext,
  numericValue?: number
): NormalizedIdxPrice {
  const value = Number.isFinite(Number(numericValue)) && Number(numericValue) > 0
    ? Number(numericValue)
    : parseIdxPriceValue(rawValue);

  if (!Number.isFinite(value) || value <= 0) {
    const fallback = String(rawValue ?? "").trim();
    return {
      label: fallback || "Consultar precio",
      scaledFromThousands: false
    };
  }

  const scaledFromThousands = shouldScaleSalePriceFromThousands(value, context);
  const finalValue = scaledFromThousands ? value * 1000 : value;

  return {
    label: formatUsdNoDecimals(finalValue),
    value: finalValue,
    scaledFromThousands
  };
}

export function normalizeStoredIdxPropertyPrice<T extends Pick<IdxProperty, "priceFrom" | "title"> & Partial<IdxProperty>>(property: T): T {
  const normalized = normalizeIdxPrice(property.priceValue ?? property.priceFrom, {
    title: property.title,
    operation: property.operation,
    propertyType: property.propertyType
  }, property.priceValue);

  if (!normalized.value) return property;

  return {
    ...property,
    priceFrom: normalized.label,
    priceValue: normalized.value
  };
}
