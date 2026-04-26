'use server'

import { AuthError } from 'next-auth'
import { z } from 'zod'

import { signIn } from '@/lib/auth'

const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

export type LoginState = { error?: string }

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Validation failed' }
  }

  const { email, password } = parsed.data

  try {
    await signIn('credentials', { email, password, redirectTo: '/dashboard' })
  } catch (err) {
    if (err instanceof AuthError && err.type === 'CredentialsSignin') {
      return { error: 'Invalid email or password' }
    }
    throw err
  }

  return {}
}
