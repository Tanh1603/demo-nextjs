import { NextResponse } from "next/server";

export async function GET() {
  // Generate fresh data each time
  const data = {
    currentTime: new Date().toLocaleString(),
    randomNumber: Math.floor(Math.random() * 1000),
    timestamp: Date.now(),
    message: "This data is generated fresh on each request",
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
