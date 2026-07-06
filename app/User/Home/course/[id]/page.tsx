import Link from "next/link";
import {
  Star,
  BookOpen,
  Clock,
  Users,
  CheckCircle2,
  PlayCircle,
  Lock,
} from "lucide-react";
import CourseCard, { Course } from "../../CourseCard";
import ReviewSection from "./ReviewSection";

export default async function CourseDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const course = await res.json();

  const relatedRes = await fetch(
    `https://dummyjson.com/products/category/${course.category}?limit=6`,
  );
  const relatedData = await relatedRes.json();

  const relatedCourses: Course[] = relatedData.products
    .filter((p: any) => p.id !== course.id)
    .slice(0, 3)
    .map((p: any, i: number) => ({
      id: p.id,
      title: p.title,
      thumbnail: p.thumbnail,
      price: Math.round(p.price),
      originalPrice: Math.round(p.price * 1.4),
      category: p.category,
      instructor: "Sarah Mitchell",
      instructorAvatar: `https://i.pravatar.cc/64?img=${(i % 70) + 20}`,
      rating: p.rating,
      reviewCount: Math.floor(p.rating * 3000),
      isBestseller: p.rating > 4.5,
      lessonCount: Math.floor(Math.random() * 30) + 8,
      postedDate: "Jun 2026",
    }));

  const curriculum = [
    {
      title: "Introduction & course overview",
      duration: "8:12",
      locked: false,
    },
    { title: "Setting up your environment", duration: "12:45", locked: false },
    { title: "Core concepts explained", duration: "22:30", locked: true },
    { title: "Building your first project", duration: "35:10", locked: true },
    { title: "Advanced techniques", duration: "28:55", locked: true },
    { title: "Final project & wrap-up", duration: "19:40", locked: true },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-text">
      <div className="max-w-7xl mx-auto p-6 md:p-10 lg:p-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-muted mb-10">
          <Link href="/User" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span className="opacity-40">/</span>
          <span className="text-primary bg-primary-soft px-2.5 py-1 rounded-md uppercase text-[11px] font-medium tracking-wide">
            {course.category}
          </span>
          <span className="opacity-40">/</span>
          <span className="truncate max-w-[200px] text-text">
            {course.title}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
          {/* Left: thumbnail + curriculum */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-10 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-border-soft">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full aspect-video object-cover"
              />
            </div>

            <div className="bg-white border border-border-soft rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-text">Course content</h3>
                <span className="text-xs text-text-muted">
                  {curriculum.length} lessons
                </span>
              </div>

              <div className="space-y-1">
                {curriculum.map((lesson, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-surface transition-colors"
                  >
                    {lesson.locked ? (
                      <Lock
                        size={16}
                        className="text-text-muted flex-shrink-0"
                      />
                    ) : (
                      <PlayCircle
                        size={16}
                        className="text-primary flex-shrink-0"
                      />
                    )}
                    <span
                      className={`flex-1 text-sm truncate ${
                        lesson.locked ? "text-text-muted" : "text-text"
                      }`}
                    >
                      {i + 1}. {lesson.title}
                    </span>
                    <span className="text-xs text-text-muted flex-shrink-0">
                      {lesson.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface border border-border-soft rounded-2xl p-6">
              <h3 className="font-semibold text-text mb-3">Requirements</h3>
              <ul className="space-y-2 text-sm text-text-muted">
                <li>• No prior experience required</li>
                <li>• A computer with internet access</li>
                <li>• Willingness to learn and practice</li>
              </ul>
            </div>
          </div>

          {/* Right: details */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight text-text">
                {course.title}
              </h1>

              <div className="flex items-center gap-2.5">
                <img
                  src="https://i.pravatar.cc/64?img=12"
                  alt="Instructor"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm text-text-muted">
                  by Sarah Mitchell
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted pt-1">
                <span className="inline-flex items-center gap-1.5">
                  <Star size={15} className="fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-text">
                    {course.rating}
                  </span>
                  <span>(2,340 reviews)</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users size={15} />
                  4.8k students
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen size={15} />
                  {curriculum.length} lessons
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={15} />
                  2h 07m
                </span>
              </div>
            </div>

            <div className="p-6 bg-white border border-border-soft rounded-2xl">
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-3xl font-bold text-text">
                  ${course.price}
                </span>
                <span className="text-sm text-text-muted line-through">
                  ${Math.round(course.price * 1.4)}
                </span>
              </div>

              <button className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-full font-semibold transition-colors">
                Enroll now
              </button>

              <p className="text-center text-text-muted text-xs mt-4">
                30-day money-back guarantee
              </p>
            </div>

            <div className="p-6 bg-surface border border-border-soft rounded-2xl">
              <h3 className="font-semibold text-text mb-4">
                What you'll learn
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Core fundamentals and best practices",
                  "Hands-on project walkthroughs",
                  "Real-world techniques used by professionals",
                  "Lifetime access to course updates",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-text-muted"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-primary flex-shrink-0 mt-0.5"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-text">Description</h3>
              <p className="text-text-muted leading-relaxed">
                {course.description}
              </p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-16">
          <ReviewSection courseRating={course.rating} />
        </div>

        {/* Related courses */}
        {relatedCourses.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-text mb-6">
              Related courses
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {relatedCourses.map((rc) => (
                <CourseCard
                  key={rc.id}
                  course={rc}
                  href={`/User/Home/course/${rc.id}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
