import { NextResponse } from "next/server";

export async function GET() {
  // Simulate some processing
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({
    message: "This is a prefetched route!",
    serverTime: new Date().toLocaleString(),
    randomId: Math.random().toString(36).substring(7),
  });
}
