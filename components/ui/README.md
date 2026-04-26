# components/ui

Thin, opinionated wrappers around Ant Design components. These wrappers:

1. **Restrict the API surface** — only props that are consistent with DESIGN.md are exposed.
2. **Prevent raw AntD usage** — ESLint rule `no-restricted-imports` can enforce this in the future.
3. **Give workers a single lookup point** — all UI primitives live here.

## Usage

```tsx
import { Button } from '@/components/ui/Button'
import { Input, PasswordInput } from '@/components/ui/Input'
import { Form, FormItem } from '@/components/ui/Form'
import { Card } from '@/components/ui/Card'
```

## Rules

- **Never import AntD components directly** in `app/` or `components/` (except `Layout`, `Row`, `Col`, `Space`, `Flex`, `Table`, `Empty`, `Skeleton`, `notification`, `Modal`).
- For components not listed here, import from AntD directly — but keep props consistent with DESIGN.md.
- To add a new wrapper: copy an existing one, restrict props to what DESIGN.md allows, add it here.
- Never add `style={{...}}` props — use tokens or AntD's `token` hook.
