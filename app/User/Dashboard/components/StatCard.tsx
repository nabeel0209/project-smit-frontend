import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    color?: string;
}

export default function StatCard({ title, value, icon: Icon, color = "bg-[#10B981]" }: StatCardProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                    <Icon className={color.replace('bg-', 'text-')} size={24} />
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                </div>
            </div>
        </div>
    );
}
