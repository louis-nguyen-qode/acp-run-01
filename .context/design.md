---
title: "Design Tokens"
type: "convention"
status: "active"
updated: "2026-04-27"
---

# Design Tokens

All design values live in `theme/tokens.ts`. Import `tokens` from there — never hardcode colors, spacing, radii, or font stacks.

## IG-Style Tokens (added K80N19ZY)

These tokens enable an Instagram-inspired minimal aesthetic.

### Colors

| Token | Value | When to use |
|---|---|---|
| `colors.brandBlack` | `#000000` | Logo, nav icons (active), high-contrast text |
| `colors.brandWhite` | `#ffffff` | Page backgrounds, icon fill on dark surfaces |
| `colors.borderSubtle` | `#dbdbdb` | Post card borders, dividers, input outlines |
| `colors.bgElevated` | `#fafafa` | Card surfaces, sidebar backgrounds |
| `colors.textMuted` | `#737373` | Timestamps, secondary captions, placeholder text |
| `colors.accent` | `#0095f6` | Primary action buttons (Follow, Post, Submit) |

### Radii

| Token | Value | When to use |
|---|---|---|
| `radius.card` | `4px` | Post cards, media containers |
| `radius.button` | `8px` | Action buttons (Follow, Post) |

### Spacing

| Token | Value | When to use |
|---|---|---|
| `spacing.navHeight` | `60px` | Top navigation bar height |
| `spacing.bottomNavHeight` | `50px` | Mobile bottom tab bar height |

### Typography

| Token | Value | When to use |
|---|---|---|
| `typography.brandFont` | `'Billabong', cursive` | Wordmark / logo text only |
| `typography.bodyFont` | `system-ui, …` | All body and UI text |

## Rules

- Use `tokens.colors.accent` for the one primary action button per screen (DESIGN.md rule).
- Use `tokens.colors.borderSubtle` instead of `tokens.colors.border` in IG-style views.
- `typography.brandFont` is for the wordmark only — body text always uses `bodyFont`.
