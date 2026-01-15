"use client";

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CloudUpload, BookOpen, CreditCard, ShieldCheck, LucideIcon } from 'lucide-react';

/**
 * 1. Interface Definition
 * Readonly keywords ensure the data structure remains consistent.
 */
export interface LearnerFeature {
  readonly id: string | number;
  readonly title: string;
  readonly description: string;
  readonly Icon: LucideIcon;
  readonly path: string;
}

/**
 * 2. Component Props Interface
 * Backend developer can easily pass dynamic data and click handlers.
 */
interface ForLearnersProps {
  features?: LearnerFeature[];
  onFeatureClick?: (path: string) => void;
}

const DEFAULT_FEATURES: LearnerFeature[] = [
  { id: "dash-01", title: "Dashboard", description: "Monitor your personalized learning journey.", Icon: CloudUpload, path: "/dashboard" },
  { id: "resume-02", title: "Resume Anytime", description: "Pick up exactly where you left off safely.", Icon: BookOpen, path: "/resume" },
  { id: "verify-03", title: "Verified Creators", description: "Learn from top-tier trusted experts.", Icon: CreditCard, path: "/creators" },
  { id: "secure-04", title: "Secure Access", description: "Your content is protected with encryption.", Icon: ShieldCheck, path: "/security" }
];

export default function ForLearners({ 
  features = DEFAULT_FEATURES,
  onFeatureClick = (path) => console.log(`Navigating to: ${path}`)
}: ForLearnersProps): React.JSX.Element {
  
  // 3D Perspective Logic (Unchanged as requested)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-25deg", "25deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="py-24 bg-white overflow-hidden selection:bg-[#D1FAE5] selection:text-[#064E3B]">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-black text-[#064E3B]">
            For Learners
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE: Interactive Tablet (Graphic Section) */}
          <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative flex justify-center lg:justify-start cursor-pointer group"
            style={{ perspective: "1200px" }}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-[320px] md:w-[480px] bg-[#064E3B] p-3 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(6,78,59,0.3)]"
            >
              <div className="bg-white rounded-[2.5rem] overflow-hidden aspect-[1.4/1] relative p-8 border-4 border-[#064E3B]">
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-3">
                     <div className="h-4 w-20 bg-[#F0FDF4] rounded-full" />
                     <div className="h-2 w-32 bg-slate-100 rounded-full" />
                  </div>
                  <div className="w-12 h-12 bg-[#10B981] rounded-2xl flex items-center justify-center text-white shadow-lg">
                     <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                  </div>
                </div>
                <div className="mt-10 p-6 bg-[#F0FDF4] rounded-3xl border border-[#D1FAE5]">
                  <div className="h-2 w-full bg-white rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "70%" }} className="h-full bg-[#10B981]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Feature List (Mapping Logic) */}
          <div className="flex flex-col gap-5">
            {features.map((feature) => (
              <article 
                key={feature.id} 
                onClick={() => onFeatureClick(feature.path)}
                className="group flex items-center p-6 bg-white rounded-[2rem] border border-[#D1FAE5] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="w-14 h-14 bg-white border border-[#F0FDF4] text-[#10B981] rounded-2xl flex items-center justify-center mr-6 group-hover:bg-[#10B981] group-hover:text-white transition-all">
                  <feature.Icon size={26} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#064E3B]">{feature.title}</h3>
                  <p className="text-[#64748B] text-sm font-medium leading-relaxed">{feature.description}</p>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}