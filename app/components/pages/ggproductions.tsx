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

                {/* Hero Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 md:pb-20 px-6">
                    <h1
                        className="text-4xl md:text-7xl font-black tracking-tighter text-center"
                        style={{ animation: "fadeInUp 1s ease-out forwards" }}
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">
                            GG Productions
                        </span>
                    </h1>
                </div>


            </section>

            {/* Main Content */}
            <section className="relative w-full px-2 md:px-16 pt-10 pb-20 md:pt-16 md:pb-32">
                {/* Intro Text & CTA */}
                <div className="max-w-5xl mx-auto mb-20 md:mb-32 flex flex-col items-center">
                    <p className="text-lg md:text-2xl lg:text-3xl font-medium leading-relaxed text-gray-200 text-center mb-12">
                        {introText}
                    </p>
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

                {/* Infinite Scrolling Client Logos */}
                <div className="relative w-full overflow-hidden mb-24 md:mb-40 group">
                    {/* Masking gradients for smooth fade edges */}
                    <div className="absolute left-0 top-0 z-10 h-full w-16 md:w-32 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none" />
                    <div className="absolute right-0 top-0 z-10 h-full w-16 md:w-32 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none" />

                    <div className="flex animate-scroll hover:pause-animation">
                        {Array(8).fill(clientLogos.length > 0 ? clientLogos : [
                            "/GGclients/Battle Bucks.png",
                            "/GGclients/Brewed Games.png",
                            "/GGclients/Singular Scheme .png",
                            "/GGclients/magadha.png",
                            "/GGclients/maplestoryworld.png",
                            "/GGclients/oila games.png"
                        ]).flat().map((logo, index) => (
                            <div key={index} className="flex-shrink-0 flex items-center justify-center px-8 md:px-12">
                                <img
                                    src={logo}
                                    alt="Client Logo"
                                    className="h-[72px] md:h-24 w-auto object-contain opacity-70 contrast-0 brightness-150 grayscale"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Services Stack */}
                <div className="w-full flex flex-col gap-6 mb-32">
                    {services.map((service, index) => (
                        <div
                            key={service.title}
                            data-index={index}
                            className="service-section relative py-12 px-6 md:px-12 tech-border-btn static-border bg-black/50 text-gray-300 group hover:bg-black/80 transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                                {/* Service Number & Title */}
                                <div className="shrink-0 flex flex-col items-start gap-2 md:w-1/3">
                                    <span className="text-5xl md:text-6xl font-black italic text-white/10 select-none">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white group-hover:text-gray-100 transition-colors">
                                        {service.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <div className="md:w-2/3 md:pt-4 border-l-0 md:border-l border-white/10 md:pl-12">
                                    <p className="text-lg md:text-xl leading-relaxed text-gray-400 font-medium">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </section>

            <section className="relative w-full px-2 md:px-1 py-20 pb-0 max-w-[1920px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-1 gap-y-8">
                    {projects.map((project, index) => (
                        <Link
                            key={index}
                            href={`/games/${project.sub.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block"
                        >
                            <div className="relative overflow-hidden bg-black flex flex-col cursor-pointer">
                                {/* Title Bar */}
                                <div className="relative h-14 pl-[20px] pt-[5px] pr-2 pb-1 flex items-start justify-start bg-black text-white">
                                    <h3 className="font-bold text-lg md:text-xl uppercase tracking-wide">{project.sub}</h3>
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
        </div>
    );
}
