import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
  signOut: vi.fn().mockResolvedValue(undefined),
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}))

vi.mock('@/components/brand/BrandMark', () => ({
  BrandMark: ({ size }: { size: string }) => <span data-testid="brand-mark" data-size={size} />,
}))

import { signOut } from '@/lib/auth'

import { TopNav } from './TopNav'

describe('TopNav', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders all 4 nav items with correct aria-labels', () => {
    render(<TopNav />)
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Explore' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument()
  })

  it('renders correct hrefs for nav links', () => {
    render(<TopNav />)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Explore' })).toHaveAttribute('href', '/explore')
    expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute('href', '/profile')
  })

  it('calls signOut when logout button is clicked', async () => {
    render(<TopNav />)
    await userEvent.click(screen.getByRole('button', { name: 'Logout' }))
    expect(signOut).toHaveBeenCalledOnce()
  })

  it('renders BrandMark with size md', () => {
    render(<TopNav />)
    const brandMark = screen.getByTestId('brand-mark')
    expect(brandMark).toBeInTheDocument()
    expect(brandMark).toHaveAttribute('data-size', 'md')
  })

  it('renders a nav element at the root', () => {
    const { container } = render(<TopNav />)
    expect(container.querySelector('nav')).toBeInTheDocument()
  })

  it('calls signOut again on repeated logout clicks', async () => {
    render(<TopNav />)
    const logoutButton = screen.getByRole('button', { name: 'Logout' })
    await userEvent.click(logoutButton)
    await userEvent.click(logoutButton)
    expect(signOut).toHaveBeenCalledTimes(2)
  })

  it('renders exactly 3 nav links and 1 logout button', () => {
    render(<TopNav />)
    const links = screen.getAllByRole('link')
    const buttons = screen.getAllByRole('button')
    expect(links).toHaveLength(3)
    expect(buttons).toHaveLength(1)
  })
})
