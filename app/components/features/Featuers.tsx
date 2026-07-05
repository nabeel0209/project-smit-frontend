"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  BarChart3,
  Users,
  LucideIcon,
  ArrowRight,
} from "lucide-react";

export interface FeatureItem {
  readonly id: string | number;
  readonly title: string;
  readonly description: string;
  readonly detail: string;
  readonly Icon: LucideIcon;
}

interface FeaturesProps {
  features?: FeatureItem[];
  title?: string;
  subtitle?: string;
}

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    id: "feat-1",
    title: "Secure LMS",
    description: "Industry-standard security for your exclusive content.",
    detail:
      "End-to-end encryption, role-based access, and audit logs keep every course and payment protected.",
    Icon: ShieldCheck,
  },
  {
    id: "feat-2",
    title: "Fast Payouts",
    description: "Automated, transparent payouts for every creator.",
    detail:
      "Payouts process automatically on your schedule, with full breakdowns for every transaction.",
    Icon: Zap,
  },
  {
    id: "feat-3",
    title: "Detailed Analytics",
    description: "Track student progress with built-in tools.",
    detail:
      "See completion rates, drop-off points, and engagement trends across every course you publish.",
    Icon: BarChart3,
  },
  {
    id: "feat-4",
    title: "Community Tools",
    description: "Build and engage with your student audience.",
    detail:
      "Discussion threads, Q&A, and direct announcements keep your students engaged post-purchase.",
    Icon: Users,
  },
];

const FeatureCard: React.FC<{ feature: FeatureItem; index: number }> = ({
  feature,
  index,
}) => {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onClick={() => setExpanded((v) => !v)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setExpanded((v) => !v)}
      className="relative bg-surface p-7 rounded-2xl border border-border-soft hover:border-primary transition-colors duration-200 cursor-pointer outline-none focus:ring-2 focus:ring-primary/30"
    >
      <motion.div
        whileHover={{ rotate: -8, scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="w-11 h-11 bg-white rounded-xl flex items-center justify-center mb-6 text-primary"
      >
        <feature.Icon
          className="w-5 h-5"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </motion.div>

      <h3 className="text-base font-semibold text-text mb-2">
        {feature.title}
      </h3>
      <p className="text-sm text-text-muted leading-relaxed">
        {feature.description}
      </p>

      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="text-sm text-text-muted leading-relaxed pt-3 border-t border-border-soft mt-4">
          {feature.detail}
        </p>
      </motion.div>

      <div className="flex items-center gap-1.5 mt-5 text-sm font-medium text-primary">
        {expanded ? "Show less" : "Learn more"}
        <motion.span
          animate={{ x: expanded ? 0 : [0, 4, 0] }}
          transition={{ repeat: expanded ? 0 : Infinity, duration: 1.6 }}
        >
          <ArrowRight
            className="w-3.5 h-3.5"
            style={{ transform: expanded ? "rotate(90deg)" : "none" }}
          />
        </motion.span>
      </div>
    </motion.article>
  );
};

const Features: React.FC<FeaturesProps> = ({
  features = DEFAULT_FEATURES,
  title = "Everything you need to",
  subtitle = "scale your knowledge.",
}) => {
  return (
    <section id="features" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text leading-tight">
            {title} <span className="text-primary">{subtitle}</span>
          </h2>
          <p className="mt-4 text-text-muted text-base md:text-lg">
            Our platform provides the tools modern creators need to monetize
            their skills effectively.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
