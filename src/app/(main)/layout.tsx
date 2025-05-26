
import type { ReactNode } from 'react';

// This layout is for the (main) route group.
// Since the app is currently structured as a single-page application
// where src/app/page.tsx manages its own Navbar and Footer,
// this layout might not be directly wrapping the primary content of the homepage.
// However, to ensure Next.js build processes it correctly as a layout file
// if it encounters this route group, it needs to export a valid default layout component.

export default function MainGroupLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // This layout simply passes its children through.
  // The actual page structure with Navbar and Footer for the single-page app
  // is defined in src/app/page.tsx.
  return <>{children}</>;
}
