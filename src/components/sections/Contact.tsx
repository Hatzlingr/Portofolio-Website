'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Mail, Copy, Check, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';
import { portfolioData } from '@/data/portfolio';

export function Contact() {
  const { owner } = portfolioData;
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isReduced = Boolean(prefersReducedMotion);

  const copyEmail = () => {
    navigator.clipboard.writeText(owner.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 border-t border-[var(--border)] scroll-mt-10">
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
            {"// 05 · Communication Channel"}
          </span>
          <h2 id="contact-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] text-pretty">
            Let&apos;s Connect
          </h2>
          <p className="text-sm text-[var(--text-muted)] max-w-xl">
            Open for inquiries, academic exchanges, software projects, and engineering collaborations.
          </p>
        </motion.div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Inquiry Card */}
          <motion.div
            initial={isReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: isReduced ? 0 : 0.48,
              delay: isReduced ? 0 : 0.08,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            className="lg:col-span-7 flex flex-col gap-6 p-7 sm:p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
          >
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                Start a Conversation
              </h3>
              <p className="text-sm text-[var(--text-muted)] mt-1.5 leading-relaxed">
                Feel free to reach out directly via email or social networks. I typically respond within 24 hours.
              </p>
            </div>

            {/* Direct Email Action Box */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)] shrink-0">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                    Direct Email
                  </span>
                  <span className="text-xs sm:text-sm font-mono text-[var(--text-primary)] select-all truncate font-medium">
                    {owner.email}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-[var(--border)]/40 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="flex-1 sm:flex-none h-11 inline-flex items-center justify-center gap-1.5 px-3.5 rounded-lg text-xs font-mono border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] active:scale-[0.98] transition-[color,border-color,background-color,transform] duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" aria-hidden="true" />
                      <span className="text-[var(--accent)] font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${owner.email}`}
                  className="flex-1 sm:flex-none h-11 inline-flex items-center justify-center gap-1.5 px-4 rounded-lg text-xs font-mono font-medium border border-transparent bg-[var(--accent)] text-[var(--background)] hover:bg-[var(--accent-bright)] active:scale-[0.98] transition-[background-color,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                >
                  <Send className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Send</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Social Profiles Directory */}
          <motion.div
            initial={isReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: isReduced ? 0 : 0.48,
              delay: isReduced ? 0 : 0.16,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            className="lg:col-span-5 flex flex-col gap-3"
          >
            <span className="text-xs font-mono tracking-wider uppercase text-[var(--text-muted)]">
              Social Profiles & Repositories
            </span>

            <a
              href={owner.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile (opens in new tab)"
              className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)] transition-colors duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <div className="flex items-center gap-3">
                <GithubIcon className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                <span className="text-sm font-medium text-[var(--text-primary)]">GitHub</span>
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
                github.com/mirrdev
              </span>
            </a>

            <a
              href={owner.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile (opens in new tab)"
              className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)] transition-colors duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <div className="flex items-center gap-3">
                <LinkedinIcon className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                <span className="text-sm font-medium text-[var(--text-primary)]">LinkedIn</span>
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
                linkedin.com/in/mirrdev
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
