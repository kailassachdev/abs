
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans', // Use --font-sans for easier integration with Tailwind
});

export const metadata: Metadata = {
  title: 'Aether Shield: IT Burnout & AI Solutions Explorer',
  description: 'Exploring IT burnout and AI-driven solutions to foster well-being and productivity.',
  icons: {
    icon: '/senk.png', // This tells Next.js to look for senk.png in the public directory
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
