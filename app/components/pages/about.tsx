"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import BottomBox from "./BottomBox";

export default function About() {
  const [introText, setIntroText] = useState<string[]>([]);
  const [values, setValues] = useState<Array<{ title: string; description: string; image?: string }>>([]);

  useEffect(() => {
    fetch('/data/content.json')
      .then(res => res.json())
      .then(data => {
        if (data?.about) {
          if (data.about.introText) setIntroText(data.about.introText);
          if (data.about.values) setValues(data.about.values);
        }
      })
      .catch(error => console.error('About page load error:', error));
  }, []);

  return (
    <div className="relative w-full bg-black text-white min-h-screen pt-24 z-40 font-sans">



      <section className="w-full px-2 md:px-1 mt-32 mb-40">
        <div className="w-full flex flex-col gap-8 text-lg md:text-xl font-medium leading-relaxed text-gray-200 text-justify">
          {introText.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </section>

      <section className="w-full flex flex-col items-center gap-16 mb-16 py-12">
        {values.map((value, index) => (
          <div key={index} className="w-full flex flex-col items-center group">
            <div className="w-full px-6 md:px-16 text-center mb-4">
              <p className="text-xl md:text-3xl font-bold leading-tight text-white max-w-6xl mx-auto">
                {index + 1}. {value.title}{value.description ? `. ${value.description}` : ''}
              </p>
            </div>

            {value.image && (
              <div className="w-[90%] md:w-[80%] relative rounded-3xl overflow-hidden shadow-2xl bg-black">
                <Image
                  src={value.image}
                  alt={value.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
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
