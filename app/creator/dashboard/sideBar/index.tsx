"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Video, Calendar, CheckSquare,
  Lightbulb, HelpCircle, BarChart3, Settings,
  Power, ChevronLeft, ChevronRight,
} from "lucide-react";

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Video, label: "Videos" },
  { icon: Calendar, label: "Schedule" },
  { icon: CheckSquare, label: "Tasks" },
  { icon: Lightbulb, label: "Insights" },
  { icon: HelpCircle, label: "Help" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Settings, label: "Settings" },
];

export default function SideBar({ isOpen, setIsOpen }: SideBarProps) {
  return (
    <motion.aside
      initial={false}
      // Mobile aur Desktop dono par width 220 ya 80 rahegi
      animate={{ width: isOpen ? 220 : 80 }}
      className="fixed left-0 top-0 h-screen bg-white border-r border-slate-200 flex flex-col py-6 shadow-xl z-50 overflow-hidden"
    >
      {/* Toggle & Logo Area */}
      <div className="px-4 mb-10 flex items-center justify-between">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div 
              key="open-logo"
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="bg-[#5D5FEF] p-2 rounded-xl text-white shrink-0">
                <LayoutDashboard size={24} />
              </div>
              <span className="font-bold text-indigo-900 text-lg ml-3 whitespace-nowrap">
                App Name
              </span>
            </motion.div>
          ) :""}
        </AnimatePresence>

        {/* Toggle Button - Hamesha nazar aayega */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors ${!isOpen ? "absolute right-3 top-5 mr-1" : ""}`}
        >
          {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-2 px-3">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center p-2 rounded-xl cursor-pointer hover:bg-indigo-50 group transition-all ${!isOpen ? "justify-center" : ""}`}
          >
            <item.icon
              className="text-slate-400 group-hover:text-[#5D5FEF] shrink-0"
              size={24}
            />
            {isOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ml-4 font-medium text-slate-600 group-hover:text-[#5D5FEF] whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            )}
          </div>
        ))}
      </nav>

      <div className="mt-auto px-3">
        <div className={`flex items-center p-3 rounded-xl cursor-pointer hover:bg-red-50 group text-slate-400 hover:text-red-500 transition-all ${!isOpen ? "justify-center" : ""}`}>
          <Power size={24} className="shrink-0" />
          {isOpen && <span className="ml-4 font-medium">Logout</span>}
        </div>
      </div>
    </motion.aside>
  );
}