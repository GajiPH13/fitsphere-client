import SkeletonCard from "@/components/SkeletonCard";

export default function Loading() {
  // আপনি চাইলে লুপ চালিয়ে একাধিক স্কেলেটন দেখাতে পারেন
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}