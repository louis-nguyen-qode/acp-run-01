import { render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { DashboardPageClient } from './DashboardPageClient'

vi.mock('./SignOutButton', () => ({
  SignOutButton: () => <button type="submit">Sign out</button>,
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

describe('DashboardPageClient', () => {
  it('renders welcome message with user email', () => {
    render(<DashboardPageClient email="user@example.com" />)
    expect(screen.getByText(/user@example\.com/)).toBeInTheDocument()
  })

  it('renders sign-out button', () => {
    render(<DashboardPageClient email="user@example.com" />)
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument()
  })

  it('renders different email when prop changes', () => {
    render(<DashboardPageClient email="other@test.com" />)
    expect(screen.getByText(/other@test\.com/)).toBeInTheDocument()
  })

  it('renders dashboard card title', () => {
    render(<DashboardPageClient email="user@example.com" />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })
})
