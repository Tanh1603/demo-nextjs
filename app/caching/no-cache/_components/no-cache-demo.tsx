"use client";

import { useState } from "react";

interface DynamicData {
  timestamp: string;
  requestId: string;
  serverTime: string;
  randomValue: number;
  requestCount: number;
}

export function NoCacheDemo() {
  const [data, setData] = useState<DynamicData | null>(null);
  const [loading, setLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);

  const fetchFreshData = async () => {
    setLoading(true);
    setRequestCount((prev) => prev + 1);

    try {
      // Use cache: 'no-store' to ensure fresh data every time
      const response = await fetch("/api/dynamic-data", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setData({
          ...result,
          requestCount: requestCount + 1,
        });
      }
    } catch (error) {
      console.error("Error fetching dynamic data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={fetchFreshData}
        disabled={loading}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading
          ? "Fetching Fresh Data..."
          : "Fetch Dynamic Content (No Cache)"}
      </button>

      {data && (
        <div className="bg-gray-50 p-4 rounded border space-y-2">
          <h4 className="font-semibold text-gray-800">
            Fresh Data (No Caching):
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <p>
              <strong>Client Request #:</strong> {data.requestCount}
            </p>
            <p>
              <strong>Server Time:</strong> {data.serverTime}
            </p>
            <p>
              <strong>Request ID:</strong> {data.requestId}
            </p>
            <p>
              <strong>Random Value:</strong> {data.randomValue}
            </p>
            <p>
              <strong>Timestamp:</strong> {data.timestamp}
            </p>
          </div>
          <div className="mt-3 p-2 bg-yellow-100 rounded text-xs text-yellow-800">
            <strong>💡 Observation:</strong> Every click generates completely
            new data with different timestamps, request IDs, and random values.
            This proves no caching is happening!
          </div>
        </div>
      )}

      <div className="text-xs text-gray-600 space-y-1">
        <p>
          <strong>How this works:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Uses <code>cache: &apos;no-store&apos;</code> in fetch()
          </li>
          <li>
            Adds <code>Cache-Control: no-cache</code> headers
          </li>
          <li>Server generates fresh data on every request</li>
          <li>No browser or CDN caching occurs</li>
        </ul>
      </div>
    </div>
  );
}
