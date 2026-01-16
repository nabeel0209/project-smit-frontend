"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

/**
 * Standard Props for Backend Integration
 * Follows "clean, modular" instruction
 */
interface HeroProps {
  title?: string;
  highlightText?: string;
  description?: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
  onSecondaryClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({
  title = "Sell your knowledge",
  highlightText = "Learn from creators.",
  description = "A secure LMS for exclusive content with progress tracking and payouts. Build your audience and monetize your expertise effortlessly.",
  primaryBtnText = "Join as Creator",
  secondaryBtnText = "Explore Courses",
  onSecondaryClick = () => console.log("Explore Courses Clicked")
}) => {
  const router = useRouter(); 

  const handleJoinClick = () => {
    router.push("/signUp");
  };

  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-[#FFFFFF] pt-24 lg:pt-16">
      {/* Background Glow Effect - Mint Mist color */}
      <div className="absolute top-0 right-0 -z-10 w-[50%] h-[50%] bg-[#F0FDF4] blur-[120px] rounded-full opacity-60" />
      
      <div className="container mx-auto px-6 md:px-12 py-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        
        {/* TEXT CONTENT: Production-level typography */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left z-10 order-1"
        >
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-[#064E3B] tracking-tight">
            {title} 
            <span className="text-[#10b981] mt-2 block">
              {highlightText}
            </span>
          </h1>
          
          <p className="mt-8 text-base md:text-xl text-[#64748B] max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            {description}
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
            {/* Primary Action: Emerald High color */}
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#059669" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleJoinClick} // Successfully navigates to /signUp
              className="w-full sm:w-auto bg-[#10B981] text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-[#10B981]/30"
            >
              {primaryBtnText}
            </motion.button>
            
            {/* Secondary Action: Transparent with Glass Emerald border */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSecondaryClick}
              className="w-full sm:w-auto border-2 border-[#D1FAE5] text-[#059669] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#F0FDF4] hover:border-[#10B981] transition-all flex items-center justify-center gap-2 group"
            >
              {secondaryBtnText}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </motion.button>
          </div>
        </motion.div>

        {/* GRAPHIC SIDE: Responsive Visuals */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative w-full max-w-[500px] lg:max-w-none order-2"
        >
          <div className="relative w-full aspect-square flex items-center justify-center">
             {/* Main Graphic Card Placeholder */}
             <div className="relative w-[90%] h-[80%] bg-white rounded-[3rem] border border-[#D1FAE5] shadow-2xl overflow-hidden p-6 rotate-3 hover:rotate-0 transition-all duration-700 ease-in-out">
                <div className="w-full h-full bg-gradient-to-tr from-[#F0FDF4] to-white rounded-[2.5rem] flex flex-col items-center justify-center p-8">
                   <div className="w-20 h-20 bg-[#D1FAE5] rounded-3xl mb-6 flex items-center justify-center">
                      <div className="w-12 h-12 bg-[#10B981] rounded-full animate-pulse shadow-inner" />
                   </div>
                   <div className="space-y-4 w-full px-10">
                      <div className="h-2.5 w-full bg-[#D1FAE5] rounded-full" />
                      <div className="h-2.5 w-2/3 bg-[#D1FAE5] rounded-full mx-auto" />
                   </div>
                </div>
             </div>
             
             {/* Floating Revenue Badge */}
             <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
               className="absolute -bottom-4 -left-4 md:-left-8 bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-2xl border border-[#D1FAE5] z-20"
             >
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-[#10B981] rounded-2xl flex items-center justify-center text-white">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                   </div>
                   <div>
                      <p className="text-[10px] uppercase font-black text-[#64748B] tracking-widest">Revenue Status</p>
                      <p className="text-2xl font-black text-[#064E3B]">$2,450.00</p>
                   </div>
                </div>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;