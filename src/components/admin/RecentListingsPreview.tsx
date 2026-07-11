import Link from "next/link";
import { Package } from "lucide-react";

interface RecentItem {
  id: string;
  title: string;
  category: string;
  price: number;
  status: string;
}

interface RecentListingsPreviewProps {
  items: RecentItem[];
}

const STATUS_STYLES: Record<string, string> = {
  Available: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  Reserved: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  Sold: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

export default function RecentListingsPreview({ items }: RecentListingsPreviewProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">Recent Listings</h2>
        <Link
          href="/admin/listings"
          className="text-xs font-medium text-teal-700 hover:underline dark:text-teal-400"
        >
          View all →
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-6 flex flex-col items-center py-8 text-center">
          <Package className="mb-2 h-8 w-8 text-slate-300 dark:text-slate-700" />
          <p className="text-sm text-slate-400 dark:text-slate-600">No listings yet.</p>
        </div>
      ) : (
        <div className="mt-4 flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/items/${item.id}`}
              className="flex items-center justify-between gap-3 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                  {item.title}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">{item.category}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-sm font-semibold text-teal-700 dark:text-teal-400">
                  ৳{item.price.toLocaleString("en-BD")}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    STATUS_STYLES[item.status] ?? STATUS_STYLES.Available
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}