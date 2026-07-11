"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, BookOpen, Laptop, Bike } from "lucide-react";

const categoryShowcase = [
  {
    label: "Books",
    icon: BookOpen,
    gradient: "from-teal-600 to-teal-800",
  },
  {
    label: "Electronics",
    icon: Laptop,
    gradient: "from-amber-500 to-amber-700",
  },
  {
    label: "Cycles",
    icon: Bike,
    gradient: "from-slate-600 to-slate-800",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-rotating category showcase — the "slider" interactive element.
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % categoryShowcase.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const ActiveIcon = categoryShowcase[activeSlide].icon;

  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden bg-gradient-to-b from-teal-50 to-white lg:h-[65vh] dark:from-slate-900 dark:to-slate-950">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Left: heading, search, CTA */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white"
          >
            Buy and sell within{" "}
            <span className="text-teal-700 dark:text-teal-400">
              your campus
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 max-w-md text-base text-slate-600 dark:text-slate-300"
          >
            Books, electronics, cycles, and more — trade directly with students
            on your own campus. No shipping, no strangers, no hassle.
          </motion.p>

          {/* Search bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            action="/explore"
            method="get"
            className="mt-8 flex max-w-md items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <Search className="ml-2 h-5 w-5 shrink-0 text-slate-400" />
            <input
              type="text"
              name="q"
              placeholder="Search for a textbook, cycle, laptop..."
              className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none dark:text-white"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-800"
            >
              Search
            </button>
          </motion.form>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <Link
              href="/items/add"
              className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-600"
            >
              Start selling
            </Link>
            <Link
              href="/explore"
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Browse listings
            </Link>
          </motion.div>
        </div>

        {/* Right: rotating category showcase (slider) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80"
        >
          {/* Soft floating background blob */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-teal-100/60 blur-2xl dark:bg-teal-900/30"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className={`relative flex h-56 w-56 flex-col items-center justify-center gap-3 rounded-3xl bg-gradient-to-br ${categoryShowcase[activeSlide].gradient} text-white shadow-xl sm:h-64 sm:w-64`}
            >
              <ActiveIcon className="h-16 w-16" />
              <span className="text-lg font-semibold">
                {categoryShowcase[activeSlide].label}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Slider dots */}
          <div className="absolute -bottom-8 flex gap-2">
            {categoryShowcase.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setActiveSlide(i)}
                aria-label={`Show ${cat.label}`}
                className={`h-2 rounded-full transition-all ${
                  i === activeSlide
                    ? "w-6 bg-teal-700 dark:bg-teal-400"
                    : "w-2 bg-slate-300 dark:bg-slate-600"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll cue — visual flow to the next section */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-500"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
