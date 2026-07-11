import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import TrendingListings from "@/components/home/TrendingListings";
import HowItWorks from "@/components/home/HowItWorks";
import StatsSection from "@/components/home/StatsSection";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import Newsletter from "@/components/home/Newsletter";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "CampusCart — Buy & Sell Within Your Campus",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <CategoryShowcase />
      <TrendingListings />
      <HowItWorks />
      <StatsSection />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <CTASection />
    </main>
  );
}
