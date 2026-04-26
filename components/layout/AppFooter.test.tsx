import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { footerGroups } from '@/lib/navigation/config'

import { AppFooter } from './AppFooter'
import { AppFooterContent } from './AppFooterContent'

describe('AppFooter', () => {
  it('renders every group title', () => {
    render(<AppFooter />)
    for (const group of footerGroups) {
      expect(screen.getByText(group.title)).toBeInTheDocument()
    }
  })

  it('renders every link with correct href', () => {
    render(<AppFooter />)
    for (const group of footerGroups) {
      for (const link of group.links) {
        const anchor = screen.getByRole('link', { name: link.label })
        expect(anchor).toHaveAttribute('href', link.href)
      }
    }
  })

  it('renders copyright with current year', () => {
    render(<AppFooter />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument()
  })

  it('renders copyright with site name and rights text', () => {
    render(<AppFooter />)
    expect(screen.getByText(/qode\.world/)).toBeInTheDocument()
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument()
  })
})

describe('AppFooterContent', () => {
  it('renders nothing from groups when groups is empty', () => {
    render(<AppFooterContent groups={[]} year={2024} />)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('renders the provided year in copyright', () => {
    render(<AppFooterContent groups={[]} year={2099} />)
    expect(screen.getByText(/2099/)).toBeInTheDocument()
  })

  it('renders a single group with one link', () => {
    const singleGroup = [{ title: 'Test', links: [{ label: 'Only Link', href: '/only' }] }]
    render(<AppFooterContent groups={singleGroup} year={2024} />)
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Only Link' })).toHaveAttribute('href', '/only')
  })

  it('renders multiple groups in separate columns', () => {
    const groups = [
      { title: 'Alpha', links: [{ label: 'Link A', href: '/a' }] },
      { title: 'Beta', links: [{ label: 'Link B', href: '/b' }] },
    ]
    render(<AppFooterContent groups={groups} year={2024} />)
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Link A' })).toHaveAttribute('href', '/a')
    expect(screen.getByRole('link', { name: 'Link B' })).toHaveAttribute('href', '/b')
  })
})
