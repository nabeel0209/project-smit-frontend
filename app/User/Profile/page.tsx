'use client';

import { useState } from 'react';
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
    ChevronRight,
    Edit2,
    Save
} from 'lucide-react';

export default function ProfilePage() {
    const [role] = useState<'user' | 'creator'>('creator'); // Toggle for demo
    const [isEditingPersonal, setIsEditingPersonal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Mock Data
    const [userData] = useState({
        fullName: 'Munib Jahangir',
        displayName: 'Munib_Dev',
        email: 'munibjahangir10@gmail.com',
        dob: '1998-05-15',
        gender: 'Male',
        phone: '+92 312 3456789',
        bio: 'Passionate developer and content creator focused on building modern web applications.',
        location: 'Karachi, Pakistan',
        website: 'https://munib.dev',
        twitter: '@munib_dev',
        linkedin: 'munibjahangir',
        github: 'Munib214'
    });

    const handleSavePersonal = () => {
        setIsEditingPersonal(false);
        // Save logic would go here
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
            {/* 3.1 Profile Header Section */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-emerald-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50" />
                <div className="relative flex flex-col md:flex-row items-center gap-6">
                    <div className="relative group">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-emerald-100 overflow-hidden bg-emerald-50 flex items-center justify-center">
                            <User className="w-12 h-12 md:w-16 md:h-16 text-emerald-200" />
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 transition-all">
                            <Camera size={18} />
                        </button>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{userData.fullName}</h1>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold w-fit mx-auto md:mx-0 ${role === 'creator' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                {role === 'creator' ? 'Creator' : 'User'}
                            </span>
                        </div>
                        <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2">
                            <Mail size={16} />
                            {userData.email}
                        </p>
                        <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                            <button className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-100 transition-all">
                                Change Profile Picture
                            </button>
                            <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all">
                                Remove Avatar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    {/* 3.2 Personal Information (Editable) */}
                    <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <User className="text-emerald-500" size={20} />
                                Personal Information
                            </h2>
                            {!isEditingPersonal ? (
                                <button
                                    onClick={() => setIsEditingPersonal(true)}
                                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                                >
                                    <Edit2 size={16} /> Edit
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setIsEditingPersonal(false)}
                                        className="px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-lg transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSavePersonal}
                                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg transition-all"
                                    >
                                        <Save size={16} /> Save
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-500">Full Name</label>
                                <input
                                    type="text"
                                    disabled={!isEditingPersonal}
                                    defaultValue={userData.fullName}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                                <input
                                    type="date"
                                    disabled={!isEditingPersonal}
                                    defaultValue={userData.dob}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-500">Gender</label>
                                <select
                                    disabled={!isEditingPersonal}
                                    defaultValue={userData.gender}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed appearance-none"
                                >
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-500">Phone Number</label>
                                <input
                                    type="tel"
                                    disabled={!isEditingPersonal}
                                    defaultValue={userData.phone}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </section>

                    {/* 3.3 Public Profile Information */}
                    <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                            <Globe className="text-emerald-500" size={20} />
                            Public Profile Information
                        </h2>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-500">Display Name</label>
                                <input
                                    type="text"
                                    defaultValue={userData.displayName}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-500">Bio / About Me</label>
                                <textarea
                                    rows={4}
                                    defaultValue={userData.bio}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all resize-none"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-500">Country / City</label>
                                    <div className="relative text-gray-400 focus-within:text-emerald-500">
                                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="text"
                                            defaultValue={userData.location}
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all text-gray-900"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-500">Verify Phone Number</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="tel"
                                            defaultValue={userData.phone}
                                            className="flex-1 px-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all"
                                        />
                                        <button className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-semibold hover:bg-emerald-100 transition-all whitespace-nowrap">
                                            Verify
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-medium text-gray-500 uppercase tracking-wider">Social Links</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50">
                                        <Twitter size={18} className="text-[#1DA1F2]" />
                                        <input type="text" placeholder="Twitter URL" className="bg-transparent outline-none text-sm w-full" defaultValue={userData.twitter} />
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50">
                                        <Linkedin size={18} className="text-[#0A66C2]" />
                                        <input type="text" placeholder="LinkedIn URL" className="bg-transparent outline-none text-sm w-full" defaultValue={userData.linkedin} />
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50">
                                        <Github size={18} className="text-[#333]" />
                                        <input type="text" placeholder="GitHub URL" className="bg-transparent outline-none text-sm w-full" defaultValue={userData.github} />
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50">
                                        <Globe size={18} className="text-emerald-500" />
                                        <input type="text" placeholder="Website" className="bg-transparent outline-none text-sm w-full" defaultValue={userData.website} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    {/* 3.4 Account & Security Section */}
                    <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                            <Shield className="text-emerald-500" size={20} />
                            Account & Security
                        </h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-500">Email Address</label>
                                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 text-gray-500 text-sm">
                                    {userData.email}
                                    <Lock size={14} />
                                </div>
                            </div>
                            <div className="pt-4 space-y-4">
                                <h3 className="text-sm font-semibold text-gray-900">Update Password</h3>
                                <div className="space-y-3">
                                    <input type="password" placeholder="Current Password" className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-emerald-500 outline-none text-sm" />
                                    <input type="password" placeholder="New Password" className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-emerald-500 outline-none text-sm" />
                                    <input type="password" placeholder="Confirm New Password" className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-emerald-500 outline-none text-sm" />
                                    <button className="w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-black transition-all">
                                        Update Password
                                    </button>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-gray-100">
                                <button className="w-full py-3 border border-red-100 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50 transition-all">
                                    Logout from all devices
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* 3.5 Preferences / Settings */}
                    <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-6">
                            <Bell className="text-emerald-500" size={20} />
                            Preferences
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Dark Mode</p>
                                    <p className="text-xs text-gray-500">Toggle dark theme</p>
                                </div>
                                <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm shadow-black/10" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 accent-emerald-500" defaultChecked />
                                    <span className="text-sm text-gray-500">Course Updates</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 accent-emerald-500" defaultChecked />
                                    <span className="text-sm text-gray-500">Offers & Announcements</span>
                                </label>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">Language</label>
                                <select className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-sm outline-none">
                                    <option>English (US)</option>
                                    <option>Urdu</option>
                                    <option>Spanish</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* 3.6 Creator-only Section (Conditional UI) */}
                    {role === 'creator' && (
                        <section className="bg-emerald-50 rounded-3xl p-6 md:p-8 shadow-sm border border-emerald-100">
                            <h2 className="text-xl font-bold text-emerald-900 flex items-center gap-2 mb-4">
                                <CheckCircle className="text-emerald-500" size={20} />
                                Creator Status
                            </h2>
                            <p className="text-emerald-700 text-sm mb-6 leading-relaxed">
                                You are registered as a creator. You can now create and manage your own courses.
                            </p>
                            <div className="space-y-3">
                                <button className="w-full py-3 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                                    Go to Creator Dashboard
                                    <ChevronRight size={16} />
                                </button>
                                <button className="w-full py-3 border border-emerald-200 text-emerald-600 rounded-xl text-sm font-medium hover:bg-emerald-100 transition-all">
                                    Edit Creator Profile
                                </button>
                            </div>
                        </section>
                    )}

                    {/* 3.7 Danger Zone (Optional but Recommended) */}
                    <section className="bg-red-50 rounded-3xl p-6 md:p-8 shadow-sm border border-red-100">
                        <h2 className="text-xl font-bold text-red-900 flex items-center gap-2 mb-4">
                            <Trash2 className="text-red-500" size={20} />
                            Danger Zone
                        </h2>
                        <p className="text-red-700 text-sm mb-6 leading-relaxed">
                            Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="w-full py-3 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-all shadow-lg shadow-red-100"
                        >
                            Delete Account
                        </button>
                    </section>
                </div>
            </div>

            {/* Modal Dummy for Delete Confirmation */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl scale-in-center overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full -mr-12 -mt-12" />
                        <div className="relative">
                            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Trash2 size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">Delete Account?</h3>
                            <p className="text-gray-500 text-center mb-8">
                                Are you sure you want to delete your account? This action cannot be undone.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-medium hover:bg-gray-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
