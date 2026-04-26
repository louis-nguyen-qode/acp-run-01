'use client'

import { Flex, Space, Typography } from 'antd'

import { Card } from '@/components/ui'

import { SignOutButton } from './SignOutButton'

const { Text } = Typography

type Props = {
  email: string
}

export function DashboardPageClient({ email }: Props) {
  return (
    <Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
      <Card title="Dashboard">
        <Space direction="vertical">
          <Text>Welcome, {email}</Text>
          <SignOutButton />
        </Space>
      </Card>
    </Flex>
  )
}
