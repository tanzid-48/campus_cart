import type { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Access denied — CampusCart",
};

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
          <ShieldAlert className="h-8 w-8" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
          Access denied
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          You don&apos;t have permission to view this page. This area is
          restricted to administrators only.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-800"
          >
            Go back home
          </Link>
          <Link
            href="/explore"
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Browse listings
          </Link>
        </div>
      </div>
    </div>
  );
}
