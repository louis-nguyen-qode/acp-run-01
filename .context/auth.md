---
title: "NextAuth v5 Auth Conventions"
type: "convention"
status: "active"
updated: "2026-04-26"
linear: "0KDZK0MJ"
---

# NextAuth v5 Auth Conventions

This project uses NextAuth v5 (`next-auth@beta`) with a Credentials provider and JWT sessions.

## Import paths

Always import from the barrel at `lib/auth/index.ts`. Never use v4 imports.

```ts
// Correct (v5)
import { auth, signIn, signOut } from '@/lib/auth'

// Forbidden (v4 — do not use)
import { getServerSession } from 'next-auth/next'
import type { NextAuthOptions } from 'next-auth'
```

## Calling `auth()` in Server Components

`auth()` returns the current session or `null`.

```tsx
import { auth } from '@/lib/auth'

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect('/login')

  return <p>Hello, {session.user.id}</p>
}
```

## Using `signIn` as a Server Action

```tsx
'use client'
import { signIn } from '@/lib/auth'

export function LoginForm() {
  return (
    <form
      action={async (data: FormData) => {
        'use server'
        await signIn('credentials', {
          email: data.get('email'),
          password: data.get('password'),
          redirectTo: '/dashboard',
        })
      }}
    >
      {/* inputs */}
    </form>
  )
}
```

## Using `signOut` as a Server Action

```tsx
import { signOut } from '@/lib/auth'

<form action={async () => { 'use server'; await signOut({ redirectTo: '/login' }) }}>
  <button type="submit">Sign out</button>
</form>
```

## Session shape

`Session.user` is augmented in `types/next-auth.d.ts` to include `id: string`:

```ts
session.user.id   // string — always present after sign-in
session.user.email
session.user.name
session.user.image
```

## Why JWT strategy

Credentials providers in NextAuth v5 require `session: { strategy: 'jwt' }`. Database sessions are only available with OAuth providers that use an adapter. JWT sessions store the session data in an encrypted HTTP-only cookie — no extra DB table is needed.

## Password hashing

Use the helpers in `lib/auth/password.ts`:

```ts
import { hashPassword, verifyPassword } from '@/lib/auth/password'

const hash = await hashPassword('plaintext')     // bcrypt cost 10
const ok   = await verifyPassword('guess', hash) // boolean
```

Hashes are stored in `User.passwordHash`. Plaintext is never persisted.

## Environment variables

| Variable          | Purpose                                  |
|-------------------|------------------------------------------|
| `AUTH_SECRET`     | Signs/encrypts JWTs. Required in prod.   |
| `AUTH_TRUST_HOST` | Required when deploying behind a proxy.  |
