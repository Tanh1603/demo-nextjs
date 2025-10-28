import { NextResponse } from "next/server";

export async function GET() {
  // Generate time-based data that changes every 10 seconds
  const now = new Date();
  const tenSecondInterval = Math.floor(now.getTime() / (10 * 1000));

  const data = {
    serverTime: now.toLocaleString(),
    buildTime: now.toISOString(),
    timestamp: now.getTime(),
    message: "This data revalidates every 10 seconds",
    interval: tenSecondInterval,
    nextRevalidation: new Date(
      (tenSecondInterval + 1) * 10 * 1000
    ).toLocaleTimeString(),
    revalidationPeriod: "10 seconds",
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
    },
  });
}
