"use client";

import { useState } from "react";
import Scene from "../components/scene";
import Home from "../components/pages/home";
import About from "../components/pages/about";
import Pitch from "../components/pages/pitch";

export default function StarPage2() {
    const [activePage, setActivePage] = useState("home");

    return (
        <div className="relative w-full min-h-screen bg-white text-black font-sans selection:bg-[#3035e6] selection:text-white overflow-x-hidden">

            {/* 3D Scene with STAR 2 logo */}
            <Scene activePage={activePage} logoType="star2" />

            {/* Main Page Content - Reusing Home structure */}
            <main className="relative z-10 w-full transition-opacity duration-500 pointer-events-auto">
                {activePage === "home" && <Home />}
                {activePage === "about" && <About />}
                {activePage === "pitch" && <Pitch />}
            </main>

        </div>
    );
}
