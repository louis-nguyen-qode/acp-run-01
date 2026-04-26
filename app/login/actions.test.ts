import { getRedirectError, RedirectType } from 'next/dist/client/components/redirect'
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
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const { signIn } = await import('@/lib/auth')
    vi.mocked(signIn).mockResolvedValue(undefined)
  })

  it('re-throws NEXT_REDIRECT when signIn redirects on success', async () => {
    const { signIn } = await import('@/lib/auth')
    const redirectErr = getRedirectError('/dashboard', RedirectType.push)
    vi.mocked(signIn).mockRejectedValue(redirectErr)
    let caught: unknown
    try {
      await loginAction({}, makeFormData('user@example.com', 'password123'))
    } catch (err) {
      caught = err
    }
    expect(caught).toBe(redirectErr)
    expect((caught as { digest: string }).digest).toMatch(/^NEXT_REDIRECT/)
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

  it('returns error for CredentialsSignin AuthError', async () => {
    const { signIn } = await import('@/lib/auth')
    vi.mocked(signIn).mockRejectedValue(new MockAuthError('CredentialsSignin'))
    const result = await loginAction({}, makeFormData('user@example.com', 'wrongpass'))
    expect(result).toEqual({ error: 'Invalid email or password' })
  })

  it('returns authentication failed and logs for other AuthErrors', async () => {
    const { signIn } = await import('@/lib/auth')
    vi.mocked(signIn).mockRejectedValue(new MockAuthError('OAuthSignInError'))
    const result = await loginAction({}, makeFormData('user@example.com', 'password123'))
    expect(result).toEqual({ error: 'Authentication failed' })
    expect(console.error).toHaveBeenCalledWith('[loginAction]', expect.any(MockAuthError))
  })

  it('re-throws generic non-AuthError, non-redirect errors', async () => {
    const { signIn } = await import('@/lib/auth')
    const genericError = new Error('Something went wrong')
    vi.mocked(signIn).mockRejectedValue(genericError)
    await expect(
      loginAction({}, makeFormData('user@example.com', 'password123'))
    ).rejects.toThrow('Something went wrong')
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
