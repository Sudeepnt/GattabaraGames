"use client";

import React, { useState, useEffect } from "react";
import ProjectStack from "./ProjectStack";
import CuratedPartnerships from "./CuratedPartnerships";
import QuatrefoilGridBackground from "../QuatrefoilGridBackground";

import BottomBox from "./BottomBox";
import ClientCarousel from "./ClientCarousel";

export default function Home() {
  const [heroText, setHeroText] = useState("");

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
    <div id="home-container" className="relative w-full min-h-screen bg-transparent">



      <QuatrefoilGridBackground />

      <div className="relative z-10">
        <section className="h-screen w-full relative pointer-events-none">
          {/* DESKTOP LAYOUT */}
          <div className="hidden md:block absolute top-1/2 left-20 -translate-y-1/2 max-w-lg text-left z-20 pointer-events-auto">
            <h1 className="text-xl font-medium leading-snug text-white tracking-wide">
              {heroText}
            </h1>
          </div>

          <div className="hidden md:block absolute bottom-20 left-20 w-[300px] h-[180px] z-20 pointer-events-auto">
            <ClientCarousel />
          </div>

          {/* MOBILE LAYOUT */}
          <div className="md:hidden absolute bottom-24 left-0 w-full px-6 flex flex-row items-center justify-between gap-4 z-20 pointer-events-auto">
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
