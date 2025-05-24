
import type { Metadata } from 'next';
import { EthicsSection } from "@/components/sections/ethics-section";

export const metadata: Metadata = {
  title: 'Ethical Compass - Aether Shield',
  description: 'Ethical considerations for implementing AI in well-being solutions.',
};

export default function EthicsPage() {
  return (
    <EthicsSection />
  );
}
