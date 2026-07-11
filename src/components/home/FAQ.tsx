"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "Is CampusCart free to use?",
    a: "Yes, posting and browsing listings on CampusCart is completely free for all students.",
  },
  {
    q: "How do I know a seller is trustworthy?",
    a: "Sellers build a rating based on past transactions, and you can always meet in a safe, public spot on campus before paying.",
  },
  {
    q: "Can I negotiate the price?",
    a: "Yes — sellers can mark their listing as negotiable, and you can discuss the price directly when you contact them.",
  },
  {
    q: "What happens after I mark an item as sold?",
    a: "The listing status updates to Sold and it's automatically hidden from the main explore page.",
  },
  {
    q: "Do I need a university email to sign up?",
    a: "You can register with any email, though we recommend using your university email for easier verification in the future.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={faq.q}
              className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-slate-900 dark:text-white">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm text-slate-500 dark:text-slate-400">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}