---
title: "Dashboard Navigation Layout"
type: "convention"
status: "active"
updated: "2026-04-27"
linear: "K80N19ZY"
---

# Dashboard Navigation Layout

## Structure

`app/dashboard/layout.tsx` wraps all routes under `/dashboard` with the IG-style navigation shell:

```
DashboardLayout
  ├─ TopNav      (sticky top bar — visible on desktop ≥768px, hidden on mobile)
  ├─ Layout.Content  (main content area — paddingBottom = tokens.spacing.bottomNavHeight)
  │    └─ {children}
  └─ BottomNav   (fixed bottom bar — visible on mobile <768px, hidden on desktop)
```

## Components

| Component | File | Visibility |
|-----------|------|------------|
| `TopNav` | `components/nav/TopNav.tsx` | Desktop only (`@media min-width: 768px`) |
| `BottomNav` | `components/nav/BottomNav.tsx` | Mobile only (hidden above 768px) |

Each component owns its own responsive CSS via a co-located `.module.css` file. The layout does not apply any media queries itself.

## Spacing

The content area uses `paddingBottom: tokens.spacing.bottomNavHeight` (50px) so that page content is never obscured by the fixed BottomNav on mobile. The token value must not be hardcoded.

## Auth

Auth-protection is handled by:
1. NextAuth v5 Edge middleware (redirects unauthenticated requests to `/login` before the layout renders)
2. Server-side `await auth()` check inside `app/dashboard/page.tsx`

The layout itself does not perform auth checks. See `architecture/decisions/001-nextauth-middleware-dashboard.md`.
