"use client";

import { useState } from "react";
import {
  User,
  Mail,
  MapPin,
  Camera,
  Lock,
  Bell,
  Globe,
  Trash2,
  Github,
  Linkedin,
  Twitter,
  Shield,
  CheckCircle,
  Edit2,
  Save,
  ShieldCheck,
  Link2,
  Facebook,
  Monitor,
  Eye,
  Download,
  GraduationCap,
  BadgeCheck,
} from "lucide-react";

export default function CreatorProfilePage() {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [userData] = useState({
    fullName: "Munib Jahangir",
    displayName: "Munib_Dev",
    email: "munibjahangir10@gmail.com",
    dob: "1998-05-15",
    gender: "Male",
    phone: "+92 312 3456789",
    bio: "Passionate developer and content creator focused on building modern web applications.",
    location: "Karachi, Pakistan",
    website: "https://munib.dev",
    twitter: "@munib_dev",
    linkedin: "munibjahangir",
    github: "Munib214",
  });

  const handleSavePersonal = () => {
    setIsEditingPersonal(false);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-border-soft bg-surface focus:bg-white focus:border-primary outline-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm text-text";

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-primary-soft overflow-hidden bg-surface flex items-center justify-center">
              <User className="w-10 h-10 md:w-12 md:h-12 text-text-muted" />
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:bg-primary-hover transition-colors">
              <Camera size={16} />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-text">
                {userData.fullName}
              </h1>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium w-fit mx-auto md:mx-0 bg-primary-soft text-primary">
                Creator
              </span>
            </div>
            <p className="text-text-muted flex items-center justify-center md:justify-start gap-2 text-sm">
              <Mail size={15} />
              {userData.email}
            </p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
              <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors">
                Change picture
              </button>
              <button className="px-4 py-2 border border-border-soft text-text-muted rounded-xl text-sm font-medium hover:border-primary transition-colors">
                Remove avatar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="md:col-span-2 space-y-8">
          {/* Personal info */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-text flex items-center gap-2">
                <User className="text-primary" size={18} />
                Personal information
              </h2>
              {!isEditingPersonal ? (
                <button
                  onClick={() => setIsEditingPersonal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary-soft rounded-lg transition-colors"
                >
                  <Edit2 size={15} /> Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditingPersonal(false)}
                    className="px-3 py-1.5 text-sm font-medium text-text-muted hover:bg-surface rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePersonal}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors"
                  >
                    <Save size={15} /> Save
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-muted">
                  Full name
                </label>
                <input
                  type="text"
                  disabled={!isEditingPersonal}
                  defaultValue={userData.fullName}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-muted">
                  Date of birth
                </label>
                <input
                  type="date"
                  disabled={!isEditingPersonal}
                  defaultValue={userData.dob}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-muted">
                  Gender
                </label>
                <select
                  disabled={!isEditingPersonal}
                  defaultValue={userData.gender}
                  className={`${inputClass} appearance-none`}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-muted">
                  Phone number
                </label>
                <input
                  type="tel"
                  disabled={!isEditingPersonal}
                  defaultValue={userData.phone}
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Public profile */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-1">
              <Globe className="text-primary" size={18} />
              Public creator profile
            </h2>
            <p className="text-sm text-text-muted mb-6">
              This is what students see on your course and creator pages.
            </p>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-muted">
                  Display name
                </label>
                <input
                  type="text"
                  defaultValue={userData.displayName}
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-muted">
                  Bio
                </label>
                <textarea
                  rows={4}
                  defaultValue={userData.bio}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-muted">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
                    />
                    <input
                      type="text"
                      defaultValue={userData.location}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-text-muted">
                    Verify phone
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      defaultValue={userData.phone}
                      className={`flex-1 ${inputClass}`}
                    />
                    <button className="px-4 py-2 bg-primary-soft text-primary rounded-xl text-sm font-semibold hover:bg-primary hover:text-white transition-colors whitespace-nowrap">
                      Verify
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-medium text-text-muted uppercase tracking-wide">
                  Social links
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    {
                      icon: Twitter,
                      placeholder: "Twitter URL",
                      value: userData.twitter,
                    },
                    {
                      icon: Linkedin,
                      placeholder: "LinkedIn URL",
                      value: userData.linkedin,
                    },
                    {
                      icon: Github,
                      placeholder: "GitHub URL",
                      value: userData.github,
                    },
                    {
                      icon: Globe,
                      placeholder: "Website",
                      value: userData.website,
                    },
                  ].map((social, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl border border-border-soft bg-surface"
                    >
                      <social.icon
                        size={17}
                        className="text-text-muted flex-shrink-0"
                      />
                      <input
                        type="text"
                        placeholder={social.placeholder}
                        defaultValue={social.value}
                        className="bg-transparent outline-none text-sm w-full text-text"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Teaching preferences */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-6">
              <GraduationCap className="text-primary" size={18} />
              Teaching preferences
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-muted">
                  Default course language
                </label>
                <select className={`${inputClass} appearance-none`}>
                  <option>English</option>
                  <option>Urdu</option>
                  <option>Spanish</option>
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
                  Default course visibility
                </label>
                <select className={`${inputClass} appearance-none`}>
                  <option>Draft until published</option>
                  <option>Public immediately</option>
                </select>
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              <p className="text-sm font-medium text-text">
                Teaching categories
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Web Development",
                  "Design",
                  "Marketing",
                  "Data Science",
                  "Business",
                ].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border border-border-soft text-text-muted hover:border-primary hover:text-primary transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Two-factor authentication */}
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
              <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors">
                Enable
              </button>
            </div>
          </section>

          {/* Connected accounts */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-5">
              <Link2 className="text-primary" size={18} />
              Connected accounts
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl border border-border-soft">
                <div className="flex items-center gap-3">
                  <img
                    src="/icons/googleIcon.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <div>
                    <p className="text-sm font-medium text-text">Google</p>
                    <p className="text-xs text-text-muted">
                      munibjahangir10@gmail.com
                    </p>
                  </div>
                </div>
                <span className="text-xs text-primary font-medium">
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl border border-border-soft">
                <div className="flex items-center gap-3">
                  <Facebook size={20} className="text-text-muted" />
                  <p className="text-sm font-medium text-text">Facebook</p>
                </div>
                <button className="text-xs text-primary font-medium hover:underline">
                  Connect
                </button>
              </div>
            </div>
          </section>

          {/* Active sessions */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-5">
              <Monitor className="text-primary" size={18} />
              Active sessions
            </h2>
            <div className="space-y-3">
              {[
                {
                  device: "Chrome on Windows",
                  location: "Karachi, PK",
                  current: true,
                },
                {
                  device: "Safari on iPhone",
                  location: "Karachi, PK",
                  current: false,
                },
              ].map((session, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl border border-border-soft"
                >
                  <div>
                    <p className="text-sm font-medium text-text">
                      {session.device}
                    </p>
                    <p className="text-xs text-text-muted">
                      {session.location}
                    </p>
                  </div>
                  {session.current ? (
                    <span className="text-xs text-primary font-medium">
                      This device
                    </span>
                  ) : (
                    <button className="text-xs text-red-600 font-medium hover:underline">
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-8">
          {/* Security */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-6">
              <Shield className="text-primary" size={18} />
              Account & security
            </h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text-muted">
                  Email address
                </label>
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface text-text-muted text-sm">
                  {userData.email}
                  <Lock size={13} />
                </div>
              </div>
              <div className="pt-2 space-y-3">
                <h3 className="text-sm font-semibold text-text">
                  Update password
                </h3>
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
                <button className="w-full py-3 bg-text text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
                  Update password
                </button>
              </div>
              <div className="pt-4 border-t border-border-soft">
                <button className="w-full py-3 border border-red-200 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50 transition-colors">
                  Logout from all devices
                </button>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-6">
              <Bell className="text-primary" size={18} />
              Preferences
            </h2>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text">Dark mode</p>
                  <p className="text-xs text-text-muted">Toggle dark theme</p>
                </div>
                <div className="w-11 h-6 bg-border-soft rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="space-y-2.5">
                <p className="text-sm font-medium text-text">
                  Email notifications
                </p>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-primary"
                    defaultChecked
                  />
                  <span className="text-sm text-text-muted">
                    New enrollments
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-primary"
                    defaultChecked
                  />
                  <span className="text-sm text-text-muted">New reviews</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-primary"
                    defaultChecked
                  />
                  <span className="text-sm text-text-muted">
                    Payout confirmations
                  </span>
                </label>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-text">
                  Language
                </label>
                <select className={`${inputClass} appearance-none`}>
                  <option>English (US)</option>
                  <option>Urdu</option>
                  <option>Spanish</option>
                </select>
              </div>
            </div>
          </section>

          {/* Verification */}
          <section className="bg-primary-soft rounded-2xl p-6 md:p-8 border border-primary/20">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-3">
              <BadgeCheck className="text-primary" size={18} />
              Verification
            </h2>
            <p className="text-text-muted text-sm mb-5 leading-relaxed">
              Verified creators build more trust with students and get priority
              placement.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-primary" />
                  <span className="text-sm font-medium text-text">
                    Identity verified
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white">
                <span className="text-sm font-medium text-text">
                  Payout account
                </span>
                <button className="text-xs text-primary font-semibold hover:underline">
                  Verify
                </button>
              </div>
            </div>
          </section>

          {/* Privacy */}
          <section className="bg-white rounded-2xl p-6 md:p-8 border border-border-soft">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-5">
              <Eye className="text-primary" size={18} />
              Privacy
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text">
                    Public profile
                  </p>
                  <p className="text-xs text-text-muted">
                    Let students see your creator profile
                  </p>
                </div>
                <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text">
                    Show student count
                  </p>
                  <p className="text-xs text-text-muted">
                    Display total enrollments publicly
                  </p>
                </div>
                <div className="w-11 h-6 bg-border-soft rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-border-soft">
              <button className="w-full flex items-center justify-center gap-2 py-3 border border-border-soft text-text-muted rounded-xl text-sm font-medium hover:border-primary hover:text-primary transition-colors">
                <Download size={15} />
                Export my data
              </button>
            </div>
          </section>

          {/* Danger zone */}
          <section className="bg-red-50 rounded-2xl p-6 md:p-8 border border-red-100">
            <h2 className="text-lg font-bold text-red-900 flex items-center gap-2 mb-3">
              <Trash2 className="text-red-500" size={18} />
              Danger zone
            </h2>
            <p className="text-red-700 text-sm mb-5 leading-relaxed">
              Deleting your account removes all your courses, student data, and
              payout history. This cannot be undone.
            </p>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full py-3 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors"
            >
              Delete account
            </button>
          </section>
        </div>
      </div>

      {/* Delete modal */}
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
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 bg-surface text-text-muted rounded-xl font-medium hover:bg-border-soft transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
