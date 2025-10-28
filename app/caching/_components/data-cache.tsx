"use client";

import { useState } from "react";

export function DataCache() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fetchTime, setFetchTime] = useState<string>("");

  const fetchCachedData = async () => {
    setLoading(true);
    const startTime = new Date().toLocaleTimeString();

    try {
      const response = await fetch("/api/caching/data-cache");
      const result = await response.json();
      setData(result);
      setFetchTime(startTime);
    } catch (error) {
      console.error("Error fetching cached data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUncachedData = async () => {
    setLoading(true);
    const startTime = new Date().toLocaleTimeString();

    try {
      const response = await fetch("/api/caching/data-cache?cache=no-store", {
        cache: "no-store",
      });
      const result = await response.json();
      setData(result);
      setFetchTime(startTime);
    } catch (error) {
      console.error("Error fetching uncached data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={fetchCachedData}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Fetch Cached Data"}
        </button>
        <button
          onClick={fetchUncachedData}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Fetch Fresh Data"}
        </button>
      </div>

      {data && (
        <div className="p-4 bg-gray-100 rounded border text-sm">
          <p>
            <strong>Request Time:</strong> {fetchTime}
          </p>
          <p>
            <strong>Server Time:</strong> {data.serverTime}
          </p>
          <p>
            <strong>Random Number:</strong> {data.randomNumber}
          </p>
          <p>
            <strong>Cached:</strong> {data.cached ? "Yes" : "No"}
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Notice how cached data returns the same server time and random
            number, while fresh data generates new values.
          </p>
        </div>
      )}
    </div>
  );
}
