"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface CategoryChartProps {
  data: { category: string; count: number }[];
}

const COLORS = [
  "#0f766e",
  "#f59e0b",
  "#64748b",
  "#14b8a6",
  "#fbbf24",
  "#94a3b8",
];

export default function CategoryChart({ data }: CategoryChartProps) {
  if (data.length === 0) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        No items listed yet — chart will populate once items are added.
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={90}
          label={(props: unknown) => {
            const entry = props as { category: string; count: number };
            return `${entry.category} (${entry.count})`;
          }}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
