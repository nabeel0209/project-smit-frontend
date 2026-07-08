"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../navbar/Navbar";
import { useRouter } from "next/navigation";

interface HeroProps {
  title?: string;
  highlightText?: string;
  description?: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
}

const productStates = [
  {
    label: "Course Progress",
    value: "78% Complete",
    accent: "78%",
    bars: [70, 45, 90, 30],
  },
  {
    label: "Payout Received",
    value: "$2,450.00",
    accent: "$",
    bars: [90, 60, 40, 80],
  },
  {
    label: "New Enrollment",
    value: "Alex joined 'React Mastery'",
    accent: "1",
    bars: [50, 85, 65, 40],
  },
];

const Hero: React.FC<HeroProps> = ({
  title = "Sell your knowledge,",
  highlightText = "learn from creators.",
  description = "One place to build, sell, and access exclusive content. Fully trackable, fully monetizable, zero hassle.",
  primaryBtnText = "Become a Creator",
  secondaryBtnText = "Explore Courses",
}) => {
  const router = useRouter();
  const [activeState, setActiveState] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveState((prev) => (prev + 1) % productStates.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const current = productStates[activeState];

  return (
    <section className="relative w-full bg-background pt-28 lg:pt-36 pb-20 overflow-hidden">
      <Navbar />

      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left: text content */}
        <div className="flex-1 text-center lg:text-left relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.15] text-text tracking-tight"
          >
            {title} <span className="text-primary">{highlightText}</span>
          </motion.h1>

          <p className="mt-6 text-base md:text-lg text-text-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {description}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              onClick={() => router.push("/signUp?role=creator")}
              className="w-full sm:w-auto bg-primary text-black px-7 py-3 rounded-full font-semibold text-sm hover:bg-primary-hover transition-all inline-flex items-center justify-center gap-2"
            >
              {primaryBtnText}
              <ArrowIcon />
            </button>

            <button
              onClick={() => router.push("/signUp")}
              className="w-full sm:w-auto bg-black text-white border border-border-soft px-7 py-3 rounded-full font-semibold text-sm hover:border-primary transition-all"
            >
              {secondaryBtnText}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-text-muted">
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon /> No credit card required
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon /> Set up in minutes
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon /> Cancel anytime
            </span>
          </div>
        </div>

        {/* Right: browser-chrome mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 w-full relative z-10"
        >
          <div className="bg-white border border-border-soft rounded-3xl shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border-soft bg-surface">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-text-muted">
                yourlms.app/dashboard
              </span>
            </div>

            <div className="p-6 flex flex-col gap-5">
              <div className="bg-surface rounded-2xl p-5 min-h-[150px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeState}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="w-10 h-10 bg-primary-soft rounded-xl flex items-center justify-center text-primary font-bold text-sm mb-3">
                      {current.accent}
                    </div>
                    <p className="text-xs text-text-muted">{current.label}</p>
                    <p className="text-lg font-semibold text-text mt-1">
                      {current.value}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-end gap-2 h-14 mt-4">
                  {current.bars.map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-primary rounded-md"
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2.5">
                {["React Mastery", "UI Design Basics", "Growth Marketing"].map(
                  (course, i) => (
                    <div
                      key={course}
                      className="flex items-center gap-3 bg-surface rounded-xl px-4 py-2.5"
                    >
                      <div className="w-7 h-7 rounded-lg bg-primary-soft flex items-center justify-center text-primary text-xs font-semibold">
                        {i + 1}
                      </div>
                      <p className="text-sm text-text font-medium truncate">
                        {course}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="flex gap-1.5 px-6 pb-5">
              {productStates.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all ${
                    i === activeState ? "w-8 bg-primary" : "w-4 bg-border-soft"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#10b981"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

export default Hero;
