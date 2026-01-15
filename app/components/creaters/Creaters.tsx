"use client";

import React from 'react';
import { 
  CloudUpload, 
  TrendingUp, 
  CalendarDays, 
  BarChart4, 
  LucideIcon 
} from 'lucide-react';

/**
 * 1. Interface Definition (Strict Type Safety)
 * Readonly ensures the data remains immutable during runtime.
 */
export interface CreatorFeature {
  readonly id: string | number;
  readonly title: string;
  readonly description: string;
  readonly Icon: LucideIcon;
  readonly path: string;
}

/**
 * 2. Props Interface (Backend Friendly)
 */
interface ForCreatorsProps {
  features?: CreatorFeature[];
  sectionTitle?: string;
  onAction?: (path: string) => void; // For backend routing or analytics logic
}

// Global Static Data (Fallback)
const DEFAULT_FEATURES: CreatorFeature[] = [
  {
    id: "upload-01",
    title: "Upload Courses",
    description: "Easily publish your video lessons & resources.",
    Icon: CloudUpload,
    path: "/dashboard/create"
  },
  {
    id: "track-02",
    title: "Track Earnings",
    description: "Monitor your revenue, engage in real-time.",
    Icon: TrendingUp,
    path: "/dashboard/analytics"
  },
  {
    id: "payout-03",
    title: "Monthly Payouts",
    description: "Receive reliable, secure payments every month.",
    Icon: CalendarDays,
    path: "/dashboard/payouts"
  },
  {
    id: "engage-04",
    title: "Engagement Analytics",
    description: "Understand your audience with detailed insights.",
    Icon: BarChart4,
    path: "/dashboard/insights"
  }
];

const ForCreators: React.FC<ForCreatorsProps> = ({ 
  features = DEFAULT_FEATURES, 
  sectionTitle = "For Creators",
  onAction = (path) => console.log(`Redirecting to: ${path}`)
}) => {
  
  return (
    <section className="py-24 bg-white selection:bg-[#D1FAE5] selection:text-[#064E3B]">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#064E3B] tracking-tight">
            {sectionTitle}
          </h2>
        </div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {features.map((feature: CreatorFeature) => (
            <article 
              key={feature.id}
              onClick={() => onAction(feature.path)}
              className="group bg-white p-10 md:p-14 rounded-[2.5rem] border border-[#D1FAE5] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] flex flex-col items-center text-center transition-all duration-500 hover:shadow-2xl hover:border-[#10B981] hover:-translate-y-2 cursor-pointer"
            >
              {/* Icon Container with Polish */}
              <div className="mb-10 text-[#10B981] group-hover:scale-110 transition-transform duration-300">
                <feature.Icon 
                  size={70} 
                  strokeWidth={1.2} 
                  aria-hidden="true" 
                />
              </div>

              {/* Textual Content */}
              <h3 className="text-2xl md:text-3xl font-bold text-[#064E3B] mb-4">
                {feature.title}
              </h3>

              <p className="text-[#64748B] text-lg leading-relaxed max-w-xs font-medium">
                {feature.description}
              </p>

              {/* Visual Action Indicator */}
              <div className="mt-8 overflow-hidden h-6">
                 <span className="block text-[#10B981] font-bold transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                    Get Started →
                 </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForCreators;