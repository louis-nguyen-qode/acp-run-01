import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

import { LoginForm } from './LoginForm'

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function LoginPage({ searchParams }: PageProps) {
  const session = await auth()
  if (session) {
    redirect('/dashboard')
  }

  const registered = searchParams['registered'] === '1'
  return <LoginForm registered={registered} />
}
