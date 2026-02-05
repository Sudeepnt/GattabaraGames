"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import Link from "next/link";

interface GameData {
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

export default function GameDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [game, setGame] = useState<GameData | null>(null);
    const [allGames, setAllGames] = useState<GameData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGame() {
            try {
                const response = await fetch('/data/content.json');
                const data = await response.json();

                let allAvailableItems: GameData[] = [];

                if (data?.games && Array.isArray(data.games)) {
                    allAvailableItems = [...data.games];
                }

                if (data?.ggProductions?.projects && Array.isArray(data.ggProductions.projects)) {
                    allAvailableItems = [...allAvailableItems, ...data.ggProductions.projects];
                }

                setAllGames(allAvailableItems);

                // Find the item by converting title to slug format
                const foundItem = allAvailableItems.find((g: GameData) =>
                    g.sub.toLowerCase().replace(/\s+/g, '-') === slug
                );

                if (foundItem) {
                    setGame(foundItem);
                }
            } catch (error) {
                console.error('Failed to load project details:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchGame();
    }, [slug]);

    if (loading) {
        return (
            <div className="relative w-full min-h-screen bg-black">
                <div className="fixed top-0 left-0 w-full z-50">
                    <Header />
                </div>
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-white">Loading...</p>
                </div>
            </div>
        );
    }

    if (!game) {
        return (
            <div className="relative w-full min-h-screen bg-black">
                <div className="fixed top-0 left-0 w-full z-50">
                    <Header />
                </div>
                <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                    <p className="text-white text-xl">Game not found</p>
                    <Link href="/games" className="text-white underline">Back to Games</Link>
                </div>
            </div>
        );
    }

    // Filter out current game from "Other Games"
    const otherGames = allGames.filter(g => g.sub !== game.sub);

    return (
        <div className="relative w-full min-h-screen bg-black text-white">
            <div className="fixed top-0 left-0 w-full z-50">
                <Header />
            </div>

            <main className="">
                {/* Hero Video/Image Section - 80vh */}
                <section className="relative w-full h-[80vh] overflow-hidden">
                    {game.video ? (
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        >
                            <source src={game.video} type="video/mp4" />
                        </video>
                    ) : game.image ? (
                        <img
                            src={game.image}
                            alt={game.sub}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : null}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30" />

                    {/* Game Title - Centered */}
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-center"
                        >
                            {game.sub}
                        </motion.h1>
                    </div>
                </section>

                {/* Description Section */}
                <section className="px-6 md:px-16 py-12 max-w-7xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl leading-relaxed text-gray-300"
                    >
                        {game.description}
                    </motion.p>
                </section>

                {/* Game Details Section - No border */}
                <section className="px-6 md:px-16 py-12 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Developed By */}
                        {game.developedBy && (
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase mb-3 text-[10px] tracking-[0.2em]">Developed By</h3>
                                <p className="text-white font-bold">{game.developedBy}</p>
                            </div>
                        )}

                        {/* Follow On */}
                        {game.followOn && game.followOn.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase mb-3 text-[10px] tracking-[0.2em]">Follow On</h3>
                                <div className="flex flex-col gap-2">
                                    {game.followOn.map((link, idx) => (
                                        <a
                                            key={idx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white hover:underline transition-all font-bold"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Wishlist On */}
                        {game.wishlistOn && game.wishlistOn.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase mb-3 text-[10px] tracking-[0.2em]">Wishlist On</h3>
                                <div className="flex flex-col gap-2">
                                    {game.wishlistOn.map((link, idx) => (
                                        <a
                                            key={idx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white hover:underline transition-all font-bold"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Available On */}
                        {game.availableOn && game.availableOn.length > 0 && (
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase mb-3 text-[10px] tracking-[0.2em]">Available On</h3>
                                <div className="flex flex-col gap-2">
                                    {game.availableOn.map((link, idx) => (
                                        <a
                                            key={idx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white hover:underline transition-all font-bold"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Screenshots Section - No border */}
                {game.screenshots && game.screenshots.length > 0 && (
                    <section className="py-12">
                        <div className="px-6 md:px-16 max-w-7xl mx-auto mb-6">
                            <h2 className="text-sm font-bold text-gray-500 uppercase text-[10px] tracking-[0.2em]">Screenshots</h2>
                        </div>
                        <div className="overflow-x-auto scrollbar-hide">
                            <div className="flex gap-4 px-6 md:px-16 pb-4">
                                {game.screenshots.map((screenshot, idx) => (
                                    <div
                                        key={idx}
                                        className="flex-shrink-0 w-[80vw] md:w-[600px] aspect-video tech-border-btn overflow-hidden"
                                    >
                                        <img
                                            src={screenshot}
                                            alt={`Screenshot ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Other Games Section - No title, restructured items, matches header padding */}
                {otherGames.length > 0 && (
                    <section className="p-4 md:p-1 pb-20 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
                            {otherGames.slice(0, 4).map((otherGame, idx) => (
                                <Link
                                    key={idx}
                                    href={`/games/${otherGame.sub.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="group flex flex-col bg-black tech-border-btn"
                                >
                                    {/* Name Top - Padding matches header pl-[20px] */}
                                    <div className="h-14 pl-[20px] pt-[5px] pr-2 pb-2">
                                        <h3 className="text-lg md:text-xl font-black uppercase tracking-tight group-hover:text-gray-400 transition-colors">
                                            {otherGame.sub}
                                        </h3>
                                    </div>

                                    {/* Image Middle */}
                                    <div className="relative aspect-video overflow-hidden bg-black w-full">
                                        {otherGame.image && (
                                            <img
                                                src={otherGame.image}
                                                alt={otherGame.sub}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        )}
                                    </div>

                                    {/* Description Bottom - Padding matches items */}
                                    <div className="p-6">
                                        <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                                            {otherGame.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
