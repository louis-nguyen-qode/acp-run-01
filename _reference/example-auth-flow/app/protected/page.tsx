/**
 * Reference: Protected server page.
 * `auth()` returns null if unauthenticated — middleware redirects before this runs.
 */

import { Layout, Space, Typography } from 'antd'

// In real code: import { auth } from '@/lib/auth'
// Here we show the pattern:

const { Content } = Layout
const { Title, Text } = Typography

// async function getSession() {
//   const session = await auth()
//   if (!session) redirect('/signin')
//   return session
// }

export default async function DashboardPage() {
  // const session = await getSession()

  return (
    <Layout>
      <Content style={{ padding: 24 }}>
        <Space direction="vertical">
          <Title level={2}>Dashboard</Title>
          {/* <Text>Welcome, {session.user.name}</Text> */}
          <Text>Welcome (replace with session.user.name)</Text>
        </Space>
      </Content>
    </Layout>
  )
}
