"use client";

import React from 'react';
import { ShieldCheck, Zap, BarChart3, Users, LucideIcon } from 'lucide-react';

/**
 * 1. Industry Standard Interface
 * Readonly types for backend data safety.
 */
export interface FeatureItem {
  readonly id: string | number;
  readonly title: string;
  readonly description: string;
  readonly Icon: LucideIcon;
}

interface FeaturesProps {
  features?: FeatureItem[];
  title?: string;
  subtitle?: string;
  onFeatureClick?: (feature: FeatureItem) => void;
}

const DEFAULT_FEATURES: FeatureItem[] = [
  { id: "feat-1", title: "Secure LMS", description: "Industry-standard security for your exclusive content and data protection.", Icon: ShieldCheck },
  { id: "feat-2", title: "Fast Payouts", description: "Automated and transparent payout systems for all course creators.", Icon: Zap },
  { id: "feat-3", title: "Detailed Analytics", description: "Track student progress and engagement with built-in tracking tools.", Icon: BarChart3 },
  { id: "feat-4", title: "Community Tools", description: "Easy-to-use tools to build and interact with your student audience.", Icon: Users }
];

const Features: React.FC<FeaturesProps> = ({ 
  features = DEFAULT_FEATURES,
  title = "Everything you need to",
  subtitle = "scale your knowledge.",
  onFeatureClick = (feature) => console.log(`Feature clicked: ${feature.title}`)
}) => {
  return (
    <section id="features" className="py-20 md:py-28 bg-[#F0FDF4] selection:bg-[#D1FAE5] selection:text-[#064E3B]">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Dynamic Heading Section - Original Design */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#064E3B] leading-tight">
            {title} <br /> 
            <span className="text-[#10B981]">{subtitle}</span>
          </h2>
          <p className="mt-6 text-[#64748B] text-lg font-medium max-w-xl mx-auto">
            Our platform provides the ultimate tools for modern creators to monetize their skills effectively.
          </p>
        </div>

        {/* Original Card Grid with Industry Handlers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature) => (
            <article 
              key={feature.id}
              onClick={() => onFeatureClick(feature)}
              // Key accessibility features for industry standard
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onFeatureClick(feature)}
              // Back to your Original Designing & Hover Animations
              className="bg-white p-8 rounded-[2.5rem] border border-[#D1FAE5] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group cursor-pointer outline-none focus:ring-2 focus:ring-[#10B981]/20"
            >
              {/* Icon Container - Original Styling */}
              <div className="w-14 h-14 bg-[#F0FDF4] rounded-2xl flex items-center justify-center mb-8 text-[#10B981] group-hover:bg-[#10B981] group-hover:text-white transition-all duration-300 shadow-inner">
                <feature.Icon className="w-7 h-7" strokeWidth={1.5} aria-hidden="true" />
              </div>
              
              <h3 className="text-xl font-bold text-[#064E3B] mb-4">
                {feature.title}
              </h3>
              
              <p className="text-[#64748B] leading-relaxed font-medium">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;