"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, Loader2, Search, User, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import {
  approveCreator,
  getAdminUsers,
  rejectCreator,
  AdminUser,
  getPublicUserId,
  getPublicUserIdLabel,
} from "@/app/services/admin";
import { CreatorProfile } from "@/app/services/creator";
import Link from "next/link";

export default function AdminPage() {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<"users" | "creators">("users");
  const [search, setSearch] = useState("");
  const [rejectingProfileId, setRejectingProfileId] = useState<string | null>(
    null,
  );
  const [rejectReason, setRejectReason] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-users"],
    queryFn: getAdminUsers,
  });

  const approveMutation = useMutation({
    mutationFn: approveCreator,
    onSuccess: () => {
      toast.success("Creator approved.");
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
      setRejectingProfileId(null);
      setRejectReason("");
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

  if (isError || !data) {
    return (
      <div className="bg-white border border-border-soft rounded-2xl p-8 text-center">
        <XCircle className="mx-auto text-red-500 mb-3" size={32} />
        <h2 className="text-lg font-bold text-text">
          Failed to load admin data
        </h2>
        <p className="text-sm text-text-muted mt-1">
          Please refresh and try again.
        </p>
      </div>
    );
  }

  const students = data.users.filter((user) => user.role === "user");
  const creators = data.creators;

  const filteredStudents = students.filter((user) =>
    `${user.name} ${user.email} ${user.studentId || ""}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const filteredCreators = creators.filter((profile) => {
    const creatorUser = profile.user as any;

    return `${creatorUser?.name || ""} ${creatorUser?.email || ""} ${
      creatorUser?.creatorId || ""
    } ${profile.displayName || ""}`
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Admin Panel</h1>
          <p className="text-sm text-text-muted mt-1">
            Manage registered students and creators. Approve or reject creator
            profiles from one place.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-soft bg-white text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Students" value={students.length} />
        <StatCard title="Creators" value={creators.length} />
        <StatCard
          title="Pending review"
          value={
            creators.filter(
              (profile) => profile.profileStatus === "pending_admin_review",
            ).length
          }
        />
        <StatCard
          title="Approved creators"
          value={
            creators.filter((profile) => profile.profileStatus === "approved")
              .length
          }
        />
      </div>

      <div className="bg-white rounded-2xl border border-border-soft overflow-hidden">
        <div className="flex border-b border-border-soft">
          <button
            onClick={() => setTab("users")}
            className={`px-5 py-3 text-sm font-semibold ${
              tab === "users"
                ? "text-primary border-b-2 border-primary"
                : "text-text-muted"
            }`}
          >
            Students
          </button>

          <button
            onClick={() => setTab("creators")}
            className={`px-5 py-3 text-sm font-semibold ${
              tab === "creators"
                ? "text-primary border-b-2 border-primary"
                : "text-text-muted"
            }`}
          >
            Creators
          </button>
        </div>

        {tab === "users" ? (
          <UsersTable users={filteredStudents} />
        ) : (
          <CreatorsTable
            creators={filteredCreators}
            onApprove={(profileId) => approveMutation.mutate(profileId)}
            onReject={(profileId) => setRejectingProfileId(profileId)}
            approvingId={approveMutation.variables}
          />
        )}
      </div>

      {rejectingProfileId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-lg font-bold text-text">Reject creator</h2>
            <p className="text-sm text-text-muted mt-1">
              Add a reason so the creator knows what to improve.
            </p>

            <textarea
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Example: Please improve your bio and add clearer teaching experience."
              className="w-full mt-4 px-4 py-3 rounded-xl border border-border-soft text-sm outline-none focus:border-primary resize-none"
            />

            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={() => {
                  setRejectingProfileId(null);
                  setRejectReason("");
                }}
                className="flex-1 py-3 rounded-xl bg-surface text-text-muted text-sm font-semibold"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  rejectMutation.mutate({
                    profileId: rejectingProfileId,
                    reason: rejectReason,
                  })
                }
                disabled={rejectMutation.isPending}
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

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-2xl border border-border-soft p-5">
      <p className="text-sm text-text-muted">{title}</p>
      <h2 className="text-2xl font-bold text-text mt-1">{value}</h2>
    </div>
  );
}

function UsersTable({ users }: { users: AdminUser[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-surface text-text-muted">
          <tr>
            <th className="text-left px-5 py-3 font-semibold">User</th>
            <th className="text-left px-5 py-3 font-semibold">Email</th>
            <th className="text-left px-5 py-3 font-semibold">Status</th>
            <th className="text-left px-5 py-3 font-semibold">Joined</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-t border-border-soft">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <Avatar avatar={user.avatar} name={user.name} />
                  <div>
                    <Link
                      href={`/Admin/Users/${getPublicUserId(user) || user._id}`}
                      className="font-semibold text-text hover:text-primary transition"
                    >
                      {user.name}
                    </Link>

                    <p className="text-xs text-text-muted">
                      {getPublicUserIdLabel(user.role)}:{" "}
                      {getPublicUserId(user) || "Pending"}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-5 py-4 text-text-muted">{user.email}</td>

              <td className="px-5 py-4">
                <StatusBadge status={user.status || "active"} />
              </td>

              <td className="px-5 py-4 text-text-muted">
                {formatDate(user.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && <EmptyState text="No students found." />}
    </div>
  );
}

function CreatorsTable({
  creators,
  onApprove,
  onReject,
  approvingId,
}: {
  creators: CreatorProfile[];
  onApprove: (profileId: string) => void;
  onReject: (profileId: string) => void;
  approvingId?: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-surface text-text-muted">
          <tr>
            <th className="text-left px-5 py-3 font-semibold">Creator</th>
            <th className="text-left px-5 py-3 font-semibold">Verification</th>
            <th className="text-left px-5 py-3 font-semibold">Payout</th>
            <th className="text-left px-5 py-3 font-semibold">Status</th>
            <th className="text-right px-5 py-3 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {creators.map((profile) => {
            const creatorUser = profile.user as any;
            const canReview = profile.profileStatus === "pending_admin_review";

            return (
              <tr key={profile._id} className="border-t border-border-soft">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar
                      avatar={creatorUser?.avatar}
                      name={profile.displayName}
                    />

                    <div>
                      <Link
                        href={`/Admin/Creators/${creatorUser?.creatorId || profile._id}`}
                        className="font-semibold text-text hover:text-primary transition"
                      >
                        {profile.displayName || creatorUser?.name}
                      </Link>

                      <p className="text-xs text-text-muted">
                        Creator ID: {creatorUser?.creatorId || "Pending"}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="space-y-1">
                    <MiniCheck label="Email" checked={profile.emailVerified} />
                    <MiniCheck label="Phone" checked={profile.phoneVerified} />
                  </div>
                </td>

                <td className="px-5 py-4">
                  <MiniCheck
                    label={profile.payoutDetails?.method || "Payout"}
                    checked={Boolean(profile.payoutDetails?.connected)}
                  />
                </td>

                <td className="px-5 py-4">
                  <StatusBadge status={profile.profileStatus} />
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      disabled={!canReview || approvingId === profile._id}
                      onClick={() => onApprove(profile._id)}
                      className="px-3 py-2 rounded-lg bg-green-50 text-green-700 text-xs font-semibold hover:bg-green-100 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Approve
                    </button>

                    <button
                      type="button"
                      disabled={!canReview}
                      onClick={() => onReject(profile._id)}
                      className="px-3 py-2 rounded-lg bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {creators.length === 0 && <EmptyState text="No creators found." />}
    </div>
  );
}

function Avatar({ avatar, name }: { avatar?: string; name?: string }) {
  return (
    <div className="w-10 h-10 rounded-full bg-primary-soft flex items-center justify-center overflow-hidden flex-shrink-0">
      {avatar ? (
        <img
          src={avatar}
          alt={name || "User"}
          className="w-full h-full object-cover"
        />
      ) : (
        <User className="text-primary" size={18} />
      )}
    </div>
  );
}

function MiniCheck({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div
      className={`flex items-center gap-1.5 text-xs ${
        checked ? "text-green-700" : "text-text-muted"
      }`}
    >
      {checked ? <CheckCircle size={13} /> : <XCircle size={13} />}
      {label}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, string> = {
    active: "bg-green-50 text-green-700 border-green-200",
    suspended: "bg-red-50 text-red-700 border-red-200",
    banned: "bg-red-50 text-red-700 border-red-200",
    incomplete: "bg-amber-50 text-amber-700 border-amber-200",
    pending_verification: "bg-blue-50 text-blue-700 border-blue-200",
    pending_admin_review: "bg-purple-50 text-purple-700 border-purple-200",
    approved: "bg-green-50 text-green-700 border-green-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
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

function EmptyState({ text }: { text: string }) {
  return (
    <div className="py-12 text-center">
      <p className="text-sm text-text-muted">{text}</p>
    </div>
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
