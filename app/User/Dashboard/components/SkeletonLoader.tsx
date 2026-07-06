export function StatSkeleton() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-border-soft animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 bg-surface rounded-xl" />
        <div className="space-y-2">
          <div className="h-3.5 bg-surface rounded-full w-20" />
          <div className="h-5 bg-surface rounded-full w-12" />
        </div>
      </div>
    </div>
  );
}

export function CourseSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-border-soft animate-pulse">
      <div className="aspect-video bg-surface" />
      <div className="p-5 space-y-4">
        <div className="h-4 bg-surface rounded-full w-3/4" />
        <div className="space-y-2">
          <div className="h-2.5 bg-surface rounded-full w-full" />
          <div className="h-1.5 bg-surface rounded-full w-full" />
        </div>
        <div className="h-9 bg-surface rounded-xl w-full" />
      </div>
    </div>
  );
}
