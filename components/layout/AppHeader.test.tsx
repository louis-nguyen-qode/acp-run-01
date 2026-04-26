import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import type * as AntdModule from 'antd'
import { Grid } from 'antd'
import { usePathname } from 'next/navigation'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { AppHeader } from './AppHeader'

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}))

vi.mock('antd', async () => {
  const actual = await vi.importActual<typeof AntdModule>('antd')
  return {
    ...actual,
    Grid: {
      ...actual.Grid,
      useBreakpoint: vi.fn().mockReturnValue({ md: true }),
    },
  }
})

describe('AppHeader', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/')
    vi.mocked(Grid.useBreakpoint).mockReturnValue({ md: true })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders logo with href pointing to root', () => {
    render(<AppHeader />)
    const logo = screen.getByRole('link', { name: 'qode.world' })
    expect(logo).toHaveAttribute('href', '/')
  })

  it('renders all primary nav items in desktop mode', () => {
    render(<AppHeader />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText('Pricing')).toBeInTheDocument()
    expect(screen.getByText('Docs')).toBeInTheDocument()
  })

  it('highlights the nav item matching the current pathname', () => {
    vi.mocked(usePathname).mockReturnValue('/')
    render(<AppHeader />)
    const homeLink = screen.getByText('Home')
    const menuItem = homeLink.closest('li')
    expect(menuItem).toHaveClass('ant-menu-item-selected')
  })

  it('selects no nav item when pathname does not match any nav href', () => {
    vi.mocked(usePathname).mockReturnValue('/unknown-page')
    render(<AppHeader />)
    const items = screen.getAllByRole('menuitem')
    for (const item of items) {
      expect(item).not.toHaveAttribute('aria-selected', 'true')
    }
  })

  it('shows mobile menu button when below md breakpoint', () => {
    vi.mocked(Grid.useBreakpoint).mockReturnValue({ md: false })
    render(<AppHeader />)
    expect(screen.getByRole('button', { name: 'Toggle navigation menu' })).toBeInTheDocument()
  })

  it('does not show mobile menu button at or above md breakpoint', () => {
    render(<AppHeader />)
    expect(screen.queryByRole('button', { name: 'Toggle navigation menu' })).not.toBeInTheDocument()
  })

  it('does not render desktop nav in mobile mode', () => {
    vi.mocked(Grid.useBreakpoint).mockReturnValue({ md: false })
    render(<AppHeader />)
    expect(screen.queryByText('Features')).not.toBeInTheDocument()
  })

  it('dispatches app:toggle-sidebar custom event when mobile menu button is clicked', async () => {
    vi.mocked(Grid.useBreakpoint).mockReturnValue({ md: false })
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent')
    render(<AppHeader />)
    await userEvent.click(screen.getByRole('button', { name: 'Toggle navigation menu' }))
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'app:toggle-sidebar' }),
    )
    dispatchSpy.mockRestore()
  })
})
