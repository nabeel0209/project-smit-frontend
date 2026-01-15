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
                <Link href={`User/Home/course/${course.id}`} key={course.id}>
                  <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-emerald-100/50 transition-all duration-500 group">
                    <div className="relative overflow-hidden p-3">
                      <img src={course.thumbnail} className="aspect-video object-cover rounded-4xl group-hover:scale-105 transition-transform duration-500" />
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