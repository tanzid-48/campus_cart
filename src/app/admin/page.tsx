import type { Metadata } from "next";
import { getDb } from "@/lib/db";
import StatsCards from "@/components/admin/StatsCards";
import CategoryChart from "@/components/admin/CategoryChart";

import DashboardHeader from "@/components/admin/DashboardHeader";

export const metadata: Metadata = {
  title: "Admin dashboard — CampusCart",
};

export default async function AdminDashboardPage() {
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
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <DashboardHeader />

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
