---
title: "Conventions Index"
type: "convention"
status: "active"
updated: "2026-04-26"
---

# Conventions

Patterns that have been established and should be followed consistently. Conventions are lighter than contracts — they describe how things are done, not what interfaces must be maintained.

## Index

*(No conventions yet — populated by workers as patterns emerge)*

## Template

```markdown
---
title: "Error handling in Server Actions"
type: "convention"
status: "active"
updated: "YYYY-MM-DD"
---

Server Actions return `{ data: T } | { error: string }` — never throw.
Callers check `result.error` before using `result.data`.
See `_reference/example-form/actions.ts` for the canonical example.
```
