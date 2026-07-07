// app/User/Dashboard/courses/page.tsx
"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import CourseCard from "../components/CourseCard";
import { CourseSkeleton } from "../components/SkeletonLoader";
import { useEffect } from "react";

const DUMMY_COURSES = [
  {
    id: 1,
    name: "React Basics",
    progress: 45,
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Next.js Mastery",
    progress: 100,
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "UI/UX Design",
    progress: 30,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    name: "Advanced TypeScript",
    progress: 10,
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    name: "Tailwind CSS Tips",
    progress: 85,
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    name: "Node.js Backend",
    progress: 0,
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=60",
  },
];

type FilterType = "all" | "in-progress" | "completed";

export default function MyCoursesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filtered = DUMMY_COURSES.filter((course) => {
    const matchesSearch = course.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && course.progress === 100) ||
      (filter === "in-progress" &&
        course.progress > 0 &&
        course.progress < 100);
    return matchesSearch && matchesFilter;
  });

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "in-progress", label: "In progress" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">My courses</h1>
          <p className="text-text-muted mt-1">
            {DUMMY_COURSES.length} courses in your library.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
            size={18}
          />
          <input
            type="text"
            placeholder="Search your courses..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-border-soft rounded-xl outline-none focus:border-primary transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              filter === f.key
                ? "bg-primary text-white border-primary"
                : "bg-white text-text-muted border-border-soft hover:border-primary"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {loading ? (
          Array(6)
            .fill(0)
            .map((_, i) => <CourseSkeleton key={i} />)
        ) : filtered.length > 0 ? (
          filtered.map((course) => <CourseCard key={course.id} {...course} />)
        ) : (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-dashed border-border-soft">
            <div className="w-14 h-14 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-text-muted" size={26} />
            </div>
            <h3 className="text-base font-semibold text-text">
              No courses found
            </h3>
            <p className="text-text-muted text-sm mt-1">
              Try adjusting your search or filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
