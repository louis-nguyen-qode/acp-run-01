import { render, screen } from '@testing-library/react'
import type { Session } from 'next-auth'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import { auth } from '@/lib/auth'

import HomePage from './page'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`)
  }),
}))

type AuthFn = () => Promise<Session | null>
const mockAuth = vi.mocked(auth as AuthFn)

const mockSession: Session = {
  user: { id: 'user-1', email: 'test@example.com', name: null, image: null },
  expires: '2027-01-01T00:00:00.000Z',
}

describe('HomePage', () => {
  beforeEach(() => {
    mockAuth.mockReset()
  })

  it('renders sign-in and register links when not authenticated', async () => {
    mockAuth.mockResolvedValue(null)
    render(await HomePage())
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument()
  })

  it('sign-in link points to /login', async () => {
    mockAuth.mockResolvedValue(null)
    render(await HomePage())
    expect(screen.getByRole('link', { name: /sign in/i })).toHaveAttribute('href', '/login')
  })

  it('register link points to /register', async () => {
    mockAuth.mockResolvedValue(null)
    render(await HomePage())
    expect(screen.getByRole('link', { name: /register/i })).toHaveAttribute('href', '/register')
  })

  it('redirects to /dashboard when already authenticated', async () => {
    mockAuth.mockResolvedValue(mockSession)
    await expect(HomePage()).rejects.toThrow('REDIRECT:/dashboard')
  })
})
