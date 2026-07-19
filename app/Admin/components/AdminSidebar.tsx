"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Shield,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAuthStore } from "@/app/services/auth.store";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: Users, label: "User Management", href: "/Admin" },
  { icon: HelpCircle, label: "Support", href: "/Admin/Support" },

  // future disabled pages
  { icon: BookOpen, label: "Courses", href: "/Admin/Courses", disabled: true },
  {
    icon: BarChart3,
    label: "Analytics",
    href: "/Admin/Analytics",
    disabled: true,
  },
  { icon: Shield, label: "Roles", href: "/Admin/Roles", disabled: true },
  {
    icon: Settings,
    label: "Settings",
    href: "/Admin/Settings",
    disabled: true,
  },
];

export default function AdminSidebar() {
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
            <Link href="/Admin" className="flex items-center gap-2">
              <img
                src="/icons/siteIcon/logo.svg"
                alt="Learnix Labs"
                className="w-9 h-9"
              />

              <div className="flex flex-col leading-tight">
                <span className="text-base font-semibold text-text">
                  Learnix Labs
                </span>
                <span className="text-[11px] text-primary font-medium">
                  Admin Panel
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/Admin" && pathname.startsWith(item.href));

              if (item.disabled) {
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-text-muted opacity-40 cursor-not-allowed"
                  >
                    <item.icon size={18} />
                    {item.label}
                    <span className="ml-auto text-[10px]">Soon</span>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
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
