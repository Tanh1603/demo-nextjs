import Link from "next/link";
import { Suspense } from "react";
import { StreamingDemo } from "./_components/streaming-demo";
import { DelayedContent } from "./_components/delayed-content";
import { FastContent } from "./_components/fast-content";
import { SlowContent } from "./_components/slow-content";
import { LoadingSkeleton } from "./_components/loading-skeleton";
import { StreamingIndicator } from "./_components/streaming-indicator";
import { DevToolsGuide } from "./_components/devtools-guide";

export default function StreamingPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        href="/caching"
        className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
      >
        ← Back to Caching Demo
      </Link>

      <h1 className="text-3xl font-bold mb-6">
        UI Streaming (Chunk Streaming) Demo
      </h1>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">
          What is UI Streaming?
        </h2>
        <p className="text-blue-700 mb-4">
          UI Streaming allows you to progressively render and stream UI from the
          server to the client. Instead of waiting for all data to be fetched,
          components can be streamed as they become ready, providing a better
          user experience with faster perceived load times.
        </p>
        <p className="text-sm text-blue-600">
          This is made possible by React&apos;s Suspense boundaries and Next.js
          App Router&apos;s streaming capabilities.
        </p>
      </div>

      <div className="space-y-8">
        {/* Fast Content - Renders Immediately */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-3">
            ⚡ Fast Content (Immediate)
          </h3>
          <FastContent />
        </div>

        {/* Streaming Demo with Multiple Suspense Boundaries */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🚀 Streaming Components
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Watch as different components load progressively based on their data
            fetch times:
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Medium delay content */}
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">
                Medium Priority Data (2s)
              </h4>
              <Suspense
                fallback={
                  <LoadingSkeleton text="Loading medium priority data..." />
                }
              >
                <DelayedContent delay={2000} />
              </Suspense>
            </div>

            {/* Slow content */}
            <div className="bg-orange-50 border border-orange-200 rounded p-4">
              <h4 className="font-semibold text-orange-800 mb-2">
                Low Priority Data (4s)
              </h4>
              <Suspense
                fallback={
                  <LoadingSkeleton text="Loading low priority data..." />
                }
              >
                <SlowContent />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Advanced Streaming Demo */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-800 mb-3">
            🌊 Advanced Streaming Demo
          </h3>
          <Suspense
            fallback={<LoadingSkeleton text="Loading streaming demo..." />}
          >
            <StreamingDemo />
          </Suspense>
        </div>
      </div>

      <div className="mt-8 bg-gray-100 rounded-lg p-4">
        <h3 className="font-semibold mb-2">How It Works:</h3>
        <ol className="text-sm space-y-1">
          <li>
            1. <strong>Suspense Boundaries:</strong> Wrap async components that
            fetch data
          </li>
          <li>
            2. <strong>Fallback UI:</strong> Shows immediately while content
            loads
          </li>
          <li>
            3. <strong>Progressive Loading:</strong> Components stream as their
            data becomes available
          </li>
          <li>
            4. <strong>Better UX:</strong> Users see content progressively
            instead of waiting for everything
          </li>
        </ol>

        <div className="mt-3 p-2 bg-gray-800 text-green-400 rounded text-xs font-mono">
          {`<Suspense fallback={<Loading />}>
  <AsyncComponent />
</Suspense>`}
        </div>
      </div>

      <div className="mt-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <h3 className="font-semibold text-indigo-800 mb-2">
          🚀 Advanced Example
        </h3>
        <p className="text-indigo-700 text-sm mb-3">
          Want to see a more complex streaming scenario with nested Suspense
          boundaries?
        </p>
        <Link
          href="/caching/streaming/nested"
          className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors text-sm"
        >
          View Nested Streaming Example →
        </Link>
      </div>

      {/* DevTools Guide */}
      <DevToolsGuide />

      {/* Streaming Status Indicator */}
      <StreamingIndicator />
    </div>
  );
}
