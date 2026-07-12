import type { Metadata } from "next";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/db";
import AdminListingsTable, {
  type AdminItem,
} from "@/components/admin/AdminListingsTable";
import Pagination from "@/components/ui/Pagination";

export const metadata: Metadata = {
  title: "All listings — Admin — CampusCart",
};

const PAGE_SIZE = 7;

interface AdminListingsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminListingsPage({
  searchParams,
}: AdminListingsPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const db = await getDb();

  const totalCount = await db.collection("items").countDocuments();
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const rawItems = await db
    .collection("items")
    .find({})
    .sort({ createdAt: -1 })
    .skip((page - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .toArray();

  const sellerIds = [
    ...new Set(rawItems.map((item) => item.sellerId).filter(Boolean)),
  ];
  const validSellerIds = sellerIds.filter((id) => ObjectId.isValid(id));
  const sellers = await db
    .collection("user")
    .find({ _id: { $in: validSellerIds.map((id) => new ObjectId(id)) } })
    .project({ name: 1 })
    .toArray();
  const sellerNameById = new Map(
    sellers.map((s) => [s._id.toString(), s.name as string]),
  );

  const items: AdminItem[] = rawItems.map((item) => ({
    id: item._id.toString(),
    title: item.title,
    category: item.category,
    price: item.price,
    status: item.status,
    sellerName: sellerNameById.get(item.sellerId) ?? "Unknown",
    createdAt: item.createdAt
      ? new Date(item.createdAt).toISOString()
      : new Date(0).toISOString(),
  }));

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        All listings
      </h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {totalCount} item{totalCount !== 1 ? "s" : ""} across the platform.
      </p>

      <div className="mt-6">
        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No listings yet.
            </p>
          </div>
        ) : (
          <>
            <AdminListingsTable items={items} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath="/admin/listings"
            />
          </>
        )}
      </div>
    </div>
  );
}
