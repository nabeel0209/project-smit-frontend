'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    BookOpen,
    CircleCheck,
    Clock,
    Award,
    Search,
    ChevronRight
} from 'lucide-react';
import StatCard from './components/StatCard';
import CourseCard from './components/CourseCard';
import { StatSkeleton, CourseSkeleton } from './components/SkeletonLoader';

// dummy data – backend baad me connect hoga
const DUMMY_STATS = [
    { title: 'Total Courses Enrolled', value: 8, icon: BookOpen, color: 'bg-blue-500' },
    { title: 'Courses Completed', value: 3, icon: CircleCheck, color: 'bg-emerald-500' },
    { title: 'Hours Spent', value: '45h', icon: Clock, color: 'bg-orange-500' },
    { title: 'Certificates Earned', value: 1, icon: Award, color: 'bg-purple-500' },
];

const DUMMY_COURSES = [
    { id: 1, name: 'React Basics', progress: 45, image: '/courses/react.png' },
    { id: 2, name: 'Next.js Mastery', progress: 100, image: '/courses/nextjs.png' },
    { id: 3, name: 'UI/UX Design', progress: 30, image: '/courses/uiux.png' },
    { id: 4, name: 'Advanced TypeScript', progress: 10, image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60' },
    { id: 5, name: 'Tailwind CSS Tips', progress: 85, image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60' },
    { id: 6, name: 'Node.js Backend', progress: 0, image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=60' },
];

const DUMMY_PAYMENTS = [
    { id: 1, course: 'React Basics', date: '2023-10-15', price: '$49.99', status: 'Paid' },
    { id: 2, course: 'Next.js Mastery', date: '2023-11-02', price: '$79.99', status: 'Paid' },
    { id: 3, course: 'UI/UX Design', date: '2023-12-10', price: '$29.99', status: 'Paid' },
];

export default function DashboardPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate initial loading for skeleton effect
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const filteredCourses = DUMMY_COURSES.filter(course =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-10 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, User! 👋</h1>
                    <p className="text-gray-500 mt-1">Here's what's happening with your courses today.</p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search your courses..."
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Summary Stats */}
            <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {loading ? (
                        Array(4).fill(0).map((_, i) => <StatSkeleton key={i} />)
                    ) : (
                        DUMMY_STATS.map((stat, i) => (
                            <StatCard key={i} {...stat} />
                        ))
                    )}
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Courses Progress */}
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                My Courses <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{filteredCourses.length}</span>
                            </h2>
                            <button className="text-emerald-600 text-sm font-medium hover:underline flex items-center gap-1">
                                View all <ChevronRight size={16} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {loading ? (
                                Array(4).fill(0).map((_, i) => <CourseSkeleton key={i} />)
                            ) : filteredCourses.length > 0 ? (
                                filteredCourses.map(course => (
                                    <CourseCard key={course.id} {...course} />
                                ))
                            ) : (
                                <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="text-gray-300" size={32} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">No courses found</h3>
                                    <p className="text-gray-500">Try adjusting your search query.</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Payments Section */}
                    <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Transactions</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-50 text-sm text-gray-500">
                                        <th className="pb-4 font-medium">Course Name</th>
                                        <th className="pb-4 font-medium">Date</th>
                                        <th className="pb-4 font-medium">Amount</th>
                                        <th className="pb-4 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {DUMMY_PAYMENTS.map((payment) => (
                                        <tr key={payment.id} className="group hover:bg-gray-50 transition-colors">
                                            <td className="py-4 text-sm font-semibold text-gray-800">{payment.course}</td>
                                            <td className="py-4 text-sm text-gray-500">{payment.date}</td>
                                            <td className="py-4 text-sm font-medium text-gray-900">{payment.price}</td>
                                            <td className="py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                                    {payment.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>

                {/* Right Column: Sidebar info */}
                <div className="space-y-8">
                    {/* Recently Accessed */}
                    <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Continue Watching</h2>
                        <div className="space-y-4">
                            {DUMMY_COURSES.slice(0, 3).map(course => (
                                <Link
                                    key={course.id}
                                    href={`/Dashboard-user/courses/${course.id}`}
                                    className="flex items-center gap-4 group cursor-pointer hover:bg-emerald-50/50 p-2 rounded-2xl transition-all"
                                >
                                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                                        <img src={course.image} alt={course.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-emerald-600 transition-colors">{course.name}</h4>
                                        <p className="text-xs text-gray-500 mt-1">{course.progress}% completed</p>
                                    </div>
                                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-100 transition-colors">
                                        <ChevronRight size={18} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                </div>

            </div>
        </div>
    );
}
