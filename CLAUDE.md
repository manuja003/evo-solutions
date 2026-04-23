# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server on port 8080
npm run build        # Production build
npm run build:dev    # Development build
npm run lint         # ESLint
npm run preview      # Preview production build
npm run test         # Run tests (Vitest)
npm run test:watch   # Watch mode tests
```

E2E tests use Playwright (`playwright.config.ts`); unit/component tests use Vitest with jsdom (`src/test/`).

## Architecture

**React 18 SPA** built with Vite + TypeScript. No SSR — purely static/client-side.

### Routing (`src/App.tsx`)

React Router DOM v6 with `BrowserRouter`. Routes:
- `/` → `Index` (home, composed of all section components)
- `/products/evodine`, `/products/evovilla`, `/products/evoinventory` → product detail pages
- `*` → `NotFound`

Page transitions use Framer Motion `AnimatePresence` + `PageTransition` wrapper. In-page navigation uses anchor IDs (`#home`, `#products`, `#solutions`, `#contact`, etc.) with smooth scroll.

### Component Structure (`src/components/`)

- `ui/` — shadcn/ui primitives (Radix-based, auto-generated — don't manually edit without `npx shadcn-ui` tooling)
- Section components (`Hero`, `Products`, `Solutions`, `Process`, `TechStack`, `CaseStudies`, `Testimonials`, `Contact`, `Footer`) — rendered in order inside `Index.tsx`
- `ProductDetailLayout.tsx` — shared layout for all three product pages

### Styling System

**Tailwind CSS** with class-based dark mode. Custom CSS variables defined in `src/index.css` drive the entire color system (HSL format):
- `--primary`: orange, `--accent`: blue
- `--background`: dark blue (`#030712` base)

Key utility classes defined in `index.css`:
- `.glass-card` — glassmorphism (backdrop blur + border + hover states)
- `.gpu-accelerate` — `translateZ(0)` + `will-change` for animation perf
- `.btn-primary-glow`, `.btn-outline-hero` — CTA button variants
- `.text-gradient-primary`, `.text-gradient-accent` — gradient text
- `.animate-gradient-shift` — animated gradient text

**Fonts:** Space Grotesk (headings, often `font-black italic`) + Inter (body). Configured via Google Fonts in `index.html`.

### Animation Patterns

All animated sections use Framer Motion:
- `useInView` hook for scroll-triggered entry animations
- `motion.div` with `variants` + `initial`/`animate`/`whileHover` props
- `AnimatePresence` for route transitions
- `BackgroundOrbs.tsx` — floating animated gradient blobs in the background

### Path Alias

`@/*` resolves to `src/*` (configured in both `vite.config.ts` and `tsconfig.json`).

### TypeScript Config

Strict mode is **disabled** (`strict: false`, `noImplicitAny: false`, `strictNullChecks: false`). Don't tighten these without a full type audit.

### State & Data

No backend/API. No global state manager. `TanStack React Query` and `Next Themes` are installed but minimal usage. Forms use `React Hook Form` + `Zod`.
