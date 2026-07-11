import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth-session";
import { getDb } from "@/lib/db";
import StatsCards from "@/components/admin/StatsCards";
import CategoryChart from "@/components/admin/CategoryChart";

export const metadata: Metadata = {
  title: "Admin dashboard — CampusCart",
};

export default async function AdminDashboardPage() {
  // Real security check — proxy.ts only handles the quick redirect
  // before the page loads.
  await requireAdmin();

  const db = await getDb();

  const [totalUsers, totalItems, itemsSold, activeListings, categoryAgg] =
    await Promise.all([
      db.collection("user").countDocuments(),
      db.collection("items").countDocuments(),
      db.collection("items").countDocuments({ status: "Sold" }),
      db.collection("items").countDocuments({ status: "Available" }),
      db
        .collection("items")
        .aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }])
        .toArray(),
    ]);

  const categoryDistribution = categoryAgg.map((c) => ({
    category: c._id as string,
    count: c.count as number,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        Admin dashboard
      </h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Platform overview and moderation tools.
      </p>

      <div className="mt-8">
        <StatsCards
          totalUsers={totalUsers}
          totalItems={totalItems}
          itemsSold={itemsSold}
          activeListings={activeListings}
        />
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Listings by category
        </h2>
        <div className="mt-4">
          <CategoryChart data={categoryDistribution} />
        </div>
      </div>
    </div>
  );
}
