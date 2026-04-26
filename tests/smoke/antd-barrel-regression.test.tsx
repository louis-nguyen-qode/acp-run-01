/**
 * Regression guard: antd barrel import in a Server Component caused Next.js to throw
 * `useLayoutEffect is not a function` at render time before HomeClient was extracted
 * with a `'use client'` boundary (PRs #11-#13). If HomeClient is ever re-inlined into
 * an RSC without `'use client'`, this import will fail (module not found) and the
 * render assertions below will expose broken antd component output.
 */
import { render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { HomeClient } from '@/app/HomeClient'

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}))

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

describe('antd barrel regression — HomeClient', () => {
  it('mounts without throwing (Flex + Space + Typography.Text all reachable)', () => {
    expect(() => render(<HomeClient />)).not.toThrow()
  })

  it('renders Typography.Text content', () => {
    render(<HomeClient />)
    expect(screen.getByText(/sign in to continue/i)).toBeInTheDocument()
  })

  it('renders Space-wrapped sign-in link (antd Space/Flex output intact)', () => {
    render(<HomeClient />)
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument()
  })

  it('renders register link', () => {
    render(<HomeClient />)
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument()
  })
})
