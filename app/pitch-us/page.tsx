"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCMSData } from "../actions/cmsActions";
import { submitContactForm } from "../actions/contact";
import { Loader2, Check, AlertCircle } from "lucide-react";

import Link from "next/link";
import Header from "../components/Header";
import BottomBox from "../components/pages/BottomBox";

export default function Pitch() {
    const [showStyle, setShowStyle] = useState<'1' | '2'>('2');
    const [content, setContent] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: "",
        project: "",
        email: "",
        consent: false,
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getCMSData();
                if (data?.contact) {
                    setContent(data.contact);
                }
            } catch (error) {
                console.error('Failed to load contact:', error);
            }
        }
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email) {
            setStatus('error');
            setErrorMessage("Please fill in all required fields.");
            return;
        }
        if (!formData.consent) {
            setStatus('error');
            setErrorMessage("Please accept the terms to proceed.");
            return;
        }

        setStatus('loading');
        setErrorMessage("");

        try {
            const result = await submitContactForm({
                name: formData.name,
                email: formData.email,
                message: `Project: ${formData.project}`, // Map project input to message for now
            });

            if (result.success) {
                setStatus('success');
                // Reset form after a delay to allow re-submission
                setTimeout(() => {
                    setFormData({ ...formData, name: "", project: "", email: "", consent: false });
                    setStatus('idle');
                }, 3000);
            } else {
                setStatus('error');
                setErrorMessage(result.error || "Something went wrong.");
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage("An unexpected error occurred.");
        }
    };

    if (!content) {
        return (
            <div className="min-h-screen bg-black"></div>
        );
    }

    return (
        <div className="relative w-full min-h-screen bg-black text-white">
            {/* Style Toggle for Review */}
            <div className="fixed bottom-8 right-8 z-[100] flex bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20 shadow-2xl">
                <button
                    onClick={() => setShowStyle('1')}
                    className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-widest transition-all ${showStyle === '1' ? 'bg-white text-black' : 'text-white hover:bg-white/5'}`}
                >
                    STYLE 1
                </button>
                <button
                    onClick={() => setShowStyle('2')}
                    className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-widest transition-all ${showStyle === '2' ? 'bg-white text-black' : 'text-white hover:bg-white/5'}`}
                >
                    STYLE 2
                </button>
            </div>

            <div className="fixed top-0 left-0 w-full z-50">
                <Header />
            </div>

            {showStyle === '1' ? (
                /* STYLE 1: Minimalist Mad-libs */
                <div className="min-h-screen flex flex-col px-8 md:px-32 max-w-[1920px] mx-auto w-full bg-black justify-center items-center pt-20 overflow-hidden relative">
                    <main className="w-full flex-1 flex flex-col justify-center items-center">
                        <motion.form
                            onSubmit={handleSubmit}
                            className="w-full max-w-5xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="mb-6 leading-relaxed text-white" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.5rem)' }}>
                                <span className="font-light">{content.formLine1Start} </span>
                                <input
                                    type="text"
                                    placeholder={content.namePlaceholder}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="bg-[#222] border-0 outline-none px-4 py-1 mx-2 rounded text-white placeholder-white/30 inline-block align-baseline w-[clamp(100px,15vw,200px)] h-[clamp(1.5rem,3vw,3rem)] text-center font-normal transition-all focus:bg-[#333]"
                                    disabled={status === 'loading' || status === 'success'}
                                />
                                <span className="font-light"> {content.formLine1End}</span>
                            </div>

                            <div className="mb-12 leading-relaxed text-white" style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.5rem)' }}>
                                <span className="font-light">{content.formLine2Start} </span>
                                <input
                                    type="email"
                                    placeholder={content.emailPlaceholder}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="bg-[#222] border-0 outline-none px-4 py-1 mx-2 rounded text-white placeholder-white/30 inline-block align-baseline w-[clamp(150px,20vw,300px)] h-[clamp(1.5rem,3vw,3rem)] text-center font-normal transition-all focus:ring-1 focus:ring-white focus:bg-[#333]"
                                    disabled={status === 'loading' || status === 'success'}
                                />
                                <span className="font-light">{content.formLine2End}</span>
                            </div>

                            <div className="mb-10 max-w-3xl">
                                <label className={`flex items-start gap-4 cursor-pointer group ${status === 'success' ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <div className="relative mt-1 w-12 h-8 tech-border-btn text-white">
                                        <input
                                            type="checkbox"
                                            checked={formData.consent}
                                            onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                                            className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            disabled={status === 'loading' || status === 'success'}
                                        />
                                        <Check size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" strokeWidth={4} />
                                    </div>
                                    <span className="text-[10px] md:text-xs text-gray-400 leading-relaxed pt-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
                                        {content.consentText}
                                    </span>
                                </label>
                            </div>

                            <div className="min-h-[60px]">
                                <AnimatePresence mode="wait">
                                    {status === 'success' ? (
                                        <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3 text-white bg-white/10 px-6 py-4 rounded-lg inline-flex">
                                            <div className="bg-white rounded-full p-1 shadow-sm">
                                                <Check size={20} className="text-black" strokeWidth={3} />
                                            </div>
                                            <span className="font-bold text-lg">Sent Successfully!</span>
                                        </motion.div>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="tech-border-btn text-white px-8 py-4 font-bold text-lg flex items-center gap-4 hover:!bg-white hover:text-black transition-colors"
                                        >
                                            {status === 'loading' ? <Loader2 className="animate-spin" size={24} /> : content.buttonText}
                                        </button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.form>
                    </main>
                </div>
            ) : (
                /* STYLE 2: Cinematic cinematic */
                <main className="">
                    {/* Hero Section */}
                    <section className="relative w-full h-[30vh] flex items-center justify-center overflow-hidden border-b border-white/5">
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <pattern id="pitch-grid" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                                        <path d="M 60,10 C 50,30 30,50 10,60 C 30,70 50,90 60,110 C 70,90 90,70 110,60 C 90,50 70,30 60,10 Z" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.2" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#pitch-grid)" />
                            </svg>
                        </div>

                        <div className="relative z-10 text-center px-6 pt-16">
                            <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-5xl md:text-8xl font-black uppercase tracking-tighter">Pitch Us</motion.h1>
                            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-gray-400 mt-2 max-w-2xl mx-auto font-medium">We back bold creators and co-create universes. Pair your vision with our experimental design and tech.</motion.p>
                        </div>
                    </section>

                    <section className="px-6 md:px-16 pt-4 pb-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Context */}
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col gap-12">
                            <div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase mb-6 text-[10px] tracking-[0.2em]">Our Model</h3>
                                <h2 className="text-3xl md:text-4xl font-bold leading-tight">We don't just ship products — we co-create universes.</h2>
                                <p className="text-lg text-gray-400 mt-6 leading-relaxed">Through deep collaboration with visionary teams, we share ownership, shape strategy, and build alongside you from concept to scale.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                                    <h4 className="font-bold text-white mb-2">Art Direction</h4>
                                    <p className="text-sm text-gray-400 leading-relaxed">Distinctive 2D/3D visuals that bring worlds to life.</p>
                                </div>
                                <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                                    <h4 className="font-bold text-white mb-2">AI-Powered</h4>
                                    <p className="text-sm text-gray-400 leading-relaxed">Fusing AI with design for scalable experiences.</p>
                                </div>
                            </div>
                            <div className="text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-8">
                                <p className="font-bold mb-2 text-white">{content.companyName}</p>
                                <p>{content.email}</p>
                                <p>{content.phone}</p>
                                <p className="mt-4">{content.address1}</p>
                                <p>{content.address2}</p>
                                <p>{content.address3}</p>
                            </div>
                        </motion.div>

                        {/* Form */}
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">Your Name</label>
                                    <input type="text" placeholder={content.namePlaceholder} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="bg-white/5 border border-white/10 outline-none p-4 rounded-xl text-white placeholder-white/20 focus:bg-white/10 focus:border-white/30 transition-all text-lg" disabled={status === 'loading' || status === 'success'} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">E-mail Address</label>
                                    <input type="email" placeholder={content.emailPlaceholder} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-white/5 border border-white/10 outline-none p-4 rounded-xl text-white placeholder-white/20 focus:bg-white/10 focus:border-white/30 transition-all text-lg" disabled={status === 'loading' || status === 'success'} />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">What are you working on?</label>
                                    <textarea placeholder="Tell us about your project or vision..." value={formData.project} rows={4} onChange={(e) => setFormData({ ...formData, project: e.target.value })} className="bg-white/5 border border-white/10 outline-none p-4 rounded-xl text-white placeholder-white/20 focus:bg-white/10 focus:border-white/30 transition-all text-lg resize-none" disabled={status === 'loading' || status === 'success'} />
                                </div>

                                <div className="flex flex-col gap-6">
                                    <label className={`flex items-start gap-4 cursor-pointer group ${status === 'success' ? 'opacity-50 pointer-events-none' : ''}`}>
                                        <div className="relative mt-1 w-6 h-6 shrink-0 border border-white/20 rounded flex items-center justify-center bg-white/5 transition-colors group-hover:border-white/40">
                                            <input
                                                type="checkbox"
                                                checked={formData.consent}
                                                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                                                className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                disabled={status === 'loading' || status === 'success'}
                                            />
                                            <Check size={16} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                                        </div>
                                        <span className="text-[10px] text-gray-500 leading-relaxed font-medium">
                                            {content.consentText}
                                        </span>
                                    </label>

                                    <div className="relative h-16">
                                        <AnimatePresence mode="wait">
                                            {status === 'success' ? (
                                                <motion.div key="success" className="w-full h-full flex items-center justify-center bg-white text-black rounded-xl font-bold uppercase tracking-widest text-sm">Vision Received.</motion.div>
                                            ) : (
                                                <button type="submit" disabled={status === 'loading'} className="w-full h-full tech-border-btn text-white font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-4 hover:!bg-white hover:text-black transition-all">
                                                    {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : "Send Pitch"}
                                                </button>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    </section>
                </main>
            )}

            <BottomBox isDark={true} />
        </div>
    );
}
