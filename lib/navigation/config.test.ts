import { describe, it, expect } from 'vitest'

import { footerGroups, primaryNav, sidebarNav } from '@/lib/navigation/config'

describe('primaryNav', () => {
  it('is a non-empty array', () => {
    expect(primaryNav.length).toBeGreaterThan(0)
  })

  it('every item has required string fields', () => {
    for (const item of primaryNav) {
      expect(typeof item.key).toBe('string')
      expect(typeof item.label).toBe('string')
      expect(typeof item.href).toBe('string')
      expect(item.key.length).toBeGreaterThan(0)
      expect(item.label.length).toBeGreaterThan(0)
      expect(item.href.length).toBeGreaterThan(0)
    }
  })

  it('has unique keys', () => {
    const keys = primaryNav.map((item) => item.key)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('contains a Home entry', () => {
    expect(primaryNav.some((item) => item.key === 'home')).toBe(true)
  })
})

describe('sidebarNav', () => {
  it('is a non-empty array', () => {
    expect(sidebarNav.length).toBeGreaterThan(0)
  })

  it('every item has required string fields', () => {
    for (const item of sidebarNav) {
      expect(typeof item.key).toBe('string')
      expect(typeof item.label).toBe('string')
      expect(typeof item.href).toBe('string')
      expect(item.key.length).toBeGreaterThan(0)
      expect(item.label.length).toBeGreaterThan(0)
      expect(item.href.length).toBeGreaterThan(0)
    }
  })

  it('every item has an icon string', () => {
    for (const item of sidebarNav) {
      expect(typeof item.icon).toBe('string')
      expect((item.icon as string).length).toBeGreaterThan(0)
    }
  })

  it('has unique keys', () => {
    const keys = sidebarNav.map((item) => item.key)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('contains dashboard, projects, and settings entries', () => {
    const keys = sidebarNav.map((item) => item.key)
    expect(keys).toContain('dashboard')
    expect(keys).toContain('projects')
    expect(keys).toContain('settings')
  })
})

describe('footerGroups', () => {
  it('is a non-empty array', () => {
    expect(footerGroups.length).toBeGreaterThan(0)
  })

  it('every group has a non-empty title and links array', () => {
    for (const group of footerGroups) {
      expect(typeof group.title).toBe('string')
      expect(group.title.length).toBeGreaterThan(0)
      expect(Array.isArray(group.links)).toBe(true)
      expect(group.links.length).toBeGreaterThan(0)
    }
  })

  it('every link has a non-empty label and href', () => {
    for (const group of footerGroups) {
      for (const link of group.links) {
        expect(typeof link.label).toBe('string')
        expect(typeof link.href).toBe('string')
        expect(link.label.length).toBeGreaterThan(0)
        expect(link.href.length).toBeGreaterThan(0)
      }
    }
  })

  it('has unique group titles', () => {
    const titles = footerGroups.map((g) => g.title)
    expect(new Set(titles).size).toBe(titles.length)
  })

  it('contains Product, Company, and Legal groups', () => {
    const titles = footerGroups.map((g) => g.title)
    expect(titles).toContain('Product')
    expect(titles).toContain('Company')
    expect(titles).toContain('Legal')
  })

  it('each group has at least 3 links', () => {
    for (const group of footerGroups) {
      expect(group.links.length).toBeGreaterThanOrEqual(3)
    }
  })
})
