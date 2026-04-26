# Reference: Form with Server Action

Demonstrates:

- **Client Component** for the form (needs event handlers)
- **Server Action** (`'use server'`) for mutation — no API route needed
- Zod schema mirrored on both client (rules) and server (action)
- Error returned as `{ error: string }` — never thrown, never `alert()`
- `useTransition` to get pending state for button loading
- `notification.error/success` for user feedback
- Form reset on success

## What to copy

- The `ActionResult<T>` return type pattern
- The Zod parse-then-act server action pattern
- The `startTransition(async () => {...})` form submission pattern
- The `notification` pattern (requires `<App>` wrapper in layout)

## What NOT to copy

- Don't use `fetch('/api/...')` for mutations — use Server Actions
- Don't `throw` from Server Actions — return `{ error }` instead
- Don't show errors with `alert()` — use `notification.error`
