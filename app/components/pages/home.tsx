"use client";

import React, { useState, useEffect } from "react";
import ProjectStack from "./ProjectStack";
import CuratedPartnerships from "./CuratedPartnerships";

import BottomBox from "./BottomBox";
import ClientCarousel from "./ClientCarousel";

const QuatrefoilGridBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="quatrefoil-grid"
            x="0"
            y="0"
            width="160"
            height="160"
            patternUnits="userSpaceOnUse"
          >
            {/* 4-pointed diamond star shape - centered and more visible */}
            <path
              d="M 40,2 C 35,15 25,25 10,30 C 25,35 35,45 40,58 C 45,45 55,35 70,30 C 55,25 45,15 40,2 Z"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.5"
              opacity="0.125"
              transform="translate(40, 50) scale(2.4)"
              style={{ transformOrigin: '40px 30px' }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#quatrefoil-grid)" />
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



      <QuatrefoilGridBackground />

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
