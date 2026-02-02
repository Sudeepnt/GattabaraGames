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
    <section className="relative z-50 p-4 md:p-1 bg-transparent">
      
      <div 
        onClick={handleClick}
        className="
          relative w-full h-[40vh] flex flex-col justify-end 
          border border-black rounded-md
          overflow-hidden group cursor-pointer 
          transition-colors duration-500
          hover:bg-gray-50
        "
      >
        
        <div className="relative z-10 p-6 md:p-10 w-full max-w-7xl">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold leading-tight text-black group-hover:text-gray-600 transition-colors duration-300">
            {description} {linkText}
          </h2>
        </div>

      </div>
    </section>
  );
}
