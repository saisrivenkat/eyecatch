import { Header } from "@/components/Header";
import { GradientBlob } from "@/components/GradientBlob";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { EthosSection } from "@/components/EthosSection";
import { WorkSection } from "@/components/WorkSection";
import { StatsSection } from "@/components/StatsSection";
import { PartnersSection } from "@/components/PartnersSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ArticlesSection } from "@/components/ArticlesSection";
import { FaqSection } from "@/components/FaqSection";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Fixed parallax wave layer — persists across sections */}
      <div
        className="fixed inset-0 z-1 pointer-events-none"
        style={{ width: "100vw", height: "100vh" }}
      >
        <GradientBlob />
      </div>

      <Header />
      <main className="relative z-2" style={{ backgroundColor: "transparent" }}>
        <HeroSection />
        <ServicesSection />
        <EthosSection />
        <WorkSection />
        <StatsSection />
        <PartnersSection />
        <TestimonialsSection />
        <ArticlesSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
