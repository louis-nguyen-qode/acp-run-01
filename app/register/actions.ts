'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'

import { hashPassword } from '@/lib/auth/password'
import { prisma } from '@/lib/db'

const RegisterSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type RegisterState = { error?: string }

export async function registerAction(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const parsed = RegisterSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Validation failed' }
  }

  const { email, password } = parsed.data

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { error: 'Email already registered' }
  }

  const passwordHash = await hashPassword(password)
  await prisma.user.create({ data: { email, passwordHash } })

  redirect('/login?registered=1')
}
