import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import TrendingListings from "@/components/home/TrendingListings";

export const metadata: Metadata = {
  title: "CampusCart — Buy & Sell Within Your Campus",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CategoryShowcase />
      <TrendingListings />
    </main>
  );
}
