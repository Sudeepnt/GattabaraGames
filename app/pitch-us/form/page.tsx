"use client";

import React, { useState } from 'react';
import { Upload, HelpCircle, ChevronDown } from 'lucide-react';

export default function GattabaraForm() {
    const [charCounts, setCharCounts] = useState({
        description: 0,
        materials: 0,
        notes: 0,
    });

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>, key: string) => {
        setCharCounts({ ...charCounts, [key]: e.target.value.length });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-[#333]">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                {/* Header Section */}
                <div className="p-8 pb-4">
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                            {/* Placeholder for Gattabara Logo */}
                            <span className="text-white font-bold text-xl">G</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <HelpCircle size={20} />
                        </button>
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight mb-4">Gattabara Games Application Form</h1>
                    <p className="text-gray-600 leading-relaxed text-sm">
                        Use this form to introduce your project or studio to Gattabara Games. We collaborate with solo creators and independent studios to co-create original games, aligning on vision, authorship, and long-term ownership.
                    </p>
                </div>

                <form className="p-8 pt-4 space-y-8" onSubmit={(e) => e.preventDefault()}>

                    {/* Studio Info Section */}
                    <section className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Studio / Creator Name <span className="text-red-500">*</span></label>
                            <input type="text" maxLength={255} className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
                            <div className="text-right text-xs text-gray-400 mt-1">0/255</div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">Studio or Portfolio Website</label>
                            <p className="text-xs text-gray-500 mb-2">(If solo creator, link to portfolio or previous work)</p>
                            <input type="url" className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Your Name <span className="text-red-500">*</span></label>
                                <input type="text" className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Your Email Address <span className="text-red-500">*</span></label>
                                <input type="email" className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Country</label>
                            <div className="relative">
                                <select className="w-full border border-gray-300 rounded-md p-3 appearance-none bg-white outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="">Select Country</option>
                                    <option value="US">United States</option>
                                    <option value="UK">United Kingdom</option>
                                    {/* Add more countries */}
                                </select>
                                <ChevronDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" size={18} />
                            </div>
                        </div>
                    </section>

                    <hr className="border-gray-100" />

                    {/* Project Details Section */}
                    <section className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold mb-1">Game / Project Title <span className="text-red-500">*</span></label>
                            <p className="text-xs text-gray-500 mb-2">(This can be a working title or internal project codename.)</p>
                            <input type="text" className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">What kind of collaboration are you seeking? <span className="text-red-500">*</span></label>
                            <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                {[
                                    { id: 'co-dev', label: 'Co-Development Partnership', desc: 'Hands-on creative and production collaboration with Gattabara to build the game together.' },
                                    { id: 'funding', label: 'Project Co-Funding', desc: 'Financial support to help bring your game to life, including development, localisation, marketing, porting, etc.' },
                                    { id: 'gtm', label: 'Go-To-Market & Publishing Support', desc: 'Gattabara supports release, distribution, marketing, and launch strategy while you retain creative authorship.' }
                                ].map((opt) => (
                                    <label key={opt.id} className="flex items-start space-x-3 cursor-pointer group">
                                        <input type="checkbox" className="mt-1.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <div className="text-sm">
                                            <span className="font-semibold block">{opt.label}</span>
                                            <span className="text-gray-500 text-xs">{opt.desc}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">Short Project Description <span className="text-red-500">*</span></label>
                            <p className="text-xs text-gray-500 mb-2">(Tell us what you’re building, why it matters, and what makes it distinct.)</p>
                            <textarea
                                rows={4}
                                maxLength={2000}
                                onChange={(e) => handleTextChange(e, 'description')}
                                className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            ></textarea>
                            <div className="text-right text-xs text-gray-400 mt-1">{charCounts.description}/2000</div>
                        </div>
                    </section>

                    {/* Budget & Tech Section */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Total Project Budget (USD)</label>
                            <input type="number" placeholder="0.00" className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Collaboration Budget Ask (USD) <span className="text-red-500">*</span></label>
                            <input type="number" placeholder="0.00" className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Target Platform(s) <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select multiple className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500 h-24">
                                    <option>PC</option>
                                    <option>Console</option>
                                    <option>Mobile</option>
                                    <option>VR</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Genre <span className="text-red-500">*</span></label>
                            <input type="text" className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </section>

                    {/* Comparable Titles */}
                    <section className="space-y-4">
                        <label className="block text-sm font-semibold">Comparable Titles</label>
                        <p className="text-xs text-gray-500">(Based on gameplay, tone, and scope. Preferably released in the last 10 years.)</p>
                        <div className="space-y-3">
                            <input type="text" placeholder="Comparable Title 1" className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500" />
                            <input type="text" placeholder="Comparable Title 2" className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500" />
                            <input type="text" placeholder="Comparable Title 3" className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </section>

                    {/* Materials Section */}
                    <section className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Playable / Materials</label>
                            <p className="text-xs text-gray-500 mb-4">Note that we prioritize projects with something tangible to experience (playable builds, prototypes, vertical slices). If available, include gameplay footage.</p>

                            <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center hover:border-blue-400 transition cursor-pointer group">
                                <Upload className="mx-auto text-gray-400 group-hover:text-blue-500 mb-4" size={32} />
                                <p className="text-sm text-gray-600">
                                    <span className="text-blue-600 font-semibold">Choose a file to upload</span> or drag and drop here
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-1">Materials (Links) and/or Access Details</label>
                            <p className="text-xs text-gray-500 mb-2">(Builds may fail to upload. Please include links to builds, decks, and Steam keys here.)</p>
                            <textarea
                                rows={4}
                                onChange={(e) => handleTextChange(e, 'materials')}
                                className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            ></textarea>
                            <div className="text-right text-xs text-gray-400 mt-1">{charCounts.materials}/2000</div>
                        </div>

                        <label className="flex items-center space-x-3 cursor-pointer">
                            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" />
                            <span className="text-sm font-semibold text-gray-700">Is this a Multiplayer Build?</span>
                        </label>
                    </section>

                    {/* Final Details */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Target Launch Window <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="e.g. Q1 2026" className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Estimated Launch Price (USD) <span className="text-red-500">*</span></label>
                            <input type="text" placeholder="e.g. $19.99" className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Current Team Size</label>
                            <input type="number" className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">How did you hear about us?</label>
                            <input type="text" className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </section>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Additional Notes</label>
                        <textarea
                            rows={3}
                            onChange={(e) => handleTextChange(e, 'notes')}
                            className="w-full border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        ></textarea>
                        <div className="text-right text-xs text-gray-400 mt-1">{charCounts.notes}/2000</div>
                    </div>

                    {/* Footer */}
                    <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="flex items-center space-x-2 bg-gray-50 border border-gray-200 px-4 py-3 rounded text-sm">
                            <input type="checkbox" className="h-5 w-5 border-gray-300" />
                            <span>I'm not a robot</span>
                        </div>

                        <button
                            type="submit"
                            className="w-full sm:w-auto px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition-colors shadow-lg shadow-blue-200"
                        >
                            Submit Application
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
