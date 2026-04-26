import { describe, expect, it, vi } from 'vitest'

import { auth } from '@/lib/auth'

import RegisterPage from './page'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn().mockResolvedValue(null),
}))

vi.mock('./RegisterForm', () => ({
  RegisterForm: () => null,
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

// auth() is overloaded in NextAuth v5 — cast to a plain mock to avoid TS type conflicts
// with the middleware overload (AppRouteHandlerFn vs Session | null).
type SimpleMock = { mockResolvedValueOnce: (val: unknown) => void }
const mockAuth = vi.mocked(auth) as unknown as SimpleMock

describe('RegisterPage', () => {
  it('is an async function', () => {
    expect(typeof RegisterPage).toBe('function')
  })

  it('calls auth to check for existing session', async () => {
    await RegisterPage()
    expect(vi.mocked(auth)).toHaveBeenCalled()
  })

  it('redirects to /dashboard when session exists', async () => {
    const { redirect } = await import('next/navigation')
    mockAuth.mockResolvedValueOnce({
      user: { id: '1', email: 'test@example.com', name: null, image: null },
      expires: '2099-01-01',
    })
    await RegisterPage()
    expect(vi.mocked(redirect)).toHaveBeenCalledWith('/dashboard')
  })

  it('renders RegisterForm when no session', async () => {
    mockAuth.mockResolvedValueOnce(null)
    const result = await RegisterPage()
    expect(result).not.toBeNull()
  })
})
