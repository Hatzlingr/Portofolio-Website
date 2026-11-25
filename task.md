# Emerald Portfolio — Task Checklist

## Current State

- [X] Inspect and confirm the fresh Next.js scaffold and installed dependencies.
- [X] Confirm the intended official skills (`frontend-design` and `web-design-guidelines` installed; `react-best-practices` not present).
- [X] Review these documents before source-code implementation.
- [X] UI implementation verified complete across all sections.
- [X] Audit animations and theme transitions against `docs/design.md`.
- [X] Track A — Animation & theme transition alignment implemented, checked, and owner-approved.
- [X] Track B — App Router & rendering refactor implemented and statically checked.
- [X] Track C — App Router special files, focus audit, and touch-target polish implemented and statically checked.
- [X] Next.js security upgrade applied (16.4.3 → 16.4.6); `npm run build` now passes.

> Only mark an item complete after the work has been performed and checked. If a task is already complete in the workspace, verify it before changing its status.

## Phase 1 — Project Foundation

- [X] Inspect `package.json`, Next.js version, scripts, and current source structure.
- [X] Read the relevant version-matched Next.js docs in `node_modules/next/dist/docs/`.
- [X] Confirm `motion` and `lucide-react` are installed; request approval before adding missing dependencies.
- [X] Confirm `frontend-design` and `web-design-guidelines` skills are available and read their `SKILL.md` files.
- [X] Define centralized emerald/yellow theme variables.
- [X] Define typography, spacing, border, focus, and motion tokens.

## Phase 2 — Layout and Navigation

- [X] Build fixed desktop sidebar.
- [X] Add compact brand mark and `MirrDev` label.
- [X] Add Home, About, Projects, Skills, Experiences, and Contact navigation.
- [X] Add outlined `Let's Connect` CTA.
- [X] Add section anchors and active navigation state.
- [X] Build responsive mobile navigation.
- [X] Add hover, pressed, active, and keyboard-focus feedback to navigation and CTA elements.

## Phase 3 — First-Load and Scroll-Reveal Motion

- [X] Add a restrained one-time page entrance animation for hero content.
- [X] Implement orchestrated hero entrance with staggered typography, CTA buttons, and orb resting scale.
- [X] Implement viewport scroll-reveal animations (`whileInView`) for About, Projects, Skills, Experiences, Contact, and Footer.
- [X] Ensure scroll animations trigger once (`viewport: { once: true }`) without layout shifts.
- [X] Respect `prefers-reduced-motion` and avoid hiding content when motion is disabled.

## Phase 4 — SVG Orb and Theme System

- [X] Build reusable `ThemeOrb` using inline SVG, CSS, and Motion.
- [X] Create concentric rings, segmented arcs, radial ticks, geometric core, and restrained glow.
- [X] Implement layered orb architecture: separate outer scale wrapper, ambient light spill, 3D flip activation container, independent rotating SVG ring groups, and glowing inner core.
- [X] Implement smooth desktop hover scale (1.06–1.10) with 250–400ms transition.
- [X] Implement continuous, multi-layer SVG ring rotation that accelerates on hover and spins continuously without resets.
- [X] Implement active preview theme light spill and intensified glow on hover.
- [X] Coordinate the theme switch with the orb flip without abrupt flicker.
- [X] Support emerald and yellow theme states across the entire website.
- [X] Support desktop hover preview and restore the selected theme on pointer leave when the alternate theme was not committed.
- [X] Support click/tap to commit/toggle the selected theme.
- [X] Support keyboard activation and visible focus state.
- [X] Avoid conflicts between hover preview, click, touch, and animation state.
- [X] Respect `prefers-reduced-motion`.

## Phase 5 — Portfolio Content & Space Glassmorphism

- [X] Build Hero section.
- [X] Build About section.
- [X] Redesign Projects section items into refined Space Glassmorphism cards (smoked glass, backdrop blur, translucent borders, subtle inner highlights, ambient drop shadow).
- [X] Implement card hover lift (3–5px) and glow intensification with smooth transition.
- [X] Build Skills section without fabricated proficiency scores.
- [X] Build Experiences section using verified information only.
- [X] Build Contact section using confirmed links/details only.
- [X] Build a restrained footer.
- [X] Keep editable portfolio content in a centralized data module where appropriate.

## Phase 6 — Responsive Design and Interaction Polish

- [X] Verify desktop sidebar and content spacing.
- [X] Verify tablet layout.
- [X] Verify mobile navigation and tap targets.
- [X] Add subtle hover transitions to buttons, links, navigation items, project links, and other truly interactive elements.
- [X] Add equivalent focus-visible states for keyboard users.
- [X] Add subtle press/tap feedback where appropriate.
- [X] Ensure hover effects do not shift surrounding layout.
- [X] Check reduced-motion mode.
- [X] Check text contrast in both themes.
- [X] Check for horizontal overflow and layout shift.

## Phase 7 — Quality Assurance

- [X] Run the project's lint script.
- [X] Run TypeScript validation if configured.
- [X] Run `npm run build`.
- [X] Test navigation and section anchors.
- [X] Test first-load animation.
- [X] Test orb hover preview, flip, theme toggle, touch, and keyboard interaction.
- [X] Verify reduced-motion behavior.
- [ ] Inspect actual desktop and mobile browser renders when tooling is available.
- [X] Run the Vercel web-design-guidelines review if the skill is available.
- [X] Fix concrete defects and report any outstanding issues.

## Phase 8 — Deployment Preparation

- [X] Verify metadata and page title.
- [ ] Verify links and contact destinations.
- [X] Verify production build.
- [ ] Prepare deployment instructions.
- [ ] Deploy only after explicit approval.

## Phase 9 — Track A: Animation & Theme Transition Alignment

- [X] Add/register missing tokens: `--surface-raised`, `--focus-ring`, `--accent-rgb`, `--color-focus-ring`.
- [X] Register `--duration-400` and apply `--theme-transition-duration` to the global palette cross-fade.
- [X] Fix hero entrance direction (`y: -8/-12` from above) and orb entrance scale (0.94 → 1.0).
- [X] Align orb idle ring periods (70/50/36s) and hover periods (18/14/10s) without angle resets.
- [X] Set orb hover scale to 300ms with the shared ease curve.
- [X] Derive orb ambient glow and SVG colours from theme tokens; remove `isYellow` special cases.
- [X] Align project card glass tokens with the Space Glassmorphism spec; remove the unspecified shimmer.
- [X] Raise About card hover transition into the 250–350ms card range.
- [X] Move footer reveal into the 18–28px range.
- [X] Replace hardcoded sidebar width with `--sidebar-width`; unify theme-fade timing.
- [X] `npx tsc --noEmit`, `npm run lint`, and the Turbopack compile pass.
- [X] Owner verifies the animations and emerald↔yellow transition in a real browser.

## Phase 10 — Track B: App Router & Rendering Refactor

- [X] Prevent the yellow first-paint flash with a pre-hydration theme script in `layout.tsx` (+ `suppressHydrationWarning`).
- [X] Re-apply the persisted theme on mount for React Strict Mode dev remounts (`useLayoutEffect` in `ThemeContext`).
- [X] Convert `page.tsx` into a Server Component shell with per-section client boundaries.
- [X] Remove the client directive from `PortraitPlaceholder` (hook-free).
- [X] Keep `Icons.tsx` local — Lucide v1.x no longer ships brand icons — and mark the SVGs decorative.
- [X] Replace the `-1` tab index on `<main>` with a "Skip to content" skip link to `#main-content`.
- [X] Owner verifies the no-flash reload, skip link, and boundaries in a real browser.

## Phase 11 — Track C: Next.js Conventions & Quality Polish

- [X] Add `not-found.tsx`, `error.tsx` (using the stable `retry` prop), and `loading.tsx`.
- [X] Re-audit focus-visible rings; fix `ring-1` usages and add the missing mobile theme-badge ring.
- [X] Raise mobile theme badge, menu toggle, project links, and contact actions to 44px touch targets.
- [X] Replace `active:scale-95` with `active:scale-[0.98]` and remove `transition-all` on Contact actions.
- [X] `npx tsc --noEmit`, `npm run lint`, and `npm run build` (compile + prerender) pass.
- [X] Inspect prerendered HTML for the theme script, skip link, sidebar variable, and `_not-found` route.
- [X] Re-verify reduced-motion behaviour is unaffected by the Track B/C changes (all new UI avoids required motion).
- [X] Run `next upgrade --agent=security`: upgraded Next.js 16.4.3 → 16.4.6 in place on `main` and committed.
- [X] Owner verifies the 404 page, error boundary, and mobile navigation in a real browser.
