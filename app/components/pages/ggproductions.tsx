"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import BottomBox from "./BottomBox";

interface ServiceData {
    title: string;
    description: string;
}

interface ProjectData {
    sub: string;
    image?: string;
    description: string;
    developedBy?: string;
    followOn?: Array<{ label: string; url: string }>;
    wishlistOn?: Array<{ label: string; url: string }>;
    availableOn?: Array<{ label: string; url: string }>;
    screenshots?: string[];
    video?: string;
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
                    cy="6"
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
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const [clientLogos, setClientLogos] = useState<string[]>([]);
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
                    if (data.ggProductions.projects) setProjects(data.ggProductions.projects);
                    if (data.ggProductions.closingCta) setClosingCta(data.ggProductions.closingCta);
                    if (data.ggProductions.clientLogos) setClientLogos(data.ggProductions.clientLogos);
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
                        className="tech-border-btn text-white pl-8 pr-6 py-4 font-bold text-sm md:text-base uppercase tracking-wider flex items-center gap-4 group hover:!bg-white hover:text-black transition-colors"
                        style={{ animation: "fadeInUp 1s ease-out 0.4s forwards", opacity: 0 }}
                    >
                        <span className="relative z-10">{ctaButtonText}</span>
                        <svg
                            width="36"
                            height="12"
                            viewBox="0 0 36 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="relative z-10"
                        >
                            <path d="M30 1L35 6L30 11" />
                            <path d="M0 6H35" />
                        </svg>
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
                <div className="max-w-5xl mx-auto mb-20 md:mb-32">
                    <p className="text-lg md:text-2xl lg:text-3xl font-medium leading-relaxed text-gray-200 text-center">
                        {introText}
                    </p>
                </div>

                {/* Infinite Scrolling Client Logos */}
                <div className="w-full overflow-hidden mb-24 md:mb-40 group">
                    {/* Masking gradients for smooth fade edges */}
                    <div className="absolute left-0 top-0 z-10 h-full w-16 md:w-32 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
                    <div className="absolute right-0 top-0 z-10 h-full w-16 md:w-32 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none" />

                    <div className="flex animate-scroll hover:pause-animation">
                        {(clientLogos.length > 0 ? [...clientLogos, ...clientLogos, ...clientLogos] : [
                            "/GGclients/Battle Bucks.png",
                            "/GGclients/Brewed Games.png",
                            "/GGclients/Singular Scheme .png",
                            "/GGclients/magadha.png",
                            "/GGclients/maplestoryworld.png",
                            "/GGclients/oila games.png"
                        ]).map((logo, index) => (
                            <div key={index} className="flex-shrink-0 flex items-center justify-center px-8 md:px-12">
                                <img
                                    src={logo}
                                    alt="Client Logo"
                                    className="h-12 md:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 contrast-0 hover:contrast-100 brightness-150 hover:brightness-100 grayscale hover:grayscale-0"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Services Stack */}
                <div className="max-w-5xl mx-auto flex flex-col gap-6 mb-32">
                    {services.map((service, index) => (
                        <div
                            key={service.title}
                            data-index={index}
                            className="service-section relative p-8 md:p-12 tech-border-btn static-border bg-black/50 text-gray-300"
                        >
                            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                                {/* Header: Icon & Title - Strictly Vertical Stack for uniformity */}
                                <div className="shrink-0 flex flex-col items-start gap-6 md:w-1/3">
                                    <div className="text-gray-400">
                                        {/* Wrapper to enforce exact icon size */}
                                        <div className="w-16 h-16 flex items-center justify-center">
                                            {getServiceIcon(service.title)}
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold uppercase tracking-wide text-gray-200">
                                        {service.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <div className="md:w-2/3 md:pt-2">
                                    <p className="text-lg leading-relaxed text-gray-400 text-justify">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* How We Work Section */}
                <div className="max-w-6xl mx-auto py-10">
                    <div className="relative min-h-[600px] md:min-h-[800px] py-10 px-4">
                        {/* Process Steps */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-24 relative z-10">

                            {/* Step 1: Discovery */}
                            <div className="md:col-start-1 md:col-span-4 self-start">
                                <div className="border border-white/30 p-6 md:p-8 text-white tech-border-btn static-border !bg-transparent hover:border-white transition-colors duration-300">
                                    <span className="text-4xl font-black block mb-2 opacity-20 italic">01</span>
                                    <h3 className="text-2xl font-bold uppercase mb-4 tracking-tighter">Discovery</h3>
                                    <p className="text-sm font-medium leading-tight opacity-70">Audit of the current state of the project</p>
                                </div>
                            </div>

                            {/* Step 2: Proposal */}
                            <div className="md:col-start-3 md:col-span-4 md:-mt-12">
                                <div className="border border-white/30 p-6 md:p-8 text-white tech-border-btn static-border !bg-transparent hover:border-white transition-colors duration-300 md:ml-12">
                                    <span className="text-4xl font-black block mb-2 opacity-20 italic">02</span>
                                    <h3 className="text-2xl font-bold uppercase mb-4 tracking-tighter text-right">Proposal</h3>
                                    <p className="text-sm font-medium leading-tight text-right opacity-70">Bespoke proposal by headcount tailored to needs</p>
                                </div>
                            </div>

                            {/* Step 3: Iterate */}
                            <div className="md:col-start-5 md:col-span-6 relative">
                                <div id="step-iterate" className="border border-white/60 p-8 md:p-12 text-white tech-border-btn static-border !bg-transparent hover:border-white hover:scale-105 transition-all duration-500 z-20">
                                    <span className="text-5xl font-black block mb-2 opacity-20 italic">03</span>
                                    <h3 className="text-4xl font-black uppercase mb-4 tracking-tight">Iterate</h3>
                                    <p className="text-base font-bold uppercase opacity-80">Work on the project</p>
                                </div>
                            </div>

                            {/* Step 4: Review */}
                            <div className="md:col-start-8 md:col-span-4">
                                <div id="step-review" className="border border-white/30 p-6 md:p-8 text-white tech-border-btn static-border !bg-transparent hover:border-white transition-colors duration-300">
                                    <span className="text-4xl font-black block mb-2 opacity-20 italic">04</span>
                                    <h3 className="text-2xl font-bold uppercase mb-4 tracking-tighter text-right">Review</h3>
                                    <p className="text-sm font-medium leading-tight text-right opacity-70">Fortnightly reviews and iterations to improve</p>
                                </div>
                            </div>

                            {/* Step 5: Submit */}
                            <div className="md:col-start-10 md:col-span-3 self-end md:-mt-12">
                                <div className="border border-white/30 p-6 text-white tech-border-btn static-border !bg-transparent hover:border-white transition-colors duration-300">
                                    <span className="text-3xl font-black block mb-1 opacity-20 italic">05</span>
                                    <h3 className="text-xl font-bold uppercase mb-2 tracking-tighter">Submit</h3>
                                    <p className="text-xs font-bold opacity-70">Submit project!</p>
                                </div>
                            </div>
                        </div>

                        {/* Arrows Layer (Desktop) */}
                        <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
                            <svg className="w-full h-full text-white/20" viewBox="0 0 1000 800" fill="none">
                                {/* Connectivity Flow */}
                                <path d="M150 150 Q 200 250 300 180" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
                                <path d="M450 250 Q 550 400 650 350" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />

                                {/* Iteration Loop Arrow */}
                                <path
                                    d="M 680 430 C 900 480, 900 650, 650 680 C 200 750, 100 500, 380 450"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    markerEnd="url(#white-arrowhead)"
                                />
                                <defs>
                                    <marker id="white-arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                        <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                                    </marker>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative w-full px-4 md:px-1 py-20 pb-40 max-w-[1920px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-1 gap-y-8">
                    {projects.map((project, index) => (
                        <Link
                            key={index}
                            href={`/games/${project.sub.toLowerCase().replace(/\s+/g, '-')}`}
                            className="group block"
                        >
                            <div className="relative overflow-hidden bg-black flex flex-col cursor-pointer transition-opacity group-hover:opacity-90">
                                {/* Title Bar */}
                                <div className="relative h-14 pl-[20px] pt-[5px] pr-2 pb-2 flex items-start justify-start bg-black text-white">
                                    <h3 className="font-bold text-lg md:text-xl uppercase tracking-wide">{project.sub}</h3>
                                </div>

                                {/* Project Image */}
                                <div className="relative aspect-video overflow-hidden bg-black tech-border-btn">
                                    {project.image && (
                                        <img
                                            src={project.image}
                                            alt={project.sub}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    )}
                                </div>

                                {/* Description Below */}
                                {project.description && (
                                    <div className="relative p-6 bg-black text-white">
                                        <p className="text-sm leading-relaxed text-gray-300">
                                            {project.description}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </Link>
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
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%); /* Move by 1/3 since we triplicated the list */
          }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
        </div>
    );
}
