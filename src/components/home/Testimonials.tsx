import { Star } from "lucide-react";
import FadeInView from "./FadeInView";

const TESTIMONIALS = [
  {
    name: "Rima Akter",
    role: "CSE, 6th semester",
    quote:
      "Sold my old calculator and textbooks within two days. So much easier than posting in random Facebook groups.",
    rating: 5,
  },
  {
    name: "Fahim Hasan",
    role: "EEE, 4th semester",
    quote:
      "Found a great deal on a used laptop from a senior. The seller rating gave me confidence before meeting up.",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    role: "Business, 3rd semester",
    quote:
      "I love that everything is within campus — no shipping hassle, just meet and exchange.",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          What Students Say
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Real experiences from your campus community.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {TESTIMONIALS.map((t, idx) => (
          <FadeInView
            key={t.name}
            index={idx}
            className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < t.rating
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-300 dark:text-slate-700"
                  }
                />
              ))}
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-700 dark:bg-teal-900/40 dark:text-teal-400">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {t.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {t.role}
                </p>
              </div>
            </div>
          </FadeInView>
        ))}
      </div>
    </section>
  );
}
