"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  ShieldCheck,
  CreditCard,
  Lock,
  LucideIcon,
} from "lucide-react";

export interface SecurityFeature {
  readonly id: string | number;
  readonly title: string;
  readonly description: string;
  readonly Icon: LucideIcon;
}

interface SecurityTrustProps {
  features?: SecurityFeature[];
  isLoading?: boolean;
}

const DEFAULT_SECURITY_DATA: SecurityFeature[] = [
  {
    id: "sec-1",
    title: "ID & phone verification",
    description: "Confirm identity for a trusted community.",
    Icon: Smartphone,
  },
  {
    id: "sec-2",
    title: "End-to-end encryption",
    description:
      "All your personal data is fully encrypted, in transit and at rest.",
    Icon: ShieldCheck,
  },
  {
    id: "sec-3",
    title: "Stripe-powered payments",
    description: "Secure, global standard transactions.",
    Icon: CreditCard,
  },
  {
    id: "sec-4",
    title: "Private video streaming",
    description: "Your content is protected from unauthorized access.",
    Icon: Lock,
  },
];

const COMPLIANCE_BADGES = ["SOC 2", "GDPR", "PCI DSS", "256-bit SSL"];

const SecurityPanel = () => (
  <div className="group relative bg-white border border-border-soft rounded-3xl p-8 transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1">
    <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
      <motion.span
        className="absolute inset-0 rounded-full border border-primary-soft"
        animate={{ scale: [1, 1.25, 1], opacity: [0.7, 0, 0.7] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="w-16 h-16 bg-primary-soft text-primary rounded-full flex items-center justify-center">
        <ShieldCheck size={28} strokeWidth={1.75} />
      </div>
    </div>

    <p className="text-center text-text font-medium mb-1">
      Your data is encrypted end-to-end
    </p>
    <p className="text-center text-sm text-text-muted max-w-xs mx-auto">
      Every file, message, and payment detail is protected before it ever leaves
      your device.
    </p>
  </div>
);

export default function SecurityTrust({
  features = DEFAULT_SECURITY_DATA,
  isLoading = false,
}: SecurityTrustProps): React.JSX.Element {
  const renderedFeatures = useMemo(() => features, [features]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 max-w-5xl animate-pulse">
        <div className="space-y-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-surface rounded-2xl" />
          ))}
        </div>
        <div className="h-96 bg-surface rounded-3xl" />
      </div>
    );
  }

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
          Security & trust
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-text-muted text-center max-w-xl mx-auto mb-16"
        >
          Your content, your data, and your payments, protected at every layer.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
          {/* Left: feature list */}
          <div className="space-y-7">
            {renderedFeatures.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-soft flex items-center justify-center text-primary shrink-0">
                  <item.Icon size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-text font-medium mb-1">{item.title}</p>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: security panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <SecurityPanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
