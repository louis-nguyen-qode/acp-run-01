---
title: "ADR Index"
type: "decision"
status: "active"
updated: "2026-04-26"
---

# Architecture Decision Records

## Conventions

- File naming: `NNN-short-title.md` (e.g. `001-use-nextauth-v5.md`)
- Each ADR must have frontmatter with `type: "decision"`
- Status: `proposed` → `active` → `deprecated`
- Once accepted, ADRs are never deleted — set `status: "deprecated"` instead

## Index

- [001-nextauth-middleware-dashboard.md](001-nextauth-middleware-dashboard.md) — NextAuth v5 Edge middleware for /dashboard auth gate
- [002-antd-transpile-packages-barrel-fix.md](002-antd-transpile-packages-barrel-fix.md) — antd transpilePackages + disable barrel optimizer (fixes __barrel_optimize__ RSC error)
