import type { Property } from "@/components/site/PropertyCard";
import { copy } from "@/content/site";
import { getIdxProperties } from "@/lib/idx/local-store";
import { getSupabaseIdxListingById, getSupabaseIdxListings } from "@/lib/idx/supabase";

export function getManualProperties(): Property[] {
  const apartments = copy.properties.items as Property[];
  const lots = ((copy.properties as { lots?: Property[] }).lots ?? []) as Property[];
  return [...apartments, ...lots];
}

export function getLocalIdxProperties(): Property[] {
  return getIdxProperties() as Property[];
}

export async function getRemoteIdxProperties(): Promise<Property[]> {
  return (await getSupabaseIdxListings()) as Property[];
}

export async function getIdxPropertiesForSite(): Promise<Property[]> {
  const remote = await getRemoteIdxProperties();
  if (remote.length) return remote;
  return getLocalIdxProperties();
}

export async function getAllPropertiesForSite(): Promise<Property[]> {
  const idx = await getIdxPropertiesForSite();
  return [...idx, ...getManualProperties()];
}

export async function getActivePropertiesForSite(): Promise<{ properties: Property[]; usingIdx: boolean }> {
  const idx = await getIdxPropertiesForSite();
  if (idx.length) return { properties: idx, usingIdx: true };
  return { properties: getManualProperties(), usingIdx: false };
}

export async function getPropertyById(id: string): Promise<Property | undefined> {
  const remote = await getSupabaseIdxListingById(id);
  if (remote) return remote as Property;

  return (await getAllPropertiesForSite()).find((property) => property.id === id);
}

export function groupPropertiesByBuilding(properties: Property[]): Record<string, Property[]> {
  return properties.reduce<Record<string, Property[]>>((acc, property) => {
    const key = property.building || "Otros";
    if (!acc[key]) acc[key] = [];
    acc[key].push(property);
    return acc;
  }, {});
}
