---
title: "components/ui — Client Component Wrappers"
type: "convention"
status: "active"
updated: "2026-04-27"
linear: "C4EA4P0D"
---

# components/ui — Client Component Wrappers

All Ant Design primitives used inside Server Component trees MUST be imported from `@/components/ui`, never directly from `antd`. Each wrapper carries a `'use client'` boundary that prevents antd's CommonJS barrel from entering the server bundle.

## Layout

`components/ui/Layout/index.tsx` wraps antd's `Layout`, `Layout.Header`, `Layout.Content`, `Layout.Footer`, and `Layout.Sider` as individually exported client components.

**Why this wrapper exists:** Accessing antd sub-components via property access (`Layout.Content`, etc.) forces the bundler to pull the entire antd barrel into the server chunk, triggering the React Client Manifest barrel error in Next.js 14 App Router. This wrapper places each sub-component behind a `'use client'` boundary, eliminating the error.

### Usage

```tsx
import { Layout, Header, Content, Footer, Sider } from '@/components/ui'

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <Header>…</Header>
      <Layout>
        <Sider>…</Sider>
        <Content>{children}</Content>
      </Layout>
      <Footer>…</Footer>
    </Layout>
  )
}
```

### Rule

**Do NOT** import antd Layout components directly in any file that may be part of a Server Component tree:

```tsx
// WRONG — triggers RSC barrel error
import { Layout } from 'antd'
<Layout.Content>…</Layout.Content>

// CORRECT — safe across RSC boundaries
import { Layout, Content } from '@/components/ui'
<Layout><Content>…</Content></Layout>
```

### Exported types

| Type | Description |
|------|-------------|
| `LayoutProps` | Props for `Layout` (extends `React.HTMLAttributes<HTMLDivElement>`) |
| `HeaderProps` | Props for `Header` (same shape as `LayoutProps`) |
| `ContentProps` | Props for `Content` (same shape as `LayoutProps`) |
| `FooterProps` | Props for `Footer` (same shape as `LayoutProps`) |
| `SiderProps` | Props for `Sider` (adds collapsible, width, breakpoint, etc.) |
