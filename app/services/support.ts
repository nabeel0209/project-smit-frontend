import api from "./axios";

export type SupportTicketCategory =
  | "account_suspension"
  | "creator_verification"
  | "payment_billing"
  | "course_issue"
  | "technical_issue"
  | "general_support";

export type SupportTicketStatus =
  | "open"
  | "in_review"
  | "resolved"
  | "rejected";

export interface SupportTicket {
  _id: string;
  user: any;
  name: string;
  email: string;
  publicUserId?: string;
  role: "user" | "creator" | "admin" | "moderator";
  category: SupportTicketCategory;
  subject: string;
  message: string;
  status: SupportTicketStatus;
  adminNote?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export const createSupportTicket = async (payload: {
  category: SupportTicketCategory;
  subject: string;
  message: string;
}): Promise<SupportTicket> => {
  const res = await api.post("/support/tickets", payload);
  return res.data.ticket;
};

export const getMySupportTickets = async (): Promise<SupportTicket[]> => {
  const res = await api.get("/support/tickets/my");
  return res.data.tickets;
};

export const getAdminSupportTickets = async (): Promise<SupportTicket[]> => {
  const res = await api.get("/support/admin/tickets");
  return res.data.tickets;
};

export const updateSupportTicketStatus = async ({
  ticketId,
  status,
  adminNote,
}: {
  ticketId: string;
  status: SupportTicketStatus;
  adminNote?: string;
}): Promise<SupportTicket> => {
  const res = await api.patch(`/support/admin/tickets/${ticketId}`, {
    status,
    adminNote,
  });

  return res.data.ticket;
};
