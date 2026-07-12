import type { Metadata } from "next";
import { getDb } from "@/lib/db";
import { requireAuth } from "@/lib/auth-session";
import { ObjectId } from "mongodb";
import ProfileEditForm from "@/components/profile/ProfileEditForm";
import { Star, Package, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "My Profile — CampusCart",
};

export default async function ProfilePage() {
  const session = await requireAuth();

  const db = await getDb();

  const user = await db
    .collection("user")
    .findOne({ _id: new ObjectId(session.user.id) });

  const totalListings = await db
    .collection("items")
    .countDocuments({ sellerId: session.user.id });
  const soldListings = await db
    .collection("items")
    .countDocuments({ sellerId: session.user.id, status: "Sold" });

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          My Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your account information and see your activity.
        </p>

        {/* Quick stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900">
            <Package className="mx-auto h-5 w-5 text-teal-700 dark:text-teal-400" />
            <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
              {totalListings}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Listings
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900">
            <CheckCircle2 className="mx-auto h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
              {soldListings}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Sold</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900">
            <Star className="mx-auto h-5 w-5 fill-amber-400 text-amber-400" />
            <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
              {typeof user?.rating === "number" ? user.rating.toFixed(1) : "—"}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Rating</p>
          </div>
        </div>

        {/* Edit form */}
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-base font-semibold text-slate-900 dark:text-white">
            Account Information
          </h2>
          <ProfileEditForm
            initialName={user?.name ?? ""}
            initialPhone={user?.phone ?? ""}
            initialUniversity={user?.university ?? ""}
          />
        </div>
      </div>
    </div>
  );
}
