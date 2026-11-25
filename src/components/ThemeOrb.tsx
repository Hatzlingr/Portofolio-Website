'use client';

import React, { useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from 'motion/react';
import { useTheme } from '@/context/ThemeContext';

interface ThemeOrbProps {
  size?: number;
  className?: string;
  showLabels?: boolean;
}

export function ThemeOrb({ size = 260, className = '', showLabels = true }: ThemeOrbProps) {
  const { activeTheme, toggleTheme, startHoverPreview, endHoverPreview } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const isReduced = Boolean(shouldReduceMotion);

  const [isHovered, setIsHovered] = useState(false);
  const [flipCount, setFlipCount] = useState(0);

  // Ambient light spill derived from the active theme token (docs/design.md §6, layer 2)
  const lightSpillInner = 'rgb(var(--accent-rgb) / 0.45)';
  const lightSpillOuter = 'rgb(var(--accent-rgb) / 0.28)';

  // Motion values for continuous multi-layer ring rotation
  const angle1 = useMotionValue(0);
  const angle2 = useMotionValue(0);
  const angle3 = useMotionValue(0);
  const angle4 = useMotionValue(0);

  const speedRef = useRef([360 / 70, 360 / 50, 360 / 36, 360 / 70]);

  // Continuous frame loop with smooth acceleration/deceleration without resetting rotation angles.
  // Idle periods follow docs/design.md §6: 70s, 50s, 36s. Hover: 18s, 14s, 10s.
  // deg/sec = 360 / period. ring4 is an additive calibration ring (not in the spec table)
  // and is derived from the middle idle/hover ratio so it stays visually coherent.
  const IDLE = [360 / 70, 360 / 50, 360 / 36, 360 / 70] as const;
  const HOVER = [360 / 18, 360 / 14, 360 / 10, 360 / 10] as const;
  const ringSpeed = isHovered ? HOVER : IDLE;
  const SPEED_RAMP = 0.008; // per-ms lerp factor ≈ 300ms to settle

  useAnimationFrame((_, delta) => {
    if (isReduced) return;

    // Guard against background tab time jumps
    const safeDelta = Math.min(delta, 64);
    const { current: speeds } = speedRef;

    // Smooth speed interpolation toward the target idle/hover speeds (~250-350ms transition)
    for (let i = 0; i < speeds.length; i++) {
      speeds[i] += (ringSpeed[i] - speeds[i]) * Math.min(1, safeDelta * SPEED_RAMP);
    }

    const deltaSec = safeDelta / 1000;
    // Alternating directions: 1 and 3 clockwise, 2 and 4 counter-clockwise
    angle1.set((angle1.get() + speeds[0] * deltaSec) % 360);
    angle2.set((angle2.get() - speeds[1] * deltaSec) % 360);
    angle3.set((angle3.get() + speeds[2] * deltaSec) % 360);
    angle4.set((angle4.get() - speeds[3] * deltaSec) % 360);
  });

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    setIsHovered(true);
    startHoverPreview();
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    setIsHovered(false);
    endHoverPreview();
  };

  const handleFocus = () => {
    setIsHovered(true);
    startHoverPreview();
  };

  const handleBlur = () => {
    setIsHovered(false);
    endHoverPreview();
  };

  const handleClick = () => {
    endHoverPreview();
    toggleTheme();
    setFlipCount((prev) => prev + 1);
  };

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Interactive Reactor Button */}
      <button
        type="button"
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-label={`Current visual theme: ${activeTheme}. Click to activate ${activeTheme === 'emerald' ? 'Yellow' : 'Emerald'} theme.`}
        className="group relative flex items-center justify-center p-2 rounded-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--background)] transition-[transform] duration-200 active:scale-[0.98]"
        style={{ width: size, height: size }}
      >
        {/* Layer 1: Ambient light spill & glow behind the SVG */}
        <div
          className={`absolute -inset-4 sm:-inset-6 rounded-full pointer-events-none transition-[opacity,transform] duration-300 blur-2xl ${isHovered ? 'opacity-70 scale-115' : 'opacity-20 scale-95'
            }`}
          style={{ background: lightSpillInner }}
          aria-hidden="true"
        />
        <div
          className={`absolute -inset-8 sm:-inset-12 rounded-full pointer-events-none transition-[opacity,transform] duration-300 blur-3xl ${isHovered ? 'opacity-50 scale-125' : 'opacity-10 scale-90'
            }`}
          style={{
            background: `radial-gradient(circle, ${lightSpillOuter} 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Layer 2: Outer Motion wrapper for smooth hover scaling (1.06 - 1.10) */}
        <motion.div
          animate={{
            scale: isHovered && !isReduced ? 1.08 : 1,
          }}
          transition={{
            duration: isReduced ? 0 : 0.3,
            ease: [0.16, 1, 0.3, 1] as const,
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* Layer 3: Inner activation container for 3D flip */}
          <motion.div
            animate={{
              rotateY: flipCount * 180,
            }}
            transition={{
              duration: isReduced ? 0 : 0.6,
              ease: [0.16, 1, 0.3, 1] as const,
            }}
            style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
            className="w-full h-full"
          >
            {/* Dynamic Vector SVG Reactor */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full relative z-10 transition-colors duration-[var(--theme-transition-duration)]"
              aria-hidden="true"
            >
              <defs>
                {/* Core Radial Glow */}
                <radialGradient id="reactorCoreGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--accent-bright)" stopOpacity="0.92" />
                  <stop offset="45%" stopColor="var(--accent)" stopOpacity="0.55" />
                  <stop offset="75%" stopColor="var(--accent)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>

                {/* Subtle filter for outer ring halo */}
                <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* 1. Outermost Static Calibration Ring */}
              <circle
                cx="100"
                cy="100"
                r="94"
                fill="none"
                stroke="var(--border)"
                strokeWidth="0.8"
                strokeDasharray="2 6"
                className="transition-colors duration-[var(--theme-transition-duration)]"
              />

              {/* Layer 4A: Outer Segmented Arc 1 (Continuous Clockwise Rotation) */}
              <motion.g style={{ rotate: angle1, transformOrigin: '100px 100px' }}>
                <circle
                  cx="100"
                  cy="100"
                  r="87"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.2"
                  strokeDasharray="24 38 8 20 50 16"
                  strokeLinecap="round"
                  filter="url(#subtleGlow)"
                  opacity={isHovered ? 0.95 : 0.75}
                  className="transition-colors duration-[var(--theme-transition-duration)]"
                />
              </motion.g>

              {/* 3. Outer Radial Tick Notches (Every 30 degrees) */}
              <g className="transition-colors duration-[var(--theme-transition-duration)]" opacity={isHovered ? 0.8 : 0.5}>
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const x1 = 100 + 80 * Math.cos(angle);
                  const y1 = 100 + 80 * Math.sin(angle);
                  const x2 = 100 + 84 * Math.cos(angle);
                  const y2 = 100 + 84 * Math.sin(angle);
                  const isCardinal = i % 3 === 0;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isCardinal ? 'var(--accent)' : 'var(--border)'}
                      strokeWidth={isCardinal ? 1.5 : 0.75}
                    />
                  );
                })}
              </g>

              {/* Layer 4B: Middle Arc Segment (Continuous Counter-Clockwise Rotation) */}
              <motion.g style={{ rotate: angle2, transformOrigin: '100px 100px' }}>
                <circle
                  cx="100"
                  cy="100"
                  r="72"
                  fill="none"
                  stroke="var(--accent-bright)"
                  strokeWidth="1.2"
                  strokeDasharray="40 24 16 28 8 36"
                  strokeLinecap="round"
                  opacity={isHovered ? 1 : 0.85}
                  className="transition-colors duration-[var(--theme-transition-duration)]"
                />
              </motion.g>

              {/* 5. Inner Track Circle */}
              <circle
                cx="100"
                cy="100"
                r="58"
                fill="none"
                stroke="var(--border)"
                strokeWidth="0.9"
                className="transition-colors duration-[var(--theme-transition-duration)]"
              />

              {/* Layer 4C: Precision Diamond Aperture Rotator (Continuous Clockwise Rotation) */}
              <motion.g style={{ rotate: angle3, transformOrigin: '100px 100px' }}>
                <polygon
                  points="100,56 144,100 100,144 56,100"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="0.8"
                  strokeDasharray="4 6"
                  opacity={isHovered ? 0.9 : 0.6}
                  className="transition-colors duration-[var(--theme-transition-duration)]"
                />
              </motion.g>

              {/* 7. Inner Core Background Housing */}
              <circle
                cx="100"
                cy="100"
                r="44"
                fill="var(--surface)"
                stroke="var(--border)"
                strokeWidth="1.2"
                className="transition-colors duration-[var(--theme-transition-duration)]"
              />

              {/* Layer 5: Pulsing Radial Energy Core with Elevated Pulse on Hover */}
              <motion.circle
                cx="100"
                cy="100"
                r="38"
                fill="url(#reactorCoreGradient)"
                animate={
                  isReduced
                    ? { scale: 1, opacity: 0.85 }
                    : {
                      scale: isHovered ? [0.96, 1.12, 0.96] : [0.94, 1.06, 0.94],
                      opacity: isHovered ? [0.85, 1, 0.85] : [0.75, 0.95, 0.75],
                    }
                }
                transition={{
                  repeat: Infinity,
                  duration: isHovered ? 2.0 : 3.0,
                  ease: 'easeInOut',
                }}
                style={{ originX: '100px', originY: '100px' }}
              />

              {/* Layer 4D: Core Cardinal Reticle (Continuous Counter-Clockwise Rotation) */}
              <motion.g style={{ rotate: angle4, transformOrigin: '100px 100px' }}>
                <line
                  x1="100"
                  y1="72"
                  x2="100"
                  y2="84"
                  stroke="var(--accent-bright)"
                  strokeWidth="1.2"
                  opacity={isHovered ? 1 : 0.8}
                />
                <line
                  x1="100"
                  y1="116"
                  x2="100"
                  y2="128"
                  stroke="var(--accent-bright)"
                  strokeWidth="1.2"
                  opacity={isHovered ? 1 : 0.8}
                />
                <line
                  x1="72"
                  y1="100"
                  x2="84"
                  y2="100"
                  stroke="var(--accent-bright)"
                  strokeWidth="1.2"
                  opacity={isHovered ? 1 : 0.8}
                />
                <line
                  x1="116"
                  y1="100"
                  x2="128"
                  y2="100"
                  stroke="var(--accent-bright)"
                  strokeWidth="1.2"
                  opacity={isHovered ? 1 : 0.8}
                />
              </motion.g>

              {/* Center Micro Core Dot */}
              <circle
                cx="100"
                cy="100"
                r={isHovered ? 3.6 : 3}
                fill="var(--accent-bright)"
                className="transition-[r] duration-200"
              />
            </svg>
          </motion.div>
        </motion.div>
      </button>

      {/* Interactive Helper Label */}
      {showLabels && (
        <div className="mt-4 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)] transition-colors duration-300">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            <span>THEME: {activeTheme}</span>
          </div>
        </div>
      )}
    </div>
  );
}
