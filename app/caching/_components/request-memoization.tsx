import { Suspense } from "react";

// Simulate multiple identical requests that should be memoized
async function fetchUserData(id: string) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    {
      next: { revalidate: 60 }, // Cache for 60 seconds
    }
  );
  return response.json();
}

// Component that makes the same request multiple times
async function UserDisplay({ userId }: { userId: string }) {
  // These three requests will be memoized - only one actual fetch will occur
  const user1 = await fetchUserData(userId);
  const user2 = await fetchUserData(userId);
  const user3 = await fetchUserData(userId);

  return (
    <div className="space-y-2">
      <div className="p-3 bg-green-50 border border-green-200 rounded text-sm">
        <p>
          <strong>User 1:</strong> {user1.name} ({user1.email})
        </p>
        <p>
          <strong>User 2:</strong> {user2.name} ({user2.email})
        </p>
        <p>
          <strong>User 3:</strong> {user3.name} ({user3.email})
        </p>
      </div>
      <p className="text-xs text-gray-600">
        All three requests above were memoized - only one actual API call was
        made. Check the Network tab to verify!
      </p>
    </div>
  );
}

export function RequestMemoization() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Request memoization automatically deduplicates identical requests within
        a single render pass.
      </p>

      <Suspense
        fallback={<div className="text-gray-500">Loading user data...</div>}
      >
        <UserDisplay userId="1" />
      </Suspense>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-xs">
        <strong>How it works:</strong> When multiple components make the same
        fetch request during server rendering, Next.js automatically memoizes
        the request so it only executes once.
      </div>
    </div>
  );
}
