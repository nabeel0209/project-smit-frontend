'use client';

import React from 'react';
import { Users, Star, Edit2, BarChart2 } from 'lucide-react';
import { SkeletonCourseCard } from './SkeletonLoader';
import type { Course } from './data';

interface CourseCardProps {
  course: Course;
  isLoading?: boolean;
  onEdit?: (courseId: string) => void;
  onAnalytics?: (courseId: string) => void;
}

export default function CourseCard({
  course,
  isLoading = false,
  onEdit,
  onAnalytics,
}: CourseCardProps) {
  if (isLoading) {
    return <SkeletonCourseCard />;
  }

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-[#D1FAE5] hover:border-[#10B981]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/10 hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#064E3B]/80 via-transparent to-transparent" />
        
        {/* Price badge */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#10B981] text-white text-sm font-bold shadow-lg">
          ${course.price}
        </div>

        {/* Rating badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#064E3B] text-sm">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          <span className="font-medium">{course.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-[#064E3B] font-semibold text-lg leading-tight line-clamp-2 group-hover:text-[#10B981] transition-colors duration-200">
          {course.title}
        </h3>

        {/* Stats */}
        <div className="flex items-center gap-4 mt-3 text-[#64748B] text-sm">
          <div className="flex items-center gap-1.5">
            <Users size={16} className="text-[#10B981]" />
            <span>{course.students.toLocaleString()} students</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onEdit?.(course.id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#F0FDF4] text-[#064E3B] border border-[#D1FAE5] hover:bg-[#D1FAE5] transition-all duration-200 font-medium text-sm"
          >
            <Edit2 size={16} />
            Edit
          </button>
          <button
            onClick={() => onAnalytics?.(course.id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#10B981] text-white hover:bg-[#059669] transition-all duration-200 font-medium text-sm shadow-lg shadow-[#10B981]/25"
          >
            <BarChart2 size={16} />
            Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
