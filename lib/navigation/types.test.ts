import { describe, it, expect } from 'vitest'

import type { FooterGroup, NavItem } from '@/lib/navigation/types'

describe('NavItem type shape', () => {
  it('accepts a valid NavItem with required fields', () => {
    const item: NavItem = { key: 'home', label: 'Home', href: '/' }
    expect(item.key).toBe('home')
    expect(item.label).toBe('Home')
    expect(item.href).toBe('/')
  })

  it('accepts a NavItem with an optional icon', () => {
    const item: NavItem = { key: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'home' }
    expect(item.icon).toBe('home')
  })

  it('icon is undefined when not provided', () => {
    const item: NavItem = { key: 'home', label: 'Home', href: '/' }
    expect(item.icon).toBeUndefined()
  })
})

describe('FooterGroup type shape', () => {
  it('accepts a valid FooterGroup', () => {
    const group: FooterGroup = {
      title: 'Product',
      links: [{ label: 'Features', href: '#features' }],
    }
    expect(group.title).toBe('Product')
    expect(group.links).toHaveLength(1)
  })

  it('accepts a FooterGroup with multiple links', () => {
    const group: FooterGroup = {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '#privacy' },
        { label: 'Terms', href: '#terms' },
      ],
    }
    expect(group.links).toHaveLength(2)
    expect(group.links[0]?.label).toBe('Privacy')
    expect(group.links[1]?.href).toBe('#terms')
  })

  it('accepts a FooterGroup with an empty links array', () => {
    const group: FooterGroup = { title: 'Empty', links: [] }
    expect(group.links).toHaveLength(0)
  })
})
