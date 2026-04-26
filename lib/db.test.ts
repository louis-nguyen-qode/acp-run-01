import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => ({ user: {} })),
}))

const g = globalThis as unknown as { prisma?: { user: Record<string, unknown> } }

describe('prisma singleton', () => {
  beforeEach(() => {
    delete g.prisma
    vi.resetModules()
  })

  it('exports a defined prisma instance', async () => {
    const { prisma } = await import('./db')
    expect(prisma).toBeDefined()
  })

  it('returns the same instance on repeated imports', async () => {
    const { prisma: a } = await import('./db')
    const { prisma: b } = await import('./db')
    expect(a).toBe(b)
  })

  it('exposes the user delegate', async () => {
    const { prisma } = await import('./db')
    expect(prisma.user).toBeDefined()
  })

  it('reuses the globalThis instance after module reload', async () => {
    const { prisma: first } = await import('./db')
    vi.resetModules()
    const { prisma: second } = await import('./db')
    expect(second).toBe(first)
  })

  it('does not cache on globalThis in production', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    try {
      await import('./db')
      expect(g.prisma).toBeUndefined()
    } finally {
      vi.unstubAllEnvs()
    }
  })
})
