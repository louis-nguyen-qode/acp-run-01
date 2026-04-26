import { Flex, Space, Typography } from 'antd'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Button, Card } from '@/components/ui'
import { auth } from '@/lib/auth'

const { Text } = Typography

export default async function HomePage() {
  const session = await auth()
  if (session?.user) redirect('/dashboard')

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
