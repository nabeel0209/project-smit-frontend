import React from 'react';
import { 
  LayoutDashboard, Video, Calendar, CheckSquare, 
  Lightbulb, HelpCircle, BarChart3, Settings, 
  Search, Bell, MessageSquare, LogOut, Power
} from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] overflow-hidden">
      
      {/* 1. SIDEBAR (Left) */}
      <aside className="w-20 lg:w-24 bg-white border-r border-slate-200 flex flex-col items-center py-8 gap-10">
        <div className="bg-[#5D5FEF] p-3 rounded-2xl shadow-lg shadow-indigo-100">
          <LayoutDashboard className="text-white" size={28} />
        </div>
        
        <nav className="flex flex-col gap-8 text-slate-400">
          <div className="cursor-pointer hover:text-[#5D5FEF] transition-colors"><LayoutDashboard size={24} /></div>
          <div className="cursor-pointer hover:text-[#5D5FEF] transition-colors"><Video size={24} /></div>
          <div className="cursor-pointer hover:text-[#5D5FEF] transition-colors"><Calendar size={24} /></div>
          <div className="cursor-pointer hover:text-[#5D5FEF] transition-colors"><CheckSquare size={24} /></div>
          <div className="cursor-pointer hover:text-[#5D5FEF] transition-colors"><Lightbulb size={24} /></div>
          <div className="cursor-pointer hover:text-[#5D5FEF] transition-colors"><HelpCircle size={24} /></div>
          <div className="cursor-pointer hover:text-[#5D5FEF] transition-colors"><BarChart3 size={24} /></div>
          <div className="cursor-pointer hover:text-[#5D5FEF] transition-colors"><Settings size={24} /></div>
        </nav>

        <div className="mt-auto text-slate-400 cursor-pointer hover:text-red-500">
          <Power size={24} />
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* 2. TOPBAR / HEADER */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
          <h1 className="text-xl font-bold text-indigo-900">Video Performance</h1>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="Quick Search" className="bg-slate-100 pl-10 pr-4 py-2 rounded-xl text-sm outline-none w-64 focus:ring-2 ring-indigo-100" />
            </div>
            <div className="flex items-center gap-4 text-slate-500 border-r pr-6">
              <MessageSquare size={20} className="cursor-pointer" />
              <Bell size={20} className="cursor-pointer" />
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">AR Shakir</p>
                <p className="text-xs text-slate-400">Content Creator</p>
              </div>
              <div className="w-10 h-10 bg-orange-200 rounded-lg overflow-hidden">
                 {/* Profile Image placeholder */}
              </div>
              <LogOut size={18} className="text-slate-400 cursor-pointer ml-2" />
            </div>
          </div>
        </header>

        {/* 3. SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          <div className="grid grid-cols-12 gap-8">
            
            {/* LEFT COLUMN (Recent Videos) */}
            <div className="col-span-12 lg:col-span-3 space-y-8">
              {/* Recent Videos Box */}
              <div className="bg-white rounded-3xl border border-slate-100 p-6 h-[500px] shadow-sm">
                <h3 className="font-bold mb-4">Recent Videos</h3>
                <div className="w-full h-[90%] bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  {/* Content space */}
                </div>
              </div>
              
              {/* New Achievement Box */}
              <div className="bg-white rounded-3xl border border-slate-100 p-6 h-[200px] shadow-sm">
                 <h3 className="font-bold mb-4">New Achievement</h3>
                 <div className="w-full h-[70%] bg-indigo-50 rounded-2xl border-2 border-dashed border-indigo-100"></div>
              </div>
            </div>

            {/* MIDDLE & RIGHT AREA */}
            <div className="col-span-12 lg:col-span-9 space-y-8">
              
              {/* Top Row: Categories + 3 Stats Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1 bg-white rounded-3xl p-6 h-[300px] shadow-sm border border-slate-100">
                   <h3 className="font-bold">Categories</h3>
                   <div className="w-full h-[85%] mt-2 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200"></div>
                </div>
                <div className="bg-red-400 rounded-3xl h-[300px] shadow-lg shadow-red-100"></div>
                <div className="bg-cyan-400 rounded-3xl h-[300px] shadow-lg shadow-cyan-100"></div>
                <div className="bg-indigo-500 rounded-3xl h-[300px] shadow-lg shadow-indigo-100"></div>
              </div>

              {/* Middle Row: Monthly Visitors (Big Graph Area) */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 <div className="md:col-span-3 bg-white rounded-3xl p-8 h-[350px] shadow-sm border border-slate-100">
                    <h3 className="font-bold">Monthly Visitors</h3>
                    <div className="w-full h-[90%] mt-2 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200"></div>
                 </div>
                 {/* Right Side Goals Box */}
                 <div className="bg-white rounded-3xl p-6 h-[350px] shadow-sm border border-slate-100">
                    <h3 className="font-bold">Goals</h3>
                    <div className="w-full h-[90%] mt-2 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200"></div>
                 </div>
              </div>

              {/* Bottom Row: 4 Small Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 <div className="bg-white rounded-2xl h-32 border border-slate-100 shadow-sm"></div>
                 <div className="bg-white rounded-2xl h-32 border border-slate-100 shadow-sm"></div>
                 <div className="bg-white rounded-2xl h-32 border border-slate-100 shadow-sm"></div>
                 <div className="bg-white rounded-2xl h-32 border border-slate-100 shadow-sm"></div>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;