
import { IntroSection } from "@/components/sections/intro-section";
import { AiSolutionsSection } from "@/components/sections/ai-solutions-section";
import { UnderstandingSection } from "@/components/sections/understanding-section";
import { CausesSection } from "@/components/sections/causes-section";
import { ImpactsSection } from "@/components/sections/impacts-section";
import { TechFrameworkSection } from "@/components/sections/tech-framework-section";
import { EthicsSection } from "@/components/sections/ethics-section";
import { RecommendationsSection } from "@/components/sections/recommendations-section";
import { ConclusionSection } from "@/components/sections/conclusion-section";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aether Shield: IT Burnout & AI Solutions Explorer',
  description: 'Exploring IT burnout and AI-driven solutions to foster well-being and productivity.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 md:space-y-16">
        <IntroSection />
        <AiSolutionsSection />
        <UnderstandingSection />
        <CausesSection />
        <ImpactsSection />
        <TechFrameworkSection />
        <EthicsSection />
        <RecommendationsSection />
        <ConclusionSection />
      </main>
      <Footer />
    </div>
  );
}
