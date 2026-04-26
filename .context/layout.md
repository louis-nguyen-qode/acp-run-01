---
title: "App Shell Layout"
type: "convention"
status: "active"
updated: "2026-04-26"
linear: "C8HEX26Q"
---

# App Shell Layout

## Component locations

All layout components live under `components/layout/`:

| File | Rendering | Role |
|------|-----------|------|
| `AppShell.tsx` | Server Component | Root wrapper — composes Header + Sidebar + Content + Footer |
| `AppHeader.tsx` | Client Component (`'use client'`) | Top nav bar with logo, primary nav menu, and mobile hamburger |
| `AppSidebar.tsx` | Client Component (`'use client'`) | Left sidebar on desktop; slide-in Drawer on mobile |
| `AppFooter.tsx` | Server Component | Footer delegating to `AppFooterContent` with grouped links and copyright |
| `AppFooterContent.tsx` | Server Component | Renders footer link groups and copyright year |

`AppShell` wraps the entire page and is wired into `app/layout.tsx`.

## Navigation config — single source of truth

`lib/navigation/config.ts` is the **only** place to define navigation items. It exports:

- `primaryNav: NavItem[]` — used by `AppHeader` for the horizontal top menu
- `sidebarNav: NavItem[]` — used by `AppSidebar` for the vertical inline menu
- `footerGroups: FooterGroup[]` — used by `AppFooter` for grouped link columns

Never hardcode nav items inside a component. Always import from `lib/navigation/config.ts`.

Types are defined in `lib/navigation/types.ts`.

## Event contract: `app:toggle-sidebar`

`AppHeader` and `AppSidebar` communicate through a browser `CustomEvent` — no shared state, no prop drilling.

**Producer — `AppHeader`:**
```ts
window.dispatchEvent(new CustomEvent('app:toggle-sidebar'))
```
Fired when the user taps the hamburger button on mobile.

**Consumer — `AppSidebar`:**
```ts
window.addEventListener('app:toggle-sidebar', handleToggle)
```
Toggles the `isDrawerOpen` state to show/hide the mobile Drawer.

This contract is intentionally loose (no payload, no return value). If the contract needs data in the future, add a `detail` field to the `CustomEvent` and update both sides in the same PR.

## Responsive breakpoint

The mobile/desktop split is driven by Ant Design's `Grid.useBreakpoint()`:

- **`screens.md === false` (viewport < 768 px)** → mobile mode
  - `AppHeader` hides the horizontal menu and shows the hamburger button
  - `AppSidebar` renders an AntD `<Drawer>` instead of `<Layout.Sider>`
- **`screens.md === true` (viewport ≥ 768 px)** → desktop mode
  - `AppHeader` shows the horizontal `<Menu>`
  - `AppSidebar` renders a persistent `<Layout.Sider>`

Do not use raw media queries or CSS breakpoints. Always use `Grid.useBreakpoint()` so the breakpoint logic stays consistent with the AntD token system.

## Token usage rules

All colors, spacing, and typography values must come from `theme/tokens.ts`. Import and use the `tokens` object:

```ts
import { tokens } from '@/theme/tokens'

// correct
style={{ padding: tokens.spacing.lg, background: tokens.colors.bg }}

// forbidden
style={{ padding: 16, background: '#ffffff' }}
```

No hardcoded hex values, pixel sizes, or font sizes anywhere in layout components. Violations will fail CI lint.
