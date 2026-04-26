---
title: "UI Component Wrappers"
type: "convention"
status: "active"
updated: "2026-04-26"
linear: "0KDZK0MJ"
---

# UI Component Wrappers

All UI interactions must go through `components/ui/` wrappers — never use raw HTML elements or import Ant Design directly in `app/` pages or feature components.

## The Rule

```ts
// WRONG — raw HTML or direct antd import in app/
import { Button } from 'antd'
<button onClick={...}>Save</button>

// CORRECT — use the wrapper
import { Button } from '@/components/ui'
<Button onClick={...}>Save</Button>
```

## Available Wrappers

| Export | Source | Wraps |
|---|---|---|
| `Button` | `components/ui/Button.tsx` | `antd/Button` |
| `Input` | `components/ui/Input.tsx` | `antd/Input` |
| `PasswordInput` | `components/ui/Input.tsx` | `antd/Input.Password` |
| `Form` | `components/ui/Form.tsx` | `antd/Form` (vertical layout default) |
| `FormItem` | `components/ui/Form.tsx` | `antd/Form.Item` |
| `Card` | `components/ui/Card.tsx` | `antd/Card` |

All wrappers re-export their prop types. Import from the barrel: `@/components/ui`.

## Adding a New Wrapper

1. Create `components/ui/MyComponent.tsx` — one component per file, under 100 lines.
2. Define a named `export type MyComponentProps = { ... }` above the component.
3. Wrap the Ant Design primitive; restrict the API surface to what DESIGN.md requires.
4. Add a sibling `MyComponent.test.tsx` with happy path + edge + error cases (≥80% coverage).
5. Export both value and type from `components/ui/index.ts`.

## Tokens

Every wrapper must source all visual values from `tokens` — no hardcoded hex colors, pixel values, or font sizes.

```ts
import { tokens } from '@/theme/tokens'
// use tokens.colors.primary, tokens.spacing.md, etc.
```

`theme/antd-theme.ts` maps `tokens` to the Ant Design `ThemeConfig` applied globally by `app/providers.tsx`.

## Exceptions

The following Ant Design components may be used directly in `app/` without wrappers, as they are layout or utility primitives not subject to the wrapper rule:

- `Layout`, `Layout.Header`, `Layout.Content`, `Layout.Sider`
- `Row`, `Col`, `Space`, `Flex`
- `Table`
- `Empty`, `Skeleton`
- `notification`, `Modal`, `message`
