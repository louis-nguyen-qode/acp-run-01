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
})
