"use client";

import React, { useState, useEffect } from "react";

export default function ProjectStack() {
  const [projects, setProjects] = useState<Array<{ sub: string; image?: string; description?: string }>>([]);

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

  if (projects.length === 0) return null;

  return (
    <section className="relative w-full p-4 md:p-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="group relative aspect-video overflow-hidden tech-border-btn bg-black/40"
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.sub}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

            <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-xl font-bold uppercase tracking-wider mb-2 text-white">{project.sub}</h3>
              {project.description && (
                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 line-clamp-2">
                  {project.description}
                </p>
              )}
            </div>

            {/* Hover Border Accent */}
            <div className="absolute inset-0 border border-transparent group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
