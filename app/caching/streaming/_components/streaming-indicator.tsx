"use client";

import { useEffect, useState } from "react";

export function StreamingIndicator() {
  const [indicators, setIndicators] = useState<{
    [key: string]: { status: "loading" | "loaded"; timestamp: string };
  }>({
    "fast-content": { status: "loaded", timestamp: "" },
    "medium-content": { status: "loading", timestamp: "" },
    "slow-content": { status: "loading", timestamp: "" },
    "streaming-demo": { status: "loading", timestamp: "" },
  });

  useEffect(() => {
    // Set initial timestamp for fast content
    setTimeout(() => {
      setIndicators((prev) => ({
        ...prev,
        "fast-content": {
          status: "loaded",
          timestamp: new Date().toLocaleTimeString(),
        },
      }));
    }, 100);

    // Simulate the streaming sequence for demo purposes
    setTimeout(() => {
      setIndicators((prev) => ({
        ...prev,
        "medium-content": {
          status: "loaded",
          timestamp: new Date().toLocaleTimeString(),
        },
      }));
    }, 2000);

    setTimeout(() => {
      setIndicators((prev) => ({
        ...prev,
        "slow-content": {
          status: "loaded",
          timestamp: new Date().toLocaleTimeString(),
        },
      }));
    }, 4000);

    setTimeout(() => {
      setIndicators((prev) => ({
        ...prev,
        "streaming-demo": {
          status: "loaded",
          timestamp: new Date().toLocaleTimeString(),
        },
      }));
    }, 3500);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-sm">
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2"></span>
        Streaming Status
      </h3>
      <div className="space-y-2 text-sm">
        {Object.entries(indicators).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-gray-600 capitalize">
              {key.replace("-", " ")}:
            </span>
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  value.status === "loaded"
                    ? "bg-green-500"
                    : "bg-yellow-500 animate-pulse"
                }`}
              ></div>
              <span
                className={`text-xs ${
                  value.status === "loaded"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {value.status === "loaded"
                  ? `✓ ${value.timestamp}`
                  : "Loading..."}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-2 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          💡 Check Network tab to see streaming responses
        </p>
      </div>
    </div>
  );
}
