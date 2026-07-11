import Link from "next/link";
import { getDb } from "@/lib/db";
import ItemCard, { type ItemCardData } from "@/components/items/ItemCard";

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
    location: doc.location,
    image: doc.images?.[0],
  }));

  // No fake/lorem items — if nothing's listed yet, the section
  // just doesn't render rather than showing placeholder cards.
  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
            Recently listed
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Fresh finds from students on your campus.
          </p>
        </div>
        <Link
          href="/explore"
          className="hidden text-sm font-medium text-teal-700 hover:underline sm:inline dark:text-teal-400"
        >
          View all →
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/explore"
          className="text-sm font-medium text-teal-700 hover:underline dark:text-teal-400"
        >
          View all →
        </Link>
      </div>
    </section>
  );
}
