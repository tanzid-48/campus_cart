import { Star } from "lucide-react";

export interface ReviewData {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ReviewsList({ reviews }: { reviews: ReviewData[] }) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        No reviews yet for this seller.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {review.reviewerName}
            </p>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3.5 w-3.5 ${
                    star <= review.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-200 dark:text-slate-700"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {review.comment}
          </p>
          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
            {new Date(review.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      ))}
    </div>
  );
}
