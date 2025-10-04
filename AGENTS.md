# Repository Guidelines

## Project Structure & Module Organization
- The project uses the Next.js App Router; entry points sit in `app/`, with `layout.tsx` wiring shared chrome and `globals.css` applying baseline styles.
- Compose UI from modules in `components/`; domain pieces such as `city-grid.tsx` live at the root while `components/ui/` contains the shadcn-derived primitives.
- Share cross-cutting logic via `lib/` (data, types, helpers) and `hooks/` (client-only concerns); place static assets in `public/` and keep Tailwind tokens in `styles/`.
- Asset-fetching helpers in `scripts/` download imagery—run them deliberately and document their output in your PR.

## Build, Test, and Development Commands
- `npm run dev` (or `pnpm dev`) starts the local dev server on port 3000 with hot reload.
- `npm run build` generates the production bundle; run this before shipping any structural change.
- `npm run start` serves the compiled bundle for smoke testing.
- `npm run lint` runs the Next.js ESLint suite; treat warnings as blockers and fix or justify them in review.

## Coding Style & Naming Conventions
- The codebase prefers strict TypeScript with React server components by default; add `"use client"` only where interactivity is required.
- Match the existing formatting: four-space indentation, double quotes, no semicolons, and Tailwind utility classes ordered roughly layout → spacing → color.
- Use PascalCase for components, camelCase for hooks/utilities, and keep file names kebab-case (`city-grid.tsx`).
- Leverage the `@/` path alias for absolute imports; avoid deep relative paths.

## Testing Guidelines
- There is no baked-in test runner yet; when adding behavior, provide unit coverage alongside the module (Jest or Vitest are fine) and expose it through an `npm run test` script, or explain why testing is deferred.
- At minimum, provide manual verification notes and ensure `npm run lint` and `npm run build` succeed locally.
- Prefer colocated `*.test.ts(x)` files and meaningful test names that mirror component behavior.

## Commit & Pull Request Guidelines
- Adopt Conventional Commit prefixes (`feat`, `fix`, `chore`, `docs`) with imperative subjects under 72 characters.
- Each PR should include a concise summary, linked issue (if any), verification checklist, and screenshots or recordings for UI-facing changes.
- Confirm you have run `npm run lint` and `npm run build`; note any skipped tests or scripts explicitly so reviewers can follow up.
