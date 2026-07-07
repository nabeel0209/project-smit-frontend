// app/User/Dashboard/components/StreakStrip.tsx
import { Flame, Trophy, Award, Zap } from "lucide-react";

const BADGES = [
  { icon: Award, label: "First course completed", earned: true },
  { icon: Zap, label: "7-day streak", earned: true },
  { icon: Trophy, label: "Top 10% learner", earned: false },
];

export default function StreakStrip() {
  return (
    <div className="bg-white border border-border-soft rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
      {/* Streak */}
      <div className="flex items-center gap-4 pr-6 sm:border-r border-border-soft w-full sm:w-auto">
        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
          <Flame size={22} className="text-orange-500" />
        </div>
        <div>
          <p className="text-2xl font-bold text-text">7 days</p>
          <p className="text-xs text-text-muted">Current streak</p>
        </div>
      </div>

      {/* XP */}
      <div className="flex items-center gap-4 pr-6 sm:border-r border-border-soft w-full sm:w-auto">
        <div className="w-12 h-12 bg-primary-soft rounded-xl flex items-center justify-center flex-shrink-0">
          <Zap size={22} className="text-primary" />
        </div>
        <div>
          <p className="text-2xl font-bold text-text">1,240</p>
          <p className="text-xs text-text-muted">XP earned</p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex-1 flex items-center gap-3 w-full sm:w-auto">
        {BADGES.map((badge) => (
          <div
            key={badge.label}
            title={badge.label}
            className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
              badge.earned
                ? "bg-primary-soft text-primary"
                : "bg-surface text-text-muted opacity-50"
            }`}
          >
            <badge.icon size={18} />
          </div>
        ))}
        <span className="text-xs text-text-muted ml-1 hidden sm:inline">
          2 of 3 badges earned
        </span>
      </div>
    </div>
  );
}
