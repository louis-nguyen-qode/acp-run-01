/**
 * Reference: Simple server-rendered page with a data list.
 * Copy this pattern when building a page that fetches data server-side.
 */

import { Layout, Row, Col, Space, Typography, Empty, Skeleton } from 'antd'
import { Suspense } from 'react'

import { Card } from '@/components/ui/Card'

const { Content } = Layout
const { Title, Text } = Typography

// ── Types ──────────────────────────────────────────────────────────────────

type Item = {
  id: string
  name: string
  description: string
}

// ── Data fetching (server-side) ────────────────────────────────────────────

async function getItems(): Promise<Item[]> {
  // Replace with actual Prisma query or API call
  return [
    { id: '1', name: 'Item one', description: 'First item description' },
    { id: '2', name: 'Item two', description: 'Second item description' },
  ]
}

// ── Components ─────────────────────────────────────────────────────────────

function ItemCard({ item }: { item: Item }) {
  return (
    <Card title={item.name}>
      <Text type="secondary">{item.description}</Text>
    </Card>
  )
}

async function ItemList() {
  const items = await getItems()

  if (items.length === 0) {
    return <Empty description="No items found" />
  }

  return (
    <Row gutter={[16, 16]}>
      {items.map((item) => (
        <Col key={item.id} xs={24} sm={12} lg={8}>
          <ItemCard item={item} />
        </Col>
      ))}
    </Row>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function ExamplePage() {
  return (
    <Layout>
      <Content style={{ padding: 24, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={2}>Items</Title>
          <Suspense fallback={<Skeleton active paragraph={{ rows: 4 }} />}>
            <ItemList />
          </Suspense>
        </Space>
      </Content>
    </Layout>
  )
}
