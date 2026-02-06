"use client";

import React, { useState, useEffect } from "react";

export default function CuratedPartnerships() {
  const [description, setDescription] = useState("");
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("#");

  useEffect(() => {
    fetch('/data/content.json')
      .then(res => res.json())
      .then(data => {
        if (data?.home?.curatedPartnerships) {
          setDescription(data.home.curatedPartnerships.description);
          setLinkText(data.home.curatedPartnerships.linkText);
          setLinkUrl(data.home.curatedPartnerships.linkUrl);
        }
      })
      .catch(error => console.error('CuratedPartnerships load error:', error));
  }, []);

  const handleClick = () => {
    if (linkUrl && linkUrl !== "#") {
      window.open(linkUrl, '_blank');
    }
  };

  return (
    <section className="relative z-50 px-2 py-4 md:p-1 bg-transparent">

      <div
        className="
          relative w-full flex flex-col justify-center 
          tech-border-btn static-border
          text-white
          overflow-hidden
          py-2 md:py-4
        "
      >

        <div className="relative z-10 pl-[20px] pr-2 md:px-16 py-4 w-full">
          <h2 className="text-xl md:text-3xl font-bold leading-tight text-white tracking-tight">
            {description} {linkText}
          </h2>
        </div>

      </div>
    </section>
  );
}
