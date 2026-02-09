"use client";
import Link from "next/link";
import StatsBoard from "@/components/home/StatsBoard";
import QuickService from "@/components/home/QuickService";
import ExpertSlide from "@/components/home/ExpertSlide";
import HeroSection from "@/components/home/HeroSection";
import PartnerLogos from "@/components/home/PartnerLogos";


export default function Home() {
  return (
    <div>
      <HeroSection />
      
      {/* Partner Logos Section */}
      <PartnerLogos />
      
      {/* New Sections */}
      <StatsBoard />
      <QuickService />
      <ExpertSlide />


    </div>
  );
}
