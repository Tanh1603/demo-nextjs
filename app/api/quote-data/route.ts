import { NextResponse } from "next/server";

const quotes = [
  {
    content: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
  },
  {
    content: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
  },
  {
    content: "Programming is not about typing, it's about thinking.",
    author: "Rich Hickey",
  },
  {
    content:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
  },
  {
    content: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
  },
  {
    content: "Experience is the name everyone gives to their mistakes.",
    author: "Oscar Wilde",
  },
  {
    content: "In order to be irreplaceable, one must always be different.",
    author: "Coco Chanel",
  },
  {
    content: "Java is to JavaScript what car is to Carpet.",
    author: "Chris Heilmann",
  },
  { content: "Knowledge is power.", author: "Francis Bacon" },
  {
    content:
      "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
    author: "Dan Salomon",
  },
];

export async function GET() {
  // Select a quote based on current 30-second interval to demonstrate ISR
  const now = new Date();
  const thirtySecondInterval = Math.floor(now.getTime() / (30 * 1000));
  const quote = quotes[thirtySecondInterval % quotes.length];

  const data = {
    content: quote.content,
    author: quote.author,
    fetchedAt: now.toLocaleString(),
    cached: true,
    interval: thirtySecondInterval,
    nextUpdate: new Date(
      (thirtySecondInterval + 1) * 30 * 1000
    ).toLocaleTimeString(),
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=59",
    },
  });
}
