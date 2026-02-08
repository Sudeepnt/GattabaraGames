"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import BottomBox from "./BottomBox";
import QuatrefoilGridBackground from "../QuatrefoilGridBackground";

export default function About() {
  const [heroParagraph, setHeroParagraph] = useState<string>("");
  const [values, setValues] = useState<Array<{ title: string; description: string; image?: string }>>([]);

  useEffect(() => {
    fetch('/data/content.json')
      .then(res => res.json())
      .then(data => {
        if (data?.about) {
          if (data.about.heroParagraph) setHeroParagraph(data.about.heroParagraph);
          if (data.about.values) setValues(data.about.values);
        }
      })
      .catch(error => console.error('About page load error:', error));
  }, []);

  // Trigger reload for new About2.png image
  return (
    <div className="relative w-full bg-black text-white min-h-screen pt-24 z-40 font-sans">
      <QuatrefoilGridBackground />

      {/* Hero paragraph section - separate, no serial number */}
      {heroParagraph && (
        <section className="relative z-10 w-full flex justify-center mt-48 md:mt-32 mb-20 px-6 md:px-16">
          <p className="max-w-5xl text-2xl md:text-4xl font-medium leading-relaxed text-gray-200 text-justify">
            {heroParagraph}
          </p>
        </section>
      )}

      <section className="relative z-10 w-full flex flex-col items-center gap-20 mb-16 py-12">
        {values.map((value, index) => (
          <div key={index} className="w-full flex flex-col items-center group gap-8">
            {/* Title with bigger font, no serial number */}
            <div className="w-[90%] md:w-[80%] max-w-5xl">
              <p className="text-2xl md:text-4xl font-medium leading-relaxed text-gray-200 text-justify">
                {value.title}
              </p>
            </div>

            {value.image && (
              <div className="w-[90%] md:w-[80%] relative rounded-3xl overflow-hidden shadow-2xl bg-black aspect-video">
                <Image
                  src={`${value.image}?v=refresh`}
                  alt={value.title}
                  fill
                  sizes="100vw"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="w-full px-6 md:px-16 mb-24 text-center">
        <Link
          href="/contact-us"
          className="inline-block w-full max-w-7xl text-xl md:text-3xl font-light hover:underline decoration-white underline-offset-8 leading-tight text-gray-300 hover:text-white transition-colors duration-300"
        >
          If this aligns with what you're looking to build, start a conversation with us via our contact page →
        </Link>
      </section>

      <BottomBox isDark={true} />

    </div>
  );
}
