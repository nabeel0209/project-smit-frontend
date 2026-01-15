'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    Home,
    LayoutDashboard,
    BookOpen,
    CreditCard,
    Settings,
    LogOut,
    Menu,
    X,
    Compass
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: LayoutDashboard, label: 'Dashboard', href: '/Dashboard-user' },
    { icon: BookOpen, label: 'My Courses', href: '/Dashboard-user/courses' },
    { icon: CreditCard, label: 'Payments / Purchases', href: '/Dashboard-user/payments' },
    { icon: Settings, label: 'Profile / Settings', href: '/profile' },
    { icon: Compass, label: 'Explore Courses', href: '/explore' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Button - Moved to Right */}
            <button
                className="fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md md:hidden border border-gray-100"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Container - Mobile Right Side */}
            <aside className={cn(
                "fixed inset-y-0 right-0 z-40 w-64 bg-white border-l md:border-l-0 border-gray-200 transition-transform duration-300 ease-in-out md:sticky md:top-0 md:h-screen md:translate-x-0 md:border-r",
                isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
            )}>
                <div className="flex flex-col h-full">
                    {/* Logo - Shifted slightly right on desktop */}
                    <div className="p-6 md:pl-10">
                        <Link href="/Dashboard-user" className="flex items-center gap-2">
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                width={180}
                                height={50}
                                className="h-12 w-auto object-contain"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="px-4 py-4 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-[#10B981] text-white shadow-lg shadow-emerald-100"
                                            : "text-gray-600 hover:bg-emerald-50 hover:text-[#10B981]"
                                    )}
                                >
                                    <item.icon size={20} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout */}
                    <div className="p-4 border-t border-gray-100">
                        <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200">
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
