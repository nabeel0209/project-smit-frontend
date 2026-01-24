'use client';

import React from 'react';

// Skeleton base component
export function SkeletonBase({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-[#F0FDF4] via-[#D1FAE5] to-[#F0FDF4] bg-[length:200%_100%] rounded ${className}`}
      style={{
        animation: 'shimmer 1.5s infinite linear',
        ...style,
      }}
    />
  );
}

// Skeleton for stats cards
export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#D1FAE5]">
      <div className="flex items-center gap-4">
        <SkeletonBase className="w-12 h-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <SkeletonBase className="h-4 w-24" />
          <SkeletonBase className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
}

// Skeleton for charts
export function SkeletonChart() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#D1FAE5]">
      <SkeletonBase className="h-6 w-40 mb-6" />
      <div className="flex items-end gap-2 h-64">
        {[...Array(12)].map((_, i) => (
          <SkeletonBase
            key={i}
            className="flex-1 rounded-t"
            style={{ height: `${Math.random() * 60 + 40}%` }}
          />
        ))}
      </div>
    </div>
  );
}

// Skeleton for course cards
export function SkeletonCourseCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#D1FAE5]">
      <SkeletonBase className="h-40 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <SkeletonBase className="h-5 w-3/4" />
        <div className="flex justify-between">
          <SkeletonBase className="h-4 w-20" />
          <SkeletonBase className="h-4 w-16" />
        </div>
        <div className="flex gap-2 pt-2">
          <SkeletonBase className="h-9 flex-1 rounded-lg" />
          <SkeletonBase className="h-9 flex-1 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// Skeleton for activity items
export function SkeletonActivity() {
  return (
    <div className="flex items-start gap-3 p-3">
      <SkeletonBase className="w-10 h-10 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonBase className="h-4 w-full" />
        <SkeletonBase className="h-3 w-24" />
      </div>
    </div>
  );
}

// Skeleton for engagement bars
export function SkeletonEngagement() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-[#D1FAE5] space-y-4">
      <SkeletonBase className="h-5 w-32" />
      <div className="space-y-3">
        <div className="space-y-1">
          <SkeletonBase className="h-3 w-16" />
          <SkeletonBase className="h-2 w-full rounded-full" />
        </div>
        <div className="space-y-1">
          <SkeletonBase className="h-3 w-12" />
          <SkeletonBase className="h-2 w-full rounded-full" />
        </div>
        <div className="space-y-1">
          <SkeletonBase className="h-3 w-20" />
          <SkeletonBase className="h-2 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
