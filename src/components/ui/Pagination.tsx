import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  // Preserves existing filters/sort when navigating pages
  searchParams?: Record<string, string>;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams = {},
}: PaginationProps) {
  if (totalPages <= 1) return null;

  function buildHref(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return `${basePath}?${params.toString()}`;
  }

  // Show first, last, current, and neighbors of current — with "..."
  // gaps for everything else, so a 50-page list doesn't render 50 links.
  const pages = new Set<number>();
  pages.add(1);
  pages.add(totalPages);
  for (let p = currentPage - 1; p <= currentPage + 1; p++) {
    if (p >= 1 && p <= totalPages) pages.add(p);
  }
  const sortedPages = Array.from(pages).sort((a, b) => a - b);

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <Link
        href={buildHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={`flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-500 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 ${
          currentPage === 1 ? "pointer-events-none opacity-40" : ""
        }`}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {sortedPages.map((page, i) => {
        const prevPage = sortedPages[i - 1];
        const showGap = prevPage !== undefined && page - prevPage > 1;
        return (
          <span key={page} className="flex items-center gap-2">
            {showGap && <span className="px-1 text-sm text-slate-400">…</span>}
            <Link
              href={buildHref(page)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium ${
                page === currentPage
                  ? "bg-teal-700 text-white"
                  : "border border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {page}
            </Link>
          </span>
        );
      })}

      <Link
        href={buildHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={`flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 text-slate-500 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 ${
          currentPage === totalPages ? "pointer-events-none opacity-40" : ""
        }`}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
