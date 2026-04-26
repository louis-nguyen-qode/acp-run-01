import { beforeEach, describe, expect, it, vi } from 'vitest'

import { loginAction } from './actions'

const { MockAuthError } = vi.hoisted(() => {
  class MockAuthError extends Error {
    type: string
    constructor(type: string) {
      super(type)
      this.type = type
    }
  }
  return { MockAuthError }
})

vi.mock('next-auth', () => ({
  AuthError: MockAuthError,
}))

vi.mock('@/lib/auth', () => ({
  signIn: vi.fn(),
}))

function makeFormData(email: string, password: string): FormData {
  const fd = new FormData()
  fd.set('email', email)
  fd.set('password', password)
  return fd
}

describe('loginAction', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    const { signIn } = await import('@/lib/auth')
    vi.mocked(signIn).mockResolvedValue(undefined)
  })

  it('calls signIn with credentials and redirectTo on valid input', async () => {
    const { signIn } = await import('@/lib/auth')
    await loginAction({}, makeFormData('user@example.com', 'password123'))
    expect(vi.mocked(signIn)).toHaveBeenCalledWith('credentials', {
      email: 'user@example.com',
      password: 'password123',
      redirectTo: '/dashboard',
    })
  })

  it('returns empty state when signIn resolves without throwing', async () => {
    const result = await loginAction({}, makeFormData('user@example.com', 'password123'))
    expect(result).toEqual({})
  })

  it('returns error for invalid credentials', async () => {
    const { signIn } = await import('@/lib/auth')
    vi.mocked(signIn).mockRejectedValue(new MockAuthError('CredentialsSignin'))
    const result = await loginAction({}, makeFormData('user@example.com', 'wrongpass'))
    expect(result).toEqual({ error: 'Invalid email or password' })
  })

  it('rethrows non-AuthError errors so NEXT_REDIRECT propagates', async () => {
    const { signIn } = await import('@/lib/auth')
    const redirectError = Object.assign(new Error('NEXT_REDIRECT'), { digest: 'NEXT_REDIRECT' })
    vi.mocked(signIn).mockRejectedValue(redirectError)
    await expect(loginAction({}, makeFormData('user@example.com', 'password123'))).rejects.toThrow('NEXT_REDIRECT')
  })

  it('rethrows unexpected non-credentials AuthErrors', async () => {
    const { signIn } = await import('@/lib/auth')
    vi.mocked(signIn).mockRejectedValue(new MockAuthError('OAuthSignInError'))
    await expect(loginAction({}, makeFormData('user@example.com', 'password123'))).rejects.toThrow()
  })

  it('returns validation error for invalid email', async () => {
    const result = await loginAction({}, makeFormData('not-an-email', 'password123'))
    expect(result.error).toMatch(/valid email/i)
  })

  it('returns validation error when password is empty', async () => {
    const result = await loginAction({}, makeFormData('user@example.com', ''))
    expect(result.error).toMatch(/required/i)
  })

  it('does not call signIn when validation fails', async () => {
    const { signIn } = await import('@/lib/auth')
    await loginAction({}, makeFormData('bad-email', ''))
    expect(vi.mocked(signIn)).not.toHaveBeenCalled()
  })
})
