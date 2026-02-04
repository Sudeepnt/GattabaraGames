"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const clients = [
    {
        id: 1,
        name: "Sahi Jobs",
        color: "#d9d9d9ff",
        logo: "Sahi Jobs", // Placeholder for logo
        textColor: "#000000ff"
    },
    {
        id: 2,
        name: "Lokal Matrimony",
        color: "#D32F2F",
        logo: "Lokal",
        textColor: "#FFFFFF"
    },
    {
        id: 3,
        name: "GyanTV",
        color: "#4444FF",
        logo: "GyanTV",
        textColor: "#FFFFFF"
    },
    {
        id: 3,
        name: "GyanTV",
        color: "#4444FF",
        logo: "GyanTV",
        textColor: "#FFFFFF"
    },
    {
        id: 3,
        name: "GyanTV",
        color: "#4444FF",
        logo: "GyanTV",
        textColor: "#FFFFFF"
    }
];

export default function ClientCarousel() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % clients.length);
        }, 1000); // Change every 1 second
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full h-full relative overflow-hidden rounded-lg shadow-2xl">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={clients[index].id}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: clients[index].color }}
                >
                    <div className="text-center">
                        {/* In a real app, use Image component here for logos */}
                        <h3
                            className="text-2xl font-bold tracking-tighter"
                            style={{ color: clients[index].textColor }}
                        >
                            {clients[index].logo}
                        </h3>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
