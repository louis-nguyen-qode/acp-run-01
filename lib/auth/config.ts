import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

import { verifyPassword } from '@/lib/auth/password'
import { prisma } from '@/lib/db'

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function authorizeUser(
  credentials: Partial<Record<string, unknown>>
): Promise<{ id: string; email: string; name: string | null } | null> {
  try {
    const parsed = credentialsSchema.safeParse(credentials)
    if (!parsed.success) return null

    const user = await prisma.user.findUnique({ where: { email: parsed.data.email } })
    if (!user) return null

    const valid = await verifyPassword(parsed.data.password, user.passwordHash)
    if (!valid) return null

    return { id: user.id, email: user.email, name: null }
  } catch (err) {
    console.error('[auth.authorize]', err)
    return null
  }
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
