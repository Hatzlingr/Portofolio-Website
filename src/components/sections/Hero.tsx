'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Code2 } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { ThemeOrb } from '@/components/ThemeOrb';

export function Hero() {
  const { owner } = portfolioData;
  const prefersReducedMotion = useReducedMotion();
  const isReduced = Boolean(prefersReducedMotion);

  const transition = (delay: number, duration = 0.45) => ({
    duration: isReduced ? 0 : duration,
    delay: isReduced ? 0 : delay,
    ease: [0.16, 1, 0.3, 1] as const,
  });

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="min-h-[calc(100vh-3.5rem)] md:min-h-screen flex items-center justify-center pt-20 md:pt-0 pb-16"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headlines & Intro */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Status Badge */}
          <motion.div
            initial={isReduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(0.05, 0.4)}
            className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full text-xs font-mono border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)] transition-colors"
          >
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: 'var(--accent)' }}
              aria-hidden="true"
            />
            <span>AVAILABLE FOR PROJECTS & COLLABORATION</span>
          </motion.div>

          {/* Heading */}
          <div className="flex flex-col gap-2">
            <motion.h1
              id="hero-heading"
              initial={isReduced ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition(0.15)}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1]"
            >
              {owner.name}
            </motion.h1>
            <motion.p
              initial={isReduced ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition(0.22)}
              className="text-lg sm:text-xl font-mono text-[var(--accent)] tracking-tight"
            >
              {owner.title}
            </motion.p>
          </div>

          {/* Bio Description */}
          <motion.p
            initial={isReduced ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition(0.28)}
            className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-xl"
          >
            {owner.bio}
          </motion.p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <motion.a
              href="#project"
              initial={isReduced ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition(0.35)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-[var(--accent)] text-[var(--background)] hover:bg-[var(--accent-bright)] transition-[background-color,transform,box-shadow] duration-200 active:scale-[0.98] shadow-[0_0_20px_var(--accent-glow)] font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <Code2 className="w-4 h-4" aria-hidden="true" />
              <span>Explore Projects</span>
            </motion.a>

            <motion.a
              href="#contact"
              initial={isReduced ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition(0.42)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--surface)] transition-[color,border-color,background-color,transform] duration-200 active:scale-[0.98] font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <span>Get In Touch</span>
            </motion.a>
          </div>
        </div>

        {/* Right Column: Dynamic SVG Theme Reactor */}
        <motion.div
          initial={isReduced ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: isReduced ? 0 : 0.55,
            delay: isReduced ? 0 : 0.18,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="lg:col-span-5 flex justify-center items-center"
        >
          <ThemeOrb size={300} showLabels={true} />
        </motion.div>
      </div>
    </section>
  );
}
