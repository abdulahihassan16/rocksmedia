"use client";

import { StatsSection } from "@/components/StatsSection";
import { TrustedBy } from "@/components/TrustedBy";
import { HeroWithImages } from "@/components/ui/hero-with-group-of-images-text-and-two-buttons";
import { Navbar } from "@/components/Navbar";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { FAQSection } from "@/components/FAQSection";
import { ZoomOutIntro } from "@/components/ZoomOutIntro";
import { HeroSection } from "@/components/HeroSection";
import { SkyBackground } from "@/components/SkyBackground";


export default function Home() {
  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative text-foreground overflow-x-hidden">
      <SkyBackground />
      <ZoomOutIntro />
      <Navbar />

      {/* ── Section 1: Hero ── */}
      <HeroSection
        scrollToPricing={scrollToPricing}
        scrollToContact={scrollToContact}
      />

      {/* ── Section 2: Stats ── */}
      <section id="services">
        <StatsSection />
      </section>

      {/* ── Trusted By strip ── */}
      <TrustedBy />

      {/* ── Section 3: How it Works ── */}
      <section id="how-it-works">
        <HeroWithImages title="How It Works" />
      </section>

      {/* ── Section 4: Pricing ── */}
      <PricingSection />

      {/* ── Section 5: Contact ── */}
      <ContactSection />

      {/* ── Section 6: FAQ ── */}
      <FAQSection />

      {/* ── Section 6: Footer ── */}
      <Footer />
    </main>
  );
}
