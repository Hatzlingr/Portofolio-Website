'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { portfolioData } from '@/data/portfolio';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();
  const isReduced = Boolean(prefersReducedMotion);

  return (
    <motion.footer
      initial={isReduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: isReduced ? 0 : 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      className="py-12 border-t border-[var(--border)] text-xs font-mono text-[var(--text-muted)] flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <div className="flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: 'var(--accent)' }}
          aria-hidden="true"
        />
        <span>
          &copy; {currentYear} {portfolioData.owner.brand} &bull; {portfolioData.owner.name}
        </span>
      </div>

      <div className="flex items-center gap-4 text-[11px]">
        <span>Built with Next.js &bull; TypeScript &bull; Tailwind CSS &bull; Motion</span>
      </div>
    </motion.footer>
  );
}
