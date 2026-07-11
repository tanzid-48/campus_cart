import type { Metadata } from "next";
import Link from "next/link";
import { ObjectId } from "mongodb";
import { Heart } from "lucide-react";
import { getDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth-session";
import ItemCard, { type ItemCardData } from "@/components/items/ItemCard";

export const metadata: Metadata = {
  title: "My Wishlist — CampusCart",
};

export default async function WishlistPage() {
  const session = await requireAuth();

  const db = await getDb();

  const wishlistEntries = await db
    .collection("wishlist")
    .find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .toArray();

  const itemIds = wishlistEntries
    .filter((entry) => ObjectId.isValid(entry.itemId))
    .map((entry) => new ObjectId(entry.itemId));

  const rawItems =
    itemIds.length > 0
      ? await db
          .collection("items")
          .find({ _id: { $in: itemIds } })
          .toArray()
      : [];

  const items: ItemCardData[] = rawItems.map((doc) => ({
    id: doc._id.toString(),
    title: doc.title,
    shortDescription: doc.shortDescription,
    price: doc.price,
    condition: doc.condition,
    location: doc.location,
    image: doc.images?.[0],
  }));

  return (
    <div className="mx-auto w-11/12 max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        My Wishlist
      </h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {items.length} item{items.length !== 1 ? "s" : ""} saved for later.
      </p>

      {items.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <Heart className="mb-3 h-10 w-10 text-slate-300 dark:text-slate-700" />
          <p className="text-sm text-slate-500 dark:text-slate-400">
            You haven&apos;t saved any items yet.
          </p>
          <Link
            href="/explore"
            className="mt-4 rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800"
          >
            Explore listings
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
