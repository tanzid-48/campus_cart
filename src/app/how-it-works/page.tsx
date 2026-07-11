import type { Metadata } from "next";
import Link from "next/link";
import {
  Search,
  MessageCircle,
  Handshake,
  PlusCircle,
  ShieldCheck,
  Users,
} from "lucide-react";
import AnimatedStepCard from "./AnimatedStepCard";

export const metadata: Metadata = {
  title: "How It Works — CampusCart",
  description:
    "Learn how buying and selling works on CampusCart, the secondhand marketplace for students.",
};

const BUYER_STEPS = [
  {
    icon: Search,
    title: "Browse listings",
    description:
      "Explore books, electronics, cycles, and more posted by students on your campus. Use filters for category, price, and condition to find exactly what you need.",
  },
  {
    icon: MessageCircle,
    title: "Contact the seller",
    description:
      "Found something you like? Message the seller directly through WhatsApp, phone, or email to ask questions or negotiate the price.",
  },
  {
    icon: Handshake,
    title: "Meet and deal",
    description:
      "Arrange a safe meeting spot on campus, inspect the item, and complete the exchange in person. Simple and direct — no shipping needed.",
  },
];

const SELLER_STEPS = [
  {
    icon: PlusCircle,
    title: "Post your item",
    description:
      "Create a listing in minutes — add photos, set a price, describe the condition, and choose a category. Mark it negotiable if you're open to offers.",
  },
  {
    icon: Users,
    title: "Get contacted by buyers",
    description:
      "Interested students will reach out directly to ask questions or arrange a meetup. Manage all your active listings from one dashboard.",
  },
  {
    icon: ShieldCheck,
    title: "Mark as sold",
    description:
      "Once you've made the deal, update your listing status to Sold or Reserved so other students know it's no longer available.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          How CampusCart Works
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-500 dark:text-slate-400">
          A simple, safe way to buy and sell secondhand items with fellow
          students on your campus.
        </p>
      </div>

      {/* For Buyers */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-teal-700 dark:text-teal-400">
          For Buyers
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {BUYER_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <AnimatedStepCard
                key={step.title}
                icon={<Icon size={22} />}
                title={step.title}
                description={step.description}
                index={idx}
                accentColor="teal"
              />
            );
          })}
        </div>
      </section>

      {/* For Sellers */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-teal-700 dark:text-teal-400">
          For Sellers
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {SELLER_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <AnimatedStepCard
                key={step.title}
                icon={<Icon size={22} />}
                title={step.title}
                description={step.description}
                index={idx}
                accentColor="amber"
              />
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-16 rounded-2xl bg-teal-700 px-6 py-10 text-center dark:bg-teal-800">
        <h2 className="text-2xl font-bold text-white">Ready to get started?</h2>
        <p className="mt-2 text-teal-50">
          Join your campus marketplace today — it only takes a minute.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/explore"
            className="rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-50"
          >
            Browse Listings
          </Link>
          <Link
            href="/register"
            className="rounded-lg border border-white px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-600"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
