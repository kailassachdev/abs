
import type { Metadata } from 'next';
import { CausesSection } from "@/components/sections/causes-section";

export const metadata: Metadata = {
  title: 'Causes of Burnout - Aether Shield',
  description: 'Exploring the root causes of burnout in the IT sector.',
};

export default function CausesPage() {
  return (
    <CausesSection />
  );
}
