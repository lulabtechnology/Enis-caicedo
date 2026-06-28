import type { IdxFeedType } from "./types";

export const IDX_BOARD = "panama";
export const IDX_PHOTO_FAILOVER = "clear.gif";
export const DEFAULT_IDX_HOST = "ftp.realtyserver.com";
export const IDX_DEFAULT_FEEDS: IdxFeedType[] = ["res", "com"];

export const IDX_DATA_PATH = "data/idx/listings.json";
export const IDX_PHOTO_PUBLIC_DIR = "public/idx/photos";
export const IDX_PHOTO_PUBLIC_PREFIX = "/idx/photos";

export function parseFeeds(value?: string): IdxFeedType[] {
  if (!value) return IDX_DEFAULT_FEEDS;

  const feeds = value
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  const allowed = new Set<IdxFeedType>(["res", "com"]);
  const parsed = feeds.filter((feed): feed is IdxFeedType => allowed.has(feed as IdxFeedType));

  return parsed.length ? parsed : IDX_DEFAULT_FEEDS;
}
