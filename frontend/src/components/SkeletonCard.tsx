export default function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-card p-4 space-y-3 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full skeleton-shimmer" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-24 rounded-full skeleton-shimmer" />
          <div className="h-2 w-16 rounded-full skeleton-shimmer" />
        </div>
        <div className="h-5 w-16 rounded-full skeleton-shimmer" />
      </div>
      <div className="h-40 rounded-xl skeleton-shimmer" />
      <div className="flex gap-2">
        <div className="h-3 w-20 rounded-full skeleton-shimmer" />
        <div className="h-3 w-12 rounded-full skeleton-shimmer" />
      </div>
    </div>
  );
}
