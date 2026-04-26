---
title: "Server Actions Conventions"
type: "conventions"
status: "active"
updated: "2026-04-26"
---

# Server Actions Conventions

## Error Handling

**Always re-throw redirect errors before handling other errors.**

In Next.js Server Actions, `redirect()` and NextAuth's `redirectTo` option work by throwing a special error whose `digest` starts with `NEXT_REDIRECT`. If this error is caught and not re-thrown, the redirect never happens and the caller receives a `CallbackRouteError` instead.

Pattern:

```ts
import { isRedirectError } from 'next/dist/client/components/redirect'

try {
  await someActionThatMayRedirect()
} catch (err) {
  if (isRedirectError(err)) {
    throw err  // must re-throw — this IS the redirect
  }
  // handle other errors below
}
```

This rule applies to any Server Action that calls `redirect()`, `permanentRedirect()`, or NextAuth's `signIn`/`signOut` with a `redirectTo` option.
