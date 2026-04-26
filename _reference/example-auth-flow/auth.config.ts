/**
 * NextAuth v5 — auth.config.ts
 *
 * Defines provider(s), callbacks, and pages.
 * Imported by auth.ts (main export) and middleware.ts.
 * Does NOT import Prisma — keeps it edge-compatible.
 */

import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { loginSchema } from './lib/auth/validation'

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        // DB lookup happens in auth.ts authorize, not here.
        // This config is edge-safe; keep it that way.
        return null
      },
    }),
  ],

  pages: {
    signIn: '/signin',
    error: '/signin',
  },

  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user
      const isPrivatePath =
        request.nextUrl.pathname.startsWith('/dashboard') ||
        request.nextUrl.pathname.startsWith('/profile')

      if (isPrivatePath) {
        if (isLoggedIn) return true
        // Redirect to signin with callbackUrl
        return false
      }
      return true
    },

    jwt({ token, user }) {
      if (user) {
        token['id'] = user.id
        token['name'] = user.name
        token['email'] = user.email
      }
      return token
    },

    session({ session, token }) {
      if (token['id']) {
        session.user.id = token['id'] as string
      }
      return session
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
}
