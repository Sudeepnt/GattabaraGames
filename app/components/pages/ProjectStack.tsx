"use client";

import React, { useState, useEffect } from "react";

export default function ProjectStack() {
  const [projects, setProjects] = useState<Array<{ sub: string; image?: string }>>([]);

  useEffect(() => {
    fetch('/data/content.json')
      .then(res => res.json())
      .then(data => {
        if (data?.home?.projectStack?.projects) {
          setProjects(data.home.projectStack.projects);
        }
      })
      .catch(error => console.error('ProjectStack load error:', error));
  }, []);

  const pairedProjects = [];
  for (let i = 0; i < projects.length; i += 2) {
    pairedProjects.push(projects.slice(i, i + 2));
  }

  return (
    <section className="relative w-full p-4 md:p-1 flex flex-col gap-1">
      {pairedProjects.map((pair, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex w-full gap-1 ${
            rowIndex % 2 === 0 ? "md:pr-[10%]" : "md:pl-[10%]"
          }`}
        >
          {pair.map((project, i) => (
            <div
              key={i}
              className="
                group 
                relative
                flex-1
                h-[25vh]
                flex flex-col 
                justify-start 
                items-start 
                p-4
                overflow-hidden 
                cursor-pointer 
                border border-black 
                rounded-lg
                bg-transparent
                transition-all duration-300
                hover:bg-[#000000]
              "
            >
              {project.image && (
                <div className="absolute inset-0 z-10">
                  <img
                    src={project.image}
                    alt={project.sub}
                    className="w-full h-full object-cover group-hover:brightness-50 transition-all duration-300"
                  />
                </div>
              )}
              
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/60 to-transparent z-10"></div>
              
              <div className="relative z-20">
                <p className="
                  text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] 
                  text-white
                  transition-colors duration-300
                ">
                  {project.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
