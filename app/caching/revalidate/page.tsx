import Link from "next/link";
import { RevalidationTimer } from "./_components/revalidation-timer";
import { RevalidationSimulator } from "./_components/revalidation-simulator";

// This page demonstrates real revalidation with 10-second intervals
async function getTimeData() {
  // Check if we're in build time (no server running)
  const isBuildTime =
    !process.env.NEXT_PUBLIC_BASE_URL && process.env.NODE_ENV === "production";

  if (!isBuildTime) {
    try {
      // Fetch from our time-data API with 10-second revalidation
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        }/api/time-data`,
        {
          next: { revalidate: 10 }, // Revalidate every 10 seconds
        }
      );

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log("Fallback to static data due to:", error);
    }
  }

  // Fallback for build time or API errors
  return {
    serverTime: "Build time - static fallback",
    buildTime: "Static build time",
    message: "Static fallback data for build time",
    buildTimeFallback: true,
  };
}

export default async function RevalidatePage() {
  const data = await getTimeData();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link
        href="/caching"
        className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
      >
        ← Back to Caching Demo
      </Link>

      <h1 className="text-3xl font-bold mb-6">Revalidation Example</h1>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-yellow-800 mb-4">
          ISR Content
        </h2>
        <p>
          <strong>Server Time:</strong> {data.serverTime}
        </p>
        <p>
          <strong>Build Time:</strong> {data.buildTime}
        </p>
        {data.interval && (
          <p>
            <strong>Interval:</strong> {data.interval} |{" "}
            <strong>Next revalidation:</strong> {data.nextRevalidation}
          </p>
        )}
        <p className="text-sm text-yellow-600 mt-4">
          This page uses <code>next: {"{ revalidate: 10 }"}</code> in fetch()
          for 10-second revalidation. The content updates automatically every 10
          seconds when requested.
        </p>
        <RevalidationTimer nextRevalidation={data.nextRevalidation} />
      </div>

      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-2">Configuration:</h3>
        <pre className="text-sm bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
          {`fetch(url, { next: { revalidate: 10 } })`}
        </pre>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <h3 className="font-semibold text-red-800 mb-2">
          ⚠️ Development Mode Notice:
        </h3>
        <p className="text-sm text-red-600 mb-2">
          You&apos;re seeing fresh data on every reload because{" "}
          <strong>development mode bypasses caching</strong> for better DX.
        </p>
        <p className="text-sm text-red-600">
          To see real revalidation behavior, you need to build and run in
          production mode:
        </p>
        <pre className="text-xs bg-red-100 p-2 mt-2 rounded">
          npm run build && npm start
        </pre>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">
          How to test revalidation (Production Mode):
        </h3>
        <ol className="text-sm text-blue-600 space-y-1">
          <li>
            1. Build and start in production:{" "}
            <code>npm run build && npm start</code>
          </li>
          <li>2. Visit this page and note the &quot;Interval&quot; number</li>
          <li>
            3. Refresh multiple times quickly - same interval number appears
          </li>
          <li>4. Wait 10+ seconds, then refresh - new interval number shows</li>
          <li>
            5. This proves content is cached for 10 seconds, then revalidated
          </li>
        </ol>

        <div className="mt-3 p-2 bg-blue-100 rounded text-xs">
          <strong>Why dev mode is different:</strong> Next.js disables caching
          in development to ensure you always see your latest changes
          immediately.
        </div>
      </div>

      {/* Interactive Simulator */}
      <RevalidationSimulator />
    </div>
  );
}
