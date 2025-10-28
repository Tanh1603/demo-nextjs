import Link from "next/link";
import { DataCache } from "./_components/data-cache";
import { RequestMemoization } from "./_components/request-memoization";
import { FullRouteCache } from "./_components/full-route-cache";
import { RouterCache } from "./_components/router-cache";

export default function CachingDemoPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Next.js Caching Demonstration
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          This page demonstrates the four layers of caching in Next.js:
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        {/* Data Cache */}
        <div className="bg-white rounded-lg shadow-lg p-6 border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
              1
            </span>
            Data Cache
          </h2>
          <p className="text-gray-600 mb-4">
            Caches data from fetch requests across server requests and
            deployments.
          </p>
          <DataCache />
        </div>

        {/* Full Route Cache */}
        <div className="bg-white rounded-lg shadow-lg p-6 border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
              2
            </span>
            Full Route Cache
          </h2>
          <p className="text-gray-600 mb-4">
            Caches rendered routes at build time (Static Generation).
          </p>
          <FullRouteCache />
        </div>

        {/* Router Cache */}
        <div className="bg-white rounded-lg shadow-lg p-6 border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
              3
            </span>
            Router Cache
          </h2>
          <p className="text-gray-600 mb-4">
            Client-side cache for visited route segments.
          </p>
          <RouterCache />
        </div>

        {/* Request Memoization */}
        <div className="bg-white rounded-lg shadow-lg p-6 border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="bg-orange-100 text-orange-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
              4
            </span>
            Request Memoization
          </h2>
          <p className="text-gray-600 mb-4">
            Deduplicates requests during a single server request.
          </p>
          <RequestMemoization />
        </div>
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Advanced Features</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/caching/no-cache"
            className="block p-4 bg-red-100 hover:bg-red-200 rounded-lg border border-red-300 transition-colors"
          >
            <strong className="text-red-800">No Cache Example</strong>
            <p className="text-red-600 text-sm">
              See a page with caching disabled
            </p>
          </Link>
          <Link
            href="/caching/revalidate"
            className="block p-4 bg-yellow-100 hover:bg-yellow-200 rounded-lg border border-yellow-300 transition-colors"
          >
            <strong className="text-yellow-800">Revalidation Example</strong>
            <p className="text-yellow-600 text-sm">
              See time-based revalidation in action
            </p>
          </Link>
          <Link
            href="/caching/streaming"
            className="block p-4 bg-blue-100 hover:bg-blue-200 rounded-lg border border-blue-300 transition-colors"
          >
            <strong className="text-blue-800">UI Streaming Demo</strong>
            <p className="text-blue-600 text-sm">
              See progressive rendering with Suspense
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
