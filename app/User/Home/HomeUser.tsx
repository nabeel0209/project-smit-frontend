"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import CourseCard, { Course } from "./CourseCard";

interface DummyProduct {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  category: string;
  rating: number;
}

export default function HomeUser() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=20")
      .then((res) => res.json())
      .then((data) => {
        const mapped: Course[] = data.products.map((p: any, i: number) => ({
          id: p.id,
          title: p.title,
          thumbnail: p.thumbnail,
          price: Math.round(p.price),
          originalPrice: Math.round(p.price * 1.4),
          category: p.category,
          instructor: "Sarah Mitchell",
          instructorAvatar: `https://i.pravatar.cc/64?img=${(i % 70) + 1}`,
          rating: p.rating,
          reviewCount: Math.floor(p.rating * 3000),
          isBestseller: p.rating > 4.5,
          lessonCount: Math.floor(Math.random() * 30) + 8,
          postedDate: "Jun 2026",
        }));
        setCourses(mapped);
        setLoading(false);
      });
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <header className="w-full bg-background/90 backdrop-blur-md py-6 px-6 md:px-10 sticky top-0 z-20 border-b border-border-soft flex justify-center">
        <div className="w-full max-w-2xl flex items-center bg-white border border-border-soft focus-within:border-primary rounded-2xl transition-colors pr-2 pl-5">
          <input
            type="text"
            placeholder="Search your courses..."
            className="flex-1 py-3.5 bg-transparent outline-none text-text font-medium"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-primary text-white p-3 rounded-xl hover:bg-primary-hover transition-colors">
            <Search size={18} />
          </button>
        </div>
      </header>

      <div className="p-6 md:p-10">
        <h2 className="text-xl font-bold text-text mb-6">
          Recommended courses
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-surface border border-border-soft rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="aspect-video bg-white/60" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 w-3/4 bg-white/60 rounded-full" />
                    <div className="h-3 w-1/2 bg-white/60 rounded-full" />
                    <div className="h-6 w-1/3 bg-white/60 rounded-full mt-2" />
                  </div>
                </div>
              ))
            : filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  href={`/User/Home/course/${course.id}`}
                />
              ))}
        </div>

        {!loading && filteredCourses.length === 0 && (
          <p className="text-center text-text-muted py-16">
            No courses match your search.
          </p>
        )}
      </div>
    </>
  );
}
