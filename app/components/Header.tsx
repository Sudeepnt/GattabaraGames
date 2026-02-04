"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [navItems, setNavItems] = useState<Array<{ label: string; href: string }>>([]);

  useEffect(() => {
    fetch('/data/content.json')
      .then(res => res.json())
      .then(data => {
        if (data?.home?.header?.navItems) {
          const loadedItems = data.home.header.navItems.map((item: any, index: number) => {
            // Map nav items to their routes
            if (index === 0) {
              return { label: item.label, href: "/" }; // GATTABARA GAMES
            } else if (index === 1) {
              return { label: item.label, href: "/games" }; // Games
            } else if (index === 2) {
              return { label: item.label, href: "/gg-productions" }; // GG PRODUCTIONS
            } else if (index === 3) {
              return { label: item.label, href: "/about" }; // About
            } else {
              return { label: item.label, href: "/pitch-us" }; // Pitch Us
            }
          });
          setNavItems(loadedItems);
        }
      })
      .catch(error => console.error('Header load error:', error));
  }, []);

  // Determine theme based on current path
  const isWhiteTheme = false; // Default to White Text (Dark Theme) for now, unless specified otherwise
  const themeClasses = isWhiteTheme
    ? "text-black hover:text-white"
    : "text-white hover:text-black";

  return (
    <header className="fixed top-0 left-0 w-full z-[999] p-4 md:p-1">
      <nav className="grid grid-cols-1 md:grid-cols-5 gap-1 w-full">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`
              relative h-14 pl-[20px] pt-[5px] pr-2 pb-2
              flex items-start justify-start
              bg-transparent
              border-none font-bold text-sm uppercase tracking-wide
              transition-all duration-300
              tech-border-btn
              ${themeClasses}
            `}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}