# Reference: NextAuth v5 Auth Flow

**IMPORTANT:** This uses NextAuth v5 (`next-auth@beta`), NOT v4. The API is completely different. Use this reference — do not rely on v4 patterns from memory or training data.

## Files

| File | Purpose |
|------|---------|
| `auth.config.ts` | Provider config + callbacks. Edge-safe (no Prisma). |
| `auth.ts` | Full NextAuth init. Exports `auth`, `signIn`, `signOut`, `handlers`. |
| `middleware.ts` | Route protection via `authorized` callback. |
| `app/api/auth/[...nextauth]/route.ts` | NextAuth API route. Just re-exports `handlers`. |
| `app/signin/page.tsx` | Sign-in form (client component). |
| `app/protected/page.tsx` | Protected page pattern (server component + `await auth()`). |
| `lib/auth/password.ts` | `hashPassword` + `verifyPassword` via bcrypt. |
| `lib/auth/validation.ts` | Zod schemas for login + signup. |

## Key v5 Differences from v4

1. **`next-auth@beta`** package — not `next-auth` stable.
2. **`auth.ts` exports** `auth`, `signIn`, `signOut`, `handlers` (not `getServerSession`, not `withAuth`).
3. **Route handler** just re-exports `handlers` — no special Next.js route syntax needed.
4. **Middleware** exports `auth as middleware` — no `withAuth` wrapper.
5. **`authorized` callback** in config handles redirects — returns boolean, not a Response.
6. **callbackUrl** is automatically included in the redirect to `/signin`.

## What to copy (into real files)

1. Copy `auth.config.ts` → `auth.config.ts` at repo root (or `lib/auth/config.ts`)
2. Copy `auth.ts` → `lib/auth/index.ts` (adjust Prisma import)
3. Copy `middleware.ts` → `middleware.ts` at repo root
4. Copy `app/api/auth/[...nextauth]/route.ts` → same path (adjust import)
5. Copy `lib/auth/password.ts` → `lib/auth/password.ts`
6. Copy `lib/auth/validation.ts` → `lib/auth/validation.ts`
7. Write sign-in and sign-up pages following the form pattern
8. Write protected pages using `await auth()` server-side

## callbackUrl Security

Always validate callbackUrl before redirecting:

```ts
const raw = searchParams.get('callbackUrl') ?? '/dashboard'
// Must start with / and not // (prevents open redirect)
const safeUrl = raw.startsWith('/') && !raw.startsWith('//') ? raw : '/dashboard'
```
