# Emerald Portfolio — Task Checklist

## Current State
- [x] Inspect and confirm the fresh Next.js scaffold and installed dependencies.
- [x] Confirm the intended official skills (`frontend-design` and `web-design-guidelines` installed; `react-best-practices` not present).
- [x] Review these documents before source-code implementation.
- [x] UI implementation verified complete across all sections.
- [x] Audit animations and theme transitions against `docs/design.md`.
- [x] Track A — Animation & theme transition alignment implemented, checked, and owner-approved.
- [x] Track B — App Router & rendering refactor implemented and statically checked.
- [x] Track C — App Router special files, focus audit, and touch-target polish implemented and statically checked.
- [x] Next.js security upgrade applied (16.4.3 → 16.4.6); `npm run build` now passes.

> Only mark an item complete after the work has been performed and checked. If a task is already complete in the workspace, verify it before changing its status.

## Phase 1 — Project Foundation
- [x] Inspect `package.json`, Next.js version, scripts, and current source structure.
- [x] Read the relevant version-matched Next.js docs in `node_modules/next/dist/docs/`.
- [x] Confirm `motion` and `lucide-react` are installed; request approval before adding missing dependencies.
- [x] Confirm `frontend-design` and `web-design-guidelines` skills are available and read their `SKILL.md` files.
- [x] Define centralized emerald/yellow theme variables.
- [x] Define typography, spacing, border, focus, and motion tokens.

## Phase 2 — Layout and Navigation
- [x] Build fixed desktop sidebar.
- [x] Add compact brand mark and `MirrDev` label.
- [x] Add Home, About, Projects, Skills, Experiences, and Contact navigation.
- [x] Add outlined `Let's Connect` CTA.
- [x] Add section anchors and active navigation state.
- [x] Build responsive mobile navigation.
- [x] Add hover, pressed, active, and keyboard-focus feedback to navigation and CTA elements.

## Phase 3 — First-Load and Scroll-Reveal Motion
- [x] Add a restrained one-time page entrance animation for hero content.
- [x] Implement orchestrated hero entrance with staggered typography, CTA buttons, and orb resting scale.
- [x] Implement viewport scroll-reveal animations (`whileInView`) for About, Projects, Skills, Experiences, Contact, and Footer.
- [x] Ensure scroll animations trigger once (`viewport: { once: true }`) without layout shifts.
- [x] Respect `prefers-reduced-motion` and avoid hiding content when motion is disabled.

## Phase 4 — SVG Orb and Theme System
- [x] Build reusable `ThemeOrb` using inline SVG, CSS, and Motion.
- [x] Create concentric rings, segmented arcs, radial ticks, geometric core, and restrained glow.
- [x] Implement layered orb architecture: separate outer scale wrapper, ambient light spill, 3D flip activation container, independent rotating SVG ring groups, and glowing inner core.
- [x] Implement smooth desktop hover scale (1.06–1.10) with 250–400ms transition.
- [x] Implement continuous, multi-layer SVG ring rotation that accelerates on hover and spins continuously without resets.
- [x] Implement active preview theme light spill and intensified glow on hover.
- [x] Coordinate the theme switch with the orb flip without abrupt flicker.
- [x] Support emerald and yellow theme states across the entire website.
- [x] Support desktop hover preview and restore the selected theme on pointer leave when the alternate theme was not committed.
- [x] Support click/tap to commit/toggle the selected theme.
- [x] Support keyboard activation and visible focus state.
- [x] Avoid conflicts between hover preview, click, touch, and animation state.
- [x] Respect `prefers-reduced-motion`.

## Phase 5 — Portfolio Content & Space Glassmorphism
- [x] Build Hero section.
- [x] Build About section.
- [x] Redesign Projects section items into refined Space Glassmorphism cards (smoked glass, backdrop blur, translucent borders, subtle inner highlights, ambient drop shadow).
- [x] Implement card hover lift (3–5px) and glow intensification with smooth transition.
- [x] Build Skills section without fabricated proficiency scores.
- [x] Build Experiences section using verified information only.
- [x] Build Contact section using confirmed links/details only.
- [x] Build a restrained footer.
- [x] Keep editable portfolio content in a centralized data module where appropriate.

## Phase 6 — Responsive Design and Interaction Polish
- [x] Verify desktop sidebar and content spacing.
- [x] Verify tablet layout.
- [x] Verify mobile navigation and tap targets.
- [x] Add subtle hover transitions to buttons, links, navigation items, project links, and other truly interactive elements.
- [x] Add equivalent focus-visible states for keyboard users.
- [x] Add subtle press/tap feedback where appropriate.
- [x] Ensure hover effects do not shift surrounding layout.
- [x] Check reduced-motion mode.
- [x] Check text contrast in both themes.
- [x] Check for horizontal overflow and layout shift.

## Phase 7 — Quality Assurance
- [x] Run the project's lint script.
- [x] Run TypeScript validation if configured.
- [x] Run `npm run build`.
- [x] Test navigation and section anchors.
- [x] Test first-load animation.
- [x] Test orb hover preview, flip, theme toggle, touch, and keyboard interaction.
- [x] Verify reduced-motion behavior.
- [ ] Inspect actual desktop and mobile browser renders when tooling is available.
- [x] Run the Vercel web-design-guidelines review if the skill is available.
- [x] Fix concrete defects and report any outstanding issues.

## Phase 8 — Deployment Preparation
- [x] Verify metadata and page title.
- [ ] Verify links and contact destinations.
- [x] Verify production build.
- [ ] Prepare deployment instructions.
- [ ] Deploy only after explicit approval.

## Phase 9 — Track A: Animation & Theme Transition Alignment
- [x] Add/register missing tokens: `--surface-raised`, `--focus-ring`, `--accent-rgb`, `--color-focus-ring`.
- [x] Register `--duration-400` and apply `--theme-transition-duration` to the global palette cross-fade.
- [x] Fix hero entrance direction (`y: -8/-12` from above) and orb entrance scale (0.94 → 1.0).
- [x] Align orb idle ring periods (70/50/36s) and hover periods (18/14/10s) without angle resets.
- [x] Set orb hover scale to 300ms with the shared ease curve.
- [x] Derive orb ambient glow and SVG colours from theme tokens; remove `isYellow` special cases.
- [x] Align project card glass tokens with the Space Glassmorphism spec; remove the unspecified shimmer.
- [x] Raise About card hover transition into the 250–350ms card range.
- [x] Move footer reveal into the 18–28px range.
- [x] Replace hardcoded sidebar width with `--sidebar-width`; unify theme-fade timing.
- [x] `npx tsc --noEmit`, `npm run lint`, and the Turbopack compile pass.
- [ ] Owner verifies the animations and emerald↔yellow transition in a real browser.

## Phase 10 — Track B: App Router & Rendering Refactor
- [x] Prevent the yellow first-paint flash with a pre-hydration theme script in `layout.tsx` (+ `suppressHydrationWarning`).
- [x] Re-apply the persisted theme on mount for React Strict Mode dev remounts (`useLayoutEffect` in `ThemeContext`).
- [x] Convert `page.tsx` into a Server Component shell with per-section client boundaries.
- [x] Remove the client directive from `PortraitPlaceholder` (hook-free).
- [x] Keep `Icons.tsx` local — Lucide v1.x no longer ships brand icons — and mark the SVGs decorative.
- [x] Replace the `-1` tab index on `<main>` with a "Skip to content" skip link to `#main-content`.
- [ ] Owner verifies the no-flash reload, skip link, and boundaries in a real browser.

## Phase 11 — Track C: Next.js Conventions & Quality Polish
- [x] Add `not-found.tsx`, `error.tsx` (using the stable `retry` prop), and `loading.tsx`.
- [x] Re-audit focus-visible rings; fix `ring-1` usages and add the missing mobile theme-badge ring.
- [x] Raise mobile theme badge, menu toggle, project links, and contact actions to 44px touch targets.
- [x] Replace `active:scale-95` with `active:scale-[0.98]` and remove `transition-all` on Contact actions.
- [x] `npx tsc --noEmit`, `npm run lint`, and `npm run build` (compile + prerender) pass.
- [x] Inspect prerendered HTML for the theme script, skip link, sidebar variable, and `_not-found` route.
- [x] Re-verify reduced-motion behaviour is unaffected by the Track B/C changes (all new UI avoids required motion).
- [x] Run `next upgrade --agent=security`: upgraded Next.js 16.4.3 → 16.4.6 in place on `main` and committed.
- [ ] Owner verifies the 404 page, error boundary, and mobile navigation in a real browser.
