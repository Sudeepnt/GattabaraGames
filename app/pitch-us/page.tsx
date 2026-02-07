"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

export default function Pitch() {
    const router = useRouter();
    return (
        <div className="relative w-full h-screen bg-black text-white overflow-hidden flex flex-col font-sans">
            <div className="fixed top-0 left-0 w-full z-50">
                <Header />
            </div>

            <main className="flex-1 flex flex-col justify-center px-6 md:px-20 w-full pt-52 md:pt-32">
                <div className="w-full max-w-5xl mx-auto flex flex-col">
                    <h1 className="text-3xl md:text-6xl font-bold mb-12 text-white text-center uppercase tracking-wider">
                        Inbound Form
                    </h1>

                    <div className="flex flex-col gap-8 md:gap-10 text-base md:text-lg text-gray-300 leading-relaxed font-light tracking-wide">
                        <p className="border-l-4 border-white/20 pl-6">
                            Pitch with clarity and conviction. We want to see what you are building, why it matters, and how you plan to ship it end to end.
                        </p>
                        <p className="border-l-4 border-white/20 pl-6">
                            Keep your deck focused and easy to scan. Deep dives on systems or mechanics can live in a separate GDD or design doc.
                        </p>
                        <p className="border-l-4 border-white/20 pl-6">
                            Show us something real. A playable build beats a video. A video beats concept art. We generally do not review pitches without a build or proof of concept.
                        </p>
                        <p className="border-l-4 border-white/20 pl-6">
                            GG collaborates on PC, Console, and mobile titles. AR/VR and mobile-first projects are welcome.
                        </p>
                    </div>

                    <div className="mt-12 md:mt-20 w-full flex justify-center">
                        <button
                            onClick={() => router.push("/contact-us")}
                            className="relative min-w-[200px] h-[34px] md:h-14 flex items-center justify-center tech-border-btn text-white font-bold text-sm md:text-base tracking-wide hover:bg-white hover:text-black transition-colors duration-300 px-6"
                        >
                            Click Here to Start
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
