import { Users, Package, CheckCircle2, ShoppingBag } from "lucide-react";

interface StatsCardsProps {
  totalUsers: number;
  totalItems: number;
  itemsSold: number;
  activeListings: number;
}

const cards = [
  { key: "totalUsers", label: "Total users", icon: Users },
  { key: "totalItems", label: "Total items", icon: Package },
  { key: "itemsSold", label: "Items sold", icon: CheckCircle2 },
  { key: "activeListings", label: "Active listings", icon: ShoppingBag },
] as const;

export default function StatsCards(props: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ key, label, icon: Icon }) => (
        <div
          key={key}
          className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {label}
            </p>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-400">
              <Icon className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
            {props[key].toLocaleString("en-US")}
          </p>
        </div>
      ))}
    </div>
  );
}
