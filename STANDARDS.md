# Engineering Standards

These rules are enforced by ESLint, TypeScript strict mode, and CI. They are not suggestions.

## TypeScript

- `strict: true` and `noUncheckedIndexedAccess: true` in `tsconfig.json` — no exceptions
- No `any` type, no `as any`, no `@ts-ignore`, no `@ts-expect-error`
- Prefer `type` over `interface` for object shapes
- No default exports except in Next.js pages, route handlers, and `layout.tsx`
- Async functions return explicit `Promise<T>` — never rely on inference to hide async

## React / Next.js

- Server Components by default; `'use client'` only when you need browser APIs or event handlers
- Server Actions for all data mutations (no client-side `fetch` for writes)
- Error boundaries required per route segment (`error.tsx`)
- No `useEffect` for data fetching — fetch in Server Components or use `useSWR` as last resort

## Components

- One component per file
- Props typed inline (as `type Props = { ... }`) immediately above the component
- Max 100 lines per component — split if longer
- No prop drilling beyond 2 levels — use composition or context

## Imports

- Absolute imports via `@/` alias (configured in `tsconfig.json`)
- Import order enforced by eslint-plugin-import: external → internal → relative → types
- No circular dependencies (enforced by dependency-cruiser)
- Cross-feature imports only via index files — `lib/` may not import from `app/`

## Naming

- Booleans: `is*`, `has*`, `can*` prefixes (e.g. `isLoading`, `hasError`)
- Internal event handlers: `handle*` (e.g. `handleSubmit`)
- Prop event handlers: `on*` (e.g. `onChange`, `onClose`)
- Hooks: `use*`
- Files: PascalCase for components (`UserCard.tsx`), kebab-case for non-components (`auth-utils.ts`)

## Error Handling

- Typed error classes — never `throw new Error("string")` in shared code
- Never silently swallow errors (`catch {}` is a lint error)
- User-facing errors via AntD `notification.error()` — never `alert()`
- API errors: return typed `{ error: string }` responses, not untyped throws

## Testing

- Test files co-located with source: `Foo.tsx` + `Foo.test.tsx`
- Test behavior, not implementation — don't assert on internal state
- Mock external dependencies with `vi.mock()` — no real network or DB in unit tests
- Every `it(` block must contain at least one `expect(`
- Minimum scenarios per test file: happy path + at least one edge case + at least one error case
- Coverage threshold: ≥80% per file (enforced by Vitest `perFile: true`)
- Test count can only increase — CI fails if new code reduces total test count

## Import Policy (dependency-cruiser)

- `lib/` → cannot import from `app/`
- `components/` → cannot import from `app/`
- No circular dependencies anywhere
- Cross-feature imports only via the feature's `index.ts` barrel

## Git / PR

- Conventional commit messages: `feat:`, `fix:`, `chore:`, `test:`, `docs:`
- Footer: `Refs: LINEAR-ID`
- PR diff ≤ 300 lines — surrender if the task is larger
- No `--no-verify`. No `[skip ci]`.
