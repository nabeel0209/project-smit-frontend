import { Bell, LogOut, MessageSquare, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-indigo-900">Creator Dashboard</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Quick Search"
            className="bg-slate-100 pl-10 pr-4 py-2 rounded-xl text-sm outline-none w-64 focus:ring-2 ring-indigo-100"
          />
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
          <div className="w-10 h-10 bg-orange-200 rounded-lg"></div>
          <LogOut size={18} className="text-slate-400 cursor-pointer ml-2" />
        </div>
      </div>
    </header>
  );
}
