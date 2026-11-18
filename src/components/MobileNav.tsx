"use client";

import React, { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { useTheme } from "@/context/ThemeContext";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { activeTheme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)] transition-colors duration-300">
      <div className="flex items-center justify-between px-5 h-14">
        {/* Brand */}
        <a href="#home" onClick={closeMenu} className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_var(--accent)]"
            style={{ backgroundColor: "var(--accent)" }}
            aria-hidden="true"
          />
          <span className="font-semibold text-sm tracking-wide text-[var(--text-primary)]">
            {portfolioData.owner.brand}
          </span>
        </a>

        {/* Right controls: Theme Badge & Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Current theme: ${activeTheme}. Tap to toggle theme.`}
            className="px-2.5 py-1 min-h-11 rounded-full text-[11px] font-mono border border-[var(--border)] text-[var(--accent)] bg-[var(--surface)] hover:border-[var(--accent)] transition-[color,border-color,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            {activeTheme.toUpperCase()}
          </button>

          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="p-1.5 min-h-11 min-w-11 inline-flex items-center justify-center rounded-md text-[var(--text-primary)] hover:bg-[var(--surface)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          >
            {isOpen ? <X className="w-5 h-5 text-[var(--accent)]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Collapsible Mobile Dropdown */}
      {isOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--background)] px-6 py-6 flex flex-col gap-5 animate-in slide-in-from-top-2 duration-200">
          <nav aria-label="Mobile Navigation">
            <ul className="flex flex-col gap-4 text-sm font-medium">
              {portfolioData.navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className="block py-1 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="pt-2 border-t border-[var(--border)]">
            <a
              href="#contact"
              onClick={closeMenu}
              className="flex items-center justify-between w-full py-2 text-xs font-medium text-[var(--accent)] hover:opacity-80 transition-opacity"
            >
              <span>Let&apos;s Connect</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
