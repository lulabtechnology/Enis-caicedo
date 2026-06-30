export type IdxFeedType = "res" | "com";

export type IdxRawRecord = Record<string, string | number | null | undefined>;

export type IdxPhoto = {
  index: number;
  remoteUrl: string;
  localPath: string;
};

export type IdxProperty = {
  id: string;
  source: "ACOBIR IDX";
  feedType: IdxFeedType;
  uniqueId: string;
  /** Código visible del listado en ACOBIR/MLS. Si el feed no trae otro código, se usa uniqueId. */
  mlsCode?: string;
  /** Datos del agente capturados si el CSV de ACOBIR los incluye. */
  listingAgentName?: string;
  listingAgentCode?: string;
  listingAgentPhone?: string;
  listingAgentEmail?: string;
  listingPhotoCount: number;
  title: string;
  building: string;
  priceFrom: string;
  priceValue?: number;
  location: string;
  tags: string[];
  image: string;
  images: string[];
  highlights: string[];
  description?: string;
  operation?: string;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  lotArea?: string;
  raw?: IdxRawRecord;
};

export type IdxDataFile = {
  generatedAt: string | null;
  source: "ACOBIR IDX";
  feeds: IdxFeedType[];
  counts: {
    total: number;
    residential: number;
    commercial: number;
  };
  listings: IdxProperty[];
};
