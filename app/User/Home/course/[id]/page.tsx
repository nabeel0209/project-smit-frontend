import Link from "next/link";

export default async function CourseDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const course = await res.json();

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-[#064E3B]">
      <div className="max-w-7xl mx-auto p-6 md:p-12 lg:p-16">
        <nav className="flex items-center gap-3 text-[#64748B] text-sm mb-12 font-semibold">
          <Link href="/User" className="hover:text-[#10B981] transition-all">
            Home
          </Link>
          <span className="opacity-30">/</span>
          <span className="text-[#10B981] bg-[#F0FDF4] px-3 py-1 rounded-lg uppercase tracking-wider text-[10px]">
            {course.category}
          </span>
          <span className="opacity-30">/</span>
          <span className="truncate max-w-50">{course.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          <div className="w-full lg:w-1/2">
            <div className="rounded-[40px] overflow-hidden shadow-2xl shadow-[#10B981]/10 border border-white p-2 bg-white sticky top-24">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-auto rounded-4xl object-cover"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black leading-tight text-[#064E3B]">
                {course.title}
              </h1>
              <p className="text-[#64748B] text-lg font-medium italic">
                By Professional Instructor
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-[#10B981] text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-lg shadow-[#10B981]/20">
                  ⭐ {course.rating}
                </div>
                <span className="text-[#64748B] text-sm font-semibold">
                  4.8k Students Enrolled
                </span>
              </div>
            </div>

            <div className="p-8 bg-white border border-[#D1FAE5] rounded-4xl shadow-sm">
              <div className="flex flex-col mb-6">
                <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.2em] mb-1">
                  Price
                </span>
                <span className="text-5xl font-black text-[#10B981]">
                  ${course.price}
                </span>
              </div>

              <button className="w-full bg-[#10B981] hover:bg-[#059669] text-white py-5 rounded-2xl font-bold text-xl shadow-xl shadow-[#10B981]/30 transition-all active:scale-95">
                Enroll Now
              </button>

              <p className="text-center text-[#64748B] text-xs mt-4 font-medium">
                30-Day Money-Back Guarantee
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#064E3B]">Description</h3>
              <p className="text-[#64748B] text-lg leading-relaxed font-medium">
                {course.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
