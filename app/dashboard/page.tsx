import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

import { DashboardPageClient } from './DashboardPageClient'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  return <DashboardPageClient email={session.user.email ?? ''} />
}
