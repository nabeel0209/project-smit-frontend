// app/Creator/Analytics/page.tsx
"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Clock,
  Target,
} from "lucide-react";

const REVENUE_DATA = [
  { month: "Jan", revenue: 1840, enrollments: 62 },
  { month: "Feb", revenue: 2100, enrollments: 74 },
  { month: "Mar", revenue: 1950, enrollments: 68 },
  { month: "Apr", revenue: 2680, enrollments: 91 },
  { month: "May", revenue: 3120, enrollments: 105 },
  { month: "Jun", revenue: 2940, enrollments: 98 },
  { month: "Jul", revenue: 3420, enrollments: 118 },
];

const COURSE_PERFORMANCE = [
  { name: "React Basics", revenue: 8940, students: 1240 },
  { name: "Next.js Mastery", revenue: 6120, students: 890 },
  { name: "UI/UX Design", revenue: 3400, students: 512 },
  { name: "Adv. TypeScript", revenue: 2180, students: 340 },
];

const COMPLETION_DATA = [
  { name: "Completed", value: 342, color: "#10b981" },
  { name: "In progress", value: 891, color: "#6ee7b7" },
  { name: "Not started", value: 156, color: "#e2e4dd" },
];

const RETENTION_DATA = [
  { lesson: "L1", retained: 100 },
  { lesson: "L2", retained: 94 },
  { lesson: "L3", retained: 87 },
  { lesson: "L4", retained: 81 },
  { lesson: "L5", retained: 73 },
  { lesson: "L6", retained: 68 },
  { lesson: "L7", retained: 61 },
  { lesson: "L8", retained: 58 },
];

const TRAFFIC_SOURCES = [
  { source: "Direct", value: 38 },
  { source: "Search", value: 27 },
  { source: "Social", value: 19 },
  { source: "Referral", value: 16 },
];

const KPI_CARDS = [
  {
    label: "Total revenue",
    value: "$18,050",
    change: "+18.4%",
    up: true,
    icon: DollarSign,
  },
  {
    label: "New students",
    value: "616",
    change: "+12.1%",
    up: true,
    icon: Users,
  },
  {
    label: "Avg. watch time",
    value: "24m 18s",
    change: "-3.2%",
    up: false,
    icon: Clock,
  },
  {
    label: "Completion rate",
    value: "68%",
    change: "+5.6%",
    up: true,
    icon: Target,
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border-soft rounded-lg px-3 py-2 shadow-sm text-xs">
      <p className="font-medium text-text mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color || p.fill }}>
          {p.name}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export default function CreatorAnalyticsPage() {
  const [period, setPeriod] = useState<"7d" | "30d" | "12m">("12m");

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Analytics</h1>
          <p className="text-text-muted mt-1">
            Performance across all your courses.
          </p>
        </div>

        <div className="flex bg-white border border-border-soft rounded-xl p-1">
          {(["7d", "30d", "12m"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                period === p ? "bg-primary text-white" : "text-text-muted"
              }`}
            >
              {p === "7d" ? "7 days" : p === "30d" ? "30 days" : "12 months"}
            </button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_CARDS.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white border border-border-soft rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-xl bg-primary-soft">
                <kpi.icon className="text-primary" size={18} />
              </div>
              <span
                className={`inline-flex items-center gap-1 text-xs font-medium ${
                  kpi.up ? "text-primary" : "text-red-500"
                }`}
              >
                {kpi.up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                {kpi.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-text">{kpi.value}</p>
            <p className="text-xs text-text-muted mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue + enrollments trend */}
      <section className="bg-white border border-border-soft rounded-2xl p-6">
        <h2 className="text-lg font-bold text-text mb-1">
          Revenue & enrollments
        </h2>
        <p className="text-sm text-text-muted mb-6">
          Monthly trend over the last 7 months
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={REVENUE_DATA}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e4dd"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue ($)"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#revenueFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Course performance comparison */}
        <section className="bg-white border border-border-soft rounded-2xl p-6">
          <h2 className="text-lg font-bold text-text mb-1">
            Course performance
          </h2>
          <p className="text-sm text-text-muted mb-6">Revenue by course</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={COURSE_PERFORMANCE}
              layout="vertical"
              margin={{ left: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e4dd"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12, fill: "#111827" }}
                axisLine={false}
                tickLine={false}
                width={110}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="revenue"
                name="Revenue ($)"
                fill="#10b981"
                radius={[0, 6, 6, 0]}
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* Completion breakdown */}
        <section className="bg-white border border-border-soft rounded-2xl p-6">
          <h2 className="text-lg font-bold text-text mb-1">Student progress</h2>
          <p className="text-sm text-text-muted mb-6">
            Across all enrolled students
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={COMPLETION_DATA}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
              >
                {COMPLETION_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span className="text-xs text-text-muted">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </section>
      </div>

      {/* Lesson retention */}
      <section className="bg-white border border-border-soft rounded-2xl p-6">
        <h2 className="text-lg font-bold text-text mb-1">
          Lesson-by-lesson retention
        </h2>
        <p className="text-sm text-text-muted mb-6">
          % of students still watching at each lesson — helps spot drop-off
          points
        </p>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={RETENTION_DATA}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e4dd"
              vertical={false}
            />
            <XAxis
              dataKey="lesson"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="retained"
              name="Retention"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 4, fill: "#10b981" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Traffic sources */}
      <section className="bg-white border border-border-soft rounded-2xl p-6">
        <h2 className="text-lg font-bold text-text mb-1">Traffic sources</h2>
        <p className="text-sm text-text-muted mb-6">
          How students discover your courses
        </p>
        <div className="space-y-3">
          {TRAFFIC_SOURCES.map((t) => (
            <div key={t.source} className="flex items-center gap-4">
              <span className="w-20 text-sm text-text-muted flex-shrink-0">
                {t.source}
              </span>
              <div className="flex-1 h-2.5 bg-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${t.value}%` }}
                />
              </div>
              <span className="w-10 text-sm font-medium text-text text-right flex-shrink-0">
                {t.value}%
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
