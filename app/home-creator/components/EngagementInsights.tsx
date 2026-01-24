'use client';

import React from 'react';
import { Eye, ThumbsUp, MessageCircle } from 'lucide-react';
import { SkeletonEngagement } from './SkeletonLoader';
import type { EngagementData } from './data';

interface EngagementInsightsProps {
  data: EngagementData[];
  isLoading?: boolean;
}

interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

function ProgressBar({ label, value, max, icon, color, bgColor }: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className={color}>{icon}</span>
          <span className="text-[#64748B]">{label}</span>
        </div>
        <span className="text-[#064E3B] font-medium">
          {value.toLocaleString()}
        </span>
      </div>
      <div className="h-2 bg-[#F0FDF4] rounded-full overflow-hidden border border-[#D1FAE5]">
        <div
          className={`h-full rounded-full transition-all duration-500 ${bgColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function EngagementInsights({ data, isLoading = false }: EngagementInsightsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <SkeletonEngagement key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[#064E3B]">Engagement Insights</h3>
        <button className="text-sm text-[#10B981] hover:text-[#059669] transition-colors font-medium">
          View Details
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((course) => (
          <div
            key={course.courseId}
            className="bg-white rounded-2xl p-5 border border-[#D1FAE5] hover:border-[#10B981]/50 transition-all duration-300"
          >
            <h4 className="text-[#064E3B] font-semibold mb-4 line-clamp-1">
              {course.courseName}
            </h4>

            <div className="space-y-4">
              <ProgressBar
                label="Views"
                value={course.views}
                max={course.maxViews}
                icon={<Eye size={14} />}
                color="text-[#10B981]"
                bgColor="bg-[#10B981]"
              />
              <ProgressBar
                label="Likes"
                value={course.likes}
                max={course.maxLikes}
                icon={<ThumbsUp size={14} />}
                color="text-[#059669]"
                bgColor="bg-[#059669]"
              />
              <ProgressBar
                label="Comments"
                value={course.comments}
                max={course.maxComments}
                icon={<MessageCircle size={14} />}
                color="text-[#064E3B]"
                bgColor="bg-[#064E3B]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
