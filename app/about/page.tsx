"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import BottomBox from "../components/pages/BottomBox";

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
        <div className="relative w-full bg-black text-white min-h-screen pt-24 z-40 font-sans selection:bg-white selection:text-black [&_*]:selection:bg-white [&_*]:selection:text-black">

            <Header />


            <section className="w-full px-6 md:px-16 mt-32 mb-40 flex justify-end">
                <div className="w-full md:w-1/2 flex flex-col gap-8 text-lg md:text-xl font-medium leading-relaxed text-gray-200 text-right">
                    {introText.map((text, index) => (
                        <p key={index}>{text}</p>
                    ))}
                </div>
            </section>

            <section className="w-full flex flex-col items-center gap-24 mb-32 py-12">
                {values.map((value, index) => (
                    <div key={index} className="w-full flex flex-col items-center group">
                        <div className="w-full px-6 md:px-16 text-center mb-10">
                            <p className="text-xl md:text-3xl font-bold leading-tight text-white max-w-6xl mx-auto">
                                {index + 1}. {value.title}. {value.description}
                            </p>
                        </div>

                        {value.image && (
                            <div className="w-[90%] md:w-[80%] h-[350px] md:h-[650px] relative rounded-3xl overflow-hidden shadow-2xl bg-black">
                                <Image
                                    src={value.image}
                                    alt={value.title}
                                    fill
                                    className="object-contain transition-transform duration-700 group-hover:scale-105"
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
