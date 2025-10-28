// Simulate async data fetching with delay
async function fetchDelayedData(delay: number) {
  await new Promise((resolve) => setTimeout(resolve, delay));
  return {
    message: `Data loaded after ${delay}ms delay`,
    timestamp: new Date().toLocaleTimeString(),
    randomData: Math.floor(Math.random() * 1000),
  };
}

interface DelayedContentProps {
  delay: number;
}

export async function DelayedContent({ delay }: DelayedContentProps) {
  console.log(`🟡 DelayedContent: Starting fetch with ${delay}ms delay`);
  const data = await fetchDelayedData(delay);
  console.log(`✅ DelayedContent: Data loaded after ${delay}ms delay`);

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
        <span className="text-yellow-700 font-semibold">
          Medium Priority Data Loaded!
        </span>
      </div>
      <p className="text-gray-700">{data.message}</p>
      <div className="text-sm text-gray-600 space-y-1">
        <p>
          Loaded at:{" "}
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">
            {data.timestamp}
          </span>
        </p>
        <p>
          Random ID:{" "}
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">
            {data.randomData}
          </span>
        </p>
      </div>
    </div>
  );
}
