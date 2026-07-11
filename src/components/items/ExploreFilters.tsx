"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";

const CATEGORIES = [
  "Books",
  "Electronics",
  "Furniture",
  "Cycle",
  "Stationery",
  "Others",
];
const CONDITIONS = ["New", "Like New", "Used"];

export default function ExploreFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") ?? "");

  const category = searchParams.get("category") ?? "";
  const condition = searchParams.get("condition") ?? "";
  const sort = searchParams.get("sort") ?? "newest";

  const dateSort = sort === "oldest" ? "oldest" : "newest";
  const priceSort =
    sort === "price-asc" ? "asc" : sort === "price-desc" ? "desc" : "none";

  const hasActiveFilters = q || category || condition || sort !== "newest";

  const pushParams = useCallback(
    (overrides: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(overrides).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      pushParams({ q });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  function handleDateSortChange(value: string) {
    pushParams({ sort: value === "oldest" ? "oldest" : "newest" });
  }

  function handlePriceSortChange(value: string) {
    if (value === "none") {
      pushParams({ sort: "newest" });
      return;
    }
    pushParams({ sort: value === "asc" ? "price-asc" : "price-desc" });
  }

  function handleClear() {
    setQ("");
    router.push(pathname);
  }

  return (
    <div className="mt-6 space-y-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      {/* Row 1 — Search + Condition + Date sort + Price sort + Clear */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 basis-64">
          <Search className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title..."
            className="w-full rounded-lg border border-slate-300 py-2 pr-3 pl-9 text-sm focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <select
          value={condition}
          onChange={(e) => pushParams({ condition: e.target.value })}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="">Any condition</option>
          {CONDITIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={dateSort}
          onChange={(e) => handleDateSortChange(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>

        <select
          value={priceSort}
          onChange={(e) => handlePriceSortChange(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="none">Price: default</option>
          <option value="asc">Price: low to high</option>
          <option value="desc">Price: high to low</option>
        </select>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        )}
      </div>

      {/* Row 2 — Category as tabs/pills */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => pushParams({ category: "" })}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
            category === ""
              ? "bg-teal-700 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => pushParams({ category: c })}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              category === c
                ? "bg-teal-700 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
