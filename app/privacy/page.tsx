"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import BottomBox from "../components/pages/BottomBox";
import { getCMSData } from "../actions/cmsActions";

export default function PrivacyPolicy() {
    const [content, setContent] = useState<any>(null);

    useEffect(() => {
        getCMSData().then(data => {
            if (data?.policy?.privacy) {
                setContent(data.policy.privacy);
            }
        });
    }, []);

    if (!content) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

    return (
        <div className="relative w-full min-h-screen bg-black text-white font-sans">
            <Header />
            <main className="pt-32 pb-20 px-6 md:px-20 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h1>
                <p className="text-gray-400 text-sm mb-12">Last Updated: {content.lastUpdated}</p>
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {content.content}
                </div>
            </main>
            <BottomBox isDark={true} />
        </div>
    );
}
