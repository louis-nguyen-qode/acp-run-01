/**
 * NextAuth v5 middleware.
 *
 * Protects routes by checking the session. The `authorized` callback in
 * auth.config.ts decides what is and isn't allowed.
 *
 * callbackUrl is automatically appended by NextAuth when redirecting to /signin.
 * Validate it server-side before using it (must be same-origin).
 */

export { auth as middleware } from '@/_reference/example-auth-flow/auth'

export const config = {
  matcher: [
    // Run on all routes except static assets and api/auth
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}
