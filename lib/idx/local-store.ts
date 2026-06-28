import idxData from "@/data/idx/listings.json";
import type { IdxDataFile, IdxProperty } from "./types";

const data = idxData as IdxDataFile;

export function getIdxData(): IdxDataFile {
  return data;
}

export function getIdxProperties(): IdxProperty[] {
  return Array.isArray(data.listings) ? data.listings : [];
}

export function hasIdxProperties(): boolean {
  return getIdxProperties().length > 0;
}
