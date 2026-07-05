"use client";

import React, { useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  CloudUpload,
  BookOpen,
  CreditCard,
  ShieldCheck,
  LucideIcon,
  Play,
  CheckCircle2,
} from "lucide-react";

export interface LearnerFeature {
  readonly id: string | number;
  readonly title: string;
  readonly description: string;
  readonly detail: string;
  readonly Icon: LucideIcon;
  readonly path: string;
}

interface ForLearnersProps {
  features?: LearnerFeature[];
  onFeatureClick?: (path: string) => void;
}

const DEFAULT_FEATURES: LearnerFeature[] = [
  {
    id: "dash-01",
    title: "Dashboard",
    description: "Monitor your personalized learning journey.",
    detail:
      "See every course, deadline, and certificate in one view, updated in real time.",
    Icon: CloudUpload,
    path: "/dashboard",
  },
  {
    id: "resume-02",
    title: "Resume Anytime",
    description: "Pick up exactly where you left off, safely.",
    detail:
      "Progress syncs across devices instantly, so switching from phone to laptop loses nothing.",
    Icon: BookOpen,
    path: "/resume",
  },
  {
    id: "verify-03",
    title: "Verified Creators",
    description: "Learn from top-tier, trusted experts.",
    detail:
      "Every creator is vetted before publishing, so you're always learning from someone credible.",
    Icon: CreditCard,
    path: "/creators",
  },
  {
    id: "secure-04",
    title: "Secure Access",
    description: "Your content is protected with encryption.",
    detail:
      "End-to-end encryption and license checks keep paid content locked to your account only.",
    Icon: ShieldCheck,
    path: "/security",
  },
];

export default function ForLearners({
  features = DEFAULT_FEATURES,
  onFeatureClick = () => {},
}: ForLearnersProps): React.JSX.Element {
  const [openId, setOpenId] = useState<string | number | null>(features[0].id);
  const [playing, setPlaying] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="py-10 md:py-15 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold text-text text-center mb-4"
        >
          For learners
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-text-muted text-center max-w-xl mx-auto mb-20"
        >
          Everything you need to learn at your own pace, all in one place.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ">
          {/* Interactive demo panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative"
            style={{ perspective: "1200px" }}
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative bg-white border border-border-soft rounded-3xl shadow-sm p-2"
            >
              <div className="bg-surface rounded-2xl p-6">
                {/* Header row */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs text-text-muted">
                      Currently watching
                    </p>
                    <p className="text-sm font-semibold text-text mt-0.5">
                      React Fundamentals — Lesson 4
                    </p>
                  </div>
                  <button
                    onClick={() => setPlaying((p) => !p)}
                    className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white flex-shrink-0"
                  >
                    {playing ? (
                      <span className="flex gap-0.5">
                        <span className="w-1 h-3 bg-white rounded-full" />
                        <span className="w-1 h-3 bg-white rounded-full" />
                      </span>
                    ) : (
                      <Play size={16} fill="white" />
                    )}
                  </button>
                </div>

                {/* Video / progress area */}
                <div className="bg-white rounded-2xl border border-border-soft p-5 mb-4">
                  <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: playing ? "100%" : "42%" }}
                      transition={{
                        duration: playing ? 8 : 0.6,
                        ease: playing ? "linear" : "easeOut",
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-[11px] text-text-muted">
                    <span>12:04</span>
                    <span>28:30</span>
                  </div>
                </div>

                {/* Mini stat row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Completed", value: "6/14" },
                    { label: "Streak", value: "9 days" },
                    { label: "Certificate", value: "68%" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white rounded-xl border border-border-soft p-3 text-center"
                    >
                      <p className="text-sm font-semibold text-text">
                        {stat.value}
                      </p>
                      <p className="text-[11px] text-text-muted mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating micro-card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "easeInOut",
              }}
              className="absolute -top-5 -right-5 bg-white border border-border-soft rounded-2xl shadow-sm px-4 py-3 flex items-center gap-2.5"
            >
              <CheckCircle2 size={18} className="text-primary" />
              <div>
                <p className="text-[11px] text-text-muted leading-none">
                  Lesson complete
                </p>
                <p className="text-xs font-semibold text-text mt-0.5">+50 XP</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Feature accordion list */}
          <div className="flex flex-col gap-3">
            {features.map((feature, i) => {
              const isOpen = openId === feature.id;
              return (
                <motion.article
                  key={feature.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: "easeOut",
                  }}
                  className={`rounded-2xl border transition-colors duration-200 cursor-pointer ${
                    isOpen
                      ? "border-primary bg-white"
                      : "border-border-soft bg-surface hover:border-primary"
                  }`}
                  onClick={() => setOpenId(isOpen ? null : feature.id)}
                >
                  <div className="flex items-center p-5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 transition-colors duration-200 ${
                        isOpen
                          ? "bg-primary text-white"
                          : "bg-white text-primary"
                      }`}
                    >
                      <feature.Icon
                        size={20}
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-text">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-text-muted text-xl font-light ml-2 flex-shrink-0"
                    >
                      +
                    </motion.span>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-text-muted leading-relaxed px-5 pb-5 pl-[3.75rem]">
                          {feature.detail}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
