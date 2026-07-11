"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Laptop, Sofa, Bike, PenTool, Package } from "lucide-react";

const categories = [
  {
    label: "Books",
    icon: BookOpen,
    color: "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-400",
  },
  {
    label: "Electronics",
    icon: Laptop,
    color: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  },
  {
    label: "Furniture",
    icon: Sofa,
    color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
  {
    label: "Cycle",
    icon: Bike,
    color: "bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-400",
  },
  {
    label: "Stationery",
    icon: PenTool,
    color: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  },
  {
    label: "Others",
    icon: Package,
    color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
          Browse by category
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Jump straight to what you are looking for.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <Link
              href={`/explore?category=${encodeURIComponent(cat.label)}`}
              className="group flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-110 ${cat.color}`}
              >
                <cat.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {cat.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
