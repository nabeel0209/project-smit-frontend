// app/User/Dashboard/components/WeeklyGoal.tsx
"use client";

const WEEK_DATA = [
  { day: "M", minutes: 45 },
  { day: "T", minutes: 30 },
  { day: "W", minutes: 60 },
  { day: "T", minutes: 0 },
  { day: "F", minutes: 25 },
  { day: "S", minutes: 50 },
  { day: "S", minutes: 15 },
];

const GOAL_MINUTES = 60;

export default function WeeklyGoal() {
  const totalMinutes = WEEK_DATA.reduce((sum, d) => sum + d.minutes, 0);
  const goalHours = ((GOAL_MINUTES * 7) / 60).toFixed(0);
  const doneHours = (totalMinutes / 60).toFixed(1);

  return (
    <section className="bg-white p-6 rounded-2xl border border-border-soft">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-bold text-text">Weekly goal</h2>
        <span className="text-xs text-text-muted">
          {doneHours}h / {goalHours}h
        </span>
      </div>
      <p className="text-xs text-text-muted mb-5">Minutes learned per day</p>

      <div className="flex items-end justify-between gap-2 h-24">
        {WEEK_DATA.map((d, i) => {
          const heightPct = Math.min((d.minutes / GOAL_MINUTES) * 100, 100);
          const metGoal = d.minutes >= GOAL_MINUTES;
          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-2 h-full"
            >
              <div className="flex-1 w-full flex items-end">
                <div
                  className={`w-full rounded-md transition-all ${
                    metGoal
                      ? "bg-primary"
                      : d.minutes > 0
                        ? "bg-primary/40"
                        : "bg-surface"
                  }`}
                  style={{ height: `${Math.max(heightPct, 4)}%` }}
                />
              </div>
              <span className="text-[11px] text-text-muted">{d.day}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
