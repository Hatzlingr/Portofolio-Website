'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import { GithubIcon } from '@/components/Icons';
import { portfolioData } from '@/data/portfolio';

export function Projects() {
  const { projects } = portfolioData;
  const prefersReducedMotion = useReducedMotion();
  const isReduced = Boolean(prefersReducedMotion);

  return (
    <section id="project" aria-labelledby="projects-heading" className="py-24 border-t border-[var(--border)] scroll-mt-10">
      <div className="flex flex-col gap-10">
        {/* Section Header with Scroll-Reveal */}
        <motion.div
          initial={isReduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: isReduced ? 0 : 0.45,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="flex flex-col gap-2"
        >
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent)]">
            {"// 02 · Selected Works"}
          </span>
          <h2 id="projects-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] text-pretty">
            Featured Projects
          </h2>
          <p className="text-sm text-[var(--text-muted)] max-w-xl">
            A curated selection of software systems and web engineering projects.
          </p>
        </motion.div>

        {/* Space Glassmorphism Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={isReduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: isReduced ? 0 : 0.48,
                delay: isReduced ? 0 : index * 0.12,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              whileHover={isReduced ? {} : { y: -4 }}
              className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-[var(--border)]/60 bg-[var(--surface)]/55 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.36),inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:border-[var(--accent)]/40 hover:bg-[var(--surface-raised)]/60 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_20px_rgb(var(--accent-rgb)_/_0.12)] transition-[background-color,border-color,box-shadow] duration-300 overflow-hidden"
            >
              <div className="flex flex-col gap-5">
                {/* Card Top: Icon & Action Links */}
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)]/80 text-[var(--accent)] group-hover:border-[var(--accent)]/40 transition-colors duration-200">
                    <FolderGit2 className="w-5 h-5" aria-hidden="true" />
                  </div>

                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} source code on GitHub`}
                        className="inline-flex items-center justify-center min-h-11 min-w-11 p-2 -m-1 rounded text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                      >
                        <GithubIcon className="w-4 h-4 transition-transform duration-150 group-hover:scale-110" />
                      </a>
                    )}
                    {project.demoUrl && project.demoUrl !== '#' && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit live demonstration of ${project.title}`}
                        className="inline-flex items-center justify-center min-h-11 min-w-11 p-2 -m-1 rounded text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                      >
                        <ExternalLink className="w-4 h-4 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-2.5">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-[var(--border-subtle)]" aria-label="Technologies used">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono border border-[var(--border)] bg-[var(--background)]/70 text-[var(--text-muted)] transition-colors duration-150 group-hover:border-[var(--border)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
