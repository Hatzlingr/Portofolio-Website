'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { GraduationCap, MapPin, Cpu } from 'lucide-react';
import { portfolioData, type AboutHighlight } from '@/data/portfolio';
import { PortraitFrame } from './about/PortraitFrame';

const EASE = [0.16, 1, 0.3, 1] as const;

function createRevealProps(isReduced: boolean, delay = 0, y = 20) {
  if (isReduced) {
    return { initial: false };
  }
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.45, delay, ease: EASE },
  };
}

function createScaleRevealProps(isReduced: boolean, delay = 0.14) {
  if (isReduced) {
    return { initial: false };
  }
  return {
    initial: { opacity: 0, scale: 0.96 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.55, delay, ease: EASE },
  };
}

function getHighlightIcon(iconType: AboutHighlight['icon']) {
  switch (iconType) {
    case 'education':
      return GraduationCap;
    case 'focus':
      return Cpu;
    case 'location':
      return MapPin;
    default:
      return Cpu;
  }
}

export function About() {
  const prefersReducedMotion = useReducedMotion();
  const isReduced = Boolean(prefersReducedMotion);
  const { aboutHighlights } = portfolioData;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-24 border-t border-[var(--border)] scroll-mt-10 overflow-hidden"
    >
      <div className="flex flex-col gap-14">
        {/* Section Header */}
        <motion.div
          {...createRevealProps(isReduced, 0, 20)}
          className="flex flex-col gap-2"
        >
          <span className="text-xs font-mono tracking-widest uppercase text-[var(--accent)]">
            {"// 01 · Biography"}
          </span>
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] text-pretty"
          >
            About Me
          </h2>
        </motion.div>

        {/* Narrative & Portrait */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Biography Narrative */}
          <motion.div
            {...createRevealProps(isReduced, 0.08, 22)}
            className="lg:col-span-7 flex flex-col gap-5 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl"
          >
            <p>
              I am an undergraduate student in Informatics Engineering at{' '}
              <span className="text-[var(--text-primary)] font-medium">
                Universitas Sriwijaya
              </span>
              , driven by a deep curiosity about software engineering principles, high-performance web systems, and system-level architecture.
            </p>
            <p>
              My development philosophy focuses on{' '}
              <span className="text-[var(--accent)] font-medium">
                clarity, precision, and technical restraint
              </span>
              . Rather than overwhelming interfaces with needless embellishments, I build applications that prioritize clean user journeys, predictable states, and robust type safety.
            </p>
            <p>
              Whether engineering scalable full-stack web applications with Next.js and TypeScript or optimizing low-overhead backend services, I treat every project as an opportunity to implement clean code, maintainable architecture, and intuitive design.
            </p>
          </motion.div>

          {/* Portrait Area */}
          <motion.div
            {...createScaleRevealProps(isReduced, 0.14)}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <PortraitFrame />
          </motion.div>
        </div>

        {/* Information Cards */}
        <div className="pt-8 border-t border-[var(--border)]/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aboutHighlights.map((item, index) => {
              const Icon = getHighlightIcon(item.icon);
              return (
                <motion.div
                  key={item.id}
                  {...createRevealProps(isReduced, index * 0.1, 20)}
                  whileHover={isReduced ? {} : { y: -3 }}
                  className="group relative flex flex-col justify-between p-6 rounded-2xl border border-[var(--border)]/70 bg-[var(--surface)]/50 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.04)] hover:border-[var(--accent)]/50 hover:bg-[var(--surface-hover)]/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4),0_0_20px_var(--accent-glow)] transition-[border-color,background-color,box-shadow,transform] duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)] flex items-center justify-center text-[var(--accent)] shrink-0 transition-colors duration-200 group-hover:border-[var(--accent)]/40">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="text-xs font-mono tracking-wider text-[var(--text-muted)] uppercase">
                        {item.category}
                      </span>
                      <h3 className="text-base font-semibold text-[var(--text-primary)] tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
