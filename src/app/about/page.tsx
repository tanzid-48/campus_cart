import type { Metadata } from "next";
import { GraduationCap, Recycle, Users, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About — CampusCart",
  description:
    "Learn about CampusCart's mission to help students buy and sell used items within their own campus community.",
};

const values = [
  {
    icon: Recycle,
    title: "Reduce waste",
    description:
      "Every semester, usable books, electronics, and furniture get thrown away or forgotten. CampusCart gives them a second life instead.",
  },
  {
    icon: Users,
    title: "Built for students, by a student",
    description:
      "CampusCart started as a solution to a problem every student faces: finding cheap, trustworthy secondhand goods without leaving campus.",
  },
  {
    icon: ShieldCheck,
    title: "Safer than random groups",
    description:
      "Unlike anonymous Facebook groups, every CampusCart listing is tied to a real, verified student account on your campus.",
  },
  {
    icon: GraduationCap,
    title: "Campus-first",
    description:
      "Listings show the seller's university, so you can prioritize meeting up with people from your own campus.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          About CampusCart
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
          CampusCart is a secondhand marketplace built exclusively for students
          — a dedicated, trusted space to buy and sell used books, electronics,
          cycles, furniture, and more, right within your own campus community.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {values.map((value) => (
          <div
            key={value.title}
            className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-400">
              <value.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
              {value.title}
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {value.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Our story
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Every semester, students end up with textbooks they no longer need,
          cycles left behind after graduation, and electronics sitting unused in
          dorm rooms. At the same time, other students are searching for exactly
          those items — often paying full price for something a classmate would
          happily sell for less. CampusCart exists to close that gap: a simple,
          campus-focused platform where buying and selling used items is as easy
          as browsing a feed, without the guesswork of random online
          marketplaces.
        </p>
      </div>
    </div>
  );
}
