"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Star,
  ArrowUpRight,
  LucideIcon,
} from "lucide-react";

interface ValueProp {
  readonly title: string;
  readonly description: string;
  readonly Icon: LucideIcon;
}

const VALUE_PROPS: ValueProp[] = [
  {
    title: "Revenue, tracked automatically",
    description:
      "Every enrollment, upsell, and renewal rolls up into one clear number — no spreadsheets.",
    Icon: TrendingUp,
  },
  {
    title: "Payouts on a fixed schedule",
    description:
      "Get paid the same day every month, wired directly to your account. No invoices to chase.",
    Icon: Users,
  },
  {
    title: "See what's actually working",
    description:
      "Completion rates, ratings, and drop-off points for every course, in plain language.",
    Icon: Star,
  },
];

const SPARKLINE_POINTS = [30, 45, 38, 58, 50, 72, 65, 88];

const CreatorOverviewCard = () => {
  const path = SPARKLINE_POINTS.map(
    (p: number, i: number) =>
      `${(i / (SPARKLINE_POINTS.length - 1)) * 100},${100 - p}`,
  ).join(" L");

  const stats = [
    { label: "Students enrolled", value: "1,284" },
    { label: "Courses live", value: "6" },
    { label: "Avg. rating", value: "4.9" },
  ];

  return (
    <div className="group relative bg-white border border-border-soft rounded-3xl p-8 transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-soft flex items-center justify-center text-primary font-semibold text-sm">
            SM
          </div>
          <div>
            <p className="text-sm font-medium text-text">Sarah Mitchell</p>
            <p className="text-xs text-text-muted">This month</p>
          </div>
        </div>
        <span className="text-xs font-medium text-primary bg-primary-soft px-2.5 py-1 rounded-full">
          +18%
        </span>
      </div>

      <p className="text-4xl font-bold text-text mb-1">$8,940</p>
      <p className="text-sm text-text-muted mb-5">Total earnings</p>

      <svg
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
        className="w-full h-16 mb-6"
      >
        <motion.polyline
          points={`0,${40 - SPARKLINE_POINTS[0] * 0.4} L${path
            .split(" L")
            .map((pt) => {
              const [x, y] = pt.split(",").map(Number);
              return `${x},${y * 0.4}`;
            })
            .join(" L")}`}
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>

      <div className="space-y-3 border-t border-border-soft pt-5">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-text-muted">{s.label}</span>
            <span className="font-medium text-text">{s.value}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1 text-sm font-medium text-primary mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        View full dashboard
        <ArrowUpRight size={15} strokeWidth={2} />
      </div>
    </div>
  );
};

const ForCreators: React.FC = () => {
  return (
    <section className="py-10 md:py-15 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-bold text-text text-center mb-4"
        >
          For creators
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-text-muted text-center max-w-xl mx-auto mb-20"
        >
          Built for creators who teach for a living.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: value props */}
          <div>
            <p className="text-text-muted leading-relaxed mb-10">
              Everything you need to price, publish, and get paid for your
              courses — without stitching together five different tools.
            </p>

            <div className="space-y-7">
              {VALUE_PROPS.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-soft flex items-center justify-center text-primary shrink-0">
                    <v.Icon size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-text font-medium mb-1">{v.title}</p>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: single overview card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <CreatorOverviewCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ForCreators;
