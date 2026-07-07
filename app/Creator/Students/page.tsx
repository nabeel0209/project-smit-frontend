// app/Creator/Students/page.tsx
"use client";

import { useState } from "react";
import { Search, Mail, TrendingUp } from "lucide-react";

interface Student {
  id: number;
  name: string;
  avatar: string;
  email: string;
  course: string;
  progress: number;
  enrolledDate: string;
}

const DUMMY_STUDENTS: Student[] = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/64?img=11",
    email: "alex.j@email.com",
    course: "React Basics",
    progress: 78,
    enrolledDate: "Jun 12, 2026",
  },
  {
    id: 2,
    name: "Priya Sharma",
    avatar: "https://i.pravatar.cc/64?img=47",
    email: "priya.s@email.com",
    course: "Next.js Mastery",
    progress: 100,
    enrolledDate: "May 28, 2026",
  },
  {
    id: 3,
    name: "Michael Chen",
    avatar: "https://i.pravatar.cc/64?img=33",
    email: "michael.c@email.com",
    course: "React Basics",
    progress: 34,
    enrolledDate: "Jun 20, 2026",
  },
  {
    id: 4,
    name: "Fatima Ali",
    avatar: "https://i.pravatar.cc/64?img=25",
    email: "fatima.a@email.com",
    course: "Advanced TypeScript",
    progress: 12,
    enrolledDate: "Jul 1, 2026",
  },
  {
    id: 5,
    name: "Omar Raza",
    avatar: "https://i.pravatar.cc/64?img=51",
    email: "omar.r@email.com",
    course: "Next.js Mastery",
    progress: 65,
    enrolledDate: "Jun 5, 2026",
  },
  {
    id: 6,
    name: "Sarah Williams",
    avatar: "https://i.pravatar.cc/64?img=44",
    email: "sarah.w@email.com",
    course: "React Basics",
    progress: 92,
    enrolledDate: "Apr 18, 2026",
  },
];

const COURSE_OPTIONS = [
  "All courses",
  "React Basics",
  "Next.js Mastery",
  "Advanced TypeScript",
];

export default function CreatorStudentsPage() {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All courses");

  const filtered = DUMMY_STUDENTS.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchesCourse =
      courseFilter === "All courses" || s.course === courseFilter;
    return matchesSearch && matchesCourse;
  });

  const avgProgress = Math.round(
    filtered.reduce((sum, s) => sum + s.progress, 0) / (filtered.length || 1),
  );

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-text">Students</h1>
        <p className="text-text-muted mt-1">
          {DUMMY_STUDENTS.length} students enrolled across your courses.
        </p>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-border-soft rounded-2xl p-6">
          <p className="text-sm text-text-muted">Total students</p>
          <p className="text-2xl font-bold text-text mt-1">
            {DUMMY_STUDENTS.length}
          </p>
        </div>
        <div className="bg-white border border-border-soft rounded-2xl p-6">
          <p className="text-sm text-text-muted">Average progress</p>
          <p className="text-2xl font-bold text-text mt-1">{avgProgress}%</p>
        </div>
        <div className="bg-white border border-border-soft rounded-2xl p-6">
          <p className="text-sm text-text-muted">Completed courses</p>
          <p className="text-2xl font-bold text-text mt-1">
            {DUMMY_STUDENTS.filter((s) => s.progress === 100).length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
            size={16}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-border-soft rounded-xl outline-none focus:border-primary transition-colors text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-border-soft rounded-xl outline-none focus:border-primary transition-colors text-sm appearance-none"
        >
          {COURSE_OPTIONS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Student table */}
      <section className="bg-white border border-border-soft rounded-2xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border-soft text-xs text-text-muted">
                <th className="pb-3 font-medium">Student</th>
                <th className="pb-3 font-medium">Course</th>
                <th className="pb-3 font-medium">Progress</th>
                <th className="pb-3 font-medium">Enrolled</th>
                <th className="pb-3 font-medium text-right">Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft/70">
              {filtered.map((student) => (
                <tr key={student.id}>
                  <td className="py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-text">
                        {student.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 text-sm text-text-muted">
                    {student.course}
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2 w-32">
                      <div className="h-1.5 flex-1 bg-surface rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-text-muted flex-shrink-0">
                        {student.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 text-sm text-text-muted">
                    {student.enrolledDate}
                  </td>
                  <td className="py-3.5 text-right">
                    <button className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
                      <Mail size={13} />
                      Email
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <div className="w-14 h-14 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-text-muted" size={26} />
            </div>
            <h3 className="text-base font-semibold text-text">
              No students found
            </h3>
            <p className="text-text-muted text-sm mt-1">
              Try adjusting your search or filter.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
