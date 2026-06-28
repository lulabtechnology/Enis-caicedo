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
  listingPhotoCount: number;
  title: string;
  building: string;
  priceFrom: string;
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
