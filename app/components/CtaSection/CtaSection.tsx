"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Github, Youtube, ArrowRight } from "lucide-react";

interface FooterColumn {
  readonly title: string;
  readonly links: readonly string[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: ["Browse courses", "Become a creator", "Pricing", "Mobile app"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Contact"],
  },
  {
    title: "Resources",
    links: ["Help center", "Community", "Creator guide", "API docs"],
  },
  {
    title: "Legal",
    links: ["Privacy policy", "Terms of service", "Cookie policy"],
  },
];

const SOCIAL_LINKS = [
  { label: "Twitter", Icon: Twitter, href: "#" },
  { label: "LinkedIn", Icon: Linkedin, href: "#" },
  { label: "GitHub", Icon: Github, href: "#" },
  { label: "YouTube", Icon: Youtube, href: "#" },
];

export default function Footer(): React.JSX.Element {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <footer id="contact" className="bg-white border-t border-border-soft">
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-10">
        <div className="grid lg:grid-cols-[1.4fr_2fr] gap-14 mb-16">
          {/* Brand + newsletter */}
          <div>
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center text-white font-bold text-sm">
                <img
                  src="/icons/siteIcon/logo.svg"
                  alt="Learnix Labs logo"
                  className="w-12 h-12"
                />
              </div>
              <span className="text-lg font-semibold text-text">
                Learnix <span className="text-primary">Labs</span>
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed max-w-sm mb-6">
              One place to build, sell, and access exclusive content. Fully
              trackable, fully monetizable, zero hassle.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-surface border border-border-soft rounded-full px-4 py-2.5 text-sm text-text placeholder:text-text-muted outline-none focus:border-primary transition-colors"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-hover transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} strokeWidth={2} />
              </motion.button>
            </form>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-semibold text-text mb-4">
                  {col.title}
                </p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-text-muted hover:text-primary transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border-soft">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Learnix Labs. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ label, Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-text-muted hover:bg-primary hover:text-white transition-colors"
              >
                <Icon size={15} strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
