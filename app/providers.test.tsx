import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Providers } from './providers'

vi.mock('@ant-design/nextjs-registry', () => ({
  AntdRegistry: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

describe('Providers', () => {
  it('renders children', () => {
    render(<Providers><div>child content</div></Providers>)
    expect(screen.getByText('child content')).toBeInTheDocument()
  })

  it('renders multiple children', () => {
    render(
      <Providers>
        <span>first</span>
        <span>second</span>
      </Providers>,
    )
    expect(screen.getByText('first')).toBeInTheDocument()
    expect(screen.getByText('second')).toBeInTheDocument()
  })

  it('passes children through ConfigProvider', () => {
    render(
      <Providers>
        <button type="button">inside provider</button>
      </Providers>,
    )
    expect(screen.getByRole('button', { name: 'inside provider' })).toBeInTheDocument()
  })
})
