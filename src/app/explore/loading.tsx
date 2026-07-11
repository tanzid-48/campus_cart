// src/app/explore/loading.tsx

export default function ExploreLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="h-7 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
      <div className="mt-2 h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />

      <div className="mt-6 h-24 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800"
          >
            <div className="h-40 w-full animate-pulse bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-2 p-4">
              <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-5 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-8 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
