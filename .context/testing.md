---
title: "Testing Conventions"
type: "convention"
status: "active"
updated: "2026-04-26"
---

# Testing Conventions

## Co-located unit tests

Test files live beside their source file: `Foo.tsx` → `Foo.test.tsx`. See `STANDARDS.md` for full rules (80% coverage per file, no real network/DB, `vi.mock()` for externals).

## Smoke tests

Smoke tests live in `tests/smoke/` and guard against runtime and bundler regressions (e.g. a client component losing its `'use client'` boundary and pulling a browser-only barrel into an RSC). They run in the same Vitest + jsdom environment — no dev server required. Add a smoke test whenever a bundler or RSC regression is fixed so the fix cannot be silently reverted.
