import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { verifyPassword } from '@/lib/auth/password'
import { prisma } from '@/lib/db'

export async function authorizeUser(
  credentials: Partial<Record<string, unknown>>
): Promise<{ id: string; email: string } | null> {
  const email = credentials['email']
  const password = credentials['password']

  if (typeof email !== 'string' || typeof password !== 'string') return null
  if (!email || !password) return null

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return null

  const valid = await verifyPassword(password, user.passwordHash)
  if (!valid) return null

  return { id: user.id, email: user.email }
}

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: authorizeUser,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) {
        token['id'] = user.id
      }
      return token
    },
    session({ session, token }) {
      const tokenId = token['id']
      if (typeof tokenId === 'string') {
        session.user.id = tokenId
      }
      return session
    },
  },
}
