"use client";

import { useState } from "react";
import Header from "./components/Header";
import Scene from "./components/scene";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import Pitch from "./components/pages/pitch";

export default function Page() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="relative w-full min-h-screen bg-black text-white font-sans overflow-x-hidden">

      {/* 1. Header (Menu) - Z-999, Above Everything */}
      <Header />

      {/* 2. Scene (Logo) - Z-0, Pointer-events-none (Interaction Zone is Z-60) */}
      <Scene activePage={activePage} />

      {/* 3. Main Content - Z-10, Pointer-events-auto (Content sits on top of Scene) */}
      <main className="relative z-10 w-full transition-opacity duration-500 pointer-events-auto">
        {activePage === "home" && <Home />}
        {activePage === "about" && <About />}
        {activePage === "pitch" && <Pitch />}
      </main>

    </div>
  );
}