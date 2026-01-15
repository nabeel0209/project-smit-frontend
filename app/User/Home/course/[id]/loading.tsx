export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] p-6 md:p-12 lg:p-16 animate-pulse">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-12"></div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left Side: Image Skeleton */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-square bg-gray-200 rounded-[40px]"></div>
          </div>

          {/* Right Side: Content Skeleton */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded-2xl w-full"></div>
              <div className="h-12 bg-gray-200 rounded-2xl w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded-xl w-1/4"></div>
            </div>

            <div className="p-8 bg-white border border-gray-100 rounded-[32px] space-y-4">
              <div className="h-4 bg-gray-100 rounded w-1/6"></div>
              <div className="h-14 bg-gray-200 rounded-2xl w-1/3"></div>
              <div className="h-16 bg-gray-200 rounded-2xl w-full"></div>
            </div>

            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-full"></div>
              <div className="h-4 bg-gray-100 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}