import { Users, Package, CheckCircle2, TrendingUp } from "lucide-react";
import FadeInView from "@/components/home/FadeInView";

interface StatsCardsProps {
  totalUsers: number;
  totalItems: number;
  itemsSold: number;
  activeListings: number;
}

export default function StatsCards({ totalUsers, totalItems, itemsSold, activeListings }: StatsCardsProps) {
  const stats = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400",
    },
    {
      label: "Total Listings",
      value: totalItems,
      icon: Package,
      color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
    },
    {
      label: "Items Sold",
      value: itemsSold,
      icon: CheckCircle2,
      color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
    },
    {
      label: "Active Listings",
      value: activeListings,
      icon: TrendingUp,
      color: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400",
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
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}>
              <Icon size={20} />
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
          </FadeInView>
        );
      })}
    </div>
  );
}