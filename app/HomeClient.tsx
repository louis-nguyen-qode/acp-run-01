'use client'

import { Flex, Space, Typography } from 'antd'
import Link from 'next/link'

import { Button, Card } from '@/components/ui'

const { Text } = Typography

export function HomeClient() {
  return (
    <Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
      <Card title="Welcome">
        <Space direction="vertical">
          <Text type="secondary">Sign in to continue.</Text>
          <Space>
            <Link href="/login">
              <Button type="primary">Sign in</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </Space>
        </Space>
      </Card>
    </Flex>
  )
}
