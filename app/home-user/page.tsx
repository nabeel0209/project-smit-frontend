"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  LogOut, Search, Home, LayoutDashboard, 
  BookOpen, CreditCard, Settings, User, Compass 
} from "lucide-react";

export default function HomeUser() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200000);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=20")
      .then(res => res.json())
      .then(data => {
        setCourses(data.products);
        setLoading(false);
      });
  }, []);

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(search.toLowerCase()) && 
    course.price >= minPrice && course.price <= maxPrice
  );

  return (
    <div className="flex min-h-screen bg-[#F9FAFB] font-sans text-[#334155]">
      
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 hidden lg:flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10 px-4 text-[#10B981]">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
          </svg>
        </div>

        <nav className="space-y-1 flex-1">
          {/* ✅ HOME IS NOW HIGHLIGHTED */}
          <Link href="/" className="flex items-center gap-4 px-4 py-3 rounded-xl font-semibold bg-[#10B981] text-white shadow-md shadow-emerald-100">
            <Home size={22} />
            <span>Home</span>
          </Link>

          <Link href="/home-user" className="flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-[#64748B] hover:bg-gray-50 transition-all">
            <LayoutDashboard size={22} />
            <span>Dashboard</span>
          </Link>

          <Link href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-[#64748B] hover:bg-gray-50 transition-all">
            <BookOpen size={22} />
            <span>My Courses</span>
          </Link>

          <Link href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-[#64748B] hover:bg-gray-50 transition-all">
            <CreditCard size={22} />
            <span>Payments</span>
          </Link>

          <Link href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-[#64748B] hover:bg-gray-50 transition-all">
            <User size={22} />
            <span>Profile</span>
          </Link>

          <Link href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-[#64748B] hover:bg-gray-50 transition-all">
            <Settings size={22} />
            <span>Settings</span>
          </Link>

          <Link href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-[#64748B] hover:bg-gray-50 transition-all">
            <Compass size={22} />
            <span>Explore Courses</span>
          </Link>
        </nav>

        {/* Price Filter Section */}
        <div className="pt-8 border-t-2 border-gray-100 mb-12">
          <p className="text-[11px] font-black text-[#064E3B] uppercase tracking-[0.15em] mb-5 px-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#10B981] rounded-full"></span>
            Price Filter
          </p>
          
          <div className="flex flex-col gap-3 px-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">$</span>
              <input 
                type="number" 
                placeholder="Min" 
                className="w-full pl-7 pr-3 py-3 bg-white border-2 border-gray-100 rounded-xl text-sm font-bold text-[#064E3B] outline-none focus:border-[#10B981] transition-all"
                onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">$</span>
              <input 
                type="number" 
                placeholder="Max" 
                className="w-full pl-7 pr-3 py-3 bg-white border-2 border-gray-100 rounded-xl text-sm font-bold text-[#064E3B] outline-none focus:border-[#10B981] transition-all"
                onChange={(e) => setMaxPrice(Number(e.target.value) || 200000)}
              />
            </div>
          </div>
        </div>

        <button className="flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all mt-auto mb-4">
          <LogOut size={22} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="w-full bg-white/80 backdrop-blur-md py-8 px-10 sticky top-0 z-20 border-b border-gray-100 flex justify-center items-center">
          <div className="w-full max-w-2xl flex items-center bg-white border-2 border-gray-100 focus-within:border-[#10B981] rounded-2xl transition-all pr-2 pl-6 group shadow-sm">
            <input 
              type="text" 
              placeholder="Search your favorite courses..."
              className="flex-1 py-4 bg-transparent outline-none text-slate-700 font-medium text-lg"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-[#10B981] text-white p-3.5 rounded-xl hover:bg-emerald-600 transition-colors shadow-sm">
              <Search size={22} />
            </button>
          </div>
        </header>

        <div className="p-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 px-4">Recommended Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
            {!loading && filteredCourses.map((course) => (
                <Link href={`/home-user/course/${course.id}`} key={course.id}>
                  <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500 group">
                    <div className="relative overflow-hidden p-3">
                      <img src={course.thumbnail} className="aspect-video object-cover rounded-[2rem] group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 pt-0">
                      <h3 className="font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-600 transition-colors">{course.title}</h3>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-2xl font-black text-slate-900">${course.price}</span>
                        <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-black group-hover:bg-[#10B981] group-hover:text-white transition-all">
                          Enroll Now
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
      </main>
    </div>
  );
}