'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PortraitPlaceholder } from './PortraitPlaceholder';

export function PortraitFrame() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5] flex items-end justify-center select-none">
      {/* Lateral contour glows */}
      <div
        className="pointer-events-none absolute -left-4 sm:-left-6 top-1/4 bottom-8 w-24 sm:w-28 rounded-full blur-2xl opacity-40 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, var(--accent) 0%, var(--accent-glow) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-4 sm:-right-6 top-1/4 bottom-8 w-24 sm:w-28 rounded-full blur-2xl opacity-40 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 80% 50%, var(--accent) 0%, var(--accent-glow) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-8 bottom-0 h-20 rounded-full blur-xl opacity-25 z-0"
        style={{
          background:
            'radial-gradient(ellipse at bottom, var(--accent) 0%, var(--accent-glow) 60%, transparent 85%)',
        }}
        aria-hidden="true"
      />

      {/* HUD corner brackets */}
      <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[var(--border)] opacity-60" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[var(--border)] opacity-60" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[var(--border)] opacity-60" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[var(--border)] opacity-60" />
      </div>

      {/* Image or fallback placeholder */}
      {!imageError ? (
        <Image
          src="/images/profile.png"
          alt="Portrait of Amirul Nur Cahyo"
          width={400}
          height={500}
          className="relative z-10 w-full h-full object-contain object-bottom drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)]"
          onError={() => setImageError(true)}
        />
      ) : (
        <PortraitPlaceholder />
      )}
    </div>
  );
}

