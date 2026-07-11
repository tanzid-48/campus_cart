import type { Metadata } from "next";
import { getDb } from "@/lib/db";
import DashboardHeader from "@/components/admin/DashboardHeader";
import StatsCards from "@/components/admin/StatsCards";
import CategoryChart from "@/components/admin/CategoryChart";
import RecentListingsPreview from "@/components/admin/RecentListingsPreview";
import FadeInView from "@/components/home/FadeInView";

export const metadata: Metadata = {
  title: "Admin dashboard — CampusCart",
};

export default async function AdminDashboardPage() {
  const db = await getDb();

  const [totalUsers, totalItems, itemsSold, activeListings, categoryAgg, recentDocs] = await Promise.all([
    db.collection("user").countDocuments(),
    db.collection("items").countDocuments(),
    db.collection("items").countDocuments({ status: "Sold" }),
    db.collection("items").countDocuments({ status: "Available" }),
    db.collection("items").aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }]).toArray(),
    db.collection("items").find({}).sort({ createdAt: -1 }).limit(5).toArray(),
  ]);

  const categoryDistribution = categoryAgg.map((c) => ({
    category: c._id as string,
    count: c.count as number,
  }));

  const recentItems = recentDocs.map((doc) => ({
    id: doc._id.toString(),
    title: doc.title,
    category: doc.category,
    price: doc.price,
    status: doc.status,
  }));

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader />

        <div className="mt-8">
          <StatsCards
            totalUsers={totalUsers}
            totalItems={totalItems}
            itemsSold={itemsSold}
            activeListings={activeListings}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FadeInView
            index={0}
            className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Listings by Category</h2>
            <div className="mt-4">
              <CategoryChart data={categoryDistribution} />
            </div>
          </FadeInView>

          <FadeInView index={1}>
            <RecentListingsPreview items={recentItems} />
          </FadeInView>
        </div>
      </div>
    </div>
  );
}