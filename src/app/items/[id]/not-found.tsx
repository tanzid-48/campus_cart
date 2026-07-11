import Link from "next/link";

export default function ItemNotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        Item not found
      </h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        This item may have been sold or removed by the seller.
      </p>
      <Link
        href="/explore"
        className="mt-6 rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800"
      >
        Browse other items
      </Link>
    </div>
  );
}
