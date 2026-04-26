---
title: "NextAuth v5 middleware for /dashboard protection"
type: "decision"
status: "active"
updated: "2026-04-26"
linear: "0KDZK0MJ"
---

# ADR 001: NextAuth v5 middleware for /dashboard protection

## Context

`/dashboard` and its sub-paths must be accessible only to authenticated users. Next.js middleware runs at the Edge before any page renders, making it the right place for auth gates.

## Decision

Use `auth()` from `@/lib/auth` as a middleware wrapper in `middleware.ts` at the repo root. The matcher is scoped to `/dashboard/:path*` only.

## Consequences

- Unauthenticated requests to `/dashboard/**` are redirected to `/login` before any Server Component runs.
- No other routes are affected by this middleware (matcher is strictly scoped).
- Server Components inside `/dashboard` may still call `await auth()` for fine-grained session access, but the middleware guarantees a session exists.
