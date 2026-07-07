// app/Creator/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Users,
  DollarSign,
  Star,
  ChevronRight,
  Plus,
  TrendingUp,
} from "lucide-react";

const DUMMY_STATS = [
  { title: "Total Courses", value: 6, icon: BookOpen },
  { title: "Total Students", value: "4,821", icon: Users },
  { title: "This Month Earnings", value: "$3,240", icon: DollarSign },
  { title: "Average Rating", value: "4.8", icon: Star },
];

const DUMMY_COURSES = [
  {
    id: 1,
    name: "React Basics",
    students: 1240,
    rating: 4.8,
    revenue: "$8,940",
    status: "Published",
  },
  {
    id: 2,
    name: "Next.js Mastery",
    students: 890,
    rating: 4.9,
    revenue: "$6,120",
    status: "Published",
  },
  {
    id: 3,
    name: "Advanced TypeScript",
    students: 340,
    rating: 4.6,
    revenue: "$2,180",
    status: "Draft",
  },
];

const DUMMY_ACTIVITY = [
  { text: "Alex Johnson enrolled in React Basics", time: "2h ago" },
  { text: "New review on Next.js Mastery (5 stars)", time: "5h ago" },
  { text: "Payout of $890 processed", time: "1d ago" },
  { text: "Priya Sharma completed UI/UX Design", time: "2d ago" },
];

export default function CreatorOverviewPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Creator overview</h1>
          <p className="text-text-muted mt-1">
            Here's how your courses are performing.
          </p>
        </div>
        <Link href="/Creator/Courses/new">
          <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors">
            <Plus size={16} />
            New course
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-border-soft animate-pulse"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-surface rounded-xl" />
                    <div className="space-y-2">
                      <div className="h-3.5 bg-surface rounded-full w-20" />
                      <div className="h-5 bg-surface rounded-full w-12" />
                    </div>
                  </div>
                </div>
              ))
          : DUMMY_STATS.map((stat, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-border-soft"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary-soft">
                    <stat.icon className="text-primary" size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">{stat.title}</p>
                    <h3 className="text-xl font-bold text-text mt-0.5">
                      {stat.value}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: courses table */}
        <div className="lg:col-span-2">
          <section className="bg-white p-6 rounded-2xl border border-border-soft">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-text">Your courses</h2>
              <Link
                href="/Creator/Courses"
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
                    <th className="pb-3 font-medium">Students</th>
                    <th className="pb-3 font-medium">Rating</th>
                    <th className="pb-3 font-medium">Revenue</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft/70">
                  {DUMMY_COURSES.map((course) => (
                    <tr key={course.id}>
                      <td className="py-3.5 text-sm font-medium text-text">
                        {course.name}
                      </td>
                      <td className="py-3.5 text-sm text-text-muted">
                        {course.students}
                      </td>
                      <td className="py-3.5 text-sm text-text-muted inline-flex items-center gap-1">
                        <Star
                          size={13}
                          className="fill-amber-400 text-amber-400"
                        />
                        {course.rating}
                      </td>
                      <td className="py-3.5 text-sm font-medium text-text">
                        {course.revenue}
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            course.status === "Published"
                              ? "bg-primary-soft text-primary"
                              : "bg-surface text-text-muted"
                          }`}
                        >
                          {course.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right: activity feed */}
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-2xl border border-border-soft">
            <h2 className="text-lg font-bold text-text mb-5">
              Recent activity
            </h2>
            <div className="space-y-4">
              {DUMMY_ACTIVITY.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-text">{activity.text}</p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-primary-soft p-6 rounded-2xl border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={18} className="text-primary" />
              <h2 className="text-sm font-bold text-text">Growth this month</h2>
            </div>
            <p className="text-2xl font-bold text-text">+18.4%</p>
            <p className="text-xs text-text-muted mt-1">
              Compared to last month
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
