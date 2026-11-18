# Implementation Plan

## Project
Emerald Portfolio

## Current Status
- Application structure, theming, layout, content sections, and orb interaction are implemented.
- **Track A (Animation & Theme Transition Alignment) is complete and visually approved by the owner.**
- **Track B (App Router & Rendering Refactor) is complete.**
- **Track C (Next.js Conventions & Quality Polish) is complete.**
- **Next.js security upgrade complete:** `next` and `eslint-config-next` bumped 16.4.3 → 16.4.6 (patched release) via `next upgrade --agent=security`, applied and committed in place on `main`.
- `tsc --noEmit`, `eslint`, and `npm run build` (Turbopack compile, TypeScript, and static prerender) all pass — the build no longer stops on the security advisory.

## Objective
Keep a responsive personal portfolio faithful to `docs/PRD.md` and `docs/design.md`:
- Fixed vertical sidebar, spacious near-black main area.
- Restrained emerald accents with an interactive orb that switches the entire palette to yellow.
- Motion that is subtle, purposeful, reduced-motion aware, and free of layout shift.
- A modern App Router structure with clean server/client boundaries.

## Verified Baseline (tracked deviations)
| # | Area | Deviation found | Status |
|---|---|---|---|
| 1 | Hero entrance | Animated from below instead of above | Fixed (Track A) |
| 2 | Hero orb entrance | Scale started at 0.92 instead of 0.94 | Fixed (Track A) |
| 3 | Orb ring speeds | Did not match 70/50/36s idle → 18/14/10s hover | Fixed (Track A) |
| 4 | Orb hover scale | 350ms vs spec 300ms | Fixed (Track A) |
| 5 | Orb glow colours | Hardcoded RGBA per theme | Fixed (Track A) |
| 6 | Orb core | Per-theme `isYellow` special cases | Fixed (Track A) |
| 7 | Focus ring token | `--focus-ring` never registered | Fixed (Track A) |
| 8 | `duration-400` | Not a Tailwind v4 utility | Fixed (Track A) |
| 9 | Theme fade timing | Mixed durations across page | Fixed (Track A) |
| 10 | Project cards | Glass tokens diverged from spec | Fixed (Track A) |
| 11 | About cards | Hover below the card minimum | Fixed (Track A) |
| 12 | Footer reveal | `y: 16` outside the 18–28px range | Fixed (Track A) |
| 13 | `PortraitPlaceholder` | `"use client"` on a hook-free component | Fixed (Track B) |
| 14 | Theme first paint | `data-theme` applied after hydration → yellow flash | Fixed (Track B) |
| 15 | App Router files | No `loading` / `error` / `not-found` | Fixed (Track C) |
| 16 | Sidebar width | Hardcoded `180px` in `page.tsx` | Fixed (Track A) |
| 17 | Page shell | `page.tsx` was a full Client Component | Fixed (Track B) |
| 18 | Focus rings | `ring-1` + hardcoded accent on two controls | Fixed (Track C) |
| 19 | Touch targets | Several controls under 44×44px | Fixed (Track C) |
| 20 | `transition-all` | Used on Contact actions (spec forbids it) | Fixed (Track C) |
| 21 | Security advisory | `next build` blocks on advisory | Fixed — upgraded to 16.4.6 |

## Track A — Animation & Theme Transition Alignment (COMPLETE)
- Central design tokens in `globals.css`: `--surface-raised`, `--focus-ring`, `--accent-rgb`, `--color-focus-ring`, `--duration-400`, and a single `--theme-transition-duration` (350ms).
- Hero entrance from above, orb `scale 0.94 → 1`.
- Orb ring periods match the spec; hover scale 300ms; glow derived from tokens.
- Project/About card tokens aligned; footer reveal at 20px; sidebar width from `--sidebar-width`.

## Track B — App Router & Rendering Refactor (COMPLETE)

### B1. Pre-hydration theme script (`src/app/layout.tsx`)
- Added an inline `<script>` in `<head>` that reads `localStorage` and sets `data-theme="yellow"` before first paint, following `docs/01-app/02-guides/preventing-flash-before-hydration.md`.
- Added `suppressHydrationWarning` to `<html>` so React accepts the DOM the script adjusted.

### B2. Dev remount repair (`src/context/ThemeContext.tsx`)
- Added a mount-only `useLayoutEffect` that re-applies the persisted theme, covering React Strict Mode's dev remount that resets `<html>` attributes. No-op in production.

### B3. Server-first page shell (`src/app/page.tsx`)
- Removed `"use client"`; the page is now a Server Component that composes the client section entry points.
- Each section keeps its own `"use client"` boundary, so only those subtrees ship to the browser.

### B4. Boundary cleanup (`src/components/sections/about/PortraitPlaceholder.tsx`)
- Removed the unnecessary `"use client"` from the hook-free placeholder.

### B5. Icon decision (`src/components/Icons.tsx`)
- Lucide React v1.x **removed third-party brand icons** (verified: `Github`, `Linkedin` are absent), so consolidating would lose the GitHub/LinkedIn marks. Kept the local SVGs, added a rationale comment, and made them decorative (`aria-hidden`, `focusable="false"`) since callers supply the accessible name on the link.

### B6. `<main>` focus handling
- Removed the unexplained `tabIndex={-1}` and replaced it with a proper **"Skip to content"** skip link targeting `#main-content`.

## Track C — Next.js Conventions & Quality Polish (COMPLETE)

### C1. App Router special files
- `src/app/not-found.tsx` — themed 404 inside the root layout with a "Return Home" link.
- `src/app/error.tsx` — Client Component error boundary using the stable `retry` prop (v16.3.0+), logging the error and showing its digest.
- `src/app/loading.tsx` — lightweight suspended-state indicator with `role="status"` and an `sr-only` label.

### C2. Focus-ring audit
- `MobileNav` menu toggle: `ring-1` + hardcoded accent → `ring-2 ring-focus-ring`.
- `Sidebar` nav links: `ring-1` → `ring-2`.
- `MobileNav` theme badge button: **had no focus ring** → added `ring-2 ring-focus-ring`.

### C3. Touch targets & press feedback
- Mobile theme badge and menu toggle raised to 44px minimum.
- Project action links raised to 44×44px targets with a negative margin so card layout is unchanged.
- Contact copy/send buttons raised from 36px to 44px.
- `active:scale-95` → `active:scale-[0.98]` across Hero, Contact, and the orb, per design §9.
- Contact actions switched from `transition-all` to explicit transition properties.

### C4. Next.js security upgrade
- Ran `next upgrade --agent=security` against target 16.4.6 (a patched release for a published security advisory affecting 16.4.3).
- Bumped `next` and `eslint-config-next` to 16.4.6, kept them **exactly pinned** (reverted npm's `^` caret so installs cannot drift off a verified patch), and regenerated `package-lock.json`.
- Added `experimental.agentUpgrade: "security"` to `next.config.ts` per the upgrade instructions, preserving the existing `agentFeedback` and `turbopack` configuration.
- Applied in place on `main` (no separate worktree), committed as a single dependency commit.
- Incident during install: a running `next dev` server held the previous SWC native binary, causing `EPERM` and leaving a stale `@next/.swc-*` directory. The dev server was stopped, the orphan removed, and dependencies reinstalled cleanly. The dev server must be restarted by the owner.

## Verification
- `npx tsc --noEmit`: passes.
- `npm run lint`: passes.
- `npm run build`: Turbopack compile, TypeScript, and static generation pass with exit code 0; the security advisory no longer blocks the build.
- Prerendered HTML inspected: theme script present in `<head>`, `--sidebar-width` used, skip link rendered, `id="main-content"` present, `tabindex="-1"` gone, `_not-found` route generated with theme tokens.

## Remaining / Not Verified
- Real-browser verification of Tracks B and C (flash of yellow on reload, skip link, 404, error boundary, mobile nav focus and tap targets) has not been performed by an automated browser; the owner should confirm.
- `npm audit` still reports advisories in transitive **dev** dependencies; these are unrelated to the Next.js advisory and were intentionally left untouched.

## Scope Restrictions
- No backend, database, or authentication.
- No new dependencies without approval.
- No fabricated personal details or project metrics.
- No deployment without explicit approval.