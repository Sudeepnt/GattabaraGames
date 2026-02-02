"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";

interface Project {
    sub: string;
    image?: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch('/data/content.json')
            .then(res => res.json())
            .then(data => {
                // Fetching from home page project stack as requested
                if (data?.home?.projectStack?.projects) {
                    setProjects(data.home.projectStack.projects);
                }
            })
            .catch(error => console.error('Projects page load error:', error));
    }, []);

    return (
        <div className="relative w-full min-h-screen bg-black text-white font-sans pt-24 pb-16 selection:bg-white selection:text-black">

            <Header />

            {/* Header */}
            <div className="w-full px-6 md:px-16 mb-16">
                <Link href="/" className="inline-block mb-8">
                    <Image
                        src="/crodallogoabout.png"
                        alt="Crodal Logo"
                        width={120}
                        height={48}
                        className="object-contain invert"
                    />
                </Link>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                    Our Projects
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed">
                    A showcase of distinctive software products we've designed and built.
                </p>
            </div>

            {/* Projects List - One per row, full width */}
            <div className="w-full px-6 md:px-16 flex flex-col gap-8">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="group relative w-full h-[60vh] md:h-[70vh] bg-[#111] border border-[#333] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-white/5 transition-all duration-500 cursor-pointer"
                    >
                        {/* Project Image */}
                        {project.image && (
                            <div className="absolute inset-0">
                                <Image
                                    src={project.image}
                                    alt={project.sub}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-75"
                                />
                            </div>
                        )}

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                        {/* Project Info */}
                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                            <h3 className="text-3xl md:text-5xl font-bold mb-4 group-hover:text-white transition-colors uppercase tracking-widest">
                                {project.sub}
                            </h3>
                            <button className="mt-4 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 duration-500">
                                View Project
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Back to Home */}
            <div className="w-full px-6 md:px-16 mt-16 text-center">
                <Link
                    href="/"
                    className="inline-block text-lg font-bold underline underline-offset-4 hover:text-gray-300 transition-colors"
                >
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
