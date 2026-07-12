import type { Metadata } from "next";
import {
  MapPin,
  Users,
  Eye,
  CreditCard,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";
import FadeInView from "@/components/home/FadeInView";

export const metadata: Metadata = {
  title: "Safety Tips — CampusCart",
  description: "Tips for staying safe while buying and selling on CampusCart.",
};

const TIPS = [
  {
    icon: MapPin,
    title: "Meet in public campus spots",
    description:
      "Choose well-lit, populated areas like the library, cafeteria, or main gate for exchanges.",
  },
  {
    icon: Users,
    title: "Bring a friend if possible",
    description:
      "Especially for high-value items, it's safer to meet with someone else present.",
  },
  {
    icon: Eye,
    title: "Inspect before you pay",
    description:
      "Check the item's condition matches the listing description before completing payment.",
  },
  {
    icon: CreditCard,
    title: "Avoid advance payments",
    description:
      "Never send money before seeing the item in person, especially to unfamiliar sellers.",
  },
  {
    icon: MessageSquare,
    title: "Keep communication on record",
    description:
      "Use WhatsApp, email, or the contact options provided — avoid moving to untraceable channels.",
  },
  {
    icon: AlertTriangle,
    title: "Trust your instincts",
    description:
      "If a deal feels off or too good to be true, it's okay to walk away or ask more questions first.",
  },
];

export default function SafetyTipsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Safety Tips
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-500 dark:text-slate-400">
          A few simple habits to make every CampusCart transaction safe and
          smooth.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TIPS.map((tip, idx) => {
          const Icon = tip.icon;
          return (
            <FadeInView
              key={tip.title}
              index={idx}
              className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                <Icon size={22} />
              </div>
              <h2 className="mt-4 font-semibold text-slate-900 dark:text-white">
                {tip.title}
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {tip.description}
              </p>
            </FadeInView>
          );
        })}
      </div>
    </div>
  );
}
