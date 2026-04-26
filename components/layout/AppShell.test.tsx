import { render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('./AppHeader', () => ({
  AppHeader: () => <header data-testid="app-header">Header</header>,
}))

vi.mock('./AppSidebar', () => ({
  AppSidebar: () => <aside data-testid="app-sidebar">Sidebar</aside>,
}))

vi.mock('./AppFooter', () => ({
  AppFooter: () => <footer data-testid="app-footer">Footer</footer>,
}))

import { AppShell } from './AppShell'

describe('AppShell', () => {
  it('renders AppHeader', () => {
    render(<AppShell>page</AppShell>)
    expect(screen.getByTestId('app-header')).toBeInTheDocument()
  })

  it('renders AppSidebar', () => {
    render(<AppShell>page</AppShell>)
    expect(screen.getByTestId('app-sidebar')).toBeInTheDocument()
  })

  it('renders AppFooter', () => {
    render(<AppShell>page</AppShell>)
    expect(screen.getByTestId('app-footer')).toBeInTheDocument()
  })

  it('renders children inside the Content area', () => {
    render(<AppShell><div data-testid="child">inner</div></AppShell>)
    const content = screen.getByTestId('app-content')
    expect(within(content).getByTestId('child')).toBeInTheDocument()
  })

  it('renders multiple children inside the Content area', () => {
    render(
      <AppShell>
        <div data-testid="child-a">A</div>
        <div data-testid="child-b">B</div>
      </AppShell>,
    )
    const content = screen.getByTestId('app-content')
    expect(within(content).getByTestId('child-a')).toBeInTheDocument()
    expect(within(content).getByTestId('child-b')).toBeInTheDocument()
  })

  it('renders the full shell structure with null children', () => {
    render(<AppShell>{null}</AppShell>)
    expect(screen.getByTestId('app-header')).toBeInTheDocument()
    expect(screen.getByTestId('app-sidebar')).toBeInTheDocument()
    expect(screen.getByTestId('app-footer')).toBeInTheDocument()
    expect(screen.getByTestId('app-content')).toBeInTheDocument()
  })
})
