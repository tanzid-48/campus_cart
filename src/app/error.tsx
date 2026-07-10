"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertOctagon } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      {/* Icon */}
      <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-full mb-6">
        <AlertOctagon size={48} className="text-[#F87171]" />
      </div>

      <h1 className="text-4xl font-extrabold text-[#0F766E] dark:text-[#2DD4BF] mb-2">
        Oops! Something went wrong.
      </h1>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-8">
        We encountered an unexpected error. Please try again or go back home.
      </p>

      <div className="flex gap-4">
        {/* Reset Button (Try again) */}
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 bg-[#0F766E] hover:bg-[#115e55] text-white font-semibold rounded-lg transition-all"
        >
          Try Again
        </button>

        {/* Home Button */}
        <Link
          href="/"
          className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg transition-all"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
