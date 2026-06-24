export default function SkeletonCard() {
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow animate-pulse">
      <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}