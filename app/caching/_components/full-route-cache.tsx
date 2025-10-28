import Link from "next/link";

export function FullRouteCache() {
  const currentTime = "Static generation timestamp";

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Full Route Cache stores the rendered result of routes at build time
        (Static Generation).
      </p>

      <div className="p-4 bg-green-50 border border-green-200 rounded">
        <p className="text-sm">
          <strong>Page Generated At:</strong> {currentTime}
        </p>
        <p className="text-xs text-gray-600 mt-2">
          This demonstrates static generation at build time. The content
          won&apos;t change between page visits unless the cache is invalidated.
        </p>
      </div>

      <div className="space-y-2">
        <Link
          href="/caching/static"
          className="block p-3 bg-green-100 hover:bg-green-200 rounded border border-green-300 transition-colors text-sm"
        >
          <strong>Static Route Example</strong>
          <p className="text-green-700 text-xs">Cached at build time</p>
        </Link>

        <Link
          href="/caching/isr"
          className="block p-3 bg-yellow-100 hover:bg-yellow-200 rounded border border-yellow-300 transition-colors text-sm"
        >
          <strong>ISR Route Example</strong>
          <p className="text-yellow-700 text-xs">Static with revalidation</p>
        </Link>
      </div>

      <div className="p-3 bg-blue-50 border border-blue-200 rounded text-xs">
        <strong>How it works:</strong> Routes are pre-rendered at build time and
        served from a cache. The cache persists until manually invalidated or
        revalidation occurs.
      </div>
    </div>
  );
}
