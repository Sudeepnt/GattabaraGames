"use client";

import React, { useState, useEffect } from "react";

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
      <span className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-4 ${isDark ? "text-white" : "text-black"} ${enableHover ? "group-hover:!text-black" : ""}`}>
        {title}
      </span>
    )}

    <div className={`text-xs font-medium uppercase tracking-tighter ${isDark ? "text-white" : "text-black"} ${enableHover ? "group-hover:!text-black" : ""}`}>
      {children}
    </div>
  </div>
);

export default function BottomBox({ isDark = false }: { isDark?: boolean }) {
  const [footerLinks, setFooterLinks] = useState<Array<{ label: string; url: string }>>([]);

  useEffect(() => {
    fetch('/data/content.json')
      .then(res => res.json())
      .then(data => {
        if (data?.home?.bottomBox?.footerLinks) {
          setFooterLinks(data.home.bottomBox.footerLinks);
        }
      })
      .catch(error => console.error('BottomBox load error:', error));
  }, []);

  const hoverClass = isDark
    ? "hover:bg-white hover:text-black"
    : "hover:bg-black hover:text-white";

  const firstColumn = footerLinks.slice(0, 2);
  const secondColumn = footerLinks.slice(2, 4);
  const thirdColumn = footerLinks.slice(4);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`w-full bg-transparent font-sans relative z-10 px-2 py-4 md:p-1 pt-12 md:pt-20 flex flex-col gap-1 ${isDark ? "text-white" : "text-black"}`}>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-1 w-full">
        {/* First Container: Hover Enabled + Scroll to Top */}
        <SubBox
          isDark={isDark}
          className="h-22 md:h-28 flex items-start justify-start"
          enableHover={true}
          onClick={scrollToTop}
        >
          <div className="relative w-12 h-12 md:w-14 md:h-14">
            {/* Standard Logo - Fades out on hover */}
            <img
              src="/logos/GGlogo.png"
              alt="Logo"
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0 ${isDark ? "invert" : ""}`}
            />
            {/* Hover Logo - Fades in on hover */}
            <img
              src="/logos/gglogoblack.png"
              alt="Logo Hover"
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            />
          </div>
        </SubBox>

        <SubBox isDark={isDark} enableHover={false}>
          <div className="flex flex-col gap-1 italic uppercase tracking-tighter font-semibold">
            {firstColumn.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className={`${hoverClass} transition-colors duration-300`}>
                {link.label}
              </a>
            ))}
          </div>
        </SubBox>

        <SubBox isDark={isDark} enableHover={false}>
          <div className="flex flex-col gap-1 uppercase tracking-tighter font-semibold">
            {secondColumn.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className={`${hoverClass} transition-colors duration-300`}>
                {link.label}
              </a>
            ))}
          </div>
        </SubBox>

        <SubBox isDark={isDark} enableHover={false}>
          <div className="flex flex-col gap-1 uppercase tracking-tighter font-bold">
            {thirdColumn.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className={`decoration-1 underline-offset-4 ${hoverClass} transition-colors duration-300`}>
                {link.label}
              </a>
            ))}
          </div>
        </SubBox>
      </div>

      <div className={`w-full py-2 px-6 flex items-center justify-center tech-border-btn static-border ${isDark ? "text-white" : "text-black"}`}>
        <p className={`text-[9px] tracking-[0.5em] font-medium text-center uppercase leading-relaxed ${isDark ? "text-white" : "text-black"}`}>
          Gattabara Games and the Gattabara Games logo are all brands of Gattabara Games Limited. All rights reserved.
        </p>
      </div>

    </footer>
  );
}
