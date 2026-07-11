"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface TrendPoint {
  date: string;
  count: number;
}

interface ListingTrendChartProps {
  data: TrendPoint[];
}

export default function ListingTrendChart({ data }: ListingTrendChartProps) {
  if (data.every((d) => d.count === 0)) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-slate-400 dark:text-slate-600">
        Not enough data yet to show a trend.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94a3b8" />
        <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            fontSize: "13px",
          }}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#0f766e"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "#0f766e" }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
