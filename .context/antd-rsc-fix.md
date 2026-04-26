---
title: "Antd RSC Barrel Error — Audit and Remediation"
type: "decision"
status: "proposed"
updated: "2026-04-26"
linear: "9K6M7HJ3"
---

# Antd RSC Barrel Error — Audit and Remediation

## Background

Next.js App Router treats every component as a React Server Component (RSC) by default.
Ant Design ships a CommonJS barrel (`antd/index.js`) that re-exports every component
including ones that call browser-only APIs (e.g. `useLayoutEffect`, `window`).
When a Server Component `import`s from `"antd"`, the bundler pulls the entire barrel into
the server bundle, hits a browser-only call, and throws:

```
Error: (0 , react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect) is not a function
```

or similar RSC-incompatible runtime errors.

Nested member access (`Typography.Text`, `Layout.Content`, etc.) is the most common symptom
because it forces a named import from the barrel to get the parent component, even when
the child sub-component is the only thing rendered.

---

## Audit — All Files Importing from `"antd"`

Searched directories: `app/`, `components/`.  
Command used: `grep -rn "from ['\"]antd['\"]" app components`

### 1. `app/page.tsx` — **Server Component** (no `'use client'`)

| Line | Import / Usage | Issue |
|------|---------------|-------|
| 1 | `import { Flex, Space, Typography } from 'antd'` | Barrel import in RSC |
| 16 | `<Typography.Text type="secondary">…</Typography.Text>` | Nested member access |

**Remediation:** Add `'use client'` (this page only renders UI, no server-only data) — see Strategy B below.
Alternatively extract the JSX into a `HomeContent.tsx` client component and keep the redirect logic in an RSC shell — see Strategy A.

---

### 2. `app/dashboard/page.tsx` — **Server Component** (no `'use client'`)

| Line | Import / Usage | Issue |
|------|---------------|-------|
| 1 | `import { Flex, Space, Typography } from 'antd'` | Barrel import in RSC |
| 17 | `<Typography.Text>Welcome, {session.user.email}</Typography.Text>` | Nested member access |

**Remediation:** Extract the rendered JSX into a `DashboardContent.tsx` client component that receives `email` as a prop, keeping `auth()` and `redirect()` in the RSC shell — Strategy A (preferred; keeps auth server-side).

---

### 3. `app/login/LoginForm.tsx` — **Client Component** (`'use client'` on line 1)

| Line | Import / Usage | Issue |
|------|---------------|-------|
| 3 | `import { Alert, Col, Layout, Row, Typography } from 'antd'` | Barrel import |
| 20 | `Form.useForm<FormValues>()` | Via `components/ui/Form.tsx` wrapper (safe) |
| 35 / 86 | `<Layout.Content>…</Layout.Content>` | Nested member access |
| 78–81 | `<Typography.Text>…</Typography.Text>` | Nested member access |

No RSC error here because `'use client'` is declared. However, the barrel import still
pulls the full antd bundle into the client chunk.

**Remediation:** No immediate RSC bug; low priority. For bundle size, replace barrel import with
deep imports (Strategy A submodule style) in a follow-up task.

---

### 4. `app/register/RegisterForm.tsx` — **Client Component** (`'use client'` on line 1)

| Line | Import / Usage | Issue |
|------|---------------|-------|
| 3 | `import { Alert, Col, Layout, Row, Typography } from 'antd'` | Barrel import |
| 19 | `Form.useForm<FormValues>()` | Via `components/ui/Form.tsx` wrapper (safe) |
| 34 / 81 | `<Layout.Content>…</Layout.Content>` | Nested member access |
| 73–76 | `<Typography.Text>…</Typography.Text>` | Nested member access |

Same situation as `LoginForm.tsx` — client component, no RSC error.

**Remediation:** Same as above; no immediate fix required.

---

### 5. `app/providers.tsx` — **Client Component** (`'use client'` on line 1)

| Line | Import / Usage | Issue |
|------|---------------|-------|
| 4 | `import { ConfigProvider } from 'antd'` | Barrel import |

No nested member access. Client component. No RSC issue.

**Remediation:** None required.

---

### 6. `components/ui/Button.tsx` — **Client Component** (`'use client'` on line 1)

| Line | Import / Usage | Issue |
|------|---------------|-------|
| 3 | `import { Button as AntButton } from 'antd'` | Barrel import |

No nested member access. Client component. No RSC issue.

**Remediation:** None required.

---

### 7. `components/ui/Input.tsx` — **Client Component** (`'use client'` on line 1)

| Line | Import / Usage | Issue |
|------|---------------|-------|
| 3 | `import { Input as AntInput } from 'antd'` | Barrel import |
| 33 | `return <AntInput.Password {...props} />` | Nested member access |

Client component — no RSC error. `AntInput.Password` is a sub-component accessed through
the locally bound `AntInput` reference, not a barrel-level nested access.

**Remediation:** None required. If bundle size becomes a concern, import `Password` directly
from `antd/es/input/Password`.

---

### 8. `components/ui/Form.tsx` — **Client Component** (`'use client'` on line 1)

| Line | Import / Usage | Issue |
|------|---------------|-------|
| 3 | `import { Form as AntForm, … } from 'antd'` | Barrel import |
| 26 | `Form.useForm = AntForm.useForm` | Nested member access |
| 30 | `return <AntForm.Item …>` | Nested member access |

Client component — no RSC error.

**Remediation:** None required.

---

### 9. `components/ui/Card.tsx` — **Server Component** (no `'use client'`)

| Line | Import / Usage | Issue |
|------|---------------|-------|
| 1 | `import { Card as AntCard, … } from 'antd'` | Barrel import in RSC |

No nested member access; `AntCard` is a named import.  
`Card` is used by `app/page.tsx` and `app/dashboard/page.tsx` (both RSCs), so the barrel
is pulled into the server bundle via this wrapper.

**Remediation:** Add `'use client'` to `components/ui/Card.tsx` — Strategy B.  
`Card` renders JSX with Ant Design internals that may call browser APIs; marking it as a
client component boundary prevents the barrel from entering the server bundle.

---

## Summary Table

| File | RSC? | Nested Access | RSC Error Risk | Recommended Fix |
|------|------|---------------|----------------|-----------------|
| `app/page.tsx` | Yes | `Typography.Text` | **High** | Strategy A or B |
| `app/dashboard/page.tsx` | Yes | `Typography.Text` | **High** | Strategy A (preferred) |
| `app/login/LoginForm.tsx` | No | `Layout.Content`, `Typography.Text` | None | No action needed |
| `app/register/RegisterForm.tsx` | No | `Layout.Content`, `Typography.Text` | None | No action needed |
| `app/providers.tsx` | No | None | None | No action needed |
| `components/ui/Button.tsx` | No | None | None | No action needed |
| `components/ui/Input.tsx` | No | `AntInput.Password` | None | No action needed |
| `components/ui/Form.tsx` | No | `AntForm.Item`, `AntForm.useForm` | None | No action needed |
| `components/ui/Card.tsx` | Yes | None | **Medium** | Strategy B |

---

## Remediation Strategies

### Strategy A — Extract client sub-component (preferred for pages with server logic)

Create a sibling `*Content.tsx` with `'use client'` that owns all Ant Design JSX.
The RSC page keeps `auth()`, `redirect()`, and passes serialisable props down.

```tsx
// app/dashboard/DashboardContent.tsx
'use client'
import { Flex, Space, Typography } from 'antd'

export function DashboardContent({ email }: { email: string }) {
  return (
    <Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
      <Space direction="vertical">
        <Typography.Text>Welcome, {email}</Typography.Text>
      </Space>
    </Flex>
  )
}
```

```tsx
// app/dashboard/page.tsx  (RSC shell — no antd import)
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { DashboardContent } from './DashboardContent'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')
  return <DashboardContent email={session.user.email ?? ''} />
}
```

### Strategy B — Add `'use client'` to the offending file

Appropriate when the file already contains client-only interactions or when extracting
a sub-component is not worth the complexity (e.g. the RSC shell has no server-only data
dependencies beyond a simple redirect).

```tsx
// app/page.tsx
'use client'               // ← add this
import { Flex, Space, Typography } from 'antd'
// ... rest unchanged
```

For `components/ui/Card.tsx`:

```tsx
'use client'               // ← add this
import { Card as AntCard, type CardProps as AntCardProps } from 'antd'
// ... rest unchanged
```

### Strategy C — Global `transpilePackages` in `next.config.js` (not recommended here)

Adding `transpilePackages: ['antd', '@ant-design/icons', 'rc-*', '@rc-component/*']`
to `next.config.js` causes Next.js to treat antd as ESM, resolving the barrel error for
all files at once. It is the bluntest tool: it does not prevent barrel imports from
inflating the server bundle and can increase cold-start time.

Use only as a temporary workaround while Strategy A/B fixes are applied per file.
The project's `next.config.js` currently has no `transpilePackages` entry.

---

## Recommended Action Order

1. Add `'use client'` to `components/ui/Card.tsx` (Strategy B) — 1 line, eliminates the
   medium-risk barrel entry point used by both RSC pages.
2. Apply Strategy A to `app/dashboard/page.tsx` — keeps `auth()` server-side, moves Ant
   Design rendering to a client boundary.
3. Apply Strategy B to `app/page.tsx` — the page has only a redirect guard; making it a
   client component is acceptable.
4. (Optional, follow-up) Replace barrel imports in `LoginForm.tsx` and `RegisterForm.tsx`
   with deep submodule imports to reduce client bundle size.
