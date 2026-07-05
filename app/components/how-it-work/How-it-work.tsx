"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Users2, BarChart3, LucideIcon } from "lucide-react";

export interface WorkStep {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly Icon: LucideIcon;
  readonly previewLabel: string;
  readonly previewValue: string;
}

const DEFAULT_STEPS: WorkStep[] = [
  {
    id: "1",
    title: "Create & host your course",
    description:
      "Upload your content to a secure LMS and set your own pricing — no setup fees, no complicated onboarding.",
    Icon: Code2,
    previewLabel: "Course Status",
    previewValue: "Published · Live",
  },
  {
    id: "2",
    title: "Students enroll & learn",
    description:
      "Students discover your content, enroll instantly, and start tracking their own progress right away.",
    Icon: Users2,
    previewLabel: "Active Learners",
    previewValue: "1,204 enrolled",
  },
  {
    id: "3",
    title: "You track & earn",
    description:
      "Revenue is calculated and paid out automatically, while you monitor engagement from one dashboard.",
    Icon: BarChart3,
    previewLabel: "This Month",
    previewValue: "$8,940 earned",
  },
];

export default function HowItWorks({
  steps = DEFAULT_STEPS,
}: {
  steps?: WorkStep[];
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [steps.length]);

  const currentStep = steps[active];

  return (
    <section id="how-it-works" className="py-10 md:py-20 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text leading-tight">
            How it works
          </h2>
          <p className="mt-4 text-text-muted text-base md:text-lg">
            From upload to payout, everything runs automatically — no complex
            setup required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Left: step list with progress line */}
          <div className="relative flex flex-col gap-2">
            <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-border-soft">
              <motion.div
                className="w-full bg-primary"
                initial={false}
                animate={{ height: `${(active / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>

            {steps.map((step, i) => {
              const isActive = i === active;
              return (
                <button
                  key={step.id}
                  onClick={() => setActive(i)}
                  className="relative flex items-start gap-5 text-left py-4 px-2 rounded-xl transition-colors"
                >
                  <div
                    className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors duration-300 ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-white border border-border-soft text-text-muted"
                    }`}
                  >
                    {step.id}
                  </div>

                  <div>
                    <h3
                      className={`text-base font-semibold transition-colors duration-300 ${
                        isActive ? "text-text" : "text-text-muted"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-sm text-text-muted leading-relaxed mt-1.5 overflow-hidden"
                        >
                          {step.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: live preview panel */}
          <div className="bg-surface border border-border-soft rounded-3xl p-8 min-h-[280px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary mb-6">
                  <currentStep.Icon size={22} strokeWidth={1.75} />
                </div>
                <p className="text-xs text-text-muted uppercase tracking-wide">
                  {currentStep.previewLabel}
                </p>
                <p className="text-2xl font-bold text-text mt-1">
                  {currentStep.previewValue}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Step dots */}
            <div className="flex gap-1.5 mt-6">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1 rounded-full transition-all ${
                    i === active ? "w-8 bg-primary" : "w-4 bg-border-soft"
                  }`}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
