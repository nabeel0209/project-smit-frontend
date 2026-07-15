"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  MapPin,
  Camera,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Shield,
  CheckCircle,
  Edit2,
  Save,
  BadgeCheck,
  GraduationCap,
  AlertCircle,
  Loader2,
  Lock,
  AlertTriangle,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getMyCreatorProfile,
  updateMyCreatorProfile,
  CreatorProfile,
  UpdateCreatorProfilePayload,
} from "@/app/services/creator";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-border-soft bg-surface focus:bg-white focus:border-primary outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm text-text";

const categoryOptions = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Artificial Intelligence",
  "UI/UX Design",
  "Business",
  "Marketing",
  "Cybersecurity",
];

type FormState = {
  displayName: string;
  bio: string;
  phone: string;
  location: string;
  qualification: string;
  expertise: string;
  experienceYears: string;
  teachingExperience: string;
  skills: string;
  categories: string[];
  website: string;
  twitter: string;
  linkedin: string;
  github: string;
  defaultLanguage: string;
  payoutCurrency: string;
  timezone: string;
  defaultVisibility: "draft" | "public";
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  iban: string;
  payoutMethod: "bank_transfer" | "paypal" | "stripe";
  paypalEmail: string;
  stripeAccountId: string;
  billingCountry: string;
};

const getInitialForm = (profile: CreatorProfile): FormState => ({
  displayName: profile.displayName || "",
  bio: profile.bio || "",
  phone: profile.phone || "",
  location: profile.location || "",
  qualification: profile.qualification || "",
  expertise: profile.expertise || "",
  experienceYears: String(profile.experienceYears || 0),
  teachingExperience: profile.teachingExperience || "",
  skills: profile.skills?.join(", ") || "",
  categories: profile.categories || [],
  website: profile.socialLinks?.website || "",
  twitter: profile.socialLinks?.twitter || "",
  linkedin: profile.socialLinks?.linkedin || "",
  github: profile.socialLinks?.github || "",
  defaultLanguage: profile.preferences?.defaultLanguage || "English",
  payoutCurrency: profile.preferences?.payoutCurrency || "USD",
  timezone: profile.preferences?.timezone || "Asia/Karachi",
  defaultVisibility: profile.preferences?.defaultVisibility || "draft",
  accountHolderName: profile.payoutDetails?.accountHolderName || "",
  bankName: profile.payoutDetails?.bankName || "",
  accountNumber: profile.payoutDetails?.accountNumber || "",
  iban: profile.payoutDetails?.iban || "",
  payoutMethod: profile.payoutDetails?.method || "bank_transfer",
  paypalEmail: profile.payoutDetails?.paypalEmail || "",
  stripeAccountId: profile.payoutDetails?.stripeAccountId || "",
  billingCountry: profile.payoutDetails?.billingCountry || "",
});

export default function CreatorProfilePage() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<FormState | null>(null);

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["creator-profile"],
    queryFn: getMyCreatorProfile,
  });

  useEffect(() => {
    if (profile) {
      setForm(getInitialForm(profile));
    }
  }, [profile]);

  const updateMutation = useMutation({
    mutationFn: updateMyCreatorProfile,
    onSuccess: (updatedProfile) => {
      queryClient.invalidateQueries({ queryKey: ["creator-profile"] });

      if (updatedProfile.profileStatus === "pending_admin_review") {
        toast.success("Profile saved and submitted for admin review.");
      } else if (updatedProfile.profileStatus === "pending_verification") {
        toast.success("Profile saved. Verification is still required.");
      } else {
        toast.success("Creator profile updated.");
      }

      setIsEditing(false);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    },
  });

  if (isLoading || !form) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="bg-white border border-border-soft rounded-2xl p-8 text-center">
        <AlertCircle className="mx-auto text-red-500 mb-3" size={32} />
        <h2 className="text-lg font-bold text-text">
          Failed to load creator profile
        </h2>
        <p className="text-sm text-text-muted mt-1">
          Please refresh the page or login again.
        </p>
      </div>
    );
  }

  const user = profile.user;

  const isVerified = profile.emailVerified && profile.phoneVerified;

  const hasPayoutDetails = Boolean(profile.payoutDetails?.connected);

  const isPendingAdminReview = profile.profileStatus === "pending_admin_review";

  const handleChange = (key: keyof FormState, value: string | string[]) => {
    setForm((prev) => {
      if (!prev) return prev;
      return { ...prev, [key]: value };
    });
  };

  const toggleCategory = (category: string) => {
    setForm((prev) => {
      if (!prev) return prev;

      const exists = prev.categories.includes(category);

      return {
        ...prev,
        categories: exists
          ? prev.categories.filter((item) => item !== category)
          : [...prev.categories, category],
      };
    });
  };

  const handleSave = () => {
    const payload: UpdateCreatorProfilePayload = {
      displayName: form.displayName,
      bio: form.bio,
      phone: form.phone,
      location: form.location,
      qualification: form.qualification,
      expertise: form.expertise,
      experienceYears: Number(form.experienceYears) || 0,
      teachingExperience: form.teachingExperience,
      skills: form.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      categories: form.categories,
      socialLinks: {
        website: form.website,
        twitter: form.twitter,
        linkedin: form.linkedin,
        github: form.github,
      },
      preferences: {
        defaultLanguage: form.defaultLanguage,
        payoutCurrency: form.payoutCurrency,
        timezone: form.timezone,
        defaultVisibility: form.defaultVisibility,
      },
      payoutDetails: {
        method: form.payoutMethod,
        accountHolderName: form.accountHolderName,
        bankName: form.bankName,
        accountNumber: form.accountNumber,
        iban: form.iban,
        paypalEmail: form.paypalEmail,
        stripeAccountId: form.stripeAccountId,
        billingCountry: form.billingCountry,
      },
    };

    updateMutation.mutate(payload);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-primary-soft overflow-hidden bg-surface flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 md:w-12 md:h-12 text-text-muted" />
              )}
            </div>

            <button
              type="button"
              disabled
              className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full opacity-60 cursor-not-allowed"
              title="Avatar upload will be added later"
            >
              <Camera size={16} />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-text">{user.name}</h1>

              <span className="px-2.5 py-1 rounded-full text-xs font-medium w-fit mx-auto md:mx-0 bg-primary-soft text-primary">
                Creator
              </span>

              <ProfileStatusBadge status={profile.profileStatus} />
            </div>

            <p className="text-text-muted flex items-center justify-center md:justify-start gap-2 text-sm">
              <Mail size={15} />
              {user.email}
            </p>

            <p className="text-xs text-text-muted mt-2">
              Basic signup details are shown here but locked. Creator-specific
              details can be edited below.
            </p>
          </div>
        </div>
      </div>

      {profile.profileStatus !== "approved" && (
        <section
          className={`rounded-2xl p-5 border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            isPendingAdminReview
              ? "bg-blue-50 border-blue-200"
              : "bg-amber-50 border-amber-200"
          }`}
        >
          <div className="flex gap-3">
            <AlertCircle
              className={
                isPendingAdminReview ? "text-blue-700" : "text-amber-700"
              }
              size={20}
            />

            <div>
              <h2
                className={`font-semibold text-sm ${
                  isPendingAdminReview ? "text-blue-900" : "text-amber-900"
                }`}
              >
                {isPendingAdminReview
                  ? "Profile submitted for admin approval"
                  : !isVerified
                    ? "Verify your email and phone"
                    : !hasPayoutDetails
                      ? "Add your payout method"
                      : "Profile ready for admin review"}
              </h2>

              <p
                className={`text-sm mt-1 ${
                  isPendingAdminReview ? "text-blue-800" : "text-amber-800"
                }`}
              >
                {isPendingAdminReview
                  ? "Your profile has been sent for Admin review. This process typically takes ~24 hours. After the review, you'll be able to upload your content and access all creator tools."
                  : !isVerified
                    ? "After verification, you’ll be asked to add bank details before admin review."
                    : !hasPayoutDetails
                      ? "Your email and phone are verified. Add bank details and save to submit your profile."
                      : "Save your profile to send it for admin review."}
              </p>
            </div>
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="md:col-span-2 space-y-8">
          {/* Signup information */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-6">
              <Lock className="text-primary" size={18} />
              Signup information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <ReadonlyField label="Full name" value={user.name} />
              <ReadonlyField label="Email" value={user.email} />
              <ReadonlyField
                label="Date of birth"
                value={user.dob || "Not set"}
              />
              <ReadonlyField label="Gender" value={user.gender || "Not set"} />
            </div>
          </section>

          {/* Creator profile */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-text flex items-center gap-2">
                  <Globe className="text-primary" size={18} />
                  Public creator profile
                </h2>
                <p className="text-sm text-text-muted mt-1">
                  This is what students and admins will see.
                </p>
              </div>

              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  disabled={isPendingAdminReview}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary-soft rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Edit2 size={15} /> Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setForm(getInitialForm(profile));
                      setIsEditing(false);
                    }}
                    className="px-3 py-1.5 text-sm font-medium text-text-muted hover:bg-surface rounded-lg transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={updateMutation.isPending}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors disabled:opacity-60"
                  >
                    <Save size={15} />
                    {updateMutation.isPending ? "Saving..." : "Save"}
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-5">
              <InputField
                label="Display name"
                value={form.displayName}
                disabled={!isEditing}
                onChange={(value) => handleChange("displayName", value)}
              />

              <TextareaField
                label="Bio"
                value={form.bio}
                disabled={!isEditing}
                rows={4}
                onChange={(value) => handleChange("bio", value)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField
                  label="Phone number"
                  type="tel"
                  value={form.phone}
                  disabled={!isEditing}
                  onChange={(value) => handleChange("phone", value)}
                />

                <InputField
                  label="Location"
                  value={form.location}
                  disabled={!isEditing}
                  onChange={(value) => handleChange("location", value)}
                />
              </div>
            </div>
          </section>

          {/* Professional details */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-6">
              <GraduationCap className="text-primary" size={18} />
              Professional details
            </h2>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField
                  label="Highest qualification"
                  value={form.qualification}
                  disabled={!isEditing}
                  placeholder="BS Computer Science, Diploma, Certification..."
                  onChange={(value) => handleChange("qualification", value)}
                />

                <InputField
                  label="Main expertise"
                  value={form.expertise}
                  disabled={!isEditing}
                  placeholder="MERN Stack, UI/UX, Python..."
                  onChange={(value) => handleChange("expertise", value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField
                  label="Years of experience"
                  type="number"
                  value={form.experienceYears}
                  disabled={!isEditing}
                  onChange={(value) => handleChange("experienceYears", value)}
                />

                <InputField
                  label="Skills"
                  value={form.skills}
                  disabled={!isEditing}
                  placeholder="React, Node.js, MongoDB"
                  onChange={(value) => handleChange("skills", value)}
                />
              </div>

              <TextareaField
                label="Teaching experience"
                value={form.teachingExperience}
                disabled={!isEditing}
                rows={4}
                placeholder="Tell admins about your teaching or mentoring experience..."
                onChange={(value) => handleChange("teachingExperience", value)}
              />
            </div>
          </section>

          {/* Teaching preferences */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-6">
              <GraduationCap className="text-primary" size={18} />
              Teaching preferences
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SelectField
                label="Default course language"
                value={form.defaultLanguage}
                disabled={!isEditing}
                options={["English", "Urdu", "Spanish"]}
                onChange={(value) => handleChange("defaultLanguage", value)}
              />

              <SelectField
                label="Payout currency"
                value={form.payoutCurrency}
                disabled={!isEditing}
                options={["USD", "PKR", "EUR"]}
                onChange={(value) => handleChange("payoutCurrency", value)}
              />

              <SelectField
                label="Timezone"
                value={form.timezone}
                disabled={!isEditing}
                options={["Asia/Karachi", "UTC", "America/New_York"]}
                onChange={(value) => handleChange("timezone", value)}
              />

              <SelectField
                label="Default course visibility"
                value={form.defaultVisibility}
                disabled={!isEditing}
                options={["draft", "public"]}
                onChange={(value) =>
                  handleChange("defaultVisibility", value as "draft" | "public")
                }
              />
            </div>

            <div className="mt-6 space-y-2.5">
              <p className="text-sm font-medium text-text">
                Teaching categories
              </p>

              <div className="flex flex-wrap gap-2">
                {categoryOptions.map((category) => {
                  const selected = form.categories.includes(category);

                  return (
                    <button
                      key={category}
                      type="button"
                      disabled={!isEditing}
                      onClick={() => toggleCategory(category)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors disabled:cursor-not-allowed ${
                        selected
                          ? "bg-primary text-white border-primary"
                          : "border-border-soft text-text-muted hover:border-primary hover:text-primary"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Payout Method */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-text flex items-center gap-2">
                  <BadgeCheck className="text-primary" size={18} />
                  Payout method
                </h2>

                <p className="text-sm text-text-muted mt-1 max-w-2xl">
                  Choose how you want to receive creator earnings.
                </p>
              </div>

              {profile.payoutDetails?.connected && (
                <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-semibold w-fit">
                  Payout method added
                </span>
              )}
            </div>

            {!isVerified && (
              <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
                Verify your email and phone before adding payout details.
              </div>
            )}

            {isPendingAdminReview && (
              <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-sm text-blue-800">
                Your payout details are saved and your profile is already
                submitted for admin review.
              </div>
            )}

            <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex gap-3">
              <AlertTriangle
                className="text-amber-700 mt-0.5 flex-shrink-0"
                size={18}
              />

              <div>
                <p className="text-sm font-semibold text-amber-900">
                  Platform fee notice
                </p>

                <p className="text-sm text-amber-800 mt-1 leading-relaxed">
                  Learnix Labs deducts 2% from creator earnings for platform
                  maintenance, payment handling, and service costs.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {[
                {
                  label: "Bank transfer",
                  value: "bank_transfer",
                  description: "Receive payouts directly in your bank account.",
                  disabled: false,
                },
                {
                  label: "PayPal",
                  value: "paypal",
                  description: "PayPal payouts are coming soon.",
                  disabled: true,
                },
              ].map((method) => {
                const isSelected = form.payoutMethod === method.value;
                const methodDisabled =
                  method.disabled ||
                  !isEditing ||
                  !isVerified ||
                  isPendingAdminReview;

                return (
                  <button
                    key={method.value}
                    type="button"
                    disabled={methodDisabled}
                    onClick={() => {
                      if (method.disabled) return;

                      handleChange(
                        "payoutMethod",
                        method.value as "bank_transfer" | "paypal",
                      );
                    }}
                    className={`text-left p-4 rounded-2xl border transition-all disabled:cursor-not-allowed ${
                      method.disabled
                        ? "border-border-soft bg-surface opacity-60"
                        : isSelected
                          ? "border-primary bg-primary-soft"
                          : "border-border-soft bg-surface hover:border-primary"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p
                        className={`text-sm font-semibold ${
                          method.disabled
                            ? "text-text-muted"
                            : isSelected
                              ? "text-primary"
                              : "text-text"
                        }`}
                      >
                        {method.label}
                      </p>

                      {method.disabled ? (
                        <span className="px-2 py-0.5 rounded-full bg-white border border-border-soft text-[10px] font-semibold text-text-muted">
                          Coming soon
                        </span>
                      ) : (
                        <span
                          className={`w-4 h-4 rounded-full border flex-shrink-0 ${
                            isSelected
                              ? "border-primary bg-primary"
                              : "border-border-soft bg-white"
                          }`}
                        />
                      )}
                    </div>

                    <p className="text-xs text-text-muted mt-1 leading-relaxed">
                      {method.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {form.payoutMethod === "bank_transfer" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField
                  label="Account holder name"
                  value={form.accountHolderName}
                  disabled={!isEditing || !isVerified || isPendingAdminReview}
                  placeholder="Muhammad Nabeel"
                  onChange={(value) => handleChange("accountHolderName", value)}
                />

                <InputField
                  label="Bank name"
                  value={form.bankName}
                  disabled={!isEditing || !isVerified || isPendingAdminReview}
                  placeholder="Meezan Bank"
                  onChange={(value) => handleChange("bankName", value)}
                />

                <InputField
                  label="Account number"
                  value={form.accountNumber}
                  disabled={!isEditing || !isVerified || isPendingAdminReview}
                  placeholder="0123456789012345"
                  onChange={(value) => handleChange("accountNumber", value)}
                />

                <InputField
                  label="IBAN"
                  value={form.iban}
                  disabled={!isEditing || !isVerified || isPendingAdminReview}
                  placeholder="PK36SCBL0000001123456702"
                  onChange={(value) =>
                    handleChange("iban", value.toUpperCase())
                  }
                />

                <div className="md:col-span-2">
                  <InputField
                    label="Billing country"
                    value={form.billingCountry}
                    disabled={!isEditing || !isVerified || isPendingAdminReview}
                    placeholder="Pakistan"
                    onChange={(value) => handleChange("billingCountry", value)}
                  />
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-8">
          {/* Verification */}
          <section className="bg-primary-soft rounded-2xl p-6 md:p-8 border border-primary/20">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-3">
              <BadgeCheck className="text-primary" size={18} />
              Verification
            </h2>

            <p className="text-text-muted text-sm mb-5 leading-relaxed">
              Verified creators build more trust with students and get approval
              faster.
            </p>

            <div className="space-y-2.5">
              <VerificationItem
                label="Email verified"
                verified={profile.emailVerified}
              />

              <VerificationItem
                label="Phone verified"
                verified={profile.phoneVerified}
              />

              <VerificationItem
                label="Identity verified"
                verified={profile.identityVerified}
              />

              <VerificationItem
                label="Payout method"
                verified={Boolean(profile.payoutDetails?.connected)}
              />
            </div>
          </section>

          {/* Social links */}
          {/* Social links */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-3">
              <Globe className="text-primary" size={18} />
              Social links
            </h2>

            <p className="text-sm text-text-muted mb-5">
              Optional links shown on your public creator profile.
            </p>

            <div className="space-y-3">
              <SocialInput
                icon={Globe}
                label="Website"
                value={form.website}
                disabled={!isEditing || isPendingAdminReview}
                onChange={(value) => handleChange("website", value)}
              />

              <SocialInput
                icon={Linkedin}
                label="LinkedIn"
                value={form.linkedin}
                disabled={!isEditing || isPendingAdminReview}
                onChange={(value) => handleChange("linkedin", value)}
              />

              <SocialInput
                icon={Github}
                label="GitHub"
                value={form.github}
                disabled={!isEditing || isPendingAdminReview}
                onChange={(value) => handleChange("github", value)}
              />

              <SocialInput
                icon={Twitter}
                label="Twitter/X"
                value={form.twitter}
                disabled={!isEditing || isPendingAdminReview}
                onChange={(value) => handleChange("twitter", value)}
              />
            </div>
          </section>

          {/* Account security */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-6">
              <Shield className="text-primary" size={18} />
              Account & security
            </h2>

            <div className="space-y-4">
              <ReadonlyField label="Email address" value={user.email} />
              <ReadonlyField
                label="Account role"
                value={user.role || "creator"}
              />

              <div className="pt-4 border-t border-border-soft">
                <p className="text-xs text-text-muted leading-relaxed">
                  Password update, 2FA, connected accounts, sessions, and delete
                  account features should be added later as separate backend
                  APIs. For now this page only updates creator profile data.
                </p>
              </div>
            </div>
          </section>

          {/* Admin review status */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-4">
              <BadgeCheck className="text-primary" size={18} />
              Review status
            </h2>

            <div className="space-y-3">
              <ProfileStatusBadge status={profile.profileStatus} />

              {profile.rejectionReason && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-100">
                  <p className="text-xs font-semibold text-red-700">
                    Rejection reason
                  </p>
                  <p className="text-sm text-red-700 mt-1">
                    {profile.rejectionReason}
                  </p>
                </div>
              )}

              <p className="text-sm text-text-muted leading-relaxed">
                Your creator tools stay locked until your profile reaches
                approved status.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  disabled,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-text-muted">{label}</label>
      <input
        type={type}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      />
    </div>
  );
}

function TextareaField({
  label,
  value,
  disabled,
  onChange,
  rows = 4,
  placeholder,
}: {
  label: string;
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-text-muted">{label}</label>
      <textarea
        rows={rows}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} resize-none`}
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  disabled,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-text-muted">{label}</label>
      <select
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} appearance-none`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function ReadonlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-text-muted">{label}</label>
      <div className="flex items-center justify-between p-3 rounded-xl bg-surface text-text-muted text-sm">
        <span>{value}</span>
        <Lock size={13} />
      </div>
    </div>
  );
}

function SocialInput({
  icon: Icon,
  label,
  value,
  disabled,
  onChange,
}: {
  icon: any;
  label: string;
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-border-soft bg-surface">
      <Icon size={17} className="text-text-muted flex-shrink-0" />
      <input
        type="text"
        disabled={disabled}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none text-sm w-full text-text disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  );
}

function VerificationItem({
  label,
  verified,
}: {
  label: string;
  verified: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white">
      <div className="flex items-center gap-2">
        <CheckCircle
          size={16}
          className={verified ? "text-primary" : "text-text-muted"}
        />
        <span className="text-sm font-medium text-text">{label}</span>
      </div>

      <span
        className={`text-xs font-semibold ${
          verified ? "text-primary" : "text-text-muted"
        }`}
      >
        {verified ? "Verified" : "Pending"}
      </span>
    </div>
  );
}

function ProfileStatusBadge({ status }: { status: string }) {
  const config = {
    incomplete: "bg-amber-50 text-amber-700 border-amber-200",
    pending_verification: "bg-blue-50 text-blue-700 border-blue-200",
    pending_admin_review: "bg-blue-50 text-blue-700 border-blue-200",
    approved: "bg-green-50 text-green-700 border-green-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
    suspended: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
        config[status as keyof typeof config] || config.incomplete
      }`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}
