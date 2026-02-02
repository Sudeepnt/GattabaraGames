"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import BottomBox from "../components/pages/BottomBox";

export default function PitchPage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const [title, setTitle] = useState("Inbound Form.");
    const [introText, setIntroText] = useState("");
    const [tips, setTips] = useState<string[]>([]);
    const [noteText, setNoteText] = useState("");
    const [buttonText, setButtonText] = useState("Start Application");

    useEffect(() => {
        fetch('/data/content.json')
            .then(res => res.json())
            .then(data => {
                if (data?.pitch) {
                    if (data.pitch.title) setTitle(data.pitch.title);
                    if (data.pitch.introText) setIntroText(data.pitch.introText);
                    if (data.pitch.tips) setTips(data.pitch.tips);
                    if (data.pitch.noteText) setNoteText(data.pitch.noteText);
                    if (data.pitch.buttonText) setButtonText(data.pitch.buttonText);
                }
            })
            .catch(error => console.error('Pitch page load error:', error));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Pitch submitted! (This is a demo action)");
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    return (
        <div className="relative w-full min-h-screen bg-[#FFFFFF] text-[#1a1a1a] font-sans pt-24 z-10 selection:bg-black selection:text-white overflow-x-hidden">

            <Header />

            <div className="w-full px-6 md:px-16 flex flex-col items-center">

                <div className="mb-12 flex justify-start w-full">
                    <Link href="/">
                        <Image
                            src="/crodallogoabout.png"
                            alt="Crodal Logo"
                            width={120}
                            height={48}
                            className="object-contain"
                        />
                    </Link>
                </div>

                <div className="w-full max-w-2xl flex flex-col items-start pb-24">

                    <h1 className="text-4xl md:text-6xl font-bold text-black mb-12 tracking-tighter leading-none">
                        {title}
                    </h1>

                    <div className="space-y-8 text-lg md:text-[1.15rem] leading-[1.6] font-medium text-[#222]">
                        <p>{introText}</p>

                        <ul className="space-y-5">
                            {tips.map((tip, index) => (
                                <li key={index} className="flex gap-4 items-start group">
                                    <span className="mt-[0.6em] w-2 h-2 rounded-full bg-black group-hover:scale-150 transition-transform duration-300 flex-shrink-0"></span>
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>

                        <p className="italic font-bold text-black opacity-80 border-l-4 border-black pl-6 py-2 bg-black/5 rounded-r-lg">
                            {noteText}
                        </p>
                    </div>

                    <div className="mt-16 w-full">
                        <button
                            onClick={() => setIsFormOpen(!isFormOpen)}
                            className={`w-full bg-black hover:bg-[#222] text-white text-left pl-8 py-6 rounded-2xl font-bold text-xl transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-1 group flex justify-between items-center pr-8 ${isFormOpen ? 'mb-8' : ''}`}
                        >
                            <span className="tracking-wide">{isFormOpen ? "Close Application" : buttonText}</span>
                            <div className={`w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-500 ${isFormOpen ? 'rotate-180' : 'group-hover:rotate-90'}`}>
                                &darr;
                            </div>
                        </button>
                    </div>

                    {isFormOpen && (
                        <div className="w-full animate-in slide-in-from-bottom-4 fade-in duration-700 ease-out">
                            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 border border-[#e5e5e5] shadow-2xl rounded-3xl flex flex-col gap-8 relative overflow-hidden">

                                <div className="absolute top-0 right-0 w-64 h-64 bg-gray-100 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 opacity-50"></div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-3 group">
                                        <label className="font-bold text-xs uppercase tracking-widest text-[#888] group-hover:text-black transition-colors ml-1">Contact Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="JOHN DOE"
                                            className="w-full bg-transparent border border-[#ccc] focus:border-black rounded-xl p-4 outline-none transition-all duration-300 placeholder:text-gray-300 font-bold text-black hover:border-gray-400 focus:shadow-lg"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-3 group">
                                        <label className="font-bold text-xs uppercase tracking-widest text-[#888] group-hover:text-black transition-colors ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="JOHN@STUDIO.COM"
                                            className="w-full bg-transparent border border-[#ccc] focus:border-black rounded-xl p-4 outline-none transition-all duration-300 placeholder:text-gray-300 font-bold text-black hover:border-gray-400 focus:shadow-lg"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 group">
                                    <label className="font-bold text-xs uppercase tracking-widest text-[#888] group-hover:text-black transition-colors ml-1">Phone Number (Optional)</label>
                                    <input
                                        type="tel"
                                        placeholder="+1 234 567 8900"
                                        className="w-full bg-transparent border border-[#ccc] focus:border-black rounded-xl p-4 outline-none transition-all duration-300 placeholder:text-gray-300 font-bold text-black hover:border-gray-400 focus:shadow-lg"
                                    />
                                </div>

                                <div className="flex flex-col gap-3 group">
                                    <label className="font-bold text-xs uppercase tracking-widest text-[#888] group-hover:text-black transition-colors ml-1">The Project</label>
                                    <textarea
                                        rows={5}
                                        required
                                        placeholder="TELL US WHAT YOU ARE BUILDING..."
                                        className="w-full bg-transparent border border-[#ccc] focus:border-black rounded-xl p-4 outline-none transition-all duration-300 placeholder:text-gray-300 font-medium text-black resize-none hover:border-gray-400 focus:shadow-lg"
                                    ></textarea>
                                </div>

                                <div className="flex flex-col gap-3 mt-6">
                                    <button
                                        type="submit"
                                        className="w-full bg-black text-white font-black text-md py-5 rounded-xl hover:bg-[#222] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 uppercase tracking-widest shadow-xl"
                                    >
                                        Submit Pitch
                                    </button>
                                    <Link href="/portfolio" className="w-full">
                                        <button
                                            type="button"
                                            className="w-full bg-transparent border-2 border-black text-black font-bold text-md py-4 rounded-xl hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-widest"
                                        >
                                            View Our Portfolio
                                        </button>
                                    </Link>
                                </div>

                            </form>
                        </div>
                    )}

                </div>
            </div>

            <div className="w-full">
                <BottomBox isDark={false} />
            </div>

        </div>
    );
}
