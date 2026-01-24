'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { SkeletonChart } from './SkeletonLoader';
import type { EarningsDataPoint } from './data';

interface EarningsChartProps {
  data: EarningsDataPoint[];
  isLoading?: boolean;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#D1FAE5] rounded-xl p-3 shadow-xl">
        <p className="text-[#64748B] text-sm mb-1">{label}</p>
        <p className="text-[#064E3B] font-bold text-lg">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
}

export default function EarningsChart({ data, isLoading = false }: EarningsChartProps) {
  if (isLoading) {
    return <SkeletonChart />;
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#D1FAE5]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-[#064E3B]">Earnings Overview</h3>
          <p className="text-[#64748B] text-sm mt-1">Monthly revenue breakdown</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-[#F0FDF4] text-[#10B981] border border-[#D1FAE5] text-sm font-medium">
            12 Months
          </button>
          <button className="px-3 py-1.5 rounded-lg text-[#64748B] hover:bg-[#F0FDF4] text-sm font-medium transition-colors">
            6 Months
          </button>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#D1FAE5"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748B', fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="earnings"
              stroke="#10B981"
              strokeWidth={3}
              fill="url(#earningsGradient)"
              dot={false}
              activeDot={{
                r: 6,
                fill: '#10B981',
                stroke: '#fff',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
