"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import { getCMSData } from "../actions/cmsActions";
import LiquidText from '../components/LiquidText';

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
                if (data?.home?.projectStack?.projects) {
                    setProjects(data.home.projectStack.projects);
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

            <main className="pt-32 pb-20 px-8 md:px-16 max-w-[1920px] mx-auto">
                {/* 2-column grid */}
                {/* 2-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            className="group relative aspect-video overflow-hidden tech-border-btn bg-black/40"
                        >
                            {project.image && (
                                <img
                                    src={project.image}
                                    alt={project.sub}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                            <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-xl font-bold uppercase tracking-wider mb-2 text-white">{project.sub}</h3>
                                {project.description && (
                                    <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                                        {project.description}
                                    </p>
                                )}
                            </div>

                            {/* Hover Border Accent */}
                            <div className="absolute inset-0 border border-transparent group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}
