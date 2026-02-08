"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

export default function Pitch() {
    const router = useRouter();
    return (
        <div
            className="relative w-full h-screen bg-white text-black overflow-hidden flex flex-col font-sans"
            style={{ "--selection-bg": "#000000", "--selection-text": "#ffffff" } as React.CSSProperties}
        >
            <div className="fixed top-0 left-0 w-full z-50">
                <Header />
            </div>

            <main className="flex-1 flex flex-col justify-center items-center px-2 md:px-8 w-full pt-16 md:pt-32">
                <div className="w-full max-w-7xl flex flex-col">
                    <h1 className="text-xl md:text-4xl font-bold mb-6 md:mb-12 text-black text-center uppercase tracking-wider">
                        Inbound Form
                    </h1>

                    <div className="flex flex-col gap-4 md:gap-10 text-base md:text-lg text-gray-800 leading-relaxed font-normal tracking-wide w-full">
                        <p className="md:border-l-4 md:border-black/20 md:pl-6 border-0 pl-0 text-left md:text-center w-full">
                            Pitch with clarity and conviction. We want to see what you are building, why it matters, and how you plan to ship it end to end.
                        </p>
                        <p className="md:border-l-4 md:border-black/20 md:pl-6 border-0 pl-0 text-left md:text-center w-full">
                            Keep your deck focused and easy to scan. Deep dives on systems or mechanics can live in a separate GDD or design doc.
                        </p>
                        <p className="md:border-l-4 md:border-black/20 md:pl-6 border-0 pl-0 text-left md:text-center w-full">
                            Show us something real. A playable build beats a video. A video beats concept art. We generally do not review pitches without a build or proof of concept.
                        </p>
                        <p className="md:border-l-4 md:border-black/20 md:pl-6 border-0 pl-0 text-left md:text-center w-full">
                            GG collaborates on PC, Console, and mobile titles. AR/VR and mobile-first projects are welcome.
                        </p>
                    </div>

                    <div className="mt-6 md:mt-20 w-full flex justify-center">
                        <button
                            onClick={() => router.push("/pitch-us/form")}
                            className="relative min-w-full md:min-w-[400px] h-[42px] md:h-14 flex items-center justify-center tech-border-btn text-black font-bold text-sm md:text-base tracking-wide hover:bg-black hover:text-white transition-colors duration-300 px-6"
                        >
                            Click Here to Start
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
