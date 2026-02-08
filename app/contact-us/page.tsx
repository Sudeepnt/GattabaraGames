"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCMSData } from "../actions/cmsActions";
import { submitContactForm } from "../actions/contact";
import { Loader2, Check, AlertCircle } from "lucide-react";
import React from 'react';
import Header from "../components/Header";
import BottomBox from "../components/pages/BottomBox";

export default function Pitch() {
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
        <div className="h-screen overflow-hidden flex flex-col px-2 md:px-32 max-w-[1920px] mx-auto w-full bg-black justify-center relative font-sans text-white">
            <div className="fixed top-0 left-0 w-full z-50">
                <Header />
            </div>

            <main className="flex-1 w-full flex flex-col justify-start md:justify-center items-start pt-36 md:pt-0">

                {/* Contact Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col items-start px-0 md:px-20 max-w-[1920px] mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    {/* Combined Input Group: Continuous Text Flow */}
                    <div className="mt-8 md:mt-2 mb-4 w-full text-sm md:text-lg text-white leading-relaxed font-light tracking-wide">
                        <span className="font-light">{content.formLine1Start} </span>
                        <span className="inline-grid items-center mx-1 md:mx-2 align-baseline relative">
                            {/* Hidden text for auto-width */}
                            <span className="invisible col-start-1 row-start-1 px-2 md:px-8 font-normal whitespace-pre opacity-0 pointer-events-none h-[clamp(1.5rem,3vw,3rem)] flex items-center justify-center min-w-[clamp(100px,15vw,200px)]">
                                {formData.name || content.namePlaceholder}
                            </span>
                            <input
                                type="text"
                                placeholder={content.namePlaceholder}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="col-start-1 row-start-1 w-full h-[clamp(1.5rem,3vw,3rem)] bg-white/10 border-0 outline-none px-2 md:px-8 rounded text-white placeholder-white/30 text-center font-normal transition-all focus:bg-white/20 min-w-[clamp(100px,15vw,200px)]"
                                disabled={status === 'loading' || status === 'success'}
                            />
                        </span>
                        <span className="font-light"> {content.formLine1End} </span>
                        <br className="block md:hidden" />
                        <span className="font-light">{content.formLine2Start} </span>
                        <span className="inline-grid items-center mx-1 md:mx-2 align-baseline relative">
                            {/* Hidden text for auto-width */}
                            <span className="invisible col-start-1 row-start-1 px-2 md:px-8 font-normal whitespace-pre opacity-0 pointer-events-none h-[clamp(1.5rem,3vw,3rem)] flex items-center justify-center min-w-[clamp(150px,20vw,300px)]">
                                {formData.email || content.emailPlaceholder}
                            </span>
                            <input
                                type="email"
                                placeholder={content.emailPlaceholder}
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="col-start-1 row-start-1 w-full h-[clamp(1.5rem,3vw,3rem)] bg-white/10 border-0 outline-none px-2 md:px-8 rounded text-white placeholder-white/30 text-center font-normal transition-all focus:bg-white/20 min-w-[clamp(150px,20vw,300px)]"
                                disabled={status === 'loading' || status === 'success'}
                            />
                        </span>
                        <span className="font-light">{content.formLine2End}</span>
                    </div>

                    {/* Consent Checkbox */}
                    <div className="mb-6 md:mb-8 w-full flex justify-start">
                        <label className={`flex items-start gap-4 cursor-pointer group ${status === 'success' ? 'opacity-50 pointer-events-none' : ''}`}>
                            <div className="relative mt-1 w-6 h-6 shrink-0">
                                <input
                                    type="checkbox"
                                    checked={formData.consent}
                                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                                    className="peer appearance-none w-6 h-6 border-2 border-white/50 rounded cursor-pointer transition-colors checked:border-white bg-transparent"
                                    disabled={status === 'loading' || status === 'success'}
                                />
                                <Check
                                    size={16}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                                    strokeWidth={3}
                                />
                            </div>
                            <span className="text-[10px] md:text-xs text-gray-400 leading-relaxed pt-0.5 opacity-80 group-hover:opacity-100 transition-opacity">
                                {content.consentText}
                            </span>
                        </label>
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                        {status === 'error' && errorMessage && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex items-center gap-2 text-red-400 mb-6 font-medium text-sm"
                            >
                                <AlertCircle size={16} />
                                {errorMessage}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Action Area */}
                    <div className="min-h-[60px] w-full flex justify-start">
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-3 text-white bg-white/10 px-6 py-4 rounded-lg inline-flex"
                                >
                                    <div className="bg-white rounded-full p-1 shadow-sm">
                                        <Check size={20} className="text-black" strokeWidth={3} />
                                    </div>
                                    <span className="font-bold text-lg">Message Sent Successfully!</span>
                                </motion.div>
                            ) : (
                                <motion.button
                                    key="submit-btn"
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-auto min-w-[150px] md:min-w-[200px] relative h-[34px] md:h-14 flex items-center justify-center gap-4 tech-border-btn !bg-transparent text-white border border-white hover:!bg-white hover:!text-black transition-all duration-300 font-bold text-sm md:text-lg tracking-wide group disabled:opacity-70 disabled:cursor-not-allowed"
                                    initial="initial"
                                    whileHover={status === 'loading' ? {} : "hover"}
                                    whileTap={status === 'loading' ? {} : "tap"}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    variants={{
                                        initial: { scale: 1 },
                                        hover: { scale: 1.02 },
                                        tap: { scale: 0.98 }
                                    }}
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="animate-spin mr-2" size={16} />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            {/* Using 'capitalize' class for Pascal/Title Case feel if text is lowercase, or just rely on text. Removing uppercase class handled in className above. */}
                                            <span className="capitalize text-lg">{content.buttonText || "Send"}</span>
                                            <svg
                                                width="24"
                                                height="12"
                                                viewBox="0 0 36 12"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M30 1L35 6L30 11" />
                                                <path d="M0 6H35" />
                                            </svg>
                                        </>
                                    )}
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Info Grid - Moved inside form, closer to button */}
                    {/* Info Grid - Moved inside form, closer to button */}
                    <div className="w-full flex flex-col md:flex-row justify-between gap-2 md:gap-6 text-gray-400 text-[10px] md:text-sm leading-relaxed mt-6 md:mt-6 border-t border-white/10 pt-4 md:pt-8">
                        {/* Column 1: Company & Contact */}
                        <div className="flex flex-col items-start text-left">
                            <p className="font-bold mb-1 text-white">{content.companyName}</p>
                            <p>{content.email}</p>
                            <p>{content.phone}</p>
                        </div>

                        {/* Column 2: Address Combined */}
                        <div className="flex flex-col items-start md:items-end text-left md:text-right">
                            <p>{content.address1}</p>
                            <p>{content.address2}</p>
                            <p>{content.address3}</p>
                        </div>
                    </div>
                </motion.form>
            </main>
        </div>
    );
}
