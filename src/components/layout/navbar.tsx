
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import type { NavLink } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>(NAV_LINKS[0]?.slug || "");
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navRef = useRef<HTMLElement | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    if (navRef.current) {
      setNavbarHeight(navRef.current.offsetHeight);
    }

    const handleScroll = () => {
      const currentNavbarHeight = navRef.current?.offsetHeight || 0;
      const activationPoint = window.scrollY + currentNavbarHeight + 1; 
      let newActiveSection = "";

      const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2;

      if (isAtBottom && NAV_LINKS.length > 0) {
        newActiveSection = NAV_LINKS[NAV_LINKS.length - 1].slug;
      } else {
        for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
          const link = NAV_LINKS[i];
          const section = document.getElementById(link.slug);
          if (section && section.offsetTop <= activationPoint) {
            newActiveSection = link.slug;
            break; 
          }
        }
        if (!newActiveSection && NAV_LINKS.length > 0) {
          newActiveSection = NAV_LINKS[0].slug;
        }
      }
      
      if (newActiveSection && activeSection !== newActiveSection) {
        setActiveSection(newActiveSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navbarHeight]); // Dependency only on navbarHeight

  const NavLinkItems = ({ isMobile = false, onLinkClick }: { isMobile?: boolean, onLinkClick?: () => void }) => (
    <>
      {NAV_LINKS.map((link: NavLink) => (
        <Link
          key={link.slug}
          href={link.href}
          onClick={() => {
            if (onLinkClick) onLinkClick();
            // setActiveSection(link.slug); // Optional: for instant feedback, but scroll handler will catch it
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
            <Link href={`/#${NAV_LINKS[0]?.slug || ''}`} className="font-bold text-xl text-teal-custom-700">
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
