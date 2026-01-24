'use client';

import React from 'react';
import {
  UserPlus,
  CreditCard,
  Star,
  MessageCircle,
} from 'lucide-react';
import { SkeletonActivity } from './SkeletonLoader';
import type { Activity } from './data';

interface ActivityFeedProps {
  activities: Activity[];
  isLoading?: boolean;
}

const iconMap: Record<string, { icon: React.ReactNode; bg: string; color: string }> = {
  enrollment: {
    icon: <UserPlus size={18} />,
    bg: 'bg-[#F0FDF4]',
    color: 'text-[#10B981]',
  },
  payment: {
    icon: <CreditCard size={18} />,
    bg: 'bg-blue-50',
    color: 'text-blue-500',
  },
  review: {
    icon: <Star size={18} />,
    bg: 'bg-yellow-50',
    color: 'text-yellow-500',
  },
  comment: {
    icon: <MessageCircle size={18} />,
    bg: 'bg-[#F0FDF4]',
    color: 'text-[#059669]',
  },
};

export default function ActivityFeed({ activities, isLoading = false }: ActivityFeedProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-[#D1FAE5]">
        <div className="h-6 w-40 bg-[#F0FDF4] rounded mb-4 animate-pulse" />
        <div className="space-y-1">
          {[...Array(5)].map((_, i) => (
            <SkeletonActivity key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#D1FAE5]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-[#064E3B]">Recent Activity</h3>
        <button className="text-sm text-[#10B981] hover:text-[#059669] transition-colors font-medium">
          View All
        </button>
      </div>

      <div className="space-y-1">
        {activities.map((activity) => {
          const typeConfig = iconMap[activity.type] || iconMap.enrollment;
          
          return (
            <div
              key={activity.id}
              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-[#F0FDF4] transition-colors duration-200 cursor-pointer"
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-full ${typeConfig.bg} ${typeConfig.color} flex items-center justify-center flex-shrink-0 border border-[#D1FAE5]`}>
                {typeConfig.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-[#064E3B] text-sm leading-relaxed">
                  {activity.message}
                  {activity.user && (
                    <span className="text-[#10B981] font-medium"> • {activity.user}</span>
                  )}
                </p>
                {activity.course && (
                  <p className="text-[#64748B] text-xs mt-0.5 truncate">{activity.course}</p>
                )}
                <p className="text-[#64748B] text-xs mt-1">{activity.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
