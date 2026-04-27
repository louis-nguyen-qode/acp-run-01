import { render, screen } from '@testing-library/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

vi.mock('@/components/nav/TopNav', () => ({
  TopNav: () => <nav data-testid="top-nav" aria-label="top navigation" />,
}))

vi.mock('@/components/nav/BottomNav', () => ({
  BottomNav: () => <nav data-testid="bottom-nav" aria-label="bottom navigation" />,
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

import DashboardLayout from './layout'

describe('DashboardLayout', () => {
  it('renders TopNav', () => {
    render(<DashboardLayout><p>content</p></DashboardLayout>)
    expect(screen.getByTestId('top-nav')).toBeInTheDocument()
  })

  it('renders BottomNav', () => {
    render(<DashboardLayout><p>content</p></DashboardLayout>)
    expect(screen.getByTestId('bottom-nav')).toBeInTheDocument()
  })

  it('renders children inside the content area', () => {
    render(<DashboardLayout><p>dashboard page</p></DashboardLayout>)
    expect(screen.getByText('dashboard page')).toBeInTheDocument()
  })

  it('applies bottom padding to content area using spacing token', () => {
    render(<DashboardLayout><p>content</p></DashboardLayout>)
    const content = screen.getByTestId('dashboard-content')
    expect(content).toHaveStyle({ paddingBottom: '50px' })
  })

  it('renders TopNav before BottomNav in the document', () => {
    render(<DashboardLayout><p>content</p></DashboardLayout>)
    const topNav = screen.getByTestId('top-nav')
    const bottomNav = screen.getByTestId('bottom-nav')
    expect(
      topNav.compareDocumentPosition(bottomNav) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })

  it('renders with no children without crashing', () => {
    render(<DashboardLayout>{null}</DashboardLayout>)
    expect(screen.getByTestId('top-nav')).toBeInTheDocument()
    expect(screen.getByTestId('bottom-nav')).toBeInTheDocument()
  })
})
