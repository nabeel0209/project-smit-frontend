import { Play } from 'lucide-react';
import Link from 'next/link';

interface CourseCardProps {
    id: number;
    image: string;
    name: string;
    progress: number;
}

export default function CourseCard({ id, image, name, progress }: CourseCardProps) {
    const isCompleted = progress === 100;

    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
            {/* Course Image - Clickable */}
            <Link href={`/User/Dashboard/courses/${id}`}>
                <div className="relative aspect-video cursor-pointer">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {isCompleted && (
                        <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                            Completed
                        </div>
                    )}
                </div>
            </Link>

            {/* Content */}
            <div className="p-5">
                <h4 className="font-bold text-gray-900 mb-4 line-clamp-1">{name}</h4>

                {/* Progress Bar */}
                <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs font-medium text-gray-500">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#10B981] transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Button */}
                <Link href={`/User/Dashboard/courses/${id}`}>
                    <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#10B981] text-white rounded-xl font-semibold hover:bg-[#059669] transition-all duration-200 active:scale-95">
                        <Play size={18} fill="currentColor" />
                        {isCompleted ? 'Review Course' : 'Continue'}
                    </button>
                </Link>
            </div>
        </div>
    );
}
