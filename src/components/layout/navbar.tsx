
"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

export function Navbar() {
  const [activeLink, setActiveLink] = useState(NAV_LINKS[0].id);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const navElement = document.getElementById("navbar");
    if (navElement) {
      setNavbarHeight(navElement.offsetHeight);
    }
  }, []);

  const handleScroll = useCallback(() => {
    let current = "";
    NAV_LINKS.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) {
        const sectionTop = section.offsetTop - navbarHeight - 50; // Adjusted offset
        if (window.pageYOffset >= sectionTop) {
          current = link.id;
        }
      }
    });

    if (window.pageYOffset < (document.getElementById(NAV_LINKS[0].id)?.offsetTop || 0) - navbarHeight - 50) {
        current = NAV_LINKS[0].id;
    }
    setActiveLink(current || NAV_LINKS[0].id);
  }, [navbarHeight]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call on mount to set initial active link
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const NavLinkItems = ({ isMobile = false, onLinkClick }: { isMobile?: boolean, onLinkClick?: () => void }) => (
    <>
      {NAV_LINKS.map((link) => (
        <Link
          key={link.id}
          href={`#${link.id}`}
          onClick={(e) => {
            e.preventDefault();
            const targetElement = document.getElementById(link.id);
            if (targetElement) {
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
              window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
            if (onLinkClick) onLinkClick();
            setActiveLink(link.id); // Set active link immediately on click
          }}
          className={`nav-link-custom ${activeLink === link.id ? "active" : ""} ${isMobile ? "block text-lg py-3" : "text-sm"}`}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
  
  return (
    <nav id="navbar" className="sticky-nav-custom">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="#intro" className="font-bold text-xl text-teal-custom-700">
              Aether Shield
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              <NavLinkItems />
            </div>
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-teal-custom-700 hover:bg-teal-custom-600 hover:text-white">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-amber-custom-50 p-6">
                <div className="flex flex-col space-y-2">
                   <NavLinkItems isMobile={true} onLinkClick={() => {
                     // This is a bit of a hack to close the sheet. A more robust way might involve managing sheet's open state.
                     const closeButton = document.querySelector('[data-radix-dialog-default-open="false"] > button[aria-label="Close"]');
                     if (closeButton instanceof HTMLElement) {
                        closeButton.click();
                     }
                   }} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
