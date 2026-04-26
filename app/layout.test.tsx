import { describe, expect, it } from 'vitest'

import RootLayout, { metadata } from './layout'

describe('RootLayout metadata', () => {
  it('exports correct title', () => {
    expect(metadata.title).toBe('App')
  })

  it('exports correct description', () => {
    expect(metadata.description).toBe('Next.js + Ant Design application')
  })
})

describe('RootLayout', () => {
  it('is a function', () => {
    expect(typeof RootLayout).toBe('function')
  })
})
