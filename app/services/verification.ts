import api from "./axios";

export type OtpPurpose = "email_verification" | "phone_verification";

export const sendEmailOtp = async (): Promise<{
  message: string;
  devOtp?: string;
}> => {
  const res = await api.post("/verification/email/send");
  return res.data;
};

export const sendPhoneOtp = async (): Promise<{
  message: string;
  devOtp?: string;
}> => {
  const res = await api.post("/verification/phone/send");
  return res.data;
};

export const verifyOtp = async (payload: {
  purpose: OtpPurpose;
  otp: string;
}): Promise<{
  message: string;
}> => {
  const res = await api.post("/verification/verify", payload);
  return res.data;
};
