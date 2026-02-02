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
              return { label: item.label, href: "/" };
            } else if (index === 1) {
              return { label: item.label, href: "/projects" };
            } else if (index === 2) {
              return { label: item.label, href: "/about" };
            } else {
              return { label: item.label, href: "/pitch" };
            }
          });
          setNavItems(loadedItems);
        }
      })
      .catch(error => console.error('Header load error:', error));
  }, []);

  // Determine theme based on current path
  const isWhiteTheme = pathname === "/about";
  const themeClasses = isWhiteTheme
    ? "border-white text-white hover:bg-white hover:text-black"
    : "border-black text-black hover:bg-black hover:text-white";

  return (
    <header className="fixed top-0 left-0 w-full z-[100] p-4 md:p-1">
      <nav className="grid grid-cols-2 md:grid-cols-4 gap-1 w-full">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`
              relative h-14 p-2
              flex items-start justify-start
              bg-transparent
              border font-bold text-sm uppercase tracking-wide
              transition-all duration-300
              rounded-sm
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