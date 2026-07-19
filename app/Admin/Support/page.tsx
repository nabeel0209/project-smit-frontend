"use client";

import { useState } from "react";
import { Inbox, Search } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getAdminSupportTickets,
  SupportTicket,
  SupportTicketStatus,
  updateSupportTicketStatus,
} from "@/app/services/support";

const statusOptions: SupportTicketStatus[] = [
  "open",
  "in_review",
  "resolved",
  "rejected",
];

export default function AdminSupportPage() {
  const [search, setSearch] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    null,
  );
  const [adminNote, setAdminNote] = useState("");

  const queryClient = useQueryClient();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["admin-support-tickets"],
    queryFn: getAdminSupportTickets,
  });

  const updateMutation = useMutation({
    mutationFn: updateSupportTicketStatus,
    onSuccess: () => {
      toast.success("Ticket updated.");
      queryClient.invalidateQueries({ queryKey: ["admin-support-tickets"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update ticket.");
    },
  });

  const filteredTickets = tickets.filter((ticket) => {
    const term = search.toLowerCase();

    return (
      ticket.name.toLowerCase().includes(term) ||
      ticket.email.toLowerCase().includes(term) ||
      ticket.subject.toLowerCase().includes(term) ||
      ticket.message.toLowerCase().includes(term) ||
      ticket.publicUserId?.toLowerCase().includes(term)
    );
  });

  const activeTicket = selectedTicket || filteredTickets[0];

  const updateStatus = (ticket: SupportTicket, status: SupportTicketStatus) => {
    updateMutation.mutate({
      ticketId: ticket._id,
      status,
      adminNote,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text">Support Tickets</h1>
        <p className="text-text-muted mt-2">
          Review user complaints, appeals, and support requests.
        </p>
      </div>

      <div className="grid xl:grid-cols-[0.9fr_1.1fr] gap-6">
        <div className="bg-white border border-border-soft rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-border-soft">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, ID, subject..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-soft outline-none focus:border-primary text-sm"
              />
            </div>
          </div>

          <div className="max-h-[650px] overflow-y-auto">
            {isLoading ? (
              <p className="p-5 text-sm text-text-muted">Loading tickets...</p>
            ) : filteredTickets.length === 0 ? (
              <div className="p-8 text-center">
                <Inbox className="mx-auto text-text-muted" size={32} />
                <p className="text-sm text-text-muted mt-3">
                  No support tickets found.
                </p>
              </div>
            ) : (
              filteredTickets.map((ticket) => (
                <button
                  key={ticket._id}
                  type="button"
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setAdminNote(ticket.adminNote || "");
                  }}
                  className={`w-full text-left p-4 border-b border-border-soft hover:bg-surface transition ${
                    activeTicket?._id === ticket._id ? "bg-surface" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-text">
                        {ticket.subject}
                      </p>
                      <p className="text-xs text-text-muted mt-1">
                        {ticket.name} • {ticket.publicUserId || "No ID"}
                      </p>
                    </div>

                    <StatusBadge status={ticket.status} />
                  </div>

                  <p className="text-xs text-text-muted mt-2 line-clamp-2">
                    {ticket.message}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="bg-white border border-border-soft rounded-2xl p-6 min-h-[500px]">
          {!activeTicket ? (
            <div className="h-full flex items-center justify-center text-center text-text-muted">
              Select a ticket to view details.
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-text">
                    {activeTicket.subject}
                  </h2>
                  <p className="text-sm text-text-muted mt-1">
                    Submitted by {activeTicket.name}
                  </p>
                </div>

                <StatusBadge status={activeTicket.status} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Info label="Name" value={activeTicket.name} />
                <Info
                  label="Email"
                  value={activeTicket.email}
                  capitalize={false}
                />{" "}
                <Info label="Role" value={activeTicket.role} />
                <Info
                  label="User ID"
                  value={activeTicket.publicUserId || "N/A"}
                />
                <Info
                  label="Category"
                  value={activeTicket.category.replaceAll("_", " ")}
                />
                <Info
                  label="Submitted"
                  value={new Date(activeTicket.createdAt).toLocaleString()}
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-text-muted">
                  User message
                </p>
                <div className="mt-2 rounded-xl bg-surface border border-border-soft p-4 text-sm text-text leading-relaxed whitespace-pre-wrap">
                  {activeTicket.message}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-text-muted">
                  Admin note
                </p>
                <textarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  rows={5}
                  placeholder="Write internal note or response summary..."
                  className="mt-2 w-full px-4 py-3 rounded-xl border border-border-soft outline-none focus:border-primary text-sm resize-none"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    type="button"
                    disabled={updateMutation.isPending}
                    onClick={() => updateStatus(activeTicket, status)}
                    className="px-4 py-2 rounded-xl bg-surface text-sm font-semibold text-text-muted hover:bg-primary hover:text-white disabled:opacity-60 capitalize"
                  >
                    {status.replaceAll("_", " ")}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({
  label,
  value,
  capitalize = true,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="rounded-xl bg-surface border border-border-soft p-4">
      <p className="text-xs font-semibold uppercase text-text-muted">{label}</p>
      <p
        className={`text-sm font-semibold text-text mt-1 break-all ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: SupportTicketStatus }) {
  const styles = {
    open: "bg-amber-50 text-amber-700",
    in_review: "bg-blue-50 text-blue-700",
    resolved: "bg-green-50 text-green-700",
    rejected: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`text-[11px] px-2.5 py-1 rounded-full font-semibold capitalize ${styles[status]}`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}
