"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PortfolioPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Define the categories with specific colors
    const categories = [
        {
            title: "Restaurant/Resorts",
            images: [
                "/Portfolio_Images/Restaurant/Restaurant1.png",
                "/Portfolio_Images/Restaurant/Restaurant2.png",
                "/Portfolio_Images/Restaurant/Restaurant3.png",
                "/Portfolio_Images/Restaurant/Restaurent4.png"
            ],
            // Red gradient
            gradient: "from-red-900/90 via-red-900/20"
        },
        {
            title: "Hospitality",
            images: [
                "/Portfolio_Images/Hospitality/Hosp1.png",
                "/Portfolio_Images/Hospitality/Hosp2.png",
                "/Portfolio_Images/Hospitality/Hosp3.png",
                "/Portfolio_Images/Hospitality/Hosp4.png"
            ],
            // Amber/Orange gradient
            gradient: "from-amber-900/90 via-amber-900/20"
        },
        {
            title: "Real Estate & Property",
            images: [
                "/Portfolio_Images/RealEstate/Real1.png",
                "/Portfolio_Images/RealEstate/real2.png",
                "/Portfolio_Images/RealEstate/Real3.png",
                "/Portfolio_Images/RealEstate/real4.png"
            ],
            // Blue gradient
            gradient: "from-blue-900/90 via-blue-900/20"
        },
        {
            title: "Healthcare",
            // Placeholder until images are provided
            images: ["/About1.png", "/About2.png", "/About3.png", "/About1.png"],
            // Emerald/Green gradient
            gradient: "from-emerald-900/90 via-emerald-900/20"
        },
        {
            title: "Education & Training",
            // Placeholder until images are provided
            images: ["/About2.png", "/About3.png", "/About1.png", "/About2.png"],
            // Purple gradient
            gradient: "from-purple-900/90 via-purple-900/20"
        },
    ];

    const handleCategoryClick = (categoryTitle: string) => {
        setSelectedCategory(categoryTitle);
        // Scroll to top when opening detailed view
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="relative w-full min-h-screen bg-black text-white font-sans pt-12 pb-32">

            {/* Header section - Centered */}
            <div className={`w-full px-6 md:px-12 ${selectedCategory ? 'pb-8' : 'mb-8'} max-w-5xl mx-auto flex flex-col items-center text-center`}>
                <Link href="/" className="inline-block mb-6">
                    <Image
                        src="/logos/GGlogo.png"
                        alt="Gattabara Games Logo"
                        width={80}
                        height={32}
                        className="object-contain invert opacity-90"
                    />
                </Link>

                <div className="relative w-full flex items-center justify-center">
                    {selectedCategory && (
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors group absolute left-0"
                        >
                            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                    )}
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter margin-0">
                        {selectedCategory ? selectedCategory : "Our Portfolio"}
                    </h1>
                </div>

                {!selectedCategory && (
                    <p className="text-lg text-gray-400 max-w-2xl leading-relaxed mt-4">
                        A featured collection of software products to choose from for you design.
                    </p>
                )}
            </div>

            {/* Main Content Area */}
            <div className="w-full px-6 md:px-12 max-w-5xl mx-auto">

                {!selectedCategory ? (
                    /* Category Grid View - 2 Columns Centered */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-12 place-items-center">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                onClick={() => handleCategoryClick(category.title)}
                                className="group relative w-full aspect-[16/9] bg-black rounded-lg overflow-hidden cursor-pointer"
                            >
                                {/* 2x2 Image Grid with Padding */}
                                <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-6 p-10">
                                    {category.images.map((imgSrc, imgIndex) => (
                                        <div key={imgIndex} className="relative w-full h-full bg-gray-900 overflow-hidden rounded-sm shadow-inner">
                                            <Image
                                                src={imgSrc}
                                                alt={`${category.title} image ${imgIndex + 1}`}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Dynamic Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none`}></div>

                                {/* Category Title */}
                                <div className="absolute bottom-0 left-0 w-full p-4 text-center z-10">
                                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide drop-shadow-lg">
                                        {category.title}
                                    </h3>
                                </div>
                            </div>
                        ))}

                        {/* "more.." Card */}
                        <div className="group relative w-full aspect-[16/9] bg-black rounded-lg overflow-hidden cursor-pointer flex items-center justify-center border border-white/10 hover:border-white/20 transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 via-transparent to-transparent opacity-50"></div>
                            <h3 className="relative z-10 text-xl md:text-lg font-bold text-white tracking-wide">
                                more coming soon..
                            </h3>
                        </div>
                    </div>
                ) : (
                    /* Selected Detail View - Stacked Full Width with Extra Padding */
                    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 pt-20">
                        {(() => {
                            const currentCategoryData = categories.find(c => c.title === selectedCategory);
                            const currentImages = currentCategoryData ? currentCategoryData.images : [];

                            return (
                                <div className="flex flex-col gap-24">
                                    {currentImages.slice(0, 4).map((imgSrc, i) => (
                                        <div key={i} className="flex flex-col">
                                            {/* Text and Button Above Image */}
                                            <div className="mb-6 px-2 flex flex-col items-start gap-4">
                                                <div>
                                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                                        Project Showcase {i + 1}
                                                    </h3>
                                                    <p className="text-gray-400 text-lg max-w-2xl">
                                                        A stunning example of modern design principles applied to {selectedCategory}. <br />
                                                        High conversion layout with immersive visuals.
                                                    </p>
                                                </div>
                                                <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                                                    Visit
                                                </button>
                                            </div>

                                            {/* Full Width Image */}
                                            <div className="relative w-full aspect-[16/9] bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-white/10">
                                                <Image
                                                    src={imgSrc}
                                                    alt={`${selectedCategory} Design ${i + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        })()}
                    </div>
                )}
            </div>

            {/* Bottom Share Button */}
            <div className="fixed bottom-8 left-0 w-full flex justify-center z-50 px-6 pointer-events-none">
                <button className="bg-[#E0E0E0] text-black font-bold text-xl px-12 py-4 rounded-full shadow-2xl hover:bg-white hover:scale-105 transition-all duration-300 pointer-events-auto w-full max-w-sm">
                    Share
                </button>
            </div>

        </div>
    );
}
