import Link from "next/link";
import FadeInView from "./FadeInView";

export default function CTASection() {
  return (
    <section className="w-full bg-gradient-to-r from-teal-700 to-teal-800 dark:from-teal-800 dark:to-teal-900">
      <FadeInView className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to Start Selling?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-teal-50">
          Join hundreds of students already buying and selling on CampusCart. It
          only takes a minute to get started.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/register"
            className="rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-teal-700 transition-colors hover:bg-teal-50"
          >
            Create Free Account
          </Link>
          <Link
            href="/explore"
            className="rounded-lg border border-white px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-600"
          >
            Browse Listings
          </Link>
        </div>
      </FadeInView>
    </section>
  );
}
