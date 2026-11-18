# AI Agent Instructions

## Project Overview
This project is a personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.

The visual direction is minimalist, futuristic, and inspired by Green Lantern aesthetics. The website uses an emerald theme with an interactive transition to a yellow theme.

## Before Starting Any Task
1. Read `task.md`.
2. Read `implementation_plan.md`.
3. Read `docs/PRD.md`.
4. Read `docs/design.md`.
5. Inspect the existing project structure and source code.
6. Understand the current implementation before modifying files.

## Development Rules
- Use Next.js App Router.
- Use TypeScript.
- Use Tailwind CSS for styling.
- Use Motion for animations.
- Use Lucide React for icons.
- Follow the existing project structure.
- Prefer reusable components.
- Keep components small and focused.
- Use semantic HTML.
- Keep the implementation responsive.
- Follow accessibility best practices.

## Dependency Rules
- Do not install new dependencies without approval.
- Prefer existing dependencies when possible.
- Do not introduce unnecessary libraries.

## Design Rules
- Follow `docs/design.md`.
- Do not replace the visual direction with a generic portfolio template.
- Avoid excessive gradients, glow effects, cards, and animations.
- Keep the interface clean, polished, and readable.
- Prioritize the actual content over decorative elements.

## Implementation Workflow
1. Inspect the current codebase.
2. Explain the proposed implementation.
3. Update `implementation_plan.md` when necessary.
4. Implement only the approved scope.
5. Update `task.md` after completing tasks.
6. Update `progress.md` if it exists.
7. Run relevant checks.

## Safety Rules
- Do not delete files without approval.
- Do not overwrite existing work without inspecting it.
- Do not change project architecture without approval.
- Do not expose secrets, API keys, or credentials.
- Do not make unrelated changes.

## Quality Checks
Before declaring a task complete:
- Check for TypeScript errors.
- Check for lint errors.
- Test responsive behavior where relevant.
- Run `npm run build` after major implementation changes.
- Report any remaining issues honestly.

## Communication
- Explain what files will be changed.
- Summarize important implementation decisions.
- Mention any assumptions.
- Do not claim something was tested unless it was actually tested.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->
