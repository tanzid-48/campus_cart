import type { Metadata } from "next";
import { getDb } from "@/lib/db";
import DashboardHeader from "@/components/admin/DashboardHeader";
import StatsCards from "@/components/admin/StatsCards";
import CategoryChart from "@/components/admin/CategoryChart";
import ListingTrendChart from "@/components/admin/ListingTrendChart";
import RecentListingsPreview from "@/components/admin/RecentListingsPreview";
import FadeInView from "@/components/home/FadeInView";

export const metadata: Metadata = {
  title: "Admin dashboard — CampusCart",
};

function getDateDaysAgo(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

export default async function AdminDashboardPage() {
  const db = await getDb();

  const now = new Date();
  const oneWeekAgo = getDateDaysAgo(7);
  const twoWeeksAgo = getDateDaysAgo(14);
  const last14Days = getDateDaysAgo(13); // for the trend chart (14-day window)

  const [
    totalUsers,
    totalItems,
    itemsSold,
    activeListings,
    categoryAgg,
    recentDocs,
    usersThisWeek,
    usersLastWeek,
    itemsThisWeek,
    itemsLastWeek,
    trendDocs,
  ] = await Promise.all([
    db.collection("user").countDocuments(),
    db.collection("items").countDocuments(),
    db.collection("items").countDocuments({ status: "Sold" }),
    db.collection("items").countDocuments({ status: "Available" }),
    db
      .collection("items")
      .aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }])
      .toArray(),
    db.collection("items").find({}).sort({ createdAt: -1 }).limit(5).toArray(),
    db.collection("user").countDocuments({ createdAt: { $gte: oneWeekAgo } }),
    db
      .collection("user")
      .countDocuments({ createdAt: { $gte: twoWeeksAgo, $lt: oneWeekAgo } }),
    db.collection("items").countDocuments({ createdAt: { $gte: oneWeekAgo } }),
    db
      .collection("items")
      .countDocuments({ createdAt: { $gte: twoWeeksAgo, $lt: oneWeekAgo } }),
    db
      .collection("items")
      .find({ createdAt: { $gte: last14Days } })
      .project({ createdAt: 1 })
      .toArray(),
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

  // Build a 14-day trend series, filling in days with zero listings
  const trendMap = new Map<string, number>();
  for (let i = 13; i >= 0; i--) {
    const d = getDateDaysAgo(i);
    const key = d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
    trendMap.set(key, 0);
  }
  trendDocs.forEach((doc) => {
    const key = new Date(doc.createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
    if (trendMap.has(key)) {
      trendMap.set(key, (trendMap.get(key) ?? 0) + 1);
    }
  });
  const trendData = Array.from(trendMap.entries()).map(([date, count]) => ({
    date,
    count,
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
            usersThisWeek={usersThisWeek}
            usersLastWeek={usersLastWeek}
            itemsThisWeek={itemsThisWeek}
            itemsLastWeek={itemsLastWeek}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FadeInView
            index={0}
            className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Listings by Category
            </h2>
            <div className="mt-4">
              <CategoryChart data={categoryDistribution} />
            </div>
          </FadeInView>

          <FadeInView
            index={1}
            className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Listings — Last 14 Days
            </h2>
            <div className="mt-4">
              <ListingTrendChart data={trendData} />
            </div>
          </FadeInView>
        </div>

        <div className="mt-6">
          <FadeInView index={2}>
            <RecentListingsPreview items={recentItems} />
          </FadeInView>
        </div>
      </div>
    </div>
  );
}
