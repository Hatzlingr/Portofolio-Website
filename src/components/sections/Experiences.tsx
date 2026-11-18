'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Briefcase, Calendar } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export function Experiences() {
  const { experiences } = portfolioData;
  const prefersReducedMotion = useReducedMotion();
  const isReduced = Boolean(prefersReducedMotion);

  return (
    <section id="experiences" aria-labelledby="experiences-heading" className="py-24 border-t border-[var(--border)] scroll-mt-10">
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
            {"// 04 · Timeline & Background"}
          </span>
          <h2 id="experiences-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] text-pretty">
            Experiences & Milestones
          </h2>
          <p className="text-sm text-[var(--text-muted)] max-w-xl">
            Academic progression and practical engineering milestones.
          </p>
        </motion.div>

        {/* Timeline List with Staggered Viewport Reveal */}
        <div className="relative pl-6 sm:pl-8 border-l border-[var(--border)] flex flex-col gap-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={isReduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: isReduced ? 0 : 0.48,
                delay: isReduced ? 0 : index * 0.12,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="relative group"
            >
              {/* Timeline Indicator Dot */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[var(--accent)] bg-[var(--background)] group-hover:bg-[var(--accent)] transition-colors duration-200"
                aria-hidden="true"
              />

              <div className="flex flex-col gap-2 p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-colors duration-200 group-hover:border-[var(--accent)]/50">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)]">
                    {exp.role}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent)]">
                    <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)]">
                  <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{exp.organization}</span>
                </div>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-2">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
