import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import {
  Star,
  Package,
  CheckCircle2,
  Calendar,
  GraduationCap,
} from "lucide-react";
import { getDb } from "@/lib/db";
import ItemCard, { type ItemCardData } from "@/components/items/ItemCard";
import FadeInView from "@/components/home/FadeInView";

interface SellerProfilePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: SellerProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  if (!ObjectId.isValid(id)) return { title: "Seller not found — CampusCart" };

  const db = await getDb();
  const seller = await db.collection("user").findOne({ _id: new ObjectId(id) });

  return {
    title: seller
      ? `${seller.name} — CampusCart`
      : "Seller not found — CampusCart",
  };
}

export default async function SellerProfilePage({
  params,
}: SellerProfilePageProps) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    notFound();
  }

  const db = await getDb();

  const seller = await db.collection("user").findOne({ _id: new ObjectId(id) });

  if (!seller) {
    notFound();
  }

  const [activeListingsRaw, totalListings, soldListings, reviews] =
    await Promise.all([
      db
        .collection("items")
        .find({ sellerId: id, status: { $in: ["Available", "Reserved"] } })
        .sort({ createdAt: -1 })
        .toArray(),
      db.collection("items").countDocuments({ sellerId: id }),
      db.collection("items").countDocuments({ sellerId: id, status: "Sold" }),
      db
        .collection("reviews")
        .find({ sellerId: id })
        .sort({ createdAt: -1 })
        .toArray(),
    ]);

  const activeListings: ItemCardData[] = activeListingsRaw.map((doc) => ({
    id: doc._id.toString(),
    title: doc.title,
    shortDescription: doc.shortDescription,
    price: doc.price,
    condition: doc.condition,
    status: doc.status,
    location: doc.location,
    image: doc.images?.[0],
  }));

  const memberSince = new Date(seller.createdAt).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl">
        {/* Seller header */}
        <FadeInView className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-teal-100 text-2xl font-bold text-teal-700 dark:bg-teal-900/40 dark:text-teal-400">
              {seller.name?.charAt(0).toUpperCase() ?? "?"}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {seller.name}
              </h1>

              <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-slate-500 sm:justify-start dark:text-slate-400">
                {typeof seller.rating === "number" && seller.rating > 0 && (
                  <span className="flex items-center gap-1">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    {seller.rating.toFixed(1)}
                  </span>
                )}
                {seller.university && (
                  <span className="flex items-center gap-1">
                    <GraduationCap size={14} />
                    {seller.university}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  Member since {memberSince}
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3 dark:border-slate-800">
            <div className="text-center">
              <Package className="mx-auto h-5 w-5 text-teal-700 dark:text-teal-400" />
              <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                {totalListings}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Total Listings
              </p>
            </div>
            <div className="text-center">
              <CheckCircle2 className="mx-auto h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                {soldListings}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Items Sold
              </p>
            </div>
            <div className="col-span-2 text-center sm:col-span-1">
              <Star className="mx-auto h-5 w-5 fill-amber-400 text-amber-400" />
              <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                {reviews.length}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Reviews
              </p>
            </div>
          </div>
        </FadeInView>

        {/* Active Listings */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Active Listings ({activeListings.length})
          </h2>

          {activeListings.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              No active listings right now.
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {activeListings.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Reviews */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Reviews ({reviews.length})
          </h2>

          {reviews.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              No reviews yet for this seller.
            </p>
          ) : (
            <div className="mt-4 flex flex-col gap-4">
              {reviews.map((review) => (
                <div
                  key={review._id.toString()}
                  className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      {review.reviewerName}
                    </span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300 dark:text-slate-700"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
