

export function StatSkeleton() {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-pulse">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-20" />
                    <div className="h-6 bg-gray-200 rounded w-12" />
                </div>
            </div>
        </div>
    );
}

export function CourseSkeleton() {
    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse">
            <div className="aspect-video bg-gray-200" />
            <div className="p-5 space-y-4">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-2 bg-gray-200 rounded w-full" />
                </div>
                <div className="h-10 bg-gray-200 rounded w-full" />
            </div>
        </div>
    );
}
