
import type { Metadata } from 'next';
import { IntroSection } from "@/components/sections/intro-section";

export const metadata: Metadata = {
  title: 'Introduction - Aether Shield',
  description: 'Introduction to IT burnout and the role of AI in providing solutions.',
};

export default function IntroPage() {
  return (
    <IntroSection />
  );
}
