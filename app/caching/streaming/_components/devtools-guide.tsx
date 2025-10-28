export function DevToolsGuide() {
  return (
    <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
        🛠️ DevTools Guide: How to Inspect UI Streaming
      </h3>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg p-4 border border-blue-100">
          <h4 className="font-semibold text-blue-700 mb-3 flex items-center">
            🌐 Network Tab
          </h4>
          <ol className="text-sm space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                1
              </span>
              Press <kbd className="bg-gray-100 px-1 rounded">F12</kbd> →
              Network tab
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                2
              </span>
              Refresh the page and look for the document request
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                3
              </span>
              Notice{" "}
              <code className="bg-gray-100 px-1 rounded text-xs">
                Transfer-Encoding: chunked
              </code>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                4
              </span>
              Watch the size increase as content streams in
            </li>
          </ol>
        </div>

        <div className="bg-white rounded-lg p-4 border border-green-100">
          <h4 className="font-semibold text-green-700 mb-3 flex items-center">
            📊 Console Tab
          </h4>
          <ol className="text-sm space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                1
              </span>
              Open Console tab to see streaming logs
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                2
              </span>
              Look for{" "}
              <code className="bg-gray-100 px-1 rounded text-xs">
                🟡 DelayedContent
              </code>{" "}
              messages
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                3
              </span>
              Watch <code className="bg-gray-100 px-1 rounded text-xs">✅</code>{" "}
              completion messages
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                4
              </span>
              Timestamps show the streaming sequence
            </li>
          </ol>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-lg p-4 border border-purple-100">
        <h4 className="font-semibold text-purple-700 mb-3 flex items-center">
          ⚡ Performance Tab (Advanced)
        </h4>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="text-sm space-y-2 text-gray-700">
            <p className="font-medium">Recording Steps:</p>
            <ol className="space-y-1">
              <li>1. Click Record button (circle icon)</li>
              <li>2. Refresh the streaming page</li>
              <li>3. Wait for all content to load</li>
              <li>4. Stop recording</li>
            </ol>
          </div>
          <div className="text-sm space-y-2 text-gray-700">
            <p className="font-medium">What to Look For:</p>
            <ul className="space-y-1">
              <li>
                • <strong>Paint events</strong> at different times
              </li>
              <li>
                • <strong>Layout shifts</strong> as content appears
              </li>
              <li>
                • <strong>Script evaluation</strong> for each component
              </li>
              <li>
                • <strong>Render timing</strong> spread over time
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded p-3">
        <p className="text-sm text-yellow-800">
          <strong>💡 Pro Tip:</strong> In the Network tab, look for the main
          document request. You&apos;ll see it has a &quot;streaming&quot;
          response type and the content arrives in chunks!
        </p>
      </div>
    </div>
  );
}
