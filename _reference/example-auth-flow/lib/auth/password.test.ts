import { describe, expect, it } from 'vitest'

import { hashPassword, verifyPassword } from './password'

describe('password utilities', () => {
  it('hashes a password', async () => {
    const hash = await hashPassword('secret123')
    expect(hash).not.toBe('secret123')
    expect(hash.startsWith('$2')).toBe(true)
  })

  it('verifies correct password', async () => {
    const hash = await hashPassword('mypassword')
    const isValid = await verifyPassword('mypassword', hash)
    expect(isValid).toBe(true)
  })

  it('rejects incorrect password', async () => {
    const hash = await hashPassword('mypassword')
    const isValid = await verifyPassword('wrongpassword', hash)
    expect(isValid).toBe(false)
  })
})
