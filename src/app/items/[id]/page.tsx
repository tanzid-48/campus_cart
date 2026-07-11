import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import { MapPin, Star, Calendar, Tag } from "lucide-react";
import { getDb } from "@/lib/db";
import ItemCard, { type ItemCardData } from "@/components/items/ItemCard";
import ContactSellerButton from "@/components/items/ContactSellerButton";
import ReviewForm from "@/components/items/ReviewForm";
import ReviewsList, { type ReviewData } from "@/components/items/ReviewsList";
import { getServerSession } from "@/lib/auth-session";

interface ItemDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ItemDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  if (!ObjectId.isValid(id)) return { title: "Item not found — CampusCart" };

  const db = await getDb();
  const item = await db.collection("items").findOne({ _id: new ObjectId(id) });

  return {
    title: item ? `${item.title} — CampusCart` : "Item not found — CampusCart",
  };
}

const CONDITION_STYLES: Record<string, string> = {
  New: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  "Like New":
    "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  Used: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

const STATUS_STYLES: Record<string, string> = {
  Available:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  Reserved: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  Sold: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

export default async function ItemDetailsPage({
  params,
}: ItemDetailsPageProps) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    notFound();
  }

  const db = await getDb();
  const item = await db.collection("items").findOne({ _id: new ObjectId(id) });

  if (!item) {
    notFound();
  }

  const session = await getServerSession();

  const seller = ObjectId.isValid(item.sellerId)
    ? await db.collection("user").findOne({ _id: new ObjectId(item.sellerId) })
    : null;

  const rawReviews = await db
    .collection("reviews")
    .find({ itemId: item._id.toString() })
    .sort({ createdAt: -1 })
    .toArray();

  const reviews: ReviewData[] = rawReviews.map((r) => ({
    id: r._id.toString(),
    reviewerName: r.reviewerName,
    rating: r.rating,
    comment: r.comment,
    createdAt: r.createdAt.toISOString(),
  }));

  // Who can leave a review: must be logged in, can't review your own
  // listing, and can't review the same item twice.
  const alreadyReviewed = session
    ? rawReviews.some((r) => r.reviewerId === session.user.id)
    : false;
  const canReview =
    !!session && session.user.id !== item.sellerId && !alreadyReviewed;

  const relatedDocs = await db
    .collection("items")
    .find({
      category: item.category,
      _id: { $ne: item._id },
      status: "Available",
    })
    .limit(4)
    .toArray();

  const relatedItems: ItemCardData[] = relatedDocs.map((doc) => ({
    id: doc._id.toString(),
    title: doc.title,
    shortDescription: doc.shortDescription,
    price: doc.price,
    condition: doc.condition,
    location: doc.location,
    image: doc.images?.[0],
  }));

  const postedDate = new Date(item.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const images: string[] = item.images?.length ? item.images : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left: gallery + description */}
        <div className="lg:col-span-2">
          {/* Main image */}
          <div className="relative h-72 w-full overflow-hidden rounded-xl bg-slate-100 sm:h-96 dark:bg-slate-800">
            {images.length > 0 ? (
              <Image
                src={images[0]}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-slate-400">
                No image provided
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {images.slice(1, 5).map((img: string, idx: number) => (
                <div
                  key={idx}
                  className="relative h-20 w-full overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800"
                >
                  <Image
                    src={img}
                    alt={`${item.title} ${idx + 2}`}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                CONDITION_STYLES[item.condition] ?? CONDITION_STYLES.Used
              }`}
            >
              {item.condition}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                STATUS_STYLES[item.status] ?? STATUS_STYLES.Available
              }`}
            >
              {item.status}
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
            {item.title}
          </h1>

          <p className="mt-1 text-2xl font-semibold text-amber-600 dark:text-amber-400">
            ৳{item.price.toLocaleString("en-BD")}
            {item.isNegotiable && (
              <span className="ml-2 text-sm font-normal text-slate-400 dark:text-slate-500">
                (negotiable)
              </span>
            )}
          </p>

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-teal-700 dark:text-teal-400">
              Description
            </h2>
            <p className="mt-2 text-sm whitespace-pre-line text-slate-600 dark:text-slate-400">
              {item.fullDescription}
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-teal-700 dark:text-teal-400">
              Key information
            </h2>
            <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Tag className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                <span>{item.category}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Calendar className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                <span>Posted {postedDate}</span>
              </div>
            </dl>
          </section>

          {/* Reviews */}
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-teal-700 dark:text-teal-400">
              Reviews ({reviews.length})
            </h2>

            <div className="mt-3">
              <ReviewsList reviews={reviews} />
            </div>

            {canReview && (
              <div className="mt-4">
                <ReviewForm
                  itemId={item._id.toString()}
                  sellerId={item.sellerId}
                />
              </div>
            )}
          </section>
        </div>

        {/* Right: seller card */}
        <div>
          <div className="sticky top-20 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-sm font-semibold text-slate-500 uppercase dark:text-slate-500">
              Seller
            </h2>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-lg font-semibold text-teal-700 dark:bg-teal-900/40 dark:text-teal-400">
                {seller?.name?.charAt(0).toUpperCase() ?? "?"}
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  {seller?.name ?? "CampusCart user"}
                </p>
                {typeof seller?.rating === "number" && seller.rating > 0 && (
                  <p className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {seller.rating.toFixed(1)}
                  </p>
                )}
              </div>
            </div>

            {seller?.university && (
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {seller.university}
              </p>
            )}

            <div className="mt-5">
              <ContactSellerButton
                sellerName={seller?.name ?? "Seller"}
                sellerPhone={seller?.phone}
                sellerEmail={seller?.email}
                itemTitle={item.title}
              />
            </div>
          </div>
        </div>
      </div>

      {relatedItems.length > 0 && (
        <section className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
          <h2 className="mb-4 text-lg font-semibold text-teal-700 dark:text-teal-400">
            Related items
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedItems.map((related) => (
              <ItemCard key={related.id} item={related} />
            ))}
          </div>
        </section>
      )}

      <Link
        href="/explore"
        className="mt-8 inline-block text-sm font-medium text-teal-700 hover:underline dark:text-teal-400"
      >
        ← Back to Explore
      </Link>
    </div>
  );
}
