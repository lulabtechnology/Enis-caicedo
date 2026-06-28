import type { Property } from "@/components/site/PropertyCard";
import { copy } from "@/content/site";
import { getIdxProperties } from "@/lib/idx/local-store";

export function getManualProperties(): Property[] {
  const apartments = copy.properties.items as Property[];
  const lots = ((copy.properties as { lots?: Property[] }).lots ?? []) as Property[];
  return [...apartments, ...lots];
}

export function getAllPropertiesForSite(): Property[] {
  return [...getIdxProperties(), ...getManualProperties()];
}

export function getPropertyById(id: string): Property | undefined {
  return getAllPropertiesForSite().find((property) => property.id === id);
}

export function groupPropertiesByBuilding(properties: Property[]): Record<string, Property[]> {
  return properties.reduce<Record<string, Property[]>>((acc, property) => {
    const key = property.building || "Otros";
    if (!acc[key]) acc[key] = [];
    acc[key].push(property);
    return acc;
  }, {});
}
