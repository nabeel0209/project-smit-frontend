"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Users2, BarChart3, LucideIcon } from 'lucide-react';

/**
 * 1. Definitive Interface (Backend Friendly)
 */
export interface WorkStep {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly Icon: LucideIcon;
  readonly badgeText: string;
  readonly actionPath: string;
}

interface HowItWorksProps {
  steps?: WorkStep[];
  onStepClick?: (path: string) => void;
}

const DEFAULT_STEPS: WorkStep[] = [
  {
    id: "01",
    title: "Create & Host",
    description: "Creators upload exclusive courses to our secure LMS and set own pricing.",
    Icon: Code2,
    badgeText: "For Creators",
    actionPath: "/signup?role=creator"
  },
  {
    id: "02",
    title: "Enroll & Learn",
    description: "Users explore top-tier content, enroll instantly, and start their learning journey.",
    Icon: Users2,
    badgeText: "For Students",
    actionPath: "/courses"
  },
  {
    id: "03",
    title: "Track & Earn",
    description: "Creators earn revenue while students track progress and achieve goals.",
    Icon: BarChart3,
    badgeText: "Success",
    actionPath: "/dashboard"
  }
];

export default function HowItWorks({ 
  steps = DEFAULT_STEPS,
  onStepClick = (path) => console.log(`Navigating to: ${path}`)
}: HowItWorksProps): React.JSX.Element {
  
  return (
    <section className="py-24 bg-[#F0FDF4] overflow-hidden selection:bg-[#D1FAE5] selection:text-[#064E3B]">
      <div className="container mx-auto px-6">
        
        {/* Title with Original Animation */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-[#064E3B] text-center mb-20 tracking-tight"
        >
          How it <span className="text-[#10B981]">Works</span>
        </motion.h2>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          
          {/* Connector Lines (Desktop Only) */}
          <div className="hidden md:block absolute top-1/2 left-[20%] w-[60%] border-t-2 border-dashed border-[#D1FAE5] -translate-y-1/2 z-0" />

          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }} // Original delay logic
              viewport={{ once: true }}
              className="relative z-10 group"
            >
              {/* Card Container: Consistency with your emerald theme */}
              <div 
                onClick={() => onStepClick(step.actionPath)}
                className="bg-white p-10 rounded-[2.5rem] border border-[#D1FAE5] shadow-sm flex flex-col items-center text-center transition-all duration-500 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
              >
                
                {/* Step ID Bubble */}
                <div className="absolute -top-5 bg-[#064E3B] text-white px-5 py-1.5 rounded-full text-sm font-bold shadow-md">
                  {step.id}
                </div>

                {/* Icon Box */}
                <div className="w-16 h-16 bg-[#F0FDF4] rounded-2xl flex items-center justify-center mb-8 text-[#10B981] border border-[#D1FAE5] group-hover:bg-[#10B981] group-hover:text-white transition-colors duration-300">
                  <step.Icon size={32} />
                </div>

                <h3 className="text-2xl font-bold text-[#064E3B] mb-4">
                  {step.title}
                </h3>
                
                <p className="text-[#64748B] font-medium leading-relaxed mb-8 h-20">
                  {step.description}
                </p>

                {/* Badge */}
                <span className="bg-[#10B981] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-emerald-100/50">
                  {step.badgeText}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}