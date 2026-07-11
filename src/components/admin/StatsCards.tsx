import {
  Users,
  Package,
  CheckCircle2,
  TrendingUp,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import FadeInView from "@/components/home/FadeInView";
import { calculateGrowth } from "@/lib/utils";

interface StatsCardsProps {
  totalUsers: number;
  totalItems: number;
  itemsSold: number;
  activeListings: number;
  usersThisWeek: number;
  usersLastWeek: number;
  itemsThisWeek: number;
  itemsLastWeek: number;
}

export default function StatsCards({
  totalUsers,
  totalItems,
  itemsSold,
  activeListings,
  usersThisWeek,
  usersLastWeek,
  itemsThisWeek,
  itemsLastWeek,
}: StatsCardsProps) {
  const userGrowth = calculateGrowth(usersThisWeek, usersLastWeek);
  const itemGrowth = calculateGrowth(itemsThisWeek, itemsLastWeek);

  const stats = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400",
      growth: userGrowth,
    },
    {
      label: "Total Listings",
      value: totalItems,
      icon: Package,
      color:
        "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
      growth: itemGrowth,
    },
    {
      label: "Items Sold",
      value: itemsSold,
      icon: CheckCircle2,
      color:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
      growth: null,
    },
    {
      label: "Active Listings",
      value: activeListings,
      icon: TrendingUp,
      color: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400",
      growth: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <FadeInView
            key={stat.label}
            index={idx}
            className="rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-start justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}
              >
                <Icon size={20} />
              </div>

              {stat.growth && (
                <span
                  className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                    stat.growth.isPositive
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                      : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
                  }`}
                >
                  {stat.growth.isPositive ? (
                    <ArrowUp size={12} />
                  ) : (
                    <ArrowDown size={12} />
                  )}
                  {stat.growth.percent}%
                </span>
              )}
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
            {stat.growth && (
              <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                vs last week
              </p>
            )}
          </FadeInView>
        );
      })}
    </div>
  );
}
