import { vi, describe, it, expect } from 'vitest'

import { handlers } from '@/lib/auth'

import { GET, POST } from './route'

vi.mock('@/lib/auth', () => ({
  handlers: { GET: vi.fn(), POST: vi.fn() },
}))

describe('NextAuth route handler', () => {
  it('exports the GET handler from lib/auth handlers', () => {
    expect(GET).toBe(handlers.GET)
  })

  it('exports the POST handler from lib/auth handlers', () => {
    expect(POST).toBe(handlers.POST)
  })
})
