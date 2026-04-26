# Reference: Component Tests

Pattern for testing React components with `@testing-library/react` + Vitest.

```tsx
// MyWidget.tsx
'use client'

type Props = { label: string; onAction: () => void }

export function MyWidget({ label, onAction }: Props) {
  return <button onClick={onAction}>{label}</button>
}
```

```tsx
// MyWidget.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { MyWidget } from './MyWidget'

describe('MyWidget', () => {
  it('renders the label', () => {
    render(<MyWidget label="Click me" onAction={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('calls onAction when clicked', async () => {
    const onAction = vi.fn()
    render(<MyWidget label="Click me" onAction={onAction} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onAction).toHaveBeenCalledOnce()
  })

  it('does not call onAction when button is not clicked', () => {
    const onAction = vi.fn()
    render(<MyWidget label="Click me" onAction={onAction} />)
    expect(onAction).not.toHaveBeenCalled()
  })
})
```

## Rules

- Use `screen.getByRole` over `getByTestId` — test behavior, not implementation
- Use `userEvent` over `fireEvent` for realistic interaction
- Every `it(` must have at least one `expect(`
- Mock external dependencies with `vi.mock('./some-module')`
- Never mock the component under test
- AntD components need `<App>` wrapper when using `notification`, `message`, `modal`
