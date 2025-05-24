
import type { Metadata } from 'next';
import { ImpactsSection } from "@/components/sections/impacts-section";

export const metadata: Metadata = {
  title: 'Impacts of Burnout - Aether Shield',
  description: 'The ripple effects and impacts of IT burnout on individuals and organizations.',
};

export default function ImpactsPage() {
  return (
    <ImpactsSection />
  );
}
