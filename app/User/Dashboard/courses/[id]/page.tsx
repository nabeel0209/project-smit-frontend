"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Play,
  CircleCheckBig,
  Clock,
  BookOpen,
  Star,
  User,
  Download,
  FileText,
  Award,
  MessageSquare,
  Globe,
  StickyNote,
} from "lucide-react";

const DUMMY_COURSES = [
  {
    id: 1,
    name: "React Basics",
    progress: 45,
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    instructor: "Abdullah Khan",
    instructorAvatar: "https://i.pravatar.cc/64?img=12",
    instructorBio:
      "Senior frontend engineer with 8+ years building production React apps.",
    instructorCourses: 6,
    instructorStudents: "24.5k",
    duration: "12h 30m",
    lessons: 24,
    rating: 4.8,
    language: "English",
    lastAccessed: "2 days ago",
    description:
      "Learn the fundamentals of React including components, props, state, and hooks. This course is designed for beginners who want to build modern web applications.",
    modules: [
      {
        id: 1,
        title: "Introduction to React",
        duration: "45m",
        completed: true,
      },
      { id: 2, title: "JSX and Elements", duration: "1h 20m", completed: true },
      {
        id: 3,
        title: "Components and Props",
        duration: "1h 10m",
        completed: true,
      },
      {
        id: 4,
        title: "State and Lifecycle",
        duration: "2h 15m",
        completed: false,
      },
      { id: 5, title: "Handling Events", duration: "1h 30m", completed: false },
    ],
    resources: [
      { name: "Course slides.pdf", size: "2.4 MB" },
      { name: "Starter project.zip", size: "890 KB" },
      { name: "Cheat sheet.pdf", size: "310 KB" },
    ],
  },
  {
    id: 2,
    name: "Next.js Mastery",
    progress: 100,
    image:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&auto=format&fit=crop&q=60",
    instructor: "Abdullah Khan",
    instructorAvatar: "https://i.pravatar.cc/64?img=12",
    instructorBio:
      "Senior frontend engineer with 8+ years building production React apps.",
    instructorCourses: 6,
    instructorStudents: "24.5k",
    duration: "15h 45m",
    lessons: 32,
    rating: 4.9,
    language: "English",
    lastAccessed: "Completed",
    description:
      "Master Next.js with the latest App Router features. Learn about SSR, Static Generation, API Routes, and more.",
    modules: [
      {
        id: 1,
        title: "Getting Started with Next.js",
        duration: "1h",
        completed: true,
      },
      { id: 2, title: "Routing & Navigation", duration: "2h", completed: true },
      {
        id: 3,
        title: "Server Components vs Client Components",
        duration: "2h 30m",
        completed: true,
      },
      {
        id: 4,
        title: "Data Fetching & Caching",
        duration: "3h",
        completed: true,
      },
    ],
    resources: [
      { name: "Project templates.zip", size: "1.8 MB" },
      { name: "Deployment guide.pdf", size: "520 KB" },
    ],
  },
  {
    id: 3,
    name: "UI/UX Design",
    progress: 30,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60",
    instructor: "Abdullah Khan",
    instructorAvatar: "https://i.pravatar.cc/64?img=12",
    instructorBio:
      "Senior frontend engineer with 8+ years building production React apps.",
    instructorCourses: 6,
    instructorStudents: "24.5k",
    duration: "10h 20m",
    lessons: 18,
    rating: 4.7,
    language: "English",
    lastAccessed: "1 week ago",
    description:
      "A comprehensive guide to modern UI/UX design. Learn Figma, color theory, typography, and user-centered design principles.",
    modules: [
      {
        id: 1,
        title: "Design Principles",
        duration: "1h 30m",
        completed: true,
      },
      {
        id: 2,
        title: "Introduction to Figma",
        duration: "2h",
        completed: true,
      },
      {
        id: 3,
        title: "Wireframing & Prototyping",
        duration: "3h",
        completed: false,
      },
    ],
    resources: [{ name: "Figma starter file.fig", size: "4.1 MB" }],
  },
];

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState("");

  const courseId = parseInt(params.id as string);
  const course =
    DUMMY_COURSES.find((c) => c.id === courseId) || DUMMY_COURSES[0];
  const nextModule = course.modules.find((m) => !m.completed);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-10 pb-10 animate-pulse">
        <div className="h-5 w-40 bg-surface rounded-full" />
        <div className="bg-white border border-border-soft rounded-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 aspect-video bg-surface" />
            <div className="lg:w-1/2 p-8 space-y-4">
              <div className="h-4 w-32 bg-surface rounded-full" />
              <div className="h-8 w-3/4 bg-surface rounded-full" />
              <div className="h-4 w-full bg-surface rounded-full" />
              <div className="h-10 w-full bg-surface rounded-xl mt-6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors text-sm font-medium"
      >
        <ChevronLeft size={18} />
        Back to dashboard
      </button>

      {/* Hero */}
      <div className="bg-white border border-border-soft rounded-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 aspect-video lg:aspect-auto">
            <img
              src={course.image}
              alt={course.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 bg-primary-soft text-primary text-xs font-medium rounded-md uppercase tracking-wide">
                Enrolled
              </span>
              <span className="inline-flex items-center gap-1 text-amber-500 text-sm">
                <Star size={14} className="fill-amber-400" />
                <span className="font-semibold text-text">{course.rating}</span>
              </span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-text mb-4">
              {course.name}
            </h1>

            <div className="flex flex-wrap gap-5 mb-7 text-text-muted text-sm">
              <span className="inline-flex items-center gap-2">
                <User size={16} className="text-primary" />
                By{" "}
                <span className="text-text font-medium">
                  {course.instructor}
                </span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock size={16} className="text-primary" />
                {course.duration} total
              </span>
              <span className="inline-flex items-center gap-2">
                <BookOpen size={16} className="text-primary" />
                {course.lessons} lessons
              </span>
              <span className="inline-flex items-center gap-2">
                <Globe size={16} className="text-primary" />
                {course.language}
              </span>
            </div>

            <div className="space-y-2.5 mb-7">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-text">
                  Course progress
                </span>
                <span className="text-xl font-bold text-primary">
                  {course.progress}%
                </span>
              </div>
              <div className="h-2 bg-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-700 ease-out"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="text-xs text-text-muted">
                Last accessed {course.lastAccessed}
              </p>
            </div>

            <button className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors">
              <Play size={17} fill="currentColor" />
              {course.progress === 100 ? "Review course" : "Continue learning"}
            </button>
          </div>
        </div>
      </div>

      {/* Up next banner */}
      {nextModule && (
        <div className="bg-primary-soft border border-primary/20 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center text-white flex-shrink-0">
            <Play size={18} fill="currentColor" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-primary font-medium uppercase tracking-wide">
              Up next
            </p>
            <p className="text-sm font-semibold text-text truncate">
              {nextModule.title}
            </p>
          </div>
          <span className="text-xs text-text-muted flex-shrink-0">
            {nextModule.duration}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-7 rounded-2xl border border-border-soft">
            <h2 className="text-lg font-bold text-text mb-3">
              About this course
            </h2>
            <p className="text-text-muted leading-relaxed">
              {course.description}
            </p>
          </section>

          <section className="bg-white p-7 rounded-2xl border border-border-soft">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-text">Course content</h2>
              <span className="text-sm text-text-muted">
                {course.modules.length} modules
              </span>
            </div>

            <div className="space-y-2.5">
              {course.modules.map((module, idx) => (
                <div
                  key={module.id}
                  className={`flex items-center gap-4 p-3.5 rounded-xl border transition-colors ${
                    module.completed
                      ? "bg-primary-soft/50 border-primary/20"
                      : "bg-surface border-border-soft"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold ${
                      module.completed
                        ? "bg-primary text-white"
                        : "bg-white border border-border-soft text-text-muted"
                    }`}
                  >
                    {module.completed ? <CircleCheckBig size={18} /> : idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-text truncate text-sm">
                      {module.title}
                    </h4>
                    <p className="text-xs text-text-muted mt-0.5">
                      {module.duration}
                    </p>
                  </div>
                  {!module.completed && (
                    <button className="p-2 text-primary hover:bg-white rounded-lg transition-colors flex-shrink-0">
                      <Play size={16} fill="currentColor" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Notes */}
          <section className="bg-white p-7 rounded-2xl border border-border-soft">
            <div className="flex items-center gap-2 mb-4">
              <StickyNote size={18} className="text-primary" />
              <h2 className="text-lg font-bold text-text">My notes</h2>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Jot down anything you want to remember from this course..."
              rows={4}
              className="w-full bg-surface border border-border-soft rounded-xl p-4 text-sm text-text placeholder:text-text-muted outline-none focus:border-primary transition-colors resize-none"
            />
            <button className="mt-3 bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors">
              Save notes
            </button>
          </section>

          {/* Discussion preview */}
          <section className="bg-white p-7 rounded-2xl border border-border-soft">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <MessageSquare size={18} className="text-primary" />
                <h2 className="text-lg font-bold text-text">Discussion</h2>
              </div>
              <button className="text-primary text-sm font-medium hover:underline">
                View all
              </button>
            </div>
            <div className="space-y-4">
              {[
                {
                  name: "Fatima Ali",
                  avatar: "https://i.pravatar.cc/64?img=25",
                  question:
                    "Does anyone know why useEffect runs twice in dev mode?",
                },
                {
                  name: "Omar Raza",
                  avatar: "https://i.pravatar.cc/64?img=51",
                  question: "Great explanation on props drilling in module 3!",
                },
              ].map((post) => (
                <div key={post.name} className="flex items-start gap-3">
                  <img
                    src={post.avatar}
                    alt={post.name}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm font-medium text-text">{post.name}</p>
                    <p className="text-sm text-text-muted mt-0.5">
                      {post.question}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Instructor card */}
          <section className="bg-white p-6 rounded-2xl border border-border-soft">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wide mb-4">
              Instructor
            </h3>
            <div className="flex items-center gap-3 mb-3">
              <img
                src={course.instructorAvatar}
                alt={course.instructor}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-text">{course.instructor}</p>
                <p className="text-xs text-text-muted">
                  {course.instructorCourses} courses ·{" "}
                  {course.instructorStudents} students
                </p>
              </div>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              {course.instructorBio}
            </p>
          </section>

          {/* Certificate card */}
          <section className="bg-surface p-6 rounded-2xl border border-border-soft">
            <div className="flex items-center gap-2 mb-3">
              <Award size={18} className="text-primary" />
              <h3 className="font-semibold text-text">Certificate</h3>
            </div>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              {course.progress === 100
                ? "You've completed this course. Your certificate is ready to download."
                : `Complete the remaining ${100 - course.progress}% to unlock your certificate.`}
            </p>
            <button
              disabled={course.progress < 100}
              className="w-full bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white py-2.5 rounded-full text-sm font-semibold transition-colors"
            >
              {course.progress === 100 ? "Download certificate" : "Locked"}
            </button>
          </section>

          {/* Resources */}
          <section className="bg-white p-6 rounded-2xl border border-border-soft">
            <div className="flex items-center gap-2 mb-4">
              <FileText size={18} className="text-primary" />
              <h3 className="font-semibold text-text">Resources</h3>
            </div>
            <div className="space-y-1">
              {course.resources.map((resource) => (
                <button
                  key={resource.name}
                  className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface transition-colors text-left"
                >
                  <Download
                    size={15}
                    className="text-text-muted flex-shrink-0"
                  />
                  <span className="flex-1 min-w-0 text-sm text-text truncate">
                    {resource.name}
                  </span>
                  <span className="text-xs text-text-muted flex-shrink-0">
                    {resource.size}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
