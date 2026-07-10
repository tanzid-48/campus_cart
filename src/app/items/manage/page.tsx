import type { Metadata } from "next";
import Link from "next/link";
import { requireAuth } from "@/lib/auth-session";
import { getDb } from "@/lib/db";
import ManageItemsTable, {
  type ManagedItem,
} from "@/components/items/ManageItemsTable";

export const metadata: Metadata = {
  title: "Manage my items — CampusCart",
};

export default async function ManageItemsPage() {
  // Real security check for this page — proxy.ts only handles the
  // quick redirect before the page loads.
  const session = await requireAuth();

  const db = await getDb();
  const rawItems = await db
    .collection("items")
    .find({ sellerId: session.user.id })
    .sort({ createdAt: -1 })
    .toArray();

  // Server Components can't pass MongoDB's ObjectId/Date instances
  // straight to a Client Component — they need to be plain
  // strings/numbers first (this is what Next.js serializes over
  // the server → client boundary).
  const items: ManagedItem[] = rawItems.map((item) => ({
    id: item._id.toString(),
    title: item.title,
    price: item.price,
    category: item.category,
    condition: item.condition,
    status: item.status,
    createdAt: item.createdAt.toISOString(),
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            My listings
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            View and manage the items you&apos;ve listed for sale.
          </p>
        </div>
        <Link
          href="/items/add"
          className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800"
        >
          + Add item
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            You haven&apos;t listed anything yet.
          </p>
          <Link
            href="/items/add"
            className="mt-4 inline-block rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800"
          >
            List your first item
          </Link>
        </div>
      ) : (
        <ManageItemsTable items={items} />
      )}
    </div>
  );
}
