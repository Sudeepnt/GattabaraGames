"use client";

import React, { useState, useEffect } from "react";
import ProjectStack from "./ProjectStack";
import CuratedPartnerships from "./CuratedPartnerships";

import BottomBox from "./BottomBox";
import ClientCarousel from "./ClientCarousel";

const DiamondGridBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="diamond-grid"
            x="0"
            y="0"
            width="300"
            height="150"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="75" x2="150" y2="0" stroke="#ffffff" strokeWidth="0.5" opacity="0.1" />
            <line x1="150" y1="0" x2="300" y2="75" stroke="#ffffff" strokeWidth="0.5" opacity="0.1" />
            <line x1="300" y1="75" x2="150" y2="150" stroke="#ffffff" strokeWidth="0.5" opacity="0.1" />
            <line x1="150" y1="150" x2="0" y2="75" stroke="#ffffff" strokeWidth="0.5" opacity="0.1" />

            <circle cx="0" cy="75" r="2" fill="#ffffff" opacity="0.15" />
            <circle cx="150" cy="0" r="2" fill="#ffffff" opacity="0.15" />
            <circle cx="300" cy="75" r="2" fill="#ffffff" opacity="0.15" />
            <circle cx="150" cy="150" r="2" fill="#ffffff" opacity="0.15" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diamond-grid)" />
      </svg>
    </div>
  );
};

export default function Home() {
  const [heroText, setHeroText] = useState("Gattabara Games is a Software design and development company headquartered in Bangalore.");

  useEffect(() => {
    fetch('/data/content.json')
      .then(res => res.json())
      .then(data => {
        if (data?.home?.heroText) {
          setHeroText(data.home.heroText);
        }
      })
      .catch(error => console.error('Load error:', error));
  }, []);


  return (
    <div id="home-container" className="relative w-full min-h-screen">



      <DiamondGridBackground />

      <div className="relative z-10">
        <section className="h-screen w-full relative pointer-events-none">
          {/* DESKTOP LAYOUT */}
          <div className="hidden md:block absolute top-1/2 left-20 -translate-y-1/2 max-w-lg text-left z-20">
            <h1 className="text-xl font-medium leading-snug text-white tracking-wide">
              {heroText}
            </h1>
          </div>

          <div className="hidden md:block absolute bottom-20 left-20 w-[300px] h-[180px] z-20">
            <ClientCarousel />
          </div>

          {/* MOBILE LAYOUT */}
          <div className="md:hidden absolute bottom-24 left-0 w-full px-6 flex flex-row items-center justify-between gap-4 z-20">
            <div className="flex-1 text-left">
              <h1 className="text-xs font-medium leading-relaxed text-white tracking-wide">
                {heroText}
              </h1>
            </div>
            <div className="w-[140px] h-[90px] shrink-0">
              <ClientCarousel />
            </div>
          </div>
        </section>

        <div className="w-full">
          <ProjectStack />
          <div className="h-[10vh] md:h-[15vh]"></div>
          <CuratedPartnerships />

          <BottomBox isDark={true} />
        </div>
      </div>
    </div>
  );
}
