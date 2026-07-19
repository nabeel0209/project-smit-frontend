"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, ShieldAlert } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getCurrentAccount,
  getCurrentAccountId,
  getCurrentAccountIdLabel,
} from "@/app/services/user";
import {
  createSupportTicket,
  getMySupportTickets,
  SupportTicketCategory,
} from "@/app/services/support";

const categories: { label: string; value: SupportTicketCategory }[] = [
  { label: "Account suspension appeal", value: "account_suspension" },
  { label: "Creator verification", value: "creator_verification" },
  { label: "Payment or payout", value: "payment_billing" },
  { label: "Course issue", value: "course_issue" },
  { label: "Technical issue", value: "technical_issue" },
  { label: "General support", value: "general_support" },
];

export default function CreatorSupportPage() {
  const [category, setCategory] =
    useState<SupportTicketCategory>("general_support");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const queryClient = useQueryClient();

  const { data: account, isLoading: isAccountLoading } = useQuery({
    queryKey: ["current-account"],
    queryFn: getCurrentAccount,
  });

  const { data: tickets = [] } = useQuery({
    queryKey: ["my-support-tickets"],
    queryFn: getMySupportTickets,
  });

  const submitMutation = useMutation({
    mutationFn: createSupportTicket,
    onSuccess: () => {
      toast.success("Support request submitted.");
      setSubject("");
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["my-support-tickets"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to submit request.");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    submitMutation.mutate({
      category,
      subject,
      message,
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <Link
          href="/Creator/Help"
          className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-text"
        >
          <ArrowLeft size={16} />
          Back to Help
        </Link>

        <h1 className="text-3xl font-bold text-text mt-4">Contact Support</h1>
        <p className="text-text-muted mt-2">
          Submit your issue, appeal, or creator verification request.
        </p>
      </div>

      {account?.status === "suspended" && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 flex gap-3">
          <ShieldAlert className="text-red-600 shrink-0 mt-0.5" size={22} />
          <div>
            <p className="text-sm font-semibold text-red-700">
              You are submitting this request from a suspended account.
            </p>
            <p className="text-sm text-red-700 mt-1">
              Use this form to explain your issue or request a review.
            </p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-border-soft rounded-2xl p-6 space-y-5"
        >
          <div className="grid md:grid-cols-3 gap-4">
            <InfoBox
              label="Name"
              value={isAccountLoading ? "Loading..." : account?.name || "N/A"}
            />

            <InfoBox
              label="Email"
              value={isAccountLoading ? "Loading..." : account?.email || "N/A"}
            />

            <InfoBox
              label={getCurrentAccountIdLabel(account?.role)}
              value={
                isAccountLoading
                  ? "Loading..."
                  : getCurrentAccountId(account) || "N/A"
              }
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-text-muted">
              Category
            </label>
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as SupportTicketCategory)
              }
              className="mt-2 w-full px-4 py-3 rounded-xl border border-border-soft outline-none focus:border-primary bg-white text-sm"
            >
              {categories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-text-muted">
              Subject
            </label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Example: Please review my creator account"
              className="mt-2 w-full px-4 py-3 rounded-xl border border-border-soft outline-none focus:border-primary text-sm"
              maxLength={120}
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-text-muted">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your issue or appeal here..."
              rows={8}
              className="mt-2 w-full px-4 py-3 rounded-xl border border-border-soft outline-none focus:border-primary text-sm resize-none"
              maxLength={3000}
              required
            />
            <p className="text-xs text-text-muted mt-1">
              {message.length}/3000 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={submitMutation.isPending}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60"
          >
            <Send size={17} />
            {submitMutation.isPending ? "Submitting..." : "Submit request"}
          </button>
        </form>

        <div className="bg-white border border-border-soft rounded-2xl p-6">
          <h2 className="text-lg font-bold text-text">Your recent requests</h2>

          <div className="mt-4 space-y-3 max-h-[520px] overflow-y-auto pr-1">
            {tickets.length === 0 ? (
              <p className="text-sm text-text-muted">
                No support requests yet.
              </p>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="rounded-xl border border-border-soft p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-text">
                      {ticket.subject}
                    </p>
                    <span className="text-[11px] px-2 py-1 rounded-full bg-surface text-text-muted capitalize">
                      {ticket.status.replaceAll("_", " ")}
                    </span>
                  </div>

                  <p className="text-xs text-text-muted mt-2 line-clamp-2">
                    {ticket.message}
                  </p>

                  {ticket.adminNote && (
                    <p className="text-xs text-primary mt-2">
                      Admin note: {ticket.adminNote}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-surface border border-border-soft p-4">
      <p className="text-xs font-semibold uppercase text-text-muted">{label}</p>
      <p className="text-sm font-semibold text-text mt-1 break-all">{value}</p>
    </div>
  );
}
