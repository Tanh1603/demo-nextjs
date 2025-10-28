import Link from "next/link";

// This is a static route that will be cached at build time
export default function StaticPage() {
  // Use a static timestamp to demonstrate static generation
  const buildTime = "Build time: Will be set at build time";

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link
        href="/caching"
        className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
      >
        ← Back to Caching Demo
      </Link>

      <h1 className="text-3xl font-bold mb-6">Static Route Example</h1>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4">
          Static Content
        </h2>
        <p>
          <strong>Status:</strong> {buildTime}
        </p>
        <p className="text-sm text-green-600 mt-4">
          This page is statically generated at build time and cached
          indefinitely. It contains no dynamic content and loads extremely fast
          from the cache.
        </p>
      </div>

      <div className="bg-gray-100 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Characteristics:</h3>
        <ul className="text-sm space-y-1">
          <li>• Generated at build time</li>
          <li>• Served from CDN/cache</li>
          <li>• Extremely fast loading</li>
          <li>• No server computation on each request</li>
          <li>• Perfect for content that doesn&apos;t change often</li>
        </ul>
      </div>
    </div>
  );
}
