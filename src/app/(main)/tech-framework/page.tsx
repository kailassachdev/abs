
import type { Metadata } from 'next';
import { TechFrameworkSection } from "@/components/sections/tech-framework-section";

export const metadata: Metadata = {
  title: 'Tech & Human Synergy - Aether Shield',
  description: 'The technological framework and human-in-the-loop AI for burnout solutions.',
};

export default function TechFrameworkPage() {
  return (
    <TechFrameworkSection />
  );
}
