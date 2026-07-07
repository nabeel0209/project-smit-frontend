// app/components/shared/HelpContent.tsx
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

interface FaqItem {
  question: string;
  answer: string;
  category: string;
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
  // Getting started
  {
    category: "getting-started",
    question: "How do I switch between learner and creator mode?",
    answer:
      "Go to your profile menu in the top right and select 'Switch to Creator' or 'Switch to Learner'. You can hold both roles on the same account at the same time.",
  },
  {
    category: "getting-started",
    question: "Is there a fee to join as a creator?",
    answer:
      "No, signing up as a creator is free. We only take a percentage of each sale once you start earning — there are no upfront or listing fees.",
  },
  {
    category: "getting-started",
    question: "What do I need to get started as a creator?",
    answer:
      "Just an account and something to teach. You don't need existing videos or a following — you can build your first course directly in the Creator Studio.",
  },
  {
    category: "getting-started",
    question: "Can I use Learnix Labs on mobile?",
    answer:
      "Yes, the site is fully responsive. A dedicated mobile app is on our roadmap, but for now everything — including course creation — works in your mobile browser.",
  },
  {
    category: "getting-started",
    question: "How do I invite team members to help manage my courses?",
    answer:
      "Team seats aren't available yet — each creator account is currently single-owner. Multi-user course management is a planned feature.",
  },

  // Courses & content
  {
    category: "courses",
    question: "How long does it take for a new course to go live?",
    answer:
      "Once you submit a course for review, it's typically approved within 24-48 hours, provided it meets our content guidelines.",
  },
  {
    category: "courses",
    question: "Can I edit a course after it's published?",
    answer:
      "Yes. You can update lessons, pricing, and materials anytime from My Courses. Major changes may briefly re-trigger a review.",
  },
  {
    category: "courses",
    question: "What video formats and sizes are supported?",
    answer:
      "We support MP4, MOV, and WebM up to 4GB per lesson. We recommend exporting at 1080p for the best balance of quality and upload speed.",
  },
  {
    category: "courses",
    question: "Can I offer free preview lessons?",
    answer:
      "Yes. Mark any lesson as a 'free preview' while building your course, and it'll be watchable by anyone before they purchase.",
  },
  {
    category: "courses",
    question: "How do I set or change the price of my course?",
    answer:
      "Open the course in My Courses, go to Pricing, and set your amount. Price changes apply immediately to new enrollments, existing students keep their original price.",
  },
  {
    category: "courses",
    question: "Can I bundle multiple courses together?",
    answer:
      "Course bundles aren't supported yet, but it's one of our most requested features and is actively planned.",
  },
  {
    category: "courses",
    question: "What happens if my course gets rejected in review?",
    answer:
      "You'll get an email explaining exactly what needs to change, and you can resubmit as many times as needed at no cost.",
  },

  // Payouts & billing
  {
    category: "payouts",
    question: "When do I get paid?",
    answer:
      "Payouts are processed automatically on the 28th of every month for all revenue earned in the prior period, sent directly to your connected bank account.",
  },
  {
    category: "payouts",
    question: "What payment methods do you support?",
    answer:
      "Payments are handled securely through Stripe. Students can pay by card, and creators receive payouts via direct bank transfer.",
  },
  {
    category: "payouts",
    question: "What percentage does Learnix Labs take?",
    answer:
      "Our platform fee is a percentage of each sale, shown clearly on your Payouts page before you publish — there are no hidden charges.",
  },
  {
    category: "payouts",
    question: "Why is my payout delayed?",
    answer:
      "Delays usually happen when your bank account isn't verified yet, or if a payout falls on a bank holiday. Check Payouts > Payout method for verification status.",
  },
  {
    category: "payouts",
    question: "Do I need to handle taxes myself?",
    answer:
      "Yes, creators are responsible for reporting and paying applicable taxes on their earnings. We provide downloadable earnings reports to help with this.",
  },
  {
    category: "payouts",
    question: "Can students get a refund?",
    answer:
      "Students can request a refund within 14 days of purchase if they haven't completed more than 30% of the course. Refunds are deducted from your next payout.",
  },

  // Students & enrollment
  {
    category: "students",
    question: "How do I message a student directly?",
    answer:
      "Open Students from your sidebar, find the student, and click Message. They'll receive it both in-app and via email based on their notification settings.",
  },
  {
    category: "students",
    question: "Can I see how far along a student is in my course?",
    answer:
      "Yes, the Students page shows per-student progress, including completion percentage and last active date.",
  },
  {
    category: "students",
    question: "Can I remove a student from my course?",
    answer:
      "You can revoke access from a student's profile page. If they paid, this typically should be paired with issuing a refund.",
  },
  {
    category: "students",
    question: "How do students leave reviews?",
    answer:
      "Students are prompted to rate and review a course after reaching 50% completion, or they can leave one anytime from the course page.",
  },

  // Account & security
  {
    category: "account",
    question: "How do I reset my password?",
    answer:
      "Go to Settings, then Account & security, and use the 'Update password' section. If you're logged out, use the 'Forgot password' link on the login page.",
  },
  {
    category: "account",
    question: "How do I enable two-factor authentication?",
    answer:
      "In Settings, under Account & security, click Enable next to Authenticator app and follow the setup steps with your preferred authenticator.",
  },
  {
    category: "account",
    question: "How do I delete my account?",
    answer:
      "You can delete your account from Profile, under the Danger zone section. This permanently removes your courses, student data, and payout history.",
  },
  {
    category: "account",
    question: "I lost access to my email, how do I recover my account?",
    answer:
      "Contact support with any proof of account ownership (payment receipts, course names, sign-up date) and we'll help you regain access.",
  },
  {
    category: "account",
    question: "Can I have both a learner and creator profile under one email?",
    answer:
      "Yes, one account covers both roles. You don't need separate emails or logins for learning and teaching.",
  },

  // Settings & preferences
  {
    category: "settings",
    question: "How do I turn off marketing emails?",
    answer:
      "Go to Settings > Notifications and toggle off Promotions & offers under the Email section. Transactional emails like receipts can't be disabled.",
  },
  {
    category: "settings",
    question: "Can I change my display language?",
    answer:
      "Yes, under Settings > Language & region, choose your preferred display language. Course content language is set by each individual creator.",
  },
  {
    category: "settings",
    question: "Does Learnix Labs support dark mode?",
    answer:
      "Dark mode is available under Settings > Appearance. It's currently in beta, so some pages may not be fully styled yet.",
  },
  {
    category: "settings",
    question: "How do I export my data?",
    answer:
      "Go to Settings > Data & privacy and click Download my data (or Export revenue report if you're a creator) to get a copy in CSV format.",
  },
];

export default function HelpContent() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const isSearching = query.trim() !== "";

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesQuery =
      !isSearching ||
      faq.question.toLowerCase().includes(query.toLowerCase()) ||
      faq.answer.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !activeCategory || faq.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  const activeCategoryData = CATEGORIES.find((c) => c.key === activeCategory);

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* Search hero */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-text mb-2">How can we help?</h1>
        <p className="text-text-muted mb-7">
          Search our help center or browse a topic below.
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
            }}
            placeholder="Search for an answer..."
            className="w-full pl-11 pr-4 py-4 rounded-full border border-border-soft bg-white focus:border-primary outline-none transition-colors text-sm text-text placeholder:text-text-muted"
          />
        </div>
      </div>

      {isSearching ? (
        /* Search results view */
        <section className="bg-white border border-border-soft rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="text-lg font-bold text-text mb-5">
            {filteredFaqs.length} result{filteredFaqs.length !== 1 && "s"} for
            &ldquo;{query}&rdquo;
          </h2>
          <FaqList
            faqs={filteredFaqs}
            openFaq={openFaq}
            setOpenFaq={setOpenFaq}
          />
        </section>
      ) : activeCategory ? (
        /* Category detail view */
        <section className="bg-white border border-border-soft rounded-2xl p-6 md:p-8 mb-8">
          <button
            onClick={() => setActiveCategory(null)}
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
        /* Browse-by-topic grid */
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {CATEGORIES.map((cat) => {
            const count = FAQS.filter((f) => f.category === cat.key).length;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategory(cat.key);
                  setOpenFaq(null);
                }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-border-soft bg-white hover:border-primary transition-colors text-left group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center flex-shrink-0">
                  <cat.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text mb-0.5">
                    {cat.label}
                  </p>
                  <p className="text-xs text-text-muted mb-1.5">
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

      {/* Contact support */}
      <section className="bg-primary-soft border border-primary/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary flex-shrink-0">
            <MessageCircle size={22} />
          </div>
          <div>
            <p className="text-sm font-bold text-text">Still need help?</p>
            <p className="text-sm text-text-muted">
              Our team typically responds within 24 hours.
            </p>
          </div>
        </div>
        <a
          href="/#contact"
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-primary-hover transition-colors whitespace-nowrap"
        >
          <Mail size={16} />
          Contact support
          <ArrowRight size={15} />
        </a>
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
