import Link from "next/link";
import { getDb } from "@/lib/db";
import ItemCard, { type ItemCardData } from "@/components/items/ItemCard";
import FadeInView from "./FadeInView";

export default async function TrendingListings() {
  const db = await getDb();

  const rawItems = await db
    .collection("items")
    .find({ status: "Available" })
    .sort({ createdAt: -1 })
    .limit(4)
    .toArray();

  const items: ItemCardData[] = rawItems.map((doc) => ({
    id: doc._id.toString(),
    title: doc.title,
    shortDescription: doc.shortDescription,
    price: doc.price,
    condition: doc.condition,
    status: doc.status,
    location: doc.location,
    image: doc.images?.[0],
  }));

  if (items.length === 0) return null;

  return (
    <section className="bg-slate-50 py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Trending Listings
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Freshly posted items from your campus.
            </p>
          </div>
          <Link
            href="/explore"
            className="text-sm font-medium text-teal-700 hover:underline dark:text-teal-400"
          >
            View all →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => (
            <FadeInView key={item.id} index={idx}>
              <ItemCard item={item} />
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
