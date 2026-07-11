import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import { requireAuth } from "@/lib/auth-session";
import { getDb } from "@/lib/db";
import EditItemForm from "@/components/forms/EditItemForm";

export const metadata: Metadata = {
  title: "Edit item — CampusCart",
};

interface EditItemPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditItemPage({ params }: EditItemPageProps) {
  const session = await requireAuth();
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    notFound();
  }

  const db = await getDb();
  const item = await db.collection("items").findOne({ _id: new ObjectId(id) });

  if (!item) {
    notFound();
  }

  // Owner-only — someone else's item id typed into the URL bar
  // sends the user back to their own listings instead of showing
  // (or silently editing) another seller's item.
  if (item.sellerId !== session.user.id) {
    redirect("/items/manage");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        Edit item
      </h1>
      <p className="mt-1 mb-8 text-sm text-slate-500 dark:text-slate-400">
        Update the details of your listing.
      </p>
      <EditItemForm
        itemId={item._id.toString()}
        initialValues={{
          title: item.title,
          shortDescription: item.shortDescription,
          fullDescription: item.fullDescription,
          price: item.price,
          isNegotiable: Boolean(item.isNegotiable),
          category: item.category,
          condition: item.condition,
          location: item.location,
          imageUrl: item.images?.[0] ?? "",
          status: item.status,
        }}
      />
    </div>
  );
}
