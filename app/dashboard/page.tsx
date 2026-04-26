import { Flex, Space, Typography } from 'antd'
import { redirect } from 'next/navigation'

import { Card } from '@/components/ui'
import { auth } from '@/lib/auth'

import { SignOutButton } from './SignOutButton'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  return (
    <Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
      <Card title="Dashboard">
        <Space direction="vertical">
          <Typography.Text>Welcome, {session.user.email}</Typography.Text>
          <SignOutButton />
        </Space>
      </Card>
    </Flex>
  )
}
