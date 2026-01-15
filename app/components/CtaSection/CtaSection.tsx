"use client";

import React from 'react';
import { motion, Transition } from 'framer-motion';

interface CTASectionProps {
  readonly title?: string;
  readonly creatorBtnText?: string;
  readonly studentBtnText?: string;
  readonly onJoinCreator?: () => void;
  readonly onExploreCourses?: () => void;
}


const springConfig: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 25
};

export default function CTASection({
  title = "Start building or learning today",
  creatorBtnText = "Join as Creator",
  studentBtnText = "Explore Courses",
  onJoinCreator = () => console.warn("No JoinCreator handler provided"),
  onExploreCourses = () => console.warn("No ExploreCourses handler provided")
}: CTASectionProps): React.JSX.Element {
  
  return (
    <section className="py-24 bg-white selection:bg-[#F0FDF4] selection:text-[#064E3B]">
      <div className="container mx-auto px-6 md:px-12">
        
 
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#10B981] to-[#064E3B] py-20 px-8 md:py-28 md:px-20 text-center shadow-[0_20px_50px_rgba(6,78,59,0.3)] border border-emerald-200/20">
          
          <div className="absolute inset-0 bg-black/5 pointer-events-none opacity-20" />

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative z-10 text-4xl md:text-6xl font-black text-white mb-14 max-w-4xl mx-auto leading-[1.1] tracking-tight"
          >
            {title}
          </motion.h2>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            
            {/* Primary Button */}
            <motion.button 
              type="button"
              onClick={onJoinCreator}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "#032d22",
                y: -4
              }}
              whileTap={{ scale: 0.95 }}
              transition={springConfig}
              className="w-full sm:w-auto min-w-[220px] px-10 py-5 bg-[#064E3B] text-white text-lg font-extrabold rounded-2xl shadow-xl cursor-pointer outline-none focus:ring-4 focus:ring-white/30"
            >
              {creatorBtnText}
            </motion.button>

            {/* Secondary Button */}
            <motion.button 
              type="button"
              onClick={onExploreCourses}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                y: -4
              }}
              whileTap={{ scale: 0.95 }}
              transition={springConfig}
              className="w-full sm:w-auto min-w-[220px] px-10 py-5 bg-transparent border-2 border-white text-white text-lg font-extrabold rounded-2xl cursor-pointer outline-none focus:ring-4 focus:ring-white/20"
            >
              {studentBtnText}
            </motion.button>

          </div>
          
          {/* Ambient Glows */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-400/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-900/30 rounded-full blur-[80px] pointer-events-none" />
        </div>

      </div>
    </section>
  );
}