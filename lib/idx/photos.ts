import { IDX_BOARD, IDX_PHOTO_FAILOVER, IDX_PHOTO_PUBLIC_PREFIX } from "./config";
import type { IdxPhoto } from "./types";

export function normalizePhotoCount(value: unknown): number {
  const parsed = Number(String(value ?? "").replace(/[^0-9]/g, ""));
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return parsed;
}

export function photoNumber(index: number): string {
  return String(index).padStart(2, "0");
}

export function photoName(uniqueId: string, index: number): string {
  return `${uniqueId}.L${photoNumber(index)}`;
}

export function photoFileName(uniqueId: string, index: number): string {
  return `${photoName(uniqueId, index)}.jpg`;
}

export function buildIdxPhotoUrl(uniqueId: string, index: number): string {
  const name = photoName(uniqueId, index);
  const params = new URLSearchParams({
    btnSubmit: "GetPhoto",
    board: IDX_BOARD,
    failover: IDX_PHOTO_FAILOVER,
    name
  });

  return `http://images.realtyserver.com/photo_server.php?${params.toString()}`;
}

export function buildLocalPhotoPath(uniqueId: string, index: number): string {
  return `${IDX_PHOTO_PUBLIC_PREFIX}/${photoFileName(uniqueId, index)}`;
}

export function buildIdxPhotos(uniqueId: string, count: number, maxPhotos = 12): IdxPhoto[] {
  if (!uniqueId || count <= 0) return [];

  return Array.from({ length: Math.min(count, maxPhotos) }, (_, itemIndex) => {
    const index = itemIndex + 1;
    return {
      index,
      remoteUrl: buildIdxPhotoUrl(uniqueId, index),
      localPath: buildLocalPhotoPath(uniqueId, index)
    };
  });
}
