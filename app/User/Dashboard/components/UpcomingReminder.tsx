// app/User/Dashboard/components/UpcomingReminders.tsx
import { Bell, Clock } from "lucide-react";

const REMINDERS = [
  { title: "Quiz deadline: React Hooks", time: "Tomorrow, 11:59 PM" },
  { title: "Live Q&A with instructor", time: "Fri, 6:00 PM" },
];

export default function UpcomingReminders() {
  return (
    <section className="bg-surface p-6 rounded-2xl border border-border-soft">
      <div className="flex items-center gap-2 mb-4">
        <Bell size={18} className="text-primary" />
        <h2 className="text-lg font-bold text-text">Upcoming</h2>
      </div>

      {REMINDERS.length > 0 ? (
        <div className="space-y-3">
          {REMINDERS.map((r) => (
            <div
              key={r.title}
              className="bg-white p-3.5 rounded-xl border border-border-soft"
            >
              <p className="text-sm font-medium text-text">{r.title}</p>
              <p className="text-xs text-text-muted mt-1 inline-flex items-center gap-1.5">
                <Clock size={12} />
                {r.time}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-text-muted">Nothing scheduled right now.</p>
      )}
    </section>
  );
}
