import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { GradientBlob } from "@/components/GradientBlob";
import { BrandingHeroSection } from "@/components/BrandingHeroSection";
import { BrandingPillarsSection } from "@/components/BrandingPillarsSection";
import { BrandingAuditSection } from "@/components/BrandingAuditSection";
import { StatsSection } from "@/components/StatsSection";
import { WorkSection } from "@/components/WorkSection";
// import { FaqSection } from "@/components/FaqSection"; // disabled per content review
import { BrandingContactSection } from "@/components/BrandingContactSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Branding | EyeCatch — Hyderabad & Vijayawada",
  description:
    "Brand strategy, tone of voice, and visual identity for brands that refuse to fade into the crowd. EyeCatch — design and branding from Hyderabad & Vijayawada.",
};

export default function BrandingPage() {
  return (
    <>
      {/* Fixed parallax wave layer — persists across sections, matches home page */}
      <div
        className="fixed inset-0 z-1 pointer-events-none"
        style={{ width: "100vw", height: "100vh" }}
      >
        <GradientBlob />
      </div>

      <Header />
      <main className="relative z-2" style={{ backgroundColor: "transparent" }}>
        <BrandingHeroSection />
        <BrandingPillarsSection />
        <BrandingAuditSection />
        <StatsSection />
        <WorkSection />
        {/* <FaqSection /> */}
        <BrandingContactSection />
      </main>
      <Footer />
    </>
  );
}
