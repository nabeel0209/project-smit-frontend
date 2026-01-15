"use client";
import { useState, useEffect } from "react";
import { Search, MessageSquare, Bell, LogOut, Menu } from "lucide-react";
import SideBar from "./sideBar";
import Header from "./header";
import VedioAndAchivemnet from "./vedios&Achievement";
import CategoriesAndCards from "./categories&cards";


const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Screen size check karne ke liye logic
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Agar mobile hai to sidebar band rakho, desktop hai to khula
      setIsSidebarOpen(!mobile);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] overflow-hidden relative">
      <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
          isSidebarOpen ? "ml-[220px]" : "ml-[80px]"
        }`}
      >
        {/* HEADER */}
        <Header />
        <div className="flex-1 overflow-y-auto p-4 md:p-0 space-y-8">
          <div className="grid bg-[#FFFFFF] grid-cols-12 gap-6">
            <VedioAndAchivemnet />
            {/* Right Side Content */}
            <div className="col-span-12 lg:col-span-9 space-y-8">
              {/* Stats Row */}
              <CategoriesAndCards />
              {/* Graph Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-3 bg-white rounded-3xl p-8 h-[350px] shadow-sm border border-slate-100">
                  <h3 className="font-bold text-slate-800">Monthly Visitors</h3>
                  <div className="w-full h-[90%] mt-2 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200"></div>
                </div>
                <div className="bg-white rounded-3xl p-6 h-[350px] shadow-sm border border-slate-100">
                  <h3 className="font-bold text-slate-800">Goals</h3>
                  <div className="w-full h-[90%] mt-2 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200"></div>
                </div>
              </div>

              {/* Bottom Mini Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-10">
                <div className="bg-white rounded-2xl h-32 border border-slate-100 shadow-sm"></div>
                <div className="bg-white rounded-2xl h-32 border border-slate-100 shadow-sm"></div>
                <div className="bg-white rounded-2xl h-32 border border-slate-100 shadow-sm"></div>
                <div className="bg-white rounded-2xl h-32 border border-slate-100 shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Overlay: Jab mobile pe sidebar khule to baki screen dark hojaye */}
      {isMobile && isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}
    </div>
  );
};

export default DashboardPage;
