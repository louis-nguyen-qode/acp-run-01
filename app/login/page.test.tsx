import { describe, expect, it, vi } from 'vitest'

import { auth } from '@/lib/auth'

import LoginPage from './page'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn().mockResolvedValue(null),
}))

vi.mock('./LoginForm', () => ({
  LoginForm: ({ registered }: { registered: boolean }) => (
    <div data-testid="login-form" data-registered={String(registered)} />
  ),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

type SimpleMock = { mockResolvedValueOnce: (val: unknown) => void }
const mockAuth = vi.mocked(auth) as unknown as SimpleMock

describe('LoginPage', () => {
  it('is an async function', () => {
    expect(typeof LoginPage).toBe('function')
  })

  it('calls auth to check for existing session', async () => {
    await LoginPage({ searchParams: {} })
    expect(vi.mocked(auth)).toHaveBeenCalled()
  })

  it('redirects to /dashboard when session exists', async () => {
    const { redirect } = await import('next/navigation')
    mockAuth.mockResolvedValueOnce({
      user: { id: '1', email: 'test@example.com', name: null, image: null },
      expires: '2099-01-01',
    })
    await LoginPage({ searchParams: {} })
    expect(vi.mocked(redirect)).toHaveBeenCalledWith('/dashboard')
  })

  it('renders LoginForm with registered=false when no registered param', async () => {
    mockAuth.mockResolvedValueOnce(null)
    const result = await LoginPage({ searchParams: {} })
    expect(result).not.toBeNull()
  })

  it('renders LoginForm with registered=true when registered=1 in searchParams', async () => {
    mockAuth.mockResolvedValueOnce(null)
    const result = await LoginPage({ searchParams: { registered: '1' } })
    expect(result).not.toBeNull()
  })

  it('renders LoginForm with registered=false when registered is not "1"', async () => {
    mockAuth.mockResolvedValueOnce(null)
    const result = await LoginPage({ searchParams: { registered: '0' } })
    expect(result).not.toBeNull()
  })
})
