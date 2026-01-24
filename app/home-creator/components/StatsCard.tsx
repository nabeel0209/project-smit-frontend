'use client';

import React from 'react';
import {
  DollarSign,
  TrendingUp,
  BookOpen,
  Users,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { SkeletonCard } from './SkeletonLoader';

interface StatsCardProps {
  title: string;
  value: string;
  icon: string;
  trend?: string;
  trendUp?: boolean;
  isLoading?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign size={24} />,
  TrendingUp: <TrendingUp size={24} />,
  BookOpen: <BookOpen size={24} />,
  Users: <Users size={24} />,
  Activity: <Activity size={24} />,
};

export default function StatsCard({
  title,
  value,
  icon,
  trend,
  trendUp = true,
  isLoading = false,
}: StatsCardProps) {
  if (isLoading) {
    return <SkeletonCard />;
  }

  return (
    <div className="group w-[252px] relative bg-white rounded-2xl p-6 border border-[#D1FAE5] hover:border-[#10B981]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/10 hover:-translate-y-1">
      {/* Gradient glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-[#10B981] opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
      
      <div className="relative flex items-center gap-4">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-[#F0FDF4] flex items-center justify-center border border-[#D1FAE5] transition-transform duration-300 group-hover:scale-110">
          <span className="text-[#10B981]">
            {iconMap[icon] || <DollarSign size={24} />}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-sm text-[#64748B] font-medium">{title}</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-[#064E3B]">{value}</span>
            {trend && (
              <span className={`flex items-center text-xs font-medium ${trendUp ? 'text-[#10B981]' : 'text-red-500'}`}>
                {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {trend}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
