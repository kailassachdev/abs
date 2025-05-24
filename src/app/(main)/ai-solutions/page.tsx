
import type { Metadata } from 'next';
import { AiSolutionsSection } from "@/components/sections/ai-solutions-section";

export const metadata: Metadata = {
  title: 'AI Solutions - Aether Shield',
  description: 'Explore AI-driven solutions for mitigating IT burnout and enhancing well-being.',
};

export default function AiSolutionsPage() {
  return (
    <AiSolutionsSection />
  );
}
