import api from "./axios";
import { CreatorProfile } from "./creator";

export interface AdminUser {
  _id: string;

  studentId?: string;
  creatorId?: string;
  adminId?: string;
  moderatorId?: string;

  name: string;
  email: string;
  avatar?: string;
  role: "user" | "creator" | "admin" | "moderator";
  status?: "active" | "suspended" | "banned";
  dob?: string;
  gender?: string;
  phone?: string;
  phoneVerified?: boolean;
  authProvider?: "local" | "google";
  createdAt: string;

  paymentMethod?: {
    cardholderName?: string;
    cardBrand?: string;
    cardLast4?: string;
    expiryMonth?: string;
    expiryYear?: string;
    billingCountry?: string;
    currency?: string;
    connected?: boolean;
  };

  suspension?: {
    isPermanent?: boolean;
    reason?: string;
    duration?: "3_days" | "7_days" | "1_month" | "3_months" | "permanent";
    suspendedAt?: string;
    suspendedUntil?: string;
    suspendedBy?: string;
  };
}

export interface AdminUsersResponse {
  users: AdminUser[];
  creators: CreatorProfile[];
}

export const getPublicUserId = (user: Partial<AdminUser>) => {
  if (user.role === "admin") return user.adminId;
  if (user.role === "creator") return user.creatorId;
  if (user.role === "moderator") return user.moderatorId;
  return user.studentId;
};

export const getPublicUserIdLabel = (role?: string) => {
  if (role === "admin") return "Admin ID";
  if (role === "creator") return "Creator ID";
  if (role === "moderator") return "Moderator ID";
  return "Student ID";
};

export const getAdminUsers = async (): Promise<AdminUsersResponse> => {
  const res = await api.get("/admin/users");
  return res.data;
};

export const approveCreator = async (profileId: string) => {
  const res = await api.patch(`/admin/creators/${profileId}/approve`);
  return res.data.profile;
};

export const rejectCreator = async (profileId: string, reason: string) => {
  const res = await api.patch(`/admin/creators/${profileId}/reject`, {
    reason,
  });

  return res.data.profile;
};

export const getAdminUserDetails = async (publicId: string) => {
  const res = await api.get(`/admin/users/${publicId}`);
  return res.data.user;
};

export const getAdminCreatorDetails = async (id: string) => {
  const res = await api.get(`/admin/creators/${id}`);
  return res.data.creator;
};

export type SuspensionDuration =
  | "3_days"
  | "7_days"
  | "1_month"
  | "3_months"
  | "permanent";

export const suspendUser = async ({
  id,
  duration,
  reason,
}: {
  id: string;
  duration: SuspensionDuration;
  reason: string;
}): Promise<AdminUser> => {
  const res = await api.patch(`/admin/users/${id}/suspend`, {
    duration,
    reason,
  });

  return res.data.user;
};

export const reactivateUser = async (id: string): Promise<AdminUser> => {
  const res = await api.patch(`/admin/users/${id}/reactivate`);
  return res.data.user;
};
