"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import SecuritySection from "@/components/SecuritySection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import HowItWorksModal from "@/components/HowItWorksModal";

export default function Home() {
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1E3A2B]">
      {/* Top Navbar */}
      <Navbar onOpenHowItWorks={() => setHowItWorksOpen(true)} />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection onOpenHowItWorks={() => setHowItWorksOpen(true)} />

        {/* 2. Feature Section (Satu tempat, lebih banyak kendali) */}
        <FeaturesSection
          onSelectFeature={() => setHowItWorksOpen(true)}
        />

        {/* 3. Security Section */}
        <SecuritySection />

        {/* 4. Pricing Section */}
        <PricingSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Walkthrough Modal */}
      <HowItWorksModal
        isOpen={howItWorksOpen}
        onClose={() => setHowItWorksOpen(false)}
      />
    </div>
  );
}
