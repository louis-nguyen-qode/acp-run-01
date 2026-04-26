/**
 * NextAuth v5 — auth.ts
 *
 * The main export. Import `auth`, `signIn`, `signOut`, `handlers` from here.
 *
 * @example
 *   // Server Component
 *   import { auth } from '@/lib/auth'
 *   const session = await auth()
 *
 *   // Server Action
 *   import { signIn, signOut } from '@/lib/auth'
 *   await signIn('credentials', { email, password })
 *   await signOut({ redirectTo: '/signin' })
 */

import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { authConfig } from './auth.config'
import { verifyPassword } from './lib/auth/password'
import { loginSchema } from './lib/auth/validation'

// Import Prisma client here (NOT in auth.config.ts — that stays edge-safe)
// import { prisma } from '@/lib/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials)
        if (!parsed.success) return null

        // Stub: replace with real Prisma lookup
        // const user = await prisma.user.findUnique({ where: { email: parsed.data.email } })
        // if (!user) return null
        // const isValid = await verifyPassword(parsed.data.password, user.passwordHash)
        // if (!isValid) return null
        // return { id: user.id, name: user.name, email: user.email }

        // For reference only — remove this stub:
        void verifyPassword // ensures the import is used
        return null
      },
    }),
  ],
})
