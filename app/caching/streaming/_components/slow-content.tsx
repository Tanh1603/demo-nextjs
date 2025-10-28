// Simulate slow async data fetching
async function fetchSlowData() {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  // Simulate fetching some complex data
  const complexData = {
    users: ["Alice", "Bob", "Charlie", "Diana"],
    metrics: {
      totalUsers: 1250,
      activeToday: 89,
      revenue: "$12,450",
    },
    timestamp: new Date().toLocaleTimeString(),
  };

  return complexData;
}

export async function SlowContent() {
  console.log(`🟠 SlowContent: Starting slow data fetch (4000ms)`);
  const data = await fetchSlowData();
  console.log(`✅ SlowContent: Slow data loaded successfully`);

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
        <span className="text-orange-700 font-semibold">
          Low Priority Data Loaded!
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <h5 className="font-semibold text-gray-800 mb-1">Recent Users:</h5>
          <div className="flex flex-wrap gap-2">
            {data.users.map((user, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
              >
                {user}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h5 className="font-semibold text-gray-800 mb-1">Metrics:</h5>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-100 p-2 rounded">
              <div className="font-semibold">{data.metrics.totalUsers}</div>
              <div className="text-gray-600">Total Users</div>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <div className="font-semibold">{data.metrics.activeToday}</div>
              <div className="text-gray-600">Active Today</div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600">
          Loaded at:{" "}
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">
            {data.timestamp}
          </span>
        </p>
      </div>
    </div>
  );
}
