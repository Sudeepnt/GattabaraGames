"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import BottomBox from "../components/pages/BottomBox";
import QuatrefoilGridBackground from "../components/QuatrefoilGridBackground";

export default function AboutPage() {
    const [introText, setIntroText] = useState<string[]>([]);
    const [values, setValues] = useState<Array<{ title: string; description: string; image?: string }>>([]);
    const [careersLink, setCareersLink] = useState("");

    useEffect(() => {
        fetch('/data/content.json')
            .then(res => res.json())
            .then(data => {
                if (data?.about) {
                    if (data.about.introText) setIntroText(data.about.introText);
                    if (data.about.values) setValues(data.about.values);
                    if (data.about.careersLink) setCareersLink(data.about.careersLink);
                }
            })
            .catch(error => console.error('About page load error:', error));
    }, []);

    return (
        <div className="relative w-full bg-black text-white min-h-screen pt-24 z-40 font-sans">
            <QuatrefoilGridBackground />
            <Header />
            {/* Hero paragraph - hardcoded, no serial number */}
            <section className="relative z-10 w-full px-6 md:px-16 mt-24 md:mt-8 mb-24">
                <p className="max-w-6xl mx-auto text-2xl md:text-4xl font-medium leading-snug text-gray-200 text-justify">
                    At Gattabara Games, we've been driven by the pure joy of creation from day one. We obsess over craft because it's the difference between games people play and games people remember. We listen to what players feel, prototype what resonates, and refine ruthlessly until it's right—a culture built on honest feedback and relentless iteration. We don't separate the dreamers from the builders because the best games come from people who own what they create. Every decision serves the experience. Every frame earns its place. We make games that matter.
                </p>
            </section>

            <section className="relative z-10 w-full flex flex-col items-center gap-16 mb-16 py-12">
                {values.map((value, index) => (
                    <div key={index} className={`w-full flex flex-col items-center group ${index === 0 ? "mb-[-100px]" : ""}`}>
                        <div className="w-full px-6 md:px-16 text-center mb-4">
                            <p className="text-xl md:text-3xl font-bold leading-tight text-white max-w-6xl mx-auto">
                                {index + 1}. {value.title}{value.description ? `. ${value.description}` : ''}
                            </p>
                        </div>

                        {value.image && (
                            <div className={`${index === 1 ? "w-[45%] md:w-[40%]" : "w-[90%] md:w-[80%]"} relative rounded-3xl overflow-hidden ${index === 0 ? "h-[200px] md:h-[350px]" : ""}`}>
                                <Image
                                    src={value.image}
                                    alt={value.title}
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    className={`w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105 ${index === 0 ? "!h-full !object-cover" : ""}`}
                                    priority
                                />
                            </div>
                        )}
                    </div>
                ))}
            </section>

            <section className="w-full px-6 md:px-16 mb-24 text-center">
                <a
                    href="/pitch-us"
                    className="inline-block w-full max-w-7xl text-2xl md:text-4xl font-bold underline hover:underline decoration-white underline-offset-8 leading-tight text-white"
                >
                    {careersLink}
                </a>
            </section>

            <BottomBox isDark={true} />

        </div>
    );
}
