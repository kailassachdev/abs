
import type { Metadata } from 'next';
import { ConclusionSection } from "@/components/sections/conclusion-section";

export const metadata: Metadata = {
  title: 'Conclusion & Future Outlook - Aether Shield',
  description: 'Conclusion on IT burnout and the future outlook with AI solutions.',
};

export default function ConclusionPage() {
  return (
    <ConclusionSection />
  );
}
