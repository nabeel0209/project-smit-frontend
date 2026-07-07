// app/Creator/Settings/page.tsx
"use client";

import { useState } from "react";
import {
  Bell,
  Palette,
  Globe,
  Accessibility,
  Plug,
  Database,
  SlidersHorizontal,
} from "lucide-react";

const TABS = [
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "appearance", label: "Appearance", icon: Palette },
  { key: "language", label: "Language & region", icon: Globe },
  { key: "accessibility", label: "Accessibility", icon: Accessibility },
  { key: "connected", label: "Connected apps", icon: Plug },
  { key: "data", label: "Data & privacy", icon: Database },
  { key: "advanced", label: "Advanced", icon: SlidersHorizontal },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-border-soft bg-surface focus:bg-white focus:border-primary outline-none transition-colors text-sm text-text";

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`w-11 h-6 rounded-full relative transition-colors flex-shrink-0 ${
        on ? "bg-primary" : "bg-border-soft"
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
          on ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

function Row({
  title,
  description,
  right,
}: {
  title: string;
  description?: string;
  right: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-border-soft last:border-0">
      <div>
        <p className="text-sm font-medium text-text">{title}</p>
        {description && (
          <p className="text-xs text-text-muted mt-0.5">{description}</p>
        )}
      </div>
      {right}
    </div>
  );
}

export default function CreatorSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("notifications");

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text">Settings</h1>
        <p className="text-text-muted mt-1">
          Manage your preferences and creator studio behavior.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Tab list */}
        <div className="md:w-56 flex-shrink-0">
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.key
                    ? "bg-primary text-white"
                    : "text-text-muted hover:bg-surface hover:text-text"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white border border-border-soft rounded-2xl p-6 md:p-8">
          {activeTab === "notifications" && (
            <div>
              <h2 className="text-lg font-bold text-text mb-1">
                Notifications
              </h2>
              <p className="text-sm text-text-muted mb-5">
                Choose what you want to be notified about, and how.
              </p>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wide pt-3 pb-1">
                  Email
                </p>
                <Row
                  title="New enrollments"
                  description="When a student joins one of your courses"
                  right={<Toggle defaultOn />}
                />
                <Row
                  title="Payout confirmations"
                  description="Receipts when a payout is processed"
                  right={<Toggle defaultOn />}
                />
                <Row
                  title="New reviews"
                  description="When a student rates or reviews your course"
                  right={<Toggle defaultOn />}
                />
                <Row
                  title="Weekly earnings digest"
                  description="Summary of enrollments, revenue, and engagement"
                  right={<Toggle defaultOn />}
                />

                <p className="text-xs font-semibold text-text-muted uppercase tracking-wide pt-5 pb-1">
                  Push notifications
                </p>
                <Row
                  title="Student questions"
                  description="Alerts when a student asks a question"
                  right={<Toggle defaultOn />}
                />
                <Row
                  title="Live session reminders"
                  description="Reminders before your scheduled Q&A or event"
                  right={<Toggle defaultOn />}
                />
                <Row
                  title="Discussion replies"
                  description="When someone replies to your comment"
                  right={<Toggle />}
                />

                <p className="text-xs font-semibold text-text-muted uppercase tracking-wide pt-5 pb-1">
                  In-app
                </p>
                <Row
                  title="Milestone achievements"
                  description="Alerts for student count and revenue milestones"
                  right={<Toggle defaultOn />}
                />
                <Row
                  title="Sound effects"
                  description="Play a sound on notifications"
                  right={<Toggle />}
                />
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div>
              <h2 className="text-lg font-bold text-text mb-1">Appearance</h2>
              <p className="text-sm text-text-muted mb-5">
                Customize how Learnix Labs looks for you.
              </p>

              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium text-text">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {["Light", "Dark", "System"].map((theme, i) => (
                    <button
                      key={theme}
                      className={`p-4 rounded-xl border text-sm font-medium transition-colors ${
                        i === 0
                          ? "border-primary bg-primary-soft text-primary"
                          : "border-border-soft text-text-muted hover:border-primary"
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium text-text">
                  Accent color
                </label>
                <div className="flex gap-3">
                  {["#10b981", "#3b82f6", "#f97316", "#a855f7", "#ef4444"].map(
                    (color, i) => (
                      <button
                        key={color}
                        style={{ backgroundColor: color }}
                        className={`w-9 h-9 rounded-full ${
                          i === 0 ? "ring-2 ring-offset-2 ring-primary" : ""
                        }`}
                      />
                    ),
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <Row
                  title="Compact mode"
                  description="Reduce spacing across the dashboard"
                  right={<Toggle />}
                />
                <Row
                  title="Reduce motion"
                  description="Minimize animations and transitions"
                  right={<Toggle />}
                />
                <Row
                  title="Show sidebar labels"
                  description="Display text next to sidebar icons"
                  right={<Toggle defaultOn />}
                />
              </div>
            </div>
          )}

          {activeTab === "language" && (
            <div>
              <h2 className="text-lg font-bold text-text mb-1">
                Language & region
              </h2>
              <p className="text-sm text-text-muted mb-5">
                Set your language, timezone, and formatting preferences.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-muted">
                    Display language
                  </label>
                  <select className={`${inputClass} appearance-none`}>
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Urdu</option>
                    <option>Spanish</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-muted">
                    Timezone
                  </label>
                  <select className={`${inputClass} appearance-none`}>
                    <option>Asia/Karachi (GMT+5)</option>
                    <option>UTC</option>
                    <option>America/New_York (GMT-5)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-muted">
                    Date format
                  </label>
                  <select className={`${inputClass} appearance-none`}>
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-muted">
                    Payout currency
                  </label>
                  <select className={`${inputClass} appearance-none`}>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>PKR (₨)</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <Row
                  title="Auto-translate student messages"
                  description="Translate questions and comments into your language"
                  right={<Toggle />}
                />
              </div>
            </div>
          )}

          {activeTab === "accessibility" && (
            <div>
              <h2 className="text-lg font-bold text-text mb-1">
                Accessibility
              </h2>
              <p className="text-sm text-text-muted mb-5">
                Adjust the platform to fit your needs.
              </p>

              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium text-text">
                  Font size
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {["Small", "Default", "Large", "X-Large"].map((size, i) => (
                    <button
                      key={size}
                      className={`p-3 rounded-xl border text-xs font-medium transition-colors ${
                        i === 1
                          ? "border-primary bg-primary-soft text-primary"
                          : "border-border-soft text-text-muted hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <Row
                  title="High contrast mode"
                  description="Increase color contrast for readability"
                  right={<Toggle />}
                />
                <Row
                  title="Underline links"
                  description="Always underline clickable text"
                  right={<Toggle />}
                />
                <Row
                  title="Auto-generate captions on upload"
                  description="Automatically caption videos you upload"
                  right={<Toggle defaultOn />}
                />
                <Row
                  title="Keyboard navigation hints"
                  description="Show shortcut hints while navigating"
                  right={<Toggle />}
                />
                <Row
                  title="Screen reader optimizations"
                  description="Enhance ARIA labels and focus order"
                  right={<Toggle />}
                />
              </div>
            </div>
          )}

          {activeTab === "connected" && (
            <div>
              <h2 className="text-lg font-bold text-text mb-1">
                Connected apps
              </h2>
              <p className="text-sm text-text-muted mb-5">
                Manage third-party apps and integrations linked to your account.
              </p>

              <div className="space-y-3">
                {[
                  {
                    name: "Stripe",
                    desc: "Where your payouts are sent",
                    connected: true,
                  },
                  {
                    name: "Google Calendar",
                    desc: "Sync live sessions to your calendar",
                    connected: true,
                  },
                  {
                    name: "Zoom",
                    desc: "Host live Q&As and cohort sessions",
                    connected: false,
                  },
                  {
                    name: "Slack",
                    desc: "Get notified in a Slack channel",
                    connected: false,
                  },
                  {
                    name: "Zapier",
                    desc: "Automate workflows with your account",
                    connected: false,
                  },
                ].map((app) => (
                  <div
                    key={app.name}
                    className="flex items-center justify-between p-4 rounded-xl border border-border-soft"
                  >
                    <div>
                      <p className="text-sm font-medium text-text">
                        {app.name}
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">
                        {app.desc}
                      </p>
                    </div>
                    <button
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                        app.connected
                          ? "border border-border-soft text-text-muted hover:border-red-300 hover:text-red-600"
                          : "bg-primary text-white hover:bg-primary-hover"
                      }`}
                    >
                      {app.connected ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "data" && (
            <div>
              <h2 className="text-lg font-bold text-text mb-1">
                Data & privacy
              </h2>
              <p className="text-sm text-text-muted mb-5">
                Control how your data and course data are used and stored.
              </p>

              <div className="space-y-1">
                <Row
                  title="Show student count publicly"
                  description="Display total enrollments on your creator profile"
                  right={<Toggle defaultOn />}
                />
                <Row
                  title="Usage analytics"
                  description="Help us improve by sharing anonymous usage data"
                  right={<Toggle defaultOn />}
                />
                <Row
                  title="Third-party data sharing"
                  description="Share aggregated data with platform partners"
                  right={<Toggle />}
                />
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button className="flex-1 py-3 border border-border-soft text-text rounded-xl text-sm font-medium hover:border-primary transition-colors">
                  Export revenue report
                </button>
                <button className="flex-1 py-3 border border-border-soft text-text rounded-xl text-sm font-medium hover:border-primary transition-colors">
                  Export student list
                </button>
              </div>
            </div>
          )}

          {activeTab === "advanced" && (
            <div>
              <h2 className="text-lg font-bold text-text mb-1">Advanced</h2>
              <p className="text-sm text-text-muted mb-5">
                Studio, upload, and experimental settings.
              </p>

              <div className="space-y-1">
                <Row
                  title="Beta features"
                  description="Get early access to new creator tools"
                  right={<Toggle />}
                />
                <Row
                  title="Hardware acceleration"
                  description="Use GPU for faster video processing"
                  right={<Toggle defaultOn />}
                />
                <Row
                  title="Default upload quality"
                  description="Process new uploads at the highest resolution"
                  right={<Toggle defaultOn />}
                />
                <Row
                  title="Watermark my videos"
                  description="Add your logo to uploaded course videos"
                  right={<Toggle />}
                />
                <Row
                  title="Auto-publish new lessons"
                  description="Skip the draft step for lessons in published courses"
                  right={<Toggle />}
                />
              </div>

              <div className="mt-6 p-4 rounded-xl bg-surface border border-border-soft">
                <p className="text-xs text-text-muted">
                  App version 1.0.0 · Build 2026.07.08
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
