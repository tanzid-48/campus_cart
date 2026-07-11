import type { Metadata } from "next";
import Hero from "@/components/home/Hero";

export const metadata: Metadata = {
  title: "CampusCart — Buy & Sell Within Your Campus",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
    </main>
  );
}
