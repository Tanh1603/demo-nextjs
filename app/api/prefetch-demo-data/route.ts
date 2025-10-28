import { NextResponse } from "next/server";

export async function GET() {
  // Simulate some processing time
  await new Promise((resolve) => setTimeout(resolve, 100));

  const data = {
    message: "Prefetch demo data loaded successfully",
    timestamp: new Date().toISOString(),
    data: {
      items: [
        { id: 1, name: "Item 1", description: "First demo item" },
        { id: 2, name: "Item 2", description: "Second demo item" },
        { id: 3, name: "Item 3", description: "Third demo item" },
      ],
      total: 3,
    },
  };

  return NextResponse.json(data);
}
