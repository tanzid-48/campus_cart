"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { UserPlus, PackagePlus, MessageCircle, Handshake } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign up",
    description: "Create your account with your university email.",
  },
  {
    icon: PackagePlus,
    title: "List or browse",
    description: "Post an item to sell, or explore what's available.",
  },
  {
    icon: MessageCircle,
    title: "Connect",
    description: "Message the seller directly to work out details.",
  },
  {
    icon: Handshake,
    title: "Meet up",
    description: "Exchange the item safely, right on campus.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-slate-50 py-16 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
            How it works
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Four simple steps to your next deal.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-400">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/how-it-works"
            className="text-sm font-medium text-teal-700 hover:underline dark:text-teal-400"
          >
            Learn more →
          </Link>
        </div>
      </div>
    </section>
  );
}
