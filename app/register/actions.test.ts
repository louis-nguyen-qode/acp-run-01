import { beforeEach, describe, expect, it, vi } from 'vitest'

import { hashPassword } from '@/lib/auth/password'
import { prisma } from '@/lib/db'

import { registerAction } from './actions'

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

vi.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}))

vi.mock('@/lib/auth/password', () => ({
  hashPassword: vi.fn(),
}))

const mockFindUnique = vi.mocked(prisma.user.findUnique)
const mockCreate = vi.mocked(prisma.user.create)
const mockHashPassword = vi.mocked(hashPassword)

function makeFormData(email: string, password: string): FormData {
  const fd = new FormData()
  fd.set('email', email)
  fd.set('password', password)
  return fd
}

const existingUser = {
  id: 'cuid-1',
  email: 'taken@example.com',
  passwordHash: 'hashed',
  createdAt: new Date(),
}

describe('registerAction', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockHashPassword.mockResolvedValue('hashed-pw')
    mockFindUnique.mockResolvedValue(null)
    mockCreate.mockResolvedValue({
      id: 'cuid-2',
      email: 'new@example.com',
      passwordHash: 'hashed-pw',
      createdAt: new Date(),
    })
  })

  it('creates user and calls redirect on valid input', async () => {
    const { redirect } = await import('next/navigation')
    await registerAction({}, makeFormData('new@example.com', 'password123'))
    expect(mockCreate).toHaveBeenCalledWith({
      data: { email: 'new@example.com', passwordHash: 'hashed-pw' },
    })
    expect(vi.mocked(redirect)).toHaveBeenCalledWith('/login?registered=1')
  })

  it('hashes the password before storing', async () => {
    await registerAction({}, makeFormData('new@example.com', 'password123'))
    expect(mockHashPassword).toHaveBeenCalledWith('password123')
  })

  it('returns error when email already exists', async () => {
    mockFindUnique.mockResolvedValue(existingUser)
    const result = await registerAction({}, makeFormData('taken@example.com', 'password123'))
    expect(result).toEqual({ error: 'Email already registered' })
    expect(mockCreate).not.toHaveBeenCalled()
  })

  it('returns validation error for invalid email', async () => {
    const result = await registerAction({}, makeFormData('not-an-email', 'password123'))
    expect(result.error).toMatch(/valid email/i)
    expect(mockCreate).not.toHaveBeenCalled()
  })

  it('returns validation error when password is too short', async () => {
    const result = await registerAction({}, makeFormData('new@example.com', 'short'))
    expect(result.error).toMatch(/8 characters/i)
    expect(mockCreate).not.toHaveBeenCalled()
  })

  it('does not look up user when validation fails', async () => {
    await registerAction({}, makeFormData('bad-email', 'pw'))
    expect(mockFindUnique).not.toHaveBeenCalled()
  })
})
