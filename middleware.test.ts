import type { Session } from 'next-auth'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { mockRedirect, callbackRef } = vi.hoisted(() => {
  const callbackRef: { current: ((req: unknown) => unknown) | undefined } = {
    current: undefined,
  }
  const mockRedirect = vi.fn()
  return { mockRedirect, callbackRef }
})

vi.mock('@/lib/auth', () => ({
  auth: (callback: (req: unknown) => unknown) => {
    callbackRef.current = callback
    return vi.fn()
  },
}))

vi.mock('next/server', () => ({
  NextResponse: {
    redirect: mockRedirect,
  },
}))

import { config } from './middleware'

type MockRequest = {
  auth: Session | null
  nextUrl: { pathname: string }
  url: string
}

function makeRequest(sessionAuth: Session | null, pathname: string): MockRequest {
  return {
    auth: sessionAuth,
    nextUrl: { pathname },
    url: `http://localhost:3000${pathname}`,
  }
}

function invokeCallback(req: MockRequest): unknown {
  const callback = callbackRef.current
  if (!callback) throw new Error('middleware auth callback was not captured')
  return callback(req)
}

describe('middleware dashboard guard', () => {
  beforeEach(() => {
    mockRedirect.mockClear()
  })

  it('redirects unauthenticated /dashboard request to /login', () => {
    const req = makeRequest(null, '/dashboard')
    invokeCallback(req)
    expect(mockRedirect).toHaveBeenCalledOnce()
    const arg = mockRedirect.mock.calls[0]?.[0] as URL
    expect(arg?.href).toBe('http://localhost:3000/login')
  })

  it('redirects unauthenticated /dashboard/settings request to /login', () => {
    const req = makeRequest(null, '/dashboard/settings')
    invokeCallback(req)
    expect(mockRedirect).toHaveBeenCalledOnce()
    const arg = mockRedirect.mock.calls[0]?.[0] as URL
    expect(arg?.href).toBe('http://localhost:3000/login')
  })

  it('passes through authenticated /dashboard request without redirect', () => {
    const session: Session = {
      user: { id: '1', email: 'test@example.com', name: 'Test', image: null },
      expires: '2099-01-01T00:00:00.000Z',
    }
    const req = makeRequest(session, '/dashboard')
    const result = invokeCallback(req)
    expect(mockRedirect).not.toHaveBeenCalled()
    expect(result).toBeUndefined()
  })

  it('exports config with /dashboard/:path* matcher only', () => {
    expect(config).toEqual({ matcher: ['/dashboard/:path*'] })
  })
})
