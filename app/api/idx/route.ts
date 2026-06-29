import { NextResponse } from "next/server";
import { getIdxData } from "@/lib/idx/local-store";
import { getRemoteIdxProperties } from "@/lib/properties";

export const dynamic = "force-dynamic";

export async function GET() {
  const remoteListings = await getRemoteIdxProperties();

  if (remoteListings.length) {
    return NextResponse.json(
      {
        generatedAt: new Date().toISOString(),
        source: "ACOBIR IDX",
        storage: "supabase",
        counts: {
          total: remoteListings.length,
          residential: remoteListings.filter((property) => property.feedType === "res").length,
          commercial: remoteListings.filter((property) => property.feedType === "com").length
        },
        listings: remoteListings
      },
      {
        headers: {
          "Cache-Control": "public, max-age=300, s-maxage=3600"
        }
      }
    );
  }

  return NextResponse.json(getIdxData(), {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=3600"
    }
  });
}
