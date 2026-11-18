'use client';

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export function Sidebar() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const prefersReducedMotion = useReducedMotion();
  const isReduced = Boolean(prefersReducedMotion);

  useEffect(() => {
    const sectionIds = portfolioData.navigation.map((n) => n.id);
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.aside
      initial={isReduced ? false : { opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: isReduced ? 0 : 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      aria-label="Sidebar Navigation"
      className="hidden md:flex flex-col justify-between fixed top-0 left-0 bottom-0 z-40 w-[var(--sidebar-width)] h-screen bg-[var(--background)] border-r border-[var(--border)] px-6 py-8 select-none transition-colors duration-[var(--theme-transition-duration)]"
    >
      {/* Brand Header */}
      <div className="flex items-center gap-2.5">
        <span
          className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_var(--accent)] transition-[transform] duration-200 hover:scale-110"
          style={{ backgroundColor: 'var(--accent)' }}
          aria-hidden="true"
        />
        <span className="font-semibold text-sm tracking-wide text-[var(--text-primary)]">
          {portfolioData.owner.brand}
        </span>
      </div>

      {/* Navigation Links */}
      <nav aria-label="Main Navigation" className="my-auto py-6">
        <ul className="flex flex-col gap-5 text-[13px] font-medium tracking-wide">
          {portfolioData.navigation.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={`group flex items-center gap-2 transition-[color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-sm ${
                    isActive
                      ? 'text-[var(--accent)] font-semibold'
                      : 'text-[var(--text-muted)] hover:text-[var(--accent)] hover:translate-x-1'
                  }`}
                >
                  <span
                    className={`h-1 w-1 rounded-full transition-[opacity,transform] duration-200 ${
                      isActive ? 'bg-[var(--accent)] opacity-100 scale-125' : 'bg-transparent opacity-0'
                    }`}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Let's Connect CTA */}
      <div>
        <a
          href="#contact"
          className="inline-flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] text-xs font-mono text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--surface)] transition-[border-color,background-color,color] duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          <span>Let&apos;s Connect</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </a>
      </div>
    </motion.aside>
  );
}
