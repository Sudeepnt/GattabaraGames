"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Pitch() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    authorized: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.authorized) {
      alert("Please authorize the data processing to continue.");
      return;
    }
    alert(`Pitch submitted for ${formData.name}! (Demo)`);
  };

  return (
    <div className="w-full h-screen bg-white text-black flex flex-col items-center justify-center p-8 overflow-hidden relative">
      <div className="absolute top-8 left-8">
        <Image
          src="/GGlogo.png"
          alt="Gattabara Games Logo"
          width={80}
          height={30}
          className="object-contain"
          priority
        />
      </div>

      <div className="w-full max-w-4xl z-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-12 text-xl md:text-3xl font-medium leading-relaxed">

          <div className="flex flex-wrap items-baseline gap-4">
            <span>Hi, my name is</span>
            <input
              type="text"
              placeholder="your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-[#EBEBEF] px-6 py-2 rounded-lg min-w-[300px] outline-none focus:ring-2 focus:ring-black/10 placeholder-gray-400 text-black"
              required
            />
            <span>and I'm exploring a potential partnership or opportunity with Gattabara Games.</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-4">
            <span>Get in touch with me at</span>
            <input
              type="email"
              placeholder="your e-mail"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-[#EBEBEF] px-6 py-2 rounded-lg min-w-[300px] outline-none focus:ring-2 focus:ring-black/10 placeholder-gray-400 text-black"
              required
            />
            <span>.</span>
          </div>

          <div className="flex items-start gap-4 text-sm text-gray-600 font-normal max-w-2xl mt-8">
            <div className="relative flex items-center shrink-0">
              <input
                type="checkbox"
                id="auth"
                checked={formData.authorized}
                onChange={(e) => setFormData({ ...formData, authorized: e.target.checked })}
                className="peer h-16 w-16 cursor-pointer appearance-none rounded-lg border border-[#1A2E35] bg-white transition-all checked:bg-[#1A2E35] checked:border-[#1A2E35] hover:border-black"
                style={{ borderRadius: '12px' }}
              />
              <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
            <label htmlFor="auth" className="cursor-pointer leading-tight hover:text-black transition-colors pt-4">
              Hereby I authorise Gattabara Games, to process the given personal information in connection with my the inquiry. I am aware that submitting personal data is voluntary and that I have a right to view, edit and delete all the data concerning myself.
            </label>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="bg-[#1A2E35] text-white px-8 py-3 rounded-lg flex items-center gap-4 text-base font-bold hover:bg-black transition-colors"
            >
              Send
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <div className="absolute bottom-8 left-8 right-8 flex justify-between text-xs text-gray-500 font-medium">
        <div>
          <p className="font-bold text-gray-900 mb-1">Gattabara Games LLP</p>
          <p>contact@gattabaragames.com</p>
          <p>+91 9900114038</p>
        </div>
        <div className="text-right">
          <p>No. 55, 1st Floor, 10th Cross, 2nd Stage, Mahalakshmipuram,</p>
          <p>WOC Road, Bengaluru, Karnataka,</p>
          <p>India - 560086</p>
        </div>
      </div>
    </div>
  );
}
