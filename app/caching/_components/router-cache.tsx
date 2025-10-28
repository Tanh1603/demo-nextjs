"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function RouterCache() {
  const router = useRouter();

  const prefetchRoute = () => {
    router.prefetch("/caching/prefetch-demo");
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Router Cache is a client-side cache that stores route segments in the
        user's browser.
      </p>

      <div className="space-y-2">
        <button
          onClick={prefetchRoute}
          className="w-full p-3 bg-purple-100 hover:bg-purple-200 rounded border border-purple-300 transition-colors text-sm text-left"
        >
          <strong>Prefetch Route</strong>
          <p className="text-purple-700 text-xs">
            Click to prefetch a route (loads in background)
          </p>
        </button>

        <Link
          href="/caching/prefetch-demo"
          className="block p-3 bg-purple-100 hover:bg-purple-200 rounded border border-purple-300 transition-colors text-sm"
        >
          <strong>Visit Prefetched Route</strong>
          <p className="text-purple-700 text-xs">
            Should load instantly if prefetched
          </p>
        </Link>

        <Link
          href="/caching/router-cache-demo"
          className="block p-3 bg-indigo-100 hover:bg-indigo-200 rounded border border-indigo-300 transition-colors text-sm"
        >
          <strong>Router Cache Demo</strong>
          <p className="text-indigo-700 text-xs">
            Navigate and see cached behavior
          </p>
        </Link>
      </div>

      <div className="p-3 bg-blue-50 border border-blue-200 rounded text-xs">
        <strong>How it works:</strong> When you navigate between routes, Next.js
        caches the route segments in the browser. Subsequent visits to cached
        routes load instantly without server requests.
      </div>
    </div>
  );
}
