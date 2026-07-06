// app/User/Dashboard/components/CourseCard.tsx
"use client";

import Link from "next/link";
import { Star, BookOpen, Calendar } from "lucide-react";

export interface Course {
  id: number | string;
  title: string;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  category?: string;
  instructor?: string;
  instructorAvatar?: string;
  rating?: number;
  reviewCount?: number;
  isBestseller?: boolean;
  lessonCount?: number;
  postedDate?: string;
}

interface CourseCardProps {
  course: Course;
  href: string;
}

export default function CourseCard({ course, href }: CourseCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white border border-border-soft rounded-2xl overflow-hidden hover:border-primary transition-colors duration-200 h-full flex flex-col">
        {/* Wide thumbnail */}
        <div className="relative">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full aspect-[21/9] object-cover"
          />
          {course.isBestseller && (
            <span className="absolute top-3 left-3 bg-amber-400 text-amber-950 text-[11px] font-semibold px-2.5 py-1 rounded-md">
              Bestseller
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {course.category && (
            <span className="text-[11px] font-medium text-primary uppercase tracking-wide mb-1.5">
              {course.category}
            </span>
          )}

          <h3 className="font-semibold text-text text-lg leading-snug line-clamp-2">
            {course.title}
          </h3>

          {/* Instructor row */}
          {course.instructor && (
            <div className="flex items-center gap-2 mt-3">
              {course.instructorAvatar && (
                <img
                  src={course.instructorAvatar}
                  alt={course.instructor}
                  className="w-6 h-6 rounded-full object-cover"
                />
              )}
              <span className="text-sm text-text-muted">
                {course.instructor}
              </span>
            </div>
          )}

          {/* Rating */}
          {course.rating !== undefined && (
            <div className="flex items-center gap-1.5 mt-3 text-sm">
              <span className="font-semibold text-text">
                {course.rating.toFixed(1)}
              </span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.round(course.rating!)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-border-soft text-border-soft"
                    }
                  />
                ))}
              </div>
              {course.reviewCount !== undefined && (
                <span className="text-text-muted">
                  ({course.reviewCount.toLocaleString()})
                </span>
              )}
            </div>
          )}

          {/* Lessons + date meta row */}
          <div className="flex items-center gap-4 mt-3 text-xs text-text-muted">
            {course.lessonCount !== undefined && (
              <span className="inline-flex items-center gap-1.5">
                <BookOpen size={13} />
                {course.lessonCount} lessons
              </span>
            )}
            {course.postedDate && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={13} />
                {course.postedDate}
              </span>
            )}
          </div>

          {/* Price row */}
          <div className="mt-auto pt-4 flex items-center gap-3 border-t border-border-soft/70 mt-5">
            <span className="text-xl font-bold text-text">${course.price}</span>
            {course.originalPrice && course.originalPrice > course.price && (
              <span className="text-sm text-text-muted line-through">
                ${course.originalPrice}
              </span>
            )}
            <span className="ml-auto text-sm font-semibold text-primary">
              View course →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
