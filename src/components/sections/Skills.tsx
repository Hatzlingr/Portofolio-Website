'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Layers, Terminal, Database, ShieldCheck } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export function Skills() {
  const { skillGroups } = portfolioData;
  const prefersReducedMotion = useReducedMotion();
  const isReduced = Boolean(prefersReducedMotion);

  const getCategoryIcon = (category: string) => {
    if (category.includes('Frontend')) return <Layers className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />;
    if (category.includes('Backend')) return <Database className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />;
    if (category.includes('Tools')) return <Terminal className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />;
    return <ShieldCheck className="w-4 h-4 text-[var(--accent)]" aria-hidden="true" />;
  };

  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-24 border-t border-[var(--border)] scroll-mt-10">
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
            {"// 03 · Technical Proficiencies"}
          </span>
          <h2 id="skills-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] text-pretty">
            Skills & Technologies
          </h2>
          <p className="text-sm text-[var(--text-muted)] max-w-xl">
            Core technical proficiencies grouped by domain, with emphasis on clean syntax and type safety.
          </p>
        </motion.div>

        {/* Skill Groups Grid with Staggered Viewport Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={isReduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: isReduced ? 0 : 0.48,
                delay: isReduced ? 0 : groupIdx * 0.1,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-colors duration-200 hover:border-[var(--accent)]/50"
            >
              <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[var(--border-subtle)]">
                {getCategoryIcon(group.category)}
                <h3 className="text-sm font-semibold text-[var(--text-primary)] tracking-wide">
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono border border-[var(--border)] bg-[var(--background)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors duration-150"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
