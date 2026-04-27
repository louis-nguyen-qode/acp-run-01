import { describe, expect, it } from 'vitest'

import { tokens } from './tokens'

describe('tokens.colors', () => {
  it('has required keys (primary, bg, text, error, border)', () => {
    expect(tokens.colors.primary).toBeTruthy()
    expect(tokens.colors.bg).toBeTruthy()
    expect(tokens.colors.text).toBeTruthy()
    expect(tokens.colors.error).toBeTruthy()
    expect(tokens.colors.border).toBeTruthy()
  })

  it('all values are non-empty strings', () => {
    for (const val of Object.values(tokens.colors)) {
      expect(typeof val).toBe('string')
      expect(val.length).toBeGreaterThan(0)
    }
  })
})

describe('tokens.spacing', () => {
  it('has xs/sm/md/lg/xl keys', () => {
    expect(tokens.spacing.xs).toBeDefined()
    expect(tokens.spacing.sm).toBeDefined()
    expect(tokens.spacing.md).toBeDefined()
    expect(tokens.spacing.lg).toBeDefined()
    expect(tokens.spacing.xl).toBeDefined()
  })

  it('values increase from xs to xl', () => {
    expect(tokens.spacing.sm).toBeGreaterThan(tokens.spacing.xs)
    expect(tokens.spacing.md).toBeGreaterThan(tokens.spacing.sm)
    expect(tokens.spacing.lg).toBeGreaterThan(tokens.spacing.md)
    expect(tokens.spacing.xl).toBeGreaterThan(tokens.spacing.lg)
  })

  it('all values are positive numbers', () => {
    for (const val of Object.values(tokens.spacing)) {
      expect(typeof val).toBe('number')
      expect(val).toBeGreaterThan(0)
    }
  })
})

describe('tokens.fontSize', () => {
  it('all values are positive numbers', () => {
    for (const val of Object.values(tokens.fontSize)) {
      expect(typeof val).toBe('number')
      expect(val).toBeGreaterThan(0)
    }
  })

  it('has base size', () => {
    expect(tokens.fontSize.base).toBeGreaterThan(0)
  })
})

describe('tokens.radius', () => {
  it('all values are non-negative numbers', () => {
    for (const val of Object.values(tokens.radius)) {
      expect(typeof val).toBe('number')
      expect(val).toBeGreaterThanOrEqual(0)
    }
  })

  it('has base radius', () => {
    expect(tokens.radius.base).toBeGreaterThan(0)
  })

  it('has IG-style card and button radii', () => {
    expect(tokens.radius.card).toBe(4)
    expect(tokens.radius.button).toBe(8)
  })
})

describe('tokens.colors (IG-style)', () => {
  it('has brandBlack and brandWhite', () => {
    expect(tokens.colors.brandBlack).toBe('#000000')
    expect(tokens.colors.brandWhite).toBe('#ffffff')
  })

  it('has borderSubtle, bgElevated, textMuted', () => {
    expect(tokens.colors.borderSubtle).toBe('#dbdbdb')
    expect(tokens.colors.bgElevated).toBe('#fafafa')
    expect(tokens.colors.textMuted).toBe('#737373')
  })

  it('has accent color for primary action', () => {
    expect(tokens.colors.accent).toBe('#0095f6')
  })
})

describe('tokens.spacing (IG-style)', () => {
  it('has navHeight of 60', () => {
    expect(tokens.spacing.navHeight).toBe(60)
  })

  it('has bottomNavHeight of 50', () => {
    expect(tokens.spacing.bottomNavHeight).toBe(50)
  })
})

describe('tokens.typography', () => {
  it('has brandFont containing Billabong', () => {
    expect(tokens.typography.brandFont).toContain('Billabong')
  })

  it('has bodyFont as a non-empty string', () => {
    expect(typeof tokens.typography.bodyFont).toBe('string')
    expect(tokens.typography.bodyFont.length).toBeGreaterThan(0)
  })

  it('all values are non-empty strings', () => {
    for (const val of Object.values(tokens.typography)) {
      expect(typeof val).toBe('string')
      expect(val.length).toBeGreaterThan(0)
    }
  })
})
