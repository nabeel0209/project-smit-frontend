// app/Creator/Courses/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  MoreVertical,
  Star,
  Users,
  DollarSign,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

interface CreatorCourse {
  id: number;
  name: string;
  thumbnail: string;
  students: number;
  rating: number;
  revenue: string;
  status: "Published" | "Draft" | "Under Review";
  lastUpdated: string;
}

const DUMMY_COURSES: CreatorCourse[] = [
  {
    id: 1,
    name: "React Basics",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop&q=60",
    students: 1240,
    rating: 4.8,
    revenue: "$8,940",
    status: "Published",
    lastUpdated: "2 days ago",
  },
  {
    id: 2,
    name: "Next.js Mastery",
    thumbnail:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&auto=format&fit=crop&q=60",
    students: 890,
    rating: 4.9,
    revenue: "$6,120",
    status: "Published",
    lastUpdated: "5 days ago",
  },
  {
    id: 3,
    name: "Advanced TypeScript",
    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&auto=format&fit=crop&q=60",
    students: 340,
    rating: 4.6,
    revenue: "$2,180",
    status: "Draft",
    lastUpdated: "1 week ago",
  },
  {
    id: 4,
    name: "Tailwind CSS Tips",
    thumbnail:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&auto=format&fit=crop&q=60",
    students: 0,
    rating: 0,
    revenue: "$0",
    status: "Under Review",
    lastUpdated: "Just now",
  },
];

const statusStyles: Record<CreatorCourse["status"], string> = {
  Published: "bg-primary-soft text-primary",
  Draft: "bg-surface text-text-muted",
  "Under Review": "bg-amber-50 text-amber-700",
};

export default function CreatorCoursesPage() {
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const filtered = DUMMY_COURSES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">My courses</h1>
          <p className="text-text-muted mt-1">
            {DUMMY_COURSES.length} courses total.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
              size={16}
            />
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2.5 bg-white border border-border-soft rounded-xl outline-none focus:border-primary transition-colors text-sm w-56"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link href="/Creator/Courses/new">
            <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap">
              <Plus size={16} />
              New course
            </button>
          </Link>
        </div>
      </div>

      {/* Course list */}
      <div className="space-y-3">
        {filtered.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-border-soft rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <img
              src={course.thumbnail}
              alt={course.name}
              className="w-full sm:w-32 aspect-video sm:aspect-[4/3] object-cover rounded-xl flex-shrink-0"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="font-semibold text-text truncate">
                  {course.name}
                </h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-medium flex-shrink-0 ${statusStyles[course.status]}`}
                >
                  {course.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Users size={13} />
                  {course.students.toLocaleString()} students
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  {course.rating > 0 ? course.rating : "No ratings"}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <DollarSign size={13} />
                  {course.revenue}
                </span>
                <span>Updated {course.lastUpdated}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="relative flex items-center gap-2 flex-shrink-0">
              <Link href={`/Creator/Courses/${course.id}/edit`}>
                <button className="p-2 text-text-muted hover:text-primary hover:bg-primary-soft rounded-lg transition-colors">
                  <Edit2 size={16} />
                </button>
              </Link>
              <button
                onClick={() =>
                  setOpenMenuId(openMenuId === course.id ? null : course.id)
                }
                className="p-2 text-text-muted hover:bg-surface rounded-lg transition-colors"
              >
                <MoreVertical size={16} />
              </button>

              {openMenuId === course.id && (
                <div className="absolute right-0 top-10 z-10 w-48 bg-white border border-border-soft rounded-xl overflow-hidden">
                  <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-text hover:bg-surface transition-colors text-left">
                    {course.status === "Published" ? (
                      <>
                        <EyeOff size={15} /> Unpublish
                      </>
                    ) : (
                      <>
                        <Eye size={15} /> Publish
                      </>
                    )}
                  </button>
                  <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left">
                    <Trash2 size={15} /> Delete course
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-border-soft">
            <div className="w-14 h-14 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-text-muted" size={26} />
            </div>
            <h3 className="text-base font-semibold text-text">
              No courses found
            </h3>
            <p className="text-text-muted text-sm mt-1">
              Try a different search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
