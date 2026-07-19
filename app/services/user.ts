import api from "./axios";

export interface StudentProfile {
  _id: string;
  studentId?: string;
  name: string;
  displayName?: string;
  email: string;
  role: "user";
  dob?: string;
  gender?: "male" | "female" | "other";
  phone?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  avatar?: string;
  bio?: string;
  location?: string;
  authProvider?: "local" | "google";
  createdAt?: string;

  learningPreferences?: {
    preferredDifficulty?: "beginner" | "intermediate" | "advanced";
    dailyLearningGoal?: "15_minutes" | "30_minutes" | "1_hour" | "no_goal";
    timezone?: string;
    currency?: string;
    interests?: string[];
  };

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
  status?: "active" | "suspended";

  suspension?: {
    isPermanent?: boolean;
    reason?: string;
    duration?: "3_days" | "7_days" | "1_month" | "3_months" | "permanent";
    suspendedAt?: string;
    suspendedUntil?: string;
    suspendedBy?: string;
  };
}

export interface UpdateStudentProfilePayload {
  name?: string;
  displayName?: string;
  dob?: string;
  gender?: "male" | "female" | "other";
  phone?: string;
  avatar?: string;
  bio?: string;
  location?: string;

  learningPreferences?: {
    preferredDifficulty?: "beginner" | "intermediate" | "advanced";
    dailyLearningGoal?: "15_minutes" | "30_minutes" | "1_hour" | "no_goal";
    timezone?: string;
    currency?: string;
    interests?: string[];
  };

  paymentMethod?: {
    cardholderName?: string;
    cardNumber?: string;
    cvv?: string;
    expiryMonth?: string;
    expiryYear?: string;
    billingCountry?: string;
    currency?: string;
  };
}

export const getMyProfile = async (): Promise<StudentProfile> => {
  const res = await api.get("/user/me");
  return res.data.user;
};

export const updateMyProfile = async (
  payload: UpdateStudentProfilePayload,
): Promise<StudentProfile> => {
  const res = await api.patch("/user/me/profile", payload);
  return res.data.user;
};

export interface CurrentAccount {
  _id: string;
  name: string;
  email: string;
  role: "user" | "creator" | "admin" | "moderator";
  studentId?: string;
  creatorId?: string;
  adminId?: string;
  moderatorId?: string;
  status?: "active" | "suspended";
  suspension?: {
    isPermanent?: boolean;
    reason?: string;
    duration?: "3_days" | "7_days" | "1_month" | "3_months" | "permanent";
    suspendedAt?: string;
    suspendedUntil?: string;
    suspendedBy?: string;
  };
}

export const getCurrentAccount = async (): Promise<CurrentAccount> => {
  const res = await api.get("/user/me");
  return res.data.user;
};

export const getCurrentAccountId = (user?: CurrentAccount) => {
  if (!user) return "";

  if (user.role === "admin") return user.adminId || user._id;
  if (user.role === "creator") return user.creatorId || user._id;
  if (user.role === "moderator") return user.moderatorId || user._id;

  return user.studentId || user._id;
};

export const getCurrentAccountIdLabel = (role?: string) => {
  if (role === "admin") return "Admin ID";
  if (role === "creator") return "Creator ID";
  if (role === "moderator") return "Moderator ID";

  return "Student ID";
};
