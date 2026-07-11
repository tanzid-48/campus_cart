import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import CategoryShowcase from "@/components/home/CategoryShowcase";

export const metadata: Metadata = {
  title: "CampusCart — Buy & Sell Within Your Campus",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CategoryShowcase />
    </main>
  );
}
