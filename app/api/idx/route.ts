import { NextResponse } from "next/server";
import { getIdxData } from "@/lib/idx/local-store";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(getIdxData(), {
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=3600"
    }
  });
}
