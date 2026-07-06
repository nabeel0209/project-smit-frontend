import { Play } from "lucide-react";
import Link from "next/link";

interface CourseCardProps {
  id: number;
  image: string;
  name: string;
  progress: number;
}

export default function CourseCard({
  id,
  image,
  name,
  progress,
}: CourseCardProps) {
  const isCompleted = progress === 100;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-border-soft hover:border-primary transition-colors duration-200 group">
      <Link href={`/User/Dashboard/courses/${id}`}>
        <div className="relative aspect-video">
          <img src={image} alt={name} className="w-full h-full object-cover" />
          {isCompleted && (
            <div className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              Completed
            </div>
          )}
        </div>
      </Link>

      <div className="p-5">
        <h4 className="font-semibold text-text mb-4 line-clamp-1">{name}</h4>

        <div className="space-y-2 mb-5">
          <div className="flex justify-between text-xs text-text-muted">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Link href={`/User/Dashboard/courses/${id}`}>
          <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors">
            <Play size={15} fill="currentColor" />
            {isCompleted ? "Review course" : "Continue"}
          </button>
        </Link>
      </div>
    </div>
  );
}
