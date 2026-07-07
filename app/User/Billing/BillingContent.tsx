"use client";

import { useState } from "react";
import { CreditCard, Download, Plus, Trash2, CheckCircle2 } from "lucide-react";

const DUMMY_TRANSACTIONS = [
  {
    id: 1,
    course: "React Basics",
    date: "2023-10-15",
    price: "$49.99",
    status: "Paid",
    invoice: "INV-2023-1015",
  },
  {
    id: 2,
    course: "Next.js Mastery",
    date: "2023-11-02",
    price: "$79.99",
    status: "Paid",
    invoice: "INV-2023-1102",
  },
  {
    id: 3,
    course: "UI/UX Design",
    date: "2023-12-10",
    price: "$29.99",
    status: "Paid",
    invoice: "INV-2023-1210",
  },
  {
    id: 4,
    course: "Advanced TypeScript",
    date: "2024-01-08",
    price: "$59.99",
    status: "Paid",
    invoice: "INV-2024-0108",
  },
  {
    id: 5,
    course: "Tailwind CSS Tips",
    date: "2024-02-20",
    price: "$19.99",
    status: "Refunded",
    invoice: "INV-2024-0220",
  },
];

const DUMMY_CARDS = [
  { id: 1, brand: "Visa", last4: "4242", expiry: "08/27", isDefault: true },
  {
    id: 2,
    brand: "Mastercard",
    last4: "8891",
    expiry: "03/26",
    isDefault: false,
  },
];

export default function BillingPage() {
  const [cards, setCards] = useState(DUMMY_CARDS);

  const totalSpent = DUMMY_TRANSACTIONS.filter(
    (t) => t.status === "Paid",
  ).reduce((sum, t) => sum + parseFloat(t.price.replace("$", "")), 0);

  const handleRemoveCard = (id: number) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  const handleSetDefault = (id: number) => {
    setCards(cards.map((c) => ({ ...c, isDefault: c.id === id })));
  };

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-text">Billing</h1>
        <p className="text-text-muted mt-1">
          Manage your payment methods and view transaction history.
        </p>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-border-soft rounded-2xl p-6">
          <p className="text-sm text-text-muted">Total spent</p>
          <p className="text-2xl font-bold text-text mt-1">
            ${totalSpent.toFixed(2)}
          </p>
        </div>
        <div className="bg-white border border-border-soft rounded-2xl p-6">
          <p className="text-sm text-text-muted">Courses purchased</p>
          <p className="text-2xl font-bold text-text mt-1">
            {DUMMY_TRANSACTIONS.length}
          </p>
        </div>
        <div className="bg-white border border-border-soft rounded-2xl p-6">
          <p className="text-sm text-text-muted">Payment methods</p>
          <p className="text-2xl font-bold text-text mt-1">{cards.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: transaction history */}
        <div className="lg:col-span-2">
          <section className="bg-white p-6 rounded-2xl border border-border-soft">
            <h2 className="text-lg font-bold text-text mb-5">
              Transaction history
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border-soft text-xs text-text-muted">
                    <th className="pb-3 font-medium">Course</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft/70">
                  {DUMMY_TRANSACTIONS.map((t) => (
                    <tr key={t.id}>
                      <td className="py-3.5 text-sm font-medium text-text">
                        {t.course}
                      </td>
                      <td className="py-3.5 text-sm text-text-muted">
                        {t.date}
                      </td>
                      <td className="py-3.5 text-sm font-medium text-text">
                        {t.price}
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            t.status === "Paid"
                              ? "bg-primary-soft text-primary"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <button className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
                          <Download size={13} />
                          {t.invoice}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right: payment methods */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-2xl border border-border-soft">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-text">Payment methods</h2>
              <button className="text-primary hover:bg-primary-soft p-1.5 rounded-lg transition-colors">
                <Plus size={18} />
              </button>
            </div>

            <div className="space-y-3">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`p-4 rounded-xl border flex items-center gap-3 ${
                    card.isDefault
                      ? "border-primary bg-primary-soft/40"
                      : "border-border-soft"
                  }`}
                >
                  <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center flex-shrink-0">
                    <CreditCard size={18} className="text-text-muted" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text">
                      {card.brand} •••• {card.last4}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      Expires {card.expiry}
                    </p>
                  </div>
                  {card.isDefault ? (
                    <span className="inline-flex items-center gap-1 text-xs text-primary font-medium flex-shrink-0">
                      <CheckCircle2 size={13} />
                      Default
                    </span>
                  ) : (
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleSetDefault(card.id)}
                        className="text-xs text-text-muted hover:text-primary transition-colors"
                      >
                        Set default
                      </button>
                      <button
                        onClick={() => handleRemoveCard(card.id)}
                        className="p-1.5 text-text-muted hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {cards.length === 0 && (
                <p className="text-sm text-text-muted text-center py-6">
                  No payment methods added yet.
                </p>
              )}
            </div>

            <button className="w-full mt-4 flex items-center justify-center gap-2 border border-dashed border-border-soft text-text-muted py-3 rounded-xl text-sm font-medium hover:border-primary hover:text-primary transition-colors">
              <Plus size={16} />
              Add payment method
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
