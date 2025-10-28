import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const delay = parseInt(searchParams.get("delay") || "1000");

  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, delay));

  const data = {
    timestamp: new Date().toISOString(),
    serverTime: new Date().toLocaleString(),
    delay: delay,
    randomData: Math.floor(Math.random() * 10000),
    message: `Streaming data loaded after ${delay}ms`,
    metadata: {
      requestId: Math.random().toString(36).substring(7),
      source: "streaming-api",
      cached: false,
    },
  };

  return NextResponse.json(data);
}
