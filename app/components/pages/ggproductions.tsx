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



export default function GGProductions() {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [activeSection, setActiveSection] = useState<number | null>(null);
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

                {/* Hero Content - Empty for visual effect */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-20 px-6">
                </div>


            </section>

            {/* Main Content */}
            <section className="relative w-full px-2 md:px-16 pt-10 pb-20 md:pt-16 md:pb-32">
                {/* Intro Text & CTA */}
                <div className="w-full mb-20 md:mb-32 flex flex-col">
                    <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 mb-12 w-full">
                        {/* Logo on the left */}
                        <img
                            src="/logos/Ggprod.png"
                            alt="GG Productions Logo"
                            className="h-20 md:h-32 w-auto object-contain flex-shrink-0"
                        />

                        {/* Entry text section (heading + paragraph) on the right */}
                        <div className="flex flex-col gap-6">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tighter">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">
                                    GG Productions
                                </span>
                            </h1>
                            <p className="text-base md:text-lg lg:text-xl font-medium leading-relaxed text-gray-200">
                                {introText}
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        <Link
                            href="/pitch-us"
                            className="tech-border-btn text-white pl-8 pr-6 py-4 font-bold text-sm md:text-base uppercase tracking-wider flex items-center gap-4 group hover:!bg-white hover:text-black transition-colors"
                            style={{ animation: "fadeInUp 1s ease-out 0.4s forwards" }}
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
                </div>

                {/* Infinite Scrolling Client Logos */}
                <div className="relative w-full overflow-hidden mb-24 md:mb-40 group">
                    {/* Masking gradients for smooth fade edges */}
                    <div className="absolute left-0 top-0 z-10 h-full w-16 md:w-32 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
                    <div className="absolute right-0 top-0 z-10 h-full w-16 md:w-32 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none" />

                    <div className="flex animate-scroll hover:pause-animation">
                        {Array(8).fill(clientLogos.length > 0 ? clientLogos : [
                            "/GGclients/Battle Bucks.png",
                            "/GGclients/brewed.png",
                            "/GGclients/magadha.png",
                            "/GGclients/msworld.png",
                            "/GGclients/oila.png",
                            "/GGclients/ss.png"
                        ]).flat().map((logo, index) => (
                            <div key={index} className="flex-shrink-0 flex items-center justify-center px-8 md:px-12">
                                <img
                                    src={logo}
                                    alt="Client Logo"
                                    className="h-[86px] md:h-[115px] w-auto object-contain opacity-70"
                                />
                            </div>
                        ))}
                    </div>
                </div>


                {/* Services Stack - Bold Redesign */}
                <div className="w-full mb-2">
                    {services.map((service, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div
                                key={service.title}
                                data-index={index}
                                className="service-section relative group border-b border-white/5 last:border-b-0"
                            >
                                <div className={`relative overflow-hidden bg-black transition-all duration-700 hover:bg-gradient-to-r ${isEven ? 'hover:from-white/[0.03] hover:to-transparent' : 'hover:from-transparent hover:to-white/[0.03]'}`}>
                                    {/* Diagonal accent line */}
                                    <div className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} w-1 h-0 bg-gradient-to-b from-white/40 via-white/20 to-transparent group-hover:h-full transition-all duration-1000 ease-out`} />

                                    <div className={`flex ${isEven ? 'flex-row' : 'flex-row-reverse'} items-center gap-6 md:gap-12 py-10 md:py-13 px-4 md:px-12`}>
                                        {/* Number Section */}
                                        <div className={`flex-shrink-0 w-32 md:w-48 ${isEven ? 'text-left' : 'text-right'}`}>
                                            <span className={`text-8xl md:text-9xl font-black leading-none block transition-all duration-500 ${isEven
                                                ? 'bg-clip-text text-transparent bg-gradient-to-br from-white/30 via-white/15 to-white/5 group-hover:from-white/50 group-hover:via-white/30'
                                                : 'bg-clip-text text-transparent bg-gradient-to-bl from-white/30 via-white/15 to-white/5 group-hover:from-white/50 group-hover:via-white/30'
                                                }`}>
                                                {(index + 1).toString().padStart(2, '0')}
                                            </span>
                                        </div>

                                        {/* Vertical divider */}
                                        <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

                                        {/* Content Section */}
                                        <div className="flex-1 min-w-0">
                                            {/* Title */}
                                            <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tighter text-white mb-4 md:mb-6 transition-all duration-300 group-hover:text-white/90 ${isEven ? 'text-left' : 'text-right md:text-left'}`}>
                                                {service.title}
                                            </h3>

                                            {/* Description */}
                                            <p className={`text-sm md:text-base leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300 ${isEven ? 'text-left' : 'text-right md:text-left'}`}>
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bottom glow effect on hover */}
                                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/20 transition-all duration-700" />
                                </div>
                            </div>
                        );
                    })}
                </div>


            </section >

            <section className="relative w-full px-2 md:px-1 py-8 pb-0 max-w-[1920px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-1 gap-y-1">
                    {projects.map((project, index) => (
                        <Link
                            key={index}
                            href={`/games/${project.sub.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block"
                        >
                            <div className="relative overflow-hidden bg-black flex flex-col cursor-pointer">
                                {/* Title Bar */}
                                <div className="relative h-auto pl-0 pt-[5px] pr-2 pb-3 flex items-start justify-start bg-black text-white">
                                    <h3 className="font-bold text-xs md:text-sm uppercase tracking-wide">{project.sub}</h3>
                                </div>

                                {/* Project Image */}
                                <div className="relative aspect-video overflow-hidden bg-black tech-border-btn">
                                    {project.image && (
                                        <img
                                            src={project.image}
                                            alt={project.sub}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    )}
                                </div>

                                {/* Description Below */}
                                {project.description && (
                                    <div className="relative py-6 px-1 bg-black text-white">
                                        <p className="text-sm leading-relaxed text-gray-200 font-medium tracking-wide">
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
            transform: translateX(-12.5%); /* Move by 1/8 since we octuplicated the list */
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
        </div >
    );
}
