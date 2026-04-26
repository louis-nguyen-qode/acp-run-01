import { describe, expect, it, vi } from 'vitest'

import { signOut } from '@/lib/auth'

import { signOutAction } from './actions'

vi.mock('@/lib/auth', () => ({
  signOut: vi.fn().mockResolvedValue(undefined),
}))

describe('signOutAction', () => {
  it('calls signOut with /login redirect', async () => {
    await signOutAction()
    expect(vi.mocked(signOut)).toHaveBeenCalledWith({ redirectTo: '/login' })
  })

  it('returns a promise', () => {
    const result = signOutAction()
    expect(result).toBeInstanceOf(Promise)
  })

  it('resolves without throwing when signOut succeeds', async () => {
    await expect(signOutAction()).resolves.toBeUndefined()
  })
})
