"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success(
      "Thanks for subscribing! You'll hear about new campus listings.",
    );
    setEmail("");
  };

  return (
    <section className="bg-slate-50 py-16 dark:bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8"
      >
        <Mail className="mx-auto h-10 w-10 text-teal-700 dark:text-teal-400" />
        <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
          Stay in the loop
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Get notified when new items are posted in your favorite categories.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-6 flex max-w-md gap-2"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-800"
          >
            Subscribe
          </button>
        </form>
      </motion.div>
    </section>
  );
}
