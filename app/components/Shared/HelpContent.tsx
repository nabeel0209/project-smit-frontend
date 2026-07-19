"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  Rocket,
  BookOpen,
  Wallet,
  Shield,
  Users,
  Settings,
  MessageCircle,
  Mail,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

interface HelpContentProps {
  basePath: "/User" | "/Creator";
}

const CATEGORIES = [
  {
    key: "getting-started",
    label: "Getting started",
    description: "Account setup, roles, and the basics",
    icon: Rocket,
  },
  {
    key: "courses",
    label: "Courses & content",
    description: "Creating, editing, and publishing courses",
    icon: BookOpen,
  },
  {
    key: "payouts",
    label: "Payouts & billing",
    description: "Earnings, payment methods, and invoices",
    icon: Wallet,
  },
  {
    key: "students",
    label: "Students & enrollment",
    description: "Managing learners and communication",
    icon: Users,
  },
  {
    key: "account",
    label: "Account & security",
    description: "Login, password, and privacy",
    icon: Shield,
  },
  {
    key: "settings",
    label: "Settings & preferences",
    description: "Notifications, appearance, and more",
    icon: Settings,
  },
] as const;

const FAQS: FaqItem[] = [
  {
    category: "getting-started",
    question: "How do I switch between learner and creator mode?",
    answer:
      "Go to your profile menu and select creator or learner mode. You can use Learnix Labs as a learner or creator depending on your account role.",
  },
  {
    category: "getting-started",
    question: "Is there a fee to join as a creator?",
    answer:
      "No, signing up as a creator is free. Platform fees only apply when you start earning from course sales.",
  },
  {
    category: "getting-started",
    question: "What do I need to get started as a creator?",
    answer:
      "You need a creator account, a completed creator profile, verified contact details, and admin approval before creator tools are unlocked.",
  },
  {
    category: "getting-started",
    question: "Can I use Learnix Labs on mobile?",
    answer:
      "Yes, Learnix Labs is responsive and works in mobile browsers. A dedicated mobile app can be added later.",
  },
  {
    category: "getting-started",
    question: "How do I contact support?",
    answer:
      "Open Help and click Contact support. Your name, email, and account ID will be attached automatically.",
  },

  {
    category: "courses",
    question: "How long does it take for a new course to go live?",
    answer:
      "After a course is submitted, it may go through admin review before it becomes visible to learners.",
  },
  {
    category: "courses",
    question: "Can I edit a course after publishing?",
    answer:
      "Yes, creators can update course details, lessons, pricing, and materials from the creator dashboard.",
  },
  {
    category: "courses",
    question: "Can I offer free preview lessons?",
    answer:
      "Yes, preview lessons can be added later so learners can check a course before purchasing.",
  },
  {
    category: "courses",
    question: "What happens if my course gets rejected?",
    answer:
      "You will be able to review the reason, update the course, and submit it again.",
  },

  {
    category: "payouts",
    question: "When do creators get paid?",
    answer:
      "Creator payouts depend on the platform payout schedule. Bank payout support is currently the main planned payout method.",
  },
  {
    category: "payouts",
    question: "What payment methods are supported?",
    answer:
      "For now, bank transfer is the main payout method for creators. More payout methods can be added later.",
  },
  {
    category: "payouts",
    question: "What percentage does Learnix Labs take?",
    answer:
      "The platform fee is shown in the creator profile and payout section before creators start selling courses.",
  },
  {
    category: "payouts",
    question: "Can students get a refund?",
    answer:
      "Refund rules can be handled by the admin team. Learners can submit a support request for refund-related issues.",
  },

  {
    category: "students",
    question: "Can creators see student progress?",
    answer:
      "Student progress tracking can be shown inside the creator dashboard once course and enrollment features are completed.",
  },
  {
    category: "students",
    question: "Can creators message students?",
    answer:
      "Direct messaging can be added later. For now, support and course communication features are handled separately.",
  },
  {
    category: "students",
    question: "How do students leave reviews?",
    answer:
      "Review features can be added after the course enrollment and completion system is ready.",
  },

  {
    category: "account",
    question: "Why is my account suspended?",
    answer:
      "Accounts may be suspended due to policy violations, suspicious activity, or admin review. You can submit an appeal from the support form.",
  },
  {
    category: "account",
    question: "How can I appeal a suspension?",
    answer:
      "Open Help, click Contact support, select Account suspension appeal, and explain your issue clearly.",
  },
  {
    category: "account",
    question: "How do I reset my password?",
    answer:
      "Password reset can be handled from the login page once the forgot-password flow is added.",
  },
  {
    category: "account",
    question: "How do I delete my account?",
    answer:
      "Account deletion can be requested from support or added later inside profile settings.",
  },

  {
    category: "settings",
    question: "Can I change my profile details?",
    answer: "Yes, profile details can be updated from your profile page.",
  },
  {
    category: "settings",
    question: "Can I change notifications?",
    answer:
      "Notification settings can be added later inside the Settings section.",
  },
  {
    category: "settings",
    question: "Does Learnix Labs support dark mode?",
    answer:
      "Dark mode can be added later. Current dashboard pages are designed around the light theme.",
  },
];

export default function HelpContent({ basePath }: HelpContentProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const isSearching = query.trim() !== "";

  const filteredFaqs = FAQS.filter((faq) => {
    const searchTerm = query.toLowerCase();

    const matchesQuery =
      !isSearching ||
      faq.question.toLowerCase().includes(searchTerm) ||
      faq.answer.toLowerCase().includes(searchTerm);

    const matchesCategory = !activeCategory || faq.category === activeCategory;

    return matchesQuery && matchesCategory;
  });

  const activeCategoryData = CATEGORIES.find((c) => c.key === activeCategory);

  return (
    <div className="min-h-[calc(100vh-80px)] max-w-5xl mx-auto flex flex-col">
      <div className="flex-1">
        {/* Search hero */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">
            How can we help?
          </h1>

          <p className="text-text-muted mb-6">
            Search the help center or browse a topic below.
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
            />

            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveCategory(null);
                setOpenFaq(null);
              }}
              placeholder="Search for an answer..."
              className="w-full pl-11 pr-4 py-4 rounded-full border border-border-soft bg-white focus:border-primary outline-none transition-colors text-sm text-text placeholder:text-text-muted shadow-sm"
            />
          </div>
        </div>

        {isSearching ? (
          <section className="bg-white border border-border-soft rounded-2xl p-5 md:p-7 mb-6 shadow-sm">
            <h2 className="text-lg font-bold text-text mb-5">
              {filteredFaqs.length} result
              {filteredFaqs.length !== 1 && "s"} for &ldquo;{query}&rdquo;
            </h2>

            <FaqList
              faqs={filteredFaqs}
              openFaq={openFaq}
              setOpenFaq={setOpenFaq}
            />
          </section>
        ) : activeCategory ? (
          <section className="bg-white border border-border-soft rounded-2xl p-5 md:p-7 mb-6 shadow-sm">
            <button
              type="button"
              onClick={() => {
                setActiveCategory(null);
                setOpenFaq(null);
              }}
              className="flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-primary transition-colors mb-5"
            >
              <ArrowLeft size={15} />
              All topics
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center flex-shrink-0">
                {activeCategoryData && <activeCategoryData.icon size={20} />}
              </div>

              <div>
                <h2 className="text-lg font-bold text-text">
                  {activeCategoryData?.label}
                </h2>
                <p className="text-sm text-text-muted">
                  {activeCategoryData?.description}
                </p>
              </div>
            </div>

            <FaqList
              faqs={filteredFaqs}
              openFaq={openFaq}
              setOpenFaq={setOpenFaq}
            />
          </section>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {CATEGORIES.map((cat) => {
              const count = FAQS.filter((f) => f.category === cat.key).length;

              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.key);
                    setOpenFaq(null);
                  }}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-border-soft bg-white hover:border-primary hover:shadow-sm transition-all text-left group"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center flex-shrink-0">
                    <cat.icon size={20} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text mb-0.5">
                      {cat.label}
                    </p>

                    <p className="text-xs text-text-muted mb-1.5 leading-relaxed">
                      {cat.description}
                    </p>

                    <span className="text-xs text-primary font-medium">
                      {count} article{count !== 1 && "s"}
                    </span>
                  </div>

                  <ChevronRight
                    size={18}
                    className="text-text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Contact support */}
      <section className="bg-primary-soft border border-primary/20 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary flex-shrink-0">
            <MessageCircle size={22} />
          </div>

          <div>
            <p className="text-sm font-bold text-text">Still need help?</p>
            <p className="text-sm text-text-muted">
              Submit a support request and our team will review it.
            </p>
          </div>
        </div>

        <Link
          href={`${basePath}/Help/Support`}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-primary-hover transition-colors whitespace-nowrap"
        >
          <Mail size={16} />
          Contact support
          <ArrowRight size={15} />
        </Link>
      </section>
    </div>
  );
}

function FaqList({
  faqs,
  openFaq,
  setOpenFaq,
}: {
  faqs: FaqItem[];
  openFaq: number | null;
  setOpenFaq: (i: number | null) => void;
}) {
  if (faqs.length === 0) {
    return (
      <p className="text-sm text-text-muted py-8 text-center">
        No results found. Try different keywords or contact support below.
      </p>
    );
  }

  return (
    <div className="divide-y divide-border-soft">
      {faqs.map((faq, i) => {
        const isOpen = openFaq === i;

        return (
          <div key={faq.question} className="py-2">
            <button
              type="button"
              onClick={() => setOpenFaq(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-3 text-left"
            >
              <span className="text-sm font-medium text-text">
                {faq.question}
              </span>

              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <ChevronDown
                  size={18}
                  className={isOpen ? "text-primary" : "text-text-muted"}
                />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-text-muted leading-relaxed pb-4 pr-8">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
