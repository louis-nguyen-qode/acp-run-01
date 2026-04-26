'use client'

import { Layout, Space, Typography } from 'antd'

const { Content } = Layout
const { Title, Paragraph } = Typography

export default function HomePage() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Space direction="vertical" size="large" style={{ textAlign: 'center' }}>
          <Title>Welcome</Title>
          <Paragraph type="secondary">
            This is the target repo template. Workers will replace this page.
          </Paragraph>
        </Space>
      </Content>
    </Layout>
  )
}
