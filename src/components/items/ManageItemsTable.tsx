"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteItem } from "@/lib/api/items";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

export interface ManagedItem {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: string;
  status: string;
  createdAt: string;
}

const STATUS_STYLES: Record<string, string> = {
  Available:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  Reserved: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  Sold: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

interface ManageItemsTableProps {
  items: ManagedItem[];
}

export default function ManageItemsTable({ items }: ManageItemsTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<ManagedItem | null>(null);

  function openDeleteDialog(item: ManagedItem) {
    setPendingDelete(item);
  }

  async function confirmDelete() {
    if (!pendingDelete) return;

    setDeletingId(pendingDelete.id);
    const { ok, data } = await deleteItem(pendingDelete.id);
    setDeletingId(null);
    setPendingDelete(null);

    if (!ok) {
      toast.error(data.message || "Could not delete this item.");
      return;
    }

    toast.success("Item deleted.");
    router.refresh();
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 text-xs tracking-wide text-slate-500 uppercase dark:border-slate-800 dark:text-slate-400">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Listed</th>
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
                {item.category}
              </td>
              <td className="px-4 py-3 font-medium text-amber-600 dark:text-amber-400">
                ৳{item.price.toLocaleString("en-BD")}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    STATUS_STYLES[item.status] ?? STATUS_STYLES.Available
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                {new Date(item.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center gap-3">
                  <Link
                    href={`/items/${item.id}`}
                    className="font-medium text-teal-700 hover:underline dark:text-teal-400"
                  >
                    View
                  </Link>
                  <Link
                    href={`/items/edit/${item.id}`}
                    className="font-medium text-slate-600 hover:underline dark:text-slate-300"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => openDeleteDialog(item)}
                    disabled={deletingId === item.id}
                    className="font-medium text-red-600 hover:underline disabled:opacity-50 dark:text-red-400"
                  >
                    {deletingId === item.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete this item?"
        description={
          pendingDelete
            ? `"${pendingDelete.title}" will be permanently removed. This can't be undone.`
            : ""
        }
        confirmLabel="Delete"
        isLoading={deletingId !== null}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
