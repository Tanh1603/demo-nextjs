interface LoadingSkeletonProps {
  text?: string;
}

export function LoadingSkeleton({ text = "Loading..." }: LoadingSkeletonProps) {
  return (
    <div className="animate-pulse">
      <div className="flex items-center space-x-2 mb-3">
        <div className="w-4 h-4 bg-gray-300 rounded-full animate-bounce"></div>
        <div
          className="w-4 h-4 bg-gray-300 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-4 h-4 bg-gray-300 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <span className="text-gray-500 text-sm">{text}</span>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  );
}
