export function FastContent() {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-green-700 font-semibold">
          Content loaded instantly!
        </span>
      </div>
      <p className="text-gray-700">
        This content renders immediately because it doesn&apos;t require any
        async data fetching.
      </p>
      <p className="text-sm text-gray-600">
        This component demonstrates immediate rendering without any delays or
        suspense boundaries.
      </p>
    </div>
  );
}
