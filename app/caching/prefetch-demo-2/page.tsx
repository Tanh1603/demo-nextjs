import Link from "next/link";

export default function PrefetchDemo2Page() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link
        href="/caching"
        className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
      >
        ← Back to Caching Demo
      </Link>

      <h1 className="text-3xl font-bold mb-6">Prefetch Demo 2</h1>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">
          Advanced Prefetching Example
        </h2>
        <p className="text-blue-700">
          This is a placeholder for an advanced prefetching demonstration.
        </p>
      </div>
    </div>
  );
}
