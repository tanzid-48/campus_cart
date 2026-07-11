import type { Metadata } from "next";
import Link from "next/link";
import { getDb } from "@/lib/db";
import ItemCard, { type ItemCardData } from "@/components/items/ItemCard";
import ExploreFilters from "@/components/items/ExploreFilters";

export const metadata: Metadata = {
  title: "Explore — CampusCart",
};

const PAGE_SIZE = 8;

interface ExplorePageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    condition?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const category = params.category ?? "";
  const condition = params.condition ?? "";
  const sort = params.sort ?? "newest";
  const page = Math.max(1, Number(params.page) || 1);

  const filter: Record<string, unknown> = { status: "Available" };
  if (q) filter.title = { $regex: q, $options: "i" };
  if (category) filter.category = category;
  if (condition) filter.condition = condition;

  const sortMap: Record<string, Record<string, 1 | -1>> = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
  };

  const db = await getDb();
  const collection = db.collection("items");

  const totalCount = await collection.countDocuments(filter);
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const rawItems = await collection
    .find(filter)
    .sort(sortMap[sort] ?? sortMap.newest)
    .skip((page - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE)
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

  function buildQuery(overrides: Record<string, string | number>) {
    const merged = {
      q,
      category,
      condition,
      sort,
      page,
      ...overrides,
    };
    const search = new URLSearchParams();
    Object.entries(merged).forEach(([key, value]) => {
      if (value !== "" && value !== undefined) search.set(key, String(value));
    });
    return `/explore?${search.toString()}`;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        Explore listings
      </h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {totalCount} item{totalCount !== 1 ? "s" : ""} available right now.
      </p>

      <ExploreFilters />

      {items.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No items match your filters. Try widening your search.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={buildQuery({ page: p })}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                p === page
                  ? "bg-teal-700 text-white"
                  : "border border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
