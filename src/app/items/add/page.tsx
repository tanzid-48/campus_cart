import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth-session";
import AddItemForm from "@/components/forms/AddItemForm";

export const metadata: Metadata = {
  title: "Add an item — CampusCart",
};

export default async function AddItemPage() {
  // This is the actual security check for this page — proxy.ts only
  // handles the quick redirect before the page loads.
  await requireAuth();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center">
        Add an item
      </h1>
      <p className="mt-1 mb-8 text-sm text-slate-500 dark:text-slate-400 text-center">
        Fill in the details below to list your item for sale.
      </p>
      <AddItemForm />
    </div>
  );
}
