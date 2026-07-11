import { LayoutDashboard } from "lucide-react";

export default function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400">
            <LayoutDashboard size={20} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">  👋 Admin Dashboard</h1>
        </div>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{today}</p>
      </div>
    </div>
  );
}