---
title: "Primitives Index"
type: "primitive"
status: "active"
updated: "2026-04-26"
---

# Primitives

Reusable hooks, utilities, and components that workers should use rather than rebuild. Check here before implementing anything that sounds generic.

## Index

*(No primitives yet — populated by workers as shared utilities are extracted)*

## Template

```markdown
---
title: "useDebounce hook"
type: "primitive"
status: "active"
updated: "YYYY-MM-DD"
linear: "QOD-XX"
---

**Location:** `lib/hooks/useDebounce.ts`

## Signature

`useDebounce<T>(value: T, delayMs: number): T`

## Purpose

Debounces a frequently-changing value (e.g. search input) before triggering effects.

## Usage

```ts
const debouncedSearch = useDebounce(searchQuery, 300)
```
```
