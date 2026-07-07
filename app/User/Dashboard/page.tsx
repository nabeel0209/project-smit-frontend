"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  CircleCheck,
  Clock,
  Award,
  Search,
  ChevronRight,
} from "lucide-react";
import StatCard from "./components/StatCard";
import CourseCard from "./components/CourseCard";
import { StatSkeleton, CourseSkeleton } from "./components/SkeletonLoader";
import StreakStrip from "./components/StreakStrip";
import WeeklyGoal from "./components/WeeklyGoa";
import UpcomingReminders from "./components/UpcomingReminder";

const DUMMY_STATS = [
  { title: "Courses Enrolled", value: 8, icon: BookOpen },
  { title: "Courses Completed", value: 3, icon: CircleCheck },
  { title: "Hours Spent", value: "45h", icon: Clock },
  { title: "Certificates Earned", value: 1, icon: Award },
];

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

const DUMMY_PAYMENTS = [
  {
    id: 1,
    course: "React Basics",
    date: "2023-10-15",
    price: "$49.99",
    status: "Paid",
  },
  {
    id: 2,
    course: "Next.js Mastery",
    date: "2023-11-02",
    price: "$79.99",
    status: "Paid",
  },
  {
    id: 3,
    course: "UI/UX Design",
    date: "2023-12-10",
    price: "$29.99",
    status: "Paid",
  },
];

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredCourses = DUMMY_COURSES.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-10 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Welcome back</h1>
          <p className="text-text-muted mt-1">
            Here's what's happening with your courses today.
          </p>
        </div>

        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
            size={18}
          />
          <input
            type="text"
            placeholder="Search your courses..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-border-soft rounded-xl outline-none focus:border-primary transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Streak Strip */}
      <StreakStrip />

      {/* Stats */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading
            ? Array(4)
                .fill(0)
                .map((_, i) => <StatSkeleton key={i} />)
            : DUMMY_STATS.map((stat, i) => <StatCard key={i} {...stat} />)}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-text flex items-center gap-2">
                My courses
                <span className="text-xs font-medium text-text-muted bg-surface px-2 py-0.5 rounded-full">
                  {filteredCourses.length}
                </span>
              </h2>
              <button className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
                View all <ChevronRight size={15} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {loading ? (
                Array(4)
                  .fill(0)
                  .map((_, i) => <CourseSkeleton key={i} />)
              ) : filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))
              ) : (
                <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-dashed border-border-soft">
                  <div className="w-14 h-14 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-text-muted" size={26} />
                  </div>
                  <h3 className="text-base font-semibold text-text">
                    No courses found
                  </h3>
                  <p className="text-text-muted text-sm mt-1">
                    Try adjusting your search query.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Payments */}
          {/* Payments */}
          <section className="bg-white p-6 rounded-2xl border border-border-soft">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-text">
                Recent transactions
              </h2>
              <Link
                href="/User/Billing"
                className="text-primary text-sm font-medium hover:underline flex items-center gap-1"
              >
                View all <ChevronRight size={15} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border-soft text-xs text-text-muted">
                    <th className="pb-3 font-medium">Course</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft/70">
                  {DUMMY_PAYMENTS.slice(0, 3).map((payment) => (
                    <tr key={payment.id}>
                      <td className="py-3.5 text-sm font-medium text-text">
                        {payment.course}
                      </td>
                      <td className="py-3.5 text-sm text-text-muted">
                        {payment.date}
                      </td>
                      <td className="py-3.5 text-sm font-medium text-text">
                        {payment.price}
                      </td>
                      <td className="py-3.5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-soft text-primary">
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-2xl border border-border-soft">
            <h2 className="text-lg font-bold text-text mb-5">
              Continue watching
            </h2>
            <div className="space-y-3">
              {DUMMY_COURSES.slice(0, 3).map((course) => (
                <Link
                  key={course.id}
                  href={`/User/Dashboard/courses/${course.id}`}
                  className="flex items-center gap-3.5 group p-2 rounded-xl hover:bg-surface transition-colors"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-text truncate group-hover:text-primary transition-colors">
                      {course.name}
                    </h4>
                    <p className="text-xs text-text-muted mt-0.5">
                      {course.progress}% completed
                    </p>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-text-muted flex-shrink-0"
                  />
                </Link>
              ))}
            </div>
          </section>

          <WeeklyGoal />
          <UpcomingReminders />
        </div>
      </div>
    </div>
  );
}
