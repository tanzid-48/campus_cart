import type { Metadata } from "next";
import { getDb } from "@/lib/db";
import AdminUsersTable, {
  type AdminUser,
} from "@/components/admin/AdminUsersTable";
import Pagination from "@/components/ui/Pagination";

export const metadata: Metadata = {
  title: "All users — Admin — CampusCart",
};

const PAGE_SIZE = 7;

interface AdminUsersPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AdminUsersPage({
  searchParams,
}: AdminUsersPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  const db = await getDb();

  const totalCount = await db.collection("user").countDocuments();
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const rawUsers = await db
    .collection("user")
    .find(
      {},
      {
        projection: {
          name: 1,
          email: 1,
          university: 1,
          role: 1,
          rating: 1,
          createdAt: 1,
        },
      },
    )
    .sort({ createdAt: -1 })
    .skip((page - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .toArray();

  const users: AdminUser[] = rawUsers.map((user) => ({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    university: user.university ?? "",
    role: user.role ?? "user",
    rating: user.rating ?? 0,
    createdAt: user.createdAt
      ? new Date(user.createdAt).toISOString()
      : new Date(0).toISOString(),
  }));

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        All users
      </h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        {totalCount} registered student{totalCount !== 1 ? "s" : ""}.
      </p>

      <div className="mt-6">
        {users.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No users yet.
            </p>
          </div>
        ) : (
          <>
            <AdminUsersTable users={users} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath="/admin/users"
            />
          </>
        )}
      </div>
    </div>
  );
}
