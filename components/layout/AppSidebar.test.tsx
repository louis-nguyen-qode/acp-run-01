import { act, render, screen } from '@testing-library/react'
import type * as AntdModule from 'antd'
import { Grid } from 'antd'
import { usePathname } from 'next/navigation'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { sidebarNav } from '@/lib/navigation/config'

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/dashboard'),
  useRouter: vi.fn(() => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() })),
}))

vi.mock('antd', async () => {
  const actual = await vi.importActual<typeof AntdModule>('antd')
  type DrawerProps = {
    open: boolean
    children: React.ReactNode
    onClose: () => void
  }
  const MockDrawer = ({ open, children, onClose }: DrawerProps) =>
    open ? (
      <div role="dialog" data-testid="sidebar-drawer">
        <button aria-label="Close" onClick={onClose} />
        {children}
      </div>
    ) : null
  return {
    ...actual,
    Drawer: MockDrawer,
    Grid: {
      ...actual.Grid,
      useBreakpoint: vi.fn().mockReturnValue({ md: true }),
    },
  }
})

import { AppSidebar } from './AppSidebar'

describe('AppSidebar', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/dashboard')
    vi.mocked(Grid.useBreakpoint).mockReturnValue({ md: true })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders all sidebarNav labels on desktop', () => {
    render(<AppSidebar />)
    for (const item of sidebarNav) {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    }
  })

  it('renders an icon for each nav item', () => {
    const { container } = render(<AppSidebar />)
    const icons = container.querySelectorAll('.anticon')
    expect(icons.length).toBeGreaterThanOrEqual(sidebarNav.length)
  })

  it('highlights the active route via ant-menu-item-selected class', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard')
    render(<AppSidebar />)
    const dashboardLink = screen.getByText('Dashboard')
    expect(dashboardLink.closest('li')).toHaveClass('ant-menu-item-selected')
  })

  it('does not highlight inactive routes', () => {
    vi.mocked(usePathname).mockReturnValue('/dashboard')
    render(<AppSidebar />)
    const projectsLink = screen.getByText('Projects')
    expect(projectsLink.closest('li')).not.toHaveClass('ant-menu-item-selected')
  })

  it('does not render drawer on desktop', () => {
    render(<AppSidebar />)
    expect(screen.queryByTestId('sidebar-drawer')).not.toBeInTheDocument()
  })

  it('opens drawer when app:toggle-sidebar event fires on mobile', () => {
    vi.mocked(Grid.useBreakpoint).mockReturnValue({ md: false })
    render(<AppSidebar />)

    expect(screen.queryByTestId('sidebar-drawer')).not.toBeInTheDocument()

    act(() => {
      window.dispatchEvent(new CustomEvent('app:toggle-sidebar'))
    })

    expect(screen.getByTestId('sidebar-drawer')).toBeInTheDocument()
    for (const item of sidebarNav) {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    }
  })

  it('closes drawer when onClose is triggered on mobile', () => {
    vi.mocked(Grid.useBreakpoint).mockReturnValue({ md: false })
    render(<AppSidebar />)

    act(() => {
      window.dispatchEvent(new CustomEvent('app:toggle-sidebar'))
    })
    expect(screen.getByTestId('sidebar-drawer')).toBeInTheDocument()

    act(() => {
      screen.getByRole('button', { name: /close/i }).click()
    })
    expect(screen.queryByTestId('sidebar-drawer')).not.toBeInTheDocument()
  })

  it('removes event listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = render(<AppSidebar />)
    unmount()
    expect(removeSpy).toHaveBeenCalledWith('app:toggle-sidebar', expect.any(Function))
  })
})
