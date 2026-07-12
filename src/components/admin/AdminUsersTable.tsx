export interface AdminUser {
  id: string;
  name: string;
  email: string;
  university: string;
  role: string;
  rating: number;
  createdAt: string;
}

const ROLE_STYLES: Record<string, string> = {
  admin: "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-400",
  user: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

export default function AdminUsersTable({ users }: { users: AdminUser[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 text-xs tracking-wide text-slate-500 uppercase dark:border-slate-800 dark:text-slate-400">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">University</th>
            <th className="px-4 py-3">Rating</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Joined</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                {user.name}
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                {user.email}
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                {user.university || "—"}
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                {user.rating > 0 ? user.rating.toFixed(1) : "—"}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    ROLE_STYLES[user.role] ?? ROLE_STYLES.user
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                {new Date(user.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
