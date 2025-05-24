
// This file now correctly serves as the entry point for the root path '/'
// and delegates rendering to the page defined within the (main) route group,
// ensuring it uses the MainLayout (Navbar, Footer) from that group.

import IntroPageForRoot from "./(main)/page";

export default IntroPageForRoot;
