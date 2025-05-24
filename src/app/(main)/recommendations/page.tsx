
import type { Metadata } from 'next';
import { RecommendationsSection } from "@/components/sections/recommendations-section";

export const metadata: Metadata = {
  title: 'Strategic Recommendations - Aether Shield',
  description: 'Strategic recommendations for leveraging AI to mitigate IT burnout.',
};

export default function RecommendationsPage() {
  return (
    <RecommendationsSection />
  );
}
