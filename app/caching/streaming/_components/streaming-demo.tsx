// Simulate fetching multiple data sources with different delays
async function fetchUserProfile() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    name: "John Doe",
    email: "john@example.com",
    avatar: "👤",
  };
}

async function fetchNotifications() {
  await new Promise((resolve) => setTimeout(resolve, 2500));
  return [
    { id: 1, message: "New message from Alice", time: "2m ago" },
    { id: 2, message: "Project update available", time: "5m ago" },
    { id: 3, message: "Weekly report ready", time: "1h ago" },
  ];
}

async function fetchAnalytics() {
  await new Promise((resolve) => setTimeout(resolve, 3500));
  return {
    pageViews: 15420,
    uniqueVisitors: 8234,
    bounceRate: "34.2%",
    avgSessionTime: "4m 32s",
  };
}

export async function StreamingDemo() {
  // These will resolve at different times, demonstrating streaming
  const [userProfile, notifications, analytics] = await Promise.all([
    fetchUserProfile(),
    fetchNotifications(),
    fetchAnalytics(),
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
          <span className="mr-2">{userProfile.avatar}</span>
          User Profile
        </h4>
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {userProfile.name}
          </p>
          <p>
            <strong>Email:</strong> {userProfile.email}
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
          <span className="mr-2">🔔</span>
          Recent Notifications
        </h4>
        <div className="space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex justify-between items-center p-2 bg-gray-50 rounded"
            >
              <span className="text-sm">{notification.message}</span>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
          <span className="mr-2">📊</span>
          Analytics Dashboard
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {analytics.pageViews.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Page Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {analytics.uniqueVisitors.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Unique Visitors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {analytics.bounceRate}
            </div>
            <div className="text-sm text-gray-600">Bounce Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {analytics.avgSessionTime}
            </div>
            <div className="text-sm text-gray-600">Avg Session</div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded p-4">
        <p className="text-green-800 text-sm">
          ✅ All streaming components have loaded! This entire section was
          rendered server-side and streamed to the client as the data became
          available.
        </p>
      </div>
    </div>
  );
}
