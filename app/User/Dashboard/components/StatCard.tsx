import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export default function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-border-soft">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-primary-soft">
          <Icon className="text-primary" size={22} />
        </div>
        <div>
          <p className="text-sm text-text-muted">{title}</p>
          <h3 className="text-xl font-bold text-text mt-0.5">{value}</h3>
        </div>
      </div>
    </div>
  );
}
