import Link from "next/link";
import { UpdateTimer } from "./_components/update-timer";

// ISR with real 30-second revalidation
async function getQuote() {
  // Check if we're in build time (no server running)
  const isBuildTime =
    !process.env.NEXT_PUBLIC_BASE_URL && process.env.NODE_ENV === "production";

  if (!isBuildTime) {
    try {
      // Use our local API with revalidation
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/quote-data`,
        {
          next: { revalidate: 30 }, // Revalidate every 30 seconds
        }
      );

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log("Fallback to static quote due to:", error);
    }
  }

  // Fallback for build time or API errors
  return {
    content: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
    fetchedAt: "Build time - static fallback",
    cached: false,
    buildTimeFallback: true,
  };
}

export default async function ISRPage() {
  const quote = await getQuote();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link
        href="/caching"
        className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
      >
        ← Back to Caching Demo
      </Link>

      <h1 className="text-3xl font-bold mb-6">ISR Example</h1>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-yellow-800 mb-4">
          Random Quote (ISR)
        </h2>
        <blockquote className="text-lg italic mb-4">
          &ldquo;{quote.content}&rdquo;
        </blockquote>
        <p className="text-right text-gray-600">— {quote.author}</p>
        <p className="text-sm text-yellow-600 mt-4">
          <strong>Fetched at:</strong> {quote.fetchedAt}
        </p>
        {quote.interval && (
          <p className="text-sm text-yellow-600 mt-1">
            <strong>Interval:</strong> {quote.interval} |{" "}
            <strong>Next update:</strong> {quote.nextUpdate}
          </p>
        )}
        <p className="text-sm text-yellow-600 mt-2">
          This quote uses ISR with <code>next: {"{ revalidate: 30 }"}</code>.
          The content updates every 30 seconds automatically. Refresh after 30
          seconds to see new content!
        </p>
        <UpdateTimer nextUpdate={quote.nextUpdate} />
      </div>

      <div className="bg-gray-100 rounded-lg p-4">
        <h3 className="font-semibold mb-2">ISR Benefits:</h3>
        <ul className="text-sm space-y-1">
          <li>• Static performance with dynamic content</li>
          <li>• Automatic background regeneration</li>
          <li>• Stale-while-revalidate pattern</li>
          <li>• Scales to millions of pages</li>
          <li>• No server overload from traffic spikes</li>
        </ul>
      </div>
    </div>
  );
}
