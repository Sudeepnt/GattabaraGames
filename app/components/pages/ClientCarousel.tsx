"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface GameProject {
    sub: string;
    image?: string;
    description?: string;
}

export default function ClientCarousel() {
    const [index, setIndex] = useState(0);
    const [games, setGames] = useState<GameProject[]>([]);

    useEffect(() => {
        // Fetch game projects from content.json
        fetch('/data/content.json')
            .then(res => res.json())
            .then(data => {
                if (data?.games && Array.isArray(data.games)) {
                    setGames(data.games);
                }
            })
            .catch(error => console.error('Failed to load games:', error));
    }, []);

    useEffect(() => {
        if (games.length === 0) return;

        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % games.length);
        }, 2000); // Change every 2 seconds
        return () => clearInterval(timer);
    }, [games.length]);

    if (games.length === 0) {
        return (
            <div className="w-full h-full relative overflow-hidden rounded-lg shadow-2xl bg-black flex items-center justify-center">
                <p className="text-white text-sm">Loading...</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative overflow-hidden text-white pixelated-shape">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-0 bg-black"
                >
                    <div
                        className="flex flex-col items-center justify-center w-full h-full relative"
                    >
                        {/* Game Image */}
                        {games[index].image && (
                            <div className="absolute inset-0">
                                <img
                                    src={games[index].image}
                                    alt={games[index].sub}
                                    className="w-full h-full object-cover opacity-80"
                                />
                                {/* Dark overlay for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                            </div>
                        )}

                        {/* Game Name */}
                        <div className="relative z-10 text-center px-4">
                            <h3 className="text-sm md:text-base font-bold tracking-wide text-white uppercase">
                                {games[index].sub}
                            </h3>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
