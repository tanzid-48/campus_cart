"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

export interface AdminItem {
  id: string;
  title: string;
  category: string;
  price: number;
  status: string;
  sellerName: string;
  createdAt: string;
}

const STATUSES = ["Available", "Reserved", "Sold"];

const STATUS_STYLES: Record<string, string> = {
  Available:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  Reserved: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  Sold: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

export default function AdminListingsTable({ items }: { items: AdminItem[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<AdminItem | null>(null);

  async function handleStatusChange(itemId: string, newStatus: string) {
    setUpdatingId(itemId);
    const res = await fetch(`/api/admin/listings/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    const data = await res.json();
    setUpdatingId(null);

    if (!res.ok) {
      toast.error(data.message || "Could not update status.");
      return;
    }

    toast.success("Status updated.");
    router.refresh();
  }

  async function confirmDelete() {
    if (!pendingDelete) return;

    setDeletingId(pendingDelete.id);
    const res = await fetch(`/api/admin/listings/${pendingDelete.id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setDeletingId(null);
    setPendingDelete(null);

    if (!res.ok) {
      toast.error(data.message || "Could not delete this item.");
      return;
    }

    toast.success("Item removed.");
    router.refresh();
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 text-xs tracking-wide text-slate-500 uppercase dark:border-slate-800 dark:text-slate-400">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Seller</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {items.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                {item.title}
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                {item.sellerName}
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                {item.category}
              </td>
              <td className="px-4 py-3 font-medium text-amber-600 dark:text-amber-400">
                ৳{item.price.toLocaleString("en-BD")}
              </td>
              <td className="px-4 py-3">
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  disabled={updatingId === item.id}
                  className={`rounded-full border-0 px-2.5 py-1 text-xs font-medium focus:ring-1 focus:ring-teal-700 disabled:opacity-50 ${
                    STATUS_STYLES[item.status] ?? STATUS_STYLES.Available
                  }`}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => setPendingDelete(item)}
                  disabled={deletingId === item.id}
                  className="font-medium text-red-600 hover:underline disabled:opacity-50 dark:text-red-400"
                >
                  {deletingId === item.id ? "Removing..." : "Remove"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Remove this listing?"
        description={
          pendingDelete
            ? `"${pendingDelete.title}" will be permanently removed from the platform. This can't be undone.`
            : ""
        }
        confirmLabel="Remove"
        isLoading={deletingId !== null}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
