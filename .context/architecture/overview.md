---
title: "Architecture Overview"
type: "overview"
status: "active"
updated: "2026-04-26"
---

# Architecture Overview

## Stack

- **Framework:** Next.js 14 (App Router, Server Components by default)
- **UI:** Ant Design 5 with design tokens from `theme/tokens.ts`
- **Auth:** NextAuth v5 (Credentials provider + JWT sessions)
- **ORM:** Prisma + SQLite (development)
- **Testing:** Vitest + @testing-library/react (80% per-file coverage)

## Key Modules

| Path | Responsibility |
|------|----------------|
| `app/` | Next.js pages and route handlers |
| `components/ui/` | AntD wrappers (Button, Input, Form, Card) |
| `lib/auth/` | Auth utilities: password hashing, validation schemas |
| `theme/tokens.ts` | Single source of truth for all design values |
| `prisma/` | Database schema and migrations |

## Data Flow

```
Browser → Next.js page (Server Component)
  → Server Action (mutation) or Prisma query (read)
  → Response rendered server-side
  → Streamed to browser
```

Client components (`'use client'`) are used only for:
- Event handlers and interactive state
- Browser-only APIs

## Authentication Flow

1. User submits credentials via sign-in form
2. `signIn('credentials', ...)` calls NextAuth authorize function
3. Authorize looks up user in DB, verifies bcrypt hash
4. On success: JWT signed and stored in HTTP-only cookie
5. Protected routes: middleware reads JWT via `auth()`, redirects if absent
6. Server Components: `await auth()` to access session

## Contracts

See `architecture/contracts/` for module-level contracts.
