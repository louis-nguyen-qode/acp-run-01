import { describe, it, expect } from 'vitest'

import { hashPassword, verifyPassword } from './password'

describe('hashPassword', () => {
  it('produces a bcrypt hash at cost 10', async () => {
    const hash = await hashPassword('secret123')
    expect(hash).toMatch(/^\$2[aby]\$10\$/)
  })

  it('produces a different hash each call (random salt)', async () => {
    const hash1 = await hashPassword('same')
    const hash2 = await hashPassword('same')
    expect(hash1).not.toBe(hash2)
  })
})

describe('verifyPassword', () => {
  it('returns true for a matching password', async () => {
    const hash = await hashPassword('correct')
    expect(await verifyPassword('correct', hash)).toBe(true)
  })

  it('returns false for a wrong password', async () => {
    const hash = await hashPassword('correct')
    expect(await verifyPassword('wrong', hash)).toBe(false)
  })

  it('returns false for an empty string against a real hash', async () => {
    const hash = await hashPassword('nonempty')
    expect(await verifyPassword('', hash)).toBe(false)
  })
})
