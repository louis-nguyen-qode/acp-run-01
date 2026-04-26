# Reference: Simple Page

Demonstrates:

- **Server Component** fetching data directly (no `useEffect`, no `useState`)
- `<Suspense>` with `<Skeleton>` fallback for streaming
- `<Empty>` for zero-state
- `<Row>` / `<Col>` grid layout (not raw flex)
- Card wrapping from `components/ui/Card`

## What to copy

- The data-fetch function pattern (async function returning typed data)
- The `Suspense + Skeleton` wrapper pattern
- The `Empty` zero-state pattern
- The `Row/Col` responsive grid pattern

## What NOT to copy

- Don't use `useEffect` to fetch data — keep fetching in async Server Components
- Don't use `useState` for server-fetched data
- Don't add `'use client'` to pages unless they need browser APIs
