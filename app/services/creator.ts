import api from "./axios";

export type CreatorProfileStatus =
  | "incomplete"
  | "pending_verification"
  | "pending_admin_review"
  | "approved"
  | "rejected"
  | "suspended";

export interface CreatorUser {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "creator" | "admin";
  dob?: string;
  gender?: string;
}

export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface CreatorPreferences {
  defaultLanguage: string;
  payoutCurrency: string;
  timezone: string;
  defaultVisibility: "draft" | "public";
  watermarkVideos: boolean;
  autoPublishLessons: boolean;
}

export interface CreatorProfile {
  _id: string;
  user: CreatorUser;
  displayName: string;
  bio: string;
  phone: string;
  location: string;

  qualification: string;
  expertise: string;
  skills: string[];
  experienceYears: number;
  teachingExperience: string;

  socialLinks: SocialLinks;
  categories: string[];
  profileStatus: CreatorProfileStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  identityVerified: boolean;
  payoutMethodVerified: boolean;
  rejectionReason?: string;
  preferences: CreatorPreferences;
  createdAt: string;
  updatedAt: string;

  payoutDetails: PayoutDetails;
}

export type PayoutMethod = "bank_transfer" | "paypal" | "stripe";

export interface PayoutDetails {
  method: PayoutMethod;
  accountHolderName?: string;
  bankName?: string;
  accountNumber?: string;
  iban?: string;
  paypalEmail?: string;
  stripeAccountId?: string;
  billingCountry?: string;
  platformFeePercent: number;
  connected: boolean;
}

export interface UpdateCreatorProfilePayload {
  displayName?: string;
  bio?: string;
  phone?: string;
  location?: string;

  qualification?: string;
  expertise?: string;
  skills?: string[];
  experienceYears?: number;
  teachingExperience?: string;

  socialLinks?: SocialLinks;
  categories?: string[];
  preferences?: Partial<CreatorPreferences>;

  payoutDetails?: Partial<PayoutDetails>;
}

export const getMyCreatorProfile = async (): Promise<CreatorProfile> => {
  const res = await api.get("/creator/profile/me");
  return res.data.profile;
};

export const updateMyCreatorProfile = async (
  payload: UpdateCreatorProfilePayload,
): Promise<CreatorProfile> => {
  const res = await api.patch("/creator/profile/me", payload);
  return res.data.profile;
};

export const submitCreatorProfileForReview =
  async (): Promise<CreatorProfile> => {
    const res = await api.post("/creator/profile/submit-review");
    return res.data.profile;
  };
