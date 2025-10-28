import Link from "next/link";
import { NoCacheDemo } from "./_components/no-cache-demo";

// This page demonstrates dynamic rendering without caching
export default function NoCachePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link
        href="/caching"
        className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
      >
        ← Back to Caching Demo
      </Link>

      <h1 className="text-3xl font-bold mb-6">No Cache Example</h1>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-red-800 mb-4">
          Dynamic Content Demo
        </h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded border">
            <p className="text-sm text-gray-600 mb-2">
              Click the button below to fetch fresh data on each request (no
              caching):
            </p>
            <NoCacheDemo />
          </div>
        </div>
        <p className="text-sm text-red-600 mt-4">
          Notice how the data changes every time you click the button - this
          demonstrates dynamic rendering with no caching. Each request generates
          fresh content.
        </p>
      </div>

      <div className="bg-gray-100 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Testing Instructions:</h3>
        <ol className="text-sm space-y-1 list-decimal list-inside">
          <li>
            Click the &quot;Fetch Dynamic Content&quot; button multiple times
          </li>
          <li>Notice how all values change on each click</li>
          <li>Compare this with cached content that stays the same</li>
          <li>Open DevTools Network tab to see fresh requests each time</li>
        </ol>

        <h3 className="font-semibold mb-2 mt-4">Key Characteristics:</h3>
        <ul className="text-sm space-y-1">
          <li>• No static generation at build time</li>
          <li>• Server renders fresh content for each request</li>
          <li>• No caching of API responses or page content</li>
          <li>• Perfect for user-specific or real-time data</li>
        </ul>
      </div>
    </div>
  );
}
