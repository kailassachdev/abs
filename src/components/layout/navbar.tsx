
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import type { NavLink } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

export function Navbar() {
  const pathname = usePathname();

  const NavLinkItems = ({ isMobile = false, onLinkClick }: { isMobile?: boolean, onLinkClick?: () => void }) => (
    <>
      {NAV_LINKS.map((link: NavLink) => (
        <Link
          key={link.slug}
          href={link.href}
          onClick={() => {
            if (onLinkClick) onLinkClick();
          }}
          className={`nav-link-custom ${pathname === link.href ? "active" : ""} ${isMobile ? "block text-lg py-3" : "text-sm"}`}
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
            <Link href="/" className="font-bold text-xl text-teal-custom-700">
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
                     // Attempt to click the default close button provided by SheetContent
                     const closeButton = document.querySelector('button[aria-label="Close"]');
                     if (closeButton instanceof HTMLElement) {
                        closeButton.click();
                     }
                   }} />
                </div>
                {/* Removed custom hidden SheetClose component. 
                    The SheetContent itself provides a close button (X icon top right).
                    The onLinkClick handler above attempts to click that.
                */}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
