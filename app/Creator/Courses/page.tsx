"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  MoreVertical,
  Star,
  Users,
  DollarSign,
  Edit2,
  Trash2,
  Eye,
  Loader2,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Course,
  deleteCourse,
  getMyCourses,
  publishCourse,
} from "@/app/services/course";
import toast from "react-hot-toast";

const statusStyles: Record<Course["status"], string> = {
  published: "bg-primary-soft text-primary",
  draft: "bg-surface text-text-muted",
};

const formatStatus = (status: Course["status"]) => {
  return status === "published" ? "Published" : "Draft";
};

export default function CreatorCoursesPage() {
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const {
    data: courses = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["creator-courses"],
    queryFn: getMyCourses,
  });

  const publishMutation = useMutation({
    mutationFn: publishCourse,
    onSuccess: () => {
      toast.success("Course published successfully.");
      queryClient.invalidateQueries({ queryKey: ["creator-courses"] });
      setOpenMenuId(null);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to publish course.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      toast.success("Course deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["creator-courses"] });
      setOpenMenuId(null);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete course.");
    },
  });

  const filtered = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (courseId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?",
    );

    if (!confirmed) return;

    deleteMutation.mutate(courseId);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">My courses</h1>
          <p className="text-text-muted mt-1">
            {courses.length} {courses.length === 1 ? "course" : "courses"}{" "}
            total.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted"
              size={16}
            />
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2.5 bg-white border border-border-soft rounded-xl outline-none focus:border-primary transition-colors text-sm w-56"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Link href="/Creator/Courses/new">
            <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap">
              <Plus size={16} />
              New course
            </button>
          </Link>
        </div>
      </div>

      {isLoading && (
        <div className="py-20 flex items-center justify-center bg-white rounded-2xl border border-border-soft">
          <Loader2 className="animate-spin text-primary" size={28} />
        </div>
      )}

      {isError && (
        <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-red-200">
          <h3 className="text-base font-semibold text-red-600">
            Failed to load courses
          </h3>
          <p className="text-text-muted text-sm mt-1">
            Please refresh the page or try again later.
          </p>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="space-y-3">
          {filtered.map((course) => (
            <div
              key={course._id}
              className="bg-white border border-border-soft rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <img
                src={
                  course.thumbnail ||
                  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=60"
                }
                alt={course.title}
                className="w-full sm:w-32 aspect-video sm:aspect-[4/3] object-cover rounded-xl flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-semibold text-text truncate">
                    {course.title}
                  </h3>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-medium flex-shrink-0 ${statusStyles[course.status]}`}
                  >
                    {formatStatus(course.status)}
                  </span>
                </div>

                <p className="text-xs text-text-muted line-clamp-1 mb-2">
                  {course.shortDescription || course.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Users size={13} />0 students
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    No ratings
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <DollarSign size={13} />
                    PKR {course.price.toLocaleString()}
                  </span>

                  <span className="capitalize">{course.level}</span>
                  <span>{course.category}</span>
                </div>
              </div>

              <div className="relative flex items-center gap-2 flex-shrink-0">
                <Link href={`/Creator/Courses/${course._id}/edit`}>
                  <button className="p-2 text-text-muted hover:text-primary hover:bg-primary-soft rounded-lg transition-colors">
                    <Edit2 size={16} />
                  </button>
                </Link>

                <button
                  onClick={() =>
                    setOpenMenuId(openMenuId === course._id ? null : course._id)
                  }
                  className="p-2 text-text-muted hover:bg-surface rounded-lg transition-colors"
                >
                  <MoreVertical size={16} />
                </button>

                {openMenuId === course._id && (
                  <div className="absolute right-0 top-10 z-10 w-48 bg-white border border-border-soft rounded-xl overflow-hidden shadow-sm">
                    {course.status === "draft" && (
                      <button
                        onClick={() => publishMutation.mutate(course._id)}
                        disabled={publishMutation.isPending}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-text hover:bg-surface transition-colors text-left disabled:opacity-60"
                      >
                        <Eye size={15} />
                        Publish
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(course._id)}
                      disabled={deleteMutation.isPending}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left disabled:opacity-60"
                    >
                      <Trash2 size={15} />
                      Delete course
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-border-soft">
              <div className="w-14 h-14 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-text-muted" size={26} />
              </div>

              <h3 className="text-base font-semibold text-text">
                {courses.length === 0 ? "No courses yet" : "No courses found"}
              </h3>

              <p className="text-text-muted text-sm mt-1">
                {courses.length === 0
                  ? "Create your first course to get started."
                  : "Try a different search term."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
