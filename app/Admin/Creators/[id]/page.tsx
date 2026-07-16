"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  BadgeCheck,
  Banknote,
  BriefcaseBusiness,
  Calendar,
  CheckCircle,
  GraduationCap,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  approveCreator,
  getAdminCreatorDetails,
  rejectCreator,
} from "@/app/services/admin";

export default function AdminCreatorDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const queryClient = useQueryClient();

  const [showRejectBox, setShowRejectBox] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const {
    data: creator,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-creator-details", id],
    queryFn: () => getAdminCreatorDetails(id),
    enabled: Boolean(id),
  });

  const approveMutation = useMutation({
    mutationFn: approveCreator,
    onSuccess: () => {
      toast.success("Creator approved successfully.");
      queryClient.invalidateQueries({
        queryKey: ["admin-creator-details", id],
      });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to approve creator.");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({
      profileId,
      reason,
    }: {
      profileId: string;
      reason: string;
    }) => rejectCreator(profileId, reason),
    onSuccess: () => {
      toast.success("Creator rejected.");
      setShowRejectBox(false);
      setRejectReason("");
      queryClient.invalidateQueries({
        queryKey: ["admin-creator-details", id],
      });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to reject creator.");
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (isError || !creator) {
    return (
      <div className="bg-white border border-border-soft rounded-2xl p-8 text-center">
        <XCircle className="mx-auto text-red-500 mb-3" size={34} />
        <h1 className="text-lg font-bold text-text">Creator not found</h1>
        <p className="text-sm text-text-muted mt-1">
          This creator profile could not be loaded.
        </p>

        <Link
          href="/Admin"
          className="inline-flex mt-5 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold"
        >
          Back to Admin
        </Link>
      </div>
    );
  }

  const creatorUser = creator.user as any;
  const canReview = creator.profileStatus === "pending_admin_review";

  return (
    <div className="space-y-6">
      <Link
        href="/Admin"
        className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition"
      >
        <ArrowLeft size={16} />
        Back to User Management
      </Link>

      <div className="bg-white border border-border-soft rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-border-soft">
          <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary-soft flex items-center justify-center overflow-hidden shrink-0">
                {creatorUser?.avatar ? (
                  <img
                    src={creatorUser.avatar}
                    alt={creator.displayName || creatorUser?.name || "Creator"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="text-primary" size={32} />
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold text-text">
                    {creator.displayName || creatorUser?.name || "Creator"}
                  </h1>

                  <StatusBadge status={creator.profileStatus} />
                </div>

                <p className="text-sm text-text-muted mt-1">
                  Creator ID: {creatorUser?.creatorId || "Pending"}
                </p>

                <p className="text-sm text-text-muted">
                  {creatorUser?.email || "No email"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={!canReview || approveMutation.isPending}
                onClick={() => approveMutation.mutate(creator._id)}
                className="px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {approveMutation.isPending ? "Approving..." : "Approve"}
              </button>

              <button
                type="button"
                disabled={!canReview || rejectMutation.isPending}
                onClick={() => setShowRejectBox(true)}
                className="px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reject
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <Section title="Creator Profile">
              <div className="grid md:grid-cols-2 gap-4">
                <InfoCard
                  icon={Mail}
                  label="Email"
                  value={creatorUser?.email || "Not available"}
                />
                <InfoCard
                  icon={Phone}
                  label="Phone"
                  value={creator.phone || "Not added"}
                />
                <InfoCard
                  icon={MapPin}
                  label="Location"
                  value={creator.location || "Not added"}
                />
                <InfoCard
                  icon={Calendar}
                  label="Joined"
                  value={formatDate(creatorUser?.createdAt)}
                />
              </div>
            </Section>

            <Section title="Professional Details">
              <div className="grid md:grid-cols-2 gap-4">
                <InfoCard
                  icon={GraduationCap}
                  label="Qualification"
                  value={creator.qualification || "Not added"}
                />
                <InfoCard
                  icon={BriefcaseBusiness}
                  label="Expertise"
                  value={creator.expertise || "Not added"}
                />
                <InfoCard
                  label="Experience years"
                  value={`${creator.experienceYears || 0} years`}
                />
                <InfoCard
                  label="Teaching experience"
                  value={creator.teachingExperience || "Not added"}
                />
              </div>
            </Section>

            <Section title="Bio">
              <div className="rounded-xl bg-surface border border-border-soft p-4">
                <p className="text-sm text-text-muted whitespace-pre-line leading-relaxed">
                  {creator.bio || "No bio added."}
                </p>
              </div>
            </Section>

            <div className="grid md:grid-cols-2 gap-6">
              <ListCard title="Skills" items={creator.skills || []} />
              <ListCard title="Categories" items={creator.categories || []} />
            </div>

            {creator.rejectionReason && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
                <p className="text-sm font-bold text-red-700">
                  Rejection reason
                </p>
                <p className="text-sm text-red-700 mt-1">
                  {creator.rejectionReason}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Section title="Verification">
              <div className="space-y-3">
                <VerificationRow
                  label="Email verified"
                  checked={creator.emailVerified}
                />
                <VerificationRow
                  label="Phone verified"
                  checked={creator.phoneVerified}
                />
                <VerificationRow
                  label="Identity verified"
                  checked={creator.identityVerified}
                />
                <VerificationRow
                  label="Payout connected"
                  checked={Boolean(creator.payoutDetails?.connected)}
                />
              </div>
            </Section>

            <Section title="Account">
              <div className="space-y-3">
                <SideInfo label="Role" value={creatorUser?.role || "creator"} />
                <SideInfo
                  label="Account status"
                  value={creatorUser?.status || "active"}
                />
                <SideInfo
                  label="Profile status"
                  value={creator.profileStatus?.replaceAll("_", " ")}
                />
                <SideInfo
                  label="Creator ID"
                  value={creatorUser?.creatorId || "Pending"}
                />
              </div>
            </Section>

            <Section title="Payout">
              <div className="space-y-3">
                <SideInfo
                  label="Method"
                  value={
                    creator.payoutDetails?.method
                      ? creator.payoutDetails.method.replaceAll("_", " ")
                      : "Not added"
                  }
                />
                <SideInfo
                  label="Connected"
                  value={creator.payoutDetails?.connected ? "Yes" : "No"}
                />
                <SideInfo
                  label="Platform fee"
                  value={`${creator.payoutDetails?.platformFeePercent ?? 2}%`}
                />
              </div>

              <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3 flex gap-2">
                <Banknote
                  className="text-amber-700 shrink-0 mt-0.5"
                  size={17}
                />
                <p className="text-xs text-amber-800 leading-relaxed">
                  Sensitive payout details should stay protected. Show masked
                  values only in future finance/admin pages.
                </p>
              </div>
            </Section>
          </div>
        </div>
      </div>

      {showRejectBox && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-lg font-bold text-text">Reject creator</h2>
            <p className="text-sm text-text-muted mt-1">
              Add a clear reason so the creator knows what to improve.
            </p>

            <textarea
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Example: Please add a stronger bio, clear expertise, and valid teaching categories."
              className="w-full mt-4 px-4 py-3 rounded-xl border border-border-soft text-sm outline-none focus:border-primary resize-none"
            />

            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={() => {
                  setShowRejectBox(false);
                  setRejectReason("");
                }}
                className="flex-1 py-3 rounded-xl bg-surface text-text-muted text-sm font-semibold"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={rejectMutation.isPending}
                onClick={() =>
                  rejectMutation.mutate({
                    profileId: creator._id,
                    reason:
                      rejectReason ||
                      "Creator profile did not meet approval requirements.",
                  })
                }
                className="flex-1 py-3 rounded-xl bg-red-600 text-white text-sm font-semibold disabled:opacity-60"
              >
                {rejectMutation.isPending ? "Rejecting..." : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border-soft bg-white p-5">
      <h2 className="text-base font-bold text-text mb-4">{title}</h2>
      {children}
    </section>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon?: any;
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-xl bg-surface border border-border-soft p-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
        {Icon && <Icon size={14} />}
        {label}
      </div>
      <p className="text-sm font-semibold text-text mt-2">{value || "N/A"}</p>
    </div>
  );
}

function VerificationRow({
  label,
  checked,
}: {
  label: string;
  checked: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-surface border border-border-soft px-4 py-3">
      <span className="text-sm font-medium text-text">{label}</span>

      {checked ? (
        <CheckCircle className="text-green-600" size={18} />
      ) : (
        <XCircle className="text-red-500" size={18} />
      )}
    </div>
  );
}

function SideInfo({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border-soft pb-3 last:border-b-0 last:pb-0">
      <span className="text-sm text-text-muted">{label}</span>
      <span className="text-sm font-semibold text-text capitalize text-right">
        {value || "N/A"}
      </span>
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-border-soft bg-white p-5">
      <h2 className="text-base font-bold text-text mb-4">{title}</h2>

      <div className="flex flex-wrap gap-2">
        {items.length > 0 ? (
          items.map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 rounded-full bg-surface border border-border-soft text-xs font-semibold text-text-muted"
            >
              {item}
            </span>
          ))
        ) : (
          <p className="text-sm text-text-muted">
            No {title.toLowerCase()} added.
          </p>
        )}
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, string> = {
    incomplete: "bg-amber-50 text-amber-700 border-amber-200",
    pending_verification: "bg-blue-50 text-blue-700 border-blue-200",
    pending_admin_review: "bg-purple-50 text-purple-700 border-purple-200",
    approved: "bg-green-50 text-green-700 border-green-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
    suspended: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-full border text-xs font-semibold ${
        config[status] || "bg-surface text-text-muted border-border-soft"
      }`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}

function formatDate(date?: string) {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
