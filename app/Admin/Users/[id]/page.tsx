"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  User,
  VenusAndMars,
  XCircle,
} from "lucide-react";
import {
  getAdminUserDetails,
  getPublicUserId,
  getPublicUserIdLabel,
} from "@/app/services/admin";

export default function AdminUserDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-user-details", id],
    queryFn: () => getAdminUserDetails(id),
    enabled: Boolean(id),
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="bg-white border border-border-soft rounded-2xl p-8 text-center">
        <XCircle className="mx-auto text-red-500 mb-3" size={34} />
        <h1 className="text-lg font-bold text-text">User not found</h1>
        <p className="text-sm text-text-muted mt-1">
          This user profile could not be loaded.
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

  const publicId = getPublicUserId(user);
  const publicIdLabel = getPublicUserIdLabel(user.role);

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
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="text-primary" size={32} />
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold text-text">{user.name}</h1>

                  <StatusBadge status={user.status || "active"} />
                </div>

                <p className="text-sm text-text-muted mt-1">
                  {publicIdLabel}: {publicId || "Pending"}
                </p>

                <p className="text-sm text-text-muted">{user.email}</p>
              </div>
            </div>

            <div className="rounded-xl bg-surface border border-border-soft px-4 py-3">
              <p className="text-xs text-text-muted uppercase font-semibold tracking-wide">
                Account Type
              </p>
              <p className="text-sm font-bold text-text capitalize mt-1">
                {user.role === "user" ? "Student" : user.role}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <Section title="Basic Information">
              <div className="grid md:grid-cols-2 gap-4">
                <InfoCard icon={Mail} label="Email" value={user.email} />
                <InfoCard
                  icon={Phone}
                  label="Phone"
                  value={user.phone || "Not added"}
                />
                <InfoCard
                  icon={VenusAndMars}
                  label="Gender"
                  value={user.gender || "Not added"}
                />
                <InfoCard
                  icon={Calendar}
                  label="Date of birth"
                  value={user.dob ? formatDate(user.dob) : "Not added"}
                />
                <InfoCard
                  icon={Calendar}
                  label="Joined"
                  value={formatDate(user.createdAt)}
                />
                <InfoCard
                  icon={ShieldCheck}
                  label="Role"
                  value={user.role === "user" ? "Student" : user.role}
                />
              </div>
            </Section>

            <Section title="Learning Details">
              <div className="rounded-xl bg-surface border border-border-soft p-4">
                <p className="text-sm font-semibold text-text">
                  Course data not available yet
                </p>
                <p className="text-sm text-text-muted mt-1 leading-relaxed">
                  Later this section will show enrolled courses, course
                  progress, completed lessons, certificates, purchases, and
                  learning activity.
                </p>
              </div>
            </Section>
          </div>

          <div className="space-y-6">
            <Section title="Account Status">
              <div className="space-y-3">
                <SideInfo label={publicIdLabel} value={publicId || "Pending"} />
                <SideInfo
                  label="Role"
                  value={user.role === "user" ? "Student" : user.role}
                />
                <SideInfo label="Status" value={user.status || "active"} />
                <SideInfo
                  label="Auth provider"
                  value={user.authProvider || "local"}
                />
              </div>
            </Section>

            <Section title="Verification">
              <div className="space-y-3">
                <VerificationRow
                  label="Phone verified"
                  checked={Boolean(user.phoneVerified)}
                />
              </div>
            </Section>

            <Section title="Payment Method">
              {user.paymentMethod?.connected ? (
                <div className="space-y-3">
                  <SideInfo
                    label="Card"
                    value={`${user.paymentMethod.cardBrand || "Card"} ending in ${
                      user.paymentMethod.cardLast4 || "----"
                    }`}
                  />
                  <SideInfo
                    label="Cardholder"
                    value={user.paymentMethod.cardholderName || "N/A"}
                  />
                  <SideInfo
                    label="Expiry"
                    value={`${user.paymentMethod.expiryMonth || "--"}/${
                      user.paymentMethod.expiryYear || "----"
                    }`}
                  />
                  <SideInfo
                    label="Billing country"
                    value={user.paymentMethod.billingCountry || "N/A"}
                  />
                  <SideInfo
                    label="Currency"
                    value={user.paymentMethod.currency || "PKR"}
                  />
                </div>
              ) : (
                <div className="rounded-xl bg-surface border border-border-soft p-4">
                  <p className="text-sm font-semibold text-text">
                    No card connected
                  </p>
                  <p className="text-xs text-text-muted mt-1">
                    Card details will show here after the student adds a payment
                    method.
                  </p>
                </div>
              )}
            </Section>

            <Section title="Admin Actions">
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                <p className="text-sm font-semibold text-amber-800">
                  Actions coming next
                </p>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  Suspend and reactivate buttons will be added here after the
                  detail pages are complete.
                </p>
              </div>
            </Section>
          </div>
        </div>
      </div>
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
      <p className="text-sm font-semibold text-text mt-2 ">{value || "N/A"}</p>
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

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, string> = {
    active: "bg-green-50 text-green-700 border-green-200",
    suspended: "bg-red-50 text-red-700 border-red-200",
    banned: "bg-red-50 text-red-700 border-red-200",
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
