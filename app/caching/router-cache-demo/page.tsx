"use client";

import Link from "next/link";
import { useState } from "react";

export default function RouterCacheDemoPage() {
  const [visitCount] = useState(() => {
    // Initialize visit count
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("routerCacheVisits");
      const count = stored ? parseInt(stored) + 1 : 1;
      sessionStorage.setItem("routerCacheVisits", count.toString());
      return count;
    }
    return 1;
  });

  const [currentTime] = useState(() => {
    if (typeof window !== "undefined") {
      return new Date().toLocaleTimeString();
    }
    return "Loading...";
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link
        href="/caching"
        className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
      >
        ← Back to Caching Demo
      </Link>

      <h1 className="text-3xl font-bold mb-6">Router Cache Demo</h1>

      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-indigo-800 mb-4">
          Navigation Tracking
        </h2>
        <p>
          <strong>Visit count this session:</strong> {visitCount}
        </p>
        <p>
          <strong>Current visit time:</strong> {currentTime}
        </p>
        <p className="text-sm text-indigo-600 mt-2">
          This counter increases each time you visit this page in the same
          browser session.
        </p>
      </div>

      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-2">Test Router Cache:</h3>
        <ol className="text-sm space-y-2">
          <li>1. Navigate to another page using the links below</li>
          <li>2. Use your browser&apos;s back button to return here</li>
          <li>3. Notice how quickly the page loads (it&apos;s cached!)</li>
          <li>4. The visit count shows client-side state is preserved</li>
        </ol>
      </div>

      <div className="flex gap-4 flex-wrap">
        <Link
          href="/caching/prefetch-demo"
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
        >
          Prefetch Demo
        </Link>
        <Link
          href="/caching/static"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Static Page
        </Link>
        <Link
          href="/students"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Students Page
        </Link>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-sm text-yellow-800">
          <strong>Pro tip:</strong> Open the Network tab in DevTools and
          navigate between pages. You&apos;ll see that cached routes don&apos;t
          make new requests to the server!
        </p>
      </div>
    </div>
  );
}
