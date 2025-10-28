import Link from "next/link";
import { Suspense } from "react";
import { LoadingSkeleton } from "../_components/loading-skeleton";

// Simulate different data sources with various delays
async function fetchUserData() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    name: "Sarah Wilson",
    role: "Senior Developer",
    department: "Engineering",
    joinDate: "2022-03-15",
  };
}

async function fetchUserStats() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    projectsCompleted: 47,
    codeReviews: 156,
    commitsThisMonth: 89,
    bugsFixes: 23,
  };
}

async function fetchUserActivity() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return [
    { action: "Merged PR #234", time: "2 hours ago", type: "merge" },
    { action: "Created feature branch", time: "4 hours ago", type: "branch" },
    { action: "Reviewed code changes", time: "6 hours ago", type: "review" },
    { action: "Fixed critical bug", time: "1 day ago", type: "bugfix" },
  ];
}

function UserBasicInfo() {
  return (
    <Suspense fallback={<LoadingSkeleton text="Loading user info..." />}>
      <UserDataComponent />
    </Suspense>
  );
}

function UserStatistics() {
  return (
    <Suspense fallback={<LoadingSkeleton text="Loading statistics..." />}>
      <UserStatsComponent />
    </Suspense>
  );
}

function UserActivityFeed() {
  return (
    <Suspense fallback={<LoadingSkeleton text="Loading activity feed..." />}>
      <UserActivityComponent />
    </Suspense>
  );
}

async function UserDataComponent() {
  const userData = await fetchUserData();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
          {userData.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {userData.name}
          </h3>
          <p className="text-gray-600">{userData.role}</p>
          <p className="text-sm text-gray-500">
            {userData.department} • Joined {userData.joinDate}
          </p>
        </div>
      </div>
    </div>
  );
}

async function UserStatsComponent() {
  const stats = await fetchUserStats();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">
        Performance Stats
      </h4>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {stats.projectsCompleted}
          </div>
          <div className="text-sm text-gray-600">Projects Completed</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {stats.codeReviews}
          </div>
          <div className="text-sm text-gray-600">Code Reviews</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {stats.commitsThisMonth}
          </div>
          <div className="text-sm text-gray-600">Commits This Month</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {stats.bugsFixes}
          </div>
          <div className="text-sm text-gray-600">Bugs Fixed</div>
        </div>
      </div>
    </div>
  );
}

async function UserActivityComponent() {
  const activities = await fetchUserActivity();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "merge":
        return "🔀";
      case "branch":
        return "🌿";
      case "review":
        return "👀";
      case "bugfix":
        return "🐛";
      default:
        return "📝";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Activity
      </h4>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
          >
            <span className="text-xl">{getActivityIcon(activity.type)}</span>
            <div className="flex-1">
              <p className="text-gray-900">{activity.action}</p>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NestedStreamingPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        href="/caching/streaming"
        className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
      >
        ← Back to Streaming Demo
      </Link>

      <h1 className="text-3xl font-bold mb-6">Nested Streaming Example</h1>

      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-indigo-800 mb-4">
          🎯 Nested Suspense Boundaries
        </h2>
        <p className="text-indigo-700 mb-4">
          This example demonstrates nested Suspense boundaries where different
          sections of the page load independently as their data becomes
          available. Each component has its own loading state and streams in at
          different times.
        </p>
      </div>

      <div className="space-y-6">
        {/* User basic info - loads first (1s) */}
        <UserBasicInfo />

        {/* User statistics - loads second (2s) */}
        <UserStatistics />

        {/* User activity - loads last (3s) */}
        <UserActivityFeed />
      </div>

      <div className="mt-8 bg-gray-100 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Loading Sequence:</h3>
        <ol className="text-sm space-y-1">
          <li>
            1. <strong>User Info</strong> - Loads after 1 second
          </li>
          <li>
            2. <strong>Statistics</strong> - Loads after 2 seconds
          </li>
          <li>
            3. <strong>Activity Feed</strong> - Loads after 3 seconds
          </li>
        </ol>
        <p className="text-sm text-gray-600 mt-3">
          Each section streams independently, so users see content progressively
          instead of waiting for all data to load.
        </p>
      </div>
    </div>
  );
}
