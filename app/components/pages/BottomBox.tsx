"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const SubBox = ({
  title,
  children,
  className = "",
  isDark = false,
  enableHover = false,
  onClick,
}: {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  isDark?: boolean;
  enableHover?: boolean;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className={`
      relative p-4 flex flex-col justify-start 
      bg-transparent
      min-h-0 md:min-h-[112px] 
      tech-border-btn
      ${!enableHover ? "static-border" : ""}
      ${isDark ? "text-white" : "text-black"}
      ${className}
      ${enableHover ? "group hover:!bg-white hover:!text-black cursor-pointer" : ""}
      transition-colors duration-300
    `}>
    {title && (
      <span className={`text-[10px] font-bold tracking-[0.3em] mb-4 ${isDark ? "text-white" : "text-black"} ${enableHover ? "group-hover:!text-black" : ""}`}>
        {title}
      </span>
    )}

    <div className={`text-xs font-medium tracking-tighter ${isDark ? "text-white" : "text-black"} ${enableHover ? "group-hover:!text-black" : ""}`}>
      {children}
    </div>
  </div>
);

export default function BottomBox({ isDark = false }: { isDark?: boolean }) {
  const [footerLinks, setFooterLinks] = useState<Array<{ label: string; url: string }>>([]);
  const [contactEmail, setContactEmail] = useState("");

  useEffect(() => {
    fetch('/data/content.json')
      .then(res => res.json())
      .then(data => {
        if (data?.home?.bottomBox) {
          if (data.home.bottomBox.footerLinks) setFooterLinks(data.home.bottomBox.footerLinks);
          if (data.home.bottomBox.contactEmail) setContactEmail(data.home.bottomBox.contactEmail);
        }
      })
      .catch(error => console.error('BottomBox load error:', error));
  }, []);

  const hoverClass = isDark
    ? "hover:bg-white hover:text-black"
    : "hover:bg-black hover:text-white";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`w-full bg-transparent font-sans relative z-10 px-2 py-4 md:p-1 pt-12 md:pt-20 flex flex-col gap-1 ${isDark ? "text-white" : "text-black"}`}>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 w-full">
        {/* 1. Logo Container */}
        <SubBox
          isDark={isDark}
          className="h-28 md:h-32 flex items-start justify-start"
          enableHover={true}
          onClick={scrollToTop}
        >
          <div className="relative w-12 h-12 md:w-14 md:h-14">
            <img
              src="/logos/GGlogo.png"
              alt="Logo"
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0 ${isDark ? "invert" : ""}`}
            />
            <img
              src="/logos/gglogoblack.png"
              alt="Logo Hover"
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            />
          </div>
        </SubBox>

        {/* 2. Pitch & Contact */}
        <SubBox isDark={isDark} enableHover={false} className="h-28 md:h-32">
          <div className="flex flex-col gap-2 italic tracking-tighter font-semibold">
            <Link href="/pitch-us" className={`${hoverClass} transition-colors duration-300 w-fit`}>
              Pitch Us
            </Link>
            <Link href="/contact-us" className={`${hoverClass} transition-colors duration-300 w-fit`}>
              Contact Us
            </Link>
          </div>
        </SubBox>

        {/* 3. Socials */}
        <SubBox isDark={isDark} enableHover={false} className="h-28 md:h-32">
          <div className="flex flex-col gap-2 tracking-tighter font-semibold">
            {footerLinks.filter(l => !['Pitch', 'Blogs'].includes(l.label)).map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className={`${hoverClass} transition-colors duration-300 w-fit`}>
                {link.label}
              </a>
            ))}
          </div>
        </SubBox>

        {/* 4. Policies */}
        <SubBox isDark={isDark} enableHover={false} className="h-28 md:h-32">
          <div className="flex flex-col gap-2 tracking-tighter font-bold">
            <Link href="/privacy" className={`decoration-1 underline-offset-4 ${hoverClass} transition-colors duration-300 w-fit`}>
              Privacy Policy
            </Link>
            <Link href="/cookies" className={`decoration-1 underline-offset-4 ${hoverClass} transition-colors duration-300 w-fit`}>
              Cookies Policy
            </Link>
          </div>
        </SubBox>
      </div>

      <div className={`w-full py-2 px-6 flex items-center justify-center tech-border-btn static-border ${isDark ? "text-white" : "text-black"}`}>
        <p className={`text-[9px] tracking-[0.5em] font-medium text-center leading-relaxed ${isDark ? "text-white" : "text-black"}`}>
          “Gattabara Games”, ”GG”, “GG Productions” and the Gattabara Games logo are all brands of Gattabara Games LLP. All rights reserved.
        </p>
      </div>

    </footer>
  );
}
