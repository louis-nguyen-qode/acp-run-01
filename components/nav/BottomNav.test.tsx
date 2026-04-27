import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { usePathname } from 'next/navigation'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
  signOut: vi.fn().mockResolvedValue(undefined),
}))

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}))

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}))

import { signOut } from '@/lib/auth'
import { tokens } from '@/theme/tokens'

import { BottomNav } from './BottomNav'

describe('BottomNav', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/')
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders all 4 nav items', () => {
    render(<BottomNav />)
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Explore' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument()
  })

  it('renders correct hrefs for nav links', () => {
    render(<BottomNav />)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Explore' })).toHaveAttribute('href', '/explore')
    expect(screen.getByRole('link', { name: 'Profile' })).toHaveAttribute('href', '/profile')
  })

  it('applies active color to the current route link', () => {
    vi.mocked(usePathname).mockReturnValue('/')
    render(<BottomNav />)
    const homeLink = screen.getByRole('link', { name: 'Home' })
    expect(homeLink).toHaveStyle({ color: tokens.colors.brandBlack })
  })

  it('applies muted color to inactive route links', () => {
    vi.mocked(usePathname).mockReturnValue('/')
    render(<BottomNav />)
    const exploreLink = screen.getByRole('link', { name: 'Explore' })
    const profileLink = screen.getByRole('link', { name: 'Profile' })
    expect(exploreLink).toHaveStyle({ color: tokens.colors.textMuted })
    expect(profileLink).toHaveStyle({ color: tokens.colors.textMuted })
  })

  it('applies active color to explore when on /explore', () => {
    vi.mocked(usePathname).mockReturnValue('/explore')
    render(<BottomNav />)
    const exploreLink = screen.getByRole('link', { name: 'Explore' })
    expect(exploreLink).toHaveStyle({ color: tokens.colors.brandBlack })
  })

  it('applies active color to profile when on /profile', () => {
    vi.mocked(usePathname).mockReturnValue('/profile')
    render(<BottomNav />)
    const profileLink = screen.getByRole('link', { name: 'Profile' })
    expect(profileLink).toHaveStyle({ color: tokens.colors.brandBlack })
  })

  it('applies muted color to all links when pathname does not match any route', () => {
    vi.mocked(usePathname).mockReturnValue('/unknown')
    render(<BottomNav />)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveStyle({ color: tokens.colors.textMuted })
    expect(screen.getByRole('link', { name: 'Explore' })).toHaveStyle({ color: tokens.colors.textMuted })
    expect(screen.getByRole('link', { name: 'Profile' })).toHaveStyle({ color: tokens.colors.textMuted })
  })

  it('calls signOut when logout button is clicked', async () => {
    render(<BottomNav />)
    await userEvent.click(screen.getByRole('button', { name: 'Logout' }))
    expect(signOut).toHaveBeenCalledOnce()
  })

  it('renders a nav element at the root', () => {
    const { container } = render(<BottomNav />)
    expect(container.querySelector('nav')).toBeInTheDocument()
  })
})
