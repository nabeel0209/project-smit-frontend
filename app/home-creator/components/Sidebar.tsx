'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  User,
  BookOpen,
  Upload,
  DollarSign,
  BarChart3,
  LogOut,
  Home,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} />, href: '/home-creator', active: true },
  { id: 'profile', label: 'Profile & Settings', icon: <User size={20} />, href: '/home-creator/profile' },
  { id: 'courses', label: 'My Courses', icon: <BookOpen size={20} />, href: '/home-creator/courses' },
  { id: 'upload', label: 'Upload Content', icon: <Upload size={20} />, href: '/home-creator/upload' },
  { id: 'earnings', label: 'Earnings & Analytics', icon: <DollarSign size={20} />, href: '/home-creator/earnings' },
  { id: 'engagement', label: 'Engagement & Stats', icon: <BarChart3 size={20} />, href: '/home-creator/engagement' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-white/90 backdrop-blur-sm border border-[#D1FAE5] text-[#064E3B] hover:bg-[#F0FDF4] transition-all duration-200 shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40
          w-72 bg-white backdrop-blur-xl
          border-r border-[#D1FAE5]
          transform transition-transform duration-300 ease-out
          lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-[#D1FAE5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#10B981] flex items-center justify-center shadow-lg shadow-[#10B981]/25">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#064E3B]">CreatorHub</h1>
              <p className="text-xs text-[#64748B]">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`
                group flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-200
                ${item.active
                  ? 'bg-[#F0FDF4] text-[#064E3B] border border-[#D1FAE5]'
                  : 'text-[#64748B] hover:text-[#064E3B] hover:bg-[#F0FDF4]'
                }
              `}
            >
              <span className={`
                transition-colors duration-200
                ${item.active ? 'text-[#10B981]' : 'text-[#64748B] group-hover:text-[#10B981]'}
              `}>
                {item.icon}
              </span>
              <span className="flex-1 font-medium">{item.label}</span>
              <ChevronRight
                size={16}
                className={`
                  transition-all duration-200
                  ${item.active ? 'opacity-100 text-[#10B981]' : 'opacity-0 group-hover:opacity-100'}
                `}
              />
            </Link>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#D1FAE5]">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F0FDF4] mb-3">
            <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center">
              <span className="text-white font-medium">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#064E3B] font-medium truncate">John Doe</p>
              <p className="text-xs text-[#64748B] truncate">john@example.com</p>
            </div>
          </div>
          <button
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[#64748B] hover:text-red-500 hover:bg-red-50 transition-all duration-200"
            onClick={() => alert('Logout clicked')}
          >
            <LogOut size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
