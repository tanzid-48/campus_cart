"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedStepCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
  accentColor: "teal" | "amber";
}

const ACCENT_STYLES = {
  teal: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400",
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
};

export default function AnimatedStepCard({
  icon,
  title,
  description,
  index,
  accentColor,
}: AnimatedStepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="relative rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
    >
      <span className="absolute top-4 right-4 text-3xl font-bold text-slate-100 dark:text-slate-800">
        {index + 1}
      </span>
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-lg ${ACCENT_STYLES[accentColor]}`}
      >
        {icon}
      </div>
      <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </motion.div>
  );
}
