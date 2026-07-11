"use client";

import { createCourse, CourseLevel } from "@/app/services/course";
import { useMutation } from "@tanstack/react-query";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  title: string;
  shortDescription: string;
  description: string;
  thumbnail: string;
  category: string;
  level: CourseLevel;
  price: number;
  requirements: string;
  learningOutcomes: string;
};

const inputClass =
  "w-full bg-white border border-border-soft rounded-xl px-4 py-3 text-sm text-text placeholder:text-text-muted outline-none focus:border-primary transition-colors";

export default function NewCoursePage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      level: "beginner",
      price: 0,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      toast.success("Course created successfully.");
      router.push("/Creator/Courses");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to create course.");
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate({
      title: data.title,
      shortDescription: data.shortDescription,
      description: data.description,
      thumbnail: data.thumbnail,
      category: data.category,
      level: data.level,
      price: Number(data.price),
      requirements: data.requirements
        ? data.requirements.split("\n").filter(Boolean)
        : [],
      learningOutcomes: data.learningOutcomes
        ? data.learningOutcomes.split("\n").filter(Boolean)
        : [],
    });
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Link
            href="/Creator/Courses"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-3"
          >
            <ArrowLeft size={16} />
            Back to courses
          </Link>

          <h1 className="text-2xl font-bold text-text">Create new course</h1>
          <p className="text-text-muted mt-1">
            Add the basic course details. It will be saved as a draft first.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border border-border-soft rounded-2xl p-6 md:p-8 space-y-6"
      >
        <div>
          <label className="text-sm font-medium text-text">Course title</label>
          <input
            type="text"
            placeholder="e.g. React Mastery"
            {...register("title", { required: "Course title is required" })}
            className={`${inputClass} mt-2`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-text">
            Short description
          </label>
          <input
            type="text"
            placeholder="Short one-line summary"
            {...register("shortDescription")}
            className={`${inputClass} mt-2`}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-text">
            Full description
          </label>
          <textarea
            rows={5}
            placeholder="Explain what this course is about..."
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 20,
                message: "Description must be at least 20 characters",
              },
            })}
            className={`${inputClass} mt-2 resize-none`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-text">Thumbnail URL</label>
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            {...register("thumbnail")}
            className={`${inputClass} mt-2`}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-text">Category</label>
            <input
              type="text"
              placeholder="Web Development"
              {...register("category", { required: "Category is required" })}
              className={`${inputClass} mt-2`}
            />
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-text">Level</label>
            <select {...register("level")} className={`${inputClass} mt-2`}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-text">Price</label>
            <input
              type="number"
              min={0}
              placeholder="2500"
              {...register("price", { valueAsNumber: true })}
              className={`${inputClass} mt-2`}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-text">Requirements</label>
          <textarea
            rows={4}
            placeholder={
              "Write one requirement per line\nBasic HTML\nBasic JavaScript"
            }
            {...register("requirements")}
            className={`${inputClass} mt-2 resize-none`}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-text">
            Learning outcomes
          </label>
          <textarea
            rows={4}
            placeholder={
              "Write one outcome per line\nBuild React components\nUse hooks properly"
            }
            {...register("learningOutcomes")}
            className={`${inputClass} mt-2 resize-none`}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link href="/Creator/Courses">
            <button
              type="button"
              className="px-5 py-3 rounded-xl border border-border-soft text-sm font-semibold text-text hover:bg-surface transition-colors"
            >
              Cancel
            </button>
          </Link>

          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors disabled:opacity-70 disabled:cursor-not-allowed min-w-32"
          >
            {isPending ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin" size={18} />
              </span>
            ) : (
              "Create course"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
