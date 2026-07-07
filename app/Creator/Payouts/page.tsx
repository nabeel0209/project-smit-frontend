// app/Creator/Payouts/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Wallet,
  Clock,
  CheckCircle2,
  Landmark,
  Download,
  ArrowUpRight,
} from "lucide-react";

const DUMMY_STATS = [
  { title: "Available balance", value: "$2,450.00", icon: Wallet },
  { title: "Pending", value: "$680.00", icon: Clock },
  { title: "Total paid out", value: "$18,920.00", icon: CheckCircle2 },
  { title: "Next payout", value: "Jul 28", icon: Landmark },
];

const DUMMY_PAYOUTS = [
  {
    id: 1,
    date: "Jun 28, 2026",
    amount: "$2,180.00",
    method: "Bank transfer",
    status: "Paid",
  },
  {
    id: 2,
    date: "May 28, 2026",
    amount: "$1,940.00",
    method: "Bank transfer",
    status: "Paid",
  },
  {
    id: 3,
    date: "Apr 28, 2026",
    amount: "$2,310.00",
    method: "Bank transfer",
    status: "Paid",
  },
  {
    id: 4,
    date: "Mar 28, 2026",
    amount: "$1,760.00",
    method: "Bank transfer",
    status: "Paid",
  },
  {
    id: 5,
    date: "Feb 28, 2026",
    amount: "$2,020.00",
    method: "Bank transfer",
    status: "Paid",
  },
];

export default function CreatorPayoutsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Payouts</h1>
          <p className="text-text-muted mt-1">
            Track your earnings and payout history.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 border border-border-soft hover:border-primary text-text px-5 py-2.5 rounded-full text-sm font-semibold transition-colors">
          <Download size={16} />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl border border-border-soft animate-pulse"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-surface rounded-xl" />
                    <div className="space-y-2">
                      <div className="h-3.5 bg-surface rounded-full w-20" />
                      <div className="h-5 bg-surface rounded-full w-12" />
                    </div>
                  </div>
                </div>
              ))
          : DUMMY_STATS.map((stat, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-border-soft"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary-soft">
                    <stat.icon className="text-primary" size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">{stat.title}</p>
                    <h3 className="text-xl font-bold text-text mt-0.5">
                      {stat.value}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: payout history table */}
        <div className="lg:col-span-2">
          <section className="bg-white p-6 rounded-2xl border border-border-soft">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-text">Payout history</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border-soft text-xs text-text-muted">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Method</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft/70">
                  {DUMMY_PAYOUTS.map((payout) => (
                    <tr key={payout.id}>
                      <td className="py-3.5 text-sm text-text-muted">
                        {payout.date}
                      </td>
                      <td className="py-3.5 text-sm font-medium text-text">
                        {payout.amount}
                      </td>
                      <td className="py-3.5 text-sm text-text-muted">
                        {payout.method}
                      </td>
                      <td className="py-3.5">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-soft text-primary">
                          {payout.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right: next payout + payout method */}
        <div className="space-y-8">
          <section className="bg-primary-soft p-6 rounded-2xl border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Landmark size={18} className="text-primary" />
              <h2 className="text-sm font-bold text-text">Next payout</h2>
            </div>
            <p className="text-2xl font-bold text-text">$2,450.00</p>
            <p className="text-xs text-text-muted mt-1">
              Scheduled for Jul 28, 2026
            </p>
          </section>

          <section className="bg-white p-6 rounded-2xl border border-border-soft">
            <h2 className="text-lg font-bold text-text mb-5">Payout method</h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-surface">
                <Landmark size={20} className="text-text-muted" />
              </div>
              <div>
                <p className="text-sm font-medium text-text">Bank account</p>
                <p className="text-xs text-text-muted">•••• •••• 4821</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 border border-border-soft hover:border-primary text-text text-sm font-medium py-2.5 rounded-full transition-colors">
              Update payout method
              <ArrowUpRight size={14} />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
