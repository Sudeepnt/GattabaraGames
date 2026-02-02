"use client";

import React, { useState, useEffect } from "react";

const SubBox = ({
  title,
  children,
  className = "",
  isDark = false,
}: {
  title?: string;
  children?: React.ReactNode;
  className?: string;
  isDark?: boolean;
}) => (
  <div
    className={`
      relative p-2 flex flex-col justify-start 
      border bg-transparent
      min-h-0 md:min-h-[160px] rounded-sm
      ${isDark ? "border-white text-white" : "border-black text-black"}
      ${className}
    `}
  >
    {title && (
      <span className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-4 ${isDark ? "text-white" : "text-black"}`}>
        {title}
      </span>
    )}

    <div className={`text-xs font-medium uppercase tracking-tighter ${isDark ? "text-white" : "text-black"}`}>
      {children}
    </div>
  </div>
);

export default function BottomBox({ isDark = false }: { isDark?: boolean }) {
  const [phrases, setPhrases] = useState(["crodal.", "crafted with conviction.", "inspired by culture."]);
  const [footerLinks, setFooterLinks] = useState<Array<{ label: string; url: string }>>([]);
  
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    fetch('/data/content.json')
      .then(res => res.json())
      .then(data => {
        if (data?.home?.bottomBox) {
          if (data.home.bottomBox.phrases) setPhrases(data.home.bottomBox.phrases);
          if (data.home.bottomBox.footerLinks) setFooterLinks(data.home.bottomBox.footerLinks);
        }
      })
      .catch(error => console.error('BottomBox load error:', error));
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 40 : 80);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, phrases]);

  const hoverClass = isDark 
    ? "hover:bg-white hover:text-black" 
    : "hover:bg-black hover:text-white";

  const firstColumn = footerLinks.slice(0, 2);
  const secondColumn = footerLinks.slice(2, 4);
  const thirdColumn = footerLinks.slice(4);

  return (
    <footer className={`w-full bg-transparent font-sans relative z-10 p-4 md:p-1 flex flex-col gap-1 ${isDark ? "text-white" : "text-black"}`}>
 
      <div className="py-20 md:py-64 flex items-center justify-center w-full px-6 overflow-hidden min-h-[300px] md:min-h-[450px]">
        <h2 className={`text-[11vw] md:text-[7vw] font-black tracking-tighter leading-none text-center uppercase ${isDark ? "text-white" : "text-black"}`}>
          {text}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-1 w-full">
        <SubBox isDark={isDark} className="h-32 md:h-40 flex items-start justify-start">
          <img
            src={isDark ? "/crodallogo.png" : "/crodallogoblack.png"}
            alt="Logo"
            className={`w-12 h-12 md:w-14 md:h-14 ${isDark ? "invert" : ""}`}
          />
        </SubBox>
        
        <SubBox isDark={isDark}>
          <div className="flex flex-col gap-1 italic uppercase tracking-tighter font-semibold">
            {firstColumn.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className={`${hoverClass} transition-colors duration-300`}>
                {link.label}
              </a>
            ))}
          </div>
        </SubBox>

        <SubBox isDark={isDark}>
          <div className="flex flex-col gap-1 uppercase tracking-tighter font-semibold">
            {secondColumn.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className={`${hoverClass} transition-colors duration-300`}>
                {link.label}
              </a>
            ))}
          </div>
        </SubBox>

        <SubBox isDark={isDark}>
          <div className="flex flex-col gap-1 uppercase tracking-tighter font-bold">
            {thirdColumn.map((link, index) => (
              <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className={`decoration-1 underline-offset-4 ${hoverClass} transition-colors duration-300`}>
                {link.label}
              </a>
            ))}
          </div>
        </SubBox>
      </div>

      <div className={`w-full border py-6 px-8 flex items-center rounded-sm justify-center ${isDark ? "border-white" : "border-black"}`}>
        <p className={`text-[9px] tracking-[0.5em] font-medium text-center uppercase leading-relaxed ${isDark ? "text-white" : "text-black"}`}>
          Crodal and the Crodal logo are all brands of Crodal Limited. All rights reserved.
        </p>
      </div>

    </footer>
  );
}
