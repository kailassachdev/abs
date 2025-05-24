
import type { Metadata } from 'next';
import { Navbar } from "@/components/layout/navbar";
// import { Footer } from "@/components/layout/footer"; // Temporarily commented out

export const metadata: Metadata = {
  title: 'Aether Shield: IT Burnout & AI Solutions Explorer',
  description: 'Exploring IT burnout and AI-driven solutions to foster well-being and productivity.',
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ border: '5px solid blue', minHeight: '100vh' }}> {/* Added style for debugging */}
      <Navbar />
      {/* <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8"> */}
        {children}
      {/* </main> */}
      {/* <Footer /> */} {/* Temporarily commented out */}
    </div>
  );
}
