"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import { getCMSData } from "../actions/cmsActions";
import LiquidText from '../components/LiquidText';
import BottomBox from '../components/pages/BottomBox';
import Link from 'next/link';

interface Project {
    sub: string;
    image: string;
    description?: string;
}

export default function GamesPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await getCMSData();
                if (data?.games) {
                    setProjects(data.games);
                }
            } catch (error) {
                console.error('Failed to load projects:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="relative w-full min-h-screen bg-black">
                <div className="fixed top-0 left-0 w-full z-50">
                    <Header />
                </div>
            </div>
        );
    }

    // Show "Coming Soon..." if no projects
    if (!projects || projects.length === 0) {
        return (
            <div className="relative w-full min-h-screen bg-black">
                <div className="fixed top-0 left-0 w-full z-50">
                    <Header />
                </div>
                <main>
                    <LiquidText text="Coming Soon..." />
                </main>
            </div>
        );
    }

    return (
        <div className="relative w-full min-h-screen bg-black">
            <div className="fixed top-0 left-0 w-full z-50">
                <Header />
            </div>

            <main className="pt-32 pb-40 px-2 md:px-1 max-w-[1920px] mx-auto">
                {/* 2-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-1 gap-y-8">
                    {projects.map((project, index) => (
                        <Link
                            key={index}
                            href={`/games/${project.sub.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2, duration: 0.8 }}
                                className="group relative overflow-hidden bg-black flex flex-col cursor-pointer hover:opacity-90 transition-opacity"
                            >
                                {/* Title Bar - Black header with game name */}
                                <div className="relative h-14 pl-[20px] pt-[5px] pr-2 pb-1 flex items-start justify-start bg-black text-white">
                                    <h3 className="font-bold text-lg md:text-xl uppercase tracking-wide">{project.sub}</h3>
                                </div>

                                {/* Game Image */}
                                <div className="relative aspect-video overflow-hidden bg-black tech-border-btn">
                                    {project.image && (
                                        <img
                                            src={project.image}
                                            alt={project.sub}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    )}
                                </div>

                                {/* Description - Below the image */}
                                {project.description && (
                                    <div className="relative py-6 px-1 bg-black text-white">
                                        <p className="text-sm leading-relaxed text-gray-200 font-medium tracking-wide">
                                            {project.description}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <BottomBox isDark={true} hideTypewriter={true} />
        </div>
    );
}
