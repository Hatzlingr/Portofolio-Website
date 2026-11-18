# Design System — Emerald Portfolio

## 1. Design Direction

### Concept
A minimalist futuristic personal portfolio inspired by Green Lantern aesthetics. Use the visual language of emerald energy and a restrained alternate yellow theme, without reproducing character artwork or turning the page into a busy sci-fi dashboard.

### Visual Keywords
- Minimalist
- Futuristic
- Clean
- Technical
- Confident
- Subtle sci-fi

### Reference Hierarchy
1. The supplied desktop reference screenshot defines the overall layout and visual restraint.
2. This design document defines colors, components, interactions, and motion.
3. Installed design skills can provide suggestions, but must not override explicit project decisions without approval.

## 2. Color Tokens

### Emerald Theme — Default
- `--background`: `#050807`
- `--surface`: `#0A1510`
- `--surface-raised`: `#0D1B13`
- `--accent`: `#00E676`
- `--accent-bright`: `#39FF88`
- `--text`: `#E8F5EC`
- `--text-muted`: `#91A99A`
- `--border`: `#123A27`
- `--focus-ring`: `#39FF88`

### Yellow Theme
- `--background`: `#080704`
- `--surface`: `#171407`
- `--surface-raised`: `#211B08`
- `--accent`: `#FFC400`
- `--accent-bright`: `#FFE45C`
- `--text`: `#F8F3DF`
- `--text-muted`: `#B4A982`
- `--border`: `#4B3B10`
- `--focus-ring`: `#FFE45C`

### Color Rules
- Define theme colors centrally as CSS custom properties, preferably on a root element with a theme attribute.
- Emerald is the initial state.
- Switch the full palette, not only the orb.
- Use the accent for active navigation, small highlights, outlines, focus indicators, and selected details.
- Keep most surfaces near-black.
- Check contrast for text and controls in both themes.
- Avoid hardcoding theme-specific colors inside individual components when a token exists.

## 3. Desktop Layout

### Overall Structure
- Fixed vertical sidebar on the left.
- Flexible main content region to the right.
- Main document uses normal vertical scrolling; the sidebar remains fixed/visible.
- Target sidebar width: approximately 170–190 px on ordinary desktop screens, adjusted only where viewport constraints require it.
- The main region should have comfortable horizontal padding and readable content widths.

### Sidebar
- Full viewport height.
- Near-black surface.
- Subtle one-pixel right border using the current theme's border token.
- Compact brand near the top: small circular emerald mark and `MirrDev` label.
- Vertical section links: Home, About, Projects, Skills, Experiences, Contact.
- Compact outlined `Let's Connect` CTA near the bottom.
- A restrained active indicator and a consistent vertical rhythm.
- Avoid oversized icons and unnecessary decorative geometry.

### Main Content
- Spacious hero composition and portfolio sections.
- No unnecessary frame around the main area.
- Do not wrap every section in a card.
- Use whitespace and typography to establish hierarchy.
- Keep content clear rather than filling empty space with decoration.

## 4. Responsive Layout

### Tablet
- Keep the sidebar only when there is enough width for readable navigation and content.
- Reduce spacing and content padding as necessary.
- Prevent collisions and awkward wrapping.

### Mobile
- Replace the desktop sidebar with a compact header or accessible collapsible navigation.
- Use touch-friendly targets.
- Stack hero content naturally and size the orb to fit.
- Do not rely on hover for any essential action.
- Avoid horizontal overflow.

## 5. Typography
- Prefer Geist or Inter if available in the existing project.
- Use a clean sans-serif family.
- Establish a clear hierarchy for section headings, hero title, body copy, navigation, and metadata.
- Keep navigation typography compact but legible.
- Avoid decorative display fonts and excessive letter spacing.

## 6. Orb Visual System

### Implementation
- Build the orb as a reusable React component using inline SVG, CSS, and Motion from `motion/react`.
- Do not use a static PNG as the primary orb rendering.
- Keep SVG viewBox and proportions responsive.
- Build from layered primitives: concentric circles, segmented arcs, radial ticks, a geometric inner core, short guide lines, and restrained glow.
- Use the theme tokens for emerald/yellow color changes.
- Keep the transparent surrounding area clean; do not add a large background illustration.

### Layered Architecture
To ensure independent, non-conflicting transform behaviors, separate the orb into discrete architectural layers:
1. **Outer Motion Wrapper:** Handles pointer-hover scaling (1.06–1.10) with smooth 250–400ms spring/ease curves without interfering with internal rotations.
2. **Ambient Light Spill & Glow Layer:** Positioned directly behind the SVG. Transitions in opacity and scale on hover, casting a soft radial light spill tinted by the active preview theme (`var(--accent)`).
3. **Activation Container:** Handles the 3D Y-axis flip (`rotateY: 180deg`) upon theme commit/toggle, isolated from ring rotations.
4. **Independent SVG Ring Groups:** Multiple SVG `<motion.g>` / `<g>` layers rotating at distinct speeds and opposing directions around `transformOrigin: "160px 160px"`. Rotation accelerates smoothly during hover and continues indefinitely while hovered.
5. **Inner Core Geometry & Pulse:** Concentric diamond geometry and central focal point that pulses rhythmically, intensifying in brightness when hovered.

### Animation States
1. **Idle:** Smooth, slow multi-ring rotation at relaxed speeds (e.g. 70s, 50s, 36s) in alternating directions with a gentle inner-core pulse.
2. **Desktop Hover:**
   - Outer container scales smoothly to ~1.08 with a 300ms ease curve (`[0.16, 1, 0.3, 1]`).
   - SVG ring layers accelerate into faster continuous rotation (e.g. 18s, 14s, 10s) and continue spinning smoothly for the duration of the hover without resetting.
   - Ambient glow intensifies with an expanded radial light spill reflecting the hovered preview theme.
   - Inner core pulses with elevated brightness.
   - Pointer leave smoothly restores idle speeds, scale, and glow without abrupt visual jumps.
3. **Activation:** Clicking or tapping commits the alternate theme and triggers a quick 3D flip (`rotateY: 180deg`) over ~600ms. Hover preview is immediately dismissed and the committed theme is saved.
4. **Reduced Motion:** If `prefers-reduced-motion` is active, disable continuous rotation loops, scale changes, and 3D flip travel. Preserve instantaneous or gentle opacity-only feedback and theme switching functionality.

### Theme Interaction Contract
- Initial selected theme: emerald.
- On desktop pointer enter, preview the alternate yellow theme (or emerald if currently yellow) and activate hover scale, continuous rotation, and light spill.
- On pointer leave, restore the selected theme and return to idle animation parameters unless committed.
- On click/tap, animate the activation flip and commit/toggle the selected theme in `ThemeContext` and `localStorage`.
- On touch devices, tap is the primary interaction; hover preview is bypassed to prevent sticky hover states.
- Prevent duplicate theme toggles between consecutive pointer and click events.
- Keyboard users must be able to focus the semantic `<button>` control with visible focus ring (`focus-visible:ring-2 focus-visible:ring-focus-ring`) and toggle via Enter/Space.
- Provide an accessible label that states the current theme and the target switch theme.

---

## 7. First-Load and Scroll-Reveal Animations

### Initial Hero Entrance
On first page visit, orchestrate a brief, non-blocking entrance sequence:
1. Eyebrow badge: fades in and translates upward subtly (-8px to 0, ~400ms).
2. Primary headline: follows with slight upward ease (-12px to 0, ~450ms).
3. Subtitle / lead description: enters next (~450ms).
4. Action buttons: enter with a modest stagger (~450ms).
5. ThemeOrb: fades in and scales gently from 0.94 to 1.0 (~550ms) into its idle state.
6. Sidebar brand & navigation: enter subtly without blocking layout stability or delaying interaction.

Content remains immediately accessible and usable even if scripts or animations are interrupted.

### Viewport Scroll-Reveal Animations
Sections and structured groups reveal progressively as they scroll into view:
- **Scope:** About section, Projects section header and cards, Skills categories, Experience timeline entries, Contact cards and channel directory, and Footer.
- **Trigger:** Viewport observation via Motion's `whileInView` or `useInView` with `viewport: { once: true, margin: "-60px" }`.
- **Motion Parameters:** Subtle upward translation (18–28px, typically `y: 20px` to `y: 0`) coupled with opacity (`opacity: 0` to `opacity: 1`).
- **Timing:** Brief duration (400–500ms) with understated ease-out curves (`[0.16, 1, 0.3, 1]`). Grouped children (e.g. project cards, timeline items) stagger at ~80–120ms intervals.
- **Stability:** Elements trigger once upon entering the viewport; animations do not replay on subsequent scrolls or theme switches. No cumulative layout shift.
- **Reduced Motion:** When `prefers-reduced-motion` is enabled, disable upward translations entirely and render content at full opacity without delay.

---

## 8. Project Cards: Space Glassmorphism

### Visual Direction
Project items in `Projects.tsx` are designed as refined "space-glass" floating artifacts against the near-black emerald/yellow void:
- **Surface:** Deep semi-transparent smoked glass (`bg-surface/50` or `bg-surface/60`).
- **Backdrop Filter:** Subtle blur (`backdrop-blur-md`) giving optical depth without blurring readability.
- **Borders:** Crisp, thin translucent border (`border border-border/60`).
- **Inner Highlight:** Subtle top highlight reflection (`shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]`).
- **Ambient Shadow:** Restrained space ambient drop shadow (`shadow-[0_8px_32px_rgba(0,0,0,0.36)]`).
- **Typography & Layout:** Generous internal padding (p-6 to p-8), strong font hierarchy, legible muted body copy, and clean technology chips.

### Interactive Card Behavior
- **Hover Lift:** Translates upward smoothly by 3–5px (`-translate-y-1` / `y: -4px`) over 250–300ms.
- **Border & Surface:** Border brightens to `border-accent/40`, surface shifts subtly to `bg-surface-raised/60`.
- **Glow Intensification:** Shadow deepens with an added subtle accent glow spill (`shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_20px_var(--accent)/12]`).
- **Action Links:** Repository and Live Demo links feature responsive hover feedback with theme accent highlights and micro-movement on external link icons.
- **Accessibility & Contrast:** High contrast text (`--text` and `--text-muted`) is maintained across both emerald and yellow themes. Full keyboard focusability with visible rings.

### Design Discipline & Boundaries
- Glassmorphism is applied selectively to project cards to create a focal hierarchy; it is not blanketed across every section or layout container.
- Avoid excessive blur, glaring shadows, thick outlines, or gratuitous gradients.

---

## 8b. About Section: Two-Tier Composition & Portrait Contour Glow

### Layout Composition
The About section is structured into two deliberate vertical tiers:
1. **Upper Tier (Biography & Portrait):**
   - A balanced 2-column editorial grid (`grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center`).
   - **Left Column (`lg:col-span-7`):** The narrative story and engineering philosophy. Line length is constrained (`max-w-2xl`, < 75 characters per line) with generous paragraph rhythm for optimal reading ease.
   - **Right Column (`lg:col-span-5`):** A dedicated, uncluttered portrait area showcasing a transparent-background photo (`/images/profile.png`) without enclosing it in a heavy generic card or confining frame.

2. **Lower Tier (Information Cards):**
   - Positioned beneath the narrative and portrait as a grounding horizontal foundation.
   - A full-width 3-equal-column grid (`grid-cols-1 md:grid-cols-3 gap-6`) presenting key academic and operational context: *Education*, *Primary Focus*, and *Location*.
   - Styled with dark translucent smoked surfaces (`bg-[var(--surface)]/50 backdrop-blur-md border border-[var(--border)]/70 rounded-2xl p-6`), subtle inner highlight lines, theme-accented utility icons, and responsive stacking on mobile.

### Portrait Specification & Emerald Contour Glow
- **Asset Source:** Preferred path `/images/profile.png` placed in `public/images/profile.png`. Designed for a transparent PNG cut-out of the subject.
- **Aspect Ratio & CLS Prevention:** Strict 4:5 aspect ratio wrapper (`aspect-[4/5]`) with fixed max-width (`max-w-[340px] sm:max-w-[360px] mx-auto`) preserving exact layout geometry and completely preventing Cumulative Layout Shift.
- **Lateral Emerald Glow:**
  - Ambient energy emanates strictly from behind the left and right contours of the subject using dual lateral radial gradients (`radial-gradient(ellipse at left/right, var(--accent) 0%, var(--accent-glow) 45%, transparent 75%)`).
  - Positioned on a lower z-index (`z-0`) behind the transparent subject (`z-10`). This creates a futuristic rim light and subtle edge contour illumination while leaving the subject's face, skin tones, and clothing completely natural and unpolluted by green tinting.
  - Zero horizontal overflow via constrained bounds (`overflow-hidden` container limits) and soft outer blur (`blur-2xl`).
- **Asset Fallback & Resilience:**
  - When the personal asset is pending or unsupplied, the interface renders a high-tech HUD coordinate frame and minimalist silhouette with clear replacement guidance (`[ PORTRAIT // /images/profile.png ]`), maintaining architectural integrity and preventing 404 broken visual states.

---

## 9. Hover, Focus, and Press Feedback

### Interactive Elements
Apply intentional feedback to buttons, sidebar links, mobile navigation items, project cards, action links, and social channels.

### Hover
- Use theme-accent color/border transition.
- Explicit transition properties (e.g. `transition-[transform,opacity,border-color,background-color,box-shadow]`) avoiding `transition: all`.
- Short durations (150–220ms for buttons and links, 250–350ms for cards and orb).
- Stable layout geometry with zero cumulative layout shift.

### Active / Pressed
- Immediate tactile feedback: `active:scale-[0.98]` or small elevation decrease.

### Keyboard Focus
- Every interactive element requires visible focus: `focus-visible:ring-2 focus-visible:ring-focus-ring` with `focus-visible:outline-none`.
- Distinct in both emerald and yellow themes.

### Touch & Accessibility
- Touch targets satisfy 44×44px minimum sizing where appropriate.
- Touch does not rely on hover states.
- Respect `prefers-reduced-motion: reduce`.

---

## 10. Component Inventory
- `Sidebar`
- `SidebarNavItem`
- `MobileNav`
- `Hero`
- `ThemeOrb`
- `About`
- `Projects` (Space Glassmorphism cards)
- `Skills`
- `Experiences`
- `Contact`
- `Footer`

---

## 11. Content Presentation
- Use verified personal and project information only.
- Centralized data in `src/data/portfolio-data.ts`.
- No fabricated metrics, fake URLs, or arbitrary skill score percentages.

---

## 12. Explicitly Avoid
- Generic SaaS templates or card kits.
- Applying glassmorphism to every section.
- Static PNG as the ThemeOrb visual.
- Continuous animation loops that ignore `prefers-reduced-motion`.
- Uncontrolled animation loops or competing transforms on the same SVG element.
- Motion that delays user access or causes layout shift.
