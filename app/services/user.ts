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
