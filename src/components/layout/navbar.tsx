
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import type { NavLink } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("ai-solutions");
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navRef = useRef<HTMLElement | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    if (navRef.current) {
      setNavbarHeight(navRef.current.offsetHeight);
    }

    const handleScroll = () => {
      let currentSection = "ai-solutions"; // Default to the first section
      const scrollPosition = window.scrollY + navbarHeight + 20; // Add some offset

      NAV_LINKS.forEach((link) => {
        const section = document.getElementById(link.slug);
        if (section && section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
          currentSection = link.slug;
        }
      });
       // If scrolled to the very bottom, and the last section isn't filling the view, make sure it's active
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20) {
        currentSection = NAV_LINKS[NAV_LINKS.length - 1].slug;
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call on mount to set initial active section

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navbarHeight]);

  const NavLinkItems = ({ isMobile = false, onLinkClick }: { isMobile?: boolean, onLinkClick?: () => void }) => (
    <>
      {NAV_LINKS.map((link: NavLink) => (
        <Link
          key={link.slug}
          href={link.href} // Use the href which now includes #
          onClick={() => {
            if (onLinkClick) onLinkClick();
            // setActiveSection(link.slug); // Set active on click for faster feedback
          }}
          className={`nav-link-custom ${activeSection === link.slug ? "active" : ""} ${isMobile ? "block text-lg py-3" : "text-sm"}`}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
  
  return (
    <nav id="navbar" ref={navRef} className="sticky-nav-custom">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/#ai-solutions" className="font-bold text-xl text-teal-custom-700">
              Aether Shield
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              <NavLinkItems />
            </div>
          </div>
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-teal-custom-700 hover:bg-teal-custom-600 hover:text-white">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-amber-custom-50 p-6">
                <div className="flex flex-col space-y-2">
                   <NavLinkItems isMobile={true} onLinkClick={() => setIsSheetOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
