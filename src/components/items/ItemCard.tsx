// src/components/items/ItemCard.tsx

import Link from "next/link";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import WishlistButton from "./WishlistButton";

export interface ItemCardData {
  id: string;
  title: string;
  shortDescription: string;
  price: number;
  condition: "New" | "Like New" | "Used";
  status: "Available" | "Reserved" | "Sold";
  location: string;
  image?: string;
  sellerRating?: number;
}

const CONDITION_STYLES: Record<ItemCardData["condition"], string> = {
  New: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  "Like New":
    "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  Used: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

const STATUS_STYLES: Record<ItemCardData["status"], string> = {
  Available:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  Reserved: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  Sold: "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
};

export default function ItemCard({ item }: { item: ItemCardData }) {
  const isSold = item.status === "Sold";

  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 ${
        isSold ? "opacity-75" : ""
      }`}
    >
      <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-slate-400">
            No image
          </div>
        )}

        <span
          className={`absolute top-2 left-2 rounded-full px-2.5 py-1 text-xs font-medium ${CONDITION_STYLES[item.condition]}`}
        >
          {item.condition}
        </span>

        <WishlistButton itemId={item.id} />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 text-sm font-medium text-slate-900 dark:text-white">
          {item.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
          {item.shortDescription}
        </p>

        {/* Price + status badge, justified apart */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-base font-semibold text-amber-600 dark:text-amber-400">
            ৳{item.price.toLocaleString("en-BD")}
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[item.status]}`}
          >
            {item.status}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
            <MapPin className="h-3 w-3" />
            {item.location}
          </div>
          {item.sellerRating !== undefined && (
            <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              {item.sellerRating.toFixed(1)}
            </span>
          )}
        </div>

        <Link
          href={`/items/${item.id}`}
          className="mt-3 rounded-lg border border-slate-300 py-2 text-center text-xs font-medium text-slate-700 transition-colors hover:border-teal-700 hover:text-teal-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-teal-500 dark:hover:text-teal-400"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
