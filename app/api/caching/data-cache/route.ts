import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cacheOption = searchParams.get("cache");

  // Simulate some processing time
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = {
    serverTime: new Date().toLocaleString(),
    randomNumber: Math.floor(Math.random() * 1000),
    cached: cacheOption !== "no-store",
    timestamp: Date.now(),
  };

  // Control caching behavior
  if (cacheOption === "no-store") {
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  }

  // Default: Cache for 30 seconds
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, max-age=30, s-maxage=30",
    },
  });
}
