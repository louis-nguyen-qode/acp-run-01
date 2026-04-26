import { vi, describe, it, expect, beforeEach } from 'vitest'

import { verifyPassword } from '@/lib/auth/password'
import { prisma } from '@/lib/db'

import { authorizeUser, authConfig } from './config'

// Hoisted by Vitest to execute before module imports above
vi.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}))

vi.mock('@/lib/auth/password', () => ({
  verifyPassword: vi.fn(),
}))

const mockFindUnique = vi.mocked(prisma.user.findUnique)
const mockVerifyPassword = vi.mocked(verifyPassword)

const testUser = {
  id: 'user-cuid-1',
  email: 'test@example.com',
  passwordHash: '$2b$10$hashedvalue',
  createdAt: new Date(),
}

describe('authorizeUser', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns null when email is missing', async () => {
    expect(await authorizeUser({ password: 'pass' })).toBeNull()
  })

  it('returns null when password is missing', async () => {
    expect(await authorizeUser({ email: 'test@example.com' })).toBeNull()
  })

  it('returns null when credentials are empty', async () => {
    expect(await authorizeUser({})).toBeNull()
  })

  it('returns null when values are not strings', async () => {
    expect(await authorizeUser({ email: 123, password: true })).toBeNull()
  })

  it('returns null when user is not found', async () => {
    mockFindUnique.mockResolvedValue(null)

    const result = await authorizeUser({
      email: 'notfound@example.com',
      password: 'pass',
    })

    expect(result).toBeNull()
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { email: 'notfound@example.com' },
    })
  })

  it('returns null when password is incorrect', async () => {
    mockFindUnique.mockResolvedValue(testUser)
    mockVerifyPassword.mockResolvedValue(false)

    const result = await authorizeUser({
      email: testUser.email,
      password: 'wrong-password',
    })

    expect(result).toBeNull()
    expect(mockVerifyPassword).toHaveBeenCalledWith(
      'wrong-password',
      testUser.passwordHash
    )
  })

  it('returns id and email on successful authentication', async () => {
    mockFindUnique.mockResolvedValue(testUser)
    mockVerifyPassword.mockResolvedValue(true)

    const result = await authorizeUser({
      email: testUser.email,
      password: 'correct-password',
    })

    expect(result).toEqual({ id: testUser.id, email: testUser.email })
  })
})

describe('authConfig callbacks', () => {
  describe('jwt callback', () => {
    it('adds user id to token on sign-in', async () => {
      const jwtCb = authConfig.callbacks?.jwt
      if (!jwtCb) throw new Error('jwt callback not configured')

      const result = await jwtCb({
        token: {},
        user: { id: 'user-1', email: 'test@example.com' },
        account: null,
        trigger: 'signIn',
      })

      expect(result).toMatchObject({ id: 'user-1' })
    })

    it('returns token unchanged when user has no id', async () => {
      const jwtCb = authConfig.callbacks?.jwt
      if (!jwtCb) throw new Error('jwt callback not configured')

      const result = await jwtCb({
        token: { sub: 'sub-123' },
        user: { email: 'test@example.com' },
        account: null,
      })

      expect(result).not.toHaveProperty('id')
      expect(result).toMatchObject({ sub: 'sub-123' })
    })
  })

  describe('session callback', () => {
    it('adds token id to session.user', async () => {
      const sessionCb = authConfig.callbacks?.session
      if (!sessionCb) throw new Error('session callback not configured')

      // NextAuth's session callback params merge AdapterSession (expires: Date)
      // with Session (expires: string), producing an unsatisfiable type intersection.
      // We use `as unknown as T` (not `as any`) to construct test params.
      type SessionCbParams = Parameters<typeof sessionCb>[0]
      const params = {
        session: {
          user: { id: '', name: 'Test', email: 'test@example.com', image: null },
          expires: '2099-01-01',
        },
        token: { id: 'user-1', sub: 'sub' },
        user: { id: 'user-1', email: 'test@example.com', emailVerified: null },
        newSession: null,
      } as unknown as SessionCbParams

      const result = await sessionCb(params)
      type SessionResult = { user: { id: string } }
      expect((result as SessionResult).user.id).toBe('user-1')
    })

    it('leaves session unchanged when token has no id', async () => {
      const sessionCb = authConfig.callbacks?.session
      if (!sessionCb) throw new Error('session callback not configured')

      type SessionCbParams = Parameters<typeof sessionCb>[0]
      const params = {
        session: {
          user: { id: 'existing-id', name: null, email: null, image: null },
          expires: '2099-01-01',
        },
        token: { sub: 'sub' },
        user: { id: 'user-1', email: 'test@example.com', emailVerified: null },
        newSession: null,
      } as unknown as SessionCbParams

      const result = await sessionCb(params)
      type SessionResult = { user: { id: string } }
      expect((result as SessionResult).user.id).toBe('existing-id')
    })
  })
})

describe('authConfig structure', () => {
  it('uses jwt session strategy', () => {
    expect(authConfig.session?.strategy).toBe('jwt')
  })

  it('redirects sign-in to /login', () => {
    expect(authConfig.pages?.signIn).toBe('/login')
  })

  it('has a credentials provider', () => {
    expect(authConfig.providers).toHaveLength(1)
    expect(authConfig.providers[0]).toMatchObject({ type: 'credentials' })
  })
})
