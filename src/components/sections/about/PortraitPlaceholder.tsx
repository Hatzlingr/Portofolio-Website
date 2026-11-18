import React from 'react';

export function PortraitPlaceholder() {
  return (
    <div className="relative z-10 w-full h-full flex flex-col items-center justify-between p-6 rounded-2xl border border-[var(--border)]/70 bg-[var(--surface)]/40 backdrop-blur-sm">
      {/* HUD status */}
      <div className="w-full flex items-center justify-between text-xs font-mono tracking-wider text-[var(--accent)] uppercase">
        <span>{"// PORTRAIT HUD"}</span>
        <span className="flex items-center gap-1.5 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          READY
        </span>
      </div>

      {/* Silhouette vector */}
      <div className="w-full flex-1 flex flex-col items-center justify-center my-4">
        <svg
          viewBox="0 0 160 200"
          className="w-36 h-44 text-[var(--accent)]/70"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          {/* Head contour */}
          <circle cx="80" cy="50" r="28" strokeWidth="1.5" strokeDasharray="4 2" />
          <circle cx="80" cy="50" r="22" strokeWidth="1" strokeOpacity="0.6" />
          <circle cx="80" cy="50" r="4" fill="currentColor" fillOpacity="0.4" />

          {/* Shoulders contour */}
          <path
            d="M 25 180 C 25 130 50 105 80 105 C 110 105 135 130 135 180"
            strokeWidth="1.5"
            strokeDasharray="5 3"
          />
          <path
            d="M 40 180 C 40 140 58 120 80 120 C 102 120 120 140 120 180"
            strokeWidth="1"
            strokeOpacity="0.5"
          />

          {/* Alignment crosshairs */}
          <line x1="80" y1="12" x2="80" y2="24" strokeWidth="1" />
          <line x1="80" y1="76" x2="80" y2="88" strokeWidth="1" />
          <line x1="42" y1="50" x2="54" y2="50" strokeWidth="1" />
          <line x1="106" y1="50" x2="118" y2="50" strokeWidth="1" />
        </svg>
      </div>

      {/* Replacement instructions */}
      <div className="w-full text-center flex flex-col gap-1">
        <span className="text-xs font-mono font-medium text-[var(--text-primary)]">
          /images/profile.png
        </span>
        <span className="text-xs text-[var(--text-muted)]">
          Awaiting owner PNG asset
        </span>
      </div>
    </div>
  );
}

