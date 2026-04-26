import { vi, describe, it, expect } from 'vitest'

import { handlers, auth, signIn, signOut } from './index'

vi.mock('next-auth', () => ({
  default: vi.fn(() => ({
    handlers: { GET: vi.fn(), POST: vi.fn() },
    auth: vi.fn(),
    signIn: vi.fn(),
    signOut: vi.fn(),
  })),
}))

vi.mock('./config', () => ({
  authConfig: {},
}))

describe('lib/auth/index exports', () => {
  it('exports handlers', () => {
    expect(handlers).toBeDefined()
    expect(handlers).toHaveProperty('GET')
    expect(handlers).toHaveProperty('POST')
  })

  it('exports auth', () => {
    expect(auth).toBeDefined()
  })

  it('exports signIn', () => {
    expect(signIn).toBeDefined()
  })

  it('exports signOut', () => {
    expect(signOut).toBeDefined()
  })
})
