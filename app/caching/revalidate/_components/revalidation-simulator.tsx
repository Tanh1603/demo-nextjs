"use client";

import { useState, useEffect } from "react";

interface CacheData {
  serverTime: string;
  interval: number;
  timestamp: number;
  cached: boolean;
  cacheTime: string;
}

export function RevalidationSimulator() {
  const [cache, setCache] = useState<{
    data: CacheData;
    expiry: number;
  } | null>(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Update current time every second for cache status
  useEffect(() => {
    // Set initial time with timeout
    const initialTimeout = setTimeout(() => {
      setCurrentTime(Date.now());
    }, 0);

    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const simulateFetch = () => {
    const now = Date.now();
    setFetchCount((prev) => prev + 1);

    // Check if we have valid cache (within 10 seconds)
    if (cache && now < cache.expiry) {
      // Return cached data
      return {
        ...cache.data,
        cached: true,
        cacheTime: new Date(cache.expiry - 10000).toLocaleTimeString(),
      };
    }

    // Generate fresh data (simulate API call)
    const interval = Math.floor(now / (10 * 1000));
    const newData: CacheData = {
      serverTime: new Date().toLocaleTimeString(),
      interval,
      timestamp: now,
      cached: false,
      cacheTime: new Date().toLocaleTimeString(),
    };

    // Cache the data for 10 seconds
    setCache({
      data: newData,
      expiry: now + 10000,
    });

    return newData;
  };

  const [currentData, setCurrentData] = useState<CacheData | null>(null);

  const handleFetch = () => {
    const data = simulateFetch();
    setCurrentData(data);
  };

  const cacheStatus =
    cache && currentTime < cache.expiry
      ? `Valid for ${Math.ceil((cache.expiry - currentTime) / 1000)}s`
      : "Expired or Empty";

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <h3 className="font-semibold text-green-800 mb-3">
        🎯 Production Revalidation Simulator
      </h3>

      <button
        onClick={handleFetch}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
      >
        Simulate Fetch Request (#{fetchCount + 1})
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="bg-white p-3 rounded border">
          <h4 className="font-semibold mb-2">Cache Status:</h4>
          <p className="text-green-700">{cacheStatus}</p>
        </div>

        {currentData && (
          <div className="bg-white p-3 rounded border">
            <h4 className="font-semibold mb-2">Response Data:</h4>
            <p>
              <strong>Time:</strong> {currentData.serverTime}
            </p>
            <p>
              <strong>Interval:</strong> {currentData.interval}
            </p>
            <p>
              <strong>Cached:</strong>{" "}
              {currentData.cached ? "✅ Yes" : "❌ No (Fresh)"}
            </p>
          </div>
        )}
      </div>

      <div className="mt-3 p-2 bg-green-100 rounded text-xs text-green-800">
        <strong>How it works:</strong> Click the button multiple times quickly -
        you&apos;ll get cached data. Wait 10+ seconds between clicks to see
        fresh data generation.
      </div>
    </div>
  );
}
