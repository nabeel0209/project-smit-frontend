'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ChevronLeft,
    Play,
    CircleCheckBig,
    Clock,
    BookOpen,
    FileText,
    Award,
    Star,
    User,
    Users,
    Globe
} from 'lucide-react';

// dummy data – backend baad me connect hoga
const DUMMY_COURSES = [
    {
        id: 1,
        name: 'React Basics',
        progress: 45,
        image: '/courses/react.png',
        instructor: 'Abdullah khan',
        duration: '12h 30m',
        lessons: 24,
        students: '1,234',
        rating: 4.8,
        description: 'Learn the fundamentals of React including components, props, state, and hooks. This course is designed for beginners who want to build modern web applications.',
        modules: [
            { id: 1, title: 'Introduction to React', duration: '45m', completed: true },
            { id: 2, title: 'JSX and Elements', duration: '1h 20m', completed: true },
            { id: 3, title: 'Components and Props', duration: '1h 10m', completed: true },
            { id: 4, title: 'State and Lifecycle', duration: '2h 15m', completed: false },
            { id: 5, title: 'Handling Events', duration: '1h 30m', completed: false },
        ]
    },
    {
        id: 2,
        name: 'Next.js Mastery',
        progress: 100,
        image: '/courses/nextjs.png',
        instructor: 'Abdullah khan',
        duration: '15h 45m',
        lessons: 32,
        students: '2,567',
        rating: 4.9,
        description: 'Master Next.js with the latest App Router features. Learn about SSR, Static Generation, API Routes, and more.',
        modules: [
            { id: 1, title: 'Getting Started with Next.js', duration: '1h', completed: true },
            { id: 2, title: 'Routing & Navigation', duration: '2h', completed: true },
            { id: 3, title: 'Server Components vs Client Components', duration: '2h 30m', completed: true },
            { id: 4, title: 'Data Fetching & Caching', duration: '3h', completed: true },
        ]
    },
    {
        id: 3,
        name: 'UI/UX Design',
        progress: 30,
        image: '/courses/uiux.png',
        instructor: 'Abdullah khan',
        duration: '10h 20m',
        lessons: 18,
        students: '890',
        rating: 4.7,
        description: 'A comprehensive guide to modern UI/UX design. Learn Figma, color theory, typography, and user-centered design principles.',
        modules: [
            { id: 1, title: 'Design Principles', duration: '1h 30m', completed: true },
            { id: 2, title: 'Introduction to Figma', duration: '2h', completed: true },
            { id: 3, title: 'Wireframing & Prototyping', duration: '3h', completed: false },
        ]
    }
];

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const courseId = parseInt(params.id as string);
    const course = DUMMY_COURSES.find(c => c.id === courseId) || DUMMY_COURSES[0];

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-10 pb-10">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors font-medium group"
            >
                <div className="p-2 rounded-full group-hover:bg-emerald-50">
                    <ChevronLeft size={20} />
                </div>
                Back to Dashboard
            </button>

            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-xl shadow-emerald-900/5">
                <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    <div className="lg:w-1/2 aspect-video lg:aspect-auto">
                        <img
                            src={course.image}
                            alt={course.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Info */}
                    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider">
                                Enrollment Active
                            </span>
                            <div className="flex items-center gap-1 text-amber-500">
                                <Star size={16} fill="currentColor" />
                                <span className="text-sm font-bold">{course.rating}</span>
                            </div>
                        </div>

                        <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">{course.name}</h1>

                        <div className="flex flex-wrap gap-6 mb-8 text-gray-500 text-sm">
                            <div className="flex items-center gap-2">
                                <User size={18} className="text-emerald-500" />
                                <span>By <span className="text-gray-900 font-semibold">{course.instructor}</span></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={18} className="text-emerald-500" />
                                <span>{course.duration} total</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BookOpen size={18} className="text-emerald-500" />
                                <span>{course.lessons} lessons</span>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="space-y-3 mb-8">
                            <div className="flex justify-between items-end">
                                <span className="text-sm font-bold text-gray-700">Course Progress</span>
                                <span className="text-2xl font-black text-emerald-600">{course.progress}%</span>
                            </div>
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-emerald-500 transition-all duration-1000 ease-out"
                                    style={{ width: `${course.progress}%` }}
                                />
                            </div>
                        </div>

                        <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-200 hover:scale-[1.02] active:scale-[0.98]">
                            <Play size={20} fill="currentColor" />
                            {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: About & Modules */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white p-8 rounded-3xl border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">About this course</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {course.description}
                        </p>
                    </section>

                    <section className="bg-white p-8 rounded-3xl border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Course Content</h2>
                            <span className="text-sm text-gray-500">{course.modules.length} Modules</span>
                        </div>

                        <div className="space-y-4">
                            {course.modules.map((module, idx) => (
                                <div
                                    key={module.id}
                                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${module.completed
                                        ? 'bg-emerald-50 border-emerald-100'
                                        : 'bg-gray-50 border-gray-100'
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${module.completed ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-400'
                                        }`}>
                                        {module.completed ? <CircleCheckBig size={24} /> : <span>{idx + 1}</span>}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-gray-900 truncate">{module.title}</h4>
                                        <p className="text-xs text-gray-500">{module.duration}</p>
                                    </div>
                                    {!module.completed && (
                                        <button className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors">
                                            <Play size={18} fill="currentColor" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                
            </div>
        </div>
    );
}
