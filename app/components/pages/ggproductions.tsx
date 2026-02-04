"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import BottomBox from "./BottomBox";

interface ServiceData {
    title: string;
    description: string;
}

// Service icons based on title
const getServiceIcon = (title: string) => {
    if (title.toLowerCase().includes("development")) {
        return (
            <svg
                className="w-12 h-12 md:w-16 md:h-16"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M8 16L32 4L56 16V48L32 60L8 48V16Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
                <path d="M32 28V60" stroke="currentColor" strokeWidth="2" />
                <path d="M8 16L32 28L56 16" stroke="currentColor" strokeWidth="2" />
                <circle cx="32" cy="28" r="4" fill="currentColor" />
                <path
                    d="M20 22L32 28L44 22"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        );
    } else if (title.toLowerCase().includes("art")) {
        return (
            <svg
                className="w-12 h-12 md:w-16 md:h-16"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="32"
                    cy="32"
                    r="24"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                <path
                    d="M32 8C32 8 20 20 20 32C20 44 32 56 32 56"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <path
                    d="M32 8C32 8 44 20 44 32C44 44 32 56 32 56"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <ellipse
                    cx="32"
                    cy="32"
                    rx="24"
                    ry="8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <circle cx="24" cy="24" r="3" fill="currentColor" />
                <circle cx="40" cy="40" r="3" fill="currentColor" />
                <circle cx="38" cy="22" r="2" fill="currentColor" />
            </svg>
        );
    } else {
        return (
            <svg
                className="w-12 h-12 md:w-16 md:h-16"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    x="8"
                    y="12"
                    width="48"
                    height="40"
                    rx="4"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                <path d="M8 24H56" stroke="currentColor" strokeWidth="2" />
                <path d="M24 24V52" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="16" cy="18" r="2" fill="currentColor" />
                <circle cx="24" cy="18" r="2" fill="currentColor" />
                <circle cx="32" cy="18" r="2" fill="currentColor" />
                <path
                    d="M32 36L40 32L48 38"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M32 44H48"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <rect x="12" y="30" width="8" height="6" rx="1" fill="currentColor" />
                <rect x="12" y="40" width="8" height="6" rx="1" fill="currentColor" />
            </svg>
        );
    }
};

export default function GGProductions() {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [activeSection, setActiveSection] = useState<number | null>(null);
    const [heroTagline, setHeroTagline] = useState("Build faster. Ship smarter. Stay lean.");
    const [ctaButtonText, setCtaButtonText] = useState("Start a Conversation");
    const [introText, setIntroText] = useState("");
    const [services, setServices] = useState<ServiceData[]>([]);
    const [closingCta, setClosingCta] = useState("Ready to build something exceptional?");
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        fetch('/data/content.json')
            .then(res => res.json())
            .then(data => {
                if (data?.ggProductions) {
                    if (data.ggProductions.heroTagline) setHeroTagline(data.ggProductions.heroTagline);
                    if (data.ggProductions.ctaButtonText) setCtaButtonText(data.ggProductions.ctaButtonText);
                    if (data.ggProductions.introText) setIntroText(data.ggProductions.introText);
                    if (data.ggProductions.services) setServices(data.ggProductions.services);
                    if (data.ggProductions.closingCta) setClosingCta(data.ggProductions.closingCta);
                }
            })
            .catch(error => console.error('GG Productions load error:', error));
    }, []);

    useEffect(() => {
        // Animate sections on scroll
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute("data-index") || "0");
                        setActiveSection(index);
                    }
                });
            },
            { threshold: 0.3 }
        );

        const sections = document.querySelectorAll(".service-section");
        sections.forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, [services]);

    return (
        <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden">
            {/* Hero Video Section */}
            <section className="relative w-full h-[45vh] md:h-[65vh] overflow-hidden">
                {/* Video Placeholder/Loading State with animated gradient */}
                <div
                    className={`absolute inset-0 transition-opacity duration-1000 ${isVideoLoaded ? "opacity-0" : "opacity-100"
                        }`}
                    style={{
                        background: "linear-gradient(135deg, #0a1a1f 0%, #13343e 50%, #0a1a1f 100%)",
                        backgroundSize: "400% 400%",
                        animation: "gradientShift 8s ease infinite"
                    }}
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-white/20 border-t-white/80 rounded-full animate-spin" />
                    </div>
                    {/* Subtle pattern overlay */}
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}
                    />
                </div>

                {/* Video Background */}
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    onLoadedData={() => setIsVideoLoaded(true)}
                    className="absolute inset-0 w-full h-full object-cover"
                    poster="/Portfolio_Images/placeholder.jpg"
                >
                    {/* Add your video source here */}
                    <source src="/videos/gg-productions-hero.mp4" type="video/mp4" />
                </video>

                {/* Video Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

                {/* Hero Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-20 px-6">
                    <h1
                        className="text-4xl md:text-7xl font-black tracking-tighter text-center mb-4 md:mb-6"
                        style={{ animation: "fadeInUp 1s ease-out forwards" }}
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">
                            GG Productions
                        </span>
                    </h1>
                    <p
                        className="text-sm md:text-lg text-gray-300 text-center max-w-2xl mb-6 md:mb-8 opacity-90"
                        style={{ animation: "fadeInUp 1s ease-out 0.2s forwards", opacity: 0 }}
                    >
                        {heroTagline}
                    </p>
                    <Link
                        href="/pitch-us"
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-sm md:text-base uppercase tracking-wider rounded-none overflow-hidden transition-all duration-500 hover:bg-transparent hover:text-white border-2 border-white"
                        style={{ animation: "fadeInUp 1s ease-out 0.4s forwards", opacity: 0 }}
                    >
                        <span className="relative z-10">{ctaButtonText}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#13343e] to-[#1a4a58] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </Link>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
                        <div className="w-1 h-2 bg-white/80 rounded-full animate-pulse" />
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="relative w-full px-6 md:px-16 py-20 md:py-32">
                {/* Intro Text */}
                <div className="max-w-5xl mx-auto mb-24 md:mb-40">
                    <p className="text-lg md:text-2xl lg:text-3xl font-medium leading-relaxed text-gray-200 text-center">
                        {introText}
                    </p>
                </div>

                {/* Services Stack */}
                <div className="max-w-5xl mx-auto flex flex-col gap-6">
                    {services.map((service, index) => (
                        <div
                            key={service.title}
                            data-index={index}
                            className="service-section group relative p-8 md:p-12 tech-border-btn bg-black/50 text-gray-300 transition-all duration-500 hover:bg-black/80"
                        >
                            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                                {/* Header: Icon & Title - Strictly Vertical Stack for uniformity */}
                                <div className="shrink-0 flex flex-col items-start gap-6 md:w-1/3">
                                    <div className="text-gray-400 group-hover:text-white transition-colors duration-500">
                                        {/* Wrapper to enforce exact icon size */}
                                        <div className="w-16 h-16 flex items-center justify-center">
                                            {getServiceIcon(service.title)}
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold uppercase tracking-wide text-gray-200 group-hover:text-white transition-colors duration-500">
                                        {service.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <div className="md:w-2/3 md:pt-2">
                                    <p className="text-lg leading-relaxed text-gray-400 group-hover:text-gray-200 transition-colors duration-500 text-justify">
                                        {service.description}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Accent Line */}
                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#13343e] to-[#2a6a7a] group-hover:w-full transition-all duration-700" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <BottomBox isDark={true} />

            {/* Custom Styles */}
            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
        </div>
    );
}
