---
title: "antd transpilePackages + disable barrel optimizer"
type: "decision"
status: "active"
updated: "2026-04-27"
linear: "C4EA4P0D"
---

# ADR 002: antd transpilePackages + disable barrel optimizer

## Context

Next.js 14's `experimental.optimizePackageImports` barrel optimizer mishandles antd subcomponents (e.g. `Layout.Content`) when they cross the Server/Client boundary. This produces a runtime error: `Could not find the module ...__barrel_optimize__?names=Layout#Layout#Content in the React Client Manifest`.

## Decision

In `next.config.js`:
- Set `experimental.optimizePackageImports: []` so antd is never barrel-optimized.
- Add antd and its rc-* peer packages to `transpilePackages` so Next.js processes their ESM correctly.

Packages in `transpilePackages`: `antd`, `@ant-design/icons`, `@ant-design/icons-svg`, `rc-util`, `rc-pagination`, `rc-picker`, `rc-notification`, `rc-tooltip`, `rc-tree`, `rc-table`.

## Consequences

- The `__barrel_optimize__` runtime error is eliminated on pages using `Layout.Content` and similar nested antd components.
- antd is compiled via webpack rather than loaded as pre-built ESM, which may slightly increase cold-start build time but has no effect on runtime performance.
- Any future package added to `experimental.optimizePackageImports` must not include antd or its rc-* dependencies.
