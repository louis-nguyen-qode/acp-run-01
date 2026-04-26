import { render, screen } from '@testing-library/react'
import type { Session } from 'next-auth'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import { auth } from '@/lib/auth'

import DashboardPage from './page'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`)
  }),
}))

vi.mock('./SignOutButton', () => ({
  SignOutButton: () => <button type="submit">Sign out</button>,
}))

type AuthFn = () => Promise<Session | null>
const mockAuth = vi.mocked(auth as AuthFn)

const mockSession: Session = {
  user: { id: 'user-1', email: 'test@example.com', name: null, image: null },
  expires: '2027-01-01T00:00:00.000Z',
}

describe('DashboardPage', () => {
  beforeEach(() => {
    mockAuth.mockReset()
  })

  it('renders welcome message with user email', async () => {
    mockAuth.mockResolvedValue(mockSession)
    render(await DashboardPage())
    expect(screen.getByText(/test@example\.com/)).toBeInTheDocument()
  })

  it('renders sign-out button', async () => {
    mockAuth.mockResolvedValue(mockSession)
    render(await DashboardPage())
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument()
  })

  it('redirects to /login when session is null', async () => {
    mockAuth.mockResolvedValue(null)
    await expect(DashboardPage()).rejects.toThrow('REDIRECT:/login')
  })
})
