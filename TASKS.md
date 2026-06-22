# TASKS.md

## Active

- (none)

## Completed

- [x] **FIX-001** — "Our Collection" product click doesn't scroll to top on product change
  - Files: `src/components/ProductDetailsModal.tsx`
  - Root cause 1: click handler used `document.querySelector('.fixed')` → matched Header nav → `scrollTo` was a no-op
  - Root cause 2: `useEffect([product])` checked `(window as any).ScrollSmoother` (undefined for ES module imports) → smoother scroll never fired
  - Fix: Import `ScrollSmoother` from gsap; use `ScrollSmoother.get()` in useEffect; remove broken click handler scroll logic
