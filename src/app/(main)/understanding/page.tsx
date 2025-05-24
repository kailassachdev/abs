
import type { Metadata } from 'next';
import { UnderstandingSection } from "@/components/sections/understanding-section";

export const metadata: Metadata = {
  title: 'Understanding Burnout - Aether Shield',
  description: 'Understanding the dimensions and manifestations of IT burnout.',
};

export default function UnderstandingPage() {
  return (
    <UnderstandingSection />
  );
}
