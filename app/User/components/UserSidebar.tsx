"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  LayoutDashboard,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  HelpCircle,
  CreditCard,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAuthStore } from "@/app/services/auth.store";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: Home, label: "Home", href: "/User" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/User/Dashboard" },
  { icon: BookOpen, label: "My Courses", href: "/User/Dashboard/courses" },
  { icon: CreditCard, label: "Billing", href: "/User/Billing" },
  { icon: User, label: "Profile", href: "/User/Profile" },
  { icon: HelpCircle, label: "Help", href: "/Help" },
  { icon: Settings, label: "Settings", href: "/User/Settings" },
];

export default function UserSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await useAuthStore.getState().logout();
    router.push("/login");
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-sm border border-border-soft md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-64 bg-white border-l md:border-l-0 border-border-soft transition-transform duration-300 ease-in-out md:sticky md:top-0 md:h-screen md:translate-x-0 md:border-r",
          isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6">
            <Link href="/User" className="flex items-center gap-2">
              <img
                src="/icons/siteIcon/logo.svg"
                alt="Learnix Labs"
                className="w-9 h-9"
              />
              <span className="text-base font-semibold text-text">
                Learnix Labs
              </span>
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
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "bg-primary text-white"
                      : "text-text-muted hover:bg-surface hover:text-text",
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="mt-auto p-4 border-t border-border-soft">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
