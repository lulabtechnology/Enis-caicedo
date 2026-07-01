import { buildIdxPhotos, normalizePhotoCount } from "./photos";
import { normalizeIdxPrice, normalizePriceKey, parseIdxPriceValue } from "./prices";
import type { IdxFeedType, IdxProperty, IdxRawRecord } from "./types";

const FALLBACK_IMAGE = "/images/properties-banner.jpg";

const fieldCandidates = {
  uniqueId: ["unique_id", "uniqueid", "listing_unique_id", "mls_id", "mls_number", "listing_id", "id"],
  mlsCode: [
    "mls_number",
    "mls_id",
    "mls_code",
    "mls",
    "acobir_id",
    "acobir_code",
    "acobir_number",
    "listing_number",
    "listing_code",
    "listing_id",
    "numero_mls",
    "codigo_mls",
    "codigo_acobir",
    "cod_acobir",
    "codigo_listado",
    "numero_listado",
    "unique_id"
  ],
  photoCount: ["listing_photo_count", "photo_count", "photos", "num_photos", "cantidad_fotos"],
  price: [
    "price",
    "price_usd",
    "list_price",
    "listprice",
    "listing_price",
    "listingprice",
    "asking_price",
    "askingprice",
    "current_price",
    "current_list_price",
    "original_price",
    "sale_price",
    "sales_price",
    "selling_price",
    "purchase_price",
    "rent_price",
    "rental_price",
    "monthly_rent",
    "lease_price",
    "lease_rate",
    "lp",
    "precio",
    "precio_lista",
    "precio_de_lista",
    "precio_venta",
    "precio_de_venta",
    "precio_renta",
    "precio_alquiler",
    "valor",
    "valor_venta",
    "valor_alquiler"
  ],
  title: ["title", "listing_title", "marketing_title", "titulo", "headline"],
  description: ["public_remarks", "remarks", "description", "descripcion", "comentarios", "observaciones"],
  building: ["building", "building_name", "edificio", "project_name", "subdivision", "neighborhood", "neighbourhood", "barrio", "zona"],
  propertyType: ["property_type", "property_sub_type", "tipo_propiedad", "subtipo", "subtype", "type"],
  operation: ["transaction_type", "operation", "operacion", "listing_type", "sale_rent", "for_sale_or_rent"],
  city: ["city", "ciudad"],
  province: ["province", "provincia", "state"],
  district: ["district", "distrito"],
  address: ["address", "direccion", "street_address"],
  bedrooms: ["bedrooms", "beds", "recamaras", "habitaciones", "bedrooms_total"],
  bathrooms: ["bathrooms", "baths", "banos", "baños", "bathrooms_total"],
  area: ["living_area", "building_area", "construction_area", "area", "area_construccion", "m2", "sq_m"],
  lotArea: ["lot_size", "lot_area", "land_area", "terreno", "area_terreno"],
  listingAgentName: [
    "listing_agent_name",
    "list_agent_name",
    "listingagentname",
    "listagentname",
    "agent_name",
    "agent_full_name",
    "sales_agent",
    "broker_agent",
    "nombre_agente",
    "agente",
    "asesor",
    "agente_listador",
    "agente_captador",
    "corredor"
  ],
  listingAgentCode: [
    "listing_agent_id",
    "list_agent_id",
    "listingagentid",
    "listagentid",
    "agent_id",
    "agent_code",
    "member_id",
    "member_number",
    "agt_id",
    "agt_code",
    "codigo_agente",
    "id_agente",
    "agente_id",
    "broker_agent_id",
    "listing_agent_code"
  ],
  listingAgentPhone: [
    "listing_agent_phone",
    "list_agent_phone",
    "agent_phone",
    "agent_mobile",
    "phone",
    "telefono_agente",
    "celular_agente"
  ],
  listingAgentEmail: [
    "listing_agent_email",
    "list_agent_email",
    "agent_email",
    "email_agente",
    "correo_agente"
  ]
} satisfies Record<string, string[]>;

function normalizeKey(key: string): string {
  return key
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function buildKeyMap(record: IdxRawRecord): Map<string, string> {
  const map = new Map<string, string>();
  Object.keys(record).forEach((key) => map.set(normalizeKey(key), key));
  return map;
}

function read(record: IdxRawRecord, keyMap: Map<string, string>, candidates: string[]): string {
  for (const candidate of candidates) {
    const realKey = keyMap.get(normalizeKey(candidate));
    const value = realKey ? record[realKey] : undefined;
    const normalized = String(value ?? "").trim();
    if (normalized) return normalized;
  }

  return "";
}

function toNumber(value: string): number | undefined {
  const parsed = parseIdxPriceValue(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function looksLikePriceKey(key: string): boolean {
  const normalized = normalizeKey(key);
  const includesPriceWord = [
    "price",
    "precio",
    "valor",
    "renta",
    "rental",
    "rent",
    "lease",
    "alquiler",
    "venta",
    "sale",
    "asking",
    "list"
  ].some((word) => normalized.includes(word));

  const isNoise = [
    "per",
    "por",
    "metro",
    "meter",
    "sq",
    "m2",
    "maintenance",
    "mantenimiento",
    "hoa",
    "condo",
    "tax",
    "impuesto",
    "fee",
    "comision",
    "commission",
    "percent",
    "porcentaje"
  ].some((word) => normalized.includes(word));

  return includesPriceWord && !isNoise;
}

function readPrice(record: IdxRawRecord, keyMap: Map<string, string>, operation = ""): { raw: string; numeric?: number } {
  const direct = read(record, keyMap, fieldCandidates.price);
  const directNumber = toNumber(direct);
  if (directNumber) return { raw: direct, numeric: directNumber };

  const normalizedOperation = normalizeKey(operation);
  const prefersRent = ["rent", "renta", "alquiler", "lease"].some((word) => normalizedOperation.includes(word)) &&
    !["sale", "venta"].some((word) => normalizedOperation.includes(word));

  const fallback = Object.entries(record)
    .filter(([key, value]) => looksLikePriceKey(key) && toNumber(String(value ?? "")))
    .sort(([keyA], [keyB]) => {
      const score = (key: string) => {
        const normalized = normalizeKey(key);
        const isRent = normalized.includes("rent") || normalized.includes("renta") || normalized.includes("alquiler") || normalized.includes("lease");
        const isSale = normalized.includes("sale") || normalized.includes("venta") || normalized.includes("list") || normalized.includes("lista") || normalized.includes("asking");

        if (prefersRent && isRent) return 0;
        if (!prefersRent && isSale) return 0;
        if (normalized.includes("current")) return 1;
        if (normalized.includes("price") || normalized.includes("precio") || normalized.includes("valor")) return 2;
        if (isRent || isSale) return 3;
        return 4;
      };
      return score(keyA) - score(keyB);
    })[0];

  if (fallback) {
    const raw = String(fallback[1] ?? "").trim();
    return { raw, numeric: toNumber(raw) };
  }

  return { raw: direct, numeric: directNumber };
}

function compact(items: Array<string | undefined | null>): string[] {
  return items.map((item) => String(item ?? "").trim()).filter(Boolean);
}

function titleCaseFallback(value: string): string {
  if (!value) return "Propiedad disponible";
  return value
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function normalizeIdxRecord(
  record: IdxRawRecord,
  feedType: IdxFeedType,
  options: { maxPhotos?: number; includeRaw?: boolean } = {}
): IdxProperty | null {
  const keyMap = buildKeyMap(record);
  const uniqueId = read(record, keyMap, fieldCandidates.uniqueId);

  if (!uniqueId) return null;

  const listingPhotoCount = normalizePhotoCount(read(record, keyMap, fieldCandidates.photoCount));
  const photos = buildIdxPhotos(uniqueId, listingPhotoCount, options.maxPhotos ?? 12);

  const propertyType = read(record, keyMap, fieldCandidates.propertyType) || (feedType === "res" ? "Residencial" : "Comercial");
  const operation = read(record, keyMap, fieldCandidates.operation) || "Disponible";
  const mlsCode = read(record, keyMap, fieldCandidates.mlsCode) || uniqueId;
  const listingAgentName = read(record, keyMap, fieldCandidates.listingAgentName);
  const listingAgentCode = read(record, keyMap, fieldCandidates.listingAgentCode);
  const listingAgentPhone = read(record, keyMap, fieldCandidates.listingAgentPhone);
  const listingAgentEmail = read(record, keyMap, fieldCandidates.listingAgentEmail);
  const building = read(record, keyMap, fieldCandidates.building) || titleCaseFallback(read(record, keyMap, fieldCandidates.city));
  const city = read(record, keyMap, fieldCandidates.city);
  const province = read(record, keyMap, fieldCandidates.province);
  const district = read(record, keyMap, fieldCandidates.district);
  const address = read(record, keyMap, fieldCandidates.address);
  const bedrooms = toNumber(read(record, keyMap, fieldCandidates.bedrooms));
  const bathrooms = toNumber(read(record, keyMap, fieldCandidates.bathrooms));
  const areaRaw = read(record, keyMap, fieldCandidates.area);
  const lotAreaRaw = read(record, keyMap, fieldCandidates.lotArea);
  const area = areaRaw ? `${areaRaw}${/m|ft|pie|sq/i.test(areaRaw) ? "" : " m²"}` : undefined;
  const lotArea = lotAreaRaw ? `${lotAreaRaw}${/m|ft|pie|sq/i.test(lotAreaRaw) ? "" : " m²"}` : undefined;
  const location = compact([address, district, city, province]).join(", ") || "Panamá";
  const title =
    read(record, keyMap, fieldCandidates.title) ||
    compact([propertyType, building || city]).join(" en ") ||
    `Propiedad ${uniqueId}`;

  const price = readPrice(record, keyMap, operation);
  const normalizedPrice = normalizeIdxPrice(price.raw, {
    title,
    operation,
    propertyType
  }, price.numeric);

  const highlights = compact([
    bedrooms ? `${bedrooms} recámara${bedrooms === 1 ? "" : "s"}` : undefined,
    bathrooms ? `${bathrooms} baño${bathrooms === 1 ? "" : "s"}` : undefined,
    area ? `${area} de construcción` : undefined,
    lotArea ? `${lotArea} de terreno` : undefined,
    operation,
    feedType === "res" ? "Listado residencial ACOBIR" : "Listado comercial ACOBIR"
  ]).slice(0, 6);

  const tags = compact([
    feedType === "res" ? "Residencial" : "Comercial",
    propertyType,
    operation,
    city || district || province
  ]).slice(0, 5);

  const image = photos[0]?.localPath || FALLBACK_IMAGE;

  return {
    id: `idx-${feedType}-${uniqueId}`,
    source: "ACOBIR IDX",
    feedType,
    uniqueId,
    mlsCode,
    listingAgentName,
    listingAgentCode,
    listingAgentPhone,
    listingAgentEmail,
    listingPhotoCount,
    title,
    building: building || (feedType === "res" ? "Residencial" : "Comercial"),
    priceFrom: normalizedPrice.label,
    priceValue: normalizedPrice.value,
    location,
    tags,
    image,
    images: photos.length ? photos.map((photo) => photo.localPath) : [FALLBACK_IMAGE],
    highlights,
    description: read(record, keyMap, fieldCandidates.description),
    operation,
    propertyType,
    bedrooms,
    bathrooms,
    area,
    lotArea,
    raw: options.includeRaw ? record : undefined
  };
}

export function normalizeIdxRecords(
  records: IdxRawRecord[],
  feedType: IdxFeedType,
  options: { maxPhotos?: number; includeRaw?: boolean } = {}
): IdxProperty[] {
  return records
    .map((record) => normalizeIdxRecord(record, feedType, options))
    .filter((property): property is IdxProperty => Boolean(property));
}
