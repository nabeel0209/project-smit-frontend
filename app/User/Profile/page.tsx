"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Award,
  Banknote,
  Bell,
  BookOpen,
  Camera,
  CheckCircle,
  CreditCard,
  Download,
  Eye,
  Loader2,
  Lock,
  Mail,
  MapPin,
  Monitor,
  Phone,
  Save,
  Shield,
  ShieldCheck,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getMyProfile,
  StudentProfile,
  updateMyProfile,
  UpdateStudentProfilePayload,
} from "@/app/services/user";
import VerificationCard from "@/app/components/verification/VerificationCard";

type FormState = {
  name: string;
  displayName: string;
  dob: string;
  gender: "male" | "female" | "other";
  phone: string;
  bio: string;
  location: string;
  avatar: string;

  preferredDifficulty: "beginner" | "intermediate" | "advanced";
  dailyLearningGoal: "15_minutes" | "30_minutes" | "1_hour" | "no_goal";
  timezone: string;
  currency: string;
  interests: string[];

  cardholderName: string;
  cardNumber: string;
  cvv: string;
  expiryMonth: string;
  expiryYear: string;
  billingCountry: string;
};

const interestOptions = [
  "Web Development",
  "Design",
  "Marketing",
  "Data Science",
  "Business",
  "Mobile Apps",
  "AI",
  "Cyber Security",
];

const getInitialForm = (profile?: StudentProfile): FormState => ({
  name: profile?.name || "",
  displayName: profile?.displayName || profile?.name || "",
  dob: profile?.dob ? profile.dob.slice(0, 10) : "",
  gender: profile?.gender || "male",
  phone: profile?.phone || "",
  bio: profile?.bio || "",
  location: profile?.location || "",
  avatar: profile?.avatar || "",

  preferredDifficulty:
    profile?.learningPreferences?.preferredDifficulty || "beginner",
  dailyLearningGoal:
    profile?.learningPreferences?.dailyLearningGoal || "30_minutes",
  timezone: profile?.learningPreferences?.timezone || "Asia/Karachi",
  currency: profile?.learningPreferences?.currency || "PKR",
  interests: profile?.learningPreferences?.interests || [],

  cardholderName: profile?.paymentMethod?.cardholderName || "",
  cardNumber: "",
  cvv: "",
  expiryMonth: profile?.paymentMethod?.expiryMonth || "",
  expiryYear: profile?.paymentMethod?.expiryYear || "",
  billingCountry: profile?.paymentMethod?.billingCountry || "",
});

export default function ProfilePage() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [form, setForm] = useState<FormState>(getInitialForm());

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-student-profile"],
    queryFn: getMyProfile,
  });

  useEffect(() => {
    if (profile) {
      setForm(getInitialForm(profile));
    }
  }, [profile]);

  const updateMutation = useMutation({
    mutationFn: (payload: UpdateStudentProfilePayload) =>
      updateMyProfile(payload),
    onSuccess: () => {
      toast.success("Profile updated successfully.");
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["my-student-profile"] });
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    },
  });

  const handleChange = (field: keyof FormState, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleInterest = (interest: string) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    if (file.size > 1024 * 1024) {
      toast.error("Image must be less than 1MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      handleChange("avatar", reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    handleChange("avatar", "");
  };

  const handleSave = () => {
    const payload: UpdateStudentProfilePayload = {
      name: form.name,
      displayName: form.displayName,
      dob: form.dob,
      gender: form.gender,
      phone: form.phone,
      bio: form.bio,
      location: form.location,
      avatar: form.avatar,

      learningPreferences: {
        preferredDifficulty: form.preferredDifficulty,
        dailyLearningGoal: form.dailyLearningGoal,
        timezone: form.timezone,
        currency: form.currency,
        interests: form.interests,
      },

      paymentMethod: {
        cardholderName: form.cardholderName,
        cardNumber: form.cardNumber,
        cvv: form.cvv,
        expiryMonth: form.expiryMonth,
        expiryYear: form.expiryYear,
        billingCountry: form.billingCountry,
        currency: form.currency,
      },
    };

    updateMutation.mutate(payload);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-border-soft bg-surface focus:bg-white focus:border-primary outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm text-text";

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="bg-white rounded-2xl border border-border-soft p-8 text-center">
        <XCircle className="mx-auto text-red-500 mb-3" size={34} />
        <h1 className="text-lg font-bold text-text">Profile not found</h1>
        <p className="text-sm text-text-muted mt-1">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  const paymentConnected = Boolean(profile.paymentMethod?.connected);
  const hasGoogleAccount = profile.authProvider === "google";

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-primary-soft overflow-hidden bg-surface flex items-center justify-center">
              {form.avatar ? (
                <img
                  src={form.avatar}
                  alt={form.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 md:w-12 md:h-12 text-text-muted" />
              )}
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={!isEditing}
              className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              <Camera size={16} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarChange}
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-text">{form.name}</h1>

              <span className="px-2.5 py-1 rounded-full text-xs font-medium w-fit mx-auto md:mx-0 bg-surface text-text-muted">
                Student
              </span>
            </div>

            <p className="text-text-muted flex items-center justify-center md:justify-start gap-2 text-sm">
              <Mail size={15} />
              {profile.email}
            </p>

            <p className="text-text-muted text-sm mt-1">
              Student ID: {profile.studentId || "Pending"}
            </p>

            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={!isEditing}
                className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
              >
                Change picture
              </button>

              <button
                type="button"
                onClick={handleRemoveAvatar}
                disabled={!isEditing || !form.avatar}
                className="px-4 py-2 border border-border-soft text-text-muted rounded-xl text-sm font-medium hover:border-primary transition-colors disabled:opacity-50"
              >
                Remove avatar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition"
          >
            Edit profile
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                setForm(getInitialForm(profile));
                setIsEditing(false);
              }}
              className="px-5 py-2.5 rounded-xl bg-surface text-text-muted text-sm font-semibold"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={updateMutation.isPending}
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition disabled:opacity-60 flex items-center gap-2"
            >
              <Save size={16} />
              {updateMutation.isPending ? "Saving..." : "Save changes"}
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-6">
              <User className="text-primary" size={18} />
              Personal information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Full name">
                <input
                  type="text"
                  disabled={!isEditing}
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Display name">
                <input
                  type="text"
                  disabled={!isEditing}
                  value={form.displayName}
                  onChange={(e) => handleChange("displayName", e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Date of birth">
                <input
                  type="date"
                  disabled={!isEditing}
                  value={form.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Gender">
                <select
                  disabled={!isEditing}
                  value={form.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className={`${inputClass} appearance-none`}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </Field>

              <Field label="Phone number">
                <input
                  type="tel"
                  disabled={!isEditing}
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Location">
                <div className="relative">
                  <MapPin
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={form.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </Field>
            </div>

            <Field label="Bio" className="mt-5">
              <textarea
                rows={4}
                disabled={!isEditing}
                value={form.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                className={`${inputClass} resize-none`}
                placeholder="Tell us about yourself..."
              />
            </Field>
          </section>

          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-6">
              <BookOpen className="text-primary" size={18} />
              Learning preferences
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Preferred difficulty">
                <select
                  disabled={!isEditing}
                  value={form.preferredDifficulty}
                  onChange={(e) =>
                    handleChange("preferredDifficulty", e.target.value)
                  }
                  className={`${inputClass} appearance-none`}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </Field>

              <Field label="Daily learning goal">
                <select
                  disabled={!isEditing}
                  value={form.dailyLearningGoal}
                  onChange={(e) =>
                    handleChange("dailyLearningGoal", e.target.value)
                  }
                  className={`${inputClass} appearance-none`}
                >
                  <option value="15_minutes">15 minutes</option>
                  <option value="30_minutes">30 minutes</option>
                  <option value="1_hour">1 hour</option>
                  <option value="no_goal">No goal</option>
                </select>
              </Field>

              <Field label="Timezone">
                <select
                  disabled={!isEditing}
                  value={form.timezone}
                  onChange={(e) => handleChange("timezone", e.target.value)}
                  className={`${inputClass} appearance-none`}
                >
                  <option value="Asia/Karachi">Asia/Karachi (GMT+5)</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">
                    America/New_York (GMT-5)
                  </option>
                </select>
              </Field>

              <Field label="Currency">
                <select
                  disabled={!isEditing}
                  value={form.currency}
                  onChange={(e) => handleChange("currency", e.target.value)}
                  className={`${inputClass} appearance-none`}
                >
                  <option value="PKR">PKR (₨)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </Field>
            </div>

            <div className="mt-5 space-y-2.5">
              <p className="text-sm font-medium text-text">Interests</p>

              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => {
                  const selected = form.interests.includes(interest);

                  return (
                    <button
                      type="button"
                      disabled={!isEditing}
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors disabled:cursor-not-allowed ${
                        selected
                          ? "border-primary bg-primary-soft text-primary"
                          : "border-border-soft text-text-muted hover:border-primary hover:text-primary"
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-6">
              <CreditCard className="text-primary" size={18} />
              Payment method
            </h2>

            <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 mb-5">
              <p className="text-sm font-semibold text-blue-800">
                Card details are handled safely
              </p>
              <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                For now, Learnix Labs only saves safe card metadata such as card
                brand and last 4 digits. Full card number and CVV should be
                handled later through Stripe or another payment provider.
              </p>
            </div>

            {paymentConnected && (
              <div className="rounded-xl bg-green-50 border border-green-200 p-4 mb-5 flex items-center gap-3">
                <CheckCircle className="text-green-600 shrink-0" size={20} />
                <div>
                  <p className="text-sm font-semibold text-green-700">
                    Card connected
                  </p>
                  <p className="text-xs text-green-700">
                    {profile.paymentMethod?.cardBrand || "Card"} ending in{" "}
                    {profile.paymentMethod?.cardLast4}
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Cardholder name">
                <input
                  type="text"
                  disabled={!isEditing}
                  value={form.cardholderName}
                  onChange={(e) =>
                    handleChange("cardholderName", e.target.value)
                  }
                  className={inputClass}
                  placeholder="Muhammad Nabeel"
                />
              </Field>

              <Field label="Card number">
                <input
                  type="text"
                  disabled={!isEditing}
                  value={form.cardNumber}
                  onChange={(e) => {
                    const digitsOnly = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 16);

                    const formatted =
                      digitsOnly.match(/.{1,4}/g)?.join(" ") || "";

                    handleChange("cardNumber", formatted);
                  }}
                  maxLength={19}
                  className={inputClass}
                  placeholder={
                    profile.paymentMethod?.cardLast4
                      ? `•••• •••• •••• ${profile.paymentMethod.cardLast4}`
                      : "4242 4242 4242 4242"
                  }
                />
              </Field>

              <Field label="CVV">
                <input
                  type="password"
                  disabled={!isEditing}
                  value={form.cvv}
                  onChange={(e) =>
                    handleChange(
                      "cvv",
                      e.target.value.replace(/\D/g, "").slice(0, 4),
                    )
                  }
                  maxLength={4}
                  className={inputClass}
                  placeholder="123"
                />
              </Field>

              <Field label="Expiry month">
                <select
                  disabled={!isEditing}
                  value={form.expiryMonth}
                  onChange={(e) => handleChange("expiryMonth", e.target.value)}
                  className={`${inputClass} appearance-none`}
                >
                  <option value="">Month</option>
                  {Array.from({ length: 12 }, (_, index) => {
                    const month = String(index + 1).padStart(2, "0");
                    return (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    );
                  })}
                </select>
              </Field>

              <Field label="Expiry year">
                <select
                  disabled={!isEditing}
                  value={form.expiryYear}
                  onChange={(e) => handleChange("expiryYear", e.target.value)}
                  className={`${inputClass} appearance-none`}
                >
                  <option value="">Year</option>
                  {Array.from({ length: 12 }, (_, index) => {
                    const year = String(new Date().getFullYear() + index);
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </Field>

              <Field label="Billing country">
                <input
                  type="text"
                  disabled={!isEditing}
                  value={form.billingCountry}
                  onChange={(e) =>
                    handleChange("billingCountry", e.target.value)
                  }
                  className={inputClass}
                  placeholder="Pakistan"
                />
              </Field>

              <Field label="Payment currency">
                <select
                  disabled={!isEditing}
                  value={form.currency}
                  onChange={(e) => handleChange("currency", e.target.value)}
                  className={`${inputClass} appearance-none`}
                >
                  <option value="PKR">PKR (₨)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </Field>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-6">
              <Award className="text-primary" size={18} />
              Certificates
            </h2>

            <div className="rounded-xl bg-surface border border-border-soft p-4">
              <p className="text-sm font-semibold text-text">
                No certificates yet
              </p>
              <p className="text-xs text-text-muted mt-1">
                Certificates will appear here after you complete courses.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-5">
              <ShieldCheck className="text-primary" size={18} />
              Two-factor authentication
            </h2>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text">
                  Authenticator app
                </p>
                <p className="text-xs text-text-muted mt-0.5">Not enabled</p>
              </div>

              <button
                type="button"
                disabled
                className="px-4 py-2 bg-surface text-text-muted rounded-xl text-sm font-medium cursor-not-allowed"
              >
                Coming soon
              </button>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-6">
              <Shield className="text-primary" size={18} />
              Account & security
            </h2>

            <div className="space-y-4">
              <Field label="Email address">
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface text-text-muted text-sm">
                  {profile.email}
                  <Lock size={13} />
                </div>
              </Field>

              <div className="pt-2 grid gap-3">
                {" "}
                <VerificationCard
                  type="email"
                  title="Email verification"
                  description="Verify your email address to improve account security and support access."
                  isVerified={Boolean(
                    profile.emailVerified || hasGoogleAccount,
                  )}
                  queryKeyToRefresh="my-student-profile"
                />
                <VerificationCard
                  type="phone"
                  title="Phone verification"
                  description="Verify your phone number for account recovery and future payment security."
                  isVerified={Boolean(profile.phoneVerified)}
                  queryKeyToRefresh="my-student-profile"
                />
              </div>
              <div className="pt-2 space-y-3">
                <h3 className="text-sm font-semibold text-text">
                  Update password
                </h3>

                {hasGoogleAccount ? (
                  <div className="rounded-xl bg-surface border border-border-soft p-4">
                    <p className="text-sm text-text-muted">
                      Password update is unavailable because this account uses
                      Google login.
                    </p>
                  </div>
                ) : (
                  <>
                    <input
                      type="password"
                      placeholder="Current password"
                      className={inputClass}
                    />
                    <input
                      type="password"
                      placeholder="New password"
                      className={inputClass}
                    />
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      disabled
                      className="w-full py-3 bg-text text-white rounded-xl text-sm font-medium opacity-60 cursor-not-allowed"
                    >
                      Coming soon
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-6">
              <Bell className="text-primary" size={18} />
              Preferences
            </h2>

            <div className="space-y-5">
              <ToggleRow
                title="Dark mode"
                subtitle="Theme setting coming soon"
              />
              <ToggleRow
                title="Email notifications"
                subtitle="Course updates and platform announcements"
                active
              />
              <ToggleRow
                title="Public profile"
                subtitle="Let others see your learning activity"
              />
            </div>
          </section>

          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-5">
              <Monitor className="text-primary" size={18} />
              Active sessions
            </h2>

            <div className="rounded-xl bg-surface border border-border-soft p-4">
              <p className="text-sm font-semibold text-text">Current device</p>
              <p className="text-xs text-text-muted mt-1">
                Session management will be added later.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-5">
              <Eye className="text-primary" size={18} />
              Privacy
            </h2>

            <button
              type="button"
              disabled
              className="w-full flex items-center justify-center gap-2 py-3 border border-border-soft text-text-muted rounded-xl text-sm font-medium opacity-60 cursor-not-allowed"
            >
              <Download size={15} />
              Export my data
            </button>
          </section>

          <section className="bg-red-50 rounded-2xl p-6 md:p-8 border border-red-100">
            <h2 className="text-lg font-bold text-red-900 flex items-center gap-2 mb-3">
              <Trash2 className="text-red-500" size={18} />
              Danger zone
            </h2>

            <p className="text-red-700 text-sm mb-5 leading-relaxed">
              Account deletion will be added later with confirmation and safety
              checks.
            </p>

            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="w-full py-3 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors"
            >
              Delete account
            </button>
          </section>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full border border-border-soft">
            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-5">
              <Trash2 size={26} />
            </div>

            <h3 className="text-xl font-bold text-center text-text mb-2">
              Delete account?
            </h3>

            <p className="text-text-muted text-center text-sm mb-7">
              This feature is not enabled yet. Later it should require password
              confirmation and maybe email OTP.
            </p>

            <button
              type="button"
              onClick={() => setShowDeleteModal(false)}
              className="w-full py-3 bg-surface text-text-muted rounded-xl font-medium hover:bg-border-soft transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label className="text-sm font-medium text-text-muted">{label}</label>
      {children}
    </div>
  );
}

function ToggleRow({
  title,
  subtitle,
  active = false,
}: {
  title: string;
  subtitle: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-text">{title}</p>
        <p className="text-xs text-text-muted">{subtitle}</p>
      </div>

      <div
        className={`w-11 h-6 rounded-full relative cursor-not-allowed ${
          active ? "bg-primary" : "bg-border-soft"
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full ${
            active ? "right-1" : "left-1"
          }`}
        />
      </div>
    </div>
  );
}
