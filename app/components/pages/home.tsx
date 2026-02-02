"use client";

import React, { useState, useEffect } from "react";
import ProjectStack from "./ProjectStack";
import CuratedPartnerships from "./CuratedPartnerships";
import Header from "../Header";
import BottomBox from "./BottomBox";

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
            <line x1="0" y1="75" x2="150" y2="0" stroke="#000000" strokeWidth="0.5" opacity="0.1" />
            <line x1="150" y1="0" x2="300" y2="75" stroke="#000000" strokeWidth="0.5" opacity="0.1" />
            <line x1="300" y1="75" x2="150" y2="150" stroke="#000000" strokeWidth="0.5" opacity="0.1" />
            <line x1="150" y1="150" x2="0" y2="75" stroke="#000000" strokeWidth="0.5" opacity="0.1" />

            <circle cx="0" cy="75" r="2" fill="#000000" opacity="0.15" />
            <circle cx="150" cy="0" r="2" fill="#000000" opacity="0.15" />
            <circle cx="300" cy="75" r="2" fill="#000000" opacity="0.15" />
            <circle cx="150" cy="150" r="2" fill="#000000" opacity="0.15" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diamond-grid)" />
      </svg>
    </div>
  );
};

export default function Home() {
  const [heroText, setHeroText] = useState("Crodal is a Software design and development company headquartered in Bangalore.");

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

      <Header />

      <DiamondGridBackground />

      <div className="relative z-10">
        <section className="h-screen w-full flex flex-col justify-end p-8 md:p-12 pointer-events-none">
          <div className="relative w-full flex justify-end items-end">
            <div className="max-w-xl md:max-w-md text-right">
              <h1 className="text-lg md:text-xl font-medium leading-relaxed text-gray-600 tracking-wide">
                {heroText}
              </h1>
            </div>
          </div>
        </section>

        <div className="w-full">
          <ProjectStack />
          <div className="h-[10vh] md:h-[15vh]"></div>
          <CuratedPartnerships />

          <BottomBox />
        </div>
      </div>
    </div>
  );
}
