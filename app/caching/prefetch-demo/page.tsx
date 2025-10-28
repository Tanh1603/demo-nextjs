import Link from "next/link";

export default function PrefetchDemoPage() {
  const loadTime = "Page loaded successfully";

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link
        href="/caching"
        className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
      >
        ← Back to Caching Demo
      </Link>

      <h1 className="text-3xl font-bold mb-6">Prefetch Demo Page</h1>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-purple-800 mb-4">
          Prefetched Content
        </h2>
        <p>
          <strong>Page loaded at:</strong> {loadTime}
        </p>
        <p className="text-sm text-purple-600 mt-4">
          If you clicked &ldquo;Prefetch Route&rdquo; on the main caching page
          before visiting this page, it should have loaded almost instantly
          because it was prefetched in the background.
        </p>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-2">
          How Router Cache Prefetching Works:
        </h3>
        <ol className="text-sm space-y-2">
          <li>
            1. <strong>Link Prefetching:</strong> Links in viewport are
            automatically prefetched
          </li>
          <li>
            2. <strong>Manual Prefetching:</strong> Use router.prefetch() for
            programmatic prefetching
          </li>
          <li>
            3. <strong>Background Loading:</strong> Routes load in background
            during idle time
          </li>
          <li>
            4. <strong>Instant Navigation:</strong> Prefetched routes appear
            instantly when clicked
          </li>
        </ol>
      </div>

      <div className="flex gap-4">
        <Link
          href="/caching/router-cache-demo"
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
        >
          Next Demo Page
        </Link>
        <Link
          href="/caching"
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors block text-center"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}
